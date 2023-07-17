// run "node menu.js" then simply follow prompts

const readline = require('readline');

// Define the catalog of menu items with their allergy options
const menuItems = [
    { name: 'Cheeseburger and Nacho Fries', allergies: ['Dairy', 'Gluten', 'Wheat'], category: 'adult'},
    { name: 'Steak with Mashed Potatoes and Asparagus', allergies: ['Wheat', 'Soy'], category: 'adult'},
    { name: 'MeatLoaf with Mashed Potatoes, Gravy, and Sweet Corn', allergies: ['Wheat', 'Soy'], category: 'adult'},
    { name: 'Roast Beef with Broccoli and Garlic Bread', allergies: ['Wheat', 'Soy'], category: 'adult'},
    { name: 'Chicken Tender Sandwich with French dip and Onion Rings', allergies: ['Wheat', 'Soy', 'peanut'], category: 'adult'},
    { name: 'Fillet of Alaskan Pollock with Fried Rice', allergies: ['Shellfish', 'Eggs'], category: 'adult'},
    { name: 'BLT with Seasoned Fries', allergies: ['Wheat'], category: 'adult'},
    { name: 'Lasagna with Meat Sauce and Country style Green Beans', allergies: ['Dairy', 'Wheat'], category: 'adult'},
    { name: 'Chicken Cordon Bleu with Macaroni and Fried Ocra', allergies: ['Dairy', 'Poultry'], category: 'adult'},
    { name: 'Pork Ribs with a side Caesar Salad and Baked Potato', allergies: ['Gluten', 'Wheat'], category: 'adult'},
    { name: 'Chicken Nuggets and Macaroni', allergies: ['Dairy'], category: 'child'},
    { name: 'Cheese Pizza with a Fruit Cup', allergies: ['Dairy', 'Gluten', 'Wheat'], category: 'child'},
    { name: 'Corn Dog with French Fries', allergies: ['Dairy', 'Gluten', 'Wheat'], category: 'child'},
    { name: 'Chicken Tenders with Steamed Broccoli', allergies: ['Gluten', 'Wheat'], category: 'child'},
    { name: 'Quesadilla with a side of Rice and beans', allergies: ['Dairy', 'Gluten', 'Wheat'], category: 'child'},

    // Add more menu items as needed
];

// Define the drink options
const drinkOptions = ['Ice Water', 'Pepsi', 'Dr. Pepper', 'Root Beer', 'Sprite', ' Sweet Iced Tea', 'Unsweet Iced Tea', 'Coffee', 'milk', 'Chocolate Milk', 'Apple Juice'];

// Function to assign a random menu item to a customer
function assignMenuItem(customer, catalog) {
  let availableItems = catalog.filter(item => !customer.allergies.some(allergy => item.allergies.includes(allergy)));

  if (customer.isAdult) {
    availableItems = availableItems.filter(item => item.category === 'adult');
  } else {
    availableItems = availableItems.filter(item => item.category === 'child');
  }

  if (availableItems.length === 0) {
    console.log(`No available menu items for ${customer.isAdult ? 'adult' : 'child'} ${customer.name}.`);
    return;
  }

  const randomIndex = Math.floor(Math.random() * availableItems.length);
  const randomItem = availableItems[randomIndex];

  console.log(`${customer.name} will be having "${randomItem.name}" with "${customer.drink}" to drink.`);
}

// Create an interface for reading input from the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Display welcome message
console.log("Welcome to DinnerRoulette. A dining experience for those with an adventurous palate! Let's get started!!!\n");

// Prompt the user to enter the number of customers
rl.question('How many people will be eating tonight?: ', amountOfCustomers => {
  const count = parseInt(amountOfCustomers);
  if (isNaN(count) || count < 1 || count > 20) {
    console.log('Invalid input. Please enter a number between 1 and 99.');
    rl.close();
    return;
  }

  // Create an array of customers with their name, allergies, and adult/child status
  const customers = [];

  // Prompt the user to enter details for each customer
  let currentCustomer = 1;

  const promptDetails = () => {
    rl.question(`What is the name of customer ${currentCustomer}?: `, name => {
      rl.question(`Is ${name} an adult or a child? (type 'adult' or 'child'): `, customerType => {
        const isAdult = customerType.toLowerCase() === 'adult';

        rl.question(`Any allergies or food intolerances for ${name} (comma-separated): `, allergiesInput => {
          const allergies = allergiesInput.split(',').map(allergy => allergy.trim());

          console.log(`What would ${name} like to drink?:`);
          drinkOptions.forEach((drink, index) => {
            console.log(`${index + 1}. ${drink}`);
          });

          rl.question('Enter the number of the selected drink: ', drinkNumber => {
            const selectedDrinkIndex = parseInt(drinkNumber) - 1;

            if (isNaN(selectedDrinkIndex) || selectedDrinkIndex < 0 || selectedDrinkIndex >= drinkOptions.length) {
              console.log('Invalid drink selection.');
              promptDetails();
              return;
            }

            const selectedDrink = drinkOptions[selectedDrinkIndex];

            customers.push({ name, allergies, isAdult, drink: selectedDrink });
            currentCustomer++;

            if (currentCustomer <= count) {
              promptDetails();
            } else {
              rl.close();
              // Assign a random menu item to each customer
              customers.forEach(customer => assignMenuItem(customer, menuItems));
            }
          });
        });
      });
    });
  };

  promptDetails();
});