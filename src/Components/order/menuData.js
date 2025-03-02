// import Tilapia from './foodImg/tilapia.jpg';
// import Pineapple from './foodImg/pineapple.jpg';
// import LFries from './foodImg/loadedFries.jfif';
// import Banku from './foodImg/banku.jfif';


// MAIN
import MaxiPlainRice from './foodImg/maxiPlainRice.png';
import MaxiWaakye from './foodImg/maxiWaakye.png';
import FullyLoadedWaakye from './foodImg/fullyLoadedWaakye.png';
import MaxiJollof from './foodImg/maxiJollof.png';
import FullyLoadedJollof from './foodImg/fullyLoadedJollof.png';
import MiniJollof from './foodImg/maxiJollof.png';
import Couscous from './foodImg/couscousAndChickenSauce.png';
import Acheke from './foodImg/bankuAndTilapia.png';
import AssortedFriedRice from './foodImg/assortedFriedRice.png';
import MaxiFriedRice from './foodImg/friedRice.jfif';
import MiniFriedRice from './foodImg/friedRice.jfif';
import FriedRiceWithBeefSauce from './foodImg/friedRiceWithBeefSauce.png';
import AssortedJollof from './foodImg/maxiJollof.png';
import AssortedNoodles from './foodImg/assortedNoodles.png';
import PlantainAndWings from './foodImg/plantainAndChickenWings.png';
import FrenchFriesAndWings from './foodImg/frenchFriesAndChickenWIngs.png';
import BankuAndTilapia from './foodImg/bankuAndTilapia.png';
import LoadedFries from './foodImg/loadedFries.png';
import FullyLoadedFries from './foodImg/loadedFries.png';
import YamChipsAndChicken from './foodImg/yamChipsAndChickenWings.png';
import YamChipsAndTurkey from './foodImg/yamChipsAndTurkey.png';
import YamChipsAndGoat from './foodImg/yamChipsAndGoat.png';
import LoadedYam from './foodImg/loadedYam.jfif';
import ZongoRice from './foodImg/zongoRice.jfif';
import FullyLoadedZongoRice from './foodImg/fullyLoadedZongoRice.jfif';
// MAIN

// SIDES
import Jollof from './foodImg/jollof.png';
import PlainRice from './foodImg/plainRice.png';
import YamChips from './foodImg/yamChips.png';
import FriedPlantain from './foodImg/plantain.png';
import FrenchFries from './foodImg/frenchFries.png';
import Kelewele from './foodImg/kelewele.png';
import Banku from './foodImg/banku.png';
import AchekeSide from './foodImg/acheke.jfif';
// SIDES

