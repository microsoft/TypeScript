//// [tests/cases/conformance/types/intersection/intersectionsAndEmptyObjects.ts] ////

//// [intersectionsAndEmptyObjects.ts]
// Empty object type literals are removed from intersections types
// that contain other object types

type A = { a: number };
type B = { b: string };
type C = {};

let x01: A & B;
let x02: A & C;
let x03: B & C;
let x04: A & B & C;
let x05: string & C;
let x06: C & string;
let x07: C;
let x08: C & {};
let x09: {} & A & {} & B & {} & C & {};

interface D {}
interface E {}

let x10: A & D;
let x11: C & D;
let x12: A & B & C & D;
let x13: D & E;
let x14: A & B & C & D & E;

// Repro from #20225

type Dictionary = { [name: string]: string };

const intersectDictionaries = <F1 extends Dictionary, F2 extends Dictionary>(
  d1: F1,
  d2: F2,
): F1 & F2 => Object.assign({}, d1, d2);

const testDictionary = <T extends Dictionary>(_value: T) => { };

const d1 = {};
testDictionary(d1);
const d2 = intersectDictionaries(d1, d1);
testDictionary(d2);

const d3 = {
  s: '',
};
testDictionary(d3);
const d4 = intersectDictionaries(d1, d3);
testDictionary(d4);
const d5 = intersectDictionaries(d3, d1);
testDictionary(d5);
const d6 = intersectDictionaries(d3, d3);
testDictionary(d6);

// Repro from #27044

type choices<IChoiceList extends {
    [key: string]: boolean;
}> = IChoiceList & {
    shoes:boolean;
    food:boolean;
};

type IMyChoiceList = {
    car: true
};

type IUnknownChoiceList = {};

var defaultChoices: choices<{}>;
var defaultChoicesAndEmpty: choices<{} & {}>;

var myChoices: choices<IMyChoiceList>;
var myChoicesAndEmpty: choices<IMyChoiceList & {}>;

var unknownChoices: choices<IUnknownChoiceList>;
var unknownChoicesAndEmpty: choices<IUnknownChoiceList & {}>;

// Repro from #38672

type Foo1 = { x: string } & { [x: number]: Foo1 };
type Foo2 = { x: string } & { [K in number]: Foo2 };

// Repro from #40239

declare function mock<M>(_: Promise<M>): {} & M;
mock(import('./ex'))

//// [ex.d.ts]
export {}


//// [intersectionsAndEmptyObjects.js]
// Empty object type literals are removed from intersections types
// that contain other object types
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
let x01;
let x02;
let x03;
let x04;
let x05;
let x06;
let x07;
let x08;
let x09;
let x10;
let x11;
let x12;
let x13;
let x14;
const intersectDictionaries = (d1, d2) => Object.assign({}, d1, d2);
const testDictionary = (_value) => { };
const d1 = {};
testDictionary(d1);
const d2 = intersectDictionaries(d1, d1);
testDictionary(d2);
const d3 = {
    s: '',
};
testDictionary(d3);
const d4 = intersectDictionaries(d1, d3);
testDictionary(d4);
const d5 = intersectDictionaries(d3, d1);
testDictionary(d5);
const d6 = intersectDictionaries(d3, d3);
testDictionary(d6);
var defaultChoices;
var defaultChoicesAndEmpty;
var myChoices;
var myChoicesAndEmpty;
var unknownChoices;
var unknownChoicesAndEmpty;
mock(Promise.resolve().then(() => __importStar(require('./ex'))));
