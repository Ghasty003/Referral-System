import { Schema, model } from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_ref_code: {
        type: String,
        unique: true
    },
    ref_code: {
        type: String
    }
})

userSchema.pre("save", async function (next) {
    // if (!this.isModified("password")) {
    //     return next();
    // }

    try {
        
        if (!this.user_ref_code) {
            this.user_ref_code = crypto.randomBytes(3).toString("hex");
        }

        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        throw new Error((<Error>error).message);
    }
})

userSchema.statics.signup = async function({
    email, password, username, ref_code
}) {

    try {

        if (!email || !username || !password) {
            throw new Error("All credentials are required");
        }

        const userExists = await this.findOne({ email, username });

        if (userExists) {
            throw new Error("User already exist");
        }

        const user = await this.create({ email, password, username, ref_code });

        return user;

    } catch (error) {
        throw new Error((<Error>error).message);
    }
}

userSchema.statics.login = async function ({
    password, username
}) {

    try {

        if (!username || !password) {
            throw new Error("All credentials are required");
        }

        const user = await this.findOne({ username });

        if (!user) {
            throw new Error("No record for user with the given informations");
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password);

        if (!isPasswordEqual) {
            throw new Error("Invalid password");
        }

        return user;

    } catch (error) {
        throw new Error((<Error>error).message);
    }
}

export default model("User", userSchema);