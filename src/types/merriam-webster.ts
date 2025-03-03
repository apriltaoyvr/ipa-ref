export interface IMerriamWebster {
  meta: {
    id: string;
    uuid: string;
    src: string;
    section: string;
    target: {
      tuuid: string;
      tsrc: string;
    };
    highlight?: string;
    stems: string[];
    "app-shortdef": {
      hw: string;
      fl: string;
      def: string[];
    };
    offensive: boolean;
  };
  hom?: number;
  hwi: {
    hw: string;
    prs?: PronunciationObject[];
    altprs?: PronunciationObject[];
  };
  fl: string;
  lbs?: string[];
  ins?: {
    il: string;
    ifc: string;
    if: string;
  }[];
  def: {
    sseq: [string, {
      sn?: string;
      sgram?: string;
      dt?: [string, any][];
    }][][];
  }[];
  dros?: {
    drp: string;
    def: {
      sseq: [string, {
        sn?: string;
        sgram?: string;
        dt?: [string, any][];
      }][][];
    }[];
  }[];
  shortdef: string[];
}
export type PronunciationObject = {
  ipa: string;
  sound?: {
    audio: string;
  };
}