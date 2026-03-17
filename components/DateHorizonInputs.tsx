"use client";
import { ChartLine, Loader2 } from "lucide-react";
import { useState } from "react";
import WindCharts from "./WindCharts";

interface DataPoint {
  time: string;
  actual: number;
  forecast: number;
}

function DateHorizonInputs() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [horizon, setHorizon] = useState(4);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataPoint[]>([]);

  const handleLoadData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/wind-generation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate,
            endDate,
            horizon,
          }),
        },
      );

      const data = await res.json();
      console.log("Fetched data:", data);
      setData(data);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setData([]);
    setStartDate("");
    setEndDate("");
    setHorizon(4);
  };

  return (
    <section className="w-full pb-10 border-b border-gray-300 px-5">
      <h1 className="w-fit text-2xl mx-auto my-10 border-b-[1.5px] border-gray-900">
        Forecast Monitoring
      </h1>

      <div className="w-full md:w-[80%] max-w-8xl mx-auto">
        <div className="w-full flex flex-col md:flex-row gap-10 justify-center items-center">
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm font-medium">Start Date</label>
            <input
              type="date"
              className="w-full md:w-40 border rounded p-2 mt-1"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min="2025-01-01"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm font-medium">End Date</label>
            <input
              type="date"
              className="w-full md:w-40 border rounded p-2 mt-1"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min="2025-01-01"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm font-medium">
              Forecast Horizon: {horizon} hours
            </label>
            <input
              type="range"
              min={0}
              max={48}
              value={horizon}
              onChange={(e) => setHorizon(Number(e.target.value))}
              className="w-full md:w-50 lg:w-100"
            />
          </div>
        </div>

        <div className="w-full flex justify-center my-5">
          {data.length === 0 ? (
            <button
              disabled={loading}
              onClick={handleLoadData}
              className="w-40 mt-6 disabled:cursor-wait px-6 py-2 bg-blue-600 text-white rounded-md flex justify-center items-center cursor-pointer"
            >
              {loading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                "Load Data"
              )}
            </button>
          ) : (
            <button
              onClick={handleRefresh}
              className="w-40 mt-6 px-6 py-2 bg-red-500 text-white rounded-md flex justify-center items-center cursor-pointer"
            >
              Clear Data
            </button>
          )}
        </div>
      </div>

      {data.length > 0 ? (
        <WindCharts data={data} />
      ) : (
        <div className="w-full md:w-[80%] mx-auto h-100 border border-gray-300 pt-24 rounded-lg px-10">
          <div className="flex flex-col justify-center items-center gap-4 text-zinc-500">
            <ChartLine className="size-6 stroke-[1.5px]" />
            <p className="text-center text-sm md:text-base">
              Select parameters and click Load Data to view results
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default DateHorizonInputs;
