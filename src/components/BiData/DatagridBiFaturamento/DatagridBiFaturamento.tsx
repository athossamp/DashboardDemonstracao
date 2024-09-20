import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { OrcamentoPorLoja } from "../../../types/rows/OrcamentoPorLoja";

export function DatagridBi() {
  const [rows, setRows] = useState<OrcamentoPorLoja[]>([]);
  useEffect(() => {
    axios
      .get<OrcamentoPorLoja[]>(
        `${import.meta.env.VITE_API_URL}/bi/OrcamentoPorLoja?anomes=2401`
      )
      .then((response) => {
        try {
          const gridRows = response.data.map((row: OrcamentoPorLoja) => ({
            id: row.anomes,
            anomes: row.anomes,
            faturamento_bruto_previsto: row.faturamento_bruto_previsto,
            faturamento_bruto_real: row.faturamento_bruto_real,
            impostos_vendas_previsto: row.impostos_vendas_previsto,
            impostos_previsto_valor: row.impostos_previsto_valor,
            impostos_vendas_real: row.impostos_vendas_real,
            cmv_previsto: row.cmv_previsto,
            cmv_real: row.cmv_real,
            diferenca_inv_previsto: row.diferenca_inv_previsto,
            diferenca_inv_real: row.diferenca_inv_real,
            lucro_bruto_previsto: row.lucro_bruto_previsto,
            lucro_bruto_real: row.lucro_bruto_real,
          }));
          setRows(gridRows);
        } catch (error) {
          console.log("erro consumindo api: ", error);
        }
      });
    console.log(rows);
  }, []);
  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <DataGrid
      sx={{ color: "white", maxHeight: "600px" }}
      columns={[
        { field: "anomes", width: 150 },
        {
          field: "faturamento_bruto_previsto",
          headerName: "Faturamento Bruto Previsto",
          width: 200,
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "faturamento_bruto_real",
          headerName: "Faturamento Bruto Real",
          width: 200,
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "impostos_vendas_previsto",
          width: 100,
          headerName: "Imp. Previsto",
        },
        {
          field: "impostos_vendas_real",
          width: 150,
          headerName: "Impostos vendas real",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "impostos_previsto_valor",
          width: 200,
          headerName: "Impostos Previstos Valor",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },

        { field: "cmv_previsto", width: 150, headerName: "CMV Prev" },
        {
          field: "cmv_real",
          width: 200,
          headerName: "CMV Real",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "diferenca_inv_previsto",
          width: 150,
          headerName: "Dif. Inv. Prev.",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "diferenca_inv_real",
          width: 150,
          headerName: "Dif. Inv. Real",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "lucro_bruto_previsto",
          width: 150,
          headerName: "Lucro Bruto Prev",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "lucro_bruto_real",
          width: 150,
          headerName: "Lucro Bruto Real",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
      ]}
      rows={rows}
      slots={{ toolbar: GridToolbar }}
    />
  );
}
