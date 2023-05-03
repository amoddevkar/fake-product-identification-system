// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract FPIS_contract {
    address public contractOwner;
    enum Role { Invalid ,Manufacturer, Supplier, Customer }

    struct ProductData {
        string id;
        string productName;
        uint price;
        string productImg;
        string qrImg;
        address currentOwner;
        address[] owners;
        bool authenticate;
    }

    struct UserData {
        string username;
        string email;
        Role role;
        address userAdd;
    }
    mapping(string => ProductData) public products;
    mapping(address => UserData) public users;
    mapping(string => bool) usernames;
    mapping (string => Role ) roleNames;

    event Sold(address buyer, address owner, string id, string productName);
    event Add(string id,address currentOwner,string productName);
    event AddUser(string username,string email,string role,address userAdd);

    constructor() {
        contractOwner = msg.sender;
        roleNames["Invalid"] = Role.Invalid;
        roleNames["Manufacturer"] = Role.Manufacturer;
        roleNames["Supplier"] =  Role.Supplier;
        roleNames["Customer"] =  Role.Customer;
    }

    function addUser(string memory _username,string memory _email,string memory _role)public{
        require(users[msg.sender].userAdd == address(0), "User already exists");
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(bytes(_email).length > 0, "Email cannot be empty");
        require(!usernames[_username], "Username is already taken");
        require(bytes(_role).length > 0, "Role cannot be empty");
        require(roleNames[_role] != Role(0), "Invalid role");
        usernames[_username] = true;
        UserData memory user= UserData(_username,_email,roleNames[_role],msg.sender);
        users[msg.sender]= user;
        emit AddUser(_username,_email,_role,msg.sender);
    }

    function addProduct(string memory _productName, uint _price, string memory _id, string memory _productImg,string memory _qrImg) public {
        require(users[msg.sender].role == Role.Manufacturer, "Only manufacturers can add product to blockchain");
        require(bytes(_productName).length > 0, "Productname cannot be empty");
        require(bytes(_productImg).length > 0, "Product image cannot be empty");
        require(bytes(_qrImg).length > 0, "Qrcode cannot be empty");
        address[] memory _owners;
        _owners = new address[](1); 
        _owners[0] = msg.sender;
        ProductData memory product = ProductData(_id,_productName,_price, _productImg,_qrImg,msg.sender,_owners,false);
        products[_id] = product;
        emit Add(_id,msg.sender,_productName);
    }

    function updateOwner(string memory _id, address _newOwner) public {
        ProductData storage product = products[_id];
        require(product.currentOwner == msg.sender, "Only the current owner can update the product data");   
        product.currentOwner = _newOwner;
        product.owners.push(_newOwner);
        emit Sold(_newOwner,msg.sender,_id,product.productName);
    }

    function authenticateProduct(string memory _id) public {
        ProductData storage product = products[_id];
        require(product.currentOwner == msg.sender, "Only the current owner can authenticate the product");
        product.authenticate = true;   
    }

    function getProduct(string memory _id) public view returns (string memory,string memory,  uint,string memory,string memory, address, UserData[] memory, bool) {
        ProductData storage product = products[_id];
        uint256 length = product.owners.length;
        UserData[] memory ownersData = new UserData[](length);
        for (uint256 i = 0; i < length; i++) {
            ownersData[i] = users[product.owners[i]];
        }
        return (product.id,product.productName, product.price,product.productImg,product.qrImg ,product.currentOwner, ownersData ,product.authenticate);
    }

    function getUser() public view returns(string memory ,string memory,string memory, address){
        require(msg.sender != address(0), "Invalid user address");
        require(users[msg.sender].userAdd != address(0), "User is not registered");
        UserData storage user = users[msg.sender];
        Role role = user.role;
        string memory roleString = roleNameToString(role);
        return(user.username,user.email,roleString,user.userAdd);
    }

    function roleNameToString(Role _role) internal pure returns (string memory) {
        return _role == Role.Manufacturer ? "Manufacturer" :
            _role == Role.Supplier ? "Supplier" :
            _role == Role.Customer ? "Customer" :
            "Invalid role";
    }
}
