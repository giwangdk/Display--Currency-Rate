import React, { useState, useEffect } from "react";
import Axios from "axios";
import './App.css';
import { Table } from "antd";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function App() {
  const [rate, setRate] = useState(['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'USD']);
  // const [buy, setBuy] = useState([001.7434])
  const [data, setData] = useState({});
  const [loading, setloading] = useState(true);

  const rateItem =rate.map((item) =>( {
    rate: item,
    ExchangeRate: parseFloat(data[item]),
    
  }))
  


  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await Axios.get("http://api.exchangeratesapi.io/v1/latest?access_key=18cf0cc8c3d1cb752ec2e885a38bc774")
      setloading(false);
      console.log(data.rates)
      setData(data.rates)
    }
    catch(error){
      console.log(error);
    }
  };

  const tableData = 
    rateItem
  
    
  
  // {
  //   rate: "hi",
  //   WeBuy: "dads",
  //   exChangeRate: "Dadsa",
  //   WeSell: "fsdf"
  // },
  // {
  //   rate: "hi",
  //   WeBuy: "dads",
  //   exChangeRate: "Dadsa",
  //   WeSell: "fsdf"
  // },
  // {
  //   rate: "hi",
  //   WeBuy: "dads",
  //   ExchangeRate: "Dadsa",
  //   WeSell: "fsdf"
  // }

  const columns = [
    {
      title: "",
      dataIndex: "rate",
      width: 150
    },
    {
      title: "We Buy",
      dataIndex: "WeBuy",
      width: 150
    },
    {
      title: "Exchange Rate",
      dataIndex: "ExchangeRate",
      width: 150
    },
    {
      title: "We Sell",
      dataIndex: "WeSell",
      width: 150
    }
  ];

  return (
    <div className="App">
      {loading ? (
        "Loading"
      ) : (
        <Table
          columns={columns}
          dataSource={tableData}
        />
      )}
    </div>
  );
}

export default App;