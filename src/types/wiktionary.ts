export type APIReturnType = {
  word: string;
  ipa: IPAType[] | null;
}

export type IPAType = {
  language?: string;
  pronunciations: string[];
  dialects?: string[];
};
