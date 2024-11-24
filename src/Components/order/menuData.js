// import Tilapia from './foodImg/tilapia.jpg';
// import Pineapple from './foodImg/pineapple.jpg';
// import LFries from './foodImg/loadedFries.jfif';
// import Banku from './foodImg/banku.jfif';
import MaxiPlainRice from './foodImg/maxiPlainRice.png';
import MaxiWaakye from './foodImg/maxiWaakye.png';
import FullyLoadedWaakye from './foodImg/fullyLoadedWaakye.png';
import MaxiJollof from './foodImg/maxiJollof.png';
import FullyLoadedJollof from './foodImg/fullyLoadedJollof.png';
import Couscous from './foodImg/couscousAndChickenSauce.png';
import Acheke from './foodImg/achekeAndTilapia.png';
import AssortedFriedRice from './foodImg/assortedFriedRice.png';
import FriedRiceWithBeefSauce from './foodImg/friedRiceWithBeefSauce.png';
import PlainRiceWithBeefSauce from './foodImg/maxiPlainRice.png';
import AssortedNoodles from './foodImg/assortedNoodles.png';
import PlantainAndWings from './foodImg/plantainAndChickenWings.png';
import FrenchFriesAndWings from './foodImg/frenchFriesAndChickenWIngs.png';
import BankuAndTilapia from './foodImg/bankuAndTilapia.png';
import LoadedFries from './foodImg/loadedFries.png';
import YamChipsAndChicken from './foodImg/yamChipsAndChickenWings.png';
import YamChipsAndTurkey from './foodImg/yamChipsAndTurkey.png';
import YamChipsAndGoat from './foodImg/yamChipsAndGoat.png';
import YamChipsAndGizzard from './foodImg/yamChipsAndGizzard.png';
// SIDES
import Jollof from './foodImg/jollof.png';
import PlainRice from './foodImg/plainRice.png';
import YamChips from './foodImg/yamChips.png';
import FriedPlantain from './foodImg/plantain.png';
import FrenchFries from './foodImg/frenchFries.png';
import Kelewele  from './foodImg/kelewele.png';
import Banku  from './foodImg/banku.png';
import Turkey  from './foodImg/turkey.png';
import Gizzard  from './foodImg/gizzard.png';
// SIDES
// SALADS & WRAPS
import AvocadoSalad  from './foodImg/avocadoSalad.png';
import GhanaianSalad  from './foodImg/ghanainSalad.png';
import ChickenSalad  from './foodImg/chickenSalad.png';
import BeefShawarma  from './foodImg/beefShawarma.png';
import ChickenShawarma  from './foodImg/chickenShawarma.png';
import ShawarmaMeal  from './foodImg/shawarmaMeal.png';
// SALADS & WRAPS

// DRINKS
import FreshPineapple from './foodImg/freshPineapple.png';
import FreshWaterMelon from './foodImg/freshWaterMelon.png';
import FreshOrange from './foodImg/freshOrange.png';
import PineAndGinger from './foodImg/pineAndGinger.png';
import FreshGinger from './foodImg/freshGinger.png';
import FreshSobolo from './foodImg/freshSobolo.png';
import Burkina from './foodImg/burkina.png';
// DRINKS




export const categories = [
  { id: 1, name: 'Main Courses' },
  { id: 2, name: 'Side Courses' },
  { id: 3, name: 'Salads & Wraps' },
  { id: 4, name: 'Drinks' },
];

