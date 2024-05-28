"use client"
import { useEffect } from "react";
import { logout } from "@/app/lib/actions";
import { saveAuthStatus } from "@/app/lib/config";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function Logout(){
  useEffect(() => {
    // Lakukan logout saat komponen mount
    logout();
    saveAuthStatus(false)
    // revalidatePath("/login")
    redirect('/login');
  }, []); 

  return null; // Halaman logout tidak perlu menampilkan konten apa pun, jadi kembalikan null
}
