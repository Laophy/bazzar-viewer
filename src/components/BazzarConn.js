import React, { useState, useEffect } from "react";
import Axios from "axios";
import Chart from "./Chart";
import { isCompositeComponent } from "react-dom/cjs/react-dom-test-utils.production.min";

export default function BazzarConn() {
  const [isLoading, setLoading] = useState(true);
  const [bazzar, setBazzar] = useState([]);
  const [pages, setPages] = useState(5);

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
    <div>
      {Object.keys(bazzar)
        .slice(0, pages)
        .map((item, i) => (
          <div key={i}>
            <p>
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
            </p>
          </div>
        ))}
    </div>
  );
}
