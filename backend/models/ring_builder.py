from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime
import uuid

class StoneSize(BaseModel):
    carat: float
    price: float
    availability: str = "in_stock"

class Stone(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    type: str  # moissanite, diamond, lab-diamond
    cut: str   # round, oval, princess, etc.
    sizes: List[StoneSize]
    images: List[str]
    description: str
    shopify_product_id: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class Setting(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    base_price: float
    images: List[str] 
    description: str
    personality_tags: List[str]
    shopify_variant_id: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class Metal(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    type: str  # gold, platinum
    multiplier: float
    images: List[str]
    description: str
    shopify_option_id: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class QuizOption(BaseModel):  
    text: str
    personality: str

class QuizQuestion(BaseModel):
    id: int
    question: str
    options: List[QuizOption]

class PersonalityRecommendation(BaseModel):
    stone: str  # cut type
    setting: str  # setting id
    metal: str  # metal id
    description: str

class QuizAnalysisRequest(BaseModel):
    answers: List[Dict[str, str]]  # [{"questionId": "1", "personality": "classic"}]

class QuizAnalysisResponse(BaseModel):
    personality: str
    recommendation: PersonalityRecommendation
    confidence: float

class PriceCalculationRequest(BaseModel):
    stone_id: str
    setting_id: str
    metal_id: str
    carat: float

class PriceBreakdown(BaseModel):
    stone: float
    setting: float
    metal_adjustment: float

class PriceCalculationResponse(BaseModel):
    total_price: float
    breakdown: PriceBreakdown
    savings: Optional[float] = None
    details: Dict

class RingConfiguration(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    stone_id: str
    setting_id: str
    metal_id: str
    carat: float
    personality_type: Optional[str] = None
    total_price: float
    customer_info: Optional[Dict] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class CustomerDetails(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    message: Optional[str] = None

class QuoteRequest(BaseModel):
    configuration_id: str
    customer_details: CustomerDetails

class QuoteRequestResponse(BaseModel):
    quote_request_id: str
    status: str = "submitted"
    estimated_response: str = "24-48 hours"
    configuration: RingConfiguration
    customer_details: CustomerDetails
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }