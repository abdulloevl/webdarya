// Конфигурация CSP
const cspConfig = {
  defaultSrc: ["'self'"],
  scriptSrc: [
    "'self'",
    "'unsafe-inline'", // Для inline-скриптов React
    "https://www.google.com/recaptcha/",
    "https://www.gstatic.com/recaptcha/",
    "https://cdn.jsdelivr.net/",
  ],
  styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net/"],
  imgSrc: [
    "'self'",
    "data:",
    "https:",
    "https://cdn.jsdelivr.net/",
    "https://api.dicebear.com/",
  ],
  connectSrc: ["'self'", "https://api.webdarya.com"],
  fontSrc: ["'self'", "https://fonts.gstatic.com"],
  objectSrc: ["'none'"],
  mediaSrc: ["'self'"],
  frameSrc: ["https://www.google.com/"],
};

// Преобразование конфигурации CSP в строку
const generateCspString = (config) => {
  return Object.entries(config)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
};

// Middleware для установки заголовков безопасности
export const setSecurityHeaders = (req, res, next) => {
  // Content Security Policy
  res.setHeader('Content-Security-Policy', generateCspString(cspConfig));

  // Защита от XSS
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Запрет встраивания сайта в iframe
  res.setHeader('X-Frame-Options', 'DENY');

  // Принудительное использование типов контента
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Политика реферера
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // HSTS (HTTP Strict Transport Security)
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  // Permissions Policy (бывшая Feature Policy)
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()'
  );

  next();
}; 