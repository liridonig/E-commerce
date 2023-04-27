import { Outlet, Link } from "react-router-dom";
import CrownLogo from "../../assets/crown.svg";
import "../navigation/navigation.style.css";

const Navigation = () => {
  return (
    <>
      <section className="nav">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="navigation">
                <Link to="/">
                  <img src={CrownLogo} className="logo" />
                </Link>
                <div className="nav-links-container">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                  <Link className="nav-link" to="/shop">
                    Shop
                  </Link>
                  <Link className="nav-link" to="/sign-in">
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Outlet />
    </>
  );
};

export default Navigation;
