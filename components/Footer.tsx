
import React from 'react';
import { ARTIST_NAME, SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
    return (
        <footer className="bg-transparent border-t border-slate-200">
            <div className="container mx-auto px-6 py-8 text-center text-slate-500">
                <div className="flex justify-center space-x-6 mb-4">
                    {SOCIAL_LINKS.map((link) => (
                       <a 
                           key={link.name} 
                           href={link.url}
                           target="_blank"
                           rel="noopener noreferrer"
                           aria-label={link.name}
                           className="text-slate-400 hover:text-terracotta-500 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                       >
                            {link.icon}
                       </a>
                    ))}
                </div>
                <p className="text-sm">&copy; {new Date().getFullYear()} {ARTIST_NAME}. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
