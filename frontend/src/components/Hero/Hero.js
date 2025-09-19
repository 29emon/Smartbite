import React from "react";
import Hero from "../../components/Hero/Hero";
import { Link } from "react-router-dom";
import './Hero.css';

const categories = [
  { name: "Pizza", image: "/images/pizza-category.jpg" },
  { name: "Burgers", image: "/images/burger-category.jpg" },
  { name: "Desserts", image: "/images/dessert-category.jpg" },
  { name: "Drinks", image: "/images/drinks-category.jpg" },
];

const Home = () => {
  return (
    <div className="home">
      {/* ✅ Hero Section */}
      <Hero />

      {/* ✅ Search Bar */}
      <section className="home-search">
        <input type="text" placeholder="Search for food or restaurants..." />
        <button>Search</button>
      </section>

      {/* ✅ Popular Categories */}
      <section className="categories">
        <h2>Popular Categories</h2>
        <div className="category-grid">
          {categories.map((cat, index) => (
            <div className="category-card" key={index}>
              <img src={cat.image} alt={cat.name} />
              <p>{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Featured Restaurants */}
      <section className="featured">
        <h2>Featured Restaurants</h2>
        <div className="featured-grid">
          <div className="featured-card">🍱 Sushi Place</div>
          <div className="featured-card">🍔 Burger House</div>
          <div className="featured-card">🍕 Pizza Corner</div>
          <div className="featured-card">🥗 Healthy Bites</div>
        </div>
      </section>

      {/* ✅ Deals */}
      <section className="deals">
        <h2>🔥 Hot Deals</h2>
        <div className="deal-card">
          <p>20% Off on Your First Order</p>
          <Link to="/menu" className="deal-btn">
            Grab Now
          </Link>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="home-footer">
        <p>© 2025 Sbite - Your Food, Your Way</p>
      </footer>
    </div>
  );
};

export default Home;
