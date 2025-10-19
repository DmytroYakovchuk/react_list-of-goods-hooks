import React, { useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export enum SortKind {
  Default,
  Alphabet,
  Length,
}

export const App: React.FC = () => {
  const [sortKind, setSortKind] = useState<SortKind>(SortKind.Default);
  const [reversed, setReversed] = useState<boolean>(false);

  const goods = useMemo(() => {
    let sorted = [...goodsFromServer];

    switch (sortKind) {
      case SortKind.Alphabet:
        sorted.sort((a, b) => a.localeCompare(b));
        break;
      case SortKind.Length:
        sorted.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }

    if (reversed) {
      sorted.reverse();
    }

    return sorted;
  }, [sortKind, reversed]);
  const sortAlphabet = () => setSortKind(SortKind.Alphabet);
  const sortByLength = () => setSortKind(SortKind.Length);
  const toggleReverse = () => setReversed(prev => !prev);
  const resetList = () => {
    setSortKind(SortKind.Default);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortKind === SortKind.Alphabet ? '' : 'is-light'}`}
          onClick={sortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortKind === SortKind.Length ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {(sortKind !== SortKind.Default || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetList}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
