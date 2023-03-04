const { ethers, artifacts } = require('hardhat');

async function deployContract() {
  const MyContract = await ethers.getContractFactory('Token1');
  const myContract = await MyContract.deploy();
  await myContract.deployed();

  const contractArtifact = {
    abi: MyContract.interface.format('json'),
    bytecode: MyContract.bytecode,
    deployedBytecode: myContract.deployTransaction.data,
    address: myContract.address,
  };

  await artifacts.write('MyContract', contractArtifact);

  return myContract;
}

deployContract();