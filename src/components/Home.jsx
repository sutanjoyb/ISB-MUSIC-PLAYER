import React, { useContext, useEffect, useRef, useState } from "react";
import { songsData } from "../content";
import "../App.css";
import gif from "../assets/gif.gif";
import { MdOutlineSkipPrevious } from "react-icons/md";
import { GiNextButton } from "react-icons/gi";
import { datacontext } from "../context/UserContext";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import Card from "./Card";

const Home = () => {
  let {
    nextsong,
    prevsong,
    audioRef,
    playingsong,
    playsong,
    pausesong,
    index,
  } = useContext(datacontext);
  const [range, setrange] = useState(0);
  let progress = useRef(0);

  useEffect(() => {
    const updateprg = () => {
      let duration = audioRef.current.duration || 0;
      let currentTime = audioRef.current.currentTime || 0;
      let progressPer = (currentTime / duration) * 100 || 0;
      setrange(progressPer);
      if (progress.current) {
        progress.current.style.width = `${progressPer}%`;
      }
    };
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateprg);
    }
  }, [audioRef]);

  const [arrow, setarrow] = useState(false);

  function handrg(e) {
    let nextrange = e.target.value;
    setrange(nextrange);
    let duration = audioRef.current.duration;
    audioRef.current.currentTime = (duration * nextrange) / 100;
  }

  const currentSong = songsData[index];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-neutral-950 via-black to-neutral-950 flex flex-col relative overflow-hidden pb-40 pt-20 md:pt-28 px-4 md:px-16 gap-6 md:gap-8">
      <FaCaretDown
        className={`absolute text-white top-20 left-[4%] text-[28px] md:hidden cursor-pointer z-40 transition-transform ${arrow ? "-rotate-90" : ""}`}
        onClick={() => setarrow((prev) => !prev)}
      />

      <div className="flex justify-center w-full">
        <h1 className="text-white/90 font-bold text-xs md:text-sm tracking-wider uppercase bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg text-center">
          Made with ❤️ by INDERJEET
        </h1>
      </div>

      <div className="w-full relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 bg-neutral-900 flex flex-col md:flex-row items-center justify-between p-5 md:p-8 gap-6 md:gap-0">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={currentSong.image}
            alt=""
            className="w-full h-full object-cover blur-3xl opacity-30 scale-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5 w-full md:w-2/3 text-center sm:text-left">
          <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-2xl border border-white/20 shrink-0 relative">
            <img
              src={currentSong.image}
              alt=""
              className={`w-full h-full object-cover transition-all ${
                playingsong ? "animate-spin [animation-duration:10s]" : ""
              }`}
            />
            {playingsong && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                <img src={gif} alt="" className="w-10 sm:w-12 opacity-90" />
              </div>
            )}
          </div>

          <div className="flex flex-col items-center sm:items-start gap-1.5 w-full overflow-hidden">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold">
              Featured Track
            </span>
            <h2 className="text-white text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight truncate max-w-full sm:max-w-[350px]">
              {currentSong.name}
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm md:text-base font-medium truncate max-w-full">
              {currentSong.singer}
            </p>

            <div className="w-full max-w-sm flex items-center gap-3 mt-2">
              <span className="text-[11px] text-neutral-400">
                {audioRef.current
                  ? Math.floor(audioRef.current.currentTime / 60) +
                    ":" +
                    String(
                      Math.floor(audioRef.current.currentTime % 60),
                    ).padStart(2, "0")
                  : "0:00"}
              </span>
              <div className="flex-1 flex justify-center items-center relative rounded-full bg-neutral-800 h-1.5 shadow-inner overflow-hidden cursor-pointer">
                <input
                  type="range"
                  className="absolute inset-0 appearance-none w-full h-full opacity-0 cursor-pointer z-20"
                  value={range}
                  id="range"
                  onChange={handrg}
                />
                <div
                  className="bg-rose-500 h-full absolute left-0 rounded-full pointer-events-none z-10 shadow-[0_0_10px_rgba(244,63,94,0.6)]"
                  ref={progress}
                ></div>
              </div>
              <span className="text-[11px] text-neutral-400">3:30</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3 sm:gap-4 mt-2 md:mt-0">
          <button
            onClick={prevsong}
            className="p-3 rounded-2xl bg-black/40 border border-white/10 hover:border-rose-500/50 hover:bg-black/60 transition-all cursor-pointer text-white shadow-lg"
          >
            <MdOutlineSkipPrevious className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {!playingsong ? (
            <button
              onClick={() => playsong()}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white flex justify-center items-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_10px_30px_rgba(244,63,94,0.5)]"
            >
              <FaPlay className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />
            </button>
          ) : (
            <button
              onClick={() => pausesong()}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white flex justify-center items-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_10px_30px_rgba(244,63,94,0.5)]"
            >
              <FaPause className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          <button
            onClick={nextsong}
            className="p-3 rounded-2xl bg-black/40 border border-white/10 hover:border-rose-500/50 hover:bg-black/60 transition-all cursor-pointer text-white shadow-lg"
          >
            <GiNextButton className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <h2 className="text-neutral-400 font-semibold text-xs uppercase tracking-wider px-2">
          All Songs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {songsData.map((song) => (
            <div
              key={song.id}
              className="bg-neutral-900/40 hover:bg-neutral-900/80 border border-white/5 p-2 rounded-2xl transition-all shadow-lg backdrop-blur-sm"
            >
              <Card
                name={song.name}
                image={song.image}
                singer={song.singer}
                songIndex={song.id - 1}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
