import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Gem, Check } from 'lucide-react';

const StoneSelector = ({ stones, selected, onSelect, selectedCarat, onCaratChange }) => {
  const getStonePrice = (stone, carat) => {
    const size = stone.sizes.find(s => s.carat === carat);
    return size ? size.price : 0;
  };

  return (
    <div>
      <div className="text-center mb-8">
        <Gem className="h-12 w-12 text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Moissanite</h2>
        <p className="text-gray-600">Select the cut and size that speaks to your heart</p>
      </div>

      {/* Carat Size Slider */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Carat Size: {selectedCarat}</h3>
        <div className="px-4">
          <Slider
            value={[selectedCarat]}
            onValueChange={([value]) => onCaratChange(value)}
            min={0.5}
            max={2.0}
            step={0.25}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>0.5 ct</span>
            <span>1.25 ct</span>
            <span>2.0 ct</span>
          </div>
        </div>
      </Card>

      {/* Stone Options */}
      <div className="grid md:grid-cols-2 gap-6">
        {stones.map((stone) => {
          const price = getStonePrice(stone, selectedCarat);
          const isSelected = selected?.id === stone.id;
          
          return (
            <Card 
              key={stone.id}
              className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onSelect(stone)}
            >
              <div className="relative">
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
                
                <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200">
                  <img 
                    src={stone.image} 
                    alt={stone.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{stone.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{stone.description}</p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {selectedCarat} carat
                  </Badge>
                  <span className="text-lg font-bold text-green-600">
                    ${price.toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Stone Information */}
      <Card className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Why Moissanite?</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl mb-2">💎</div>
            <div className="font-medium">Brighter Than Diamond</div>
            <div className="text-gray-600">Higher refractive index</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🛡️</div>
            <div className="font-medium">9.25/10 Hardness</div>
            <div className="text-gray-600">Extremely durable</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🌱</div>
            <div className="font-medium">Ethically Made</div>
            <div className="text-gray-600">Lab-created beauty</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StoneSelector;