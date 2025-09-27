import React, { useEffect, useRef } from 'react';
import type { Artwork, VideoWork } from '../types';

interface ModalProps {
    item: Artwork | VideoWork | null;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ item, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!item) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
            
            if (event.key === 'Tab' && modalRef.current) {
                const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (focusableElements.length === 0) return;

                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (event.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        event.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        event.preventDefault();
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        const firstFocusableElement = modalRef.current?.querySelector<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        firstFocusableElement?.focus();

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [item, onClose]);

    if (!item) return null;

    const isVideo = 'embedUrl' in item;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div 
                ref={modalRef}
                className="relative bg-white p-4 md:p-6 rounded-lg max-w-4xl max-h-[90vh] w-full animate-fade-in shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute -top-4 -right-4 h-9 w-9 bg-slate-800 text-white rounded-full flex items-center justify-center text-2xl font-bold z-10 hover:bg-terracotta-500 transition-all duration-300 transform hover:scale-110 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
                    aria-label="Cerrar"
                >
                    &times;
                </button>
                <div className="flex flex-col md:flex-row gap-6 max-h-[85vh]">
                    <div className="md:w-2/3 flex-shrink-0 bg-slate-100 flex items-center justify-center rounded-md">
                       {isVideo ? (
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <iframe 
                                    src={(item as VideoWork).embedUrl}
                                    title={item.title}
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                    className="w-full h-full rounded-md"
                                ></iframe>
                            </div>
                        ) : (
                           <img src={(item as Artwork).imageUrl} alt={item.title} className="w-full h-full object-contain rounded-md" />
                        )}
                    </div>
                    <div className="md:w-1/3 flex flex-col text-slate-800 overflow-y-auto">
                        <h3 id="modal-title" className="text-2xl font-serif font-bold text-terracotta-500">{item.title}</h3>
                        <p className="text-slate-500 mt-2 font-mono text-sm">{item.year}</p>
                        <div className="mt-4 text-slate-600 space-y-2">
                           {isVideo ? (
                                <p><strong>Duración:</strong> {(item as VideoWork).duration}</p>
                            ) : (
                                <>
                                <p><strong>Medio:</strong> {(item as Artwork).medium}</p>
                                <p><strong>Dimensiones:</strong> {(item as Artwork).dimensions}</p>
                                </>
                            )}
                        </div>
                        <div className="border-t border-slate-200 my-4"></div>
                        <p className="text-sm text-slate-500">
                           {item.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;