let mongoose=require('mongoose');

// Connect to MongoDB local server
//let mongopath= 'mongodb://127.0.0.1:27017/ecommercedb'

// Connect to MongoDB Cloud server
let mongopath= 'mongodb+srv://usrnm:ufJshsUT6WwwnERi@cluster0.agrqbot.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