export const menuItems = [
  // Main Courses
  { id: 1, name: 'Maxi Plain Rice & Beef Stew', description: 'Rice served with beef stew', price: 80.00, category: 1, image: MaxiPlainRice },
  { id: 2, name: 'Maxi Waakye', description: 'Traditional rice and beans dish', price: 80.00, category: 1, image: MaxiWaakye  },
  { id: 3, name: 'Fully Loaded Waakye', description: 'Waakye with extra toppings', price: 120.00, category: 1, image: FullyLoadedWaakye  },
  { id: 4, name: 'Maxi Jollof', description: 'Spiced rice dish', price: 80.00, category: 1, image: MaxiJollof  },
  { id: 5, name: 'Fully Loaded Jollof', description: 'Jollof rice with extra toppings', price: 120.00, category: 1, image: FullyLoadedJollof  },
  { id: 6, name: 'Couscous & Chicken Sauce', description: 'Couscous served with chicken sauce', price: 80.00, category: 1, image: Couscous  },
  { id: 7, name: 'Acheke & Tilapia', description: 'Cassava couscous with grilled tilapia', price: 150.00, category: 1, image: Acheke  },
  { id: 8, name: 'Assorted Fried Rice', description: 'Fried rice with mixed vegetables', price: 80.00, category: 1, image: AssortedFriedRice },
  { id: 9, name: 'Fried rice with Beef sauce', description: 'Fried rice served with beef sauce', price: 130.00, category: 1, image: FriedRiceWithBeefSauce  },
  { id: 10, name: 'Plain rice with beef sauce', description: 'White rice served with beef sauce', price: 100.00, category: 1, image: PlainRiceWithBeefSauce },
  { id: 11, name: 'Assorted Noodles', description: 'Noodles with mixed vegetables and protein', price: 80.00, category: 1, image: AssortedNoodles },
  { id: 12, name: 'Plantain & Chicken Wings', description: 'Fried plantain served with chicken wings', price: 80.00, category: 1, image: PlantainAndWings },
  { id: 13, name: 'French Fries & Chicken Wings', description: 'French fries served with chicken wings', price: 80.00, category: 1, image: FrenchFriesAndWings },
  { id: 14, name: 'Banku & Tilapia', description: 'Traditional banku with grilled tilapia', price: 90.00, category: 1, image: BankuAndTilapia },
  { id: 15, name: 'Loaded fries', description: 'French fries with toppings', price: 100.00, category: 1, image: LoadedFries },
  { id: 16, name: 'Yam Chips & Chicken Wings', description: 'Fried yam with chicken wings', price: 80.00, category: 1, image: YamChipsAndChicken },
  { id: 17, name: 'Yam Chips & Spicy Goat', description: 'Fried yam with spicy goat meat', price: 90.00, category: 1, image: YamChipsAndGoat },
  { id: 18, name: 'Yam Chips & Turkey', description: 'Fried yam with turkey', price: 80.00, category: 1, image: YamChipsAndTurkey },
  { id: 19, name: 'Yam Chips & Spicy Gizzard', description: 'Fried yam with spicy gizzard', price: 70.00, category: 1, image: YamChipsAndGizzard },

  // Side Courses
  { id: 20, name: 'Jollof', description: 'Spiced rice dish', price: 30.00, category: 2, image: Jollof },
  { id: 21, name: 'Plain Rice', description: 'Steamed white rice', price: 30.00, category: 2, image: PlainRice },
  { id: 22, name: 'Yam Chips', description: 'Fried yam pieces', price: 30.00, category: 2, image: YamChips },
  { id: 23, name: 'Fried Plantain', description: 'Fried ripe plantain', price: 30.00, category: 2, image: FriedPlantain },
  { id: 24, name: 'French Fries', description: 'Crispy potato fries', price: 30.00, category: 2, image: FrenchFries },
  { id: 25, name: 'Kelewele', description: 'Spiced fried plantain cubes', price: 30.00, category: 2, image: Kelewele },
  { id: 26, name: 'Banku', description: 'Fermented corn and cassava dough', price: 20.00, category: 2, image: Banku },
  { id: 27, name: 'Turkey', description: 'Grilled turkey', price: 50.00, category: 2, image: Turkey },
  { id: 28, name: 'Spicy Gizzard', description: 'Spiced chicken gizzard', price: 40.00, category: 2, image: Gizzard },

  // Salads & Wraps
  { id: 29, name: 'Avocado Salad', description: 'Fresh salad with avocado', price: 60.00, category: 3, image: AvocadoSalad },
  { id: 30, name: 'Ghanaian Salad', description: 'Traditional Ghanaian-style salad', price: 60.00, category: 3, image: GhanaianSalad },
  { id: 31, name: 'Chicken Salad', description: 'Fresh salad with chicken', price: 60.00, category: 3, image: ChickenSalad },
  { id: 32, name: 'Beef Shawarma', description: 'Wrapped beef with vegetables', price: 60.00, category: 3, image: BeefShawarma },
  { id: 33, name: 'Chicken Shawarma', description: 'Wrapped chicken with vegetables', price: 60.00, category: 3, image: ChickenShawarma },
  { id: 34, name: 'Shawarma Meal', description: 'Shawarma served with fries', price: 120.00, category: 3, image: ShawarmaMeal },

  // Fresh Juices
  { id: 35, name: 'Fresh Pineapple', description: 'Freshly squeezed pineapple juice', price: 25.00, category: 4, image: FreshPineapple },
  { id: 36, name: 'Fresh WaterMelon', description: 'Freshly squeezed watermelon juice', price: 25.00, category: 4, image: FreshWaterMelon },
  { id: 37, name: 'Fresh Orange', description: 'Freshly squeezed orange juice', price: 25.00, category: 4, image: FreshOrange },
  { id: 38, name: 'Pine & Ginger', description: 'Pineapple juice with ginger', price: 25.00, category: 4, image: PineAndGinger },
  { id: 39, name: 'Fresh Ginger', description: 'Fresh ginger juice', price: 25.00, category: 4, image: FreshGinger },
  { id: 40, name: 'Fresh Sobolo', description: 'Hibiscus drink', price: 15.00, category: 4, image: FreshSobolo },
  { id: 41, name: 'Burkina', description: 'Traditional Burkina drink', price: 25.00, category: 4, image: Burkina }
];
  
