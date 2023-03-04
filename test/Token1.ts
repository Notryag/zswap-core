import { expect } from "chai"
import { ethers } from "hardhat"


describe('Token1', function () {
  let Token1, token1, owner, user

  beforeEach(async function () {
    ;[owner, user] = await ethers.getSigners()

    Token1 = await ethers.getContractFactory('Token1')
    token1 = await Token1.connect(owner).deploy()
    await token1.deployed()
  })

  describe('Deployment', function () {
    it('should set the correct name and symbol', async function () {
      expect(await token1.name()).to.equal('Token Coin 1')
      expect(await token1.symbol()).to.equal('t1')
    })

    it('should mint 100000 tokens to the owner', async function () {
      expect(await token1.balanceOf(owner.address)).to.equal(ethers.utils.parseEther('100000'))
    })
  })

  describe('Transactions', function () {
    it('should transfer tokens between accounts', async function () {
      const amount = ethers.utils.parseEther('1')
      await token1.transfer(user.address, amount)

      expect(await token1.balanceOf(owner.address)).to.equal(ethers.utils.parseEther('99999'))
      expect(await token1.balanceOf(user.address)).to.equal(amount)
    })
  })
})
