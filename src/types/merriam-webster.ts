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
    highlight: string;
    stems: string[];
    "app-shortdef": {
      hw: string;
      fl: string;
      def: string[];
    };
    offensive: boolean;
  };
  hwi: {
    hw: string;
    prs: Array<{
      ipa: string;
      sound?: {
        audio: string;
      };
    }>;
  };
  fl: string;
  ins: Array<{
    il: string;
    if: string;
  }>;
  def: Array<{
    sseq: Array<
      Array<
        [
          string,
          {
            dt: Array<
              | ["text", string]
              | ["wsgram", string]
              | ["vis", Array<{ t: string }>]
              | ["uns", Array<[["text", string], ["vis", Array<{ t: string }>]]>]
              | ["snote", Array<["t", string, string, Array<{ t: string }>]>]
            >;
          }
        ]
      >
    >;
  }>;
  dros: Array<{
    drp: string;
    def: Array<{
      sseq: Array<
        Array<
          [
            string,
            {
              dt: Array<["text", string] | ["vis", Array<{ t: string }>]>;
            }
          ]
        >
      >;
    }>;
  }>;
  shortdef: string[];
}
