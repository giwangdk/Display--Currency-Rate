import React, { useState, useEffect } from "react";
import Axios from "axios";
import './App.css';
import { Table } from "antd";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function App() {
  const [rate, setRate] = useState(['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'USD']);
  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await Axios.get("http://api.exchangeratesapi.io/v1/latest?access_key=18cf0cc8c3d1cb752ec2e885a38bc774").then(
      res => {
        setloading(false);
        console.log(res.data)
        setstate(
          rate.map(row => ({
            rate: row,
          }))
        );
      }
    );
  };

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
          dataSource={state}
        />
      )}
    </div>
  );
}

export default App;