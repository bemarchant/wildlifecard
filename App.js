import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WildLifeCard } from "./components/WildLifeCard";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WildLifeCard></WildLifeCard>
    </QueryClientProvider>
  );
}
