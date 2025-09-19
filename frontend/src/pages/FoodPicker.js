import React, { useState } from "react";
import "./FoodPicker.css";

const menu = [
  { _id: '1', name: 'Margherita Pizza', price: 8.99, image: '/images/margherita.jpg' },
  { _id: '2', name: 'Cheese Burger', price: 6.49, image: '/images/cheeseburger.jpg' },
  { _id: '3', name: 'Veggie Wrap', price: 5.99, image: '/images/veggiewrap.jpg' },
  { _id: '4', name: 'Grilled Chicken Salad', price: 7.99, image: '/images/grilledsalad.jpg' },
  { _id: '5', name: 'Spaghetti Bolognese', price: 9.5, image: '/images/spaghetti.jpg' },
  { _id: '6', name: 'Tandoori Chicken', price: 10.99, image: '/images/tandoori.jpg' },
  { _id: '7', name: 'Paneer Tikka', price: 7.49, image: '/images/paneertikka.jpg' },
  { _id: '8', name: 'Butter Naan', price: 2.49, image: '/images/naan.jpg' },
  { _id: '9', name: 'Chicken Fried Rice', price: 6.99, image: '/images/friedrice.jpg' },
  { _id: '10', name: 'Beef Kebab', price: 9.99, image: '/images/kebab.jpg' },
  { _id: '11', name: 'Fish Curry', price: 8.75, image: '/images/fishcurry.jpg' },
  { _id: '12', name: 'Chow Mein', price: 6.5, image: '/images/chowmein.jpg' },
  { _id: '13', name: 'French Fries', price: 3.49, image: '/images/fries.jpg' },
  { _id: '14', name: 'Samosa', price: 1.99, image: '/images/samosa.jpg' },
  { _id: '15', name: 'Chocolate Cake', price: 4.99, image: '/images/cake.jpg' },
  { _id: '16', name: 'Ice Cream Sundae', price: 3.99, image: '/images/icecream.jpg' },
  { _id: '17', name: 'Chipotle', price: 3.99, image: '/images/chipotle.jpg' },
  { _id: '18', name: 'Burger Combo', price: 3.99, image: '/images/burgercombo.jpg' },
  { _id: '19', name: 'Cheese Sandwitch', price: 3.99, image: '/images/cheesesandwitch.jpg' },
  { _id: '20', name: 'Toasted Sandwitch', price: 3.99, image: '/images/toastedsandwitch.jpg' },
];

function FoodPicker() {
  const [budget, setBudget] = useState("");
  const [people, setPeople] = useState("");
  const [results, setResults] = useState([]);
  const [aiSuggestion, setAiSuggestion] = useState("");

  const handleCalculate = () => {
    if (!budget || !people) return;

    let perPerson = budget / people;
    let suggestions = menu.filter((item) => item.price <= perPerson);

    setResults(suggestions);

    // 🎯 AI-style suggestion
    if (perPerson < 5) {
      setAiSuggestion("💡 Go for light meals like Salad 🥗 or share a Pizza 🍕.");
    } else if (perPerson >= 5 && perPerson < 10) {
      setAiSuggestion("🔥 Great! You can enjoy Burgers 🍔, Pasta 🍝 or a full Pizza 🍕.");
    } else {
      setAiSuggestion("🎉 Feast mode ON! Add Burgers, Pizzas, Pasta, and even Desserts 🍰.");
    }
  };

  return (
    <div className="food-picker">
      <h1>🍽️ Food Picker AI</h1>
      <div className="form">
        <input
          type="number"
          placeholder="Enter your budget ($)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <input
          type="number"
          placeholder="Number of people"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
        />
        <button onClick={handleCalculate}>Suggest Foods</button>
      </div>

      {aiSuggestion && <p className="ai-suggestion">🤖 {aiSuggestion}</p>}

      <div className="results">
        {results.length > 0 ? (
          results.map((item) => (
            <div key={item.id} className="food-card">
              <img src={item.image} alt={item.name} />
              <p>{item.name} - ${item.price}</p>
            </div>
          ))
        ) : (
          <p>No matching food found. Try increasing budget 💰</p>
        )}
      </div>
    </div>
  );
}

export default FoodPicker;
