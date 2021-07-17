import React from "react";
import PersonList from "@/components/PersonList";
import { useAuth } from "./hooks/useAuth";
import { AuthScreen } from "./pages/AuthScreen";

function App() {
  const { user } = useAuth();

  return <>{user ? <PersonList /> : <AuthScreen />}</>;
}

export default App;
