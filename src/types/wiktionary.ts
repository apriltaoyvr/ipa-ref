export type APIReturnType = {
  word: string;
  ipa: IPAType[] | null;
}

export type IPAType = {
  pronunciations: string[];
  dialects?: string[];
};
