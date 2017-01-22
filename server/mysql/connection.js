import config from '../config'

var mysql      = require('mysql')
var db = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

db.connect((error) => {
    if (error) console.log(error);
});

// export
module.exports = db;


// connection.connect();

// connection.query('SELECT * from de_user_emails_phones', function (error, results, fields) {
//   if (error) throw error;
//   for (var key in results) {
//   console.log(key, results[key]);
// }
// });

// connection.end();