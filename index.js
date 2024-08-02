#!/usr/bin/env node
import inquirer from "inquirer";
// bank account class
class Bankaccount {
    accountnumber;
    balance;
    constructor(accountnumber, balance) {
        this.accountnumber = accountnumber;
        this.balance = balance;
    }
    // debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`withdrawal of ${amount} successfull. remaining balance: ${this.balance}`);
        }
        else {
            console.log("Insufficient balance.");
        }
    }
    // credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(`deposit of ${amount} successfull. remaining balance: ${this.balance}`);
    }
    // check balance
    checkbalance() {
        console.log(`current balance ${this.balance}`);
    }
}
//  customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobilenumber;
    account;
    constructor(firstName, lastName, gender, age, mobilenumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobilenumber = mobilenumber;
        this.account = account;
    }
}
// create bank accounts
const accounts = [
    new Bankaccount(1001, 500),
    new Bankaccount(1002, 1000),
    new Bankaccount(1003, 2000),
];
// create customers
const customers = [
    new Customer("nida", "noman", "female", 23, 3476543218, accounts[0]),
    new Customer("noor", "noman", "female", 19, 5678906437, accounts[1]),
    new Customer("omer", "noman", "male", 18, 456789095, accounts[2]),
];
//  function to interact with bank account
async function service() {
    do {
        const accountnumberinput = await inquirer.prompt({
            name: "accountnumber",
            type: "number",
            message: "Enter your account number:",
        });
        const customer = customers.find((customer) => customer.account.accountnumber === accountnumberinput.accountnumber);
        if (customer) {
            console.log(`welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt({
                name: "select",
                type: "list",
                message: "select an operation",
                choices: ["deposit", "withdraw", "checkbalance", "exit"],
            });
            switch (ans.select) {
                case "deposit":
                    const depositamount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:",
                    });
                    customer.account.deposit(depositamount.amount);
                    break;
                case "withdraw":
                    const withdrawamount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:",
                    });
                    customer.account.withdraw(withdrawamount.amount);
                    break;
                case "checkbalance":
                    customer.account.checkbalance();
                    break;
                case "exit":
                    console.log("Exiting bank program");
                    console.log("\n Thank you for using our bank services. Have a great day!");
                    return;
            }
        }
        else {
            console.log("Invalid account number. please Try again");
        }
    } while (true);
}
service();
