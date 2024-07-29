import { cookies } from "next/headers"

export async function getToken() {
    const authToken = await cookies().get('token')?.value
    if (!authToken) {
        const headers = new Headers().set('Authorization', `${authToken}`)
    }
}