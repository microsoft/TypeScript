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
exports.__esModule = true;
//// [Card.js]
"use strict";
exports.__esModule = true;
exports["default"] = (function (suit, rank) { return ({ suit: suit, rank: rank }); });
//// [index.js]
"use strict";
exports.__esModule = true;
exports.lazyCard = void 0;
var lazyCard = function () { return Promise.resolve().then(function () { return require('./Card'); }).then(function (a) { return a["default"]; }); };
exports.lazyCard = lazyCard;


//// [Types.d.ts]
declare type Suit = 'Hearts' | 'Spades' | 'Clubs' | 'Diamonds';
declare type Rank = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'Jack' | 'Queen' | 'King';
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
