type ButtonProps = {
  text: string;
};

export default function Button({
  text,
}: ButtonProps) {
  return (
    <button
      type="submit"
      className="w-full bg-white text-purple-600 font-bold py-3 rounded-xl hover:scale-105 transition-all duration-300"
    >
      {text}
    </button>
  );
}