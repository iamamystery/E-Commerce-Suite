from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os
from datetime import datetime
import random

app = FastAPI(title="LuxeCart AI Service", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock data for demonstration
mock_products = [
    {"_id": "1", "name": "Premium Wireless Headphones", "category": "Electronics", "price": 299, "description": "High-quality wireless headphones with noise cancellation", "tags": ["audio", "wireless", "premium"]},
    {"_id": "2", "name": "Luxury Leather Watch", "category": "Accessories", "price": 599, "description": "Handcrafted leather watch with Swiss movement", "tags": ["watch", "luxury", "leather"]},
    {"_id": "3", "name": "Designer Sunglasses", "category": "Accessories", "price": 249, "description": "UV protection sunglasses with polarized lenses", "tags": ["sunglasses", "designer", "fashion"]},
    {"_id": "4", "name": "Smart Home Hub", "category": "Electronics", "price": 199, "description": "Central hub for all your smart home devices", "tags": ["smart home", "automation", "tech"]},
    {"_id": "5", "name": "Minimalist Desk Lamp", "category": "Home & Living", "price": 129, "description": "Adjustable LED desk lamp with wireless charging", "tags": ["lamp", "office", "minimalist"]},
    {"_id": "6", "name": "Leather Messenger Bag", "category": "Fashion", "price": 349, "description": "Premium leather bag for professionals", "tags": ["bag", "leather", "professional"]},
]

class RecommendationRequest(BaseModel):
    user_id: Optional[str] = None
    product_history: List[str] = []
    browsing_history: List[str] = []
    limit: int = 4

class RecommendationResponse(BaseModel):
    recommendations: List[dict]
    confidence_score: float
    algorithm_version: str

class SimilarProductsRequest(BaseModel):
    product_id: str
    limit: int = 4

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ai-recommendations", "timestamp": datetime.now().isoformat()}

@app.post("/recommendations", response_model=RecommendationResponse)
async def get_recommendations(request: RecommendationRequest):
    """Get AI-powered product recommendations based on user history and preferences."""
    try:
        # In a real implementation, this would:
        # 1. Connect to MongoDB to get user data
        # 2. Load trained ML models
        # 3. Generate embeddings and compute similarities
        
        # For demonstration, we'll use a simple content-based filtering approach
        recommended = []
        
        if request.product_history or request.browsing_history:
            # Get categories from history
            history_ids = request.product_history + request.browsing_history
            
            # Simple category matching
            user_categories = set()
            for product in mock_products:
                if product["_id"] in history_ids:
                    user_categories.add(product["category"])
            
            # Find products in same categories (excluding already viewed)
            for product in mock_products:
                if product["_id"] not in history_ids and product["category"] in user_categories:
                    match_score = random.randint(85, 98)
                    recommended.append({
                        **product,
                        "match_score": match_score,
                        "match_reason": f"Based on your interest in {product['category']}"
                    })
        
        # If not enough recommendations, add trending items
        if len(recommended) < request.limit:
            existing_ids = {r["_id"] for r in recommended}
            existing_ids.update(request.product_history)
            existing_ids.update(request.browsing_history)
            
            for product in mock_products:
                if product["_id"] not in existing_ids and len(recommended) < request.limit:
                    recommended.append({
                        **product,
                        "match_score": random.randint(70, 84),
                        "match_reason": "Trending now"
                    })
        
        # Sort by match score and limit results
        recommended.sort(key=lambda x: x["match_score"], reverse=True)
        recommended = recommended[:request.limit]
        
        return RecommendationResponse(
            recommendations=recommended,
            confidence_score=random.uniform(0.85, 0.98),
            algorithm_version="1.0.0"
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/similar-products")
async def get_similar_products(request: SimilarProductsRequest):
    """Find similar products based on product features and category."""
    try:
        # Find source product
        source_product = None
        for p in mock_products:
            if p["_id"] == request.product_id:
                source_product = p
                break
        
        if not source_product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        # Find similar products (same category, similar price range)
        similar = []
        for product in mock_products:
            if product["_id"] != request.product_id:
                similarity_score = 0
                
                # Category match
                if product["category"] == source_product["category"]:
                    similarity_score += 40
                
                # Price similarity (within 50% range)
                price_diff = abs(product["price"] - source_product["price"])
                price_ratio = price_diff / source_product["price"]
                if price_ratio < 0.5:
                    similarity_score += 30 * (1 - price_ratio)
                
                # Tag overlap
                common_tags = set(product["tags"]) & set(source_product["tags"])
                similarity_score += len(common_tags) * 10
                
                if similarity_score > 20:
                    similar.append({
                        **product,
                        "similarity_score": min(100, int(similarity_score))
                    })
        
        similar.sort(key=lambda x: x["similarity_score"], reverse=True)
        return {"similar_products": similar[:request.limit]}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/insights")
async def get_ai_insights():
    """Get AI-generated insights about products and user behavior."""
    return {
        "trending_categories": ["Electronics", "Accessories", "Fashion"],
        "price_optimization": {
            "suggested_discounts": ["Accessories: 15%", "Electronics: 10%"],
            "high_demand_products": ["Premium Wireless Headphones", "Luxury Leather Watch"]
        },
        "inventory_alerts": [
            {"product": "Smart Home Hub", "status": "low_stock", "suggested_action": "Restock"}
        ],
        "generated_at": datetime.now().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
