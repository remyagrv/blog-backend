const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user:useradmin@ict.avsgk.mongodb.net/Blogapp?retryWrites=true&w=majority');
const Schema = mongoose.Schema;


var registrationSchema = new Schema({
    
    username:String,
    email:String,
    password:String
});
var RegistrationInfo = mongoose.model('registrations',registrationSchema);

module.exports = RegistrationInfo;