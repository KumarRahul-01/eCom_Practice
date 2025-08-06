const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../middleware/AuthCheck");

const User = require("../model/user");
class userController {
  async createUser(req, res) {
    try {
      const { name, email, role, password } = req.body;
      if (!name || !email || !role || !password) {
        return res
          .status(400)
          .json({ status: "false", message: "Please fill all the fields" });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ status: "false", message: "User already exists" });
      }

      // Hash the password before saving
      const hashPass = await hashPassword(password);
      const newUser = new User({ name, email, role, password: hashPass });
      await newUser.save();
      //   console.log(newUser);

      res.status(201).json({
        status: "true",
        message: "User created successfully",
        user: newUser,
      });
    } catch (error) {
      console.error("Error while creating user:", error); // ADD THIS
      res
        .status(500)
        .json({ status: "false", message: "Internal Server Error" });
    }
  }

  async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ status: "false", message: "Please fill all the fields" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ status: "false", message: "User not found" });
      }
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ status: "false", message: "Invalid credentials" });
      }
      const token = await generateToken(user);
      res
        .status(200)
        .json({
          status: "true",
          message: "Login successful",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
    } catch (error) {
      console.error("Error during user login:", error); // ADD THIS
      res
        .status(500)
        .json({ status: "false", message: "Internal Server Error" });
    }
  }
}

module.exports = new userController();
