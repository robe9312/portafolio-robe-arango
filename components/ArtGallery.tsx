

import React, { useState } from 'react';
import type { Artwork } from '../types';

interface ArtGalleryProps {
    artworks: Artwork[];
    onArtworkSelect: (artwork: Artwork) => void;
}

const ArtworkCard: React.FC<{ artwork: Artwork; onArtworkSelect: (artwork: Artwork) => void; index: number }> = ({ artwork, onArtworkSelect, index }) => {
    const [imageError, setImageError] = useState(false);
    
    return (
        <div 
            key={artwork.id} 
            className="group relative overflow-hidden rounded-lg cursor-pointer shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 aspect-square"
            onClick={() => onArtworkSelect(artwork)}
            style={{ animation: `fadeInUp 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) ${index * 0.1}s forwards`, opacity: 0 }}
        >
            {imageError ? (
                <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-center p-4">
                    <svg className="w-12 h-12 text-slate-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <p className="text-slate-500 text-sm font-medium">No se pudo cargar la imagen</p>
                </div>
            ) : (
                 <img 
                    src={artwork.imageUrl} 
                    alt={artwork.title} 
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    onError={() => setImageError(true)}
                />
            )}
            {!imageError && (
                 <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
                    <div className="absolute inset-0 flex items-end p-4">
                        <div className="text-white w-full transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                            <h3 className="font-serif font-bold text-xl truncate">{artwork.title}</h3>
                            <p className="text-sm text-slate-200">{artwork.year}</p>
                             <div 
                                className="border-t border-slate-200/50 my-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" 
                                style={{transitionDelay: '150ms'}}
                            ></div>
                            <div 
                                className="text-xs text-slate-300 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                                style={{transitionDelay: '250ms'}}
                            >
                                <p className="truncate">
                                    <span className="font-semibold">Medio:</span> {artwork.medium}
                                </p>
                                <p className="truncate">
                                    <span className="font-semibold">Dimensiones:</span> {artwork.dimensions}
                                </p>
                            </div>
                        </div>
                    </div>
                 </>
            )}
        </div>
    )
}

const ArtGallery: React.FC<ArtGalleryProps> = ({ artworks, onArtworkSelect }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {artworks.map((artwork, index) => (
                <ArtworkCard 
                    key={artwork.id}
                    artwork={artwork}
                    onArtworkSelect={onArtworkSelect}
                    index={index}
                />
            ))}
        </div>
    );
};

export default ArtGallery;