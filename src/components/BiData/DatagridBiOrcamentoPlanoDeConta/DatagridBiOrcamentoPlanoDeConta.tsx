import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import s from "./DatagridBiOrcamentoPlanoDeConta.module.css";
import { OrcamentoDetalhadoPorPlanoDeConta } from "../../../types/rows/OrcamentoDetalhadoPorPlanoDeConta";

export function DatagridBiOrcamentoPlanoDeConta() {
  const [rows, setRows] = useState<OrcamentoDetalhadoPorPlanoDeConta[]>([]);

  useEffect(() => {
    axios
      .get<OrcamentoDetalhadoPorPlanoDeConta[]>(
        `${import.meta.env.VITE_API_URL}/bi/OrcamentoDetalhadoPorPlanoDeConta`
      )
      .then((response) => {
        try {
          const gridRows = response.data.map(
            (row: OrcamentoDetalhadoPorPlanoDeConta, index: number) => ({
              id: index,
              anomes: row.anomes,
              plano_de_conta: row.plano_de_conta,
              valor_previsto: row.valor_previsto,
              valor_gasto: row.valor_gasto,
              diferenca: row.diferenca,
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
    <div>
      <DataGrid
        className={s.DataGridBiOrcamentoPlanoDeConta}
        sx={{ color: "white", maxHeight: "600px" }}
        columns={[
          {
            field: "anomes",
            headerName: "AnoMês",
            width: 100,
          },
          {
            field: "plano_de_conta",
            headerName: "Plano de conta",
            width: 230,
          },
          {
            field: "valor_previsto",
            width: 140,
            headerName: "Valor Previsto",
            valueFormatter: (params) =>
              currencyFormatter.format(params.value as number),
          },
          {
            field: "valor_gasto",
            width: 140,
            headerName: "Valor gasto",
            valueFormatter: (params) =>
              currencyFormatter.format(params.value as number),
          },
          {
            field: "diferenca",
            width: 140,
            headerName: "Diferença",
            valueFormatter: (params) =>
              currencyFormatter.format(params.value as number),
          },
        ]}
        rows={rows}
        slots={{ toolbar: GridToolbar }}
      />
      {/* <Doughnut data={chartData} /> */}
    </div>
  );
}
