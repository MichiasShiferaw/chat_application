const router = require("express").Router();
const User= require("../models/User");
const bcrypt= require("bcrypt");

//Register


router.post("/register",async(req, res) => {
    try{
        //generate newpassword
        const salt = await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        //save user and responsed
        const user=await newUser.save();
        res.status(200).json(user);
    } catch(err){
        res.status(500).json(err)
    }

});

module.exports = router;

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("wrong password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});




//   const user = await new User({
//     username: "michias",
//     email: "john@gmail.com",
//     password: 1234566,
//   });

//   await user.save();
//   res.send("ok");