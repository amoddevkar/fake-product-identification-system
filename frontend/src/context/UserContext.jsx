import { createContext, useState } from "react";
import { ethers } from "ethers";
import FPIS from "../contracts/FPIS_contract.json";
import FPIS_address from "../contracts/contract-address.json";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    fpis: null,
  });

  const connectWalletReg = async () => {
    try {
      const { ethereum } = window;
      await ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const fpis = new ethers.Contract(
        FPIS_address.FPIS_contract,
        FPIS.abi,
        signer
      );

      setState({ provider, signer, fpis });
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      await ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const fpis = new ethers.Contract(
        FPIS_address.FPIS_contract,
        FPIS.abi,
        signer
      );
      const user = await fpis.connect(signer).getUser();
      setState({ provider, signer, fpis });
      setUser(user);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        fpis: state.fpis,
        signer: state.signer,
        provider: state.provider,
        user,
        connectWallet,
        connectWalletReg,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
