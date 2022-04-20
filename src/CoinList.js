import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CoinList() {
    const [coins, setCoins] = React.useState(null);
    const [selectedCoin, setSelectedCoin] = React.useState(null);
    const [errorMessage, setErrorMessage] = React.useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchCoinsAsync();
    }, []);

    const fetchCoinsAsync = async () => {
        try {
            let coinData = await fetch(
                // "http://localhost:8000/profiles/14959"
                // "./test.json"
                // "src/components/test.json"
                // "response_1649916856684.json"
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`
            );
            if (coinData.ok) {
                console.log(coinData);
                let coinDataRes = await coinData.json();
                setCoins(coinDataRes);
            } else {
                setErrorMessage(coinData.statusText);
            }
        } catch (error) {
            console.log({ error });
        }
    };

    return (
        <table className="table table-hover w-75 mx-auto text-center">
            <thead>
                <tr>
                    <th>Rank</th>
                    {/* <th>Logo</th> */}
                    <th className="text-left">Coin</th>
                    <th>Current Price</th>
                    <th>Market Cap</th>
                </tr>
            </thead>
            <tbody>
                {coins?.map((coin) => (
                    <tr
                        key={coin.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/details/${coin.id}`)}
                    >
                        <td className="align-middle">{coin.market_cap_rank}</td>
                        <td className="align-middle text-left w-25">
                            <img
                                src={coin.image}
                                alt={coin.name}
                                style={{ width: "50px" }}
                                className="mr-4"
                            ></img>
                            {coin.name}
                        </td>
                        <td className="align-middle">
                            ${coin.current_price.toLocaleString()}
                        </td>
                        <td className="align-middle">
                            ${coin.market_cap.toLocaleString()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default CoinList;
