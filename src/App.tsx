import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { AuthScreen } from "@/pages/AuthScreen";
import { DashBoard } from "@/pages/DashBoard";

function App() {
  const { user } = useAuth();

  return <>{user ? <DashBoard /> : <AuthScreen />}</>;
}

export default App;
