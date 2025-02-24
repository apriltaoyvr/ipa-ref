export type WordInfoType = FillerType & {
  word: string;
}

type FillerType = {
  [key: string]: LanguageSectionType;
}

export type LanguageSectionInputType = {
  etymology: string | null;
  pronunciation: IPAType[] | null;
  definitions: { partOfSpeech: string; content: string }[];
  related: Record<string, string>;
};

export type LanguageSectionType = {
  etymology: string | null;
  ipa: IPAType[] | null;
  definitions: { partOfSpeech: string; content: string }[];
  related: Record<string, string>;
};

export type TemplateType = {
  ipa: IPAType[];
  audio: string[];
  rhymes: string[];
};

export type IPAType = {
  language?: string;
  pronunciations: string[];
  dialect?: string;
};
