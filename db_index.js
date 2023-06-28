import { createConnection } from "mysql";

const db = createConnection({
  host: "",
  port: "",
  user: "",
  password: "",
  database: "",
});

db.connect(err=> {
  if(err){
    console.log(err.message);
    return;
  }
  console.log("Database Connected");
});