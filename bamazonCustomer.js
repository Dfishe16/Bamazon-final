// DB Connection

var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require ('colors');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Learn2Code",
  database: "bamazon_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Boom! You just connected to Bamazon!");
  stock();
});

// logic

function itemInfo() {
  inquirer.prompt([
      {
        type: "input",
        name: "product",
        message: "Enter the Item ID of the item you would like to buy "
      },
      {
        type: "input",
        name: "quantity",
        message: "How many units would you like to purchase?"
      },
    ])
    .then(function (res) {

      var item2 = res.product;
      var quantity2 = res.quantity;

      connection.query("SELECT * FROM products WHERE ?", {item_id: item2 }, function (err, response) {
        if (err) throw err;

// no id #

        if (response.length === 0 ){
          console.log(colors.red("\n\nSorry, but that ID # isn't showing up in our system"));
          console.log("----------------------------------------");
          stock();
        }

        else {


          var productRes = response[0];

          if (quantity2 <= productRes.stock_quantity) {
            console.log("\nItem in stock... processing");

            var updateInventory = "UPDATE products SET stock_quantity = " +(productRes.stock_quantity - quantity2)+ " WHERE item_id = " +item2;
            connection.query(updateInventory, function (err, data) {
              if (err) throw err;

// order went through
              
              console.log('\nCongrats! Your Purchase just went through! Your total is $' + productRes.price * quantity2);
              console.log("-------------------------------------");
              console.log(colors.green('Thank you for choosing Bamazon!'));
              console.log("-------------------------------------");
              continueBuying();
          })
        }
// if order doesn't go through

          else {
            console.log("\nWe are sorry, but we don't have enough inventory to fulfill your order at the moment.");
            console.log("------------------------------------");
            console.log("Please change your order. We're sorry...");
            console.log("------------------------------------");
            console.log("Your item was " +productRes.product_name+ " and it has " +productRes.stock_quantity+ " in stock.");
            stock();
          }
      };
    });
  });
}


function stock() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(colors.yellow("\nItem ID: " + res[i].item_id));
      console.log("Product Name: " + res[i].product_name);
      console.log("Department: " + res[i].department_name);
      console.log("Price: $" + res[i].price);
      console.log("Number in stock: " + res[i].stock_quantity);
      console.log("\n----------------------------------------");
    }
    itemInfo();
  });
}


function continueBuying(){

  inquirer.prompt([
    {
      type: "list",
      message: "Would you like to continue shopping with Bamazon!?",
      name: "confirm",
      choices: ["Yes", "No"]
    }

  ]).then(function(res) {
    if (res.confirm === "Yes") {
      console.log("----------------------------------------");
      stock();
    }
    else {
      console.log("\nBoom! Thanks for buying w/ Bamazon! We hope to see you again soon");
      connection.end();
    }
  });
}
