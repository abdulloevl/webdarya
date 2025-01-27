import DOMPurify from 'dompurify';

// Базовая санитизация текста
export const sanitizeText = (text) => {
  if (!text) return '';
  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [], // Только текст, без HTML
    ALLOWED_ATTR: []
  });
};

// Санитизация HTML с ограниченным набором тегов
export const sanitizeHtml = (html) => {
  if (!html) return '';
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
    ADD_ATTR: ['target="_blank"', 'rel="noopener noreferrer"'],
    USE_PROFILES: { html: true }
  });
};

// Санитизация URL
export const sanitizeUrl = (url) => {
  if (!url) return '';
  try {
    const sanitized = DOMPurify.sanitize(url);
    const urlObj = new URL(sanitized);
    // Разрешаем только http и https протоколы
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return '';
    }
    return sanitized;
  } catch {
    return '';
  }
};

// Санитизация объекта с данными формы
export const sanitizeFormData = (formData) => {
  const sanitized = {};
  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeText(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item => 
        typeof item === 'string' ? sanitizeText(item) : item
      );
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}; 