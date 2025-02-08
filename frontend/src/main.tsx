import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./Store/store.ts";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  // </StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
);
