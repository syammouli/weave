import { StrictMode } from "react";

String.prototype.toBoolean = function () {
  const val = this.valueOf();
  if (typeof val === 'boolean') return val;
  return val.toLowerCase() === 'true';
};

import { createRoot } from "react-dom/client";
import "./index.css";
import "./pages/dashboard/dashboard.scss";
import "./pages/agents/agentsIndex.scss";
import "./pages/login/login.scss";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/theme";
import App from "@/App";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</StrictMode>,
);
