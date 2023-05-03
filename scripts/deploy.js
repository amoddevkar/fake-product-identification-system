const hre = require("hardhat");
const path = require("path");
const fs = require("fs");

async function main() {

  const FPIS_contract = await hre.ethers.getContractFactory("FPIS_contract");
  const fpis_contract = await FPIS_contract.deploy();
  await fpis_contract.deployed();
  console.log(
    `FPIS_contract deployed to ${fpis_contract.address}`
  );
  saveFrontendFiles(fpis_contract);

}

function saveFrontendFiles(fpis_contract) {
  const contractsDir = path.join(__dirname, "/../frontend/src/contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ FPIS_contract: fpis_contract.address }, null, 2)
  );

  const FPIS_contractArtifact = artifacts.readArtifactSync("FPIS_contract");

  fs.writeFileSync(
    contractsDir + "/FPIS_contract.json",
    JSON.stringify(FPIS_contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//{ value: hre.ethers.utils.parseEther("0.01") }



