const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user:useradmin@ict.avsgk.mongodb.net/Blogapp?retryWrites=true&w=majority');
const Schema = mongoose.Schema;


var articleSchema = new Schema({
    name:String,
    username:String,
    upvotes: Number,
    comments:Array
});
var ArticleInfo = mongoose.model('articles',articleSchema);

module.exports = ArticleInfo;