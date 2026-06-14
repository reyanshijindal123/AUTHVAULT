type Props ={
    title: string;
    value:string;

};
export default function StatsCard({
    title,
    value,
}: Props) {
    return(
        <div className ="bg-white p-6 rounded-3xl shadow-lg">
            <h3 className ="text-gray-500">
                {title}
            </h3>
            <p className ="text-2xl font-bold">
                {value}
            </p>
        </div>
    );
}