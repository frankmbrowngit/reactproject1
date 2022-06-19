const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');
exports.loginUser = (req,res) => {
    const { email, password } = req.body;

    User.findOne({email}, (error,foundUser) => {
        if (error) {
            return res.mongoError(error);
        } else if (foundUser) {
            if (foundUser.hasSamePassword(password)) {
                const token = jwt.sign({
                    sub: foundUser.id,
                    username: foundUser.username,
                },config.JWT_SECRET, {expiresIn: '2h'})
                return res.json(token);
            } else {
                return res.sendApiError(
                  { title: 'Invalid Email', 
                    detail: "User with provided email doesn't exists"});
            }
        } else {
            return res.sendApiError(
          { title: 'Invalid Email', 
            detail: "User with provided email doesn't exists"});
        }
    })
}
exports.registerUser = (req,res) => {
    const { username, email, password, passwordConfirmation } = req.body;
    // Why make call to data base when you know you don't have the correct information === performance
    if (!password || !email) {
        return res.sendApiError(
        { title: 'Missing Data', 
          detail: 'Email or password is missing!'});
    }
    if (password !== passwordConfirmation) {
        return res.sendApiError(
        { title: 'Invalid password', 
          detail: 'Password is not maching confirmation password!'});
    }
    User.findOne({email}, (error,exisistingUser) => {
        if (error) {
            return res.mongoError(error);
        } else if (exisistingUser) {
            return res.sendApiError(
        { title: 'Invalid Email', 
          detail: 'User with provided email already exists!'});
        } else {
            const user = new User({username, email, password});
            user.save((error) => {
                if (error) {
                    return res.mongoError(error);
                } else {
                    return res.json({status: "Registered"});
                }
            }) 
        }
    })
}

exports.onlyAuthUser = (req,res,next) => {
    const token = req.headers.authorization;
    if (token) {
        const { decodedToken, error } = parseToken(token);
        if (error) {
            return notAuthorized(res);
        }
        User.findById(decodedToken.sub, (error,foundUser) => {
            if (error) {
                return res.mongoError(error);
            } else if (foundUser) {
                res.locals.user = foundUser;
                next();
            } else {
                return notAuthorized(res);
            } 
        })
    } else {
        notAuthorized(res);
    }
}

function parseToken(token) {
    try {
        const decodedToken = jwt.verify(token.split(' ')[1],config.JWT_SECRET) || null; // if verify returns error, return null
        return { decodedToken }
    } catch (error) {
        return {error: error.message};
    }
}


function notAuthorized(res) {
    return res
        .status(401)
        .send({errors: [{title: "Not authorized", detail: "You need to login to get access"}]});
}