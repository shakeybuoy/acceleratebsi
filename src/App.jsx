import CreateProject from "./components/CreateProject";
import { ProjectProvider } from "./contexts/AppContext";

function App() {
  return (
    <>
      <ProjectProvider>
        <main className="container mx-auto">
          <CreateProject />
        </main>
      </ProjectProvider>
    </>
  );
}

export default App;
