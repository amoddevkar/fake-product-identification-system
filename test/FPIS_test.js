const { expect } = require("chai");

const PRODUCTNAME = "Ryzen"
const PRICE = 100
const ID = "testid"
const PRODUCTIMG = "testimg"
const PRODUCTQR = "testqr"
const USERNAME = "testuser123"
const EMAIL = "test@test.test"
const ROLE = "Manufacturer"

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

  })

  describe("UserRegistration", () => {

    let transaction1, transaction2;

    beforeEach(async () => {
      // add user
      transaction1 = await product.connect(deployer).addUser(USERNAME, EMAIL, ROLE)
      await transaction1.wait()

    })

    it("Returns user data", async () => {
      transaction2 = await product.connect(deployer).getUser()
      const user = { username: transaction2[0], email: transaction2[1], role: transaction2[2], address: transaction2[3] }

      expect(user.username).to.equal(USERNAME)
      expect(user.email).to.equal(EMAIL)
      expect(user.role).to.equal(ROLE)
      expect(user.address).to.equal(deployer.address)
    })

    it("Emits add user event", () => {
      expect(transaction1).to.emit(product, "AddUser")
    })

  })

  describe("AddProduct", () => {

    let transaction0, transaction1, transaction2;

    beforeEach(async () => {
      // add a product
      transaction0 = await product.connect(deployer).addUser(USERNAME, EMAIL, ROLE)
      await transaction0.wait()
      transaction1 = await product.connect(deployer).addProduct(PRODUCTNAME, PRICE, ID, PRODUCTIMG, PRODUCTQR)
      await transaction1.wait()

    })

    it("Returns product attributes", async () => {
      transaction2 = await product.connect(buyer).getProduct(ID)
      const pro = { id: transaction2[0], productName: transaction2[1], price: transaction2[2], productImg: transaction2[3], productQr: transaction2[4], currentOwner: transaction2[5], owners: transaction2[6], autheticate: transaction2[7] }
      const proOnwersArray = [pro.owners[0].userAdd]
      expect(pro.id).to.equal(ID)
      expect(pro.productName).to.equal(PRODUCTNAME)
      expect(pro.price).to.equal(PRICE)
      expect(pro.productImg).to.equal(PRODUCTIMG)
      expect(pro.productQr).to.equal(PRODUCTQR)
      expect(pro.currentOwner).to.equal(deployer.address)
      expect(proOnwersArray).to.have.ordered.members([deployer.address])
      expect(pro.autheticate).to.equal(false)
    })

    it("Emits add product event", () => {
      expect(transaction1).to.emit(product, "Add")
    })
  })

  describe("UpdateProduct", () => {
    let transaction, transaction0, transaction1, transaction2, transaction3;

    beforeEach(async () => {
      // add users
      transaction = await product.connect(deployer).addUser(USERNAME, EMAIL, ROLE)
      await transaction.wait()
      transaction0 = await product.connect(buyer).addUser("buyer", "buyer@gamil.com", "Customer")
      await transaction0.wait()
      // add a product
      transaction1 = await product.connect(deployer).addProduct(PRODUCTNAME, PRICE, ID, PRODUCTIMG, PRODUCTQR)
      await transaction1.wait()
      //update a product
      transaction2 = await product.connect(deployer).updateOwner(ID, buyer.address)
      await transaction2.wait()

    })

    it("Update product owner", async () => {
      transaction3 = await product.connect(buyer).getProduct(ID)
      const pro = { id: transaction3[0], productName: transaction3[1], price: transaction3[2], productImg: transaction3[3], productQr: transaction3[4], currentOwner: transaction3[5], owners: transaction3[6], autheticate: transaction3[7] }
      const proOnwersArray = [pro.owners[0].userAdd, pro.owners[1].userAdd]
      expect(pro.currentOwner).to.equal(buyer.address)
      expect(proOnwersArray).to.have.ordered.members([deployer.address, buyer.address])
    })

    it("Emits product sold event", () => {
      expect(transaction2).to.emit(product, "Sold")
    })
  })

  describe("AuthenticateProduct", () => {
    let transaction, transaction0, transaction1, transaction2, transaction3, transaction4;

    beforeEach(async () => {
      // add users
      transaction = await product.connect(deployer).addUser(USERNAME, EMAIL, ROLE)
      await transaction.wait()
      transaction0 = await product.connect(buyer).addUser("buyer", "buyer@gamil.com", "Customer")
      await transaction0.wait()
      // add a product
      transaction1 = await product.connect(deployer).addProduct(PRODUCTNAME, PRICE, ID, PRODUCTIMG, PRODUCTQR)
      await transaction1.wait()
      //update a product
      transaction2 = await product.connect(deployer).updateOwner(ID, buyer.address)
      await transaction2.wait()
      //authenticate product
      transaction3 = await product.connect(buyer).authenticateProduct(ID)
      await transaction3.wait()

    })

    it("Authenticate product", async () => {
      transaction4 = await product.connect(buyer).getProduct(ID)
      const pro = { id: transaction4[0], productName: transaction4[1], price: transaction4[2], productImg: transaction4[3], productQr: transaction4[4], currentOwner: transaction4[5], owners: transaction4[6], autheticate: transaction4[7] }

      expect(pro.autheticate).to.equal(true)

    })

  })

})