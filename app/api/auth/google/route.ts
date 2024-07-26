import {NextRequest, NextResponse} from "next/server";
import {auth, firebaseErrors, signInWithPopup, googleProvider, doc, firestore, getDoc, setDoc} from "@/utils/firebase";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { userId, userName } = await req.json()

        const docRef = doc(firestore, "users", userId)
        const docSnap = await getDoc(docRef)

        await setDoc(docRef, {
            name: userName,
            createdAt: new Date()
        });

        return NextResponse.json({}, {status: 201})

    } catch (error: any) {
        console.log(error)
        const {message, code} = firebaseErrors[`${error.code}`] || "Falha na autenticação"
        return NextResponse.json({message: message}, {status: code})
    }
}