import React, { useState } from "react";
import AceEditor from "react-ace";
import axios from "axios";
import jsPDF from "jspdf";
import IndexNavbar from "components/Navbars/IndexNavbar.js"
import "brace/mode/c_cpp";
import "brace/theme/chrome";
import EdImage from "assets/img/editor.png"
import { motion } from "framer-motion";

export default function Editor() {
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [input, setInput] = useState("")

  //Download pdf file of code
    const downloadPDF = () => {
        const doc = new jsPDF()
        doc.setFontSize(12)
        doc.text("Your Code: ",10, 10)
        doc.text(code, 10, 20)
        doc.save("code.pdf")
    }

  //Code runner
  const runCode = async () => {
    try {
      const response = await axios.post("http://localhost:5000/run", {
        code: code,
        input: input
        });
      setOutput(response.data.output);
    } catch (error) {
      setOutput("Error running the code. Please try again.");
    }
  };

  return (
    <>    
    <IndexNavbar fixed /> 
    <section className="h-screen" style={{backgroundColor: "#1E293B"}}>
        <div className="pt-32 flex flex-row justify-center items-center">
            <div className="w-full pl-10">      
            <AceEditor
            mode="c_cpp"
            theme="chrome"
            value={code}
            onChange={setCode}
            name="c-editor"
            editorProps={{ $blockScrolling: true }}
            width="130%"
            height="500px"
            style={{borderRadius: "10px"}}
            />
            <div className="mt-4 flex flex-col">
              <label htmlFor="input" className="text-white">Enter Input:</label>
              <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="p-2 border rounded mt-2"
              rows="4"
              style={{width: "40%"}}
              />
            </div>
            <div className="flex flex-row">
                <button onClick={runCode} className="mt-4 mr-4 p-3 text-white rounded bg" style={{backgroundColor: "#64748B", transition: "background-color 0.3s, color0.3s"}}
                onMouseEnter={(e)=>{
                    e.target.style.backgroundColor = "white"
                    e.target.style.color = "#64748B"
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#64748B";
                    e.target.style.color = "white";
                  }}
                >
                Run Code
                </button>
                <button onClick={downloadPDF} className="mt-4 p-3 rounded bg-white" style={{color : "#1E293B", transition: "background-color 0.3s, color0.3s"}}
                onMouseEnter={(e)=>{
                    e.target.style.backgroundColor = "#64748B"
                    e.target.style.color = "white"
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "white";
                    e.target.style.color = "#1E293B";
                  }}
                >
                Download PDF
                </button>
            </div>
            
            <pre className="mt-4 bg-blueGray-200 mb-3 p-5 h-52 rounded" style={{width:"120%"}}>Output=> {output}</pre>
            </div>
            <div className="flex justify-end ">
              <motion.img 
              src={EdImage} 
              alt="Editor-Image" 
              className="" style={{width: "70%"}}
              initial={{ x: "100vw", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 50, duration: 1 }}/>
            </div>
        </div>
    </section>
    </>
  );
}
