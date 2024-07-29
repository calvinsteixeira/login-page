'use client'

import React from 'react';

export default function Page() {
    function getCookie(cookieName: string) {
        return document.cookie.split("; ").find((row) => row.startsWith(`${cookieName}=`))?.split("=")[1];
    }

    const userName = getCookie('userName');

    return (
        <main className="flex w-full min-h-screen flex-col items-center justify-center py-12">
            <h2>Olá{userName && <span className={"font-bold"}>{" "}{userName}</span>}, você está logado!</h2>
        </main>
    );
}
