import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import dayjs from "dayjs";

interface ChartProps {
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

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
  });
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data:
                data?.map((price) => ({
                  x: new Date(price.time_close).getTime(), // x축: 날짜
                  y: [price.open, price.high, price.low, price.close], // 시가, 고가, 저가, 종가
                })) ?? [],
            },
          ]}
          options={{
            chart: {
              height: 350,
              type: "candlestick",
              background: "transparent",
              toolbar: { show: false },
            },

            annotations: {
              xaxis: [
                {
                  x: dayjs().format("MMM DD HH:mm"),
                  borderColor: "#00E396",
                  label: {
                    borderColor: "#00E396",
                    style: {
                      fontSize: "12px",
                      color: "#fff",
                      background: "#00E396",
                    },
                    orientation: "horizontal",
                    offsetY: 7,
                    text: "Annotation Test",
                  },
                },
              ],
            },
            tooltip: {
              enabled: false,
            },
            xaxis: {
              type: "category",
              labels: {
                formatter: (val: string) => dayjs(val).format("MMM DD HH:mm"),
                style: {
                  colors: isDark ? "#fff" : "#000000", // 라벨 전체 색상
                  fontSize: "10px", // 글씨 크기
                },
              },
            },
            yaxis: {
              labels: {
                style: {
                  colors: isDark ? "#fff" : "#000000",
                },
              },

              tooltip: {
                enabled: false,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
