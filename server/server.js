const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const saltRounds = 10;

mongoose.connect(
  "mongodb+srv://Shikhar:shikhar2015@cluster0.6nqa4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST"],
    credentials: true,
  })
);

// Collection Schemas
const videoSchema = new Schema(
  {
    title: String,
    URL: String,
    format: String,
  },
  { timestamps: true }
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please check your data entry, no name specified"],
    },
    description: {
      type: String,
      required: [true, "Please add description"],
    },
    url: String,
    stars: Number,
    cost: Number,
    instructor: String,
    videos: { type: [videoSchema] },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "No email specified"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "No username specified"],
  },
  password: {
    type: String,
    required: [true, "No password specified"],
  },
  courseIDs: {
    type: [Schema.Types.ObjectId],
    ref: "course",
  },
});

const instructorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "No first name specified"],
  },
  lastName: {
    type: String,
    required: [true, "No last name specified"],
  },
  email: {
    type: String,
    required: [true, "No email specified"],
    unique: true,
  },
  // title: {
  //   type: String,
  //   required: [true, "No title specified"],
  // },
  bio: {
    type: String,
  },
});

// hash password before saving
userSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, saltRounds, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

// Collection Models
const videoModel = mongoose.model("video", videoSchema);
const Course = mongoose.model("course", courseSchema);
const User = mongoose.model("user", userSchema);
const instructorModel = mongoose.model("instructor", instructorSchema);

async function verifyGetJWT(req, res, next) {
  const token = req.headers["x-access-token"];

  if (token) {
    jwt.verify(token, "jwtsecret", async function (error, decoded) {
      if (error) {
        res.status(401).json({
          data: null,
          success: false,
          error: "You do not have a JWT token.",
        });
      } else {
        req.user = await User.findById(decoded.id);
        next();
      }
    });
  } else {
    res.status(401).json({
      data: null,
      success: false,
      error: "You do not have a JWT token.",
    });
  }
}

//Check if user is authenticated
app.get("/check", verifyGetJWT, function (req, res) {
  res.status(200).json({
    data: req.user,
    success: true,
    error: null,
  });
});

// TODO : Create a route to read all the course details for the loggedin user, and send to client
// get course details by id
app.get("/get-user-courses", verifyGetJWT, async function (req, res) {
  const courses = await User.findById(req.user._id)
    .sort({
      createdAt: -1,
    })
    .populate({ path: "courseIDs", options: { sort: { createdAt: -1 } } });
  res.status(200).json({
    data: courses,
    success: true,
    error: null,
  });
});

// Register Route
app.post("/register", async function (req, res) {
  try {
    const { username, password, email } = req.body;

    const newUser = await User.create({
      username,
      password,
      email,
      courses: [],
    });
    // sign a token
    const token = jwt.sign({ id: newUser._id }, "jwtsecret");

    res.status(200).json({
      data: { user: newUser, token },
      success: true,
      error: null,
    });
  } catch (e) {
    res.status(400).json({
      data: null,
      success: false,
      error: e.message,
    });
  }
});

// Login Route
app.post("/login", async function (req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({
      data: null,
      success: false,
      error: "User not found",
    });
  }
  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      const token = jwt.sign({ id: user._id }, "jwtsecret");
      res.status(200).json({
        data: { user, token },
        success: true,
        error: null,
      });
    } else {
      res.status(400).json({
        data: null,
        success: false,
        error: "Password incorrect",
      });
    }
  });
});

//Add a course
app.post("/add-course", verifyGetJWT, async function (req, res) {
  try {
    const userId = req.user._id;
    const course = await Course.create({
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
      stars: req.body.stars,
      cost: req.body.cost,
      instructor: req.body.instructor,
      videos: req.body.videos || [],
    });
    // add course id to user courseIDs
    const user = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $push: {
          courseIDs: course._id,
        },
      },
      {
        new: true,
        returnNewDocument: true,
      }
    );
    res.status(200).json({
      data: course,
      success: true,
      error: null,
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      success: false,
      error: e.message,
    });
  }
});

// Read all courses
app.get("/read-courses", async function (req, res) {
  const allCourses = await Course.find({});
  res.status(200).json({
    data: allCourses,
    success: true,
    error: null,
  });
});

