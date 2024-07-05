const { uploadOnCloudinary, deleteImageFromCloudinary } = require('../cloudConfing');
const List = require('../models/listing');

module.exports.add = (req, res) => {
    res.render("listings/create.ejs");
}

module.exports.create = async (req, res) => {
    let list = new List(req.body);
    if (req.file) {

        const image = await uploadOnCloudinary(req.file.path)
        list.image = {url : image.url, filename : image.original_filename, publicId : image.public_id};
    }
    // list.owner = "65ee5fad244fc637e95ccee1";
    list.owner = req.user._id;
    list.save();
    return res.json({success : "Data Stored Successfull"});
} 

module.exports.show = async(req, res) => {
    let { id } = req.params;
    let list = await List.findById(id).populate({ path : "reviews", populate : {path : "author"}}).populate("owner");
    
    if(!list){
        req.flash("error", "List You Requested Is Not Exist!");
        res.redirect("/");
    }   
    return res.json({success : "Data Get Successfull", list});
};

module.exports.edit = async (req, res) => {
    console.log("edit call");
    let { id } = req.params;
    let list = await List.findById(id);
    if(!list){
        req.flash("error", "List You Requested Is Not Exist!");
        res.redirect("/");
    }
    return res.json({success : "Data Get Successfull", list});
}

module.exports.update = async (req, res) => {
    let { id } = req.params;
    delete req.body.image;
    let list = await List.findByIdAndUpdate(id, req.body, {new : true});

    if(typeof req.file != "undefined"){
        const delete_image = await deleteImageFromCloudinary(list.image.publicId);
        console.log(delete_image);

        const image = await uploadOnCloudinary(req.file.path)
        list.image = {url : image.url, filename : image.original_filename, publicId : image.public_id};
        await list.save();
    }
    return res.json({success : "Data Upadet Successfull", list});
}

module.exports.destroy = async (req, res) => {
    let { id } = req.params;
    let list = await List.findById(id);
    // console.log(res.locals.user);
    // console.log(req.user);
    if(!list.owner.equals(req.user._id)){
        return res.json({error : "You don't have permission to Delete list"});
    }
    if(list.image.publicId){
        await deleteImageFromCloudinary(list.image.publicId);
    }

    await List.findByIdAndDelete(id);
    return res.json({success : "List Delete Successful"});
}