// SALADS & WRAPS
import AvocadoSalad from './foodImg/avocadoSalad.png';
import GhanaianSalad from './foodImg/ghanainSalad.png';
import ChickenSalad from './foodImg/chickenSalad.png';
import BeefShawarma from './foodImg/beefShawarma.png';
import ChickenShawarma from './foodImg/chickenShawarma.png';
import MixedShawarma from './foodImg/shawarmaMeal.png';
import ShawarmaMeal from './foodImg/shawarmaMeal.png';
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
  { id: 1, name: 'Maxi Plain Rice & Beef Sauce', description: 'Rice served with beef sauce', price: 90.00, category: 1, image: MaxiPlainRice },
  { id: 2, name: 'Maxi Waakye', description: 'Traditional rice and beans dish', price: 85.00, category: 1, image: MaxiWaakye },
  { id: 3, name: 'Fully Loaded Waakye', description: 'Waakye with extra toppings', price: 120.00, category: 1, image: FullyLoadedWaakye },
  { id: 4, name: 'Maxi Jollof', description: 'Spiced rice dish', price: 85.00, category: 1, image: MaxiJollof },
  { id: 5, name: 'Fully Loaded Jollof', description: 'Jollof rice with extra toppings', price: 120.00, category: 1, image: FullyLoadedJollof },
  { id: 6, name: 'Mini Jollof', description: 'Smaller portion of jollof rice', price: 60.00, category: 1, image: MiniJollof },
  { id: 7, name: 'Couscous & Chicken Sauce', description: 'Couscous served with chicken sauce', price: 100.00, category: 1, image: Couscous },
  { id: 8, name: 'Acheke & Tilapia', description: 'Cassava couscous with grilled tilapia', price: 150.00, category: 1, image: Acheke },
  { id: 9, name: 'Assorted Fried Rice', description: 'Fried rice with mixed vegetables', price: 90.00, category: 1, image: AssortedFriedRice },
  { id: 10, name: 'Maxi Fried Rice', description: 'Large portion of fried rice', price: 85.00, category: 1, image: MaxiFriedRice },
  { id: 11, name: 'Mini Fried Rice', description: 'Smaller portion of fried rice', price: 60.00, category: 1, image: MiniFriedRice },
  { id: 12, name: 'Fried Rice & Beef Sauce', description: 'Fried rice served with beef sauce', price: 90.00, category: 1, image: FriedRiceWithBeefSauce },
  { id: 13, name: 'Assorted Jollof', description: 'Jollof rice with assorted toppings', price: 90.00, category: 1, image: AssortedJollof },
  { id: 14, name: 'Assorted Noodles & Indomie', description: 'Noodles with mixed vegetables and protein', price: 90.00, category: 1, image: AssortedNoodles },
  { id: 15, name: 'Plantain & Chicken Wings', description: 'Fried plantain served with chicken wings', price: 85.00, category: 1, image: PlantainAndWings },
  { id: 16, name: 'French Fries & Chicken Wings', description: 'French fries served with chicken wings', price: 85.00, category: 1, image: FrenchFriesAndWings },
  { id: 17, name: 'Banku & Tilapia', description: 'Traditional banku with grilled tilapia', price: 150.00, category: 1, image: BankuAndTilapia },
  { id: 18, name: 'Loaded Fries', description: 'French fries with toppings', price: 100.00, category: 1, image: LoadedFries },
  { id: 19, name: 'Fully Loaded Fries', description: 'French fries with extra toppings', price: 150.00, category: 1, image: FullyLoadedFries },
  { id: 20, name: 'Yam Chips & Chicken Wings', description: 'Fried yam with chicken wings', price: 85.00, category: 1, image: YamChipsAndChicken },
  { id: 21, name: 'Yam & Turkey', description: 'Yam served with turkey', price: 90.00, category: 1, image: YamChipsAndTurkey },
  { id: 22, name: 'Yam Chips & Spicy Goat', description: 'Fried yam with spicy goat meat', price: 100.00, category: 1, image: YamChipsAndGoat },
  { id: 23, name: 'Loaded Yam', description: 'Yam with assorted toppings', price: 100.00, category: 1, image: LoadedYam },
  { id: 24, name: 'Zongo Rice', description: 'Traditional Zongo-style rice', price: 85.00, category: 1, image: ZongoRice },
  { id: 25, name: 'Fully Loaded Zongo Rice', description: 'Zongo rice with extra toppings', price: 130.00, category: 1, image: FullyLoadedZongoRice },

  // Side Courses
  { id: 26, name: 'Jollof', description: 'Spiced rice dish', price: 50.00, category: 2, image: Jollof },
  { id: 27, name: 'Plain Rice', description: 'Steamed white rice', price: 40.00, category: 2, image: PlainRice },
  { id: 28, name: 'Yam Chips', description: 'Fried yam pieces', price: 40.00, category: 2, image: YamChips },
  { id: 29, name: 'Fried Plantain', description: 'Fried ripe plantain', price: 40.00, category: 2, image: FriedPlantain },
  { id: 30, name: 'French Fries', description: 'Crispy potato fries', price: 40.00, category: 2, image: FrenchFries },
  { id: 31, name: 'Kelewele', description: 'Spiced fried plantain cubes', price: 40.00, category: 2, image: Kelewele },
  { id: 32, name: 'Acheke', description: 'Cassava couscous', price: 40.00, category: 2, image: AchekeSide },
  { id: 33, name: 'Banku', description: 'Fermented corn and cassava dough', price: 30.00, category: 2, image: Banku },

  // Salads & Wraps
  { id: 34, name: 'Avocado Salad', description: 'Fresh salad with avocado', price: 80.00, category: 3, image: AvocadoSalad },
  { id: 35, name: 'Ghanaian Salad', description: 'Traditional Ghanaian-style salad', price: 80.00, category: 3, image: GhanaianSalad },
  { id: 36, name: 'Chicken Salad', description: 'Fresh salad with chicken', price: 80.00, category: 3, image: ChickenSalad },
  { id: 37, name: 'Beef Shawarma', description: 'Wrapped beef with vegetables', price: 60.00, category: 3, image: BeefShawarma },
  { id: 38, name: 'Chicken Shawarma', description: 'Wrapped chicken with vegetables', price: 60.00, category: 3, image: ChickenShawarma },
  { id: 39, name: 'Mixed Chicken & Beef Shawarma', description: 'Wrapped chicken and beef with vegetables', price: 70.00, category: 3, image: MixedShawarma },
  { id: 40, name: 'Shawarma Meal', description: 'Shawarma served with fries', price: 100.00, category: 3, image: ShawarmaMeal },

  // Fresh Juices
  { id: 41, name: 'Fresh Pineapple', description: 'Freshly squeezed pineapple juice', price: 25.00, category: 4, image: FreshPineapple },
  { id: 42, name: 'Fresh WaterMelon', description: 'Freshly squeezed watermelon juice', price: 25.00, category: 4, image: FreshWaterMelon },
  { id: 43, name: 'Fresh Orange', description: 'Freshly squeezed orange juice', price: 25.00, category: 4, image: FreshOrange },
  { id: 44, name: 'Pine & Ginger', description: 'Pineapple juice with ginger', price: 25.00, category: 4, image: PineAndGinger },
  { id: 45, name: 'Fresh Ginger', description: 'Fresh ginger juice', price: 15.00, category: 4, image: FreshGinger },
  { id: 46, name: 'Fresh Sobolo', description: 'Hibiscus drink', price: 15.00, category: 4, image: FreshSobolo },
  { id: 47, name: 'Burkina', description: 'Traditional Burkina drink', price: 25.00, category: 4, image: Burkina }
];