export const dummyBookingData = [
  { id: 1, item: "Upma", slot: "breakfast", veg: true, bookings: 120, 
    ingredients: { rava: 15, vegetables: 5, oil: 2 } },
  { id: 2, item: "Fried Egg", slot: "breakfast", veg: false, bookings: 85, 
    ingredients: { eggs: 85, oil: 1 } },
  { id: 3, item: "Plain White Rice", slot: "lunch", veg: true, bookings: 200, 
    ingredients: { rice: 30 } },
  { id: 4, item: "Raw Mango Sambar", slot: "lunch", veg: true, bookings: 180, 
    ingredients: { lentils: 10, mango: 5, vegetables: 8 } },
  { id: 5, item: "Cabbage Poriyal", slot: "lunch", veg: true, bookings: 90, 
    ingredients: { cabbage: 10, coconut: 2 } },
  { id: 6, item: "Soya Chunk Gravy", slot: "lunch", veg: true, bookings: 150, 
    ingredients: { soya: 8, tomatoes: 5, onions: 4 } },
  { id: 7, item: "Chappati", slot: "lunch", veg: true, bookings: 220, 
    ingredients: { wheat: 25, oil: 3 } },
  { id: 8, item: "Sundal", slot: "snack", veg: true, bookings: 70, 
    ingredients: { chickpeas: 7, coconut: 1 } },
  { id: 9, item: "Parotta", slot: "dinner", veg: true, bookings: 160, 
    ingredients: { maida: 20, oil: 5 } },
  { id: 10, item: "Mix Veg Gravy", slot: "dinner", veg: true, bookings: 110, 
    ingredients: { vegetables: 12, coconut: 3 } },
  { id: 11, item: "Mix Non-Veg Gravy", slot: "dinner", veg: false, bookings: 95, 
    ingredients: { chicken: 15, onions: 5, tomatoes: 5 } },
];

export const menuItems = [
    {
      id: '1',
      item: 'Upma',
      desc: 'Rava Upma with Sambar and Chutney',
      veg: true,
      slot: 'breakfast',
      date: new Date('2023-06-15')
    },
    {
      id: '2',
      item: 'Fried Egg',
      desc: 'Single egg, cooked on both sides.',
      veg: false,
      slot: 'breakfast',
      date: new Date('2023-06-15')
    },
    {
      id: '3',
      item: 'Plain White Rice',
      desc: 'Simple, plain white rice',
      veg: true,
      slot: 'lunch',
      date: new Date('2023-06-15')
    },
    {
      id: '4',
      item: 'Raw Mango Sambar',
      desc: 'Layers of pasta with seasonal vegetables and cheese',
      veg: true,
      slot: 'lunch',
      date: new Date('2023-06-15')
    },
    {
      id: '5',
      item: 'Cabbage Poriyal',
      desc: 'Dry cabbage, onion and carrot veggie',
      veg: true,
      slot: 'lunch',
      date: new Date('2023-06-15')
    },
    {
      id: '6',
      item: 'Soya Chunk Gravy',
      desc: 'Soya Chunks in a red gravy base',
      veg: true,
      slot: 'lunch',
      date: new Date('2023-06-15')
    },
    {
      id: '7',
      item: 'Chappati',
      desc: 'With added maida!',
      veg: true,
      slot: 'lunch',
      date: new Date('2023-06-15')
    },
    {
      id: '8',
      item: 'Sundal',
      desc: 'Mixture of Peanuts and Corn',
      veg: true,
      slot: 'snack',
      date: new Date('2023-06-15')
    },
    {
      id: '9',
      item: 'Parotta',
      desc: 'Layered and oily parotta to eat with your gravy',
      veg: true,
      cal: 120,
      slot: 'dinner',
      date: new Date('2023-06-15')
    },
    {
      id: '10',
      item: 'Mix Veg Gravy',
      desc: 'Eat with parotta',
      veg: true,
      slot: 'dinner',
      date: new Date('2023-06-15')
    },
    {
      id: '11',
      item: 'Mix Non-Veg Gravy',
      desc: 'Eat with parotta',
      veg: false,
      slot: 'dinner',
      date: new Date('2023-06-15')
    }
  ];