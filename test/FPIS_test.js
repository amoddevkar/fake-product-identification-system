const { expect } = require("chai");

const COMPANYNAME = "Ryzen"
const PRICE = 100
const ID = "testid"
const PRODUCTIMG = "testimg"
const PRODUCTQR = "testqr"


describe("FPIS_contract", () => {

  let product, deployer, buyer;

  beforeEach(async () => {
    [deployer, buyer] = await ethers.getSigners()

    // Deploy contract
    const FPIS_contract = await ethers.getContractFactory("FPIS_contract")
    product = await FPIS_contract.deploy()
  })

  describe("Deployment", () => {

    it("Sets the owner", async () => {
      expect(await product.contractOwner()).to.equal(deployer.address)
    })

    // it("Set owner roles mapping", async () => {
    //   expect(await product.roleNames["Manufacturer"].to.equal("Manufacturer"))
    // })
  })

  describe("AddProduct", () => {

    let transaction1, transaction2;

    beforeEach(async () => {
      // add a product
      transaction1 = await product.connect(deployer).addProduct(COMPANYNAME, PRICE, ID, PRODUCTIMG, PRODUCTQR)
      await transaction1.wait()

    })

    it("Returns product attributes", async () => {
      transaction2 = await product.connect(buyer).getProduct(ID)
      const pro = { id: transaction2[0], companyName: transaction2[1], price: transaction2[2], productImg: transaction2[3], productQr: transaction2[4], currentOwner: transaction2[5], owners: transaction2[6], autheticate: transaction2[7] }

      expect(pro.id).to.equal(ID)
      expect(pro.companyName).to.equal(COMPANYNAME)
      expect(pro.price).to.equal(PRICE)
      expect(pro.productImg).to.equal(PRODUCTIMG)
      expect(pro.productQr).to.equal(PRODUCTQR)
      expect(pro.currentOwner).to.equal(deployer.address)
      expect(pro.owners[0].userAdd).to.have.ordered.members(deployer.address)
      expect(pro.autheticate).to.equal(false)
    })

    it("Emits add event", () => {
      expect(transaction1).to.emit(product, "Add")
    })
  })

  describe("UpdateProduct", () => {
    let transaction1, transaction2, transaction3;

    beforeEach(async () => {
      //update a product
      transaction1 = await product.connect(deployer).addProduct(COMPANYNAME, PRICE)
      await transaction1.wait()
      transaction2 = await product.connect(deployer).updateProductData(ID, buyer.address)
      await transaction2.wait()

    })

    it("Update product owner", async () => {
      transaction3 = await product.connect(buyer).getProduct(ID)
      const pro = { id: transaction3[0], companyName: transaction3[1], price: transaction3[2], currentOwner: transaction3[3], owners: transaction3[4] }

      expect(pro.currentOwner).to.equal(buyer.address)
      expect(pro.owners).to.have.ordered.members([deployer.address, buyer.address])
    })

    it("Emits sold event", () => {
      expect(transaction2).to.emit(product, "Sold")
    })
  })

  describe("ViewProducts", () => {
    let transaction0, transaction1, transaction2, transaction3, transaction;

    it("Show products", async () => {
      //view a product
      transaction0 = await product.connect(deployer).addProduct(COMPANYNAME, PRICE)
      await transaction0.wait()
      transaction1 = await product.connect(deployer).addProduct('intel', 100)
      await transaction1.wait()
      transaction = await product.connect(deployer).updateProductData(2, buyer.address)
      await transaction.wait()
      transaction2 = await product.connect(buyer).getProduct(ID)
      transaction3 = await product.connect(buyer).getProduct(2)
      const item = { id: transaction3[0], companyName: transaction3[1], price: transaction3[2], currentOwner: transaction3[3], owners: transaction3[4] }
      const pro = { id: transaction2[0], companyName: transaction2[1], price: transaction2[2], currentOwner: transaction2[3], owners: transaction2[4] }
      expect(pro.companyName).to.equal(COMPANYNAME)
      expect(pro.price).to.equal(PRICE)
      expect(pro.currentOwner).to.equal(deployer.address)
      expect(pro.owners).to.have.ordered.members([deployer.address])
      console.log(item);
    })
  })

})