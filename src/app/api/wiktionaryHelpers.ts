import { type Section } from 'mwn/build/wikitext';
import type { IPAType } from '@/types/wiktionary';

/**
 * Extracts IPA data from the English Wiktionary
 */
export function extractIPA(sections: Section[]): IPAType[] | null {
  // Find the index of the first English section
  const languageSection = sections.findIndex(
    (section) =>
      section.level === 2 && section.header?.toLowerCase() === 'english',
  );

  if (languageSection === -1) return null;

  // Find the pronunciation (IPA) sections
  let ipaContent = '';
  for (let i = languageSection + 1; i < sections.length; i++) {
    const section = sections[i];
    // Stop if we reach a new language section
    if (section.level === 2) break;
    // All pronunciation sections are level 3 and contain the word "pronunciation"
    if (
      section.level === 3 &&
      section.header?.toLowerCase().includes('pronunciation')
    ) {
      ipaContent = section.content;
      break;
    }
  }

  if (!ipaContent) return null;
  return processEnglishIPATemplates(ipaContent);
}

/**
 * Processes English IPA templates from Wiktionary content
 */
function processEnglishIPATemplates(content: string): IPAType[] {
  const ipaTemplates = content.match(/\{\{IPA\|[^}]+\}\}/g) || [];

  return ipaTemplates
    .map((template) => {
      const templateRegex =
        /\{\{IPA\|([^|]+)\|((?:\/[^|]+\/|\[[^|]+\])(?:\|(?:\/[^|]+\/|\[[^|]+\]))*)\s*(?:\|a=([^}]+))?\}\}/;
      const matches = template.match(templateRegex);

      if (!matches) return null;

      const [, , pronunciationsStr, dialectStr] = matches;

      const IPA: IPAType = {
        pronunciations: pronunciationsStr.split('|').map((p) => p.trim()),
        dialects: dialectStr ? dialectStr.split(',').map((d) => d.trim()) : [],
      };

      return IPA;
    })
    .filter((ipa): ipa is IPAType => ipa !== null);
}
