import { useState, useEffect } from "react";

export default function Card({ card }) {
  const [isFlip, setFlip] = useState(false);
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    let timer;
    if (isFlip) {
      timer = setTimeout(() => setShowBack(true), 185);
    } else {
      timer = setTimeout(() => setShowBack(false), 185);
    }
    return () => clearTimeout(timer);
  }, [isFlip]);

  return (
    <div
      className={`bg-white flex flex-col gap-4 justify-center cursor-pointer border border-gray-300 rounded-lg shadow-md p-3 md:px-6 md:py-4 
        max-w-md min-h-[400px] md:min-h-[500px] h-fit w-full ${
          isFlip ? "rotate-y-180" : ""
        } transition-transform duration-500`}
      onClick={() => setFlip((prev) => !prev)}
    >
      {showBack ? (
        <>
          <div className="flex flex-col gap-2 justify-center w-full rotate-y-180">
            <p className="text-2xl md:text-3xl text-mydarkgreen font-semibold">
              Meaning:
            </p>
            <p className="text-xl md:text-2xl text-myblack break-words">
              {card.meaning}
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-center w-full rotate-y-180">
            <p className="text-2xl md:text-3xl text-mydarkgreen font-semibold">
              Example:
            </p>
            <p className="text-xl md:text-2xl text-myblack break-words">
              {card.sentence}
            </p>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-3xl md:text-4xl font-bold text-myblack text-center break-words">
            {card.name}
          </h2>
          <h3 className="text-2xl md:text-3xl text-gray-700 text-center break-words">
            ({card.type})
          </h3>
        </>
      )}
    </div>
  );
}
