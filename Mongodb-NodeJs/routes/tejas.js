let express = require("express");
let router = express.Router();
let Joi = require("@hapi/joi");
let Employee = require("../employeeSchema/employee");


//all employee list
router.get("/employees", async (req, res) => {
    let employees = await Employee.find();
    res.send({e: employees});
  });

//get employee by id
router.get("/employees/:id", async (req, res) => {
    let employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).send({ message: "Invalid employee id" });
    }
    res.send(employee);
  });


  //create employee data

router.post("/employees/create", async (req, res) => {
    let data = new Employee({
      name: req.body.name,
      age: req.body.age,
      department: req.body.department,
      salary: req.body.salary
      
    });
  
    let result = ValidationError(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
    await data.save();
    res.send({ message: "New Employee Added ,Thanks !" });
  });


  //update employee data
router.put("/employees/employee/:id", async (req, res) => {
    let result = ValidationError(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
  
    let employee = await Employee.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          age: req.body.age,
          department: req.body.department,
          salary: req.body.salary
         
          
        },
      },
      {
        new: true,
      }
    );
    if (!employee) {
      return res.status(404).send({ message: "Invalid employee id" });
    }
  
    res.send({ message: "updated employee", data: employee });
  });


  //REMOVE Employee

router.delete("/employees/removeemployee/:id", async (req, res) => {
    //step1:
    let employee= await Employee.findByIdAndRemove({ _id: req.params.id });
    if (!employee) {
      return res.status(404).send({ message: "Invalid employee id" });
    }
    res.send({ message: "Thank you come back again :(" });
  });

  
  function ValidationError(error) {
    let schema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().required(),
      department: Joi.string().required(),
      salary: Joi.number().required()
    });
    return schema.validate(error);
  }
  
  module.exports = router;
  
  
  