# Bank Account DApp

## Overview

The Bank Account DApp is a decentralized application built on the Ethereum blockchain that allows users to create and manage shared bank accounts. This project demonstrates the use of smart contracts for financial operations in a decentralized environment.

## Features

- Create shared bank accounts with up to 4 owners
- Deposit funds into accounts
- Request withdrawals from accounts
- Approve withdrawal requests (required for shared accounts)
- Execute approved withdrawals
- View account balances and transaction history

## Technology Stack

- Solidity: Smart contract development
- Hardhat: Ethereum development environment
- Ethers.js: Ethereum wallet implementation and utilities
- HTML/CSS/JavaScript: Frontend user interface
- Ganache-CLI: Local Ethereum blockchain for testing

## Project Structure

```
bank-account-app/
├── contracts/
│   └── BankAccount.sol
├── scripts/
│   └── BankAccount.js
├── frontend/
│   └── index.html
├── test/
│   └── BankAccount.test.js
├── hardhat.config.js
├── package.json
└── README.md
```

## Smart Contract (BankAccount.sol)

The `BankAccount.sol` file contains the Solidity smart contract that implements the core functionality of the Bank Account DApp. It includes:

- Struct definitions for `WithdrawRequest` and `Account`
- Events for account creation, deposits, withdrawal requests, and withdrawals
- Functions for creating accounts, depositing funds, requesting withdrawals, approving withdrawals, and executing withdrawals
- Modifiers to enforce access control and validations

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/bank-account-dapp.git
   cd bank-account-dapp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Compile the smart contract:
   ```
   npx hardhat compile
   ```

4. Deploy the smart contract to a local Ethereum network:
   ```
   npx hardhat node
   npx hardhat run .\ignition\modules\BankAccount.js --network localhost
   ```

5. Update the contract address in the frontend file (`frontend/index.html`) with the deployed contract address.

## Running the DApp

1. Start a local Ethereum network (if not already running):
   ```
   npx hardhat node
   ```

2. Open the `frontend/index.html` file in a web browser with MetaMask installed and connected to your local Ethereum network (usually `http://localhost:8545`).

3. Interact with the DApp through the user interface to create accounts, deposit funds, and manage withdrawals.

## Testing

Run the test suite using Hardhat:

```
npx hardhat test
```

For test coverage information:

```
npx hardhat coverage
```

## Frontend

The frontend is a single HTML file (`frontend/index.html`) that includes embedded CSS and JavaScript. It provides a user-friendly interface for interacting with the smart contract. Key features of the frontend include:

- A sidebar for easy navigation between different functions
- Cards for displaying account information and transaction forms
- Real-time event updates
- Responsive design for both desktop and mobile use

## Security Considerations

- The smart contract includes access control modifiers to ensure only authorized users can perform certain actions.
- Withdrawal requests require approval from other account owners in shared accounts.
- The frontend uses MetaMask for secure transaction signing.

