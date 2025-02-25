export interface IMerriamWebster {
  hwi: {
    hw: string;
    prs: Array<{
      ipa: string;
      sound?: {
        audio: string;
      };
    }>;
  };
  shortdef: string[];
}
