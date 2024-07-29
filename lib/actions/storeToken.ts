"use server"

import {cookies} from "next/headers"

interface StoreUserAccess {
    token: string;
    refreshToken: string;
    userId: string;
    userName?: string;
}

export async function storeUserAccess(request: StoreUserAccess): Promise<void> {
    // It simplifies the use of cookies depending on the current environment because HttpOnly cookies only work with
    // HTTPS requests, and development environments typically use HTTP. Tools like ngrok can help by providing an
    // HTTPS endpoint for local development, it can be a point of improve for this project in the future.
    const isDevelopment = process.env.NODE_ENV === "development";
    cookies().set({
        name: "userId",
        value: request.userId,
        httpOnly: isDevelopment,
        sameSite: "strict",
        secure: true,
    })

    if (request.userName) {
        cookies().set({
            name: "userName",
            value: request.userName,
            httpOnly: false,
            sameSite: "strict",
            secure: true,
        })
    }

    cookies().set({
        name: "token",
        value: request.token,
        httpOnly: isDevelopment,
        sameSite: "strict",
        secure: true,
    })
    cookies().set({
        name: "refreshToken",
        value: request.refreshToken,
        httpOnly: isDevelopment,
        sameSite: "strict",
        secure: true,
    })

}