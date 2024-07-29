"use client";

import React from "react";
import { FcApproval } from "@/icons";

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
      <main className="flex w-full min-h-screen flex-col py-12">
         <div className="flex flex-col gap-4">
            <h1 className="text-lg">Olá{userName && <span className={"font-bold"}> {userName}</span>}, você está logado de forma segura!</h1>
            <p className="text-sm">Alguns dos caprichos utilizados nesse processo:</p>
         </div>
         <ul className="mt-4 flex flex-col gap-4">
            <li className="flex flex-row gap-3 items-center">
               <span>
                  <FcApproval />
               </span>{" "}
               Firebase para autenticação
            </li>
            <li className="flex flex-row gap-3 items-center">
               <span>
                  <FcApproval />
               </span>{" "}
               Firestore para dados adicionais do seu cadastro
            </li>
            <li className="flex flex-row gap-3 items-center">
               <span>
                  <FcApproval />
               </span>{" "}
               Metodologia segura de autenticação
            </li>
            <li className="flex flex-row gap-3 items-center">
               <span>
                  <FcApproval />
               </span>{" "}
               Cadastro simplificado utilizando o Google
            </li>
            <li className="flex flex-row gap-3 items-center">
               <span>
                  <FcApproval />
               </span>{" "}
               Responsividade com mobile first
            </li>
         </ul>
      </main>
   );
}
