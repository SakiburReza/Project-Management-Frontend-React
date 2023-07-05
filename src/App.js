import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpForm from "./SignUp";
import LoginForm from "./LogInForm";
import ProjectForm from "./ProjectForm";
import { SnackbarProvider } from "notistack";
import ProjectPage from "./ProjectPage";
import ProjectDetailsLoader from "./ProjectDetailsLoader.tsx";
import ProjectFormEdit from "./ProjectFormEdit";

function App() {
  return (
    <SnackbarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/create-project" element={<ProjectForm />} />
          <Route path="/project-page" element={<ProjectPage />} />
          <Route path="/project-details" element={<ProjectDetailsLoader />} />
          <Route path="/edit-project" element={<ProjectFormEdit />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}
export default App;
