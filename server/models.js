const mongoose = require('mongoose'); // Correct
const MongoClient = require('mongodb').MongoClient;

/////// SIGNUP /////////
const signupInfo = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    username: {
        type: String,
        require: true
    }
});

const signup = mongoose.model('signup', signupInfo)

//////// LOGIN ////////
const loginInfo = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});



const login = mongoose.model('login', loginInfo)

/////// EXPERIENCE //////////
const experienceInfo = new mongoose.Schema({
    skill:{
        type: String,
        required: true
    },
    experience_id: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    }
})

const Experience = mongoose.model('Experience', experienceInfo)



/////// Technologies //////////
const techInfo = new mongoose.Schema({
    tech:{
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    experience_id: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    }
})

const Technology = mongoose.model('Technology', techInfo)

const memberInfo = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    linkedin:{
       type: String,
       required: false 
    }, 
    github:{
        type: String,
        required: false
    }
})

const Member = mongoose.model('Member', memberInfo)

module.exports = { signup, login, Experience, Technology, Member };