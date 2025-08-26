import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Crown, Check } from 'lucide-react';

const SettingSelector = ({ settings, selected, onSelect }) => {
  return (
    <div>
      <div className="text-center mb-8">
        <Crown className="h-12 w-12 text-amber-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Your Setting</h2>
        <p className="text-gray-600">The perfect throne for your moissanite</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {settings.map((setting) => {
          const isSelected = selected?.id === setting.id;
          
          return (
            <Card 
              key={setting.id}
              className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected 
                  ? 'ring-2 ring-amber-500 bg-amber-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onSelect(setting)}
            >
              <div className="relative">
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-amber-500 text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
                
                <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200">
                  <img 
                    src={setting.image} 
                    alt={setting.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{setting.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{setting.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {setting.personality?.map((trait) => (
                      <Badge key={trait} variant="outline" className="text-xs capitalize">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-lg font-bold text-green-600">
                    +${setting.basePrice}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Setting Guide */}
      <Card className="mt-6 p-6 bg-gradient-to-r from-amber-50 to-orange-50">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Setting Guide</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium mb-2">Classic Settings</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Solitaire: Timeless elegance</li>
              <li>• Three Stone: Symbolic meaning</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Modern Settings</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Halo: Maximum sparkle</li>
              <li>• Pavé: Continuous brilliance</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingSelector;