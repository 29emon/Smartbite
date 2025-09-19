import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import './FoodCard.css';

const FoodCard = ({ food }) => {
  const dispatch = useDispatch();

  return (
    <div className="food-card">
      <img src={food.image} alt={food.name} />
      <div className="food-info">
        <h3>{food.name}</h3>
        <p>${food.price}</p>
        <button onClick={() => dispatch(addToCart(food))}>Add to Cart</button>
      </div>
    </div>
  );
};

export default FoodCard;
