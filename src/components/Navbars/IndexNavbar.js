/*eslint-disable*/
import React from "react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useHistory } from "react-router-dom"

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const history = useHistory()

  const searchItems = [
    "linear search",
    "binary search",
    "bubble sort",
    "selection sort",
  ]

  const searchMap = {
    "linear search": "/profile",
    "binary search": "/binary-search",
    "bubble sort": "/bubble-sort",
    "selection sort": "/selection-sort",
  }

  const handleSearch = () =>{
    const path = searchMap[searchQuery.toLowerCase()]
    if(path){
      history.push(path)
    }
    else{
      alert("Page not found for this search!")
    }
  }

  const handleKeyDown = (e) =>{
    if(e.key === 'Enter'){
      handleSearch()
    }
  }

  const handleInputChange = (e) =>{
    const query = e.target.value 
    setSearchQuery(query)

    if(query){
      const filtered = searchItems.filter(items => items.toLowerCase().includes(query.toLowerCase()))
      setFilteredSuggestions(filtered)
    }
    else{
      setFilteredSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion)=>{
    const path = searchMap[suggestion.toLowerCase()]
    history.push(path)
    setFilteredSuggestions([])
  }

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg shadow bg-blueGray-600">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div className="flex flex-row">
              <Link
              to="/"
              className="text-white text-2xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              AlgoSys
            </Link>

            {/* Search Bar */}
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search here..."
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="border-0  px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none  w-full pl-10"
              />
              {filteredSuggestions.length > 0 && (
                <ul className="absolute mt-16 text-white bg-blueGray-600 border rounded shadow-lg w-full">
                  {filteredSuggestions.map((suggestion, index)=>(
                    <li 
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                      key={index}
                      onClick={()=>handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                    </li>
                  ))}
                </ul>
              )}
              </div>
            </div>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto text-white">
          
              <li className="flex items-center">
                <a
                  className="hover:text-blueGray-300 px-3 py-4 lg:py-2 flex items-center uppercase font-bold text-sm"
                  href="#"
                  target="_blank"
                >
                Home
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="hover:text-blueGray-300 text-white px-3 py-4 lg:py-2 flex items-center text-sm uppercase font-bold"
                  href="#"
                  target="_blank"
                >
                Algorithms
                </a>
              </li>

              <Link
              to="/auth/login">              
              <li className="flex items-center">
                <a
                  className="hover:text-blueGray-300 text-white px-3 py-4 lg:py-2 flex items-center text-sm uppercase font-bold"
                  target="_blank"
                >
                Login
                </a>
              </li>
              </Link>

              <Link
              to="/auth/register">              
              <li className="flex items-center">
                <a
                  className="hover:text-blueGray-300 text-white px-3 py-4 lg:py-2 flex items-center text-sm uppercase font-bold"
                  href="/auth/register"
                  target="_blank"
                >
                Register
                </a>
              </li>
              </Link>

              <Link
              to="/editor">
              <li className="flex items-center">
                <button
                  className="bg-white text-blueGray-600 active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                  Code Editor
                </button>
              </li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
