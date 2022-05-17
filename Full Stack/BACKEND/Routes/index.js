const router = require('express').Router();
let Student = require("../Models/index");

//--------------------add new user ---------------------
router.route("/add").post( async (req, res) => {
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newStudent = new Student({
       name,age,gender
    });

    await newStudent.save()
        .then(()=>{
        res.status(200).send({status: "Student Added!"})
    }).catch((err)=>{
        res.status(500).send({status: "Error with getting users!", error: err.message })
    })
});

//--------------------view users ---------------------
router.route("/").get(async (req, res) => {
    await Student.find()
    .then((students)=>{
        res.json(students)
    }).catch((err)=>{
        res.status(500).send({status: "Error with getting users!", error: err.message })
    })
});

//--------------------update user ---------------------
router.route("/update/:id").put((req, res) => {
    let userId = req.params.id;
    const { name, age, gender} = req.body;
    const updateUser = { name, age, gender }

    Student.findByIdAndUpdate(userId, updateUser)
    .then(()=>{
        res.status(200).send({status: "User Updated"})
    }).catch((err)=>{
        res.status(500).send({status: "Error with update user!", error: err.message})
    });
});

//--------------------delete user ---------------------
router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Student.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status: "User Deleted!"})
    }).catch((err)=>{
        res.status(500).send({status: "Error with delete user", error: err.message})
    })
});

//--------------------delete All users ---------------------
router.route("/delete").delete(async (req, res) => {
    await Student.deleteMany()
        .then(()=>{
            res.status(200).send({status: "Users Deleted!"})
        }).catch((err)=>{
            res.status(500).send({status: "Error with delete users", error: err.message})
        })
});

//--------------------view one users ---------------------
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    await Student.findById(userId)
        .then((student) =>{
            res.json(student)
        }).catch((err)=>{
            res.status(500).send({status: "Error with get User", error: err.message})
        });
});

module.exports = router;