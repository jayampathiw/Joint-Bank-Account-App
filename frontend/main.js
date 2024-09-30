const provider = new ethers.providers.Web3Provider(window.ethereum);
const abi = [
  "event AccountCreated(address[] owners, uint256 indexed id, uint256 timestamp)",
  "event Deposit(address indexed user, uint256 indexed accountId, uint256 value, uint256 timestamp)",
  "event Withdraw(uint256 indexed withdrawId, uint256 timestamp)",
  "event WithdrawRequested(address indexed user, uint256 indexed accountId, uint256 indexed withdrawId, uint256 amount, uint256 timestamp)",
  "function approveWithdrawl(uint256 accountId, uint256 withdrawId)",
  "function createAccount(address[] otherOwners)",
  "function deposit(uint256 accountId) payable",
  "function getAccounts() view returns (uint256[])",
  "function getApprovals(uint256 accountId, uint256 withdrawId) view returns (uint256)",
  "function getBalance(uint256 accountId) view returns (uint256)",
  "function getOwners(uint256 accountId) view returns (address[])",
  "function requestWithdrawl(uint256 accountId, uint256 amount)",
  "function withdraw(uint256 accountId, uint256 withdrawId)",
];

const address = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
let contract = null;

async function getAccess() {
  if (contract) return;
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  contract = new ethers.Contract(address, abi, signer);

  setupEventListeners();
}

function setupEventListeners() {
  const eventsList = document.getElementById("eventsList");
  contract.on("AccountCreated", (owners, id, event) => {
    addEvent(`Account Created: ID = ${id}, Owners = ${owners}`);
  });
  contract.on("Deposit", (user, accountId, value, timestamp) => {
    addEvent(
      `Deposit: User = ${user}, Account ID = ${accountId}, Value = ${ethers.utils.formatEther(
        value
      )} ETH`
    );
  });
  contract.on(
    "WithdrawRequested",
    (user, accountId, withdrawId, amount, timestamp) => {
      addEvent(
        `Withdraw Requested: User = ${user}, Account ID = ${accountId}, Withdraw ID = ${withdrawId}, Amount = ${ethers.utils.formatEther(
          amount
        )} ETH`
      );
    }
  );
  contract.on("Withdraw", (withdrawId, timestamp) => {
    addEvent(`Withdraw Completed: Withdraw ID = ${withdrawId}`);
  });
}

function addEvent(message) {
  const eventsList = document.getElementById("eventsList");
  const li = document.createElement("li");
  li.textContent = message;
  eventsList.prepend(li);
}

async function createAccount() {
  await getAccess();
  const owners = document
    .getElementById("owners")
    .value.split(",")
    .filter((n) => n.trim());
  try {
    await contract.createAccount(owners);
    alert("Account creation initiated. Check events for confirmation.");
  } catch (error) {
    alert("Error creating account: " + error.message);
  }
}

async function viewAccounts() {
  await getAccess();
  try {
    const accounts = await contract.getAccounts();
    const accountsList = document.getElementById("accountsList");
    accountsList.innerHTML = "";
    for (let accountId of accounts) {
      const balance = await contract.getBalance(accountId);
      const owners = await contract.getOwners(accountId);
      const accountDiv = document.createElement("div");
      accountDiv.className = "account-card";
      accountDiv.innerHTML = `
                <h3>Account ${accountId}</h3>
                <p><strong>Balance:</strong> ${ethers.utils.formatEther(
                  balance
                )} ETH</p>
                <p><strong>Owners:</strong> ${owners.join(", ")}</p>
            `;
      accountsList.appendChild(accountDiv);
    }
  } catch (error) {
    alert("Error fetching accounts: " + error.message);
  }
}

async function deposit() {
  await getAccess();
  const amount = document.getElementById("depositAmount").value;
  const accountId = document.getElementById("depositAccountId").value;
  try {
    await contract.deposit(accountId, {
      value: ethers.utils.parseEther(amount),
    });
    alert("Deposit initiated. Check events for confirmation.");
  } catch (error) {
    alert("Error depositing: " + error.message);
  }
}

async function requestWithdrawal() {
  await getAccess();
  const amount = document.getElementById("withdrawAmount").value;
  const accountId = document.getElementById("withdrawAccountId").value;
  try {
    await contract.requestWithdrawl(accountId, ethers.utils.parseEther(amount));
    alert("Withdrawal request initiated. Check events for confirmation.");
  } catch (error) {
    alert("Error requesting withdrawal: " + error.message);
  }
}

async function approveWithdrawal() {
  await getAccess();
  const accountId = document.getElementById("approveAccountId").value;
  const withdrawId = document.getElementById("approveWithdrawId").value;
  try {
    await contract.approveWithdrawl(accountId, withdrawId);
    alert("Withdrawal approval initiated. Check events for confirmation.");
  } catch (error) {
    alert("Error approving withdrawal: " + error.message);
  }
}

async function withdraw() {
  await getAccess();
  const accountId = document.getElementById("withdrawFinalAccountId").value;
  const withdrawId = document.getElementById("withdrawFinalId").value;
  try {
    await contract.withdraw(accountId, withdrawId);
    alert("Withdrawal initiated. Check events for confirmation.");
  } catch (error) {
    alert("Error withdrawing: " + error.message);
  }
}

function showSection(sectionId) {
  const sections = ["accounts", "create", "deposit", "withdraw", "events"];
  sections.forEach((id) => {
    document.getElementById(id).style.display =
      id === sectionId ? "block" : "none";
  });
  document.querySelectorAll(".sidebar-nav a").forEach((el) => {
    el.classList.remove("active");
  });
  event.target.classList.add("active");
}

// Initialize the app
showSection("accounts");
viewAccounts();