import { useContext } from 'react';
import { Context } from '../../context/context';

const SearchBar = () => {

  const { searchValue, setSearchValue } = useContext(Context);

  return (
    <input
      type="text"
      placeholder="Search notes by title..."
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      className="p-2 mb-4 border w-3/4 sm:w-full border-gray-300 rounded mx-auto"
    />
  )
}

export default SearchBar
