import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import SelectMenu from "../../UI/SelectMenu/SelectMenu";
import { SelectChangeEvent } from "@mui/material";
import s from "./OrcamentoCabecalho.module.css";
import { OrcamentoCabecalhoPrevisto } from "../../../types/rows/OrcamentoCabecalhoPrevisto";
import { OrcamentoCabecalhoReal } from "../../../types/rows/OrcamentoCabecalhoReal";
import { Anomes } from "../../../types/Anomes";

export function OrcamentoCabecalho() {
  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [inicio, setInicio] = useState<string>("");
  const [fim, setFim] = useState<string>("");
  const [anomesDistinct, setAnomesDistinct] = useState<Anomes[]>([]);
  function calculateSum(arr: number[]) {
    return arr.reduce((acc: number, curr: number) => acc + curr, 0);
  }
  async function getOrcamentoCabecalho(inicio: string, fim: string) {
    try {
      const responseCabecalho = await axios.get<OrcamentoCabecalhoReal[]>(
        `${
          import.meta.env.VITE_API_URL
        }/bi/OrcamentoCabecalhoRealizadoPorMes?inicio=${inicio}&fim=${fim}`
      );
      const responseCabecalhoPrevisto = await axios.get<
        OrcamentoCabecalhoPrevisto[]
      >(
        `${
          import.meta.env.VITE_API_URL
        }/bi/OrcamentoCabecalhoPrevistoPorMes?inicio=${inicio}&fim=${fim}`
      );

      const dataPrev = responseCabecalhoPrevisto.data;
      const dataReal = responseCabecalho.data;
      /*PEGAR TODOS OS ANOMES*/

      const responseAnomes = await axios.get<Anomes[]>(
        `${import.meta.env.VITE_API_URL}/bi/OrcamentoDetalhadoPorPlanoDeConta`
      );
      const anomesFormatados: Anomes[] = responseAnomes.data.map((item) => ({
        anomes: item.anomes,
      }));
      // const dataAnomes = responseAnomes.data;
      // const anomesTotal = dataAnomes.map((item) => item.anomes);
      const distinct = (value: Anomes, index: number, self: Anomes[]) => {
        const firstIndex = self.findIndex(
          (item) => item.anomes === value.anomes
        );

        return index === firstIndex;
      };
      const distinctValues = anomesFormatados.filter(distinct);
      console.log(distinctValues);
      setAnomesDistinct(distinctValues);
      /*PEGAR TODOS OS ANOMES*/

      const sumFaturamentoBrutoReal = calculateSum(
        dataReal.map((item) => item.faturamento_bruto_real)
      );
      const sumFaturamentoBrutoPrev = calculateSum(
        dataPrev.map((item) => item.faturamento_bruto_prev)
      );
      const sumImpostoVendasReal = calculateSum(
        dataReal.map((item) => item.imposto_vendas_real)
      );
      const sumImpostoVendasPrev = calculateSum(
        dataPrev.map((item) => item.imposto_prev)
      );
      const sumCmvReal = calculateSum(dataReal.map((item) => item.cmv_real));
      const sumCmvPrev = calculateSum(dataPrev.map((item) => item.cmv_prev));
      const sumDifInvReal = calculateSum(
        dataReal.map((item) => item.diferenca_inv_real)
      );
      const sumDifInvPrev = calculateSum(
        dataPrev.map((item) => item.dif_inv_prev)
      );
      const sumLucroBrutoReal = calculateSum(
        dataReal.map((item) => item.lucro_bruto_real)
      );
      const sumLucroBrutoPrev = calculateSum(
        dataPrev.map((item) => item.lucro_bruto_prev)
      );
      const sumDespesasReal = calculateSum(
        dataReal.map((item) => item.despesas_real)
      );
      const sumDespesasPrev = calculateSum(
        dataPrev.map((item) => item.despesas_previsto)
      );
      const sumPerdasReal = calculateSum(
        dataReal.map((item) => item.perdas_real)
      );
      const sumPerdasPrev = calculateSum(
        dataPrev.map((item) => item.perdas_previsto)
      );
      const sumReceitaFinanceiraReal = calculateSum(
        dataReal.map((item) => item.receita_financ_real)
      );
      const sumReceitaFinanceiraPrev = calculateSum(
        dataPrev.map((item) => item.receita_extra_financ_prev)
      );
      const sumReceitaComercialReal = calculateSum(
        dataReal.map((item) => item.receita_comercial_real)
      );
      const sumReceitaComercialPrev = calculateSum(
        dataPrev.map((item) => item.receita_extra_comercial_prev)
      );
      const sumReceitaMarketingReal = calculateSum(
        dataReal.map((item) => item.receita_marketing_real)
      );
      const sumReceitaMarketingPrev = calculateSum(
        dataPrev.map((item) => item.receita_extra_mkt_prev)
      );
      const sumLucroOperacionalReal = calculateSum(
        dataReal.map((item) => item.lucro_operacional_real)
      );
      const sumLucroOperacionalPrev = calculateSum(
        dataPrev.map((item) => item.lucro_operacional_previsto)
      );
      const sumIrpjReal = calculateSum(dataReal.map((item) => item.irpj_real));
      const sumIrpjPrev = calculateSum(dataPrev.map((item) => item.irpj_prev));
      const sumCsllReal = calculateSum(dataReal.map((item) => item.csll_real));
      const sumCsllPrev = calculateSum(dataPrev.map((item) => item.csll_prev));
      const sumLucroLiquidoReal = calculateSum(
        dataReal.map((item) => item.lucro_liquido_real)
      );
      const sumLucroLiquidoPrev = calculateSum(
        dataPrev.map((item) => item.lucro_liquido_prev)
      );
      const realData = [
        sumFaturamentoBrutoReal,
        sumImpostoVendasReal,
        sumCmvReal,
        sumDifInvReal,
        sumLucroBrutoReal,
        sumDespesasReal,
        sumPerdasReal,
        sumReceitaFinanceiraReal,
        sumReceitaComercialReal,
        sumReceitaMarketingReal,
        sumLucroOperacionalReal,
        sumIrpjReal,
        sumCsllReal,
        sumLucroLiquidoReal,
      ];
      const prevData = [
        sumFaturamentoBrutoPrev,
        sumImpostoVendasPrev,
        sumCmvPrev,
        sumDifInvPrev,
        sumLucroBrutoPrev,
        sumDespesasPrev,
        sumPerdasPrev,
        sumReceitaFinanceiraPrev,
        sumReceitaComercialPrev,
        sumReceitaMarketingPrev,
        sumLucroOperacionalPrev,
        sumIrpjPrev,
        sumCsllPrev,
        sumLucroLiquidoPrev,
      ];
      const metrics = [
        "Faturamento Bruto",
        "Imposto Vendas",
        "CMV",
        "Dif. Investimento",
        "Lucro Bruto",
        "Despesas",
        "Perdas",
        "Receita Financeira",
        "Receita Comercial",
        "Receita Marketing",
        "Lucro Operacional",
        "IRPJ",
        "CSLL",
        "Lucro Líquido",
      ];
      const rows = metrics.map((metric, index) => ({
        id: index,
        metric: metric,
        prevValue: prevData[index],
        realValue: realData[index],
      }));
      const columnsData: GridColDef[] = [
        { field: "metric", headerName: "Metric", width: 200 },
        {
          field: "prevValue",
          headerName: "Valor Previsto",
          width: 150,
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "realValue",
          headerName: "Valor Real",
          width: 180,
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
      ];
      setRows(rows);
      setColumns(columnsData);

      return anomesDistinct;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getOrcamentoCabecalho(inicio, fim);
  }, [inicio, fim]);
  const handleInicioChange = (event: SelectChangeEvent<string>) => {
    setInicio(event.target.value);
  };

  const handleFimChange = (event: SelectChangeEvent<string>) => {
    setFim(event.target.value);
  };
  return (
    <div className={s.datagridContainer}>
      <h2>Início</h2>
      <SelectMenu
        sx={{
          color: "white",
          border: "1px solid #fff",
          borderRadius: "8px",
        }}
        itemMenu={anomesDistinct.map((item) => ({
          itemName: item.anomes,
          itemValue: item.anomes,
        }))}
        nome="inicio"
        labelProps="Select Inicio"
        changeHandler={handleInicioChange}
        valor={inicio}
      />
      <h2>Fim</h2>
      <SelectMenu
        sx={{
          color: "white",
          border: "1px solid #fff",
          borderRadius: "8px",
          marginBottom: "15px",
        }}
        itemMenu={anomesDistinct.map((item) => ({
          itemName: item.anomes,
          itemValue: item.anomes,
        }))}
        nome="inicio"
        labelProps="Select Inicio"
        changeHandler={handleFimChange}
        valor={fim}
      />
      <DataGrid
        sx={{ color: "white", maxHeight: "600px", maxWidth: "550px" }}
        rows={rows}
        columns={columns}
      />
    </div>
  );
}
