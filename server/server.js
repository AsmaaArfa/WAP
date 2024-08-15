//let mongo = require('mongoose');
const mongoose = require('mongoose'); // Correct
const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");
const { type } = require('os');
const { signup, login, Experience, Technology, Member } = require('./models'); // Import the models
//const User = require('./models/UserModel.jsx');


//const MongoClient = require('mongodb').MongoClient;
let newLogin = {}
let username = ''
var url = 'mongodb://localhost:27017/portfolio';

app.use(express.json()); // Middleware to parse JSON data
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client/build'))) //include imgs
app.use(cors());

app.listen(8080, (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log('Im listoning on 8080')
    }
})

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

app.get('/api/home', async(req, res) =>{
    try{
        // console.log("Home", username)
        const nameFound = await Member.find({username : username});
        // console.log("Home node name", nameFound[0].name)
        return res.status(201).json({name:nameFound[0].name});
    }catch(err){
        return res.status(400).json({message: err.message});
    }
})

app.get('/signup', (req, res) =>{
    res.sendFile(path.join(__dirname, "./html/signup.html"));
})

app.post('/signup', async (req, res)=>{
    try{
        const newSignup = new Member(req.body);
        // console.log('username ', newSignup)
       const nameFound = await  Member.find({username : newSignup.username});
        // console.log('nameFound ', nameFound)
        if (nameFound.length != 0){
            return res.status(404).json({message: 'user_name is alaredy taken!'});
        }
        const savedSignup = await newSignup.save();
        username = newSignup.username;
        return res.status(201).json({username: username});
    //    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    }catch(err){
        return res.status(400).json({message: err.message});
    }
})

app.get('/login', (req, res) =>{
    res.sendFile(path.join(__dirname, "./html/login.html"));
})

app.post('/login', async (req, res) =>{
    try{
        newLogin = req.body;
        res.redirect(`/api/login?name=${encodeURIComponent(newLogin.name)}&password=${encodeURIComponent(newLogin.password)}`);
    }catch(err){
        res.status(400).json({message: err.message})
    }
})


app.get('/api/login', async (req, res) =>{
    try{
        console.log('Asma in get login')
        let obj = req.query
        // console.log('name', obj.name, 'password', obj.password)
        const memberFound = await  Member.find({username : obj.name}, {password : obj.password}); //db.items.find({}, { name: 1, price: 1, _id: 0 })
        // const passFound = await  Member.find({password : obj.password});
        //console.log('nameFound', nameFound, 'passFound' ,passFound)
        
        if (memberFound.length === 0 ){
            return res.status(404).json({message: 'member not found'});
        }
        //const savedLogin = await newLogin.save();
        username = obj.name;
        //  console.log('username in login' , username)
        return res.status(201).json({username: username})
        // res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    }catch(err){
        return res.status(500).json({message : err.message});
    }
})

app.post('/experience', async (req, res)=>{
    try{
        // console.log("asmaa in post experience")
        const newExperience = new Experience(req.body);
        // const newExperience = req.body;
        newExperience.username = username;
        newExperience.experience_id = Math.random();
        // console.log("asmaa in post experience - newExperience", newExperience)
        const savedExperience = await newExperience.save();
        
        const result = await Experience.find({username : username});
        // console.log ('result from experience api',result)
        return res.status(201).json(result);
    }catch(err){
        return res.status(400).json({message: err.message});
    }
})

app.get('/experience', async (req, res)=>{
    try{
        // console.log("asmaa in get experience", username)
       
        const result = await Experience.find({username : username});
        // console.log ('result from get',result)
        return res.status(201).json({result: result});
    }catch(err){
        return res.status(400).json({message: err.message});
    }
})

app.get('/api/tech', async (req, res)=>{
    try{
        // console.log("asmaa in get technology", username)
       
        const result = await Technology.find({username : username});
        // console.log ('result from get',result)
        return res.status(201).json({result: result});
    }catch(err){
        return res.status(400).json({message: err.message});
    }
})

app.post('/api/tech', async (req, res) =>{
    try{
        const newTech = new Technology(req.body);
        newTech.username = username;
        const savedTech = await newTech.save();
        // console.log ('result from post technology ',newTech)

        const result = await Technology.find({username : username});
        // console.log ('result from tech api',result)
        return res.status(201).json({result: result});
    }catch(err){
        return res.status(400).json({message: err.message})
    }
})
// DELETE API
app.delete('/api/experience/:id/:username', async (req, res) => {
    try {
        const item = await Experience.findOneAndDelete({ experience_id: req.params.id, username: req.params.username });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// res.json({ message: 'Hello from Express to react!', item: item });

//Routes

//about me
const aboutMeRouter = require('./routes/aboutmeRouter.jsx');
app.use('/aboutmeRouter', aboutMeRouter);

//contact me
const contactMeRouter = require('./routes/contactmeRouter.jsx');
app.use('/contactRouter', contactMeRouter);


//projects 
const projectsRouter = require('./routes/projectsRouter.jsx');
app.use('/projRouter', projectsRouter);

// module.exports = {username};



