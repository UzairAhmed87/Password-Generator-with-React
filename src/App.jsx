import { useState, useCallback , useEffect ,useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumber] = useState(false);
  const [charAllowed, setChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMmnbvcxzlkjhgfdsapoiuytrewq";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%&/?~;:";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword]);



  useEffect(()=>{passwordGenerator()},[length , numberAllowed ,charAllowed ,passwordGenerator])

  const passwordRef = useRef(null)
  const copyToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  return (
    <>
      <div className="w-full max-w-md rounded-lg p-5 my-8 bg-gray-500 mx-auto text-center">
        <h1 className="text-2xl inline-block text-white text-center  rounded-xl my-3">
          Password Generator
        </h1>
        <div className=" flex text-lg shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 text-orange-600"
            placeholder="Password"
            ref={passwordRef}
            readOnly
          />
          <button onClick={copyToClipboard} className="outline-none bg-orange-600 px-3 py-1 text-white text-xl cursor-pointer">
            Copy
          </button>
        </div>
        <div className="flex text-md gap-x-2 text-orange-600 flex-wrap">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              value={length}
              max={50}
              min={8}
              className="cursor-pointer"

              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
