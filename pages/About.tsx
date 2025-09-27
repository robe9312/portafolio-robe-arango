import React, { useState } from 'react';
import { useInView } from '../components/useInView';
import { 
    ARTIST_NAME, 
    ABOUT_TEXT, 
    EDUCATION, 
    PROFESSIONAL_EXPERIENCE, 
    EXHIBITIONS_LIST, 
    SKILLS 
} from '../constants';

const Section: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div>
        <h2 className="font-serif text-2xl font-bold text-terracotta-500 mb-4 border-b-2 border-terracotta-500/20 pb-2">{title}</h2>
        {children}
    </div>
);

const About: React.FC = () => {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadCV = async () => {
        setIsDownloading(true);
        try {
            // Dynamically import the PDF generator.
            // The browser will handle loading jspdf via the import map.
            const { generateAndDownloadPdf } = await import('../utils/cvGenerator');
            generateAndDownloadPdf();
        } catch (error) {
            console.error("Error generating CV:", error);
            alert('No se pudo descargar el CV. Inténtalo de nuevo más tarde.');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <section 
            ref={ref}
            id="sobre-mi" 
            className={`bg-white py-24 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Sobre Mí</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
                    <div className="lg:col-span-1 flex flex-col items-center gap-8 lg:sticky lg:top-28">
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                            <div className="absolute -inset-2 bg-terracotta-500 rounded-lg transform rotate-[-3deg]"></div>
                            <img 
                                src={inView ? "https://picsum.photos/seed/artist/200/200" : ""} 
                                alt={ARTIST_NAME} 
                                className="relative w-full h-full object-cover rounded-lg shadow-lg"
                            />
                        </div>
                         <div className="w-full text-center">
                            <button 
                                type="button"
                                onClick={handleDownloadCV}
                                disabled={isDownloading}
                                className="inline-flex items-center justify-center gap-2 border border-terracotta-500 text-terracotta-500 font-bold py-2 px-6 uppercase tracking-widest text-xs rounded-md transition-all duration-300 transform hover:bg-terracotta-500 hover:text-white hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isDownloading ? (
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                )}
                                {isDownloading ? 'Generando...' : 'Descargar CV (PDF)'}
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-10">
                         <Section title="Perfil">
                            <p className="text-slate-600 leading-relaxed">
                                {ABOUT_TEXT.bio}
                            </p>
                        </Section>

                        <Section title="Formación Académica">
                            <ul className="space-y-4">
                                {EDUCATION.map((edu, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <div className="text-terracotta-500 mt-1 w-6 h-6 flex-shrink-0">
                                            {edu.icon}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-800">{edu.degree} {edu.year && `(${edu.year})`}</p>
                                            <p className="text-slate-500">{edu.institution}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Section>

                        <Section title="Experiencia Profesional (Arte)">
                            <ul className="space-y-6 text-slate-600">
                                {PROFESSIONAL_EXPERIENCE.map((exp, index) => (
                                    <li key={index} className="border-l-2 border-slate-200 pl-4">
                                        <p className="font-semibold text-slate-800">{exp.title} <span className="text-slate-400 font-mono text-sm ml-2">{exp.period}</span></p>
                                        <p className="mt-1">{exp.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </Section>
                        
                        <Section title="Distinciones y Exhibiciones">
                             <ul className="list-disc list-inside space-y-2 text-slate-600">
                                {EXHIBITIONS_LIST.map((item, index) => (
                                    <li key={index}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </Section>

                        <Section title="Habilidades">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {SKILLS.map((skill, index) => (
                                    <div key={index}>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="text-terracotta-500 w-6 h-6 flex-shrink-0">
                                                {skill.icon}
                                            </div>
                                            <h4 className="font-semibold text-slate-800 text-lg">{skill.category}</h4>
                                        </div>
                                        <ul className="list-disc list-inside space-y-1 text-slate-600 pl-9">
                                            {skill.items.map((item, i) => <li key={i}>{item}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
