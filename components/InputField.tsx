type InputFieldProps = {
  type: string;
  placeholder: string;
  value: string;
  setValue: React.Dispatch<
    React.SetStateAction<string>
  >;
};

export default function InputField({
  type,
  placeholder,
  value,
  setValue,
}: InputFieldProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) =>
        setValue(e.target.value)
      }
      className="w-full p-3 rounded-xl bg-white/20 border border-white/30 outline-none placeholder:text-gray-200"
    />
  );
}