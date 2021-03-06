// /* eslint-disable jsx-ally/anchor-is-valid */

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import RentalSearchInput from "Components/rental/RentalSearchInput";
const Header = ({ username, isAuth, logout }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">
                BookWithMe
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
            >
                <RentalSearchInput />
                <ul className="navbar-nav ml-auto">
                    {isAuth && (
                        <li className="nav-item">
                            <div className="nav-link">Welcome, {username}</div>
                        </li>
                    )}
                    {isAuth && (
                        <>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="/"
                                    id="navbarDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Manage
                                </a>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdown"
                                >
                                    <Link className="dropdown-item" to = "/rentals/new">
                                        New Rental
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="/">
                                        Something else here
                                    </a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div onClick = {logout}  className="nav-link" href="/">
                                    Logout
                                    <span className="sr-only">(current)</span>
                                </div>
                            </li>
                        </>
                    )}
                    {!isAuth && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">
                                    Register{" "}
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

const mapStateToProps = ({ auth }) => {
    return {
        username: auth.username,
        isAuth: auth.isAuth,
    };
};

export default connect(mapStateToProps)(Header);
