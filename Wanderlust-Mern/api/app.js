if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}


const express = require('express');
const mongoose = require("mongoose");
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync.js');
const path = require('path');
const cors = require("cors");

const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError.js');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const List = require('./models/listing');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require("./models/user");

const listRoute = require("./routes/list.js");
const reviewRoute = require("./routes/review.js");
const userRoute = require("./routes/user.js");
const { verifyJWT } = require("./middleware.js");

const app = express();
app.use(cookieParser());
app.engine('ejs', ejsMate);
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true
  }))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// app.use(express.static(path.join(__dirname + "public/js")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));
app.use('/uploads' ,express.static("uploads"))
app.use(express.urlencoded({ extended : true }));

main().then( () => console.log("DB Connection SuccessFull")).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
};

app.use((req, res, next) => {

    // req.flash("success", "this is first flash message");
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.user = req.user;

    console.log("--------STARTING HANDLER -------"); 
    next();
});
// <===================== Start Server ===========================>

app.listen(8000, () =>{
    console.log("Server Start");
});

// <===================== Middleware ===========================>

app.get("/api",(req, res) => {
    console.log("api data");
    // res.send("api data");
    // abcd = abcd; 
    throw new ExpressError(401, "ExpressError New Error");
});


// <===================== Start Route ===========================>

// app.get('/', wrapAsync(async (req, res) => {
//     let lists = await List.find();
//     res.render("listings/index.ejs",{ lists });
//     })
// );

app.get('/', wrapAsync(async (req, res) => {
    let lists = await List.find();
    return res.json(lists);
    // return lists;
    })
);

app.use("/list", listRoute);

app.use("/list/:id/review", reviewRoute);

app.use("/", userRoute);



// <=======================================================================================================>


app.use((err, req, res, next) => {
    console.log("--------ERROR HANDLER -------"); 
    let {status = 500, message = "Server Error"} = err;
    // console.log(message);
    return res.json({error : message });
});