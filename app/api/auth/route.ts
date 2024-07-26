import {auth, firebaseErrors} from "@/utils/firebase";
import {NextResponse, NextRequest} from "next/server";
import {signInWithEmailAndPassword} from "firebase/auth";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const {email, password} = await req.json();
        const result = await signInWithEmailAndPassword(auth, email, password)

        if (result.user.refreshToken) {
            return NextResponse.json({user: result.user}, {status: 200})
        } else {
            throw Error
        }
    } catch (error: any) {
        console.log(error)
        let {message, code} = firebaseErrors[`${error.code}`] || "Falha na autenticação"
        return NextResponse.json({message: message}, {status: code})
    }
}