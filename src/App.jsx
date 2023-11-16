import { useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import AdoptePetContext from "./AdoptePetContext.jsx";
// import SearchParams from "./SearchParams.jsx";
// import Details from "./Details.jsx

const Details = lazy(() => import("./Details.jsx"));
const SearchParams = lazy(() => import("./SearchParams.jsx"));

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
        <QueryClientProvider client={queryClient}>
          <AdoptePetContext.Provider value={adoptePets}>
            <Suspense
              fallback={
                <div className="loading-pane">
                  <h1 className="loader">🌀</h1>
                </div>
              }
            >
              <header>
                <Link to={"/"}>
                  <h1>Adopte me!</h1>
                </Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<Details />} />
                <Route path="/" element={<SearchParams />} />
              </Routes>
            </Suspense>
            <ReactQueryDevtools />
          </AdoptePetContext.Provider>
        </QueryClientProvider>
    </div>
  );
};

export default App;