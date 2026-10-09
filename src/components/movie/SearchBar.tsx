import React from "react";

interface SearchBarProps {
  onSearch: (title: string) => void;
  value: string;  // Controlled value from parent
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, value }) => {
  return (
    <div className="relative max-w-xl mx-auto mb-10">
      <input
        type="text"
        value={value}  // Controlled by parent — NO internal state
        placeholder="Search for movies..."
        className="w-full p-4 pl-12 bg-white-900 rounded-2xl border border-blue-800 text-black focus:border-red-600 outline-none"
        onChange={(e) => {
          onSearch(e.target.value);
        }}
      />
      <span className="absolute left-4 top-4">🔍</span>
    </div>
  );
};

export default SearchBar;
