//API for adding doctor

const validator = require("validator");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const doctorModel = require("../models/doctorsModel");
const jwt = require("jsonwebtoken");

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !imageFile
    ) {
      res.json({ status: "failed", message: "Missing Details" });
    }

    //   VALIDATING EMAIL
    if (validator.isEmail(email)) {
      res.json({ status: "failed", message: "Please enter valid email" });
    }

    // VALIDATING STRONG PASSWORD
    if (password.length < 8) {
      res.json({ status: "failed", message: "Please enter strong password" });
    }

    // hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const uploadImage = await cloudinary.uploader.upload(imageFile, {
      resource_type: "image",
    });
    const uploadImageUrl = uploadImage.secure_url;

    const doctorData = {
      name,
      email,
      image: uploadImageUrl,
      hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const doctor = new doctorModel(doctorData);
    await doctor.save();
    res.json({ success: true, message: "Doctor Added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports = { addDoctor, adminLogin };
