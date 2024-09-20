import { Route, Routes } from "react-router-dom";
import { DemonstrcaoBi } from "../pages/DemonstracaoBi";

function RouterAllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DemonstrcaoBi />} />
    </Routes>
  );
}

export { RouterAllRoutes };
