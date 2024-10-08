const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        required: 'Email is required',
        unique: true
    },
    password: {
        type: String,
        trim: true,
        minlength: 6,
        maxlength: 64,
        required: 'Password is required'
    },
    stripe_account_id: {
        type: String,  // Define the type as String
        default: ''    // Optionally set a default value
    },
    stripe_seller: {
        type: Object,  // Define the type as Object
        default: {}    // Optionally set a default value
    },
    stripeSession: {
        type: Object,  // Define the type as Object
        default: {}    // Optionally set a default value
    }
}, { timestamps: true });

// Middleware to hash the password before saving the user
userSchema.pre('save', async function(next) {
    let user = this;

    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(user.password, salt);

        // Replace the plain password with the hashed one
        user.password = hashedPassword;

        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare the password during login
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
