import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Setting from "./pages/Setting";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyle from "./styles/GlobalStyle";
import Booking from "./pages/Booking";
import AppLayout from "./ui/AppLayout";
import BookingDetails from "./features/bookings/BookingDetails";
import CheckIn from "./pages/CheckIn";
import ProtectedRoute from "./ui/ProtectedRoute";
import NewUsers from "./pages/Users";
import { DarkModeProvider } from "./context/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime:60 * 1000, // 1 minute
      staleTime: 0, // 1 minute
    },
  },
});

export default function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <GlobalStyle />
        <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Booking />} />
            <Route path="bookings/:bookingId" element={<BookingDetails />} />
            <Route path="checkin/:bookingId" element={<CheckIn />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<NewUsers/>} />
            <Route path="settings" element={<Setting />} />
            <Route path="account" element={<Account />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
            padding: "16px 22px",
          },
        }}
      />
    </QueryClientProvider>
    </DarkModeProvider>
  );
}
