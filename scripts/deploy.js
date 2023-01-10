const { ethers, run, network } = require("hardhat")
require("dotenv").config()

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying Contract")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log("Deployed contract to: ", simpleStorage.address)
  console.log(network.config.chainId === 5, process.env.ETHERSCAN_API_KEY)
  if ((network.config.chainId === 5, process.env.ETHERSCAN_API_KEY)) {
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  const currentValue = await simpleStorage.retrieve()
  console.log(`current value is: ${currentValue}`)

  await simpleStorage.store(7)
  await simpleStorage.deployTransaction.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`updated value is: ${updatedValue}`)
}

async function verify(contractAddress, args) {
  console.log("Verifying contract")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified")
    } else {
      console.log(e)
    }
  }
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
