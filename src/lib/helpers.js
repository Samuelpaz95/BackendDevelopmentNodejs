const { getSalt, hash, compare, genSalt } = require("bcryptjs");

const helpers = {};

helpers.encryptPassword = async (passwrd) => {
    const salt = await genSalt(10);
    const hashPassword = await hash(passwrd, salt);
    return hashPassword;
}

helpers.matchPassword = async (passwrd, savedPasswrd) => {
    return await compare(passwrd, savedPasswrd);
}

module.exports = helpers;