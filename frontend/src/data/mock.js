// Mock data for Ring Builder
export const ringData = {
  stones: [
    {
      id: 'moissanite-round',
      name: 'Round Moissanite',
      type: 'moissanite',
      cut: 'round',
      sizes: [
        { carat: 0.5, price: 450 },
        { carat: 0.75, price: 580 },
        { carat: 1.0, price: 750 },
        { carat: 1.25, price: 920 },
        { carat: 1.5, price: 1100 },
        { carat: 2.0, price: 1480 }
      ],
      image: 'https://images.unsplash.com/photo-1731533621924-efa45b8f48a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwY3V0c3xlbnwwfHx8fDE3NTYxODA1NTJ8MA&ixlib=rb-4.1.0&q=85',
      description: 'The classic choice - maximum sparkle and brilliance'
    },
    {
      id: 'moissanite-oval',
      name: 'Oval Moissanite',
      type: 'moissanite',
      cut: 'oval',
      sizes: [
        { carat: 0.5, price: 460 },
        { carat: 0.75, price: 590 },
        { carat: 1.0, price: 770 },
        { carat: 1.25, price: 940 },
        { carat: 1.5, price: 1120 },
        { carat: 2.0, price: 1500 }
      ],
      image: 'https://images.unsplash.com/photo-1731533621949-86a7b195884b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxkaWFtb25kJTIwY3V0c3xlbnwwfHx8fDE3NTYxODA1NTJ8MA&ixlib=rb-4.1.0&q=85',
      description: 'Elegant and elongating - appears larger than round'
    },
    {
      id: 'moissanite-princess',
      name: 'Princess Moissanite',
      type: 'moissanite',
      cut: 'princess',
      sizes: [
        { carat: 0.5, price: 440 },
        { carat: 0.75, price: 570 },
        { carat: 1.0, price: 740 },
        { carat: 1.25, price: 910 },
        { carat: 1.5, price: 1090 },
        { carat: 2.0, price: 1460 }
      ],
      image: 'https://images.unsplash.com/photo-1731533621957-d33e6939ae9e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHxkaWFtb25kJTIwY3V0c3xlbnwwfHx8fDE3NTYxODA1NTJ8MA&ixlib=rb-4.1.0&q=85',
      description: 'Modern square cut with exceptional fire and brilliance'
    },
    {
      id: 'moissanite-cushion',
      name: 'Cushion Moissanite',
      type: 'moissanite',
      cut: 'cushion',
      sizes: [
        { carat: 0.5, price: 470 },
        { carat: 0.75, price: 600 },
        { carat: 1.0, price: 780 },
        { carat: 1.25, price: 950 },
        { carat: 1.5, price: 1130 },
        { carat: 2.0, price: 1510 }
      ],
      image: 'https://images.pexels.com/photos/2735981/pexels-photo-2735981.jpeg',
      description: 'Vintage-inspired with romantic appeal and soft corners'
    },
    {
      id: 'moissanite-emerald',
      name: 'Emerald Moissanite',
      type: 'moissanite',
      cut: 'emerald',
      sizes: [
        { carat: 0.5, price: 480 },
        { carat: 0.75, price: 610 },
        { carat: 1.0, price: 790 },
        { carat: 1.25, price: 960 },
        { carat: 1.5, price: 1140 },
        { carat: 2.0, price: 1520 }
      ],
      image: 'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg',
      description: 'Art deco elegance with step-cut faceting'
    },
    {
      id: 'moissanite-pear',
      name: 'Pear Moissanite',
      type: 'moissanite',
      cut: 'pear',
      sizes: [
        { carat: 0.5, price: 465 },
        { carat: 0.75, price: 595 },
        { carat: 1.0, price: 775 },
        { carat: 1.25, price: 945 },
        { carat: 1.5, price: 1125 },
        { carat: 2.0, price: 1505 }
      ],
      image: 'https://images.unsplash.com/photo-1641885503196-3379a1725e3a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHw0fHxkaWFtb25kJTIwY3V0c3xlbnwwfHx8fDE3NTYxODA1NTJ8MA&ixlib=rb-4.1.0&q=85',
      description: 'Unique teardrop shape that elongates the finger'
    }
  ],
  
  settings: [
    {
      id: 'solitaire',
      name: 'Classic Solitaire',
      basePrice: 180,
      image: 'https://images.unsplash.com/photo-1559006864-38a01f201f95?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxlbmdhZ2VtZW50JTIwcmluZ3xlbnwwfHx8fDE3NTYxODA1Mzl8MA&ixlib=rb-4.1.0&q=85',
      description: 'Timeless elegance that showcases your stone beautifully',
      personality: ['classic', 'elegant', 'timeless']
    },
    {
      id: 'halo',
      name: 'Halo Setting',
      basePrice: 280,
      image: 'https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwyfHxlbmdhZ2VtZW50JTIwcmluZ3xlbnwwfHx8fDE3NTYxODA1Mzl8MA&ixlib=rb-4.1.0&q=85',
      description: 'Makes your center stone appear larger with surrounding sparkle',
      personality: ['glamorous', 'bold', 'attention-loving']
    },
    {
      id: 'vintage',
      name: 'Vintage Inspired',
      basePrice: 320,
      image: 'https://images.unsplash.com/photo-1518370265276-f22b706aeac8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxlbmdhZ2VtZW50JTIwcmluZ3xlbnwwfHx8fDE3NTYxODA1Mzl8MA&ixlib=rb-4.1.0&q=85',
      description: 'Romantic details with intricate metalwork and milgrain',
      personality: ['romantic', 'artistic', 'unique']
    },
    {
      id: 'three-stone',
      name: 'Three Stone',
      basePrice: 380,
      image: 'https://images.unsplash.com/photo-1512217358397-b68c2bc84682?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHw0fHxlbmdhZ2VtZW50JTIwcmluZ3xlbnwwfHx8fDE3NTYxODA1Mzl8MA&ixlib=rb-4.0&q=85',
      description: 'Symbolizes past, present, and future with three stones',
      personality: ['sentimental', 'meaningful', 'traditional']
    },
    {
      id: 'pave',
      name: 'Pavé Band',
      basePrice: 250,
      image: 'https://images.pexels.com/photos/3156648/pexels-photo-3156648.jpeg',
      description: 'Continuous sparkle with stones set along the band',
      personality: ['modern', 'luxurious', 'sophisticated']
    },
    {
      id: 'tension',
      name: 'Tension Setting',
      basePrice: 420,
      image: 'https://images.unsplash.com/photo-1595538934869-503c9448981b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxyaW5nJTIwc2V0dGluZ3N8ZW58MHx8fHwxNzU2MTgwNTU3fDA&ixlib=rb-4.1.0&q=85',
      description: 'Contemporary design that appears to suspend the stone',
      personality: ['modern', 'innovative', 'edgy']
    }
  ],
  
  metals: [
    {
      id: 'white-gold',
      name: '14K White Gold',
      multiplier: 1.0,
      image: 'https://images.unsplash.com/photo-1642575904226-e43265872da4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyfHxyaW5nJTIwc2V0dGluZ3N8ZW58MHx8fHwxNzU2MTgwNTU3fDA&ixlib=rb-4.1.0&q=85',
      description: 'Classic and versatile, complements any stone'
    },
    {
      id: 'yellow-gold',
      name: '14K Yellow Gold',
      multiplier: 1.05,
      image: 'https://images.unsplash.com/photo-1602624019605-e0069c2d34ee?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwzfHxyaW5nJTIwc2V0dGluZ3N8ZW58MHx8fHwxNzU2MTgwNTU3fDA&ixlib=rb-4.1.0&q=85',
      description: 'Warm and traditional, perfect for vintage styles'
    },
    {
      id: 'rose-gold',
      name: '14K Rose Gold',
      multiplier: 1.08,
      image: 'https://images.unsplash.com/photo-1599881546224-0a2831a0cc86?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHw0fHxyaW5nJTIwc2V0dGluZ3N8ZW58MHx8fHwxNzU2MTgwNTU3fDA&ixlib=rb-4.1.0&q=85',
      description: 'Romantic and trendy, adds warmth to any design'
    },
    {
      id: 'platinum',
      name: 'Platinum',
      multiplier: 1.35,
      image: 'https://images.pexels.com/photos/5397688/pexels-photo-5397688.jpeg',
      description: 'Premium durability and purity, hypoallergenic'
    }
  ],

  personalityQuiz: [
    {
      id: 1,
      question: "Which describes your partner's style best?",
      options: [
        { text: "Classic and timeless", personality: 'classic' },
        { text: "Bold and glamorous", personality: 'glamorous' },
        { text: "Romantic and vintage-inspired", personality: 'romantic' },
        { text: "Modern and minimalist", personality: 'modern' },
        { text: "Unique and artistic", personality: 'artistic' }
      ]
    },
    {
      id: 2,
      question: "What's their ideal vacation?",
      options: [
        { text: "Cozy cabin in the mountains", personality: 'classic' },
        { text: "Luxury resort with spa treatments", personality: 'glamorous' },
        { text: "Historic European city tour", personality: 'romantic' },
        { text: "Modern city with great architecture", personality: 'modern' },
        { text: "Off-the-beaten-path cultural experience", personality: 'artistic' }
      ]
    },
    {
      id: 3,
      question: "Their jewelry box mainly contains:",
      options: [
        { text: "Simple, elegant pieces", personality: 'classic' },
        { text: "Statement jewelry with sparkle", personality: 'glamorous' },
        { text: "Antique or heirloom pieces", personality: 'romantic' },
        { text: "Clean, geometric designs", personality: 'modern' },
        { text: "Unique, handcrafted items", personality: 'artistic' }
      ]
    },
    {
      id: 4,
      question: "They prefer flowers that are:",
      options: [
        { text: "White roses or peonies", personality: 'classic' },
        { text: "Bold orchids or lilies", personality: 'glamorous' },
        { text: "Garden roses or vintage varieties", personality: 'romantic' },
        { text: "Succulents or single stems", personality: 'modern' },
        { text: "Wildflowers or unusual varieties", personality: 'artistic' }
      ]
    }
  ],

  recommendations: {
    classic: {
      stone: 'round',
      setting: 'solitaire',
      metal: 'white-gold',
      description: 'Perfect for someone who values timeless elegance and traditional beauty.'
    },
    glamorous: {
      stone: 'oval',
      setting: 'halo',
      metal: 'white-gold',
      description: 'Ideal for someone who loves to sparkle and make a statement.'
    },
    romantic: {
      stone: 'cushion',
      setting: 'vintage',
      metal: 'rose-gold',
      description: 'Beautiful choice for someone with a romantic, vintage-loving soul.'
    },
    modern: {
      stone: 'princess',
      setting: 'tension',
      metal: 'platinum',
      description: 'Contemporary and sleek for the minimalist who appreciates modern design.'
    },
    artistic: {
      stone: 'pear',
      setting: 'three-stone',
      metal: 'yellow-gold',
      description: 'Unique and meaningful for the creative spirit who values individuality.'
    }
  }
};

export const calculatePrice = (stone, setting, metal, carat) => {
  if (!stone || !setting || !metal || !carat) return 0;
  
  const stonePrice = stone.sizes.find(s => s.carat === carat)?.price || 0;
  const settingPrice = setting.basePrice;
  const metalMultiplier = metal.multiplier;
  
  return Math.round((stonePrice + settingPrice) * metalMultiplier);
};