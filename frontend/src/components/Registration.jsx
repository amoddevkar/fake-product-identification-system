import { useContext, useState, useEffect, useMemo } from "react";
import ButtonGroup from "./ButtonGroup";
import { UserContext } from "./../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import useLoading from "../hooks/useLoading";
const buttonItems = [
  { text: "Manufacturer", id: "mf" },
  { text: "Supplier", id: "sp" },
  { text: "Customer", id: "cs" },
];
const Registration = () => {
  const navigate = useNavigate();
  const { connectWalletReg, fpis, signer, setUser } = useContext(UserContext);
  const [bgSelectedRole, setBgSelectedRole] = useState("");
  const [loadingElement, showLoading] = useLoading(false);
  const selectionChangeHandler = (e) => {
    setBgSelectedRole(e.text);
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const connect = async () => {
      await connectWalletReg();
    };
    connect();
  }, []);

  const handleSubmit = (e) => {
    let userData = {
      username,
      email,
      role: bgSelectedRole,
    };
    showLoading(true);
    console.log(userData.role);
    console.log(userData.username);
    fpis
      .connect(signer)
      .addUser(userData.username, userData.email, userData.role)
      .then(() => {
        signer.getAddress().then((walletAdd) => {
          setUser([
            userData.username,
            userData.email,
            userData.role,
            walletAdd,
          ]);
          enqueueSnackbar("registration successfull !!");
          showLoading(false);
          navigate("/home");
        });
      })
      .catch((error) => {
        enqueueSnackbar("Something went wrong !!");
        showLoading(false);
        navigate("/");
        console.log(error);
      });
  };

  return (
    <div className="reg-container">
      {loadingElement}
      <div className="reg-title">
        <Link to={"/home"} className="link">
          <div className="home-legend-title">Fake Product</div>
          <div className="home-legend-title">
            Identification System<span className="blk">_</span>
          </div>
        </Link>
      </div>
      <div className="reg-form-sec">
        <div className="r-form-w">
          <h2 className="reg-header">
            Registration<span className="blk">_</span>
          </h2>
        </div>

        <div className="r-form-w">
          <input
            type="text"
            className="m-input"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="r-form-w">
          <input
            type="email"
            className="m-input"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="r-form-w">
          <span className="r-user-type-txt">I am </span>
          <span className="r-spacer"></span>
          <ButtonGroup
            items={buttonItems}
            selectedRole={bgSelectedRole}
            onSelectionChange={selectionChangeHandler}
          />
        </div>
        <div className="r-form-w">
          <button className="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
