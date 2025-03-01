import type { IMerriamWebster } from '@/types/merriam-webster';
import type { WordData } from './WordLookup';

const merriam: IMerriamWebster[] = [
  {
    meta: {
      id: 'example',
      uuid: '49d593b2-2b15-40c2-8d7b-b1e33ea58992',
      src: 'learners',
      section: 'alpha',
      target: {
        tuuid: '0fee002c-2fe3-4b07-84ff-02ff9515cc39',
        tsrc: 'collegiate',
      },
      highlight: 'yes',
      stems: [
        'example',
        'examples',
        'for example',
        'make an example of',
        'set an example',
        'lead by example',
      ],
      'app-shortdef': {
        hw: 'example',
        fl: 'noun',
        def: [
          '{bc} a person or way of behaving that is seen as a model that should be followed',
          '{bc} someone or something that is mentioned to help explain what you are saying or to show that a general statement is true',
          '{bc} something or someone chosen from a group in order to show what the whole group is like',
        ],
      },
      offensive: false,
    },
    hwi: {
      hw: 'ex*am*ple',
      prs: [
        {
          ipa: 'ɪgˈzæmpəl',
          sound: {
            audio: 'exampl01',
          },
        },
      ],
    },
    fl: 'noun',
    ins: [
      {
        il: 'plural',
        ifc: '-am*ples',
        if: 'ex*am*ples',
      },
    ],
    def: [
      {
        sseq: [
          [
            [
              'sense',
              {
                sn: '1',
                dt: [
                  [
                    'text',
                    '{bc}a person or way of behaving that is seen as a model that should be followed ',
                  ],
                  ['wsgram', 'count'],
                  [
                    'vis',
                    [
                      {
                        t: 'He was inspired by the {it}example{/it} of his older brother. [=he wanted to do what his older brother did]',
                      },
                      {
                        t: 'You should try to follow her {it}example{/it}. [=try to do as she does]',
                      },
                      {
                        t: 'Let that be an {it}example{/it} to you! [=let that show you what you should or should not do]',
                      },
                      {
                        t: 'He set a good/bad {it}example{/it} for the rest of us.',
                      },
                      {
                        t: "It's up to you to {phrase}set an example{/phrase}. [=to behave in a way that shows other people how to behave]",
                      },
                    ],
                  ],
                  ['wsgram', 'noncount'],
                  [
                    'vis',
                    [
                      {
                        t: 'She chooses to {phrase}lead by example{/phrase}. [=to lead by behaving in a way that shows others how to behave]',
                      },
                    ],
                  ],
                ],
              },
            ],
          ],
          [
            [
              'sen',
              {
                sn: '2',
                sgram: 'count',
              },
            ],
            [
              'sense',
              {
                sn: 'a',
                dt: [
                  [
                    'text',
                    '{bc}someone or something that is mentioned to help explain what you are saying or to show that a general statement is true ',
                  ],
                  [
                    'vis',
                    [
                      {
                        t: 'She gave/offered several {it}examples{/it} to show that the program is effective.',
                      },
                    ],
                  ],
                ],
              },
            ],
            [
              'sense',
              {
                sn: 'b',
                dt: [
                  [
                    'text',
                    '{bc}something or someone chosen from a group in order to show what the whole group is like ',
                  ],
                  [
                    'vis',
                    [
                      {
                        t: "We've chosen three {it}examples{/it} of contemporary architecture for closer study.",
                      },
                      {
                        t: 'a classic {it}example{/it} of a Persian rug',
                      },
                      {
                        t: "a fine/prime {it}example{/it} of the artist's work",
                      },
                    ],
                  ],
                ],
              },
            ],
          ],
          [
            [
              'sen',
              {
                sn: '3',
                sgram: 'count',
              },
            ],
            [
              'sense',
              {
                sn: 'a',
                dt: [
                  [
                    'text',
                    '{bc}a phrase or sentence that shows how a word is used ',
                  ],
                  [
                    'vis',
                    [
                      {
                        t: 'The dictionary includes thousands of {it}examples{/it}.',
                      },
                    ],
                  ],
                ],
              },
            ],
            [
              'sense',
              {
                sn: 'b',
                dt: [
                  [
                    'text',
                    '{bc}something (such as a problem that a student has to solve) that is used to teach how a rule or process works ',
                  ],
                  [
                    'vis',
                    [
                      {
                        t: 'arithmetic {it}examples{/it}',
                      },
                    ],
                  ],
                ],
              },
            ],
          ],
        ],
      },
    ],
    dros: [
      {
        drp: 'for example',
        def: [
          {
            sseq: [
              [
                [
                  'sense',
                  {
                    dt: [
                      [
                        'uns',
                        [
                          [
                            [
                              'text',
                              'used when you are mentioning a specific person or thing that helps to explain what you are saying or to show that a general statement is true ',
                            ],
                            [
                              'vis',
                              [
                                {
                                  t: 'Things are getting better. Last year, {it}for example{/it} [={it}for instance{/it}], the company achieved record sales in Europe.',
                                },
                                {
                                  t: 'It was obvious that her memory was failing. {it}For example{/it}, she would often forget where she put her car keys.',
                                },
                                {
                                  t: 'A lot of my friends were there—John and Linda, {it}for example{/it}.',
                                },
                              ],
                            ],
                          ],
                        ],
                      ],
                    ],
                  },
                ],
              ],
            ],
          },
        ],
      },
      {
        drp: 'make an example of',
        def: [
          {
            sseq: [
              [
                [
                  'sense',
                  {
                    dt: [
                      [
                        'snote',
                        [
                          [
                            't',
                            'If you {it}make an example of{/it} a person who has done something wrong, you punish that person as a way of warning other people not to do the same thing.',
                          ],
                          [
                            'vis',
                            [
                              {
                                t: 'Although it was only his first offense, the judge decided to {it}make an example of him{/it} and sentence him to prison.',
                              },
                            ],
                          ],
                        ],
                      ],
                    ],
                  },
                ],
              ],
            ],
          },
        ],
      },
    ],
    shortdef: [
      'a person or way of behaving that is seen as a model that should be followed',
      'someone or something that is mentioned to help explain what you are saying or to show that a general statement is true',
      'something or someone chosen from a group in order to show what the whole group is like',
    ],
  },
];

export const defaultState: WordData = {
  word: 'Example',
  merriam,
  wiktionary: {
    ipa: [
      {
        pronunciations: ['/ɪɡˈzɑːm.pəl/'],
        dialects: ['RP'],
      },
      {
        pronunciations: ['/ɪɡˈzam.pəl/'],
        dialects: ['Northern England', 'Scotland'],
      },
      {
        pronunciations: ['/ɪɡˈzæm.pəl/', '[ɪɡˈzɛəmpəɫ]'],
        dialects: ['US'],
      },
      {
        pronunciations: ['/əɡˈzæm.pəl/'],
        dialects: ['US', 'Australia', 'weak vowel'],
      },
      {
        pronunciations: ['/əɡˈzaːm.pəl/', '[ɘɡˈzɐːmpɯ]'],
        dialects: ['NZ'],
      },
    ],
  },
};
