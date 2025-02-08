const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const APIhandler = require('../API/handler');
const Authandler = require('../AUTH/auth');
const dotenv = require('dotenv')
dotenv.configDotenv()

const router = express();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// Configure Multer with Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'car_dealership', // Folder name in Cloudinary
    format: async (req, file) => 'webp', // Convert images to WebP
    public_id: (req, file) => Date.now() + '-' + file.originalname,
    transformation: [
      { width: 800, height: 600, crop: 'limit', quality: 'auto', fetch_format: 'webp' }  // Resize before upload
    ]    
  },
});

const upload = multer({ storage: storage });

// Middleware to extract Cloudinary URLs and store them in req.images
const extractImageUrls = (req, res, next) => {
  if (req.files) {
    console.log(req.files)
    req.images = [];
    Object.keys(req.files).forEach((key) => {
      req.images.push(req.files[key][0].path); // Push each image URL into the images array
    });
    console.log(req.images)
  }
  next();
};

// Routes
router.get('/home', Authandler.verify, (req, res) => {
  res.render('admin/home', { user: req.user });
});
router.get('/vehicles', Authandler.verify, APIhandler.displayAdminCars);
router.get('/vehicle/:id', Authandler.verify, APIhandler.displayAdminCar);
router.get('/queries', Authandler.verify, APIhandler.displayEnquieries);
router.get('/query/:id', Authandler.verify, APIhandler.displayQuery);
router.get('/new', Authandler.verify, (req, res) => {
  res.render('admin/new');
});
router.get('/sold/:id', Authandler.verify, APIhandler.sold);
router.get('/dashboard', Authandler.verify, APIhandler.dashboard);

// Upload images to Cloudinary and save car entry
router.post('/add', Authandler.verify, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
    { name: 'image5', maxCount: 1 },
  ]), extractImageUrls, APIhandler.newCar);

// Edit car details and upload new images if necessary
router.post('/edit/:id', upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
    { name: 'image5', maxCount: 1 },
  ]), extractImageUrls, APIhandler.editCar
);

router.get('/display/edit/:id', Authandler.verify, APIhandler.displayAdminCarForEdit);
router.delete('/delete/:id', Authandler.verify, APIhandler.deleteCar);
router.delete('/queryd/:id', Authandler.verify, APIhandler.deleteQuery);

module.exports = router;


