import React from 'react'
import { FaSearch } from "react-icons/fa";
import "../styles/searchbox.scss"

function Searchbox() {
  return (
    <form className='search_box'>
        <fieldset className="search_inner">
            <legend className="blind">검색창</legend>
            <FaSearch />
            <input type="search" name="search" id="search" placeholder="Find friends, chats, Plus Friends" />
        </fieldset>
    </form>
  )
}
export default Searchbox