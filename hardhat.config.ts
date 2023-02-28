import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"

const config: HardhatUserConfig = {
    defaultNetwork: "localhost",
    solidity: {
        compilers: [
            { version: "0.8.9" },
            { version: "0.4.18" },
            { version: "0.5.16" },
            { version: "0.6.2" },
            { version: "0.6.12" },
            { version: "0.8.4" },
            { version: "0.5.0" },
            {
                version: "0.6.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                    evmVersion: "istanbul", //	虚拟机版本
                },
            },
        ],
    },
}

export default config
