'use client';

import { useState } from 'react';
import css from './SearchBox.module.css';

export default function SearchBox({
  onSearch,
}: {
  onSearch: (value: string) => void;
}) {
  const [value, setValue] = useState('');

  return (
    <div className={css.wrapper}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search notes..."
      />

      <button onClick={() => onSearch(value)}>
        Search
      </button>
    </div>
  );
}