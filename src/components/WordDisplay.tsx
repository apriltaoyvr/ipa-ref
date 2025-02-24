import { WordInfoType } from "@/types/wiktionary";

export default function WordDisplay({wordInfo}: {wordInfo: WordInfoType}) {
  const { word, ipa } = wordInfo;

  if (!wordInfo) {
    return(
      <div>
        <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2'>No word found</h2>
      </div>
    );
  }

  else return(
      <div>
        <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2 capitalize'>{word}</h2>
        <ul>
          {ipa?.map((entry, index) => (
              <li key={index.toString() + entry.dialects}>
                <span>{entry.pronunciations.join(', ')}{' '}</span>
                <strong>{entry.dialects && `(${entry.dialects?.join(', ')})`}</strong>
              </li>
            ))
          }
        </ul>
      </div>
  )
}