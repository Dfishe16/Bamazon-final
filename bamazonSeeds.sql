DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL (10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("PS4", "Electronics", 300, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Electronics", 325, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bed Set", "Home Goods", 45, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Call of Duty", "Games", 60, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Grand Theft Auto 6", "Games", 80, 69);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Detergent", "Home Goods", 7, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Forks", "Home Goods", 60, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dumb & dumber", "Movies", 25, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone X", "Electronics", 1000, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Scary Movie Collection", "Movies", 29.99, 10);

SELECT*FROM products;