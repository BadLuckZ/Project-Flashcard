import { useState } from "react";

export default function Card({ card }) {
  const [isFlip, setFlip] = useState(false);

  return (
    <div
      className="bg-white flex flex-col gap-4 justify-center cursor-pointer border border-gray-300 rounded-lg shadow-md p-3 md:px-6 md:py-4 
        max-w-md min-h-[320px] md:min-h-[400px] h-fit w-full"
      onClick={() => {
        setFlip((prev) => !prev);
      }}
    >
      {isFlip ? (
        <>
          <div className="flex flex-col gap-2 justify-center w-full">
            <p className="text-2xl md:text-3xl text-mydarkgreen font-semibold">
              Meaning:
            </p>
            <p className="text-xl md:text-2xl text-myblack">{card.meaning}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center w-full">
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
          <h2 className="text-3xl md:text-4xl font-bold text-myblack text-center">
            {card.name}
          </h2>
          <h3 className="text-2xl md:text-3xl text-gray-700 text-center">
            ({card.type})
          </h3>
        </>
      )}
    </div>
  );
}
