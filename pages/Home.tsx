import React from 'react';
import { ARTIST_NAME, ARTIST_TITLE, TEACHING_QUOTE } from '../constants';

const Home: React.FC = () => {
  return (
    <section id="inicio" className="relative h-screen min-h-[700px] flex items-center justify-center text-center bg-home-gradient overflow-hidden">
      <div className="relative z-10 p-6 flex flex-col items-center justify-center w-full max-w-4xl space-y-6">
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-slate-900 tracking-tight leading-none">
            {ARTIST_NAME}
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            {ARTIST_TITLE}
        </p>
        <div className="w-24 h-px bg-terracotta-500 my-4"></div>
        <p className="font-serif text-xl md:text-2xl text-slate-700 italic max-w-3xl">
            “{TEACHING_QUOTE}”
        </p>
      </div>
       <a 
          href="#portfolio"
          className="absolute bottom-10 z-20 animate-bounce text-slate-500 transition-transform duration-300 hover:scale-125 hover:text-terracotta-500"
          aria-label="Ir a portafolio"
       >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
        </a>
    </section>
  );
};

export default Home;