import { useState } from 'react';

const SearchBar = () => {

    const [searchValue, setSearchValue] = useState('');

    return (
        <input
            type="text"
            placeholder="Search notes by title..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="p-2 mb-4 border sm:w-auto w-3/4 border-gray-300 rounded"
        />
    )
}

export default SearchBar
