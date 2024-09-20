import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { OrcamentoCabecalhoPrevistoPorMes } from "../../../types/rows/OrcamentoCabecalhoPrevistoPorMes";

export function DatagridBiCabecalhoPrevisto() {
  const [rows, setRows] = useState<OrcamentoCabecalhoPrevistoPorMes[]>([]);
  useEffect(() => {
    axios
      .get<OrcamentoCabecalhoPrevistoPorMes[]>(
        `${
          import.meta.env.VITE_API_URL
        }/bi/OrcamentoCabecalhoPrevistoPorMes?inicio=2301&fim=2412`
      )
      .then((response) => {
        try {
          const gridRows = response.data.map(
            (row: OrcamentoCabecalhoPrevistoPorMes) => ({
              id: row.anomes,
              anomes: row.anomes,
              faturamento_bruto_prev: row.faturamento_bruto_prev,
              imposto_prev: row.imposto_prev,
              cmv_prev: row.cmv_prev,
              dif_inv_prev: row.dif_inv_prev,
              lucro_bruto_prev: row.lucro_bruto_prev,
              despesas_previsto: row.despesas_previsto,
              perdas_previsto: row.perdas_previsto,
              receita_extra_financ_prev: row.receita_extra_financ_prev,
              receita_extra_comercial_prev: row.receita_extra_comercial_prev,
              receita_extra_mkt_prev: row.receita_extra_mkt_prev,
              lucro_operacional_previsto: row.lucro_operacional_previsto,
              irpj_prev: row.irpj_prev,
              csll_prev: row.csll_prev,
              lucro_liquido_prev: row.lucro_liquido_prev,
            })
          );
          setRows(gridRows);
        } catch (error) {
          console.log("erro consumindo api: ", error);
        }
      });
  }, []);
  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <DataGrid
      sx={{ color: "white", maxHeight: "600px" }}
      columns={[
        { field: "anomes", width: 150, headerName: "AnoMês" },
        {
          field: "faturamento_bruto_prev",
          headerName: "Faturamento Bruto Prev",
          width: 200,
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "imposto_prev",
          width: 100,
          headerName: "Imp. Prev",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "cmv_prev",
          width: 150,
          headerName: "CMV Prev",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "dif_inv_prev",
          width: 200,
          headerName: "Dif. Inv. Prev",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },

        {
          field: "lucro_bruto_prev",
          width: 150,
          headerName: "Lucro Bruto Prev",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "despesas_previsto",
          width: 200,
          headerName: "Despesas Prev",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "perdas_previsto",
          width: 150,
          headerName: "Perdas Prev",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "receita_extra_financ_prev",
          width: 150,
          headerName: "Receita Financeira Prev",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "receita_extra_comercial_prev",
          width: 150,
          headerName: "Receita Comercial Prev",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "receita_extra_mkt_prev",
          width: 150,
          headerName: "Receita Marketing Prev",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "lucro_operacional_previsto",
          width: 150,
          headerName: "Lucro Operacional Prev",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "irpj_prev",
          width: 150,
          headerName: "IRPJ Prev",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "csll_prev",
          width: 150,
          headerName: "CSLL Prev",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "lucro_liquido_prev",
          width: 150,
          headerName: "Lucro Líquido Prev",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
      ]}
      rows={rows}
      slots={{ toolbar: GridToolbar }}
    />
  );
}
