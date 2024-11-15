import UserCollection from "../db/models/User.js";

export const register = async payload =>{
    return UserCollection.create(payload);
};
