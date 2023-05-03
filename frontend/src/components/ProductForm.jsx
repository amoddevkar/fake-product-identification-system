import { useState, useRef, useContext } from "react";
import QRCode from "qrcode";
import Axios from "axios";
import { UserContext } from "./../context/UserContext";
import { enqueueSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import useLoading from "../hooks/useLoading";
function ProductForm() {
  const { fpis, signer } = useContext(UserContext);
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loadingdata, showLoading] = useLoading();
  const hiddenFileInput = useRef(null);

  const handleImgUpload = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    setImage(event.target.files[0]);
  };

  const generateId = async (imageurl) => {
    if (imageurl) {
      const d = Date.now().toString();
      setId(btoa(d + imageurl));
      enqueueSnackbar("Product ID generated");
      console.log(btoa(d + imageurl));
      generateQR(btoa(d + imageurl));
    }
  };

  const generateQR = async (id) => {
    if (id) {
      const response = await QRCode.toDataURL(id.toString());
      setQrCode(response);
      console.log(response);
      enqueueSnackbar("QR code generated");
    }
  };

  const uploadImg = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "blockchain");
    showLoading(true);
    Axios.post(
      "https://api.cloudinary.com/v1_1/dx8vcdcye/image/upload",
      formData
    )
      .then((response) => {
        enqueueSnackbar("Image uploaded successfully");
        setImgUrl(response.data.secure_url);
        generateId(response.data.secure_url);
        showLoading(false);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Cannot upload image");
        showLoading(false);
      });
  };
  const handleSubmit = (e) => {
    showLoading(true);
    fpis
      .connect(signer)
      .addProduct(productName, price, id, imgUrl, qrCode)
      .then(() => {
        showLoading(false);
        enqueueSnackbar("Product added to Blockchain !!");
        navigate("/home");
      })
      .catch((error) => {
        showLoading(false);
        console.log(error);
        enqueueSnackbar("Error! try again");
      });
  };

  return (
    <>
      {loadingdata}
      <div className="reg-container">
        {qrCode ? (
          <div className="qrcode-container">
            <a href={qrCode} download>
              <img
                src={qrCode}
                alt="QR"
                style={{ height: "300px", width: "300px", background: "#fff" }}
              />
            </a>
          </div>
        ) : (
          <div className="reg-title">
            <Link to={"/home"} className="link">
              <div className="home-legend-title">Fake Product</div>
              <div className="home-legend-title">
                Identification System<span className="blk">_</span>
              </div>
            </Link>
          </div>
        )}

        <div className="reg-form-sec">
          <div className="r-form-w">
            <h2 className="reg-header">
              Add Product to Blockchain<span className="blk">_</span>
            </h2>
          </div>
          <div className="r-form-w">
            <input
              className="m-input"
              type="text"
              id="productName"
              value={productName}
              placeholder="Product Name"
              onChange={(event) => setProductName(event.target.value)}
            />
          </div>
          <div className="r-form-w">
            <input
              className="m-input"
              type="number"
              id="price"
              placeholder="Price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          {!image ? (
            <div className="r-form-w">
              <span className="button" onClick={handleImgUpload}>
                select image
                <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
              </span>
            </div>
          ) : (
            <div className="r-form-w">
              <span className="button" onClick={uploadImg}>
                upload image
              </span>
            </div>
          )}
          {qrCode && (
            <div className="r-form-w">
              <button className="button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductForm;
