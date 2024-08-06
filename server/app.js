const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET);
app.use(express.static('public'));
app.use(cors())
app.use(express.json());

const SECRET = process.env.SECRET;
const DB_URL = process.env.DB_URL;

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  lvlOfDiff: String,
  date: String,
  price: Number,
  imageLink: String,
  published: Boolean
});
const portfolioSchema = new mongoose.Schema({
  greet: String,
  name: String,
  role: String,
  profileImageLink: String,
  //icons image link 
  icon1: String,
  icon2: String,
  icon3: String,
  icon4: String,
  //profile links
  icon1Link: String,
  icon2Link: String,
  icon3Link: String,
  icon4Link: String,
  //about me
  aboutText: String,
  aboutCvLink: String,
  aboutImageLink: String,
});

// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);
const Portfolio = mongoose.model('Portfolio', portfolioSchema);

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
mongoose.connect(`${DB_URL}/courses`, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });

app.put('/portfolio/:id', async (req, res) => {
  const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (portfolio) {
    res.json({ message: 'portfolio updated successfully' });
  } else {
    res.status(404).json({ message: 'Portfolio not found' });
  }
});

app.post('/authenticate', authenticateJwt, (req, res) => {
  res.json(true);
});

app.post('/admin/signup', (req, res) => {
  const { username, password } = req.body;
  function callback(admin) {
    if (admin) {
      res.status(403).json({ message: 'Admin already exists' });
    } else {
      const obj = { username: username, password: password };
      const newAdmin = new Admin(obj);
      newAdmin.save();
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Admin created successfully', token });
    }
  }
  Admin.findOne({ username }).then(callback);
});

app.post('/admin/login', async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.post('/admin/courses', authenticateJwt, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: 'Course created successfully', courseId: course.id });
});

app.put('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
  if (course) {
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/admin/courses', async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

app.get('/admin/course/:title', async (req, res) => {
  const courseTitle = req.params.title;
  const courses = await Course.findOne({ title: courseTitle });
  if (courses) {
    res.json({ courses });
  }
  else {
    return res.status(404).json({ message: 'Course not found' });
  }
});


// User routes
app.post('/users/signup', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
  }
});

app.post('/users/login', async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.get('/users/courses', async (req, res) => {
  const courses = await Course.find({ published: true });
  res.json({ courses });
});

app.post('/users/courses/:courseId', authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  console.log(course);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/users/purchasedCourses', authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: 'User not found' });
  }
});

app.post('/create-checkout-session', authenticateJwt, async (req, res) => {
  const { products } = req.body;
  console.log(products)
  try {
    const lineItems = products.map(product => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.title,
          images: [product.imageLink],
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_DOMAIN}/cancel`,
    });
    console.log(session)
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('course Server running on port 3000'));
