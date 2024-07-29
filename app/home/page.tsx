"use client";

import React from "react";

export default function Page() {
   function getCookie(cookieName: string) {
      const cookie = document.cookie.split("; ").find((row) => row.startsWith(`${cookieName}=`));
      if (cookie) {
         return decodeURIComponent(cookie.split("=")[1]);
      }
      return "";
   }

   const userName = getCookie("userName");

   return (
      <main className="flex w-full min-h-screen flex-col items-center justify-center py-12">
         <h2>Olá{userName && <span className={"font-bold"}> {userName}</span>}, você está logado!</h2>
      </main>
   );
}
