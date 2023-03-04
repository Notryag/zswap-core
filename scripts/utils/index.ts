import { artifacts, ethers } from 'hardhat'

interface ContractParams {
  [key: string]: any;
}

export async function deployContract(contractName: string, rest: ContractParams = {}) {
  // 获取合约工厂
  const Contract = await ethers.getContractFactory(contractName)
  // 如果有owner，则使用owner部署合约
  let contract
  if (rest.owner) {
    const signer = await ethers.getSigner(rest.owner)
    contract = await Contract.connect(signer).deploy(...Object.values(rest))
  } else {
    contract = await Contract.deploy(...Object.values(rest))
  }
  // 等待合约部署完成
  await contract.deployed()
  console.log(`Contract ${contractName} deployed to:`, contract.address)
  return contract
}
