import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./../context/UserContext";
import { useContext, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (!user[0]) throw "Try Connecting wallet";
        enqueueSnackbar(`Welcome ${user[0]} !!`);
      } catch (error) {
        console.log(error);
        enqueueSnackbar("Try Connecting wallet");
        navigate("/");
      }
    };
    getUserData();
  }, []);

  return (
    user && (
      <div className="reg-container">
        <div className="reg-title">
          <Link to={"/"} className="link">
            <div className="home-legend-title">Fake Product</div>
            <div className="home-legend-title">
              Identification System<span className="blk">_</span>
            </div>
          </Link>
        </div>
        <div className="reg-form-sec">
          <Link to={"/qrscanner"} className="link">
            <div className="home-link">
              <div className="home-link-title">Scan QR</div>

              <div className="home-link-desc">
                Effortlessly reveal the product details using the QR scanner
                with a single tap.
              </div>
            </div>
          </Link>
          {user[2] == "Manufacturer" && (
            <div className="home-link">
              <Link to={"/productform"} className="link">
                <div className="home-link-title">Add Product</div>
                <div className="home-link-desc">
                  Immortalize your product by adding its identity on the secure
                  blockchain network.
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Home;
