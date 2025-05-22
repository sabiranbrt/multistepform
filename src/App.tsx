import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import "./assets/scss/main.scss";
import StepForm from "./StepForm";
import { queryClient } from "./utils/query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StepForm />
    </QueryClientProvider>
  );
}

export default App;
