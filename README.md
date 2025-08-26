# 💍 Dynamic Moissanite Ring Builder

A sophisticated full-stack application for creating custom moissanite engagement rings with personality-based recommendations, real-time pricing, and seamless user experience.

![Ring Builder Demo](https://img.shields.io/badge/Demo-Live-brightgreen)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110.1-green) 
![MongoDB](https://img.shields.io/badge/MongoDB-Ready-success)

## ✨ Features

### 🧠 **AI-Powered Personality Quiz**
- 4-question psychological assessment
- Smart recommendations based on partner's style
- Real-time personality analysis with backend processing

### 💎 **Complete Ring Customization**
- **6 Moissanite Cuts**: Round, Oval, Princess, Cushion, Emerald, Pear
- **6 Premium Settings**: Solitaire, Halo, Vintage, Three Stone, Pavé, Tension
- **4 Metal Options**: 14K White/Yellow/Rose Gold, Platinum
- **Dynamic Carat Selection**: 0.5ct to 2.0ct with smooth slider

### 💰 **Real-Time Pricing Engine**
- Live price calculations via API
- Detailed pricing breakdowns
- Metal multiplier adjustments (1.0x - 1.35x)
- Special offers and warranty information

### 🎨 **Professional UI/UX**
- Beautiful gradient designs (rose to amber)
- Smooth animations and micro-interactions
- Responsive design with mobile optimization
- Progress tracking with step-by-step guidance
- Professional typography using Inter font

### ⚡ **Advanced Features**
- Configuration saving to MongoDB
- Quote request management
- Direct appointment booking integration
- Error handling with elegant fallbacks
- Loading states and real-time feedback

## 🏗️ Architecture

### **Frontend (React 19)**
```
frontend/
├── src/
│   ├── components/
│   │   ├── RingBuilder/          # Main ring builder components
│   │   │   ├── RingBuilder.jsx   # Main container component
│   │   │   ├── PersonalityQuiz.jsx
│   │   │   ├── StoneSelector.jsx
│   │   │   ├── SettingSelector.jsx
│   │   │   ├── MetalSelector.jsx
│   │   │   └── PriceDisplay.jsx
│   │   └── ui/                   # Shadcn UI components (30+ components)
│   ├── services/
│   │   └── ringBuilderApi.js     # API service layer
│   ├── hooks/
│   │   └── use-toast.js          # Toast notifications
│   └── data/
│       └── (removed mock.js - using real API)
```

### **Backend (FastAPI + MongoDB)**
```
backend/
├── models/
│   └── ring_builder.py          # Pydantic models
├── services/
│   └── ring_builder_service.py  # Business logic
├── routers/
│   └── ring_builder.py          # API endpoints
└── server.py                    # FastAPI app
```

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ 
- Python 3.8+
- MongoDB (local or Atlas)
- Yarn package manager

### **Installation**

1. **Clone Repository**
```bash
git clone https://github.com/yourusername/moissanite-ring-builder.git
cd moissanite-ring-builder
```

2. **Backend Setup**
```bash
cd backend
pip install -r requirements.txt

# Create .env file
echo "MONGO_URL=mongodb://localhost:27017" > .env
echo "DB_NAME=ring_builder" >> .env

# Start backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

3. **Frontend Setup**
```bash
cd frontend
yarn install

# Create .env file  
echo "REACT_APP_BACKEND_URL=http://localhost:8001" > .env

# Start frontend
yarn start
```

4. **Access Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001/docs

## 📡 API Endpoints

### **Core Endpoints**
```
GET  /api/ring-builder/stones              # Get all moissanite stones
GET  /api/ring-builder/settings            # Get all ring settings  
GET  /api/ring-builder/metals              # Get all metal options
GET  /api/ring-builder/quiz/questions      # Get personality quiz
POST /api/ring-builder/quiz/analyze        # Analyze quiz results
POST /api/ring-builder/calculate-price     # Calculate ring price
POST /api/ring-builder/configurations      # Save ring configuration
POST /api/ring-builder/quote-request       # Submit quote request
```

### **Example API Usage**

**Calculate Price:**
```javascript
POST /api/ring-builder/calculate-price
{
  "stone_id": "stone-123",
  "setting_id": "setting-456", 
  "metal_id": "metal-789",
  "carat": 1.0
}

Response:
{
  "total_price": 930.0,
  "breakdown": {
    "stone": 750.0,
    "setting": 180.0,
    "metal_adjustment": 0.0
  }
}
```

## 💎 Business Logic

### **Pricing Algorithm**
```python
total_price = (stone_price + setting_base_price) × metal_multiplier

# Metal Multipliers:
# White Gold: 1.0x (base)
# Yellow Gold: 1.05x  
# Rose Gold: 1.08x
# Platinum: 1.35x
```

### **Personality Matching**
- **Classic**: Round stone + Solitaire + White Gold
- **Glamorous**: Oval stone + Halo + White Gold  
- **Romantic**: Cushion stone + Vintage + Rose Gold
- **Modern**: Princess stone + Tension + Platinum
- **Artistic**: Pear stone + Three Stone + Yellow Gold

## 🛠️ Tech Stack

### **Frontend**
- **React 19** - Latest React with modern features
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Premium component library (30+ components)
- **Axios** - HTTP client with interceptors
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon system

### **Backend** 
- **FastAPI** - High-performance async API framework
- **Pydantic** - Data validation and serialization
- **Motor** - Async MongoDB driver
- **MongoDB** - Document database
- **Python 3.8+** - Modern Python features

### **UI Components Available**
```
30+ Shadcn Components:
✓ Button, Card, Badge, Progress     ✓ Dialog, Sheet, Popover
✓ Input, Textarea, Select           ✓ Toast, Alert, Skeleton  
✓ Tabs, Accordion, Collapsible      ✓ Calendar, Date Picker
✓ Slider, Switch, Checkbox          ✓ Table, Pagination
✓ Avatar, Separator, Scroll Area    ✓ Command, Navigation Menu
And many more...
```

## 🔌 Shopify Integration (Future)

Planned integrations:
- Product sync from Shopify catalog
- Real-time inventory management  
- Automated order creation
- Pricing updates via Shopify API

## 📱 Screenshots

### Personality Quiz
Beautiful 4-question assessment with smooth transitions and progress tracking.

### Stone Selection  
Interactive moissanite selection with carat slider and real-time pricing.

### Final Configuration
Complete ring summary with booking integration and pricing breakdown.

## 🎯 Business Benefits

- **Increased Conversions**: Personalized recommendations boost engagement
- **Reduced Support Load**: Self-service configuration with clear guidance  
- **Higher AOV**: Premium options with transparent pricing
- **Lead Generation**: Quote requests with customer contact details
- **Professional Image**: Modern, sophisticated user experience

## 📊 Performance

- **Frontend**: Optimized React 19 with lazy loading
- **Backend**: Async FastAPI with MongoDB connection pooling
- **Database**: Indexed queries for sub-100ms response times
- **UI**: Smooth 60fps animations with CSS transforms

## 🔒 Security

- CORS configuration for production
- Input validation with Pydantic models
- Environment variable protection
- API rate limiting ready
- MongoDB connection security

## 🧪 Testing

Backend testing completed with 9/9 tests passing:
- ✅ Core API endpoints
- ✅ Price calculation accuracy  
- ✅ Quiz analysis functionality
- ✅ Database operations
- ✅ Error handling

## 🚀 Deployment

Ready for deployment on:
- **Frontend**: Vercel, Netlify, AWS Amplify
- **Backend**: Railway, Render, AWS ECS
- **Database**: MongoDB Atlas

## 📞 Support

For technical support or business inquiries:
- **Website**: https://moissaniteengagementrings.com.au
- **Booking**: [Consultation Page](https://moissaniteengagementrings.com.au/pages/showroom-appointment)

## 📄 License

This project is proprietary software for Moissanite Engagement Rings Australia.

---

**Built with ❤️ for creating perfect engagement ring experiences**
