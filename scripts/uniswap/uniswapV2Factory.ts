import { ethers } from "hardhat"

const FACTORY_NAME = 'UniswapV2Factory'
export const uniswapV2Factory =async (deployer:string) => {
  const UniswapV2Factory = await ethers.getContractFactory(FACTORY_NAME)
  const uniswapV2Factory = await UniswapV2Factory.deploy(deployer)
  await uniswapV2Factory.deployed()
  

  return uniswapV2Factory
}