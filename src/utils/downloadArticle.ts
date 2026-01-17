import type { Article } from "@/shared/types/article";

/**
 * Funkcja do pobierania artykułu jako PDF
 * TODO: Zastąp tym prawdziwym wywołaniem API backendu gdy będzie gotowy
 * Przykład: const response = await fetch(`/api/articles/${article.id}/download`, {
 *   method: 'GET',
 *   headers: { 'Authorization': `Bearer ${token}` }
 * });
 * const blob = await response.blob();
 * const url = window.URL.createObjectURL(blob);
 * const a = document.createElement('a');
 * a.href = url;
 * a.download = `${article.title}.pdf`;
 * a.click();
 */
export async function downloadArticleAsPDF(article: Article): Promise<void> {
  try {
    // TODO: Zastąp tym prawdziwym wywołaniem API
    // const response = await fetch(`/api/articles/${article.id}/download`);
    // if (!response.ok) throw new Error('Nie udało się pobrać artykułu');
    // const blob = await response.blob();

    // Symulacja pobierania - generowanie prostego PDF z danymi artykułu
    // W rzeczywistej implementacji, backend powinien zwrócić plik PDF
    const pdfContent = generatePDFContent(article);
    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${sanitizeFileName(article.title)}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Błąd podczas pobierania artykułu:", error);
    throw new Error("Nie udało się pobrać artykułu. Spróbuj ponownie.");
  }
}

/**
 * Generuje prostą zawartość PDF (placeholder)
 * W rzeczywistości backend powinien generować pełny PDF
 */
function generatePDFContent(article: Article): string {
  // To jest uproszczona wersja - w rzeczywistości użyj biblioteki jak jsPDF lub backend powinien zwrócić PDF
  const content = `
%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica-Bold
>>
/F2 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
>>
>>
>>
endobj
4 0 obj
<<
/Length 200
>>
stream
BT
/F1 24 Tf
100 700 Td
(${article.title.replace(/[^\x20-\x7E]/g, "")}) Tj
0 -30 Td
/F2 12 Tf
(Autorzy: ${article.authors.join(", ").replace(/[^\x20-\x7E]/g, "")}) Tj
0 -20 Td
(DOI: ${article.doi}) Tj
0 -30 Td
/Abstract Tj
${article.abstract.substring(0, 500).replace(/[^\x20-\x7E]/g, "")}
ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000299 00000 n
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
400
%%EOF
  `;
  return content;
}

/**
 * Sanityzuje nazwę pliku, usuwając niebezpieczne znaki
 */
function sanitizeFileName(fileName: string): string {
  return fileName
    .replace(/[<>:"/\\|?*]/g, "")
    .replace(/\s+/g, "_")
    .substring(0, 100);
}

/**
 * Funkcja pomocnicza do pobierania artykułu w różnych formatach
 */
export async function downloadArticle(
  article: Article,
  format: "PDF" | "BibTeX" | "RIS" = "PDF",
): Promise<void> {
  switch (format) {
    case "PDF":
      await downloadArticleAsPDF(article);
      break;
    case "BibTeX":
      await downloadAsBibTeX(article);
      break;
    case "RIS":
      await downloadAsRIS(article);
      break;
    default:
      throw new Error(`Nieobsługiwany format: ${format}`);
  }
}

/**
 * Pobiera artykuł jako plik BibTeX
 */
async function downloadAsBibTeX(article: Article): Promise<void> {
  const bibtex = `@article{${article.doi.replace(/[^a-zA-Z0-9]/g, "")},
  title = {${article.title}},
  author = {${article.authors.join(" and ")}},
  journal = {AcademiaLink},
  year = {2024},
  doi = {${article.doi}},
  abstract = {${article.abstract}}
}`;

  const blob = new Blob([bibtex], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${sanitizeFileName(article.title)}.bib`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

/**
 * Pobiera artykuł jako plik RIS (Research Information Systems)
 */
async function downloadAsRIS(article: Article): Promise<void> {
  const ris = `TY  - JOUR
TI  - ${article.title}
AU  - ${article.authors.join("\nAU  - ")}
AB  - ${article.abstract}
DO  - ${article.doi}
PY  - 2024
ER  -`;

  const blob = new Blob([ris], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${sanitizeFileName(article.title)}.ris`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
