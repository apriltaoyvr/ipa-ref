export type WikionaryReturnType = {
  word: string;
  ipa: WiktionaryIPAType[] | null;
}

export type WiktionaryIPAType = {
  pronunciations: string[];
  dialects?: string[];
};
