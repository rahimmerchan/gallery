import { createConnection } from "mysql";

const db = createConnection({
  host: "database-1.c2dp1ljsjrom.us-east-1.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  password: "ThisIsGallery",
  database: "Gallery_db",
});

db.connect(err=> {
  if(err){
    console.log(err.message);
    return;
  }
  console.log("Database Connected");
});