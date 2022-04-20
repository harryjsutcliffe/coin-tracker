import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <>
            <nav className="navbar navbar-light orange lighten-4 d-flex justify-content-center">
                <Link className="navbar-brand text-uppercase" to="/">
                    Coin Tracker
                </Link>
            </nav>
        </>
    );
}

export default NavBar;
