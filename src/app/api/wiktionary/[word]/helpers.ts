import type { Section } from 'mwn/build/wikitext';
import type { WiktionaryIPAType } from '@/types/wiktionary';

/**
 * Filters and parses Wiktionary sections in Wikimedia format for English IPA data using two helper functions
 *
 * @param {Section[]} sections - Wiktionary sections
 * @returns {(WiktionaryIPAType[] | null)} - IPA data (IPA transcription, dialect)
 */
export function extractIPA(sections: Section[]): WiktionaryIPAType[] | null {
  const ipaContent = filterSections(sections);
  if (!ipaContent) return null;
  return processEnglishIPATemplates(ipaContent);
}

/**
 * Filters sections in Wiktionary pages for English sections, then filters them down to the pronunciation sections
 *
 * @param {Section[]} sections - Wikimedia section templates (as strings)
 * @returns {(string[] | null)} - Wikitext of the English pronunciation sections as an array of strings
 */
function filterSections(sections: Section[]): string[] | null {
  // Find the first English section and work from there; we are assuming languages will have a section header level of 2
  const languageSection = sections.findIndex(
    (section) =>
      section.level === 2 && section.header?.toLowerCase() === 'english',
  );

  if (languageSection === -1) return null;

  const ipaContent = [];
  
  // Find the pronunciation (IPA) sections
  for (let i = languageSection + 1; i < sections.length; i++) {
    const section = sections[i];
    // Stop if we reach a new language section
    if (section.level === 2) break;
    // All pronunciation sections have the header "pronunciation", so we look for that
    if (section.header?.toLowerCase().includes('pronunciation')) {
      ipaContent.push(section.content);
      break;
    }
  }

  // Return all matching pronunciation sections
  return ipaContent.length > 0 ? ipaContent : null;
}

/**
 * Parses Wikimedia templates (as strings) from Wiktionary into an array of IPA objects
 *
 * @param {string[]} sections - Wikimedia section templates (as strings)
 * @returns {WiktionaryIPAType[]} - IPA data (IPA transcription, dialect)
 */
function processEnglishIPATemplates(
  pronunciationSections: string[],
): WiktionaryIPAType[] {
  // TODO: Create another filter for audio files
  const results = [];

  for (const section of pronunciationSections) {
    // Filter for IPA templates in the wikimedia text
    const ipaTemplatesArray = section.match(/\{\{IPA\|[^}]+\}\}/g) || [];

    /* 
      Parse the IPA templates into an array of IPA objects
      Example: {{IPA|en|/ɪə̯/|;|[ɪː]|[iː.ə]|a=RP}} -> { pronunciations: ['/ɪə̯/','[ɪː]', '[iː.ə]'], dialects: ['RP'] }
      NOTE: Sometimes the dialect key is attached to the enPR template instead; I'll add that as a consideration in the future for this parser
    */
    const parsedTemplates = ipaTemplatesArray
      .map((template) => {
        // Hellish Regex; I don't fully understand it honestly but it grabs transcriptions and dialects from the IPA wikimedia templates
        const templateRegex =
          /\{\{IPA\|([^|]+)\|((?:\/[^|]+\/|\[[^|]+\])(?:\|(?:\/[^|]+\/|\[[^|]+\]))*)\s*(?:\|a=([^}]+))?(?:\|[^=}]+=[^|}]*)*\}\}/;
        const matches = template.match(templateRegex);

        if (!matches) return null;

        // Grab only IPA transcriptions and dialects for a pronunciation match; the IPA template is full of other stuff
        const [, , pronunciationsStr, dialectStr] = matches;
        const IPA: WiktionaryIPAType = {
          pronunciations: pronunciationsStr.split('|').map((p) => p.trim()),
          dialects: dialectStr
            ? dialectStr.split(',').map((d) => d.trim())
            : [],
        };

        return IPA;
      })
      .filter((ipa): ipa is WiktionaryIPAType => ipa !== null);

    results.push(parsedTemplates);
  }
  return results.flat();
}
