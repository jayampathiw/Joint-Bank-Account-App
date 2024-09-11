const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("BankAccountModule", (m) => {
  const bankAccount = m.contract("BankAccount");

  return { bankAccount };
});
