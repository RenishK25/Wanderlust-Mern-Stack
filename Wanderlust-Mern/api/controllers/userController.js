const User = require("../models/user.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        // const accessToken = "fdehgfwhdjkwkdwbdwvhdwjh"
        // const refreshToken = "bdwjbbjbdxbeckejcjelcjeljcejd"

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ExpressError(500, ` ${error} Something went wrong while generating referesh and access token`, {})
    }
}

module.exports.refreshAccessToken = wrapAsync(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ExpressError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ExpressError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ExpressError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json({status : "success", success : "Access token refreshed", accessToken, refreshToken: newRefreshToken});

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

module.exports.loginForm = (req, res) => {
    res.render("./users/login.ejs");
}; 

module.exports.login = async (req, res) => {
    // req.flash("success", "Welcome to Wanderlust");
    // let redirectUrl = res.locals.redirectUrl || "/";
    // res.redirect(redirectUrl);
    // return res.json({status : "success", success : "Login Successfull", user : req.user});

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(req.user._id)

    const loggedInUser = await User.findById(req.user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({status : "success", success : "Login Successfull", user : loggedInUser, accessToken, refreshToken});
    // .json(
    //     // new ExpressError(
    //     //     200, 
    //     //     "User logged In Successfully",
    //     //     {
    //     //         user: loggedInUser, accessToken, refreshToken
    //     //     }
    //     // )
    // )

};

module.exports.signupForm = (req, res) => {    
    res.render("./users/signup.ejs");
}

module.exports.signup = async(req, res) => {    
    try{
        let {email, username, password} = req.body;
        const newUser = new User({email, username});

        let userNew = await User.register(newUser, password);
        console.log(userNew);
        req.login(userNew, (err) => {
            if(err){
                next(err);
            }
            req.flash("success", "Welcome to Wanderlust");
            res.redirect("/");
        });

    }catch(error){
        req.flash("error", error.message);
        res.redirect("/signup");
    }   
}

module.exports.logout = async (req, res) => {
    // req.logOut((err) =>{
    //     if(err){
    //         next(err);
    //     }
    // //     return res.json({status : "success", success : "Logout Successfull"});
    // });

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(200, "User logged Out", {})
};