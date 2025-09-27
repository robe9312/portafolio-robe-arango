import {
    ARTIST_NAME, ARTIST_TITLE, CONTACT_EMAIL, CONTACT_PHONE, SOCIAL_LINKS,
    PLASTIC_ARTWORKS, AUDIOVISUAL_WORKS, TEACHING_EXPERIENCES, ABOUT_TEXT,
    EDUCATION, PROFESSIONAL_EXPERIENCE, EXHIBITIONS_LIST, SKILLS, TEACHING_QUOTE,
    TEACHING_PHILOSOPHY
} from './constants.js';

document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENT SELECTORS ---
    const mainHeader = document.getElementById('main-header');
    const headerContainer = document.getElementById('header-container');
    const logoLink = document.getElementById('logo-link');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const mobileMenu = document.getElementById('mobile-menu');
    const desktopNav = document.getElementById('desktop-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // --- RENDER FUNCTIONS ---

    const renderTextContent = () => {
        document.getElementById('artist-name-logo').textContent = ARTIST_NAME;
        document.getElementById('artist-name-hero').textContent = ARTIST_NAME;
        document.getElementById('artist-title-hero').textContent = ARTIST_TITLE;
        document.getElementById('teaching-quote-hero').textContent = `“${TEACHING_QUOTE}”`;
        document.getElementById('teaching-quote-philosophy').textContent = TEACHING_QUOTE;
        document.getElementById('teaching-philosophy').textContent = TEACHING_PHILOSOPHY;
        document.getElementById('artist-image').alt = ARTIST_NAME;
        document.getElementById('about-bio').textContent = ABOUT_TEXT.bio;
        document.getElementById('footer-year').textContent = new Date().getFullYear();
        document.getElementById('footer-artist-name').textContent = ARTIST_NAME;
    };
    
    const renderSocialLinks = (container) => {
        container.innerHTML = SOCIAL_LINKS.map(link => `
            <a 
               key="${link.name}" 
               href="${link.url}"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="${link.name}"
               class="text-slate-400 hover:text-terracotta-500 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
                ${link.icon}
            </a>
        `).join('');
    };

    const renderPortfolioItems = (items, type) => {
        const grid = document.getElementById('portfolio-grid');
        grid.innerHTML = items.map((item, index) => {
            const isVideo = 'embedUrl' in item;
            const imageUrl = isVideo ? `https://i.ytimg.com/vi/${item.embedUrl.split('/').pop()}/hqdefault.jpg` : item.imageUrl;
            const medium = isVideo ? 'Video' : item.medium;

            return `
                <div class="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 portfolio-card" 
                     data-id="${item.id}" data-type="${type}" style="transition-delay: ${index * 50}ms; opacity: 0; transform: translateY(1.25rem);">
                    <div class="relative overflow-hidden h-56">
                        <img src="${imageUrl}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    </div>
                    <div class="p-5">
                        <h3 class="font-serif text-xl font-bold text-slate-800 truncate">${item.title}</h3>
                        <p class="text-terracotta-500 mt-1 font-mono text-sm">${item.year} / ${medium}</p>
                        <p class="mt-3 text-slate-600 leading-relaxed text-sm line-clamp-2">
                            ${item.description}
                        </p>
                    </div>
                </div>
            `;
        }).join('');
    };

    const renderTeachingExperience = () => {
        const list = document.getElementById('teaching-experience-list');
        list.innerHTML = TEACHING_EXPERIENCES.map((exp, index) => `
            <div class="bg-white p-6 rounded-lg shadow-md border border-slate-200/50" style="animation: fadeInUp 0.5s ease-out ${index * 0.15}s forwards; opacity: 0">
                <h3 class="text-xl font-serif font-bold text-terracotta-500">${exp.title}</h3>
                <p class="text-md text-slate-600 mt-1">${exp.institution}</p>
                <p class="text-sm text-slate-400 font-mono mt-1">${exp.period}</p>
                <p class="text-slate-600 mt-4 leading-relaxed">${exp.description}</p>
            </div>
        `).join('');
    };

    const renderAboutPage = () => {
        document.getElementById('education-list').innerHTML = EDUCATION.map(edu => `
            <li class="flex items-start gap-4">
                <div class="text-terracotta-500 mt-1 w-6 h-6 flex-shrink-0">${edu.icon}</div>
                <div>
                    <p class="font-semibold text-slate-800">${edu.degree} ${edu.year ? `(${edu.year})` : ''}</p>
                    <p class="text-slate-500">${edu.institution}</p>
                </div>
            </li>
        `).join('');

        document.getElementById('experience-list').innerHTML = PROFESSIONAL_EXPERIENCE.map(exp => `
            <li class="border-l-2 border-slate-200 pl-4">
                <p class="font-semibold text-slate-800">${exp.title} <span class="text-slate-400 font-mono text-sm ml-2">${exp.period}</span></p>
                <p class="mt-1">${exp.description}</p>
            </li>
        `).join('');

        document.getElementById('exhibitions-list').innerHTML = EXHIBITIONS_LIST.map(item => `<li>${item}</li>`).join('');

        document.getElementById('skills-list').innerHTML = SKILLS.map(skill => `
            <div>
                <div class="flex items-center gap-3 mb-3">
                    <div class="text-terracotta-500 w-6 h-6 flex-shrink-0">${skill.icon}</div>
                    <h4 class="font-semibold text-slate-800 text-lg">${skill.category}</h4>
                </div>
                <ul class="list-disc list-inside space-y-1 text-slate-600 pl-9">
                    ${skill.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    };
    
    const renderContactInfo = () => {
        const contactList = document.getElementById('contact-info-list');
        const socialContainer = document.getElementById('contact-social-links');
        
        contactList.innerHTML = `
            <div class="flex items-start space-x-4">
                <div class="text-terracotta-500 mt-1 flex-shrink-0 w-6 h-6">${SKILLS[1].icon}</div>
                <div>
                    <h3 class="text-lg font-serif font-semibold text-slate-800">Email</h3>
                    <a href="mailto:${CONTACT_EMAIL}" class="hover:text-terracotta-500 transition-colors hover:underline">${CONTACT_EMAIL}</a>
                </div>
            </div>
            <div class="flex items-start space-x-4">
                 <div class="text-terracotta-500 mt-1 flex-shrink-0 w-6 h-6"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.98z"></path></svg></div>
                <div>
                    <h3 class="text-lg font-serif font-semibold text-slate-800">Teléfono</h3>
                    <p>${CONTACT_PHONE}</p>
                </div>
            </div>
        `;
        socialContainer.innerHTML = SOCIAL_LINKS.map(link => `
             <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-terracotta-500 transition-all duration-300 transform hover:scale-110" aria-label="${link.name}">
                ${link.icon}
            </a>
        `).join('');
    };


    // --- THEME LOGIC ---
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            moonIcon.setAttribute('class', 'absolute inset-0 transition-all duration-500 ease-in-out translate-y-0 opacity-100 rotate-0');
            sunIcon.setAttribute('class', 'absolute inset-0 transition-all duration-500 ease-in-out -translate-y-full opacity-0 -rotate-45');
            themeToggleBtn.setAttribute('aria-label', 'Activar modo claro');
        } else {
            document.documentElement.classList.remove('dark');
            moonIcon.setAttribute('class', 'absolute inset-0 transition-all duration-500 ease-in-out translate-y-full opacity-0 rotate-45');
            sunIcon.setAttribute('class', 'absolute inset-0 transition-all duration-500 ease-in-out translate-y-0 opacity-100 rotate-0');
            themeToggleBtn.setAttribute('aria-label', 'Activar modo oscuro');
        }
    };

    themeToggleBtn.addEventListener('click', () => {
        const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    // --- HEADER LOGIC ---
    const handleScroll = () => {
        const isScrolled = window.scrollY > 10;
        mainHeader.classList.toggle('bg-slate-50/80', isScrolled);
        mainHeader.classList.toggle('backdrop-blur-lg', isScrolled);
        mainHeader.classList.toggle('shadow-md', isScrolled);
        mainHeader.classList.toggle('bg-transparent', !isScrolled);
        headerContainer.classList.toggle('py-2', isScrolled);
        headerContainer.classList.toggle('py-4', !isScrolled);
        logoLink.classList.toggle('scale-95', isScrolled);
        logoLink.classList.toggle('scale-100', !isScrolled);
    };

    const toggleMobileMenu = () => {
        const isOpen = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isOpen);
        mobileMenu.classList.toggle('max-h-96', !isOpen);
        mobileMenu.classList.toggle('opacity-100', !isOpen);
        mobileMenu.classList.toggle('max-h-0', isOpen);
        mobileMenu.classList.toggle('opacity-0', isOpen);
        mobileMenuIcon.setAttribute('d', isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12");
    };

    const handleNavClick = (e) => {
        e.preventDefault();
        const sectionId = e.currentTarget.getAttribute('href').substring(1);
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = mainHeader.offsetHeight;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
        if (mobileMenuBtn.getAttribute('aria-expanded') === 'true') {
            toggleMobileMenu();
        }
    };
    
    const handleScrollSpy = () => {
        const scrollPosition = window.scrollY;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - mainHeader.offsetHeight - 20;

            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                const currentId = current.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('text-terracotta-500', link.getAttribute('data-section') === currentId);
                    link.classList.toggle('text-slate-900', link.getAttribute('data-section') !== currentId);
                });
            }
        });
    };

    // --- PORTFOLIO LOGIC ---
    const plasticTabBtn = document.getElementById('plastic-tab-btn');
    const audiovisualTabBtn = document.getElementById('audiovisual-tab-btn');
    let currentPortfolioView = 'plastic';

    const switchPortfolioView = (view) => {
        currentPortfolioView = view;
        if (view === 'plastic') {
            plasticTabBtn.setAttribute('class', 'px-6 py-2 text-sm font-semibold rounded-md transition-all duration-300 uppercase tracking-widest bg-terracotta-500 text-white shadow-sm');
            audiovisualTabBtn.setAttribute('class', 'px-6 py-2 text-sm font-semibold rounded-md transition-all duration-300 uppercase tracking-widest bg-transparent text-slate-500 hover:bg-slate-200 hover:text-slate-900');
            renderPortfolioItems(PLASTIC_ARTWORKS, 'plastic');
        } else {
            audiovisualTabBtn.setAttribute('class', 'px-6 py-2 text-sm font-semibold rounded-md transition-all duration-300 uppercase tracking-widest bg-terracotta-500 text-white shadow-sm');
            plasticTabBtn.setAttribute('class', 'px-6 py-2 text-sm font-semibold rounded-md transition-all duration-300 uppercase tracking-widest bg-transparent text-slate-500 hover:bg-slate-200 hover:text-slate-900');
            renderPortfolioItems(AUDIOVISUAL_WORKS, 'audiovisual');
        }
        observeFadeInUpElements(); // Re-observe new items
    };

    plasticTabBtn.addEventListener('click', () => switchPortfolioView('plastic'));
    audiovisualTabBtn.addEventListener('click', () => switchPortfolioView('audiovisual'));
    
    // --- MODAL LOGIC ---
    const modal = document.getElementById('modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    
    const openModal = (item) => {
        const isVideo = 'embedUrl' in item;
        document.getElementById('modal-title').textContent = item.title;
        document.getElementById('modal-year').textContent = item.year;
        document.getElementById('modal-description').textContent = item.description;

        if (isVideo) {
            document.getElementById('modal-media').innerHTML = `
                <div class="aspect-w-16 aspect-h-9 w-full">
                    <iframe src="${item.embedUrl}" title="${item.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full h-full rounded-md"></iframe>
                </div>`;
            document.getElementById('modal-details').innerHTML = `<p><strong>Duración:</strong> ${item.duration}</p>`;
        } else {
            document.getElementById('modal-media').innerHTML = `<img src="${item.imageUrl}" alt="${item.title}" class="w-full h-full object-contain rounded-md" />`;
            document.getElementById('modal-details').innerHTML = `<p><strong>Medio:</strong> ${item.medium}</p><p><strong>Dimensiones:</strong> ${item.dimensions}</p>`;
        }
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        modalCloseBtn.focus();
    };

    const closeModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    };

    document.getElementById('portfolio-grid').addEventListener('click', (e) => {
        const card = e.target.closest('.portfolio-card');
        if (card) {
            const id = parseInt(card.dataset.id);
            const type = card.dataset.type;
            const collection = type === 'plastic' ? PLASTIC_ARTWORKS : AUDIOVISUAL_WORKS;
            const item = collection.find(i => i.id === id);
            if (item) openModal(item);
        }
    });

    modal.addEventListener('click', closeModal);
    modal.querySelector('#modal-content').addEventListener('click', e => e.stopPropagation());
    modalCloseBtn.addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
    });

    // --- ABOUT PAGE LOGIC ---
    const downloadCvBtn = document.getElementById('download-cv-btn');
    const cvBtnContent = document.getElementById('cv-btn-content');
    
    downloadCvBtn.addEventListener('click', async () => {
        downloadCvBtn.disabled = true;
        cvBtnContent.innerHTML = `
            <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            Generando...
        `;
        try {
            const { generateAndDownloadPdf } = await import('./utils/cvGenerator.js');
            generateAndDownloadPdf();
        } catch (error) {
            console.error("Error generating CV:", error);
            alert('No se pudo descargar el CV. Inténtalo de nuevo más tarde.');
        } finally {
            downloadCvBtn.disabled = false;
            cvBtnContent.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Descargar CV (PDF)
            `;
        }
    });

    // --- CONTACT FORM LOGIC ---
    const form = document.getElementById('contact-form');
    const formContainer = document.getElementById('form-container');
    const submitBtn = document.getElementById('form-submit-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        let hasErrors = false;

        // Reset errors
        document.querySelectorAll('[id$="-error"]').forEach(el => el.textContent = '');

        if (!data.name.trim()) {
            document.getElementById('name-error').textContent = 'El nombre es obligatorio.';
            hasErrors = true;
        }
        if (!data.email.trim()) {
            document.getElementById('email-error').textContent = 'El correo electrónico es obligatorio.';
            hasErrors = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            document.getElementById('email-error').textContent = 'El formato del correo electrónico no es válido.';
            hasErrors = true;
        }
        if (!data.subject.trim()) {
            document.getElementById('subject-error').textContent = 'El asunto es obligatorio.';
            hasErrors = true;
        }
        if (!data.message.trim()) {
            document.getElementById('message-error').textContent = 'El mensaje es obligatorio.';
            hasErrors = true;
        }

        if (!hasErrors) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Enviando...
            `;

            setTimeout(() => {
                formContainer.innerHTML = `
                    <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md" role="alert">
                        <p class="font-bold">¡Mensaje enviado!</p>
                        <p>Gracias por contactarme. Te responderé lo antes posible.</p>
                    </div>
                `;
            }, 1500);
        }
    });


    // --- SCROLL ANIMATIONS ---
    let observer;
    const observeFadeInUpElements = () => {
        const targets = document.querySelectorAll('.fade-in-up, .portfolio-card');
        if (observer) observer.disconnect();
        
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in-view');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        targets.forEach(target => observer.observe(target));
    };

    // --- INITIALIZATION ---
    const init = () => {
        renderTextContent();
        renderSocialLinks(document.getElementById('footer-social-links'));
        renderTeachingExperience();
        renderAboutPage();
        renderContactInfo();
        
        const mobileNavContainer = document.getElementById('mobile-nav');
        mobileNavContainer.innerHTML = desktopNav.innerHTML;
        const mobileThemeToggle = themeToggleBtn.cloneNode(true);
        mobileThemeToggle.id = 'mobile-theme-toggle';
        mobileNavContainer.insertAdjacentHTML('beforeend', '<div class="pt-4"></div>');
        mobileNavContainer.lastChild.appendChild(mobileThemeToggle);

        mobileThemeToggle.addEventListener('click', themeToggleBtn.click);

        document.querySelectorAll('#mobile-nav a').forEach(link => link.addEventListener('click', handleNavClick));
        document.querySelectorAll('#desktop-nav a').forEach(link => link.addEventListener('click', handleNavClick));
        logoLink.addEventListener('click', handleNavClick);
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('scroll', handleScrollSpy, { passive: true });
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);

        switchPortfolioView('plastic'); // Initial portfolio view

        const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        applyTheme(currentTheme);

        observeFadeInUpElements();
    };

    init();
});