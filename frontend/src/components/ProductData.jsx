import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./../context/UserContext";
import { enqueueSnackbar } from "notistack";
import useLoading from "../hooks/useLoading";
Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "solid 2px white",
    borderRadius: "10px",
    backgroundColor: "#690003",
  },
};
const ProductData = ({ productDetails }) => {
  const navigate = useNavigate();
  const { fpis, signer, user } = useContext(UserContext);
  const [loadingdata, showLoading] = useLoading();
  const [buyerAdd, setBuyerAdd] = useState("");
  const [classes, setClass] = useState("owner-name-cont");
  const [modalIsOpen, setIsOpen] = useState(false);
  const productOwnerElements = React.useMemo(() => {
    var elementsToDisplay = [];
    productDetails[6].forEach((own, idx) => {
      var jsx = (
        <div className={classes}>
          <div className="owner-name">
            <span className="owner-img-icon-cont">
              <span
                className="owner-img-icon"
                style={{ backgroundImage: 'url("/usr.png")' }}
              ></span>
            </span>
            <div className="owner-text-data">
              <span className="owner-name-text">{own[0]}</span>
              <span className="owner-add-text">{own[3]}</span>
            </div>
          </div>
        </div>
      );

      elementsToDisplay.push(jsx);
      elementsToDisplay.push(<div className="o-spacer"></div>);
    });
    return elementsToDisplay;
  }, [classes]);

  const handleSubmit = () => {
    setIsOpen(false);
    showLoading(true);
    fpis
      .connect(signer)
      .updateOwner(productDetails[0], buyerAdd)
      .then(() => {
        showLoading(false);
        enqueueSnackbar("Product data updated !!");
        navigate("/home");
      })
      .catch((error) => {
        showLoading(false);
        console.log(error);
        enqueueSnackbar("only product owner can update product data");
      });
  };
  const handleUpdate = () => {
    setIsOpen(true);
  };
  const handleAutheticate = () => {
    showLoading(true);
    fpis
      .connect(signer)
      .authenticateProduct(productDetails[0])
      .then(() => {
        showLoading(false);
        enqueueSnackbar(`Product ${productDetails[1]} is Authenticated !!`);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("something went wrong");
        showLoading(false);
      });
  };

  return (
    <>
      {loadingdata}
      <div className="reg-container">
        <div className="productdata-container">
          <div
            className="img-container"
            style={{ backgroundImage: "url('" + productDetails[3] + "')" }}
          >
            <div className="prod-desc-bottom">
              <div className="pro-bottom">
                <div className="img-name">{productDetails[1]}</div>
                <div className="img-price">
                  {"$" + productDetails[2].toString()}
                </div>
              </div>

              <div className="img-qr-download">
                <a href={productDetails[4]} download style={{ color: "white" }}>
                  <i className="fa fa-download" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="productowner-container">
          <div className="r-form-w">
            <h2 className="reg-header">
              Product Owner History<span className="blk">_</span>
            </h2>
          </div>
          {productOwnerElements}

          <div className={`${classes} actions`}>
            {!productDetails[7] && user[3] == productDetails[5] && (
              <button
                className="button"
                onMouseEnter={() => {
                  setClass("owner-name-cont-approve");
                }}
                onMouseLeave={() => {
                  setClass("owner-name-cont");
                }}
                onClick={
                  user[2] == "Customer" ? handleAutheticate : handleUpdate
                }
              >
                {user[2] == "Customer" ? "Approve" : "Update"}
              </button>
            )}
            <Link to={"/home"} className="link">
              <button
                className="button"
                onMouseEnter={() => {
                  setClass("owner-name-cont-reject");
                }}
                onMouseLeave={() => {
                  setClass("owner-name-cont");
                }}
              >
                {productDetails[7] ? "Product is sold" : "close"}
              </button>
            </Link>
          </div>
        </div>
        <Modal isOpen={modalIsOpen} style={customStyles}>
          <div className="modal-top">
            <button className="modal-btn" onClick={handleSubmit}>
              <i class="fa fa-check"></i>
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="modal-btn"
            >
              <i class="fa fa-close"></i>
            </button>
          </div>
          <h2 className="reg-header">Update Product Details</h2>
          <div className="r-form-w">
            <input
              type="text"
              placeholder="Buyer Address"
              className="m-input"
              onChange={(e) => {
                setBuyerAdd(e.target.value);
              }}
            />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ProductData;
