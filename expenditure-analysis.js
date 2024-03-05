function calculateTotalSpentByCategory(transactions) {
  
    let payments = {}                                                   // Making a new object with prices according to category
  
  
    // Iterating through the transactions array 
    transactions.forEach(transactions => {
      // checking if the transaction category already exists in the new payments object
      if(!payments[transactions.category]){
        payments[transactions.category] = transactions.price;
      }
      // Calculating the price value from transaction array object and setting the value to the new payments object
      else{
        payments[transactions.category] += transactions.price;
      }
    }
  );
    
    
    // Returning the payments object
    return payments;
  }
  
  
  // Creating dummy transactions
  let transactions = [
    {itemName: "Shawarma", category:'Food', price: 120, timestamp: Date.now()},
    {itemName: "Tshirt", category:'Shopping', price: 400, timestamp: Date.now()},
    {itemName: "Roll", category:'Food', price: 180, timestamp: Date.now()},
    {itemName: "Anarkali Dress", category:'Shopping', price: 1000, timestamp: Date.now()},
    {itemName: "Dupatta", category:'Shopping', price: 500, timestamp: Date.now()},
    {itemName: "Lipstick", category:'Makeup', price: 800, timestamp: Date.now()}
  ]
  
  
  // Since we use return we need to store the result in a new variable called result and then log it into the terminal
  let result =  calculateTotalSpentByCategory(transactions)
  console.log(result)