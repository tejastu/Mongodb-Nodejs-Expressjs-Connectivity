let express = require("express");
let port= process.env.PORT || 2400;
let mongoose= require("mongoose");
let tejas= require("./routes/tejas");
let app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/records",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
 .then(() => console.log("Connected to db"))
 .catch((error) => console.log(`Something went Wrong ${error.message}`));


 app.use("/api", tejas);

 app.listen(port, ()=> console.log(`port working on ${port}`));
