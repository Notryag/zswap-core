import { readFile, writeFile } from 'fs/promises'
import { ethers } from 'hardhat'
import { resolve } from 'path'
import { deployContract } from '../utils/index'
const fs = require('fs')
async function main() {
  // 工厂合约
  const factory = await deployContract('UniswapV2Factory', { setter: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' })
  const weth = await deployContract('WETH9')

  const INIT_CODE_PAIR_HASH = await factory.INIT_CODE_PAIR_HASH()
  console.log(INIT_CODE_PAIR_HASH, 'INIT_CODE_PAIR_HASH')
  editRouterHex(INIT_CODE_PAIR_HASH.slice(2))

  const router2 = await deployContract('UniswapV2Router02', { factory: factory.address, weth: weth.address })
  const multi = await deployContract('Multicall');

  // 部署合约并保存合约信息
  //   const token0 = await deployContract('Token0')
  //   const token1 = await deployContract('Token1')
  //   const token2 = await deployContract('Token2')
  //   const token3 = await deployContract('Token3')
  //   const token3 = await deployContract('Uni')

}

main().catch((err) => {
  console.log(err)
  process.exit(1)
})

const editRouterHex = async (hex: string) => {
  const ROUTER2_PATH = resolve(__dirname, '../../contracts/uniswap/periphery/libraries/UniswapV2Library.sol')

  readFile(ROUTER2_PATH, 'utf8')
  try {
    const data = await readFile(ROUTER2_PATH, 'utf-8')

    const regex = /'([a-fA-F0-9]{64})'/
    const match = data.match(regex)

    if (match) {
      const [, oldCodeHash] = match // 解构捕获的组
      console.log(oldCodeHash, 'oldCodeHash')

      const replacedData = data.replace(oldCodeHash, hex)

      // 写入文件
      await writeFile(ROUTER2_PATH, replacedData, 'utf8')

      console.log('File content replaced successfully.')
    } else {
      console.log('No match found')
    }
  } catch (error) {
    console.log(error, 'editRouter fail')
  }
}
