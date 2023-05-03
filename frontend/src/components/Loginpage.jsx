import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./../context/UserContext";
import { useContext } from "react";
import { enqueueSnackbar } from "notistack";
import Background from "./background/Background";
import useLoading from "../hooks/useLoading";

const Loginpage = () => {
  const userContext = useContext(UserContext);
  const [loadingElement, showLoading] = useLoading();
  const navigate = useNavigate();
  const handleConnect = () => {
    showLoading(true);
    userContext
      .connectWallet()
      .then(() => {
        showLoading(false);
        enqueueSnackbar("Wallet Connection Successful !!");
        navigate("/home");
      })
      .catch((error) => {
        showLoading(false);
        enqueueSnackbar("User not registered");
      });
  };

  return (
    <Background>
      {loadingElement}
      <div className="home-container">
        <div className="home-legend-title">Fake Product</div>
        <div className="home-legend-title">
          Identification System<span className="blk">_</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "5rem 0",
          }}
        >
          <div className="home-desc ">
            <div>
              Introducing our revolutionary fake product identification system
              powered by blockchain technology and QR codes. Say goodbye to
              counterfeit goods and hello to trust and transparency. Our system
              provides a secure and immutable record of product information,
              including product details and supply chain history. Simply scan
              the QR code on any product to access its verified information.
              With our cutting-edge solution, you can be confident in the
              authenticity and quality of your purchases
              <span className="typewriter">. </span>
            </div>
          </div>
          <div className="home-links-sec">
            <Link to={"/registration"} className="link">
              <button className="animated-button1">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Register
              </button>
            </Link>
            <button className="animated-button1" onClick={handleConnect}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Connect
            </button>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default Loginpage;
