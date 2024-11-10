import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ShopcontextProvider from "./context/Shopcontext.jsx";
import { Provider } from "react-redux";
import store from "./Store/store.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* <ShopcontextProvider> */}
      <Provider store={store}>
        <App />
      </Provider>
      {/* </ShopcontextProvider> */}
    </BrowserRouter>
  </StrictMode>
);
