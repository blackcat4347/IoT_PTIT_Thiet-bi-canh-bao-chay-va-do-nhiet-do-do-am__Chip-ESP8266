const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema({
    username: String,
    password: String
});

const Account = mongoose.model("Account", accountSchema, "account");
module.exports = Account;