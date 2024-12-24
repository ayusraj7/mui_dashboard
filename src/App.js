import { useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { themeSettings } from "./theme.ts";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from './scenes/navbar/index.tsx'
import Dashboard from './scenes/dashboard/index.tsx';
import Predictions from "./scenes/predictions/index.tsx";
function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/prediction" element={<Predictions />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
