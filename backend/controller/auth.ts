import jwt, { Secret } from "jsonwebtoken";
import { Request, Response } from "express";

import User from "../models/user";
import Referral from "../models/referral";


function createToken({ _id }: { _id: string }) {
    return jwt.sign({ _id }, process.env.SECRET as Secret, { expiresIn: "7d" });
}


export async function Signup(req: Request, res: Response) {

    const { email, password, username, ref_code } = req.body;

    try {
        const user = await (User as any).signup({ email, password, username, ref_code });

        if (ref_code) {
            await Referral.create({ referralCode: ref_code, referreId: user._id });
        }

        const token = createToken({ _id: user._id });

        res.status(201).json({msg: "User signed up successfully", token });
    } catch (error) {
        res.status(400).json((<Error>error).message);
        console.log("Here", error);
    }
}

export async function Login(req: Request, res: Response) {

    const { password, username } = req.body;

    try {
        const user = await (User as any).login({ password, username });

        const token = createToken({ _id: user._id });

        res.status(200).json({msg: "User signed up successfully", token });
    } catch (error) {
        res.json((<Error>error).message);
        console.log(error);
    }
}