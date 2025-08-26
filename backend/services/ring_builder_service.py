from typing import List, Optional, Dict, Any
from motor.motor_asyncio import AsyncIOMotorDatabase
from models.ring_builder import *
import logging
from collections import Counter

logger = logging.getLogger(__name__)

class RingBuilderService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.stones_collection = db.stones
        self.settings_collection = db.settings
        self.metals_collection = db.metals
        self.configurations_collection = db.configurations
        self.quotes_collection = db.quote_requests
        
        # Initialize default data if collections are empty - will be called on first request
    
    async def _ensure_data_initialized(self):
        """Ensure collections have default data"""
        try:
            # Check if data exists
            stones_count = await self.stones_collection.count_documents({})
            
            if stones_count == 0:
                await self._seed_stones()
                await self._seed_settings()
                await self._seed_metals()
                logger.info("Initialized ring builder with default data")
        except Exception as e:
            logger.error(f"Error initializing default data: {e}")

    async def _seed_stones(self):
        """Seed stones collection with moissanite options"""
        stones_data = [
            {
                "name": "Round Moissanite",
                "type": "moissanite",
                "cut": "round",
                "sizes": [
                    {"carat": 0.5, "price": 450, "availability": "in_stock"},
                    {"carat": 0.75, "price": 580, "availability": "in_stock"},
                    {"carat": 1.0, "price": 750, "availability": "in_stock"},
                    {"carat": 1.25, "price": 920, "availability": "in_stock"},
                    {"carat": 1.5, "price": 1100, "availability": "in_stock"},
                    {"carat": 2.0, "price": 1480, "availability": "in_stock"}
                ],
                "images": ["https://images.unsplash.com/photo-1731533621924-efa45b8f48a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwY3V0c3xlbnwwfHx8fDE3NTYxODA1NTJ8MA&ixlib=rb-4.1.0&q=85"],
                "description": "The classic choice - maximum sparkle and brilliance",
                "is_active": True
            },
            {
                "name": "Oval Moissanite",
                "type": "moissanite", 
                "cut": "oval",
                "sizes": [
                    {"carat": 0.5, "price": 460, "availability": "in_stock"},
                    {"carat": 0.75, "price": 590, "availability": "in_stock"},
                    {"carat": 1.0, "price": 770, "availability": "in_stock"},
                    {"carat": 1.25, "price": 940, "availability": "in_stock"},
                    {"carat": 1.5, "price": 1120, "availability": "in_stock"},
                    {"carat": 2.0, "price": 1500, "availability": "in_stock"}
                ],
                "images": ["https://images.unsplash.com/photo-1731533621949-86a7b195884b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxkaWFtb25kJTIwY3V0c3xlbnwwfHx8fDE3NTYxODA1NTJ8MA&ixlib=rb-4.1.0&q=85"],
                "description": "Elegant and elongating - appears larger than round",
                "is_active": True
            },
            {
                "name": "Princess Moissanite",
                "type": "moissanite",
                "cut": "princess",
                "sizes": [
                    {"carat": 0.5, "price": 440, "availability": "in_stock"},
                    {"carat": 0.75, "price": 570, "availability": "in_stock"},
                    {"carat": 1.0, "price": 740, "availability": "in_stock"},
                    {"carat": 1.25, "price": 910, "availability": "in_stock"},
                    {"carat": 1.5, "price": 1090, "availability": "in_stock"},
                    {"carat": 2.0, "price": 1460, "availability": "in_stock"}
                ],
                "images": ["https://images.unsplash.com/photo-1731533621957-d33e6939ae9e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHxkaWFtb25kJTIwY3V0c3xlbnwwfHx8fDE3NTYxODA1NTJ8MA&ixlib=rb-4.1.0&q=85"],
                "description": "Modern square cut with exceptional fire and brilliance",
                "is_active": True
            },
            {
                "name": "Cushion Moissanite",
                "type": "moissanite",
                "cut": "cushion", 
                "sizes": [
                    {"carat": 0.5, "price": 470, "availability": "in_stock"},
                    {"carat": 0.75, "price": 600, "availability": "in_stock"},
                    {"carat": 1.0, "price": 780, "availability": "in_stock"},
                    {"carat": 1.25, "price": 950, "availability": "in_stock"},
                    {"carat": 1.5, "price": 1130, "availability": "in_stock"},
                    {"carat": 2.0, "price": 1510, "availability": "in_stock"}
                ],
                "images": ["https://images.pexels.com/photos/2735981/pexels-photo-2735981.jpeg"],
                "description": "Vintage-inspired with romantic appeal and soft corners",
                "is_active": True
            },
            {
                "name": "Emerald Moissanite",
                "type": "moissanite",
                "cut": "emerald",
                "sizes": [
                    {"carat": 0.5, "price": 480, "availability": "in_stock"},
                    {"carat": 0.75, "price": 610, "availability": "in_stock"},
                    {"carat": 1.0, "price": 790, "availability": "in_stock"},
                    {"carat": 1.25, "price": 960, "availability": "in_stock"},
                    {"carat": 1.5, "price": 1140, "availability": "in_stock"},
                    {"carat": 2.0, "price": 1520, "availability": "in_stock"}
                ],
                "images": ["https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg"],
                "description": "Art deco elegance with step-cut faceting",
                "is_active": True
            },
            {
                "name": "Pear Moissanite",
                "type": "moissanite",
                "cut": "pear",
                "sizes": [
                    {"carat": 0.5, "price": 465, "availability": "in_stock"},
                    {"carat": 0.75, "price": 595, "availability": "in_stock"},
                    {"carat": 1.0, "price": 775, "availability": "in_stock"},
                    {"carat": 1.25, "price": 945, "availability": "in_stock"},
                    {"carat": 1.5, "price": 1125, "availability": "in_stock"},
                    {"carat": 2.0, "price": 1505, "availability": "in_stock"}
                ],
                "images": ["https://images.unsplash.com/photo-1641885503196-3379a1725e3a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHw0fHxkaWFtb25kJTIwY3V0c3xlbnwwfHx8fDE3NTYxODA1NTJ8MA&ixlib=rb-4.1.0&q=85"],
                "description": "Unique teardrop shape that elongates the finger",
                "is_active": True
            }
        ]
        
        for stone_data in stones_data:
            stone = Stone(**stone_data)
            await self.stones_collection.insert_one(stone.dict())

    async def _seed_settings(self):
        """Seed settings collection"""
        settings_data = [
            {
                "name": "Classic Solitaire",
                "base_price": 180,
                "images": ["https://images.unsplash.com/photo-1559006864-38a01f201f95?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxlbmdhZ2VtZW50JTIwcmluZ3xlbnwwfHx8fDE3NTYxODA1Mzl8MA&ixlib=rb-4.1.0&q=85"],
                "description": "Timeless elegance that showcases your stone beautifully",
                "personality_tags": ["classic", "elegant", "timeless"],
                "is_active": True
            },
            {
                "name": "Halo Setting",
                "base_price": 280,
                "images": ["https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwyfHxlbmdhZ2VtZW50JTIwcmluZ3xlbnwwfHx8fDE3NTYxODA1Mzl8MA&ixlib=rb-4.1.0&q=85"],
                "description": "Makes your center stone appear larger with surrounding sparkle",
                "personality_tags": ["glamorous", "bold", "attention-loving"],
                "is_active": True
            },
            {
                "name": "Vintage Inspired",
                "base_price": 320,
                "images": ["https://images.unsplash.com/photo-1518370265276-f22b706aeac8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxlbmdhZ2VtZW50JTIwcmluZ3xlbnwwfHx8fDE3NTYxODA1Mzl8MA&ixlib=rb-4.1.0&q=85"],
                "description": "Romantic details with intricate metalwork and milgrain",
                "personality_tags": ["romantic", "artistic", "unique"],
                "is_active": True
            },
            {
                "name": "Three Stone",
                "base_price": 380,
                "images": ["https://images.unsplash.com/photo-1512217358397-b68c2bc84682?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHw0fHxlbmdhZ2VtZW50JTIwcmluZ3xlbnwwfHx8fDE3NTYxODA1Mzl8MA&ixlib=rb-4.0&q=85"],
                "description": "Symbolizes past, present, and future with three stones",
                "personality_tags": ["sentimental", "meaningful", "traditional"],
                "is_active": True
            },
            {
                "name": "Pavé Band",
                "base_price": 250,
                "images": ["https://images.pexels.com/photos/3156648/pexels-photo-3156648.jpeg"],
                "description": "Continuous sparkle with stones set along the band",
                "personality_tags": ["modern", "luxurious", "sophisticated"],
                "is_active": True
            },
            {
                "name": "Tension Setting",
                "base_price": 420,
                "images": ["https://images.unsplash.com/photo-1595538934869-503c9448981b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxyaW5nJTIwc2V0dGluZ3N8ZW58MHx8fHwxNzU2MTgwNTU3fDA&ixlib=rb-4.1.0&q=85"],
                "description": "Contemporary design that appears to suspend the stone",
                "personality_tags": ["modern", "innovative", "edgy"],
                "is_active": True
            }
        ]
        
        for setting_data in settings_data:
            setting = Setting(**setting_data)
            await self.settings_collection.insert_one(setting.dict())

    async def _seed_metals(self):
        """Seed metals collection"""
        metals_data = [
            {
                "name": "14K White Gold",
                "type": "gold",
                "multiplier": 1.0,
                "images": ["https://images.unsplash.com/photo-1642575904226-e43265872da4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyfHxyaW5nJTIwc2V0dGluZ3N8ZW58MHx8fHwxNzU2MTgwNTU3fDA&ixlib=rb-4.1.0&q=85"],
                "description": "Classic and versatile, complements any stone",
                "is_active": True
            },
            {
                "name": "14K Yellow Gold",
                "type": "gold",
                "multiplier": 1.05,
                "images": ["https://images.unsplash.com/photo-1602624019605-e0069c2d34ee?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwzfHxyaW5nJTIwc2V0dGluZ3N8ZW58MHx8fHwxNzU2MTgwNTU3fDA&ixlib=rb-4.1.0&q=85"],
                "description": "Warm and traditional, perfect for vintage styles",
                "is_active": True
            },
            {
                "name": "14K Rose Gold",
                "type": "gold",
                "multiplier": 1.08,
                "images": ["https://images.unsplash.com/photo-1599881546224-0a2831a0cc86?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHw0fHxyaW5nJTIwc2V0dGluZ3N8ZW58MHx8fHwxNzU2MTgwNTU3fDA&ixlib=rb-4.1.0&q=85"],
                "description": "Romantic and trendy, adds warmth to any design",
                "is_active": True
            },
            {
                "name": "Platinum",
                "type": "platinum",
                "multiplier": 1.35,
                "images": ["https://images.pexels.com/photos/5397688/pexels-photo-5397688.jpeg"],
                "description": "Premium durability and purity, hypoallergenic",
                "is_active": True
            }
        ]
        
        for metal_data in metals_data:
            metal = Metal(**metal_data)
            await self.metals_collection.insert_one(metal.dict())

    # CRUD Operations
    async def get_all_stones(self) -> List[Stone]:
        """Get all active stones"""
        await self._ensure_data_initialized()
        stones = await self.stones_collection.find({"is_active": True}).to_list(100)
        return [Stone(**stone) for stone in stones]

    async def get_all_settings(self) -> List[Setting]:
        """Get all active settings"""
        await self._ensure_data_initialized()
        settings = await self.settings_collection.find({"is_active": True}).to_list(100)
        return [Setting(**setting) for setting in settings]

    async def get_all_metals(self) -> List[Metal]:
        """Get all active metals"""
        await self._ensure_data_initialized()
        metals = await self.metals_collection.find({"is_active": True}).to_list(100)
        return [Metal(**metal) for metal in metals]

    async def get_stone_by_id(self, stone_id: str) -> Optional[Stone]:
        """Get stone by ID"""
        stone = await self.stones_collection.find_one({"id": stone_id})
        return Stone(**stone) if stone else None

    async def get_setting_by_id(self, setting_id: str) -> Optional[Setting]:
        """Get setting by ID"""
        setting = await self.settings_collection.find_one({"id": setting_id})
        return Setting(**setting) if setting else None

    async def get_metal_by_id(self, metal_id: str) -> Optional[Metal]:
        """Get metal by ID"""
        metal = await self.metals_collection.find_one({"id": metal_id})
        return Metal(**metal) if metal else None

    async def calculate_price(self, request: PriceCalculationRequest) -> PriceCalculationResponse:
        """Calculate total price for ring configuration"""
        stone = await self.get_stone_by_id(request.stone_id)
        setting = await self.get_setting_by_id(request.setting_id)
        metal = await self.get_metal_by_id(request.metal_id)
        
        if not all([stone, setting, metal]):
            raise ValueError("Invalid stone, setting, or metal ID")
        
        # Find stone price for carat
        stone_size = next((size for size in stone.sizes if size.carat == request.carat), None)
        if not stone_size:
            raise ValueError(f"Stone size {request.carat} carat not available")
        
        stone_price = stone_size.price
        setting_price = setting.base_price
        metal_adjustment = (stone_price + setting_price) * (metal.multiplier - 1.0)
        
        total_price = stone_price + setting_price + metal_adjustment
        
        return PriceCalculationResponse(
            total_price=round(total_price, 2),
            breakdown=PriceBreakdown(
                stone=stone_price,
                setting=setting_price,
                metal_adjustment=metal_adjustment
            ),
            details={
                "stone": stone.dict(),
                "setting": setting.dict(),
                "metal": metal.dict(),
                "carat": request.carat
            }
        )

    def get_quiz_questions(self) -> List[QuizQuestion]:
        """Get personality quiz questions"""
        questions = [
            {
                "id": 1,
                "question": "Which describes your partner's style best?",
                "options": [
                    {"text": "Classic and timeless", "personality": "classic"},
                    {"text": "Bold and glamorous", "personality": "glamorous"},
                    {"text": "Romantic and vintage-inspired", "personality": "romantic"},
                    {"text": "Modern and minimalist", "personality": "modern"},
                    {"text": "Unique and artistic", "personality": "artistic"}
                ]
            },
            {
                "id": 2,
                "question": "What's their ideal vacation?",
                "options": [
                    {"text": "Cozy cabin in the mountains", "personality": "classic"},
                    {"text": "Luxury resort with spa treatments", "personality": "glamorous"},
                    {"text": "Historic European city tour", "personality": "romantic"},
                    {"text": "Modern city with great architecture", "personality": "modern"},
                    {"text": "Off-the-beaten-path cultural experience", "personality": "artistic"}
                ]
            },
            {
                "id": 3,
                "question": "Their jewelry box mainly contains:",
                "options": [
                    {"text": "Simple, elegant pieces", "personality": "classic"},
                    {"text": "Statement jewelry with sparkle", "personality": "glamorous"},
                    {"text": "Antique or heirloom pieces", "personality": "romantic"},
                    {"text": "Clean, geometric designs", "personality": "modern"},
                    {"text": "Unique, handcrafted items", "personality": "artistic"}
                ]
            },
            {
                "id": 4,
                "question": "They prefer flowers that are:",
                "options": [
                    {"text": "White roses or peonies", "personality": "classic"},
                    {"text": "Bold orchids or lilies", "personality": "glamorous"},
                    {"text": "Garden roses or vintage varieties", "personality": "romantic"},
                    {"text": "Succulents or single stems", "personality": "modern"},
                    {"text": "Wildflowers or unusual varieties", "personality": "artistic"}
                ]
            }
        ]
        
        return [QuizQuestion(**q) for q in questions]

    async def analyze_quiz(self, request: QuizAnalysisRequest) -> QuizAnalysisResponse:
        """Analyze quiz responses and provide personality-based recommendations"""
        # Count personality types from answers
        personalities = [answer.get("personality") for answer in request.answers]
        personality_counts = Counter(personalities)
        
        # Get dominant personality
        dominant_personality = personality_counts.most_common(1)[0][0]
        confidence = personality_counts[dominant_personality] / len(personalities)
        
        # Get recommendations based on personality
        recommendations_map = {
            "classic": {
                "stone": "round",
                "setting": "solitaire",
                "metal": "white-gold",
                "description": "Perfect for someone who values timeless elegance and traditional beauty."
            },
            "glamorous": {
                "stone": "oval", 
                "setting": "halo",
                "metal": "white-gold",
                "description": "Ideal for someone who loves to sparkle and make a statement."
            },
            "romantic": {
                "stone": "cushion",
                "setting": "vintage",
                "metal": "rose-gold",
                "description": "Beautiful choice for someone with a romantic, vintage-loving soul."
            },
            "modern": {
                "stone": "princess",
                "setting": "tension",
                "metal": "platinum",
                "description": "Contemporary and sleek for the minimalist who appreciates modern design."
            },
            "artistic": {
                "stone": "pear",
                "setting": "three-stone",
                "metal": "yellow-gold",
                "description": "Unique and meaningful for the creative spirit who values individuality."
            }
        }
        
        recommendation_data = recommendations_map.get(dominant_personality, recommendations_map["classic"])
        
        return QuizAnalysisResponse(
            personality=dominant_personality,
            recommendation=PersonalityRecommendation(**recommendation_data),
            confidence=confidence
        )

    async def save_configuration(self, config: RingConfiguration) -> str:
        """Save ring configuration to database"""
        config_dict = config.dict()
        await self.configurations_collection.insert_one(config_dict)
        return config.id

    async def get_configuration(self, config_id: str) -> Optional[RingConfiguration]:
        """Get ring configuration by ID"""
        config = await self.configurations_collection.find_one({"id": config_id})
        return RingConfiguration(**config) if config else None

    async def submit_quote_request(self, request: QuoteRequest) -> QuoteRequestResponse:
        """Submit a quote request"""
        # Get the configuration
        config = await self.get_configuration(request.configuration_id)
        if not config:
            raise ValueError("Configuration not found")
        
        # Create quote request
        quote_request = QuoteRequestResponse(
            quote_request_id=str(uuid.uuid4()),
            configuration=config,
            customer_details=request.customer_details
        )
        
        # Save to database
        await self.quotes_collection.insert_one(quote_request.dict())
        
        return quote_request