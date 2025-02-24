import { type Section } from 'mwn/build/wikitext';
import type { IPAType } from '@/types/wiktionary';

export function extractPronunciation(
  sections: Section[],
  targetLanguage: string
): IPAType[] | null {
  // Find the language section first
  const languageSection = sections.findIndex(
    section => 
      section.level === 2 && 
      section.header?.toLowerCase() === targetLanguage
  );

  if (languageSection === -1) {
    return null;
  }

  // Find the pronunciation section within the language section
  let pronunciationContent = '';
  
  // Look through subsequent sections until we hit another level 2 section
  for (let i = languageSection + 1; i < sections.length; i++) {
    const section = sections[i];
    
    // Stop if we hit another language section
    if (section.level === 2) {
      break;
    }

    // Found pronunciation section
    if (
      section.level === 3 && 
      section.header?.toLowerCase().includes('pronunciation')
    ) {
      pronunciationContent = section.content;
      break;
    }
  }

  if (!pronunciationContent) {
    return null;
  }

  return processIPATemplates(pronunciationContent);
}

function processIPATemplates(content: string): IPAType[] {
  const ipaTemplates = content.match(/\{\{IPA\|[^}]+\}\}/g) || [];
  
  return ipaTemplates
    .map((template) => {
      const templateRegex =
        /\{\{IPA\|([^|]+)\|((?:\/[^|]+\/|\[[^|]+\])(?:\|(?:\/[^|]+\/|\[[^|]+\]))*)\s*(?:\|a=([^}]+))?\}\}/;
      const matches = template.match(templateRegex);

      if (!matches) return null;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [, _lang, pronunciationsStr, dialectStr] = matches;

      const IPA: IPAType = {
        pronunciations: pronunciationsStr.split('|').map((p) => p.trim()),
        dialects: dialectStr ? dialectStr.split(',').map((d) => d.trim()) : [],
      };

      return IPA;
    })
    .filter((ipa): ipa is IPAType => ipa !== null);
}