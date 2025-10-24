export const parseEmailFrom = (from: string) => {
  const match = from.match(/^(.+?)\s*<(.+?)>$/);
  if (match) {
    return {
      name: match[1].trim(),
      email: match[2].trim(),
    };
  }
  return {
    name: from.split('@')[0],
    email: from,
  };
};
