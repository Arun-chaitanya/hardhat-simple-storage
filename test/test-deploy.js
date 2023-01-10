const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
  let simpleStorageFactory, simpleStorage
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"
    assert.equal(currentValue.toString(), expectedValue)
  })
  it("Should update when we call store", async function () {
    await simpleStorage.store(7)
    await simpleStorage.deployTransaction.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    const expectedValue = "7"
    assert.equal(updatedValue.toString(), expectedValue)
  })
})
