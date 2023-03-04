import { existsSync, mkdirSync } from "fs"
import { writeFile } from "fs/promises"
import { artifacts, ethers, network } from "hardhat"

interface ContractParams {
    [key: string]: any
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
    createContractInfo(contractName, contract)
    return contract
}

export async function createContractInfo(contractName: string, contract: any) {
    const artifact = artifacts.readArtifactSync(contractName)
    const contractFile = {
        info: {
            name: contractName,
            network: network.name,
            address: contract.address,
        },
        abi: artifact.abi,
        bytecode: artifact.bytecode,
    }
    // create contract info file
    const contractInfoFile = `./abi/${contractName}.json`
    const exit = existsSync("./abi")
    
    if (!exit) mkdirSync("./abi")
  
    writeFile(contractInfoFile, JSON.stringify(contractFile, null, 2), "utf8")
}
