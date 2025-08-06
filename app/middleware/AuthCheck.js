const bcrypt=require('bcryptjs');
const Jwt=require('jsonwebtoken');

const hashPassword= async (password)=>{
    const salt=await bcrypt.genSalt(10);
    const hashPassword= await bcrypt.hash(password,salt);
    return hashPassword;
}

const generateToken= async(user)=>{
    const token=await Jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
    );
    return token;
}
const comparePassword=async(password,hashedPaswword)=>{
return await bcrypt.compare(password,hashedPaswword)
}

module.exports={hashPassword, generateToken, comparePassword};