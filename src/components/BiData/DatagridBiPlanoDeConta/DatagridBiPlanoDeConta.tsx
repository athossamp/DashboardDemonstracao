import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

import s from "./DatagridBiPlanoDeConta.module.css";
import { PlanoDeContas } from "../../../types/rows/PlanoDeContas";

export function DatagridBiPlanoDeConta() {
  const [rows, setRows] = useState<PlanoDeContas[]>([]);

  useEffect(() => {
    axios
      .get<PlanoDeContas[]>(`${import.meta.env.VITE_API_URL}/bi/planoDeContas`)
      .then((response) => {
        try {
          const gridRows = response.data.map(
            (row: PlanoDeContas, index: number) => ({
              id: index,
              empcodigo: row.empcodigo,
              emp_fantasia: `Empresa ${row.empcodigo}`,
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
    <div className={s.DoughnutPlanoDeConta}>
      <DataGrid
        className={s.dataGRidPlanoDeConta}
        sx={{ color: "white", maxHeight: "600px" }}
        columns={[
          {
            field: "emp_fantasia",
            headerName: "Empresa",
            width: 150,
          },
          {
            field: "plano_de_conta",
            headerName: "Plano de conta",
            width: 220,
          },
          {
            field: "valor_previsto",
            width: 150,
            headerName: "Valor Previsto",
            valueFormatter: (params) =>
              currencyFormatter.format(params.value as number),
          },
          {
            field: "valor_gasto",
            width: 150,
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
