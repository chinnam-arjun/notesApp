import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  // ✅ Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:5000/admin/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  // ✅ Fetch notes for selected user
  const handleViewNotes = async (user) => {
    setLoading(true);
    const res = await fetch(`http://localhost:5000/admin/notes/${user._id}`);
    const data = await res.json();
    setSelectedUser(user);
    setNotes(data);
    setLoading(false);
  };

  // ✅ Restrict user for 1 day
  const handleRestrict = async (userId) => {
    const res = await fetch(`http://localhost:5000/admin/restrict/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ duration: 1 }),
    });
    const data = await res.json();
    if (data.success) {
      alert(`🚫 User restricted until ${new Date(data.user.restrictedUntil).toLocaleString()}`);
      setUsers(users.map((u) => (u._id === userId ? data.user : u)));
    }
  };

  // ✅ Filter users by search input
  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="shadow-md flex items-center justify-between px-6 py-4 sticky top-0 bg-white z-20">
        <img
          src="/logo.jpg"
          alt="Logo"
          className="w-[60px] h-[60px] rounded-full object-cover"
        />

        <input
          type="search"
          placeholder="🔍 Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <div>
          <h6 className="font-bold text-blue-700 text-lg">Admin Panel</h6>
        </div>
      </header>

      <main className="p-6">
        {/* ✅ Back to Users Button (when viewing notes) */}
        {selectedUser && (
          <button
            onClick={() => {
              setSelectedUser(null);
              setNotes([]);
            }}
            className="mb-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
          >
            ← Back to All Users
          </button>
        )}

        {/* ✅ Users List Section */}
        {!selectedUser && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-extrabold text-gray-800 tracking-wide">
                👥 Users
              </h2>
              <button
                onClick={() => navigate("/signin")}
                className="text-sm text-blue-700 underline hover:text-blue-900"
              >
                Go to User Dashboard
              </button>
            </div>

            {filteredUsers.length === 0 ? (
              <p className="text-gray-500">No users found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-gray-100"
                  >
                    <div className="flex flex-col gap-1 mb-4">
                      <p className="font-semibold text-lg text-gray-800">
                        {user.username}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      {user.restrictedUntil &&
                        new Date(user.restrictedUntil) > new Date() && (
                          <p className="text-red-600 text-xs font-medium">
                            Restricted until:{" "}
                            {new Date(user.restrictedUntil).toLocaleString()}
                          </p>
                        )}
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={() => handleViewNotes(user)}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
                      >
                        View Notes
                      </button>
                      <button
                        onClick={() => handleRestrict(user._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Restrict (1d)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ✅ Notes Section */}
        {selectedUser && (
          <div className="animate-fadeIn">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              📘 {selectedUser.username}’s Notes
            </h3>

            {loading ? (
              <p className="text-gray-500">Loading notes...</p>
            ) : notes.length === 0 ? (
              <p className="text-gray-500">No notes available for this user.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                  <div
                    key={note._id}
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition p-4 flex flex-col justify-between"
                    onClick={() => setSelectedNote(note)}
                  >
                    <div>
                      <h4 className="font-semibold text-lg mb-2 text-indigo-700">
                        {note.title}
                      </h4>
                      <p className="text-gray-700 text-sm line-clamp-3">
                        {note.content}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 mt-3">
                      {new Date(note.createdAt).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {selectedNote && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-20 backdrop-blur-sm z-30">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-1/2 max-h-[80vh] overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedNote(null)}
            >
              &times;
            </button>

            <div className="flex justify-between items-center mb-2">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setEditNote(selectedNote);
                  setShowAddNote(true);
                  setSelectedNote(null);
                }}
              >
                ✏️
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleDeleteClick(selectedNote)}
              >
                🗑️
              </span>
            </div>

            <h2 className="font-semibold text-xl mb-2">{selectedNote.title}</h2>
            {selectedNote.imageuri?.url && (
              <img
                src={selectedNote.imageuri.url}
                alt={selectedNote.imageuri.caption || "Note image"}
                className="w-full rounded mb-3"
              />
            )}
            <p className="text-gray-700 whitespace-pre-wrap">
              {selectedNote.content}
            </p>
            <span className="text-xs text-gray-400 mt-3 block">
              {new Date(selectedNote.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      )}
      </main>
    </div>
  );
};

export default AdminDashboard;
