let transactions = [];

// Function to add a transaction
function addTransaction() {
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (description && !isNaN(amount)) {
    const transaction = {
      description,
      amount: type === "expense" ? -amount : amount,
      type
    };
    transactions.push(transaction);
    updateBudget();
    displayTransactions();

    // Clear the input fields
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
  }
}

// Function to update budget display
function updateBudget() {
  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalBalance = totalIncome - totalExpenses;

  document.getElementById("total-income").textContent = totalIncome.toFixed(2);
  document.getElementById("total-expenses").textContent = totalExpenses.toFixed(2);
  document.getElementById("total-balance").textContent = totalBalance.toFixed(2);
}

// Function to display the transactions
function displayTransactions() {
  const transactionList = document.getElementById("transaction-list");
  transactionList.innerHTML = "";

  transactions.forEach(transaction => {
    const listItem = document.createElement("li");
    listItem.classList.add(transaction.type);
    listItem.textContent = `${transaction.description}: $${transaction.amount.toFixed(2)}`;
    transactionList.appendChild(listItem);
  });
}
