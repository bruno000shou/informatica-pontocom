import { BrowserRouter } from "react-router-dom";
import RoutePages from "./RoutePages";
import HeaderBar from "./components/templates/HeaderBar";
import Footer from "./components/templates/Footer";
import Container from "./components/templates/Container";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderBar />
        <Container>
          <RoutePages />
        </Container>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
