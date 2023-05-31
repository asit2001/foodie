const mongoose = require('mongoose');
const {readFileSync} = require("fs");
const menuItemSchema = new mongoose.Schema({
  price: Number,
  veg_or_non_veg: String,
  product__name: String,
  img: String,
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
});

const restaurantSchema = new mongoose.Schema({

  name: String,
  rating: Number,
  rating_count: String,
  cost: Number,
  address: String,
  cuisine: String,
  lic_no: String,
  menuRef: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
  link: String,
  pin: String,
  city: String,
  img: String,
});

const MenuItemModel = mongoose.model('MenuItem', menuItemSchema);
const RestaurantModel = mongoose.model('Restaurant', restaurantSchema);

const jsonData = JSON.parse(readFileSync("c.json").toString())
const uri = 'mongodb+srv://asit5581:8ia6EXMrFSeStlF7@foodie.nxoq6he.mongodb.net/foodie?retryWrites=true&w=majority&authMechanism=DEFAULT';


async function getData (){
    try {
        await mongoose.connect(uri);
        let data =  await RestaurantModel.find({})
        .populate('menu').limit(1)
     console.log(data[0].menu[0]);
    } catch (error) {
        console.log(error.message);
    }
}
async function rename (){
    try {
        await mongoose.connect(uri);
        await RestaurantModel.updateMany({}, { $rename: { menuRef: 'menu' } })
     console.log("done");
    } catch (error) {
        console.log(error.message);
    }
}

// async function storeDataInMongoDB() {
//   try {
//     await mongoose.connect(uri);

//     for (const item of jsonData) {
//       const menu = item.menu;
//       const menuRefs = [];

//       for (const menuItem of menu) {
//         const menuResult = await MenuItemModel.create(menuItem);
//         menuRefs.push(menuResult._id);
//       }

//       item.menuRef = menuRefs;

//       await RestaurantModel.create(item);
//     }
//     console.log('Data stored successfully in MongoDB!');
//   } catch (error) {
//     console.error('Error storing data in MongoDB:', error);
//   } finally {
//     mongoose.disconnect();
//   }
// }

async function storeDataInMongoDB() {
  try {
    await mongoose.connect(uri);
    for (const item of jsonData) {
      const menuRefs = []; // Array to store menu item IDs
      const menu = item.menu;
      let restaurant = await RestaurantModel.findOne({ name: item.name });

      if (!restaurant) {
        restaurant = await RestaurantModel.create(item);
      }

      for (const menuItem of menu) {
        menuItem.restaurant = restaurant._id;
        const menuResult = await MenuItemModel.create(menuItem);
        menuRefs.push(menuResult._id);
      }
      await RestaurantModel.findByIdAndUpdate(restaurant._id,{
        $set:{ menuRef: menuRefs }
      })


    }

    // Update the menuRef field of the corresponding restaurants
    // bulkOperations.push({
    //   updateMany: {
    //     filter: { name: { $in: jsonData.map(item => item.name) } },
    //     update: { $set: { menuRef: menuRefs } }
    //   }
    // });

    // await RestaurantModel.bulkWrite(bulkOperations);

    console.log('Data stored successfully in MongoDB!');
  } catch (error) {
    console.error('Error storing data in MongoDB:', error);
  } finally {
    mongoose.disconnect();
  }
}





// storeDataInMongoDB();
rename()
// getData()

