import { type Section } from 'mwn/build/wikitext';
import type { IPAType } from '@/types/wiktionary';

/**
 * Extracts IPA data from the English Wiktionary
 */
export function extractIPA(sections: Section[]): IPAType[] | null {
  let ipaContent = findIPAData(sections);
  if (!ipaContent) return null;
  return processEnglishIPATemplates(ipaContent);
}

// Searches for English sections with IPA pronunciation
function findIPAData(sections: Section[]): string[] | null {
  const languageSection = sections.findIndex(
    (section) =>
      section.level === 2 && section.header?.toLowerCase() === 'english',
  );

  if (languageSection === -1) return null;

  // Find the pronunciation (IPA) sections
  let ipaContent = [];
  for (let i = languageSection + 1; i < sections.length; i++) {
    const section = sections[i];
    // Stop if we reach a new language section
    if (section.level === 2) break;
    // All pronunciation sections have the header "pronunciation"
    if (section.header?.toLowerCase().includes('pronunciation')) {
      ipaContent.push(section.content);
      break;
    }
  }

  return ipaContent.length > 0 ? ipaContent : null;
}

// Processes English IPA templates from Wiktionary content
function processEnglishIPATemplates(
  pronunciationSections: string[],
): IPAType[] {
  const results = [];
  for (const section of pronunciationSections) {
    const ipaTemplatesArray = section.match(/\{\{IPA\|[^}]+\}\}/g) || [];
    const parsedTemplates = ipaTemplatesArray
      .map((template) => {
        const templateRegex =
          /\{\{IPA\|([^|]+)\|((?:\/[^|]+\/|\[[^|]+\])(?:\|(?:\/[^|]+\/|\[[^|]+\]))*)\s*(?:\|a=([^}]+))?\}\}/;
        const matches = template.match(templateRegex);

        if (!matches) return null;

        const [, , pronunciationsStr, dialectStr] = matches;
        const IPA: IPAType = {
          pronunciations: pronunciationsStr.split('|').map((p) => p.trim()),
          dialects: dialectStr
            ? dialectStr.split(',').map((d) => d.trim())
            : [],
        };

        return IPA;
      })
      .filter((ipa): ipa is IPAType => ipa !== null);
    results.push(parsedTemplates);
  }
  return results.flat();
}
