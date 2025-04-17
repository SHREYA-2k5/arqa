![Banner](./readme-banner.png)
# Arqa 

## Food Wastage in India


- Despite being one of the world’s leading producers of food, India continues to struggle with malnutrition, which remains one of the leading causes of death and disability, claiming around 3,000 lives daily, According to Global Burden of Disease Study, 2017.
- India leads in the production of milk, pulses and jute and ranks second in rice, wheat and other crops. It is also a top producer of spices, fish and poultry, yet it faces this crisis because of food wastage.

- According to a 2018 study, 1⁄3 of our produced food gets wasted every year.

- 40% of food waste in institutions are not from students throwing away food, but rather the surplus food that needs to be thrown away. Our app aims to reduce this surplus to reduce food wastage as a whole.

## Key Features:
- Students: They can pre-book meals, which notifies the hostels just how much to produce. Frequent Bookings will give the user credits, which can later be redeemed for free food.
  
- Hostels: AI will generate reports for the admin and will suggest changes to menu based on popularity analysis and ingredient costs. The platform will also generate a predictive shopping list for the admin based on previous week's order statistics.
  
- NGOs: Verified surplus food cannn be donated to nearby NGOs with geofenced notifications
  
- Our major goal is to reduce waste by 60-75% through AI reports
  
Other aims:
- We want to reduce institutional food costs, Improve student food security, Channel surplus food to local communities and reduces the overall environmental footprint.

## About the Project:
Arqa is a utility Dashboard combined with a food pre-booking system to ensure food wastage is minimized in Hostels. It is complete with Gemini-Assisted analysis and report generation, along with complete functionality with MongoDB Atlas. 

### Tech Stack

   - Express
   - Node
   - MongoDB Atlas
   - React
   - Tailwind

## How to get it to work

### Dependencies
You need to have node installed in your system to run this

To install all dependencies simply execute:
```bash
npm install

cd client
npm install # client directory has seperate dependencies
```

You need to also ensure your `.env.local` file has the two fields: `GEMINI_KEY` and `MONGO_URI`which contain your Gemini API key and the URI for your MongoDB Atlas cluster respectively.

Then, you can start the server and client seperately by running the following in different terminal processes:

```bash
node index.js # For the server

cd client
npm run dev # For the client
```

By default the server will start on port 8080 and the client will start on 5173. You can change this, but the client connectivity is hardcoded to 8080 so you might have to change that too. (Do not recommend!)

## Document Structure

The app (and Gemini!) expects the data to be in the following format:
```json
user: {
    name: String,
    email: String, // Must be Unique
    role: String,
    bookings: Number, // 0 by default, increase on every booking
    points: Number // 0 by default, increase on every booking
}

menu: {
    item: String,
    desc: String,
    veg: Boolean,
    slot: String, // strictly 'breakfast', 'lunch', 'snacks' or 'dinner'
    date: Date,
    bookings: Number, // 0 by default, increases
    cal : Number,
    ingredients: {} // will contain an object with: ingredient: quantity
}

organization: {
    organizationName: String,
    email: String, 
    phone: String,
    address: String,
    city: String,
    state: String,
    country: String,
    registrationNumber: String,
    organizationType: String
}
```

## Testing

The tests are all contained within the tests directory. Use [VSCode Rest Client](https://marketplace.visualstudio.com/items/?itemName=humao.rest-client) to run the API tests.

## Contributors

Built over just 48 hours at Devshouse '25 by our team consisting of:

[Aary Kinge](https://github.com/Not-Buddy)

[Lord Madhav Sinha](https://github.com/MadhavSinha007)

[Nilay Sabnis](https://github.com/Sunset-06)

[Shreya V](https://github.com/SHREYA-2k5)

## Thanks for Visiting!

Arqa was built with a mission to reduce food wastage and improve food security in institutions. We hope it can make a real impact, and we’d love to hear your thoughts or suggestions.