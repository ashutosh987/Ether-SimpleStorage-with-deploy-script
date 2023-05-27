const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

async function main() {
  // http://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.PRIVATE_URL
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const bin = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");

  const contractFactory = new ethers.ContractFactory(abi, bin, wallet);
  console.log("deploying .....");

  const contract = await contractFactory.deploy();

  console.log(`contract address ${contract.address}`);

  await contract.deployTransaction.wait(1);

  //   console.log("here is the deployemnt transcation ");
  //   console.log(contract.deployTransaction);

  //   console.log("here is the  transcation receipt ");
  //   console.log(transcationReceipt);

  //Get current Number
  let currentFavNumber = await contract.retrive();
  console.log(`curren Fav No : ${currentFavNumber}`);
  let transcationResponse = await contract.store(7);
  let transcationReceipt1 = await transcationResponse.wait();
  currentFavNumber = await contract.retrive();
  console.log(`updated number is : ${currentFavNumber}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
