"use client";

import React from "react";
import { FcApproval } from "@/icons";

export default function Home() {
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
         <h1 className="text-base">Você está logado de forma segura...</h1>
         <div className="flex flex-col gap-4 mt-8">
            <p className="text-sm"><span className="font-bold">{userName}</span>, esses são alguns dos caprichos utilizados nesse projeto</p>
            <ul className="flex flex-col gap-4">
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
         </div>
      </main>
   );
}
