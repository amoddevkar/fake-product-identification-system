import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
const useLoading = () => {
    const [loadingState, setLoadingState] = useState(false);
    const loadingElement = useMemo(() => {
        if (loadingState) {
            return (
                <>                {
                    createPortal(<div className="loading" >
                        <div className="loading-div">
                            <div className="content">

                                <div className="cuboid">
                                    <div className="side"></div>
                                    <div className="side"></div>
                                    <div className="side"></div>
                                    <div className="side"></div>
                                    <div className="side"></div>
                                    <div className="side"></div>
                                </div>
                                <div className="cuboid">
                                    <div className="side"></div>
                                    <div className="side"></div>
                                    <div className="side"></div>
                                    <div className="side"></div>
                                    <div className="side"></div>
                                    <div className="side"></div>
                                </div>
                                <div className="cuboid">
                                    <div className="side"></div>
                                    <div className="side"></div>
                                    <div className="side"></div>
                                    <div className="side"></div>
                                    <div className="side"></div>
                                    <div className="side"></div>
                                </div>
                                <div className="cuboid">
                                    <div className="side"></div>
                                    <div className="side"></div>
                                    <div className="side"></div>
                                    <div className="side"></div>
                                    <div className="side"></div>
                                    <div className="side"></div>
                                </div>

                            </div>
                            <div className="load-data">
                                <h3 className="load-header"><img className="loading-img-bc" src="blockchain-img.png" />
                                    Loading
                                    <span className="d1">.</span>
                                    <span className="d2">.</span>
                                    <span className="d3">.</span>
                                </h3>
                                <div className="loading-msg-container" >
                                    <div className="tb t1"></div>
                                    <div className="tb t2"></div>
                                    <div className="load-message">Please confirm or reject transaction </div>
                                    <div className="tb t3"></div>
                                    <div className="tb t4"></div>
                                </div>
                            </div>
                        </div>
                    </div >,
                        document.getElementById("loading"),
                        "loading-div"
                    )}
                </>

            );
        }
    }, [loadingState]);
    const returnObj = [
        <> {loadingElement}</>,
        setLoadingState
    ]
    return returnObj;
};

export default useLoading