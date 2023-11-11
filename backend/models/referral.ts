import mongoose, { Schema, model } from "mongoose";

const referralSchema = new Schema({
    referralCode: {
        type: String,
    },
    referreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

export default model("Referral", referralSchema);