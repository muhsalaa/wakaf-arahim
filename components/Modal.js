import React from "react";
import clsx from "clsx";

export function Modal({
  show,
  toggle,
  closeOnOverlay = true,
  sm = true,
  md,
  lg,
  xl,
  children,
  title,
}) {
  function close() {
    return closeOnOverlay && toggle(false);
  }

  return (
    <section
      className={clsx(
        "fixed w-full h-full top-0 left-0 flex items-center justify-center z-20 transition-opacity",
        show
          ? "opacity-100 pointer-events-auto duration-300 ease-out"
          : "opacity-0 pointer-events-none duration-200 ease-in"
      )}
    >
      <div
        onClick={close}
        data-testid="modal-overlay"
        className="absolute w-full h-full bg-gray-800 opacity-50"
      ></div>
      <main
        data-testid="modal-container"
        className={clsx(
          "z-20 w-11/12 p-2 sm:p-4 transform transition-transform mx-auto overflow-y-auto bg-white rounded-md shadow-md",
          show
            ? "scale-100 ease-out duration-300 translate-y-0"
            : "scale-95 ease-in duration-200 translate-y-4",
          sm && "max-w-sm",
          md && "max-w-md",
          lg && "max-w-lg",
          xl && "max-w-xl"
        )}
      >
        <header
          data-testid="modal-head"
          className="relative h-8 border-b-2 border-black flex justify-between items-center"
        >
          <div className="font-lato font-bold text-md sm:text-lg text-black">
            {title}
          </div>
          <button
            onClick={close}
            className="text-xs sm:text-sm font-bold text-red-500 font-lato focus:outline-none hover:text-red-600"
          >
            TUTUP
          </button>
        </header>
        <div
          data-testid="modal-body"
          className="pt-3 sm:pt-5 font-fira text-sm sm:text-lg"
        >
          {children}
        </div>
      </main>
    </section>
  );
}

Modal.defaultProps = {
  closeOnOverlay: true,
  sm: true,
};
