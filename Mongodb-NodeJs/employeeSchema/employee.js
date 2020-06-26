let mongoose = require("mongoose");


let employeeSchema = mongoose.Schema(
    {
        name: {type: String},
        age:{type: Number},
        department: {type: String},
        salary:{type: Number}    
    }
);

let Employee = mongoose.model("employees", employeeSchema);

module.exports = Employee;