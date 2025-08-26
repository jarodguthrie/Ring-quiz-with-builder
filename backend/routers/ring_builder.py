from fastapi import APIRouter, HTTPException, Depends
from typing import List
from motor.motor_asyncio import AsyncIOMotorDatabase
from models.ring_builder import *
from services.ring_builder_service import RingBuilderService
import logging

logger = logging.getLogger(__name__)

# Create router
router = APIRouter(prefix="/ring-builder", tags=["Ring Builder"])

# Dependency to get database (will be injected)
def get_db() -> AsyncIOMotorDatabase:
    from server import db
    return db

def get_ring_service(db: AsyncIOMotorDatabase = Depends(get_db)) -> RingBuilderService:
    return RingBuilderService(db)

@router.get("/stones", response_model=List[Stone])
async def get_stones(service: RingBuilderService = Depends(get_ring_service)):
    """Get all available moissanite stones"""
    try:
        stones = await service.get_all_stones()
        return stones
    except Exception as e:
        logger.error(f"Error fetching stones: {e}")
        raise HTTPException(status_code=500, detail="Error fetching stones")

@router.get("/settings", response_model=List[Setting])
async def get_settings(service: RingBuilderService = Depends(get_ring_service)):
    """Get all available ring settings"""
    try:
        settings = await service.get_all_settings()
        return settings
    except Exception as e:
        logger.error(f"Error fetching settings: {e}")
        raise HTTPException(status_code=500, detail="Error fetching settings")

@router.get("/metals", response_model=List[Metal])
async def get_metals(service: RingBuilderService = Depends(get_ring_service)):
    """Get all available metal options"""
    try:
        metals = await service.get_all_metals()
        return metals
    except Exception as e:
        logger.error(f"Error fetching metals: {e}")
        raise HTTPException(status_code=500, detail="Error fetching metals")

@router.get("/stones/{stone_id}/price")
async def get_stone_price(
    stone_id: str, 
    carat: float,
    service: RingBuilderService = Depends(get_ring_service)
):
    """Get price for specific stone and carat size"""
    try:
        stone = await service.get_stone_by_id(stone_id)
        if not stone:
            raise HTTPException(status_code=404, detail="Stone not found")
        
        # Find price for carat
        stone_size = next((size for size in stone.sizes if size.carat == carat), None)
        if not stone_size:
            raise HTTPException(status_code=404, detail=f"Stone size {carat} carat not available")
        
        return {
            "stone_id": stone_id,
            "carat": carat,
            "price": stone_size.price,
            "availability": stone_size.availability
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching stone price: {e}")
        raise HTTPException(status_code=500, detail="Error fetching stone price")

@router.get("/quiz/questions", response_model=List[QuizQuestion])
async def get_quiz_questions(service: RingBuilderService = Depends(get_ring_service)):
    """Get personality quiz questions"""
    try:
        questions = service.get_quiz_questions()
        return questions
    except Exception as e:
        logger.error(f"Error fetching quiz questions: {e}")
        raise HTTPException(status_code=500, detail="Error fetching quiz questions")

@router.post("/quiz/analyze", response_model=QuizAnalysisResponse)
async def analyze_quiz(
    request: QuizAnalysisRequest,
    service: RingBuilderService = Depends(get_ring_service)
):
    """Analyze quiz responses and get personality-based recommendations"""
    try:
        analysis = await service.analyze_quiz(request)
        return analysis
    except Exception as e:
        logger.error(f"Error analyzing quiz: {e}")
        raise HTTPException(status_code=500, detail="Error analyzing quiz")

@router.post("/calculate-price", response_model=PriceCalculationResponse)
async def calculate_price(
    request: PriceCalculationRequest,
    service: RingBuilderService = Depends(get_ring_service)
):
    """Calculate total price for ring configuration"""
    try:
        price_response = await service.calculate_price(request)
        return price_response
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error calculating price: {e}")
        raise HTTPException(status_code=500, detail="Error calculating price")

@router.post("/configurations", response_model=dict)
async def save_configuration(
    stone_id: str,
    setting_id: str,
    metal_id: str,
    carat: float,
    personality_type: str = None,
    service: RingBuilderService = Depends(get_ring_service)
):
    """Save ring configuration"""
    try:
        # Calculate price first
        price_request = PriceCalculationRequest(
            stone_id=stone_id,
            setting_id=setting_id,
            metal_id=metal_id,
            carat=carat
        )
        price_response = await service.calculate_price(price_request)
        
        # Create configuration
        config = RingConfiguration(
            stone_id=stone_id,
            setting_id=setting_id,
            metal_id=metal_id,
            carat=carat,
            personality_type=personality_type,
            total_price=price_response.total_price
        )
        
        config_id = await service.save_configuration(config)
        
        return {
            "configuration_id": config_id,
            "total_price": price_response.total_price,
            "created_at": config.created_at.isoformat()
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error saving configuration: {e}")
        raise HTTPException(status_code=500, detail="Error saving configuration")

@router.get("/configurations/{config_id}", response_model=RingConfiguration)
async def get_configuration(
    config_id: str,
    service: RingBuilderService = Depends(get_ring_service)
):
    """Get ring configuration by ID"""
    try:
        config = await service.get_configuration(config_id)
        if not config:
            raise HTTPException(status_code=404, detail="Configuration not found")
        return config
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching configuration: {e}")
        raise HTTPException(status_code=500, detail="Error fetching configuration")

@router.post("/quote-request", response_model=QuoteRequestResponse)
async def submit_quote_request(
    request: QuoteRequest,
    service: RingBuilderService = Depends(get_ring_service)
):
    """Submit a quote request for ring configuration"""
    try:
        quote_response = await service.submit_quote_request(request)
        return quote_response
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error submitting quote request: {e}")
        raise HTTPException(status_code=500, detail="Error submitting quote request")

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "ring-builder"}