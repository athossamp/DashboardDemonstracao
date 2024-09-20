import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button/Button";

interface RowsType {
  ocorrencia: number;
  ococodigo: number;
  ocodescricao: string;
  ocosolucao: string;
  lgrcodigo: number;
  clicodigo: number;
  clifuncodigo: number;
  teccodigo: number;
  tipprocodigo: number;
  tipsolcodigo: number;
  ocostatus: string;
  ocodesenvolvimento: string;
  inclusaoUsucodigo: number;
  usucodigo: number;
}
export function Datagrid() {
  const [rows, setRows] = useState<RowsType[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/ocorrencia/getOcorrencias`)
      .then((response) => {
        try {
          const gridRows = response.data.map((row: RowsType) => ({
            id: row.ococodigo,
            ocorrencia: row.ococodigo,
            descrição: row.ocodescricao,
            solução: row.ocosolucao,
            rotina: row.lgrcodigo,
            cliente: row.clicodigo,
            funcionário: row.clifuncodigo,
            tecnico: row.teccodigo,
            problema: row.tipprocodigo,
            "tipo solução": row.tipsolcodigo,
            status: row.ocostatus,
            desenvolvimento: row.ocodesenvolvimento,
            "usuario incluido": row.inclusaoUsucodigo,
            usuário: row.usucodigo,
          }));
          setRows(gridRows);
        } catch (error) {
          console.log("erro consumindo api: ", error);
        }
        console.log(rows);
      });
  }, [rows]);
  function handleEditButtonClick(ococodigo: number) {
    navigate(`/ocorrencia/updateOcorrencia/${ococodigo}`);
  }
  return (
    <DataGrid
      sx={{ color: "white" }}
      columns={[
        { field: "ocorrencia" },
        { field: "descrição" },
        { field: "solução" },
        { field: "rotina" },
        { field: "cliente" },
        { field: "funcionário" },
        { field: "tecnico" },
        { field: "problema" },
        { field: "tipo solução" },
        { field: "status" },
        { field: "desenvolvimento" },
        { field: "usuario incluido" },
        { field: "usuário" },
        {
          field: "edit",
          headerName: "Edit",
          sortable: false,
          width: 100,
          renderCell: (params) => (
            <Button
              nome="Edit"
              theme="laranja"
              onClick={() => handleEditButtonClick(params.row.ocorrencia)}
              type="submit"
            />
          ),
        },
      ]}
      rows={rows}
      slots={{ toolbar: GridToolbar }}
    />
  );
}
