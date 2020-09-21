import { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  //   UncontrolledDropdown,
  //   DropdownToggle,
  //   DropdownMenu,
  //   DropdownItem,
} from "reactstrap";
import Nprogress from "nprogress";
import { APP_NAME } from "../config";
import Link from "next/link";
import { SignOut, isAuth } from "./../action/auth";
import Router from "next/router";
import Search from "./blog/Search";

Router.onRouteChangeStart = (url) => Nprogress.start();
Router.onRouteChangeComplete = (url) => Nprogress.done();
Router.onRouteChangeError = (url) => Nprogress.done();

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ fontFamily: "Montserrat" }}>
      <Navbar
        light
        expand="md"
        style={{ backgroundColor: "#00bbbd" }}
        className="navbar-dark"
      >
        <Link href="/">
          <NavLink
            style={{
              fontFamily: "Fredoka One",
              color: "white",
              cursor: "pointer",
            }}
          >
            <img
              src={
                !`../static/image/logo.png` ||
                `https://clt.manoa.hawaii.edu/wp-content/uploads/2015/02/CLTicon2013color.png`
              }
              style={{
                width: 40,
                height: 35,
                marginRight: 10,
                marginLeft: -12,
              }}
            />
            {APP_NAME}
          </NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {isAuth() && isAuth().role === 1 && (
              <>
                <NavItem>
                  <Link href="/admin">
                    <NavLink
                      style={{
                        color: "white",
                        fontSize: 15,
                        cursor: "pointer",
                      }}
                    >
                      {`${isAuth().name}'s (Admin) Dashboard`}
                    </NavLink>
                  </Link>
                </NavItem>
              </>
            )}
            <NavItem>
              <Link href="/blogs">
                <NavLink
                  style={{
                    color: "white",
                    fontSize: 15,
                    cursor: "pointer",
                  }}
                >
                  Blogs
                </NavLink>
              </Link>
            </NavItem>
            {isAuth() ? (
              <NavItem>
                <Link href="/signup">
                  <NavLink
                    style={{ color: "white", fontSize: 15, cursor: "pointer" }}
                    onClick={() => SignOut(() => Router.replace(`/signin`))}
                  >
                    Signout
                  </NavLink>
                </Link>
              </NavItem>
            ) : (
              <>
                <NavItem>
                  <Link href="/signin">
                    <NavLink
                      style={{
                        color: "white",
                        fontSize: 15,
                        cursor: "pointer",
                      }}
                    >
                      <a>SignIn</a>
                    </NavLink>
                  </Link>
                </NavItem>

                <NavItem>
                  <Link href="/signup">
                    <NavLink
                      style={{
                        color: "white",
                        fontSize: 15,
                        cursor: "pointer",
                      }}
                    >
                      <a>SignUp</a>
                    </NavLink>
                  </Link>
                </NavItem>
              </>
            )}

            {isAuth() && isAuth().role === 0 && (
              <>
                <NavItem>
                  <Link href="/users">
                    <NavLink
                      style={{
                        color: "white",
                        fontSize: 15,
                        cursor: "pointer",
                      }}
                    >
                      <a>{`${isAuth().name}'s Dashboard`}</a>
                    </NavLink>
                  </Link>
                </NavItem>
              </>
            )}
            {isAuth() && (
              <>
                <NavItem>
                  <Link href="/users/crud/blog">
                    <NavLink
                      style={{
                        color: "white",
                        fontSize: 15,
                        cursor: "pointer",
                      }}
                    >
                      <a className="btn btn-outline-primary btn-to btn-sm">
                        Write a blog
                      </a>
                    </NavLink>
                  </Link>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
