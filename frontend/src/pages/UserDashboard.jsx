import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotesList from "../components/NotesList";
import AddToDo from "../components/AddToDo";

const UserDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("notes"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))

  const handleOptionClick = (option) => {
    setIsOpen(false);
    if (option === "logout") {
      navigate("/signup");
    } else if (option === "switch") {
      navigate("/signin");
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      setIsSearching(true); // show filtered results + blur background
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
  };

  return (
    <div className="h-full w-screen bottom-0 m-0 bg-white">
      <header className="shadow flex items-center justify-between px-4 py-2 sticky top-0 bg-white z-20">
       
      <div className="w-1/3 h-4">
          <h1 className="text-2xl font-bold ">📝 NOTEDESK</h1>
      </div>

      <div className="relative w-1/3">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
          className="border rounded-md px-3 py-2 w-full pl-9" // padding for icon
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={handleSearch}
        />
        <span
          className="absolute left-2 top-3 text-gray-500 cursor-pointer"
          onClick={handleSearch}
        >
          🔍
        </span>
      </div>

      <div className="relative">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h6 className="font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
            {user?.username||"User"}
          </h6>
          <span className="text-lg">{isOpen ? "⬆️" : "⬇️"}</span>
        </div>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => handleOptionClick("logout")}
            >
              Logout
            </button>
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => handleOptionClick("switch")}
            >
              Switch User
            </button>
          </div>
        )}
      </div>

      </header>

      <div className="flex h-[calc(100vh-96px)] relative"> 
        <nav className="sticky left-0 bottom-0 h-full shadow z-20 ">
          <ul className=" flex flex-col items-center justify-around h-full">
            <li>
              <button
                onClick={() => setActiveTab("notes")}
                className={`w-full text-left px-3 py-2 rounded-md ${
                  activeTab === "notes" ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`}
              >
                Notes
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("todo")}
                className={`w-full text-left px-3 py-2 rounded-md ${
                  activeTab === "todo" ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`}
              >
                Todo
              </button>
            </li>
          </ul>
        </nav>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-white">
          {activeTab === "notes" && (
            <div className="flex flex-col justify-between h-full ">
              <div className="flex-1 overflow-y-auto">
                <NotesList />
              </div>              
            </div>
          )}
          {activeTab === "todo" && (
            <div className="flex flex-col justify-between h-full ">
              <div className="flex-1 overflow-y-auto">
                <AddToDo />
              </div>              
            </div>
          )}
        </main>
       
        {isSearching && (
          <div className="absolute inset-0 bg-white bg-opacity-95 z-30 overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                Search Results for "{searchQuery}"
              </h2>
              <button
                onClick={clearSearch}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                &times;
              </button>
            </div>
            <NotesList searchQuery={searchQuery} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
