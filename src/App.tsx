import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import "./App.css";
import "./assets/scss/main.scss";
import FullPageLoader from "./components/fullPageLoader";
import { store } from "./redux/store";
import StepForm from "./StepForm";
import { queryClient } from "./utils/query";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StepForm />
        <FullPageLoader />
        <Toaster />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
