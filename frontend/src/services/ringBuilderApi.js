import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api/ring-builder`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export class RingBuilderAPI {
  // Stone endpoints
  static async getStones() {
    try {
      const response = await api.get('/stones');
      return response.data;
    } catch (error) {
      console.error('Error fetching stones:', error);
      throw new Error('Failed to fetch stones. Please try again.');
    }
  }

  static async getStonePrice(stoneId, carat) {
    try {
      const response = await api.get(`/stones/${stoneId}/price?carat=${carat}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stone price:', error);
      throw new Error('Failed to fetch stone price. Please try again.');
    }
  }

  // Setting endpoints
  static async getSettings() {
    try {
      const response = await api.get('/settings');
      return response.data;
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw new Error('Failed to fetch settings. Please try again.');
    }
  }

  // Metal endpoints
  static async getMetals() {
    try {
      const response = await api.get('/metals');
      return response.data;
    } catch (error) {
      console.error('Error fetching metals:', error);
      throw new Error('Failed to fetch metals. Please try again.');
    }
  }

  // Quiz endpoints
  static async getQuizQuestions() {
    try {
      const response = await api.get('/quiz/questions');
      return response.data;
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
      throw new Error('Failed to fetch quiz questions. Please try again.');
    }
  }

  static async analyzeQuiz(answers) {
    try {
      const response = await api.post('/quiz/analyze', { answers });
      return response.data;
    } catch (error) {
      console.error('Error analyzing quiz:', error);
      throw new Error('Failed to analyze quiz results. Please try again.');
    }
  }

  // Price calculation
  static async calculatePrice(stoneId, settingId, metalId, carat) {
    try {
      const response = await api.post('/calculate-price', {
        stone_id: stoneId,
        setting_id: settingId,
        metal_id: metalId,
        carat: carat
      });
      return response.data;
    } catch (error) {
      console.error('Error calculating price:', error);
      throw new Error('Failed to calculate price. Please try again.');
    }
  }

  // Configuration management
  static async saveConfiguration(stoneId, settingId, metalId, carat, personalityType = null) {
    try {
      const params = new URLSearchParams({
        stone_id: stoneId,
        setting_id: settingId,
        metal_id: metalId,
        carat: carat.toString()
      });
      
      if (personalityType) {
        params.append('personality_type', personalityType);
      }

      const response = await api.post(`/configurations?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error saving configuration:', error);
      throw new Error('Failed to save ring configuration. Please try again.');
    }
  }

  static async getConfiguration(configurationId) {
    try {
      const response = await api.get(`/configurations/${configurationId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching configuration:', error);
      throw new Error('Failed to fetch configuration. Please try again.');
    }
  }

  // Quote request
  static async submitQuoteRequest(configurationId, customerDetails) {
    try {
      const response = await api.post('/quote-request', {
        configuration_id: configurationId,
        customer_details: customerDetails
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting quote request:', error);
      throw new Error('Failed to submit quote request. Please try again.');
    }
  }

  // Health check
  static async healthCheck() {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'unhealthy' };
    }
  }
}

// Helper function to calculate price (fallback for mock compatibility)
export const calculatePrice = async (stone, setting, metal, carat) => {
  if (!stone || !setting || !metal || !carat) return 0;
  
  try {
    const response = await RingBuilderAPI.calculatePrice(stone.id, setting.id, metal.id, carat);
    return response.total_price;
  } catch (error) {
    console.error('Price calculation failed:', error);
    // Fallback to mock calculation
    const stonePrice = stone.sizes?.find(s => s.carat === carat)?.price || 0;
    const settingPrice = setting.base_price || setting.basePrice || 0;
    const metalMultiplier = metal.multiplier || 1.0;
    
    return Math.round((stonePrice + settingPrice) * metalMultiplier);
  }
};

export default RingBuilderAPI;