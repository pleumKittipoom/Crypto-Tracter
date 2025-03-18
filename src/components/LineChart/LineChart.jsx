import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const LineChart = ({ historicalData }) => {
    const [data, setData] = useState([["Date", "Prices"]]);

    useEffect(() => {
        let dataCopy = [["Date", "Prices"]];
        if (historicalData?.prices) {
            historicalData.prices.forEach((item) => {
                let date = new Date(item[0]); // แปลงเป็น Date Object
                let price = parseFloat(item[1]); // บังคับให้เป็น Number
                dataCopy.push([date, price]);
            });
            setData(dataCopy);
        }
    }, [historicalData]);

    console.log("Chart Data:", data); // Debugging ข้อมูลที่ถูกส่งไป Chart

    return (
        <Chart 
            chartType='LineChart'
            data={data}
            width="100%"
            height="300px"
            options={{
                title: "Price Trend (Last 10 Days)",
                hAxis: { title: "Date", format: "MMM dd", gridlines: { count: 10 } },
                vAxis: { title: "Price", minValue: 0 },
                legend: "none",
            }}
        />
    );
};

export default LineChart;