//Deleting a specified course
app.get("/delete-course/:id", async function (req, res) {
  // delete course by id
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({
      data: course,
      success: true,
      error: null,
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      success: false,
      error: e.message,
    });
  }
});

//delete a video from a course by a user
app.post("/delete-video", verifyGetJWT, async function (req, res) {
  // delete course by id
  try {
    const courseId = req.body.courseId;
    const videoId = req.body.videoId;
    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: {
          videos: { _id: videoId },
        },
      },
      {
        new: true,
        returnNewDocument: true,
      }
    );
    res.status(200).json({
      data: course,
      success: true,
      error: null,
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      success: false,
      error: e.message,
    });
  }
});

// Update a course
app.post("/update-course", verifyGetJWT, async function (req, res) {
  // update course by id
  try {
    const courseId = req.body.courseId;
    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        stars: Number(req.body.stars || 0),
        cost: Number(req.body.cost),
        instructor: req.body.instructor,
        videos: req.body.videos,
      },
      {
        new: true,
        returnNewDocument: true,
      }
    );
    res.status(200).json({
      data: course,
      success: true,
      error: null,
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      success: false,
      error: e.message,
    });
  }
});
// add video to a course
app.post("/add-video", verifyGetJWT, async function (req, res) {
  // update course by id
  try {
    const courseId = req.body.courseId;
    const video = {
      title: req.body.title,
      URL: req.body.URL,
      format: req.body.format,
    };
    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          videos: video,
        },
      },
      {
        new: true,
        returnNewDocument: true,
      }
    );
    res.status(200).json({
      data: course,
      success: true,
      error: null,
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      success: false,
      error: e.message,
    });
  }
});

app.post("/update-video", verifyGetJWT, async function (req, res) {
  try {
    const { courseId, videoId, title, URL, format } = req.body;
    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        $set: {
          "videos.$[elem].title": title,
          "videos.$[elem].URL": URL,
          "videos.$[elem].format": format,
        },
      },
      {
        arrayFilters: [{ "elem._id": videoId }],
        new: true,
        returnNewDocument: true,
      }
    );

    res.status(200).json({
      data: course,
      success: true,
      error: null,
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      success: false,
      error: e.message,
    });
  }
});

// Instructor Routes

// Add Instructor data
app.post("/create-instructor", verifyGetJWT, async function (req, res) {
  try {
    const instructor = await instructorModel.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      // title: req.body.title,
      bio: req.body.bio,
    });

    res.status(200).json({
      data: instructor,
      success: true,
      error: null,
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      success: false,
      error: e.message,
    });
  }
});

// Read one instructor data
app.post("/read-instructor-details", verifyGetJWT, async function (req, res) {
  try {
    const instructor = await instructorModel.findOne({ email: req.body.email });
    if (instructor) {
      res.status(200).json({
        data: instructor,
        success: true,
        error: null,
      });
    } else {
      res.status(500).json({
        data: null,
        success: false,
        error: "Instructor not found",
      });
    }
  } catch (e) {
    res.status(500).json({
      data: null,
      success: false,
      error: e.message,
    });
  }
});

// Read all instructors
app.post("/read-all-instructors", verifyGetJWT, async function (req, res) {
  try {
    const instructors = await instructorModel.find({});
    res.status(200).json({
      data: instructors,
      success: true,
      error: null,
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      success: false,
      error: e.message,
    });
  }
});

// Update instructor data
app.post("/update-instructor/:id", verifyGetJWT, async function (req, res) {
  try {
    const updatedInstructor = await instructorModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        returnNewDocument: true,
      }
    );
    res.status(200).json({
      data: updatedInstructor,
      success: true,
      error: null,
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      success: false,
      error: e.message,
    });
  }
});

// Delete an Instructor
app.post("/delete-instructor/:id", verifyGetJWT, async function (req, res) {
  try {
    const deletedInstructor = await instructorModel.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json({
      data: deletedInstructor,
      success: true,
      error: null,
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      success: false,
      error: e.message,
    });
  }
});

// Delete all Instructors
app.post("/delete-all-instructors", verifyGetJWT, async function (req, res) {
  try {
    const deletedInstructors = await instructorModel.deleteMany({});
    res.status(200).json({
      data: deletedInstructors,
      success: true,
      error: null,
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      success: false,
      error: e.message,
    });
  }
});

app.listen(process.env.PORT || 3001, function () {
  console.log(`Server is up and running.`);
});
