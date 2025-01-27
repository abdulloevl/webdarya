import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

async function getChatId(botToken) {
    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`);
        const data = await response.json();
        console.log('Get Updates Response:', data);
        
        if (data.ok && data.result.length > 0) {
            const lastUpdate = data.result[data.result.length - 1];
            return lastUpdate.message.chat.id;
        }
        return null;
    } catch (error) {
        console.error('Error getting chat ID:', error);
        return null;
    }
}

router.post('/send', async (req, res) => {
    const { name, phone, message } = req.body;
    const TELEGRAM_BOT_TOKEN = process.env.VITE_TELEGRAM_BOT_TOKEN;
    
    try {
        // Получаем chat_id
        const chatId = await getChatId(TELEGRAM_BOT_TOKEN);
        if (!chatId) {
            return res.status(500).json({ 
                error: 'Could not find chat ID. Please send a message to the bot first.',
                details: 'Bot needs to receive at least one message to identify the chat.'
            });
        }

        const telegramMessage = `
🌟 Новая заявка с сайта!

👤 Имя: ${name}
📞 Телефон: ${phone}
💬 Сообщение: ${message}

📅 Дата: ${new Date().toLocaleString('ru-RU')}
        `;

        console.log('Sending message to chat ID:', chatId);

        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: telegramMessage,
                parse_mode: 'HTML'
            })
        });

        const data = await response.json();
        console.log('Telegram API Response:', data);

        if (!response.ok || !data.ok) {
            throw new Error(data.description || 'Failed to send message');
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Error in /telegram/send:', error);
        res.status(500).json({ 
            error: error.message,
            details: 'There was an error processing your request.'
        });
    }
});

export default router; 