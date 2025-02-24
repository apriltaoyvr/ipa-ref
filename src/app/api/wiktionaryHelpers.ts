import { type Section } from 'mwn/build/wikitext';
import type {
  IPAType,
  LanguageSectionType
} from '@/types/wiktionary';

interface SectionWithLanguage extends Section {
  language: string;
}

// TODO: Filter by language
export function groupByLanguage(
  sections: SectionWithLanguage[]
): Record<string, LanguageSectionType> {
  const languageSections: Record<string, LanguageSectionType> = {};

  sections.forEach((section) => {
    // Section Level 2 is always a language section
    if (section.level === 2) {
      // Initialize language section
      initializeLanguageSection(languageSections, section.header || '');
    } else if (section.level > 2 && section.language) {
      // Initialize if not exists
      initializeLanguageSection(languageSections, section.language);

      // Process section based on type
      processSectionContent(
        languageSections[section.language],
        section,
        section.header?.toLowerCase() ?? ''
      );
    }
  });

  return languageSections;
}

export function formatLanguageSections(
  languageSections: Record<string, LanguageSectionType>
): Record<string, LanguageSectionType> {
  const filteredSections = Object.entries(languageSections).filter(
    ([, data]) =>
      data.etymology ||
      data.ipa ||
      data.definitions.length > 0 ||
      Object.keys(data.related).length > 0
  );

  const result = filteredSections.reduce((acc, [lang, data]) => {
    acc[lang] = data;
    return acc;
  }, {} as Record<string, LanguageSectionType>);
  return result;
}

function initializeLanguageSection(
  languageSections: Record<string, LanguageSectionType>,
  language: string
) {
  if (!languageSections[language]) {
    languageSections[language] = {
      etymology: null,
      ipa: null,
      definitions: [],
      related: {},
    };
  }
}

function processSectionContent(
  languageSection: LanguageSectionType,
  section: Section,
  sectionType: string
) {
  if (sectionType.includes('etymology')) {
    languageSection.etymology = section.content;
  } else if (sectionType.includes('pronunciation')) {
    languageSection.ipa = processIPATemplates(section.content);
  } else if (isDefinitionSection(sectionType)) {
    languageSection.definitions.push({
      partOfSpeech: section.header || '',
      content: section.content,
    });
  } else if (isRelatedSection(sectionType) && section.header) {
    languageSection.related[section.header] = section.content;
  }
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
    .filter((ipa) => ipa !== null);
}



function isDefinitionSection(sectionType: string): boolean {
  return [
    'definitions',
    'noun',
    'verb',
    'adjective',
    'adverb',
    'pronoun',
    'preposition',
    'conjunction',
    'interjection',
  ].some((type) => sectionType.includes(type));
}

function isRelatedSection(sectionType: string): boolean {
  return [
    'related',
    'synonyms',
    'antonyms',
    'derived',
    'coordinate terms',
    'hyponyms',
    'hypernyms',
  ].some((type) => sectionType.includes(type));
}
