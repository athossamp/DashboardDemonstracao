import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { DoughnutType } from "../../../types/Doughnut/DoughnutType";
import s from "./DatagridBiDoughnut.module.css";
import SelectMenu from "../../UI/SelectMenu/SelectMenu";
import { SelectChangeEvent } from "@mui/material";
import { codigoEmpresa } from "../../../helpers/empcodigo";
ChartJS.register(ArcElement, Tooltip, Legend);

const DatagridBiDoughnut: React.FC = () => {
  const [empcodigo, setEmpcodigo] = useState<number>(1);
  const [apiData, setApiData] = useState<DoughnutType[]>([]);
  const [filteredData, setFilteredData] = useState<DoughnutType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DoughnutType[]>(
          `${import.meta.env.VITE_API_URL}/bi/planoDeContas`
        );
        setApiData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const data = apiData.filter((item) => item.empcodigo === empcodigo);
    setFilteredData(data);
  }, [empcodigo, apiData]);

  const handleEmpCodigoChange = (e: SelectChangeEvent<string | number>) => {
    setEmpcodigo(Number(e.target.value));
  };

  const chartData = {
    labels: filteredData.map((item) => item.plano_de_conta),
    datasets: [
      {
        label: "Valor Gasto",
        data: filteredData.map((item) => item.valor_gasto),
        backgroundColor: [
          "rgba(255, 99, 132, 0.3)",
          "rgba(54, 162, 235, 0.3)",
          "rgba(255, 206, 86, 0.3)",
          "rgba(75, 192, 192, 0.3)",
          "rgba(153, 102, 255, 0.3)",
          "rgba(255, 159, 64, 0.3)",
          "rgba(255, 99, 132, 0.3)",
          "rgba(54, 162, 235, 0.3)",
          "rgba(255, 206, 86, 0.3)",
          "rgba(75, 192, 192, 0.3)",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
        ],
      },
    ],
  };
  const chartDataPrevisto = {
    labels: filteredData.map((item) => item.plano_de_conta),
    datasets: [
      {
        label: "Valor Previsto",
        data: filteredData.map((item) => item.valor_previsto),
        backgroundColor: [
          "rgba(255, 99, 132, 0.3)",
          "rgba(54, 162, 235, 0.3)",
          "rgba(255, 206, 86, 0.3)",
          "rgba(75, 192, 192, 0.3)",
          "rgba(153, 102, 255, 0.3)",
          "rgba(255, 159, 64, 0.3)",
          "rgba(255, 99, 132, 0.3)",
          "rgba(54, 162, 235, 0.3)",
          "rgba(255, 206, 86, 0.3)",
          "rgba(75, 192, 192, 0.3)",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
        ],
      },
    ],
  };

  return (
    <div>
      <div>
        <div className={s.seletorEmpresa}>
          <label htmlFor="empcodigo-select">Selecione a empresa: </label>

          <SelectMenu
            sx={{
              color: "white",
              border: "1px solid #fff",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
            itemMenu={codigoEmpresa.map((item) => ({
              itemName: item.itemName,
              itemValue: item.itemValue,
            }))}
            nome="inicio"
            labelProps="Select Inicio"
            changeHandler={handleEmpCodigoChange}
          />
        </div>

        {/* <select
          id="empcodigo-select"
          value={empcodigo}
          onChange={handleEmpCodigoChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </select> */}
      </div>
      <div className={s.charts}>
        <div className={s.doughContainer}>
          <h3>Valor Gasto</h3>
          <Doughnut data={chartData} />
        </div>
        <div className={s.doughContainer}>
          <h3>Valor Previsto</h3>
          <Doughnut data={chartDataPrevisto} />
        </div>
      </div>
    </div>
  );
};

export default DatagridBiDoughnut;
