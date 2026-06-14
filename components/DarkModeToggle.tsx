"use client";
import{useState} from "react";
export default function DarkModeToggle() {
    const[dark, setDark]=
    useState(false);

    return(
        <button
        onClick={()=>
            setDark(!dark)
        }
        className="bg-purple-500 text-white px-4 py-2 rounded-xl"
        >
            {dark? "🌞 Light":"🌙 Dark"}
        </button>
    );
}