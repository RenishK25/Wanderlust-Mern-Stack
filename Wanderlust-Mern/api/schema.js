const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    // list : Joi.object({
        // username : Joi.string().alphanum().min(3).max(30).required(),
        title : Joi.string().required(),
        description : Joi.string().required(),
        image : Joi.allow("", null),
        location : Joi.string().required(),
        country : Joi.string().required(),
        price : Joi.number().required().min(0),
        country : Joi.string().allow("", null),
    // }).required()
});

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.string().required(),
        comment : Joi.string().required(),
    }).required()
});

module.exports.userLogin = Joi.object({
        username : Joi.string().required(),
        password : Joi.string().required(),
});

module.exports.userRegister = Joi.object({
    email : Joi.string().required(),
    username : Joi.string().required(),
    password : Joi.string().required(),
});