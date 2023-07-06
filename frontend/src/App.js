import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./sites/HomePage";
import AdminPage from "./sites/AdminPage";
import myImage from "./1.svg"

function App() {
  return (
    <BrowserRouter> 
      <div className="d-flex flex-column min-vh-100">
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand><img src={myImage}></img>VacationBOT</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav">
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto w-100 justify-content-end">
                    <a className="nav-link" target="_blank">
                    VacationBOT
                    </a>
                  </Nav>
                </Navbar.Collapse>
              </Navbar.Toggle>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/admin-michaelkraus@tum" element={<AdminPage />}></Route>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Container>
        </main>
        <footer className="mt-auto">
          <div className="text-center"> Michael Kraus | Technical University of Munich | School of Engineering and Design | Ergonomics - Human Factors Engineering</div>
        </footer>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
