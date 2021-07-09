import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function Chart(props) {
  return (
    <div>
      <HighchartsReact
        hightcharts={Highcharts}
        updateArgs={[true]}
        options={{
          chart: {
            type: "line",
            style: {
              fontFamily: "MINECRAFTIA",
              color: "#607D8B",
            },
          },
          title: {
            text: props.name.toLowerCase() + "'s Value",
          },
          yAxis: {
            title: { text: "Item Values" },
          },
          xAxis: {
            title: { text: "Orders" },
          },
          series: [
            {
              name: "Buy",
              data: props.buySum,
            },
            {
              name: "Sell",
              data: props.sellSum,
            },
            {
              name: "Margin",
              data: [props.margin],
            },
            {
              name: "Buy Volume",
              data: props.buyVolume,
            },
            {
              name: "Sell Volume",
              data: props.sellVolume,
            },
          ],
        }}
      />
    </div>
  );
}
