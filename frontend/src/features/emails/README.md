# Emails Feature

This feature displays and classifies emails using the Gemini API.

## Structure

```
emails/
├── api/              # API calls and React Query hooks
├── components/       # Feature-specific components
├── pages/           # Page components
└── index.ts         # Public exports
```

## Components

- **EmailsPage**: Main emails page with list and controls
- **EmailCard**: Individual email card component

## API

- **useGetEmails**: Fetch emails from backend with limit
- **useClassifyEmails**: Classify emails using Gemini API

## Features

1. **Email List**: Displays emails from backend
2. **Limit Filter**: Dropdown to select number of emails (5, 10, 15, 25, 50, 100)
3. **Classify Button**: Sends emails to backend for classification with Gemini API
4. **User Info**: Shows logged-in user details
5. **Logout**: Logout functionality

## API Endpoints Expected

- `GET /emails?limit={number}` - Fetch emails
  - Response: `{ emails: Email[], total: number }`
- `POST /emails/classify` - Classify emails
  - Body: `{ emailIds: string[], geminiApiKey: string }`
  - Response: Classification results

## Email Type

```typescript
interface Email {
  id: string;
  from: string;
  subject: string;
  body: string;
  date: string;
  isRead?: boolean;
}
```
