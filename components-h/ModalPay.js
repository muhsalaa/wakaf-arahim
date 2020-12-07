import React from "react";
import clsx from "clsx";

import { Modal } from "../components/Modal";

export function ModalPay({
  showModal,
  setShowModal,
  muwaqif,
  setMuwaqif,
  phone,
  setPhone,
  wide,
  setWide,
  reserve,
  buttonLoading,
  data,
  error,
}) {
  return (
    <Modal
      title="Menu Waqaf"
      show={showModal}
      toggle={buttonLoading ? () => {} : setShowModal}
    >
      <label className="block my-2">
        <span className="text-gray-700 text-sm sm:text-lg font-bold">
          Nama Muwaqif
        </span>
        <input
          className={clsx(
            "form-input block w-full border rounded",
            error.muwaqif && "border-red-500"
          )}
          placeholder="Abu Hu..."
          value={muwaqif}
          onChange={(e) => setMuwaqif(e.target.value)}
        />
        {error.muwaqif && <p className="text-red-500">{error.muwaqif}</p>}
      </label>
      <label className="block my-2">
        <span className="text-gray-700 text-sm sm:text-lg font-bold">
          Nomor Hp
        </span>
        <input
          className={clsx(
            "form-input block w-full border rounded",
            error.phone && "border-red-500"
          )}
          placeholder="0821..."
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {error.phone && <p className="text-red-500">{error.phone}</p>}
      </label>
      <div className="text-gray-700 text-sm sm:text-lg font-bold mb-2">
        Pilih luas
      </div>
      <div className="grid grid-cols-2">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="luas"
            onChange={() => setWide(0.25)}
            checked={wide === 0.25}
            disabled={data.available < 0.25}
          />
          <span
            className={clsx("ml-2", data.available < 0.25 && "text-gray-400")}
          >
            1/4 M2
          </span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="luas"
            onChange={() => setWide(0.5)}
            checked={wide === 0.5}
            disabled={data.available < 0.5}
          />
          <span
            className={clsx("ml-2", data.available < 0.5 && "text-gray-400")}
          >
            1/2 M2
          </span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="luas"
            onChange={() => setWide(0.75)}
            checked={wide === 0.75}
            disabled={data.available < 0.75}
          />
          <span
            className={clsx("ml-2", data.available < 0.75 && "text-gray-400")}
          >
            3/4 M2
          </span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="luas"
            onChange={() => setWide(1)}
            checked={wide === 1}
            disabled={data.available < 1}
          />
          <span className={clsx("ml-2", data.available < 1 && "text-gray-400")}>
            1 M2
          </span>
        </label>
      </div>
      <button
        disabled={buttonLoading}
        onClick={reserve}
        className={clsx(
          "w-full h-8 text-white mt-5 rounded-md focus:outline-none",
          buttonLoading && "bg-gray-500 animate-pulse",
          !buttonLoading && "bg-green-400 hover:bg-green-600"
        )}
      >
        Bayar
      </button>
    </Modal>
  );
}
