import {
    createUserWithEmailAndPassword
} from "firebase/auth";
import {auth, firestore, doc, setDoc, firebaseErrors} from "@/utils/firebase";
import {NextResponse, NextRequest} from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const {email, password, name} = await req.json()
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)

        if (userCredential.user) {
            const user = userCredential.user

            await setDoc(doc(firestore, "users", user.uid), {
                displayName: name,
                createdAt: new Date(),
            })

            return NextResponse.json({message: "Cadastro realizado com sucesso"}, {status: 201})
        } else {
            throw Error
        }
    } catch (error: any) {
        console.log(error)
        let { message, code} = firebaseErrors[`${error.code}`] || "Falha no cadastro"
        return NextResponse.json({message: message}, {status: code})
    }
}


