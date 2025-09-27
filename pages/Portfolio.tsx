import React, { useState } from 'react';
import { useInView } from '../components/useInView';
import Modal from '../components/Modal';
import { PLASTIC_ARTWORKS, AUDIOVISUAL_WORKS } from '../constants';
import type { Artwork, VideoWork } from '../types';

enum PortfolioView {
    Plastic,
    Audiovisual
}

const PortfolioCard: React.FC<{ item: Artwork; onSelect: (work: Artwork | VideoWork) => void; index: number; }> = ({ item, onSelect, index }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div
            ref={ref}
            className={`bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: `${index * 50}ms`, transitionProperty: 'opacity, transform' }}
            onClick={() => onSelect(item)}
        >
            <div className="relative overflow-hidden h-56">
                {imageError ? (
                    <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-center p-4">
                        <svg className="w-12 h-12 text-slate-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <p className="text-slate-500 text-sm font-medium">No se pudo cargar la imagen</p>
                    </div>
                ) : (
                    <img src={inView ? item.imageUrl : ''} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={handleImageError} />
                )}
            </div>
            <div className="p-5">
                <h3 className="font-serif text-xl font-bold text-slate-800 truncate">{item.title}</h3>
                <p className="text-terracotta-500 mt-1 font-mono text-sm">{item.year} / {item.medium}</p>
                <p className="mt-3 text-slate-600 leading-relaxed text-sm line-clamp-2">
                    {item.description}
                </p>
            </div>
        </div>
    );
};

const Portfolio: React.FC = () => {
    const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
    const [view, setView] = useState<PortfolioView>(PortfolioView.Plastic);
    const [selectedItem, setSelectedItem] = useState<Artwork | VideoWork | null>(null);

    const handleItemSelect = (item: Artwork | VideoWork) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };
    
    const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode; }> = ({ active, onClick, children }) => (
        <button
            onClick={onClick}
            className={`px-6 py-2 text-sm font-semibold rounded-md transition-all duration-300 uppercase tracking-widest ${
                active ? 'bg-terracotta-500 text-white shadow-sm' : 'bg-transparent text-slate-500 hover:bg-slate-200 hover:text-slate-900'
            }`}
        >
            {children}
        </button>
    );

    return (
        <section 
            ref={ref}
            id="portfolio" 
            className={`bg-slate-50 py-24 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Portafolio</h1>
                    <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">Una selección de mi trabajo que abarca diferentes disciplinas y técnicas.</p>
                </div>

                <div className="flex justify-center space-x-2 md:space-x-4 mb-16 p-2 bg-slate-100 border border-slate-200 rounded-md max-w-sm mx-auto">
                    <TabButton active={view === PortfolioView.Plastic} onClick={() => setView(PortfolioView.Plastic)}>
                        Obra Plástica
                    </TabButton>
                    <TabButton active={view === PortfolioView.Audiovisual} onClick={() => setView(PortfolioView.Audiovisual)}>
                        Audiovisual
                    </TabButton>
                </div>

                <div key={view} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {view === PortfolioView.Plastic ? (
                        PLASTIC_ARTWORKS.map((artwork, index) => (
                            <PortfolioCard key={`plastic-${artwork.id}`} item={artwork} index={index} onSelect={handleItemSelect} />
                        ))
                    ) : (
                        AUDIOVISUAL_WORKS.map((video, index) => {
                             const artworkAdapter = {
                                ...video,
                                id: video.id,
                                imageUrl: `https://i.ytimg.com/vi/${video.embedUrl.split('/').pop()}/hqdefault.jpg`,
                                medium: 'Video',
                                dimensions: video.duration,
                             };
                             return (
                                <PortfolioCard key={`video-${video.id}`} item={artworkAdapter} index={index} onSelect={(_work) => handleItemSelect(video)} />
                             )
                        })
                    )}
                </div>
            </div>
            <Modal item={selectedItem} onClose={closeModal} />
        </section>
    );
};

export default Portfolio;
