import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { OrcamentoCabecalhoRealizadoPorMes } from "../../../types/rows/OrcamentoCabecalhoRealizadoPorMes";

export function DatagridBiCabecalho() {
  const [rows, setRows] = useState<OrcamentoCabecalhoRealizadoPorMes[]>([]);
  useEffect(() => {
    axios
      .get<OrcamentoCabecalhoRealizadoPorMes[]>(
        `${
          import.meta.env.VITE_API_URL
        }/bi/OrcamentoCabecalhoRealizadoPorMes?inicio=2301&fim=2412`
      )
      .then((response) => {
        try {
          const gridRows = response.data.map(
            (row: OrcamentoCabecalhoRealizadoPorMes) => ({
              id: row.anomes,
              anomes: row.anomes,
              faturamento_bruto_real: row.faturamento_bruto_real,
              imposto_vendas_real: row.imposto_vendas_real,
              cmv_real: row.cmv_real,
              diferenca_inv_real: row.diferenca_inv_real,
              lucro_bruto_real: row.lucro_bruto_real,
              despesas_real: row.despesas_real,
              perdas_real: row.perdas_real,
              receita_financ_real: row.receita_financ_real,
              receita_comercial_real: row.receita_comercial_real,
              receita_marketing_real: row.receita_marketing_real,
              lucro_operacional_real: row.lucro_operacional_real,
              irpj_real: row.irpj_real,
              csll_real: row.csll_real,
              lucro_liquido_real: row.lucro_liquido_real,
            })
          );
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
        { field: "anomes", width: 150, headerName: "AnoMês" },
        {
          field: "faturamento_bruto_real",
          headerName: "Faturamento Bruto Real",
          width: 200,
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "imposto_vendas_real",
          width: 180,
          headerName: "Imp. Vendas Real",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "cmv_real",
          width: 150,
          headerName: "CMV Real",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "diferenca_inv_real",
          width: 200,
          headerName: "Dif. Inv. Real",
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
        {
          field: "despesas_real",
          width: 200,
          headerName: "Despesas Real",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "perdas_real",
          width: 150,
          headerName: "Perdas Real",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "receita_financ_real",
          width: 150,
          headerName: "Receita Financeira Real",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "receita_comercial_real",
          width: 150,
          headerName: "Receita Comercial Real",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "receita_marketing_real",
          width: 150,
          headerName: "Receita Marketing Real",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "irpj_real",
          width: 150,
          headerName: "IRPJ Real",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "csll_real",
          width: 150,
          headerName: "CSLL Real",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
        {
          field: "lucro_liquido_real",
          width: 150,
          headerName: "Lucro Líquido Real",
          valueFormatter: (params) =>
            currencyFormatter.format(params.value as number),
        },
      ]}
      rows={rows}
      slots={{ toolbar: GridToolbar }}
    />
  );
}
