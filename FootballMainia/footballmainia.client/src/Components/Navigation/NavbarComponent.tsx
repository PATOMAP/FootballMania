import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavbarComponent() {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container className="ms-1">
                <Navbar.Brand as={Link} to="/">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/listPlayers">PlayersTop5</Nav.Link>
                    </Nav>

            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
