//// [tests/cases/compiler/declarationEmitExportAliasVisibiilityMarking.ts] ////

//// [Types.ts]
type Suit = 'Hearts' | 'Spades' | 'Clubs' | 'Diamonds';
type Rank = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'Jack' | 'Queen' | 'King';
export { Suit, Rank };

//// [Card.ts]
import { Suit, Rank } from './Types';
export default (suit: Suit, rank: Rank) => ({suit, rank});

//// [index.ts]
export let lazyCard = () => import('./Card').then(a => a.default);
export { Suit, Rank } from './Types';


//// [Types.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [Card.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (suit, rank) => ({ suit, rank });
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazyCard = void 0;
let lazyCard = () => Promise.resolve().then(() => require('./Card')).then(a => a.default);
exports.lazyCard = lazyCard;


//// [Types.d.ts]
type Suit = 'Hearts' | 'Spades' | 'Clubs' | 'Diamonds';
type Rank = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'Jack' | 'Queen' | 'King';
export { Suit, Rank };
//// [Card.d.ts]
import { Suit, Rank } from './Types';
declare const _default: (suit: Suit, rank: Rank) => {
    suit: Suit;
    rank: Rank;
};
export default _default;
//// [index.d.ts]
export declare let lazyCard: () => Promise<(suit: import("./Types").Suit, rank: import("./Types").Rank) => {
    suit: import("./Types").Suit;
    rank: import("./Types").Rank;
}>;
export { Suit, Rank } from './Types';
