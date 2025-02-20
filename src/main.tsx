import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/scss/_app.scss";

createRoot(document.getElementById("root")!).render(<App />);
