// @lib: es2015
// @declaration: true
// @filename: Types.ts
type Suit = 'Hearts' | 'Spades' | 'Clubs' | 'Diamonds';
type Rank = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'Jack' | 'Queen' | 'King';
export { Suit, Rank };

// @filename: Card.ts
import { Suit, Rank } from './Types';
export default (suit: Suit, rank: Rank) => ({suit, rank});

// @filename: index.ts
export let lazyCard = () => import('./Card').then(a => a.default);
export { Suit, Rank } from './Types';
