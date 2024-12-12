import React, { useState } from "react";
import AceEditor from "react-ace";
import axios from "axios";

import "brace/mode/c_cpp";
import "brace/theme/monokai";

export default function Editor() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const runCode = async () => {
    try {
      const response = await axios.post("http://localhost:5000/run", { code });
      setOutput(response.data.output);
    } catch (error) {
      setOutput("Error running the code. Please try again.");
    }
  };

  return (
    <div>
      <AceEditor
        mode="c_cpp"
        theme="monokai"
        value={code}
        onChange={setCode}
        name="c-editor"
        editorProps={{ $blockScrolling: true }}
        width="75%"
        height="400px"
      />
      <button onClick={runCode} className="mt-4 p-2 bg-black text-white rounded ">
        Run Code
      </button>
      <pre className="mt-4 bg-black w-full p-4 rounded">Hi there{output}</pre>
    </div>

  );
}
