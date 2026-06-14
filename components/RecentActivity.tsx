export default function RecentActivity(){
    const activities =[
        "Logges In",
        "Pdated Profile",
        "Changed Password",

    ];
    return(
        <div className ="bg-white mt-6 p-6 rounded-3xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">
                Recent Activity
            </h2>

            <ul>
                {activities.map((item,index)=>(
                    <li
                    key={index}
                    className="border-b py-3"
                    >
                        {item}
                        </li>
                    
            
                ))}
            </ul>

            
        </div>

    );

}