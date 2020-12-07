import { useEffect, useState } from "react";
import Head from "next/head";
import getApi from "public-ip";

import { ModalPay } from "../components-h/ModalPay";
import { Picker } from "../components/Picker";
import { Loader } from "../components/Loader";

import { useRequest } from "../utils/apiRequest";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [blockData, setBlockData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentData, setCurrentData] = useState({});

  const [wide, setWide] = useState(1);
  const [muwaqif, setMuwaqif] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState([]);
  const [muwaqifError, setMuwaqifError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  async function getData() {
    setIsLoading(true);

    try {
      const response = await useRequest({ url: "/api/waqaf" });
      setBlockData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  }

  function releaseTheModal(data) {
    setWide(data.available);
    setShowModal(true);
    setCurrentData(data);
  }

  function validate(data, type) {
    if (type === "M") {
      if (!data) {
        return "Nama harus diisi";
      } else if (data.length < 3) {
        return "Nama minimal 3 karakter";
      }
    }

    if (type === "P") {
      if (!data) {
        return "Nomor hp harus diisi";
      } else if (!/^(62|0)8\d{8,11}$/.test(data)) {
        return "Format nomor hp salah";
      }
    }

    return null;
  }

  async function addMuwaqif() {
    const validateName = validate(muwaqif, "M");
    const validatePhone = validate(phone, "P");
    setMuwaqifError(validateName);
    setPhoneError(validatePhone);

    if (validateName || validatePhone) return false;

    setButtonLoading(true);
    const ip = await getApi.v4();

    try {
      await useRequest({
        url: `/api/waqaf/${currentData._id}`,
        method: "POST",
        data: {
          name: muwaqif || "Hamba Allah",
          phone,
          wide,
          ip,
        },
      });
      setShowModal(false);
      setButtonLoading(false);
      setCurrentData({});
      setMuwaqif("");
      setPhone("");
      getData();
    } catch (error) {
      alert(error.response.data.message);
      setButtonLoading(false);
      setShowModal(false);
      setCurrentData({});
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div className="w-full p-4 text-center max-w-5xl mx-auto">
          <h1 className="font-bold text-xl md:text-3xl mb-2">
            Penerimaan wakaf masjid Ar Rahim tahun 2020
          </h1>
          <div className="text-sm md:text-xl mb-2">
            Target wakaf adalah tanah seluas{" "}
            <span className="text-red-500 font-bold">149 M2</span>, dengan harga
            per meter perseginya adalah Rp 2.000.000, Sehingga total dana yang
            dibutuhkan adalah sebesar{" "}
            <span className="text-red-500 font-bold">Rp 298.000.000</span>
          </div>

          <div className="text-sm md:text-lg my-4 p-2 md:p-4 bg-green-100 text-green-800 text-left">
            <h1 className="font-bold text-center">Cara berpartisipasi</h1>
            <ul className="list-inside list-decimal">
              <li className="mb-2">
                Untuk dapat ikut ber-wakaf. Bapak/Ibu dapat memilih kotak-kotak
                dibawah ini.{" "}
                <span className="text-red-500 font-semibold">
                  Satu kotak senilai Rp 2.000.000 atau 1 M2.
                </span>
              </li>
              <li className="mb-2">
                Setiap kotak dapat dibagi menjadi 4 bagian. Ketika diklik,
                muwaqif dapat memilih luas tanah wakaf sesuai keinginan.
              </li>
              <li className="mb-2">
                Mengisi nama dan nomor hp calon pemberi wakaf. Setelahnya
                menekan tombol bayar, maka kotak yang dipilih akan berubah
                menjadi warna merah muda
              </li>
              <li className="mb-2">
                Melakukan pembayaran ke rekening yang tertera di kotak informasi
                dibawah
              </li>
              <li className="mb-2">
                Setelah melakukan pembayaran, silahkan konfirmasi ke nomor{" "}
                <span className="text-red-500 font-semibold">
                  0813 2939 1711
                </span>
                . Nanti admin akan mengecek pembayaran. Apabila terkonfirmasi,
                kotak pilihan akan berubah warna hijau dan menampilkan nama
                pewakaf
              </li>
            </ul>
          </div>
          {/* further info */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full bg-gray-100 p-2 md:p-4">
              <h1 className="font-bold text-center text-sm md:text-2xl mb-4">
                Keterangan
              </h1>
              <div className="flex items-center text-xs md:text-xl mb-4">
                <div className="w-5 h-5 md:w-10 md:h-10 bg-blue-400 mr-4"></div>
                Belum dipesan
              </div>
              <div className="flex items-center text-xs md:text-xl mb-4">
                <div className="w-5 h-5 md:w-10 md:h-10 bg-pink-400 mr-4"></div>
                Sudah dipesan
              </div>
              <div className="flex items-center text-xs md:text-xl">
                <div className="w-5 h-5 md:w-10 md:h-10 bg-green-400 mr-4"></div>
                Sudah dibayar
              </div>
            </div>
            <div className="w-full bg-gray-100 p-2 md:p-4 font-semibold">
              <h1 className="font-bold text-center text-sm md:text-2xl mb-4">
                No Rekening
              </h1>
              <div className="flex items-center text-xs md:text-lg mb-4">
                - 089 89 9238 238 BSM a.n Budi Priyanto
              </div>
              <div className="flex items-center text-xs md:text-lg mb-4">
                - 089 89 9238 238 BNI a.n Ahmad Salma
              </div>
              <div className="flex items-center text-xs md:text-lg mb-4">
                - 089 89 9238 238 BCA a.n Yoyo Sundoyo
              </div>
            </div>
          </div>
        </div>
      </header>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4 w-full mx-auto max-w-5xl">
          {blockData.data?.map((item, index) => {
            const number = index + 1;

            return (
              <Picker
                key={item._id}
                releaseTheModal={releaseTheModal}
                number={number}
                data={item}
              />
            );
          })}
        </div>
      )}

      <ModalPay
        error={{ muwaqif: muwaqifError, phone: phoneError }}
        showModal={showModal}
        setShowModal={setShowModal}
        phone={phone}
        setPhone={setPhone}
        wide={wide}
        setWide={setWide}
        muwaqif={muwaqif}
        setMuwaqif={setMuwaqif}
        buttonLoading={buttonLoading}
        reserve={addMuwaqif}
        data={currentData}
      />
    </div>
  );
}
