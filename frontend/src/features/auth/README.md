# Better Auth Setup

## Overview
This authentication system uses Better Auth with support for:
- Email/Password authentication
- Google OAuth
- Session management

## Components

### EmailSignInForm
Email/password sign-in form with validation and error handling.

### EmailSignUpForm
Email/password sign-up form with name, email, and password fields.

### GoogleAuthButton
Google OAuth sign-in button with Better Auth integration.

### LoginPage
Main authentication page with tabs for sign-in/sign-up and Google OAuth.

## Usage

### Sign In with Email
```tsx
import { EmailSignInForm } from '@/features/auth';

<EmailSignInForm />
```

### Sign Up with Email
```tsx
import { EmailSignUpForm } from '@/features/auth';

<EmailSignUpForm />
```

### Check Authentication
```tsx
import { useAuth } from '@/features/auth';

const { isAuthenticated, isLoading, user, logout } = useAuth();
```

## Configuration

### Backend
- Base URL: `http://localhost:8000`
- Auth Path: `/api/v1/auth`
- Database: MongoDB (via mongoose)
- Google OAuth configured with credentials from backend .env

### Frontend
- Better Auth React client configured in `@/lib/auth.ts`
- Session management via `useSession` hook
- Automatic redirect to `/emails` after successful authentication

## API Endpoints

All Better Auth endpoints are handled automatically:
- POST `/api/v1/auth/sign-in/email` - Email sign-in
- POST `/api/v1/auth/sign-up/email` - Email sign-up
- GET/POST `/api/v1/auth/sign-in/social` - Social OAuth
- GET/POST `/api/v1/auth/callback/google` - Google OAuth callback
- POST `/api/v1/auth/sign-out` - Sign out
- GET/POST `/api/v1/auth/get-session` - Get current session
