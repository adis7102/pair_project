var bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("12345", salt);

bcrypt.compareSync("12345", hash); // true

console.log(bcrypt.compareSync("1234", hash))