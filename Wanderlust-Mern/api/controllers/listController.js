const List = require('../models/listing');

module.exports.add = (req, res) => {
    // console.log(res.locals.redirectUrl);
    res.render("listings/create.ejs");
}

module.exports.create = (req, res) => {
    let list = new List(req.body);
    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        list.image = {url, filename};
    }
    // console.log(req.body);
    // console.log(req.file);
    // list.owner = req.user._id;
    list.owner = "65ee5fad244fc637e95ccee1";
    list.save();
    // console.log(list);
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
    let { id } = req.params;
    let list = await List.findById(id);
    if(!list){
        req.flash("error", "List You Requested Is Not Exist!");
        res.redirect("/");
    }
    res.render("listings/edit.ejs",{ list });
}

module.exports.update = async (req, res) => {
    let { id } = req.params;
    delete req.body.image;
    let list = await List.findByIdAndUpdate(id, req.body, {new : true});

    if(typeof req.file != "undefined"){
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        let url = baseUrl +"/"+ req.file.path;
        let filename = req.file.filename;
        list.image = {url, filename};
        await list.save();
    }
    return res.json({success : "Data Upadet Successfull", list});
}

module.exports.destroy = async (req, res) => {
    let { id } = req.params;
    let list = await List.findById(id);
    if(!list.owner.equals(res.locals.user._id)){
        req.flash("error", "You don't have permission to Delete list");
        return res.redirect("/list/"+id);    
    }
    await List.findByIdAndDelete(id);
    req.flash("success", "List Delete Successful");
    res.redirect("/");

}