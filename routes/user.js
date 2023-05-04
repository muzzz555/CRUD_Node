const router = require('express').Router()
const { ping, findAllUsers, createUser, findById, updateUser, deleteUser } = require('../controllers/userController')

router.get("/ping", ping);

router.get("/users", findAllUsers)

router.post("/users", createUser) 

router.get("/users/:id", findById) 

router.put("/users/:id", updateUser)

router.delete("/users/:id", deleteUser)

module.exports = router