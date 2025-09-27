import { 
    ARTIST_NAME, 
    ARTIST_TITLE,
    CONTACT_EMAIL,
    CONTACT_PHONE,
    ABOUT_TEXT, 
    EDUCATION, 
    PROFESSIONAL_EXPERIENCE, 
    TEACHING_EXPERIENCES,
    EXHIBITIONS_LIST, 
    SKILLS 
} from '../constants.js';

// Dynamically import jsPDF to keep the main bundle small
async function getJsPDF() {
    const { default: jsPDF } = await import('https://esm.sh/jspdf@2.5.1');
    return jsPDF;
}

// This function will be dynamically imported.
export const generateAndDownloadPdf = async () => {
    const jsPDF = await getJsPDF();
    const doc = new jsPDF();
    
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    let y = margin;
    const terracottaColor = '#D05A43';

    const checkPageBreak = (neededHeight) => {
        if (y + neededHeight > pageHeight - margin) {
            doc.addPage();
            y = margin;
        }
    };

    const addSectionTitle = (title) => {
        checkPageBreak(20);
        y += 10;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(terracottaColor);
        doc.text(title, margin, y);
        y += 4;
        doc.setDrawColor(terracottaColor);
        doc.setLineWidth(0.5);
        doc.line(margin, y, margin + 50, y);
        y += 8;
        doc.setTextColor(0, 0, 0);
    };
    
    const addBodyText = (text) => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const lines = doc.splitTextToSize(text, contentWidth);
        checkPageBreak(lines.length * 5);
        doc.text(lines, margin, y);
        y += lines.length * 5;
    };

    // === HEADER ===
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text(ARTIST_NAME, pageWidth / 2, y, { align: 'center' });
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const artistTitle = ARTIST_TITLE.split(' / ')[0];
    if (artistTitle) {
        doc.text(artistTitle, pageWidth / 2, y, { align: 'center' });
    }
    y += 8;
    
    doc.text(`${CONTACT_EMAIL} | ${CONTACT_PHONE}`, pageWidth / 2, y, { align: 'center' });
    y += 5;
    doc.setDrawColor(200);
    doc.line(margin, y, pageWidth - margin, y);

    // === PERFIL ===
    addSectionTitle('Perfil');
    addBodyText(ABOUT_TEXT.bio);

    // === FORMACIÓN ACADÉMICA ===
    addSectionTitle('Formación Académica');
    doc.setFontSize(10);
    EDUCATION.forEach(edu => {
        checkPageBreak(10);
        doc.setFont('helvetica', 'bold');
        doc.text(`• ${edu.degree}`, margin, y);
        y += 5;
        doc.setFont('helvetica', 'normal');
        doc.text(edu.institution, margin + 5, y);
        y += 7;
    });

    // === EXPERIENCIA PROFESIONAL (ARTE) ===
    addSectionTitle('Experiencia Profesional (Arte)');
    doc.setFontSize(10);
    PROFESSIONAL_EXPERIENCE.forEach(exp => {
        checkPageBreak(20);
        doc.setFont('helvetica', 'bold');
        doc.text(exp.title, margin, y);
        doc.setFont('helvetica', 'italic');
        doc.text(exp.period, pageWidth - margin, y, { align: 'right' });
        y += 5;
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(exp.description, contentWidth);
        doc.text(lines, margin, y);
        y += lines.length * 5 + 5;
    });

    // === EXPERIENCIA DOCENTE ===
    addSectionTitle('Experiencia Docente');
    doc.setFontSize(10);
    TEACHING_EXPERIENCES.forEach(exp => {
        checkPageBreak(20);
        doc.setFont('helvetica', 'bold');
        doc.text(exp.title, margin, y);
        doc.setFont('helvetica', 'italic');
        doc.text(exp.period, pageWidth - margin, y, { align: 'right' });
        y += 5;
        doc.setFont('helvetica', 'normal');
        doc.text(exp.institution, margin, y);
        y += 5;
        const lines = doc.splitTextToSize(exp.description, contentWidth);
        doc.text(lines, margin, y);
        y += lines.length * 5 + 5;
    });
    
    // === HABILIDADES ===
    addSectionTitle('Habilidades');
    doc.setFontSize(10);
    SKILLS.forEach(skill => {
        checkPageBreak(15);
        doc.setFont('helvetica', 'bold');
        doc.text(skill.category, margin, y);
        y += 5;
        doc.setFont('helvetica', 'normal');
        skill.items.forEach(item => {
            const lines = doc.splitTextToSize(`• ${item}`, contentWidth - 5);
            doc.text(lines, margin + 5, y);
            y += lines.length * 5;
        });
        y += 3;
    });
    
    // === DISTINCIONES Y EXHIBICIONES ===
    addSectionTitle('Distinciones y Exhibiciones');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    EXHIBITIONS_LIST.forEach(item => {
        checkPageBreak(10);
        const lines = doc.splitTextToSize(`• ${item}`, contentWidth - 5);
        doc.text(lines, margin + 5, y);
        y += lines.length * 5;
    });

    doc.save('Robe_Arango_CV.pdf');
};
