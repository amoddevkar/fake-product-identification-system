import { useContext, useState } from "react";
import QrReader from "react-qr-scanner";
import { UserContext } from "./../context/UserContext";
import ProductData from "./ProductData";
import { enqueueSnackbar } from "notistack";
import { Link } from "react-router-dom";
import useLoading from "../hooks/useLoading";
const QrScannerPage = () => {
  const [data, setData] = useState("");
  const [productShown, setProductShown] = useState(null);
  const { fpis, signer } = useContext(UserContext);
  const [loadingdata, showLoading] = useLoading();
  const handleScan = (data) => {
    if (data) {
      setData(data);
      enqueueSnackbar("fetching product data");
      showLoading(true);
      fpis
        .connect(signer)
        .getProduct(data.text)
        .then((productData) => {
          showLoading(false);
          setProductShown(productData);
          console.log(productData);
        })
        .catch((error) => {
          console.log(error);
          showLoading(false);
          enqueueSnackbar("Cannot fetch product");
          setData("");
        });
    }
  };
  const handleError = (error) => {
    console.log(error);
    enqueueSnackbar("Something went wrong");
  };

  return productShown ? (
    <>
      {loadingdata}
      <ProductData productDetails={productShown} />
    </>
  ) : (
    <>
      {loadingdata}
      <div className="reg-container">
        <div className="reg-title">
          <Link to={"/home"} className="link">
            <div className="home-legend-title">Fake Product</div>
            <div className="home-legend-title">
              Identification System<span className="blk">_</span>
            </div>
          </Link>
        </div>
        <div className="reg-form-sec">
          <div className="qr-scan-container">
            {!data && (
              <>
                <QrReader
                  className="qr-scanner"
                  delay={1000}
                  onError={handleError}
                  onScan={handleScan}
                />

                <div className="qr-text">Scan QR code here</div>
              </>
            )}
            {data && (
              <span
                className="button"
                onClick={() => {
                  setData("");
                }}
              >
                Scan again
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QrScannerPage;
