const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const {MONGO_URL, PASS_SEC, JWT_SEC} = require('../config/keys')


//REGISTER

//GET USER
router.get("/register", async (req, res) => {
res.render('register');

  // try {
  //   const user = await User.findById(req.params.id);
  //   const { password, ...others } = user._doc;
  //   res.status(200).json(others);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

let transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  auth:{
      user: 'kanadesourabh420@gmail.com',
      pass: '654321@SK'
  },
  tls:{
    rejectUnauthorized: false
  }
})


router.post("/register", async (req, res) => {
  const newUser = new User({
   
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      PASS_SEC
      // process.env.PASS_SEC
    ).toString(),
    emailToken: crypto.randomBytes(64).toString('hex'),
    isVerified: false,
  });
  // console.log(req.body.username)
  //  console.log(req.body.email)
  // console.log(req.body.password)

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);

    let mailOptions = {
      from: '"verify your email" <kanadesourabh420@gmail.com>',
      to: newUser.email,
      subject: 'demo - pls verify youe email',
      html: `<h2>${newUser.username} thanks</h2>
      <h4>pls verify your mail to continue ...</h4>
      <a href=http://${req.headers.host}/verify-email?token=${newUser.emailToken}> veify your Email</a>`
    }

    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log(error)
      }
      else{
        console.log("verifivction email is send to your gmail account")
      }
    }) 
}
  catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong credentials!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      // process.env.PASS_SEC
      PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== req.body.password &&
      res.status(401).json("Wrong credentials!");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      PASS_SEC,
      // process.env.JWT_SEC,
      {expiresIn:"3d"}
    );

    const { password, ...others } = user._doc;

    res.status(200).json({...others, accessToken});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;