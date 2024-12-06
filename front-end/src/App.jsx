import ApplicationRouter from "./Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/user.jsx"

function App() {
  return (
    <div>
      <UserProvider>
          <ToastContainer />
          <ApplicationRouter />
      </UserProvider>
    </div>
  );
}

export default App;