import { NextRequest, NextResponse } from "next/server";
import { storeUserAccess } from "@/lib/actions/storeToken";
import { auth, firebaseErrors, signInWithPopup, googleProvider, doc, firestore, getDoc, setDoc } from "@/utils/firebase";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { token, refreshToken, userId, userName } = await req.json();

    const userDocRef = doc(firestore, "users", userId);

    await setDoc(userDocRef, {
      name: userName,
      createdAt: new Date(),
    });    

    await storeUserAccess({
      token: token,
      refreshToken: refreshToken,
      userId: userId,
      userName: userName,
    });

    return NextResponse.json({}, { status: 201 });
  } catch (error: any) {
    console.log(error);
    const { message, code } = firebaseErrors[`${error.code}`] || "Falha na autenticação";
    return NextResponse.json({ message: message }, { status: code });
  }
}
