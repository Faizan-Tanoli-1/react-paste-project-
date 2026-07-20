import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);

      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update
      dispatch(updateToPastes(paste));
    } else {
      //create
      dispatch(addToPastes(paste));
    }

    // After creation cleanup
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-5 shadow-xl sm:p-6 md:p-8">
        {/* Heading */}
        <h1 className="mb-6 text-center text-2xl font-bold text-slate-800 md:text-3xl">
          {pasteId ? "Update Paste" : "Create New Paste"}
        </h1>

        {/* Title + Button */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Enter title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
          />

          <button
            onClick={createPaste}
            className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-cyan-700 active:scale-95"
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>

        {/* Textarea */}
        <textarea
          rows={18}
          placeholder="Write your paste here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="min-h-[350px] w-full resize-y rounded-xl border border-slate-300 p-4 text-base outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 md:min-h-[500px]"
        />
      </div>
    </div>
  );
};

export default Home;
