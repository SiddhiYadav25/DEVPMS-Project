import {createRoot} from "react-dom/client"
import App from "./App"
import { Provider } from "react-redux"
import store from "./components/store/store"
import { ThemeProvider } from "./components/context/ThemeContext"



createRoot(document.getElementById("root")).render(<Provider store={store}>
  <ThemeProvider>
      <App></App>
  </ThemeProvider>
</Provider>)