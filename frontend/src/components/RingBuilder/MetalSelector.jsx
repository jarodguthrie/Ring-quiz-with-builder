import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Coins, Check, Info } from 'lucide-react';

const MetalSelector = ({ metals, selected, onSelect }) => {
  return (
    <div>
      <div className="text-center mb-8">
        <Coins className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Metal</h2>
        <p className="text-gray-600">The foundation of your perfect ring</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {metals.map((metal) => {
          const isSelected = selected?.id === metal.id;
          const isPremium = metal.multiplier > 1.2;
          
          return (
            <Card 
              key={metal.id}
              className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected 
                  ? 'ring-2 ring-yellow-500 bg-yellow-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onSelect(metal)}
            >
              <div className="relative">
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
                
                {isPremium && (
                  <Badge className="absolute top-2 left-2 bg-purple-500">
                    Premium
                  </Badge>
                )}
                
                <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200">
                  <img 
                    src={metal.image} 
                    alt={metal.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{metal.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{metal.description}</p>
                
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="secondary" 
                    className={`${
                      metal.multiplier === 1.0 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {metal.multiplier === 1.0 ? 'Base Price' : `+${Math.round((metal.multiplier - 1) * 100)}%`}
                  </Badge>
                  
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Info className="h-4 w-4" />
                    <span>{metal.multiplier}x</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Metal Information */}
      <Card className="mt-6 p-6 bg-gradient-to-r from-yellow-50 to-amber-50">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Metal Guide</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium mb-2 text-gray-800">Gold Options</h4>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>White Gold:</span>
                <span>Modern & versatile</span>
              </div>
              <div className="flex justify-between">
                <span>Yellow Gold:</span>
                <span>Classic & traditional</span>
              </div>
              <div className="flex justify-between">
                <span>Rose Gold:</span>
                <span>Romantic & trendy</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-gray-800">Premium Choice</h4>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Platinum:</span>
                <span>Ultimate durability</span>
              </div>
              <div className="text-xs">
                <div>• Hypoallergenic</div>
                <div>• Naturally white</div>
                <div>• Lifetime beauty</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MetalSelector;