import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { DollarSign, Sparkles, BookOpen, Calculator, Loader2 } from 'lucide-react';

const PriceDisplay = ({ price, stone, setting, metal, carat, loading = false }) => {
  const hasAllSelections = stone && setting && metal;
  
  const getBreakdown = () => {
    if (!hasAllSelections) return null;
    
    const stonePrice = stone.sizes?.find(s => s.carat === carat)?.price || 0;
    const settingPrice = setting.base_price || setting.basePrice || 0;
    const metalMultiplier = metal.multiplier || 1.0;
    const metalAdjustment = (stonePrice + settingPrice) * (metalMultiplier - 1.0);
    
    return {
      stone: stonePrice,
      setting: settingPrice,
      metal: metalAdjustment
    };
  };

  const breakdown = getBreakdown();

  return (
    <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="h-6 w-6 text-green-600" />
        <h3 className="text-xl font-bold text-gray-800">Ring Price</h3>
      </div>
      
      {hasAllSelections ? (
        <div className="space-y-4">
          {/* Total Price */}
          <div className="text-center p-4 bg-white rounded-lg border-2 border-green-200">
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="h-6 w-6 text-green-600 animate-spin mr-2" />
                <span className="text-lg font-medium text-gray-600">Calculating...</span>
              </div>
            ) : (
              <>
                <div className="text-3xl font-bold text-green-600 mb-1">
                  ${price.toLocaleString()}
                </div>
                <Badge className="bg-green-100 text-green-700">
                  Total Price
                </Badge>
              </>
            )}
          </div>
          
          {/* Price Breakdown */}
          {breakdown && !loading && (
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Breakdown
              </h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-white rounded">
                  <span className="text-gray-600">{stone.name} ({carat}ct)</span>
                  <span className="font-medium">${breakdown.stone.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-white rounded">
                  <span className="text-gray-600">{setting.name}</span>
                  <span className="font-medium">${breakdown.setting.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-white rounded">
                  <span className="text-gray-600">{metal.name}</span>
                  <span className="font-medium">
                    {metal.multiplier === 1.0 ? 'Included' : `+$${Math.round(breakdown.metal).toLocaleString()}`}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {/* Special Offers */}
          <div className="p-3 bg-gradient-to-r from-rose-100 to-amber-100 rounded-lg border border-rose-200">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-rose-500" />
              <span className="font-medium text-rose-700">Special Offers</span>
            </div>
            <ul className="text-xs text-rose-600 space-y-1">
              <li>• Lifetime warranty included</li>
              <li>• Free resizing within 60 days</li>
              <li>• 4-week crafting time</li>
              <li>• International shipping available</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 mb-2">Complete your selections</p>
          <p className="text-sm text-gray-400">Price will update as you choose</p>
        </div>
      )}
      
      {/* Action Buttons */}
      {hasAllSelections && !loading && (
        <div className="mt-6 space-y-2">
          <Button 
            className="w-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600"
            onClick={() => window.open('https://moissaniteengagementrings.com.au/pages/showroom-appointment', '_blank')}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Book Consultation
          </Button>
          
          <p className="text-xs text-center text-gray-500">
            Get expert advice and see your ring in person
          </p>
        </div>
      )}
    </Card>
  );
};

export default PriceDisplay;