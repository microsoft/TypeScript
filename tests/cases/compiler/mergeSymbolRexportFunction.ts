// @moduleResolution: node

// @filename: main.ts
import {Row} from '.'
Row();

// @filename: ./a.d.ts
import '.'
declare module '.' {
  const Row: () => void;
}

// @filename: ./index.d.ts
export type {Row} from './common';

// @filename: ./common.d.ts
export declare function Row(): void; 