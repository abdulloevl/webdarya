import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import telegramRouter from './src/routes/telegram.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Базовые настройки безопасности
app.use(helmet());

// Настройка CORS
app.use(cors({
    origin: ['http://localhost:5173', 'https://webdarya.com'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Ограничение количества запросов
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 100 // Максимум 100 запросов с одного IP
});
app.use('/api/', limiter);

// Парсинг JSON с ограничением размера
app.use(express.json({ limit: '10kb' }));

// Маршруты
app.use('/api/telegram', telegramRouter);

// Статические файлы
app.use(express.static(path.join(__dirname, 'dist')));

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Internal Server Error',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Все остальные маршруты направляем на React приложение
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 