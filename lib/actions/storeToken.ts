"use server"

import {cookies} from "next/headers"

interface StoreUserAccess {
    token: string;
    refreshToken: string;
    userId: string;
    userName?: string;
}

export async function storeUserAccess(request: StoreUserAccess): Promise<void> {
    cookies().set({
        name: "userId",
        value: request.userId,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    })

    if (request.userName) {
        cookies().set({
            name: "userName",
            value: request.userName,
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        })
    }

    cookies().set({
        name: "token",
        value: request.token,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    })
    cookies().set({
        name: "refreshToken",
        value: request.refreshToken,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    })

}