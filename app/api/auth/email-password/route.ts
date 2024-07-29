import {auth, firebaseErrors, firestore} from "@/utils/firebase";
import {NextResponse, NextRequest} from "next/server";
import {signInWithEmailAndPassword} from "firebase/auth";
import {doc, getDoc} from "@/utils/firebase"
import { storeUserAccess } from "@/lib/actions/storeToken";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const {email, password} = await req.json();
        const result = await signInWithEmailAndPassword(auth, email, password)
        const user = result.user

        const userDocRef = doc(firestore, "users", user.uid)
        const userDoc = await getDoc(userDocRef)
        let userData = null
        
        if (userDoc.exists()) {
            userData = userDoc.data()
        }

        await storeUserAccess({
            token: await user.getIdToken(),
            refreshToken: user.refreshToken,
            userId: user.uid,
            userName: userData?.name,
        })

        if (result.user.refreshToken) {
            return NextResponse.json({user}, {status: 200})
        } else {
            throw Error
        }
    } catch (error: any) {
        console.log(error)
        const {message, code} = firebaseErrors[`${error.code}`] || "Falha na autenticação"
        return NextResponse.json({message: message}, {status: code})
    }
}