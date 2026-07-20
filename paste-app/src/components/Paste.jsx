import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchItem, setSearchItem] = useState("");
  const dispatch = useDispatch();
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchItem.toLowerCase()),
  );
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }
  return (
    <div className="min-h-[calc(100vh-72px)] bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Search */}
        <div className="mb-8">
          <input
            type="search"
            placeholder="🔍 Search your pastes..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-base shadow-sm outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
          />
        </div>

        {/* Empty State */}
        {filteredData.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-md">
            <h2 className="text-2xl font-semibold text-slate-700">
              No Pastes Found
            </h2>
            <p className="mt-2 text-slate-500">
              Create a new paste or try another search.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredData.map((paste) => (
              <div
                key={paste._id}
                className="rounded-2xl bg-white p-6 shadow-md transition-all hover:shadow-xl"
              >
                {/* Title */}
                <h2 className="break-words text-2xl font-bold text-slate-800">
                  {paste.title}
                </h2>

                {/* Content */}
                <p className="mt-3 whitespace-pre-wrap break-words text-slate-600">
                  {paste.content}
                </p>

                {/* Buttons */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to={`/?pasteId=${paste._id}`}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(paste._id)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Copied to Clipboard");
                    }}
                    className="rounded-lg bg-slate-700 px-4 py-2 text-white transition hover:bg-slate-900"
                  >
                    Copy
                  </button>
                </div>

                {/* Date */}
                <div className="mt-5 border-t pt-4 text-sm text-slate-500">
                  Created: {new Date(paste.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;
