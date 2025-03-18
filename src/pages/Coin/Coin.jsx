import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {
  const { coinId } = useParams();  // รับ coinId จาก URL
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const { currency } = useContext(CoinContext);

  // ฟังก์ชันดึงข้อมูลจาก CoinGecko
  const fetchCoinData = async () => {
    if (!coinId) {
      console.error("Error: coinId is missing!");
      return;
    }

    console.log("Fetching data for coinId:", coinId); // Debugging

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Coin Data:", data);  // Debugging
      setCoinData(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  const fetchHistoricalData = async ()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-pro-api-key': 'CG-XFZCTx53hxRvGt4JXXHktfDb'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`)
      .then(res => res.json())
      .then(res => setHistoricalData(res))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [coinId, currency]); // Fetch ทุกครั้งที่ coinId หรือ currency เปลี่ยน

  if (!coinData || !historicalData) {
    return (
      <div className='spinner'>
        <div className="spin"></div>
      </div>
    );
  }

  return (
    <div className='coin'>
      <div className="coin-name">
        <img src={coinData?.image?.large} alt={coinData?.name || "Coin Image"} />
        <p><b>{coinData?.name} ({coinData?.symbol?.toUpperCase()})</b></p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historicalData}/>
      </div>

    <div className="coin-info">
      <ul>
        <li>Crypto Market Rank</li>
        <li>{coinData.market_cap_rank}</li>
      </ul>
      <ul>
        <li>Current Price</li>
        <li>{currency.symbol}{coinData.market_data.current_price[currency.name].toLocaleString()}</li>
      </ul>
      <ul>
        <li>Market cap</li>
        <li>{currency.symbol}{coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
      </ul>
      <ul>
        <li>24 Hour high</li>
        <li>{currency.symbol}{coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
      </ul>
      <ul>
        <li>24 Hour low</li>
        <li>{currency.symbol}{coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
      </ul>
    </div>

    </div>
  );
};

export default Coin;
