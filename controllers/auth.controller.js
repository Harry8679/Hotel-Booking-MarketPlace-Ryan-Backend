const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');

const home = (req, res) => {
    res.send('Test 5');
}

const register = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    // Validation
    if (!name) return res.status(400).send('Name is required');
    if (!password || password.length < 6) return res.status(400).send('Password is required and should be at least 6 characters long');
    
    // Vérifier si l'utilisateur existe déjà
    let userExists = await User.findOne({ email }).exec();
    if (userExists) return res.status(400).send('Email is taken');

    // Créer un nouvel utilisateur
    const user = new User({ name, email, password });

    // Sauvegarder l'utilisateur en base de données
    await user.save();

    // Réponse au client
    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            name: user.name,
            email: user.email
            // Note: Ne pas retourner le mot de passe
        }
    });
});

module.exports = { register, home };