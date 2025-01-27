const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// Функция для получения обновлений бота (включая ID чата)
export const getUpdates = async () => {
    try {
        const response = await fetch(`${TELEGRAM_API_URL}/getUpdates`);
        const data = await response.json();
        console.log('Telegram Updates:', data);
        if (data.ok && data.result.length > 0) {
            // Получаем ID последнего чата
            const lastUpdate = data.result[data.result.length - 1];
            return lastUpdate.message.chat.id;
        }
        return null;
    } catch (error) {
        console.error('Error getting updates:', error);
        return null;
    }
};

export const sendToTelegram = async (formData) => {
    try {
        const response = await fetch('http://localhost:3001/api/telegram/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            console.error('API Error:', data);
            throw new Error(data.error || 'Failed to send message');
        }

        return true;
    } catch (error) {
        console.error('Error sending message:', error);
        return false;
    }
}; 