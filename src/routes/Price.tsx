import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import styled from "styled-components";

interface PriceProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 2개 컬럼
  gap: 10px; // 각 카드 간 간격
  margin-bottom: 10px;
`;

const Overview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.priceColor};
  padding: 15px 20px;
  border-radius: 10px;

  span:first-child {
    font-size: 13px;
    font-weight: 400;
    margin-bottom: 5px;
    text-transform: uppercase;
  }
  span:last-child {
    color: ${(props) => props.theme.accentColor};
    font-size: 17px;
  }
`;
function Price({ coinId }: PriceProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
  });
  const now = Math.floor(Date.now() / 1000); // 현재 시간 (Unix timestamp, 초)
  const oneDayAgo = now - 24 * 60 * 60;
  const last24hData =
    data?.filter((candle) => Number(candle.time_open) >= oneDayAgo) || []; //최근 24시간
  //console.log("last24hData :", last24hData);
  let open = 0;
  let close = 0;
  let high = -Infinity;
  let low = Infinity;
  let volume = 0;
  //초기값 세팅
  for (let i = 0; i < last24hData.length; i++) {
    const candle = last24hData[i];

    const candleOpen = candle.open;
    const candleClose = candle.close;
    const candleHigh = candle.high;
    const candleLow = candle.low;
    const candleVolume = candle.volume;

    // 첫 번째 캔들의 open을 24h 시가로 사용
    if (i === 0) open = candleOpen;

    // 마지막 캔들의 close를 최신 종가로 사용
    close = candleClose;

    // 최고가, 최저가 갱신
    high = Math.max(high, candleHigh);
    low = Math.min(low, candleLow);

    // 거래량 합산
    volume += candleVolume;
  }

  const overviewData = [
    { label: "24h High", value: high },
    { label: "24h Low", value: low },
    { label: "Open", value: open },
    { label: "Close", value: close },
  ];

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          <OverviewGrid>
            {overviewData.map((item) => (
              <Overview key={item.label}>
                <span>{item.label}</span>
                <span>${item.value}</span>
              </Overview>
            ))}
          </OverviewGrid>
          <Overview>
            <span>24h Volume</span>
            <span>{volume} XRP</span>
          </Overview>
        </>
      )}
    </div>
  );
}

export default Price;
