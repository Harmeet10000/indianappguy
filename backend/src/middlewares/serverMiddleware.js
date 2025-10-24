import { nanoid } from 'nanoid';
import { logger } from '../utils/logger.js';
import { httpResponse } from '../utils/httpResponse.js';
// import { redisClient } from '../connections/connectRedis.js';
import RedisStoreImport from 'rate-limit-redis';
import rateLimit from 'express-rate-limit';
import promBundle from 'express-prom-bundle';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const RedisStore = RedisStoreImport.default || RedisStoreImport;

export const correlationIdMiddleware = (req, res, next) => {
  req.correlationId = nanoid();
  next();
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Read the swagger document - with proper error handling
export let swaggerDocument;
try {
  swaggerDocument = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../../docs/swagger-output.json'), 'utf8')
  );
} catch (error) {
  logger.warn('Swagger documentation not found or invalid. API docs will not be available.', {
    error: error.message
  });
  swaggerDocument = {
    info: {
      title: 'API Documentation',
      description: "Documentation not available. Run 'npm run swagger' to generate it."
    }
  };
}

const rateLimitHandler = (req, res, next, options) => {
  logger.warn('Rate limit exceeded', {
    correlationId: req.correlationId,
    ip: req.ip,
    path: req.originalUrl,
    method: req.method
  });
  httpResponse(
    req,
    res,
    options.statusCode,
    options.message || 'Too many requests, please try again later.',
    null
  );
};
// Limit requests from same API
// export const limiter = rateLimit({
//   store: new RedisStore({
//     sendCommand: (...args) => redisClient.call(...args)
//   }),
//   max: 500,
//   windowMs: 15 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in 15 minutes!',
//   standardHeaders: true,
//   legacyHeaders: false,
//   // skipSuccessfulRequests: skipSuccessful,
//   handler: rateLimitHandler
// });

// Limit requests from same API
// export const limiter = rateLimit({
//   max: 100,
//   windowMs: 15 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!'
// });

// Enhanced helmet configuration
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      scriptSrc: ["'self'"],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      manifestSrc: ["'self'"]
    }
  },
  crossOriginEmbedderPolicy: false,
  // hsts: {
  //   maxAge: 31536000,
  //   includeSubDomains: true,
  //   preload: true
  // },
  noSniff: true,
  frameguard: { action: 'deny' },
  referrerPolicy: { policy: 'same-origin' }
});

export const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: { project: 'auth-service' },
  promClient: {
    collectDefaultMetrics: {
      timestamps: true
    }
  }
});

export const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true
};
