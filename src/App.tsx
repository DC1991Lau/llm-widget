import { QueryClientProvider } from "@tanstack/react-query";

import Chat from "./components/conversation/Chat";
import queryClient from "./lib/query-client";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Chat />
    </QueryClientProvider>
  );
}

export default App;
