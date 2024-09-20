import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import s from "./DemonstracaoBi.module.css";
import { DatagridBi } from "../components/BiData/DatagridBiFaturamento/DatagridBiFaturamento";
import { DatagridBiCabecalho } from "../components/BiData/DatagridBiCabecalho/DatagridBiCabecalho";
import { DatagridBiCabecalhoPrevisto } from "../components/BiData/DatagridBiCabecalhoPrevisto/DatagridBiCabecalhoPrevisto";
import { OrcamentoCabecalho } from "../components/BiData/ChartOrcamentoCabecalho/OrcamentoCabecalho";
import DatagridBiDoughnut from "../components/BiData/DatagridBiDoughnut/DatagridBiDoughnut";
interface OrcamentoPorLoja {
  anomes: string;
  faturamento_bruto_previsto: number;
  faturamento_bruto_real: number;
  impostos_vendas_previsto: number;
  impostos_previsto_valor: number;
  impostos_vendas_real: number;
  cmv_previsto: number;
  cmv_real: number;
  diferenca_inv_previsto: number;
  diferenca_inv_real: number;
  lucro_bruto_previsto: number;
  lucro_bruto_real: number;
}
interface OrcamentoCabecalho {
  anomes: string;
  faturamento_bruto_real: number;
  imposto_vendas_real: number;
  cmv_real: number;
  diferenca_inv_real: number;
  lucro_bruto_real: number;
  despesas_real: number;
  perdas_real: number;
  receita_financ_real: number;
  receita_comercial_real: number;
  receita_marketing_real: number;
  lucro_operacional_real: number;
  irpj_real: number;
  csll_real: number;
  lucro_liquido_real: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    type: "bar";
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
}
export function DemonstrcaoBi() {
  const [orcamentoCabecalho, setOrcamentoCabecalho] = useState<
    OrcamentoCabecalho[]
  >([]);

  const [faturamentoPrevisto, setFaturamentoPrevisto] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  Chart.register(...registerables);

  const getOrcamentoPorLoja = async () => {
    try {
      const response = await axios.get<OrcamentoPorLoja[]>(
        `${import.meta.env.VITE_API_URL}/bi/OrcamentoPorLoja?anomes=2401`
      );
      const orcamentoPorLojaFormatado: OrcamentoPorLoja[] = response.data.map(
        (item) => ({
          anomes: item.anomes,
          faturamento_bruto_previsto: item.faturamento_bruto_previsto,
          faturamento_bruto_real: item.faturamento_bruto_real,
          impostos_vendas_previsto: item.impostos_vendas_previsto,
          impostos_previsto_valor: item.impostos_previsto_valor,
          impostos_vendas_real: item.impostos_vendas_real,
          cmv_previsto: item.cmv_previsto,
          cmv_real: item.cmv_real,
          diferenca_inv_previsto: item.diferenca_inv_previsto,
          diferenca_inv_real: item.diferenca_inv_real,
          lucro_bruto_previsto: item.lucro_bruto_previsto,
          lucro_bruto_real: item.lucro_bruto_real,
        })
      );
      setOrcamentoCabecalho(orcamentoCabecalho);

      const labelsFaturamentoPrevisto = orcamentoPorLojaFormatado.map(
        (item) => item.anomes
      );
      const valuesFaturamentoPrevisto = orcamentoPorLojaFormatado.map(
        (item) => item.faturamento_bruto_previsto
      );
      const valuesFaturamentoBrutoReal = orcamentoPorLojaFormatado.map(
        (item) => item.faturamento_bruto_real
      );

      setFaturamentoPrevisto({
        labels: labelsFaturamentoPrevisto,
        datasets: [
          {
            type: "bar",
            label: "Faturamento Previsto",
            data: valuesFaturamentoPrevisto,
            backgroundColor: ["RGBA(255, 215, 0, 0.6)"],
          },
          {
            type: "bar",
            label: "Faturamento Real",
            data: valuesFaturamentoBrutoReal,
            backgroundColor: ["RGBA(0, 255, 255, 0.6)"],
          },
        ],
      });
    } catch (error) {
      console.error("Erro ao fazer requisição:", error);
    }
  };

  useEffect(() => {
    getOrcamentoPorLoja();
  }, []);
  const options = {
    plugins: {
      legend: {
        labels: {
          color: "white",
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(30, 144, 255, 0.1)",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  return (
    <div className={s.chartsContainer}>
      <div className={s.faturamentoPrevistoReal}>
        <div className={s.orcamentoPorLoja}>
          <h2>Faturamento Bruto</h2>
          <Bar data={faturamentoPrevisto} options={options} />
        </div>
      </div>
      <div className={s.faturamentoPrevistoRealGrid}>
        <DatagridBi />
      </div>
      <div className={s.orcamentoPlanoDeContaContainer}>
        <h2>Orçamento detalhado por plano de conta</h2>
        <div className={s.orcamentoPlanoDeConta}>
          <DatagridBiDoughnut />
          {/* <DatagridBiOrcamentoPlanoDeConta /> */}
        </div>
      </div>
      <div className={s.orcamentoPlanoDeContaContainer}>
        <h2>Orçamento cabeçalho Previsto</h2>
        <div className={s.orcamentoPlanoDeConta}>
          <DatagridBiCabecalhoPrevisto />
        </div>
      </div>
      <div className={s.orcamentoPlanoDeContaContainer}>
        <h2>Orçamento cabeçalho realizado</h2>
        <div className={s.orcamentoPlanoDeConta}>
          <DatagridBiCabecalho />
        </div>
        <OrcamentoCabecalho />
      </div>
    </div>
  );
}
