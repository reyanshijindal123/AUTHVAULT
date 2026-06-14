"use client";
import {getUser} from "@/utils/cookie";
export default function ProfileCArd() {
    const user = getUser();
    const avatar=
    user?.name?.charat(0).toUpperCase();
    return(
        <div
            className="bg-white/20"
            backdrop-blur-lg  
      
            );
             
                    {avatar}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">
                            {user?.name}
                        </h2>

                        <p>{user?.email}</p>
                        
                </div>
            </div>
        </div>
    );
}