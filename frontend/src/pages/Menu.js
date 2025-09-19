import React, { useState } from "react";
import FoodCard from "../components/FoodCard/FoodCard";
import "./Menu.css";


const foodItems = [
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

const Menu = () => {
  const [search, setSearch] = useState("");

  const filteredMenu = foodItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="menu-page">
      <h2>Our Menu</h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />

      <div className="menu-grid">
        {filteredMenu.length > 0 ? (
          filteredMenu.map((item) => <FoodCard key={item._id} food={item} />)
        ) : (
          <p>No food items found.</p>
        )}
      </div>
    </div>
  );
};

export default Menu;