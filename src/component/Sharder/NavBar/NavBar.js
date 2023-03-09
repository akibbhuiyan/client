import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiUser } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import "./NavBar.css";
import { useContext, useEffect, useState } from "react";
import { getDatabaseCart } from "../../database/databaseManager";
import { AuthContext } from "../../Context/UserContext";
function NavBar() {
  const [cartData, setCartData] = useState([]);
  const [scrolled, setscrolled] = useState(false);
  const [searchQuery, setsearchQuery] = useState("");
  const { logOut, user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const cartData = getDatabaseCart();
    if (cartData) {
      setCartData(cartData);
    } else {
      setCartData([]);
    }
    const scrolled = () => {
      if (window.scrollY > 204) {
        setscrolled(true);
      } else {
        setscrolled(false);
      }
    };
    window.addEventListener("scroll", scrolled);
    return () => window.removeEventListener("scroll", scrolled);
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products/${searchQuery} `, { replace: true });
  };
  return (
    <Navbar
      className={scrolled ? "p-0 header active" : "p-0 header"}
      expand="lg"
    >
      <Container>
        <Link className="navbar-brand" to="/home">
          Thug Store
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-lg-5 me-md-0 ms-auto">
            <Link className="nav-link" to="/home">
              Home
            </Link>
            <Link className="nav-link" to="/products">
              Products
            </Link>
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </Nav>
          <div className="header-right ms-lg-5 ms-md-0">
            <ul>
              <li className="search_box">
                <input
                  type="text"
                  placeholder="Search Here.."
                  onChange={(e) => setsearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>
                  <FiSearch />
                </button>
              </li>
              <li>
                {user ? (
                  <Link to="/dashboard">
                    <h3 className="avater">A</h3>
                  </Link>
                ) : (
                  <Link to="/login">
                    <FiUser />
                  </Link>
                )}
              </li>
              <li>
                <Link to="/cart">
                  <BsCart2 />
                  <span className="item-count">{cartData.length}</span>
                </Link>
              </li>
            </ul>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
