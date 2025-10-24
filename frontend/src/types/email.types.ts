export type Email = {
  id: string;
  from: string;
  subject: string;
  snippet: string;
  date: string;
  isRead?: boolean;
  category?: string;
}

export type EmailsResponse = {
  emails: Email[];
  total: number;
}
