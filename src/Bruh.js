import { useState, useEffect, useRef } from "react";
const bruhAudio = require("./bruh.mp3");

const useEventListener = (eventName, handler, element = window) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

const Bruh = () => {
  const [bruhCount, setBruhCount] = useState(0);
  const [bruhText, setBruhText] = useState("");

  const playBruh = async () => {
    let audio = new Audio(bruhAudio);
    await audio.play();
    await audio.remove();
  };

  useEventListener("keyup", (e) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      addBruh();
    }

    if (bruhText.length >= 4) {
      setBruhText("");
    }

    setBruhText((prevText) => prevText + e.key);

    if (e.keyCode === 66) {
      setBruhText("b");
    }

    // console.log("Key: " + e.keyCode + e.key);
  });

  function addBruh() {
    setBruhCount((prevCount) => prevCount + 1);
    playBruh();
  }

  useEffect(() => {
    const bruhContainer = () => {
      if (bruhText === "bruh") {
        addBruh();
      }
    };
    bruhContainer();
  }, [bruhText]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="h-screen flex flex-col justify-between">
        <div className="bg-zinc-800"></div>
        <div className="flex-grow flex items-center justify-center">
          <div className="mb-40">
            <button onClick={addBruh}>
              <span className="text-9xl text-white break-all text-center">
                {bruhCount}
              </span>
            </button>
          </div>
        </div>
        <div className="bg-zinc-800"></div>
      </div>
    </div>
  );
};

export default Bruh;
