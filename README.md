# Fake Product Identification System

The Fake Product Identification System is a web3 application developed using the Hardhat framework and ReactJS library. It provides a decentralized solution for verifying the authenticity of products and combating counterfeit items.

Project demo link - https://fpis.onrender.com/

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Counterfeit products have become a significant issue in various industries, leading to financial losses and potential harm to consumers. The Fake Product Identification System aims to tackle this problem by leveraging blockchain technology and decentralized verification.

This web3 application enables manufacturers, suppliers, and customers to collaborate in verifying the authenticity of products through a transparent and immutable system. By integrating with the Ethereum blockchain and utilizing QR code technology, it ensures the integrity and security of product information, making it difficult for counterfeiters to replicate or tamper with data.

## Installation

To install and set up the Fake Product Identification System locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/amoddevkar/fake-product-identification-system.git
   ```

2. Navigate to the project directory:
   ```
   cd fake-product-identification-system
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Configure the project:
   - Create a `.env` file.
   - Set the required environment variables such as Ethereum provider URL, contract addresses, and Metamask configurations.

5. Compile the smart contracts:
   ```
   npx hardhat compile
   ```

6. Deploy the smart contracts:
   ```
   npx hardhat run scripts/deploy.js --network <network-name>
   ```
   Replace `<network-name>` with the desired network to deploy the contracts e.g. sepolia.

7. Start the React development server:
   ```
   cd frontend
   npm start
   ```

8. Access the application in your browser at `http://localhost:3000`.

   For additional information visit -
   https://hardhat.org/    
   https://react.dev/ 

## Usage

Once the Fake Product Identification System is running, follow these steps to use the application:

1. **Registration**: Sign up for an account using Metamask as a manufacturer, supplier, or customer. Provide the necessary details and create a unique account. Metamask integration ensures secure user registration.

2. **Product Creation**: Manufacturers can log in and add new product data. Enter the product details. Only manufacturers have the authority to add product data.

3. **Product Update**: Suppliers can log in and update product data. They can provide additional information or make modifications to existing data to keep it up to date. Only suppliers and manufacturers have the authority to update product data.

4. **Product Verification**: Customers can log in and authenticate product data using the QR code scanner feature. By scanning the QR code on the product, customers can access its details and verify its authenticity. Customers play a vital role in ensuring product verification.

## Features

- **Decentralized Verification**: Leverages blockchain technology to ensure transparent, secure, and tamper-resistant product verification.

- **User Roles**: Supports different user roles (manufacturer, supplier, and customer) with specific functionalities and permissions.

- **Metamask Integration**: Allows seamless registration and login using Metamask for enhanced security and user authentication.

- **QR Code Generation**: Generates unique QR codes for each product, facilitating easy access to product details for verification.

- **QR Code Scanner**: Enables customers to scan QR codes and retrieve product information for authentication purposes.

- **Product Creation**: Only manufacturers can add product data, ensuring data authenticity and control.

- **Product Update**: Suppliers can update product data to reflect changes or provide additional information.

## Contributing

Contributions to the Fake Product Identification System are welcome! 

Please ensure that your code adheres to the project's coding guidelines and includes appropriate tests.

## License

This project is not yet licensed.

