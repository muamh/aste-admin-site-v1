import './Navbar.css';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = (props) => {
    const {logged} = props;
    const handleLogOut = () =>{
        sessionStorage.removeItem("identificator")
        window.location.reload();
    }
    if (sessionStorage.getItem("identificator") === null) {
        return (
            <div className="nav-bar bg-dark">
                <Navbar expand="lg" variant="dark" className="navbar-dark">
                    <Container>
                        <Navbar.Brand href="#">
                            <Link to={'/'} style={{textDecoration:'none'}} className="active">
                                <div className="d-flex align-items-center">
                                    <div className="icon p-2 me-2">
                                        <img src={"https://firebasestorage.googleapis.com/v0/b/mumah-estate.appspot.com/o/928118df-de82-4f4d-99fc-f741b11234b1.png?alt=media"} alt="Icon" style={{ width: '50px', height: '50px' }} />
                                    </div>
                                    <h1 className="m-0 text-primary fs-lg-4 fs-md-3 fs-sm-2" >MUMAH ESTATE ADMINS</h1>
                                </div>
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarCollapse" />
                    </Container>
                </Navbar>
            </div>
        );
    }
    else if(sessionStorage.getItem("identificator") !== null && sessionStorage.getItem("roleOfIdentificator") !== null && sessionStorage.getItem("identificator") === sessionStorage.getItem("roleOfIdentificator")){
        return (
            <div className="nav-bar bg-dark">
                <Navbar expand="lg" variant="dark" className="navbar-dark">
                    <Container>
                        <Navbar.Brand href="#">
                            <Link to={'/'} style={{textDecoration:'none'}} className="active">
                                <div className="d-flex align-items-center">
                                    <div className="icon p-2 me-2">
                                        <img src={"https://firebasestorage.googleapis.com/v0/b/mumah-estate.appspot.com/o/928118df-de82-4f4d-99fc-f741b11234b1.png?alt=media"} alt="Icon" style={{ width: '50px', height: '50px' }} />
                                    </div>
                                    <h1 className="m-0 text-primary fs-lg-4 fs-md-3 fs-sm-2" >MUMAH ESTATE ADMINS</h1>
                                </div>
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarCollapse" />
                        <Navbar.Collapse id="navbarCollapse">
                            <Nav className="ms-auto">
                                <Nav.Link className='active'><Link to={'/'} style={{textDecoration:'inherit'}} className="active">Home</Link></Nav.Link>
                                <NavDropdown title="Cerca" id="property-dropdown">
                                    <NavDropdown.Item>Cosa Cerchi</NavDropdown.Item>
                                    <NavDropdown.Item><Link to={'/pagina/lista/gestione/venditori'} style={{textDecoration:'none'}} className="active">Venditori</Link></NavDropdown.Item>
                                    <NavDropdown.Item><Link to={'/pagina/lista/gestione/utenti'} style={{textDecoration:'none'}} className="active">Utenti</Link></NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Personale" id="pages-dropdown">
                                    <NavDropdown.Item href="#"><Link to={'/'} style={{textDecoration:'none'}} className="active" onClick={handleLogOut}>LogOut</Link></NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="#"><Link to={'/contacts'} style={{textDecoration:'none'}} className="active">Contatti</Link></Nav.Link>
                                {/*<Nav.Link href="#" className="btn px-3 d-none d-lg-flex">Add Property</Nav.Link>*/}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
    
}

export default NavigationBar;
