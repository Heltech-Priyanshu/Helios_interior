const DB = require("../db/dbConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const { v4: uuidv4 } = require("uuid");



const register = (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email & Password required" });

    const existingUserSql = "SELECT * FROM users ";
    DB.query(existingUserSql, async (err, existing) => {
      if (existing.length > 0) {
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
      }
    });

    const checkUserSql = "SELECT * FROM users WHERE email=?";
    DB.query(checkUserSql, [email], async (err, existing) => {
      if (existing.length > 0) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword,
        role: "admin",
      };

      const insertSql = "INSERT INTO users SET ?";
      DB.query(insertSql, user, (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Error creating user",
            details: err.message,
          });
        }

        res.json({ success: true, message: "User registered successfully" });
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};

const login = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email & Password required" });

    const sql = "SELECT * FROM users WHERE email=?";
    DB.query(sql, [email], async (err, results) => {
      if (results.length === 0)
        return res
          .status(404)
          .json({ success: false, message: "User not found" });

      const user = results[0];
      console.log("User found:", user);

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res
          .status(401)
          .json({ success: false, message: "Invalid password" });

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role , name: user.name},
        process.env.JWT_SECRET ,
        { expiresIn: "1d" },
      );

      res.json({
        success: true,
        message: "Login successful",
        token,
        user: { id: user.id, name: user.name, email: user.email },
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};

const forgotPassword = async(req, res) => {
  try {
    const { email } = req.body;

    if (!email){
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
   
    let resetToken
    const sql = 'SELECT * FROM users WHERE email= ?';

    DB.query(sql, [email], async (err,result)  => {
      if(result.lenght === 0 ){
        return res
          .status(400)
          .json({success:false,message:"No email Found"})
      }
      resetToken = jwt.sign(
        { id: result[0].id },
        process.env.JWT_SECRET ,
        { expiresIn: "1d" },
      );

    }
  )

     const resetLink =
        `http://localhost:5173/reset-password/${resetToken}`;

      // Email sender
      const transporter =
        nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
          },
        });

      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Reset Password",
        html: `
          <h3>Reset Password</h3>

          <a href="${resetLink}">
            Reset Password
          </a>
        `,
      });

   


  } catch (error) {
    res.status(500).json({
      success: false, 
      message: "Internal Server Error",
      details: error.message,
    });
  }
}


module.exports = {
  register,
  login,
};
