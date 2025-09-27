import React, { useState, FormEvent } from 'react';
import { useInView } from '../components/useInView';
import { CONTACT_EMAIL, CONTACT_PHONE, SOCIAL_LINKS } from '../constants';

// --- Components ---

const ContactInfoItem: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex items-start space-x-4">
        <div className="text-terracotta-500 mt-1 flex-shrink-0 w-6 h-6">{icon}</div>
        <div>
            <h3 className="text-lg font-serif font-semibold text-slate-800">{title}</h3>
            <div className="text-slate-600">{children}</div>
        </div>
    </div>
);

const FormInput: React.FC<{
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
}> = ({ id, label, type, value, onChange, error, required }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-semibold text-slate-700 mb-1">
            {label} {required && <span className="text-terracotta-500">*</span>}
        </label>
        <input
            id={id}
            name={id}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`block w-full px-3 py-2 bg-white border ${error ? 'border-red-500' : 'border-slate-300'} rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-terracotta-500 focus:border-terracotta-500 sm:text-sm transition-colors`}
        />
        {error && <p id={`${id}-error`} className="mt-1 text-sm text-red-600" aria-live="polite">{error}</p>}
    </div>
);

const FormTextarea: React.FC<{
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
    required?: boolean;
}> = ({ id, label, value, onChange, error, required }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-semibold text-slate-700 mb-1">
            {label} {required && <span className="text-terracotta-500">*</span>}
        </label>
        <textarea
            id={id}
            name={id}
            rows={4}
            value={value}
            onChange={onChange}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`block w-full px-3 py-2 bg-white border ${error ? 'border-red-500' : 'border-slate-300'} rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-terracotta-500 focus:border-terracotta-500 sm:text-sm transition-colors`}
        />
        {error && <p id={`${id}-error`} className="mt-1 text-sm text-red-600" aria-live="polite">{error}</p>}
    </div>
);

// --- Main Component ---

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

const Contact: React.FC = () => {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });
    
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = (): FormErrors => {
        const newErrors: FormErrors = {};
        if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio.';
        if (!formData.email.trim()) {
            newErrors.email = 'El correo electrónico es obligatorio.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'El formato del correo electrónico no es válido.';
        }
        if (!formData.subject.trim()) newErrors.subject = 'El asunto es obligatorio.';
        if (!formData.message.trim()) newErrors.message = 'El mensaje es obligatorio.';
        
        return newErrors;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setStatus('submitting');
            // Simulate API call
            setTimeout(() => {
                console.log('Form submitted:', formData);
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000); // Reset status after 5s
            }, 1500);
        }
    };

    return (
        <section 
            ref={ref}
            id="contacto" 
            className={`bg-slate-100 py-24 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Contacto</h1>
                    <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                        Para consultas sobre obras, comisiones, talleres o cualquier otra propuesta, no dudes en contactarme.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 bg-white rounded-lg p-8 shadow-lg">
                    {/* --- Form Column --- */}
                    <div className="space-y-6">
                        <h2 className="font-serif text-2xl font-bold text-slate-800">Enviar un Mensaje</h2>
                        
                        {status === 'success' ? (
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md" role="alert">
                                <p className="font-bold">¡Mensaje enviado!</p>
                                <p>Gracias por contactarme. Te responderé lo antes posible.</p>
                            </div>
                        ) : (
                             <form onSubmit={handleSubmit} noValidate className="space-y-4">
                                <FormInput id="name" label="Nombre Completo" type="text" value={formData.name} onChange={handleChange} error={errors.name} required />
                                <FormInput id="email" label="Correo Electrónico" type="email" value={formData.email} onChange={handleChange} error={errors.email} required />
                                <FormInput id="subject" label="Asunto" type="text" value={formData.subject} onChange={handleChange} error={errors.subject} required />
                                <FormTextarea id="message" label="Mensaje" value={formData.message} onChange={handleChange} error={errors.message} required />
                                
                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="inline-flex items-center justify-center w-full bg-terracotta-500 text-white font-bold py-2 px-6 uppercase tracking-widest text-sm rounded-md transition-all duration-300 transform hover:bg-terracotta-600 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-terracotta-500"
                                >
                                    {status === 'submitting' ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                            </svg>
                                            Enviando...
                                        </>
                                    ) : 'Enviar Mensaje'}
                                </button>
                                {status === 'error' && <p className="mt-2 text-sm text-red-600">Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.</p>}
                            </form>
                        )}
                    </div>
                    
                    {/* --- Info Column --- */}
                    <div className="space-y-8">
                        <h2 className="font-serif text-2xl font-bold text-slate-800">Otras formas de contactar</h2>
                        <div className="space-y-6">
                            <ContactInfoItem 
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>}
                                title="Email"
                            >
                                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-terracotta-500 transition-colors hover:underline">
                                    {CONTACT_EMAIL}
                                </a>
                            </ContactInfoItem>

                            <ContactInfoItem 
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.98z"></path></svg>}
                                title="Teléfono"
                            >
                                <p>{CONTACT_PHONE}</p>
                            </ContactInfoItem>
                            
                            <ContactInfoItem 
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>}
                                title="Ubicación"
                            >
                                <p>Guinea Ecuatorial <br/>(Visitas con cita previa)</p>
                            </ContactInfoItem>
                        </div>
                        <div className="border-t border-slate-200"></div>
                        <div>
                             <p className="text-center md:text-left text-slate-800 font-semibold mb-4">Sígueme en redes</p>
                            <div className="flex justify-center md:justify-start space-x-6">
                                {SOCIAL_LINKS.map(link => (
                                    <a 
                                        key={link.name} 
                                        href={link.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-slate-400 hover:text-terracotta-500 transition-all duration-300 transform hover:scale-110"
                                        aria-label={link.name}
                                    >
                                        {React.cloneElement(link.icon as React.ReactElement<React.SVGAttributes<SVGSVGElement>>, { width: 28, height: 28 })}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
