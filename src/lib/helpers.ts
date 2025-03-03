import { IMerriamWebster, PronunciationObject } from '@/types/merriam-webster';

/**  
 * Filters Merriam-Webster results to only include unique results with IPA transcriptions and combine duplicate pronunciations
 * 
 * @param {Object[] | null} merriamArray - Array of Merriam-Webster results
 * @param {string} word - Word to filter results by
 * @returns {PronunciationObject[] | null} filteredResults[] - Array of unique results with IPA transcriptions
 * @returns {string} filteredResults[].ipa - IPA transcription of the word
 * @returns {string} filteredResults[].ipa.sound.audio - Filename of the pronunciation audio file
*/

export function filterMerriamPrs(merriamArray: IMerriamWebster[] | null, word: string): PronunciationObject[] | null {
  if (!merriamArray || merriamArray.length === 0) return null;

  const regex = new RegExp(`${word}+(:[0-9]+)?$`)

  // Ensure the results match the word exactly (MW returns related words), then return prs or altprs which contain IPA transcriptions
  const wordsThatMatch = merriamArray?.filter(({ meta }) => word && meta?.id.match(regex)).flatMap(({hwi}) => hwi.prs || hwi.altprs || []);

  if (wordsThatMatch.length === 0) return null;

  // Remove duplicates
  const set = new Set(wordsThatMatch);
  const ipaMap = new Map();

  set.forEach(item => {
    const key = item.ipa;
    
    if (!ipaMap.has(key)) {
      ipaMap.set(key, { ...item });
    } else {
      ipaMap.set(key, { ...ipaMap.get(key), ...item });
    }
  });

  const results = Array.from(ipaMap.values());

  // console.log('Merriam Array', merriamArray);
  // console.log('Words that match', wordsThatMatch);
  // console.log('Filtered results', results);

  return [...results];
}