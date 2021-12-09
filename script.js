document.getElementById('submit').addEventListener('click', (e) => {
  e.preventDefault();

  const paymentType = document.getElementById('paymentType');
  const purchase = document.getElementById('purchase');
  const date = document.getElementById('date');
  const amount = document.getElementById('amount');
  const location = document.getElementById('location');

  if (
    !paymentType.value ||
    !purchase.value ||
    !date.value ||
    !amount.value ||
    !location.value
  ) {
    alert('Please fill out all fields before submitting. ');
    return;
  }

  const newExpenseItem = {
    id: Date.now(),
    expenseType: paymentType.value,
    expenseDate: purchase.value,
    expenseLocation: date.value,
    expenseAmount: ` $${amount.value}`,
    expenseDescription: location.value
  };

  addExpense(newExpenseItem);
  document.getElementById('form').reset();
});

function addExpense(expense) {
  displayExpense(expense);
  expenseArray = getExpenseArray();
  expenseArray.push(expense);
  saveExpense(expenseArray);
}

function getExpenseArray() {
  return JSON.parse(localStorage.getItem('expenseArray')) || [];
}

function saveExpense(array) {
  localStorage.setItem('expenseArray', JSON.stringify(array));
}

function createTableCell(expense) {
  const tableData = document.createElement('td');
  tableData.textContent = expense;
  return tableData;
}

function createDeleteButton(expense) {
  const deleteButton = document.createElement('button');
  deleteButton.className = 'deleteButtons';
  deleteButton.textContent = 'X';
  deleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    deleteRow(deleteButton, expense.id);
  });
  return deleteButton;
}

function displayExpense(expense) {
  const expenseItems = document.getElementById('expenseItems');
  const newExpenseItemRow = document.createElement('tr');
  expenseItems.appendChild(newExpenseItemRow);

  const expenseTypeCell = createTableCell(expense.expenseType);
  const expenseDateCell = createTableCell(expense.expenseDate);
  const expenseLocationCell = createTableCell(expense.expenseLocation);
  const expenseAmountCell = createTableCell(expense.expenseAmount);
  const expenseDescriptionCell = createTableCell(expense.expenseDescription);
  const deleteButtonCell = createTableCell();

  newExpenseItemRow.appendChild(expenseTypeCell);
  newExpenseItemRow.appendChild(expenseDateCell);
  newExpenseItemRow.appendChild(expenseLocationCell);
  newExpenseItemRow.appendChild(expenseAmountCell);
  newExpenseItemRow.appendChild(expenseDescriptionCell);
  newExpenseItemRow.appendChild(deleteButtonCell);

  const DeleteButton = createDeleteButton(expense);
  deleteButtonCell.appendChild(DeleteButton);
}
function deleteRow(element, id) {
  element.parentElement.parentElement.remove();
  let expenseArray = getExpenseArray();
  expenseArray = expenseArray.filter((expense) => {
    return expense.id !== id;
  });
  saveExpense(expenseArray);
}

window.addEventListener('load', (e) => {
  e.preventDefault();
  expenseArray = getExpenseArray();
  expenseArray.forEach((expense) => {
    displayExpense(expense);
  });
});
