import { useEffect, useState } from "react";
import DragDrop from "./Components/DragDrop";
import { APP_STATES } from "./constants";

function App() {
  const [appState, setAppState] = useState(APP_STATES.IDLE);
  const [file, setFile] = useState<File>();

  const handleUpload = async () => {
    setAppState(APP_STATES.LOADING);
    const formData = new FormData();
    formData.append("file", file!);
    try {
      const response = await fetch("http://127.0.0.1:3000/image-convert", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          Content: "multipart/form-data",
        },
      });
      const data = await response.json();
      console.log(data);
      setAppState(APP_STATES.FILE_UPLOADED);
    } catch (err) {
      console.log(err);
      setAppState(APP_STATES.ERROR);
    }
  };

  return (
    <main className="h-full bg-slate-800 flex justify-center items-center">
      <div className="bg-white h-4/6 w-1/2 rounded-3xl flex flex-col justify-evenly">
        {appState === APP_STATES.IDLE && (
          <DragDrop setAppState={setAppState} setFile={setFile} />
        )}
        {appState === APP_STATES.FILE_SELECTED && (
          <div className="flex items-center justify-center">
            <div className="aspect-w-3 aspect-h-2">
              <img
                className="rounded-lg object-cover shadow-lg"
                width={300}
                src={URL.createObjectURL(file as any)}
                alt=""
              />
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="button"
            disabled={appState !== APP_STATES.FILE_SELECTED}
            onClick={handleUpload}
            className="inline-flex items-center rounded-md border border-transparent disabled:cursor-not-allowed disabled:bg-gray-400 bg-indigo-600 hover:scale-105 active:scale-95 transition-all duration-150 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Upload
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
