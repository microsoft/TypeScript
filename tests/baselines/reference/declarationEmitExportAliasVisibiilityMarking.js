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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazyCard = void 0;
let lazyCard = () => Promise.resolve().then(() => __importStar(require('./Card'))).then(a => a.default);
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
