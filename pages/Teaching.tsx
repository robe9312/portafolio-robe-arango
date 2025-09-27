import React from 'react';
import { useInView } from '../components/useInView';
import { TEACHING_EXPERIENCES, TEACHING_PHILOSOPHY, TEACHING_QUOTE } from '../constants';
import type { TeachingInfo } from '../types';

const TeachingCard: React.FC<{ experience: TeachingInfo, index: number }> = ({ experience, index }) => (
    <div 
        className="bg-white p-6 rounded-lg shadow-md border border-slate-200/50"
        style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.15}s forwards`, opacity: 0 }}
    >
        <h3 className="text-xl font-serif font-bold text-terracotta-500">{experience.title}</h3>
        <p className="text-md text-slate-600 mt-1">{experience.institution}</p>
        <p className="text-sm text-slate-400 font-mono mt-1">{experience.period}</p>
        <p className="text-slate-600 mt-4 leading-relaxed">{experience.description}</p>
    </div>
);

const Teaching: React.FC = () => {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    return (
        <section 
            ref={ref}
            id="docencia" 
            className={`bg-slate-100 py-24 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Docencia</h1>
                    <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                        Compartir el conocimiento y fomentar la creatividad es una parte fundamental de mi práctica artística.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    <div className="lg:col-span-1 lg:sticky lg:top-28">
                        <div className="bg-white/50 p-6 rounded-lg border border-slate-200">
                            <h2 className="font-serif text-2xl font-bold text-slate-800 mb-4">Filosofía Artística</h2>
                            <blockquote className="border-l-4 border-terracotta-500 pl-4 italic text-slate-700 text-lg my-6">
                                {TEACHING_QUOTE}
                            </blockquote>
                            <p className="text-slate-600 leading-relaxed">
                                {TEACHING_PHILOSOPHY}
                            </p>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-2">
                        <div className="space-y-8">
                            {TEACHING_EXPERIENCES.map((exp, index) => (
                                <TeachingCard key={index} experience={exp} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Teaching;
