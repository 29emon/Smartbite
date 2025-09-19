import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
  className="hero"
  style={{
    background: "url('/images/hero-bg.jpg') center/cover no-repeat",
    height: "70vh"
  }}
>
  <div className="overlay"></div>
  <div className="hero-content">
    <h1>Welcome to SmartBite 🍕</h1>
    <p>Fresh, Fast & Delicious meals at your doorstep</p>
    <div className="search-bar">
      <input type="text" placeholder="Search for food..." />
      <button>Search</button>
    </div>
  </div>
</section>

     {/* Categories */}
<section id="categories" className="categories">
  <h2>Browse Categories</h2>
  <div className="category-grid">
    {[
      {
        name: "Ice Cream",
        image: "/images/icecream.jpg"
      },
      {
        name: "Burger",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349"
      },
      {
        name: "Sushi",
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754"
      },
      {
        name: "Chocolate Cake",
        image: "/images/cake.jpg"
      },
      {
        name: "Drinks",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
      },
      {
        name: "Salads",
        image: "/images/chipotle.jpg"
      }
    ].map((cat, i) => (
      <div key={i} className="category-card">
        <img src={cat.image} alt={cat.name} />
        <p>{cat.name}</p>
      </div>
    ))}
  </div>
</section>

     {/* Popular Foods */}
<section id="popular" className="featured">
  <h2>Popular Dishes 🔥</h2>
  <div className="food-grid">
    {[
      { name: 'Beef Kebab', price: 9.99, image: '/images/kebab.jpg' },
      { name: 'Fish Curry', price: 8.75, image: '/images/fishcurry.jpg' },
      { name: 'Chow Mein', price: 6.5, image: '/images/chowmein.jpg' },
      { name: 'French Fries', price: 3.49, image: '/images/fries.jpg' }
    ].map((food, i) => (
      <div key={i} className="food-card">
        <img src={food.image} alt={food.name} />
        <h3>{food.name}</h3>
        <p>${food.price.toFixed(2)}</p>
        <button className="btn-primary">Order Now</button>
      </div>
    ))}
  </div>
</section>

      {/* Why Choose Us */}
      <section id="about" className="why-us">
        <h2>Why Choose Us?</h2>
        <div className="why-grid">
          <div className="why-card">⚡ Fast Delivery</div>
          <div className="why-card">🥗 Fresh Ingredients</div>
          <div className="why-card">⭐ Top Rated</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 SmartBite. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
