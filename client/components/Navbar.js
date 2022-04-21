import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn,user,cart }) => {
  console.log(cart)
  return (
  <div className="container">
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link to="/" className="navbar-brand">
          FireBrick Book Store
        </Link>
        <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link active">
              Home
            </Link>
          </li>
        </ul>
        </div>
        <div>
        {isLoggedIn ? (
          <div className="shopping-cart d-flex align-items-center position-relative">
            {/* The navbar will show these links after you log in */}
            <div className="me-3">
              <label htmlFor="search"></label>
              <input
                className="me-2"
                name="search"
                type="text"
                placeholder="type for search"
              />
              <button type="button" className="btn-cart btn btn-primary ">
              <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <Link className = "text-white me-2" to={`/userprofile/${user.id}`}>Profile</Link>
            <button type="button" className="btn-cart btn btn-primary position-relative me-2">
              <i className="fas fa-shopping-cart"></i>
              <span id="item-count" className="position-absolute top-5 start-98 translate-middle badge rounded-pill bg-danger mt-2 ">{cart.counter}</span>
            </button>
            <a className= "text-white" href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div className="shopping-cart d-flex align-items-center position-relative">
            <div className="me-3">
              <label htmlFor="search"></label>
              <input
                className="me-2"
                name="search"
                type="text"
                placeholder="type for search"
              />
              <button type="button" className="btn-cart btn btn-primary ">
              <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            {/* The navbar will show these links before you log in */}
            <Link className="text-white me-3" to="/login">Login</Link>
            <Link className="text-white" to="/signup">Sign Up</Link>
          </div>
        )}
      </div>
      </div>


      <hr />
    </nav>
  </div>
)
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    user: state.auth,
    cart : state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
