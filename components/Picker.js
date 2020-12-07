import React from "react";
import clsx from "clsx";

import { AVAILABLE, PAID, RESERVED } from "../consts";

const letter = ["A", "B", "C", "D"];

function boxColor(status) {
  if (status === AVAILABLE) {
    return "bg-blue-400 hover:bg-blue-500";
  } else if (status === RESERVED) {
    return "bg-pink-400";
  } else if (status === PAID) {
    return "bg-green-400";
  } else {
    return "bg-gray-4000";
  }
}

export function Picker({ data, number, releaseTheModal }) {
  function showModal(reservedOrPaid) {
    if (reservedOrPaid) return false;
    releaseTheModal(data);
  }

  return (
    <div>
      {data.share ? (
        <div className="w-full h-40 grid grid-cols-2 grid-rows-2 gap-1">
          {data.mini_blocks.map((mini, index) => {
            const reservedOrPaid =
              mini.status === PAID || mini.status === RESERVED;
            return (
              <div
                onClick={() => showModal(reservedOrPaid)}
                key={index}
                className={clsx(
                  "w-full p-2 h-full",
                  boxColor(mini.status),
                  reservedOrPaid ? "cursor-not-allowed" : "cursor-pointer"
                )}
              >
                <p className="text-white font-bold text-xs md:text-sm leading-none">
                  {number + letter[index]}
                  {mini.status === RESERVED && ". Dipesan"}
                  {mini.status === PAID && ". Dibayar"}
                </p>
                {mini.status === PAID && (
                  <p className="text-xs md:text-sm font-bold">
                    Bpk/Ibu {mini.muwaqif.name}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className={clsx(
            "w-full h-40 relative",
            boxColor(data.status),
            data.status === PAID || data.status === RESERVED
              ? "cursor-not-allowed"
              : "cursor-pointer"
          )}
          onClick={() =>
            showModal(data.status === PAID || data.status === RESERVED)
          }
        >
          <div className="abs-center absolute font-bold text-sm md:text-2xl text-white -z-10">
            {number}
            {data.status === RESERVED && ". Dipesan"}
            {data.status === PAID && ". Dibayar"}
            {data.status === PAID && (
              <p className="text-xs md:text-2xl font-bold">
                Bpk/Ibu {data.muwaqif.name}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
