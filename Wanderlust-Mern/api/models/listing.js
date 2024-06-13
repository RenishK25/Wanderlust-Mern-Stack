const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const listingSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : String,
    image : {
        url : String,
        filename : String,
        publicId : String,
    },
    price : Number,
    location : String,
    country : String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        },
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    }
});


listingSchema.post("findOneAndDelete", async (list) => {
    if(list){
        console.log(list);
       await Review.deleteMany({_id : {$in : list.reviews}})
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;