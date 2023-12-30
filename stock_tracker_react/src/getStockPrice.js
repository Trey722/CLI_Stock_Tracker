import React, { useState, useEffect } from 'react';

function StockPriceComponent({ symbol }) {
    const [stockPrice, setStockPrice] = useState(null); // Initializing stockPrice state
  
    useEffect(() => {
      fetchStockPrice(symbol); // Fetch stock price for 'AAPL' on component mount
    }, [symbol]); // Re-fetch when symbol changes
  
    const fetchStockPrice = async (symbol) => {
      try {
        const response = await fetch(`http://localhost:5000/stock_price/${symbol}`);
        const data = await response.json();
        setStockPrice(data); // Update stockPrice state with fetched data
      } catch (error) {
        console.error('Error fetching stock price:', error);
      }
    };
  
    const getPriceClass = () => {
      if (stockPrice && stockPrice.class) {
        return stockPrice.class; // Assuming 'class' holds the class name
      }
      return '';
    };
  
    return (
      <div>
        {stockPrice ? (
          <div>
            <p className={getPriceClass()}>
              {stockPrice.symbol}: Price: {stockPrice.price}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }

export default StockPriceComponent;

