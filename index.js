const express = require('express');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const User = require('./models/models.js');
const nav = require('./navigation/nav')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('./routes/authRoutes.js')
const connectDB = require('./database/database.js')
const authMiddleware = require('./middleware/middleware.js')
const Auth = require('./middleware/auth.js')
const cors = require('cors');
require('dotenv').config();
const navrouter = require('./navigation/nav.js');

const PORT = 5001;
console.log("!");
JWT_SECRET="1234"
// connectDB();
mongoose.connect("mongodb+srv://montu5551suthar:ngzFsy83UPOZ1rTN@doconverter1.cqnwftp.mongodb.net/")
  .then((conn) => {
    console.log(`MongoDB connected`);
  })
  .catch((err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit process with failure
  });


const app = express();

app.use(express.json());



app.use(cors());
// app.use('/v1/about',authMiddleware);
// app.use('/v1/service',authMiddleware);
// app.use('/v1/home',authMiddleware);
// app.use('/v1/contact',authMiddleware);
// ,{
//   origin: 'http://localhost:5173', // React dev server
//   credentials: true
// }
app.use('/v1',navrouter);
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//  console.log("1");
//   try {
//     const user = await User.findOne({ email });
//      console.log(user);
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
//     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
//     console.log(token);

//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;
// console.log(name, email, password);

//   try {
//     console.log("1");
//     const userExist = await User.findOne({ email });
//     console.log(userExist);
//     if (userExist) return res.status(400).json({ message: 'User already exists' });
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await User.create({ name, email, password: hashedPassword });        
//     toast.success('User successfully registered');
//     res.status(201).json({ message: 'User successfully registered' });
//   } catch (err) {
//     toast.error(err.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

//testing
app.get('/getAll', async (req, res) => {
  try {
    const user = await User.find();
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({user});
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/delete', async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findByIdAndDelete({id});
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({message:"deleted successfully"});
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.delete('/put', async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findOne({id});
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({user});
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.delete('/patch', async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findOneAndReplace({id},{ email: "Ritik G",});
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({user});
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});




app.listen(PORT, () => {
    console.log('Server is running on http://localhost:5001');
});
