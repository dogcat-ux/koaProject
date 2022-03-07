const {APP_PORT,MYSQL_HOST} = require("./config/config.default")
const app = require("./app/index")
app.listen(APP_PORT, () => {
  console.log("APP_PORT",APP_PORT);
})
