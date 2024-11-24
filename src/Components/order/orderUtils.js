import axios from 'axios';

// Constants
export const TELEGRAM_BOT_TOKEN = '7375994825:AAGyNzhEcLHAP4V8msySqi3SM63q_1HOzGg';
export const TELEGRAM_CHAT_ID = '1431600455';
export const BUSINESS_MOMO = '0598942315';

// Validation helpers
export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^233[0-9]{9}$/;
  return phoneRegex.test(phone);
};

export const validateTransactionId = (txId) => {
  const txIdRegex = /^[0-9]{5}$/;
  return txIdRegex.test(txId);
};

export const validateDeliveryLocation = (location) => {
  return location.trim().length >= 10;
};

// Anti-spam checks
export const checkSpamming = (orderHistory, phone) => {
  const now = new Date();
  const orderRecord = orderHistory[phone] || { count: 0, lastOrder: null };
  
  if (orderRecord.lastOrder) {
    const hoursSinceLastOrder = (now - new Date(orderRecord.lastOrder)) / (1000 * 60 * 60);
    if (hoursSinceLastOrder < 24 && orderRecord.count >= 3) {
      return true;
    }
  }
  return false;
};

// Cart helpers
export const updateCart = {
  addItem: (cart, item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      return cart.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
    }
    return [...cart, { ...item, quantity: 1 }];
  },

  removeItem: (cart, item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem.quantity === 1) {
      return cart.filter(cartItem => cartItem.id !== item.id);
    }
    return cart.map(cartItem =>
      cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    );
  },

  calculateTotal: (cart) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  }
};

// Telegram notification
export const sendToTelegram = async (orderData) => {
  const message = `
🆕 NEW ORDER RECEIVED!

📱 Customer Phone: ${orderData.customerPhone}
📍 Delivery Location: ${orderData.deliveryLocation}
💰 Total Amount: GHS ${orderData.totalAmount}
🔖 Transaction ID: ${orderData.transactionId}
📡 Network: ${orderData.network.toUpperCase()}
⏰ Order Time: ${new Date().toLocaleString()}

📋 Order Details:
${orderData.cart.map(item => `- ${item.name} x${item.quantity} (GHS ${item.price * item.quantity})`).join('\n')}

💵 Total: GHS ${orderData.totalAmount}
`;

  const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  await axios.post(telegramApiUrl, {
    chat_id: TELEGRAM_CHAT_ID,
    text: message
  });
};