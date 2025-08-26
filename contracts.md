# Ring Builder API Contracts & Implementation Plan

## 1. API Contracts

### Base URL: `/api/ring-builder`

#### A. Stone Management
```
GET /api/ring-builder/stones
- Returns: List of all moissanite stones with cuts, sizes, and pricing
- Response: { stones: [{ id, name, type, cut, sizes: [{ carat, price }], image, description }] }

GET /api/ring-builder/stones/{stone_id}/price?carat={carat}
- Returns: Price for specific stone and carat
- Response: { stone_id, carat, price }
```

#### B. Setting Management
```
GET /api/ring-builder/settings
- Returns: List of all ring settings
- Response: { settings: [{ id, name, basePrice, image, description, personality[] }] }
```

#### C. Metal Management
```
GET /api/ring-builder/metals
- Returns: List of all metal options
- Response: { metals: [{ id, name, multiplier, image, description }] }
```

#### D. Personality Quiz
```
GET /api/ring-builder/quiz/questions
- Returns: All quiz questions and options
- Response: { questions: [{ id, question, options: [{ text, personality }] }] }

POST /api/ring-builder/quiz/analyze
- Body: { answers: [{ questionId, personality }] }
- Returns: Dominant personality and recommendations
- Response: { personality, recommendation: { stone, setting, metal, description } }
```

#### E. Price Calculation
```
POST /api/ring-builder/calculate-price
- Body: { stoneId, settingId, metalId, carat }
- Returns: Detailed pricing breakdown
- Response: { 
    totalPrice, 
    breakdown: { stone: price, setting: price, metal: price },
    savings?: amount,
    details: { stone, setting, metal, carat }
  }
```

#### F. Ring Configuration & Quotes
```
POST /api/ring-builder/configurations
- Body: { stoneId, settingId, metalId, carat, personalityType?, customerInfo? }
- Returns: Saved configuration with ID
- Response: { configurationId, totalPrice, createdAt }

GET /api/ring-builder/configurations/{id}
- Returns: Full configuration details
- Response: { configuration with all product details }

POST /api/ring-builder/quote-request
- Body: { configurationId, customerDetails: { name, email, phone?, message? } }
- Returns: Quote request confirmation
- Response: { quoteRequestId, status, estimatedResponse }
```

## 2. Mocked Data Mapping

### Current Frontend Mock Data → Backend Models

#### Stones (ringData.stones)
- **Mock**: 6 moissanite cuts with carat sizes and pricing
- **Backend**: MongoDB collection with Shopify product integration
- **Fields**: name, cut, type, sizes[], images[], description, shopifyProductId

#### Settings (ringData.settings)  
- **Mock**: 6 setting types with base pricing and personality tags
- **Backend**: MongoDB collection with pricing rules
- **Fields**: name, basePrice, images[], description, personalityTags[], shopifyVariantId

#### Metals (ringData.metals)
- **Mock**: 4 metal types with price multipliers
- **Backend**: MongoDB collection with dynamic pricing
- **Fields**: name, type, multiplier, images[], description, shopifyOptionId

#### Quiz Data (ringData.personalityQuiz & recommendations)
- **Mock**: 4 questions with personality mapping
- **Backend**: Configurable quiz system in MongoDB
- **Fields**: questions[], personalityTypes{}, recommendations{}

## 3. Backend Implementation Requirements

### A. Database Models (MongoDB)
```python
# Stone Model
class Stone(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    type: str  # moissanite, diamond, lab-diamond
    cut: str   # round, oval, princess, etc.
    sizes: List[StoneSize]
    images: List[str]
    description: str
    shopify_product_id: Optional[str]
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class StoneSize(BaseModel):
    carat: float
    price: float
    availability: str = "in_stock"

# Setting Model
class Setting(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    base_price: float
    images: List[str] 
    description: str
    personality_tags: List[str]
    shopify_variant_id: Optional[str]
    is_active: bool = True

# Metal Model  
class Metal(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    type: str  # gold, platinum
    multiplier: float
    images: List[str]
    description: str
    shopify_option_id: Optional[str]
    is_active: bool = True

# Ring Configuration Model
class RingConfiguration(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    stone_id: str
    setting_id: str
    metal_id: str
    carat: float
    personality_type: Optional[str]
    total_price: float
    customer_info: Optional[Dict]
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
# Quiz Models
class QuizQuestion(BaseModel):
    id: int
    question: str
    options: List[QuizOption]

class QuizOption(BaseModel):  
    text: str
    personality: str
```

### B. Shopify Integration Points
1. **Product Sync**: Sync moissanite products from Shopify catalog
2. **Pricing Updates**: Real-time pricing from Shopify API
3. **Inventory Check**: Availability status for stones/settings
4. **Order Creation**: Create draft orders for quote requests

### C. Business Logic
1. **Dynamic Pricing**: Calculate real-time prices with promotions
2. **Personality Matching**: Algorithm to match quiz results to products
3. **Quote Management**: Generate detailed quotes with lead times
4. **Email Notifications**: Send quotes to customers and notifications to team

## 4. Frontend-Backend Integration Plan

### A. Replace Mock Data
1. **Remove**: `/app/frontend/src/data/mock.js`
2. **Add**: `/app/frontend/src/services/ringBuilderApi.js`
3. **Update**: All components to use real API calls

### B. API Service Implementation
```javascript
// ringBuilderApi.js
class RingBuilderAPI {
  async getStones() { /* GET /api/ring-builder/stones */ }
  async getSettings() { /* GET /api/ring-builder/settings */ }
  async getMetals() { /* GET /api/ring-builder/metals */ }
  async calculatePrice(config) { /* POST /api/ring-builder/calculate-price */ }
  async saveConfiguration(config) { /* POST /api/ring-builder/configurations */ }
  async submitQuoteRequest(data) { /* POST /api/ring-builder/quote-request */ }
}
```

### C. Component Updates
1. **RingBuilder.jsx**: Use API calls instead of mock data
2. **StoneSelector.jsx**: Real-time inventory and pricing
3. **PriceDisplay.jsx**: Live price updates with promotions
4. **PersonalityQuiz.jsx**: Dynamic quiz questions from backend

### D. State Management
- Add loading states for API calls
- Error handling for network issues  
- Caching for product data
- Real-time price updates

## 5. Key Features to Implement

### A. Phase 1: Core Backend
- [x] Stone, Setting, Metal APIs
- [x] Price calculation engine
- [x] Quiz system with recommendations
- [x] Configuration saving

### B. Phase 2: Shopify Integration  
- [ ] Product sync from Shopify
- [ ] Real-time pricing updates
- [ ] Inventory management
- [ ] Order draft creation

### C. Phase 3: Enhanced Features
- [ ] Quote request system
- [ ] Email notifications
- [ ] Admin dashboard for quotes
- [ ] Analytics and reporting

## 6. Environment Variables Required
```
# Shopify Integration
SHOPIFY_STORE_URL=moissaniteengagementrings.myshopify.com
SHOPIFY_ACCESS_TOKEN=your_private_app_token
SHOPIFY_WEBHOOK_SECRET=webhook_secret

# Email Configuration  
SMTP_HOST=smtp.gmail.com
SMTP_USER=your_email@domain.com
SMTP_PASSWORD=app_password
```

## 7. Testing Strategy
- Unit tests for pricing calculations
- Integration tests for Shopify API
- End-to-end tests for complete ring configuration
- Load testing for concurrent users

This contracts document will guide the seamless backend implementation and frontend integration to create a production-ready ring builder system.