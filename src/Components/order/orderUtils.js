import { supabase } from '../../supabaseClient.js';
import axios from 'axios';

// Constants
export const TELEGRAM_BOT_TOKEN = '7375994825:AAGyNzhEcLHAP4V8msySqi3SM63q_1HOzGg';
export const TELEGRAM_CHAT_ID = '-1002409004462';
export const BUSINESS_MOMO = '0598942315';

// Order ID Generation and Management
export const generateOrderId = () => {
  return `ORD${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
};

export const createNewOrder = async (orderData) => {
  try {
    const orderId = generateOrderId();

    // Format cart items as JSON
    const formattedOrderData = {
      ...orderData,
      cart: JSON.stringify(orderData.cart),
      status: 'Order Received',
      timestamp: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    console.log('Attempting to create order:', { orderId, ...formattedOrderData });

    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          orderId,
          ...formattedOrderData
        }
      ]);

    if (error) {
      console.error('Error creating order:', {
        error,
        orderId,
        formattedOrderData
      });
      throw new Error(`Failed to create order in database: ${error.message}`);
    }

    // Fetch the created order to return it
    const { data: createdOrder, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('orderId', orderId)
      .single();

    if (fetchError) {
      console.error('Error fetching created order:', fetchError);
    }

    console.log('Order created successfully:', createdOrder);

// Store order ID in localStorage for client-side tracking
// const orders = JSON.parse(localStorage.getItem('orders')) || {};
// orders[orderId] = {
//   status: 'Order Received',
//   timestamp: new Date().toISOString()
// };
// localStorage.setItem('orders', JSON.stringify(orders));

    return orderId;
  } catch (error) {
    console.error('Error in createNewOrder:', error);
    throw error;
  }
};

export const getOrder = async (orderId) => {
  try {
    console.log('Fetching order:', orderId);

    // First try a simple connection test
    const testQuery = await supabase
      .from('orders')
      .select('orderId')
      .limit(1);
    
    console.log('Connection test result:', testQuery);

    if (testQuery.error) {
      throw new Error(`Database connection error: ${testQuery.error.message}`);
    }

    // Proceed with actual order fetch
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('orderId', orderId);

    if (error) {
      console.error('Error fetching order:', {
        error,
        orderId
      });
      throw new Error(`Failed to fetch order: ${error.message}`);
    }

    // Check if any orders were returned
    if (!data || data.length === 0) {
      throw new Error(`No order found with ID: ${orderId}`);
    }

    // Take the first order if multiple exist (shouldn't happen with proper orderId)
    const orderData = data[0];

    // Parse cart from JSON string to object
    if (orderData && typeof orderData.cart === 'string') {
      orderData.cart = JSON.parse(orderData.cart);
    }

    console.log('Order fetched successfully:', orderData);
    return orderData;
  } catch (error) {
    console.error('Error in getOrder:', error);
    
    // Try to get from localStorage as fallback
    try {
      const orders = JSON.parse(localStorage.getItem('orders')) || {};
      if (orders[orderId]) {
        console.log('Found order in localStorage:', orders[orderId]);
        return orders[orderId];
      }
    } catch (localStorageError) {
      console.error('Error reading from localStorage:', localStorageError);
    }
    
    throw error;
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    console.log('Updating order status:', { orderId, newStatus });

    const { data, error } = await supabase
      .from('orders')
      .update({
        status: newStatus,
        lastUpdated: new Date().toISOString()
      })
      .eq('orderId', orderId)
      .select();

    if (error) {
      console.error('Error updating order status:', {
        error,
        orderId,
        newStatus
      });
      throw new Error('Failed to update order status');
    }

    console.log('Order status updated successfully:', data);

// Update local storage to reflect the change
// const orders = JSON.parse(localStorage.getItem('orders')) || {};
// if (orders[orderId]) {
//   orders[orderId] = {
//     ...orders[orderId],
//     status: newStatus,
//     lastUpdated: new Date().toISOString()
//   };
//   localStorage.setItem('orders', JSON.stringify(orders));
// }

    return true;
  } catch (error) {
    console.error('Error in updateOrderStatus:', error);
    throw error;
  }
};

export const updateOrder = async (orderId, updateData) => {
  try {
    console.log('Updating order:', { orderId, updateData });

    // If cart is present in updateData and is an object, stringify it
    const formattedUpdateData = { ...updateData };
    if (formattedUpdateData.cart && typeof formattedUpdateData.cart === 'object') {
      formattedUpdateData.cart = JSON.stringify(formattedUpdateData.cart);
    }

    const { data, error } = await supabase
      .from('orders')
      .update({
        ...formattedUpdateData,
        lastUpdated: new Date().toISOString()
      })
      .eq('orderId', orderId)
      .select();

    if (error) {
      console.error('Error updating order:', {
        error,
        orderId,
        updateData
      });
      throw new Error('Failed to update order');
    }

    console.log('Order updated successfully:', data);

// Update localStorage if needed
// const orders = JSON.parse(localStorage.getItem('orders')) || {};
// if (orders[orderId]) {
//   orders[orderId] = {
//     ...orders[orderId],
//     ...updateData,
//     lastUpdated: new Date().toISOString()
//   };
//   localStorage.setItem('orders', JSON.stringify(orders));
// }

    return true;
  } catch (error) {
    console.error('Error in updateOrder:', error);
    throw error;
  }
};

export const getOrderStatus = async (orderId) => {
  try {
    console.log('Fetching order status:', orderId);
    
    // Try to get from Supabase first
    const { data, error } = await supabase
      .from('orders')
      .select('status')
      .eq('orderId', orderId)
      .single();

    if (error) {
      console.error('Error fetching order status from Supabase:', {
        error,
        orderId
      });
      
// Fall back to localStorage
// const orders = JSON.parse(localStorage.getItem('orders')) || {};
// const localStatus = orders[orderId]?.status;
// console.log('Using fallback status from localStorage:', localStatus);
// return localStatus || 'Pending';
    }

    console.log('Order status fetched successfully:', data);
    return data.status;
  } catch (error) {
    console.error('Error in getOrderStatus:', error);
// Fall back to localStorage as a last resort
// const orders = JSON.parse(localStorage.getItem('orders')) || {};
// return orders[orderId]?.status || 'Pending';
  }
};

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

// Cart management
export const updateCart = {
  addItem: (cart, item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      return cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
    return [...cart, { ...item, quantity: 1 }];
  },

  removeItem: (cart, item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (!existingItem) return cart;

    if (existingItem.quantity === 1) {
      return cart.filter(cartItem => cartItem.id !== item.id);
    }
    return cart.map(cartItem =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  },

  calculateTotal: (cart) => {
    return cart.reduce((total, item) =>
      total + (item.price * item.quantity), 0
    ).toFixed(2);
  }
};

// Telegram notification
export const sendToTelegram = async (orderData) => {
  try {
    console.log('Sending order notification to Telegram:', orderData);

    const message = `
🆕 NEW ORDER RECEIVED!

🔢 Order ID: ${orderData.orderId}
👤 Customer Name: ${orderData.customerName || 'N/A'}
📱 Phone: ${orderData.customerPhone}
📧 Email: ${orderData.customerEmail || 'N/A'}
📍 Delivery Location: ${orderData.deliveryLocation}
💰 Total Amount: GHS ${orderData.totalAmount}
🔖 Transaction ID: ${orderData.transactionId}
💳 Payment Method: ${orderData.network}
⏰ Order Time: ${new Date().toLocaleString()}

📋 Order Details:
${orderData.cart.map(item => `- ${item.name} x${item.quantity} (GHS ${(item.price * item.quantity).toFixed(2)})`).join('\n')}

💵 Total: GHS ${orderData.totalAmount}
`;

    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await axios.post(telegramApiUrl, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    });

    if (!response.data.ok) {
      console.error('Telegram API Error:', response.data);
      throw new Error(response.data.description || 'Failed to send Telegram notification');
    }

    console.log('Telegram notification sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Telegram notification error:', error.response?.data || error.message);
    throw error;
  }
};
