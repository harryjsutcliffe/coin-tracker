import React, { PureComponent } from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import { render } from "react-dom";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const daysList = ["7", "14", "30", "90", "180", "365"];

function CoinChart({ id, days, setDays }) {
    let url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`;
    const [highlighted, setHighlighted] = React.useState(null);
    const defaultItem = daysList[2];

    const {
        isLoading,
        error,
        data: chartData,
    } = useFetch(
        // "../response_1650251802436.json"
        url
    );

    console.log(chartData);

    if (chartData == null) {
        return <div>Loading...</div>;
    }

    const priceChartData = chartData.prices;
    let priceChartArr = [];
    priceChartData.forEach((el) => {
        priceChartArr.push({
            price: el[1],
            name: new Date(el[0]).toLocaleDateString("en-US"),
        });
    });

    let defaultCase;

    if (highlighted === null) {
        defaultCase = true;
    } else {
        defaultCase = false;
    }

    function getClassNameButton(item) {
        if ((defaultCase && item === defaultItem) || highlighted === item) {
            return "btn btn-secondary disabled";
        } else {
            return "btn btn-primary";
        }
    }

    return (
        <>
            <AreaChart
                width={500}
                height={300}
                data={priceChartArr}
                className="mx-auto"
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                    dataKey="price"
                    type="number"
                    domain={[
                        (dataMin) => parseInt(dataMin - 0.1 * dataMin),
                        (dataMax) => parseInt(dataMax + 0.1 * dataMax),
                    ]}
                    allowDecimals={false}
                />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#8884d8"
                    fill="#8884d8"
                />
            </AreaChart>
            <div className="d-flex justify-content-around mx-auto w-75">
                {daysList.map((item, index) => {
                    console.log(item);
                    return (
                        <button
                            className={getClassNameButton(item)}
                            key={index}
                            onClick={(e) => {
                                setDays(parseInt(item));
                                setHighlighted(item);
                            }}
                        >
                            {item}d
                        </button>
                    );
                })}
            </div>
        </>
    );
}

// render(<ChartComponent />, document.getElementById("root"));

export default CoinChart;
