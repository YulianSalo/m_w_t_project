let mongoose=require('mongoose');

// Connect to MongoDB Cloud server
let mongopath= 'mongodb+srv://usrnm:ufJshsUT6WwwnERi@cluster0.agrqbot.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongopath, {useNewUrlParser: true, useUnifiedTopology: true});
