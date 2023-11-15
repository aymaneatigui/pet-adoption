import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import AdoptePetContext from "./AdoptePetContext.jsx";
// import SearchParams from "./SearchParams.jsx";
// import Details from "./Details.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptePets = useState(null);
  return (
    <div>
      <Router>
        <QueryClientProvider client={queryClient}>
          <AdoptePetContext.Provider value={adoptePets}>
            <header>
              <Link to={"/"}>
                <h1>Adopte me!</h1>
              </Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
            <ReactQueryDevtools />
          </AdoptePetContext.Provider>
        </QueryClientProvider>
      </Router>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
