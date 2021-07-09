import React, { useState, useEffect } from "react";
import Axios from "axios";
import Chart from "./Chart";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from "react-bootstrap";

export default function BazzarConn() {
  const [isLoading, setLoading] = useState(true);
  const [bazzar, setBazzar] = useState([]);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    connBazzar();
  }, []);

  const bazzarAPI = "https://api.hypixel.net/skyblock/bazaar";

  const connBazzar = () => {
    Axios.get(bazzarAPI).then((res) => {
      setBazzar(res.data.products);
      setLoading(false);
    });
  };

  const createArray = (arr) => {
    let newArry = [];
    for (let i = 0; i < arr.length; i++) {
      newArry[i] = arr[i].pricePerUnit;
    }
    return newArry;
  };

  const createArrayVolume = (arr) => {
    let newArry = [];
    for (let i = 0; i < arr.length; i++) {
      newArry[i] = arr[i].amount;
    }
    return newArry;
  };

  const findMargin = (buyArr, sellArr) => {
    let newArry = [];
    for (let i = 0; i < buyArr.length; i++) {
      newArry[i] = buyArr[i] - sellArr[i];
    }
    return newArry;
  };

  if (isLoading) {
    return <div>Loading bazzar api...</div>;
  }

  return (
    <div className="align-items-center justify-content-center">
      <input type="number" placeholder="1" onChange={e => setPages(e.target.value)}/>
      {Object.keys(bazzar)
        .slice(0, pages)
        .map((item, i) => (
          <div key={i}>
            <Card bg="light" border="danger" className="mb-2" style={{
              display: "flex",
              alignItems: "left",
              justifyContent: "center",
              width: '75rem',
              marginRight: "auto",
              marginLeft: "auto",
              fontFamily: "MINECRAFTIA",
            }}>
              <Card.Header><h3>{bazzar[item].product_id.toLowerCase()}</h3></Card.Header>
              <Card.Body>
              <Chart
                id={i}
                name={bazzar[item].product_id}
                buySum={createArray(bazzar[item].buy_summary)}
                sellSum={createArray(bazzar[item].sell_summary)}
                margin={
                  bazzar[item].quick_status.buyPrice -
                  bazzar[item].quick_status.sellPrice
                }
                buyVolume={createArrayVolume(bazzar[item].buy_summary)}
                sellVolume={createArrayVolume(bazzar[item].sell_summary)}
              />
              </Card.Body>
              <Card.Footer>{"Profit $" + `${bazzar[item].quick_status.buyPrice -
                  bazzar[item].quick_status.sellPrice}`}</Card.Footer>
            </Card>
          </div>
        ))}
    </div>
  );
}
