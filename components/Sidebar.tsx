"use client";
import Link from "next/link";
export default function Sidebar() {
    return(
        <div className = "w-64 bg-slate-900 text-white min-h-screen p-5">
            <h1 className = "text - 2xl font-bold mb-8">
                AuthVault
                </h1>

                <div>
                    <aside className=" w-64 bg-white/20 backdrop-blur-lg border-r border-white/2"
                    >Sidebar
                    </aside>
                    <Link href="/dashboard" className="block hover:bg-slate-700 p-2 rounded">
                        Dashboard
                    </Link>
                    <Link href="/profile" className="block hover:bg-slate-700 p-2 rounded">
                        Profile
                    </Link>
                    <Link href="/settings" className="block hover:bg-slate-700 p-2 rounded">
                        Settings
                    </Link>
                </div>          
            
        </div>
    );
}