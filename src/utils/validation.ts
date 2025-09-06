export const validateWhatsAppNumber = (number: string): boolean => {
  // Remove all non-digits
  const cleaned = number.replace(/\D/g, '');
  
  // Check if it's a valid Indian number (10 digits) or international format (8-15 digits)
  if (cleaned.length === 10) {
    // Indian number without country code
    return /^[6-9]\d{9}$/.test(cleaned);
  }
  
  // International format with country code
  return cleaned.length >= 10 && cleaned.length <= 15;
};

export const formatWhatsAppNumber = (number: string): string => {
  const cleaned = number.replace(/\D/g, '');
  
  // If it's a 10-digit Indian number, add +91
  if (cleaned.length === 10 && /^[6-9]\d{9}$/.test(cleaned)) {
    return `+91${cleaned}`;
  }
  
  // If it starts with 91 and has 12 digits total, format as +91
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+${cleaned}`;
  }
  
  // If it already has + prefix, return as is
  if (number.startsWith('+')) {
    return number;
  }
  
  // Default: add +91 prefix
  return `+91${cleaned}`;
};

export const generateIPHash = async (ip: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + 'salt_2025');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};