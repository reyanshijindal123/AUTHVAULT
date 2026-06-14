"use client";
import DarkModeToggle from "./DarkModeToggle";
export default function Navbar() {
    return (
        <div className="bg-white shadow-md p-5 flex justify-between">
            <h1 className="text-xl font-bold">
                Dashboard
            </h1>
            <DarkModeToggle/>

        </div>
    );
}