import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import SearchParams from "./SearchParams.jsx";
import Details from "./Details.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <div>
      <Router>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <header>
              <Link to={"/"}>
                <h1>Adopte me!</h1>
              </Link>
            </header>
            <Routes>
              <Route path='/details/:id' element={<Details />} />
              <Route path='/' element={<SearchParams />} />
            </Routes>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </Provider>
      </Router>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
