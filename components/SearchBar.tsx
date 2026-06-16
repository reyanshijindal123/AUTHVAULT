type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({
  search,
  setSearch,
}: Props) {
  return (
    <input
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      placeholder="Search Tasks..."
      className="w-full p-3 rounded-xl text-black"
    />
  );
}