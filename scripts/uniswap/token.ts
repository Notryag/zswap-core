import { ethers } from "hardhat"

async function main() {
    const Token = await ethers.getContractFactory("Token1")
    const token = await Token.deploy()
    await token.deployed()
    console.log(token.addre)
}

main().catch((err) => {
    console.log(err)
    process.exit(1)
})
