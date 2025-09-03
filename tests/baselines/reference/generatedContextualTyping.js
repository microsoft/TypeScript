//// [tests/cases/conformance/expressions/contextualTyping/generatedContextualTyping.ts] ////

//// [generatedContextualTyping.ts]
class Base { private p; }
class Derived1 extends Base { private m; }
class Derived2 extends Base { private n; }
interface Genric<T> { func(n: T[]); }
var b = new Base(), d1 = new Derived1(), d2 = new Derived2();
var x1: () => Base[] = () => [d1, d2];
var x2: () => Base[] = function() { return [d1, d2] };
var x3: () => Base[] = function named() { return [d1, d2] };
var x4: { (): Base[]; } = () => [d1, d2];
var x5: { (): Base[]; } = function() { return [d1, d2] };
var x6: { (): Base[]; } = function named() { return [d1, d2] };
var x7: Base[] = [d1, d2];
var x8: Array<Base> = [d1, d2];
var x9: { [n: number]: Base; } = [d1, d2];
var x10: {n: Base[]; }  = { n: [d1, d2] };
var x11: (s: Base[]) => any = n => { var n: Base[]; return null; };
var x12: Genric<Base> = { func: n => { return [d1, d2]; } };
class x13 { member: () => Base[] = () => [d1, d2] }
class x14 { member: () => Base[] = function() { return [d1, d2] } }
class x15 { member: () => Base[] = function named() { return [d1, d2] } }
class x16 { member: { (): Base[]; } = () => [d1, d2] }
class x17 { member: { (): Base[]; } = function() { return [d1, d2] } }
class x18 { member: { (): Base[]; } = function named() { return [d1, d2] } }
class x19 { member: Base[] = [d1, d2] }
class x20 { member: Array<Base> = [d1, d2] }
class x21 { member: { [n: number]: Base; } = [d1, d2] }
class x22 { member: {n: Base[]; }  = { n: [d1, d2] } }
class x23 { member: (s: Base[]) => any = n => { var n: Base[]; return null; } }
class x24 { member: Genric<Base> = { func: n => { return [d1, d2]; } } }
class x25 { private member: () => Base[] = () => [d1, d2] }
class x26 { private member: () => Base[] = function() { return [d1, d2] } }
class x27 { private member: () => Base[] = function named() { return [d1, d2] } }
class x28 { private member: { (): Base[]; } = () => [d1, d2] }
class x29 { private member: { (): Base[]; } = function() { return [d1, d2] } }
class x30 { private member: { (): Base[]; } = function named() { return [d1, d2] } }
class x31 { private member: Base[] = [d1, d2] }
class x32 { private member: Array<Base> = [d1, d2] }
class x33 { private member: { [n: number]: Base; } = [d1, d2] }
class x34 { private member: {n: Base[]; }  = { n: [d1, d2] } }
class x35 { private member: (s: Base[]) => any = n => { var n: Base[]; return null; } }
class x36 { private member: Genric<Base> = { func: n => { return [d1, d2]; } } }
class x37 { public member: () => Base[] = () => [d1, d2] }
class x38 { public member: () => Base[] = function() { return [d1, d2] } }
class x39 { public member: () => Base[] = function named() { return [d1, d2] } }
class x40 { public member: { (): Base[]; } = () => [d1, d2] }
class x41 { public member: { (): Base[]; } = function() { return [d1, d2] } }
class x42 { public member: { (): Base[]; } = function named() { return [d1, d2] } }
class x43 { public member: Base[] = [d1, d2] }
class x44 { public member: Array<Base> = [d1, d2] }
class x45 { public member: { [n: number]: Base; } = [d1, d2] }
class x46 { public member: {n: Base[]; }  = { n: [d1, d2] } }
class x47 { public member: (s: Base[]) => any = n => { var n: Base[]; return null; } }
class x48 { public member: Genric<Base> = { func: n => { return [d1, d2]; } } }
class x49 { static member: () => Base[] = () => [d1, d2] }
class x50 { static member: () => Base[] = function() { return [d1, d2] } }
class x51 { static member: () => Base[] = function named() { return [d1, d2] } }
class x52 { static member: { (): Base[]; } = () => [d1, d2] }
class x53 { static member: { (): Base[]; } = function() { return [d1, d2] } }
class x54 { static member: { (): Base[]; } = function named() { return [d1, d2] } }
class x55 { static member: Base[] = [d1, d2] }
class x56 { static member: Array<Base> = [d1, d2] }
class x57 { static member: { [n: number]: Base; } = [d1, d2] }
class x58 { static member: {n: Base[]; }  = { n: [d1, d2] } }
class x59 { static member: (s: Base[]) => any = n => { var n: Base[]; return null; } }
class x60 { static member: Genric<Base> = { func: n => { return [d1, d2]; } } }
class x61 { private static member: () => Base[] = () => [d1, d2] }
class x62 { private static member: () => Base[] = function() { return [d1, d2] } }
class x63 { private static member: () => Base[] = function named() { return [d1, d2] } }
class x64 { private static member: { (): Base[]; } = () => [d1, d2] }
class x65 { private static member: { (): Base[]; } = function() { return [d1, d2] } }
class x66 { private static member: { (): Base[]; } = function named() { return [d1, d2] } }
class x67 { private static member: Base[] = [d1, d2] }
class x68 { private static member: Array<Base> = [d1, d2] }
class x69 { private static member: { [n: number]: Base; } = [d1, d2] }
class x70 { private static member: {n: Base[]; }  = { n: [d1, d2] } }
class x71 { private static member: (s: Base[]) => any = n => { var n: Base[]; return null; } }
class x72 { private static member: Genric<Base> = { func: n => { return [d1, d2]; } } }
class x73 { public static member: () => Base[] = () => [d1, d2] }
class x74 { public static member: () => Base[] = function() { return [d1, d2] } }
class x75 { public static member: () => Base[] = function named() { return [d1, d2] } }
class x76 { public static member: { (): Base[]; } = () => [d1, d2] }
class x77 { public static member: { (): Base[]; } = function() { return [d1, d2] } }
class x78 { public static member: { (): Base[]; } = function named() { return [d1, d2] } }
class x79 { public static member: Base[] = [d1, d2] }
class x80 { public static member: Array<Base> = [d1, d2] }
class x81 { public static member: { [n: number]: Base; } = [d1, d2] }
class x82 { public static member: {n: Base[]; }  = { n: [d1, d2] } }
class x83 { public static member: (s: Base[]) => any = n => { var n: Base[]; return null; } }
class x84 { public static member: Genric<Base> = { func: n => { return [d1, d2]; } } }
class x85 { constructor(parm: () => Base[] = () => [d1, d2]) { } }
class x86 { constructor(parm: () => Base[] = function() { return [d1, d2] }) { } }
class x87 { constructor(parm: () => Base[] = function named() { return [d1, d2] }) { } }
class x88 { constructor(parm: { (): Base[]; } = () => [d1, d2]) { } }
class x89 { constructor(parm: { (): Base[]; } = function() { return [d1, d2] }) { } }
class x90 { constructor(parm: { (): Base[]; } = function named() { return [d1, d2] }) { } }
class x91 { constructor(parm: Base[] = [d1, d2]) { } }
class x92 { constructor(parm: Array<Base> = [d1, d2]) { } }
class x93 { constructor(parm: { [n: number]: Base; } = [d1, d2]) { } }
class x94 { constructor(parm: {n: Base[]; }  = { n: [d1, d2] }) { } }
class x95 { constructor(parm: (s: Base[]) => any = n => { var n: Base[]; return null; }) { } }
class x96 { constructor(parm: Genric<Base> = { func: n => { return [d1, d2]; } }) { } }
class x97 { constructor(public parm: () => Base[] = () => [d1, d2]) { } }
class x98 { constructor(public parm: () => Base[] = function() { return [d1, d2] }) { } }
class x99 { constructor(public parm: () => Base[] = function named() { return [d1, d2] }) { } }
class x100 { constructor(public parm: { (): Base[]; } = () => [d1, d2]) { } }
class x101 { constructor(public parm: { (): Base[]; } = function() { return [d1, d2] }) { } }
class x102 { constructor(public parm: { (): Base[]; } = function named() { return [d1, d2] }) { } }
class x103 { constructor(public parm: Base[] = [d1, d2]) { } }
class x104 { constructor(public parm: Array<Base> = [d1, d2]) { } }
class x105 { constructor(public parm: { [n: number]: Base; } = [d1, d2]) { } }
class x106 { constructor(public parm: {n: Base[]; }  = { n: [d1, d2] }) { } }
class x107 { constructor(public parm: (s: Base[]) => any = n => { var n: Base[]; return null; }) { } }
class x108 { constructor(public parm: Genric<Base> = { func: n => { return [d1, d2]; } }) { } }
class x109 { constructor(private parm: () => Base[] = () => [d1, d2]) { } }
class x110 { constructor(private parm: () => Base[] = function() { return [d1, d2] }) { } }
class x111 { constructor(private parm: () => Base[] = function named() { return [d1, d2] }) { } }
class x112 { constructor(private parm: { (): Base[]; } = () => [d1, d2]) { } }
class x113 { constructor(private parm: { (): Base[]; } = function() { return [d1, d2] }) { } }
class x114 { constructor(private parm: { (): Base[]; } = function named() { return [d1, d2] }) { } }
class x115 { constructor(private parm: Base[] = [d1, d2]) { } }
class x116 { constructor(private parm: Array<Base> = [d1, d2]) { } }
class x117 { constructor(private parm: { [n: number]: Base; } = [d1, d2]) { } }
class x118 { constructor(private parm: {n: Base[]; }  = { n: [d1, d2] }) { } }
class x119 { constructor(private parm: (s: Base[]) => any = n => { var n: Base[]; return null; }) { } }
class x120 { constructor(private parm: Genric<Base> = { func: n => { return [d1, d2]; } }) { } }
function x121(parm: () => Base[] = () => [d1, d2]) { }
function x122(parm: () => Base[] = function() { return [d1, d2] }) { }
function x123(parm: () => Base[] = function named() { return [d1, d2] }) { }
function x124(parm: { (): Base[]; } = () => [d1, d2]) { }
function x125(parm: { (): Base[]; } = function() { return [d1, d2] }) { }
function x126(parm: { (): Base[]; } = function named() { return [d1, d2] }) { }
function x127(parm: Base[] = [d1, d2]) { }
function x128(parm: Array<Base> = [d1, d2]) { }
function x129(parm: { [n: number]: Base; } = [d1, d2]) { }
function x130(parm: {n: Base[]; }  = { n: [d1, d2] }) { }
function x131(parm: (s: Base[]) => any = n => { var n: Base[]; return null; }) { }
function x132(parm: Genric<Base> = { func: n => { return [d1, d2]; } }) { }
function x133(): () => Base[] { return () => [d1, d2]; }
function x134(): () => Base[] { return function() { return [d1, d2] }; }
function x135(): () => Base[] { return function named() { return [d1, d2] }; }
function x136(): { (): Base[]; } { return () => [d1, d2]; }
function x137(): { (): Base[]; } { return function() { return [d1, d2] }; }
function x138(): { (): Base[]; } { return function named() { return [d1, d2] }; }
function x139(): Base[] { return [d1, d2]; }
function x140(): Array<Base> { return [d1, d2]; }
function x141(): { [n: number]: Base; } { return [d1, d2]; }
function x142(): {n: Base[]; }  { return { n: [d1, d2] }; }
function x143(): (s: Base[]) => any { return n => { var n: Base[]; return null; }; }
function x144(): Genric<Base> { return { func: n => { return [d1, d2]; } }; }
function x145(): () => Base[] { return () => [d1, d2]; return () => [d1, d2]; }
function x146(): () => Base[] { return function() { return [d1, d2] }; return function() { return [d1, d2] }; }
function x147(): () => Base[] { return function named() { return [d1, d2] }; return function named() { return [d1, d2] }; }
function x148(): { (): Base[]; } { return () => [d1, d2]; return () => [d1, d2]; }
function x149(): { (): Base[]; } { return function() { return [d1, d2] }; return function() { return [d1, d2] }; }
function x150(): { (): Base[]; } { return function named() { return [d1, d2] }; return function named() { return [d1, d2] }; }
function x151(): Base[] { return [d1, d2]; return [d1, d2]; }
function x152(): Array<Base> { return [d1, d2]; return [d1, d2]; }
function x153(): { [n: number]: Base; } { return [d1, d2]; return [d1, d2]; }
function x154(): {n: Base[]; }  { return { n: [d1, d2] }; return { n: [d1, d2] }; }
function x155(): (s: Base[]) => any { return n => { var n: Base[]; return null; }; return n => { var n: Base[]; return null; }; }
function x156(): Genric<Base> { return { func: n => { return [d1, d2]; } }; return { func: n => { return [d1, d2]; } }; }
var x157: () => () => Base[] = () => { return () => [d1, d2]; };
var x158: () => () => Base[] = () => { return function() { return [d1, d2] }; };
var x159: () => () => Base[] = () => { return function named() { return [d1, d2] }; };
var x160: () => { (): Base[]; } = () => { return () => [d1, d2]; };
var x161: () => { (): Base[]; } = () => { return function() { return [d1, d2] }; };
var x162: () => { (): Base[]; } = () => { return function named() { return [d1, d2] }; };
var x163: () => Base[] = () => { return [d1, d2]; };
var x164: () => Array<Base> = () => { return [d1, d2]; };
var x165: () => { [n: number]: Base; } = () => { return [d1, d2]; };
var x166: () => {n: Base[]; }  = () => { return { n: [d1, d2] }; };
var x167: () => (s: Base[]) => any = () => { return n => { var n: Base[]; return null; }; };
var x168: () => Genric<Base> = () => { return { func: n => { return [d1, d2]; } }; };
var x169: () => () => Base[] = function() { return () => [d1, d2]; };
var x170: () => () => Base[] = function() { return function() { return [d1, d2] }; };
var x171: () => () => Base[] = function() { return function named() { return [d1, d2] }; };
var x172: () => { (): Base[]; } = function() { return () => [d1, d2]; };
var x173: () => { (): Base[]; } = function() { return function() { return [d1, d2] }; };
var x174: () => { (): Base[]; } = function() { return function named() { return [d1, d2] }; };
var x175: () => Base[] = function() { return [d1, d2]; };
var x176: () => Array<Base> = function() { return [d1, d2]; };
var x177: () => { [n: number]: Base; } = function() { return [d1, d2]; };
var x178: () => {n: Base[]; }  = function() { return { n: [d1, d2] }; };
var x179: () => (s: Base[]) => any = function() { return n => { var n: Base[]; return null; }; };
var x180: () => Genric<Base> = function() { return { func: n => { return [d1, d2]; } }; };
module x181 { var t: () => Base[] = () => [d1, d2]; }
module x182 { var t: () => Base[] = function() { return [d1, d2] }; }
module x183 { var t: () => Base[] = function named() { return [d1, d2] }; }
module x184 { var t: { (): Base[]; } = () => [d1, d2]; }
module x185 { var t: { (): Base[]; } = function() { return [d1, d2] }; }
module x186 { var t: { (): Base[]; } = function named() { return [d1, d2] }; }
module x187 { var t: Base[] = [d1, d2]; }
module x188 { var t: Array<Base> = [d1, d2]; }
module x189 { var t: { [n: number]: Base; } = [d1, d2]; }
module x190 { var t: {n: Base[]; }  = { n: [d1, d2] }; }
module x191 { var t: (s: Base[]) => any = n => { var n: Base[]; return null; }; }
module x192 { var t: Genric<Base> = { func: n => { return [d1, d2]; } }; }
module x193 { export var t: () => Base[] = () => [d1, d2]; }
module x194 { export var t: () => Base[] = function() { return [d1, d2] }; }
module x195 { export var t: () => Base[] = function named() { return [d1, d2] }; }
module x196 { export var t: { (): Base[]; } = () => [d1, d2]; }
module x197 { export var t: { (): Base[]; } = function() { return [d1, d2] }; }
module x198 { export var t: { (): Base[]; } = function named() { return [d1, d2] }; }
module x199 { export var t: Base[] = [d1, d2]; }
module x200 { export var t: Array<Base> = [d1, d2]; }
module x201 { export var t: { [n: number]: Base; } = [d1, d2]; }
module x202 { export var t: {n: Base[]; }  = { n: [d1, d2] }; }
module x203 { export var t: (s: Base[]) => any = n => { var n: Base[]; return null; }; }
module x204 { export var t: Genric<Base> = { func: n => { return [d1, d2]; } }; }
var x206 = <() => Base[]>function() { return [d1, d2] };
var x207 = <() => Base[]>function named() { return [d1, d2] };
var x209 = <{ (): Base[]; }>function() { return [d1, d2] };
var x210 = <{ (): Base[]; }>function named() { return [d1, d2] };
var x211 = <Base[]>[d1, d2];
var x212 = <Array<Base>>[d1, d2];
var x213 = <{ [n: number]: Base; }>[d1, d2];
var x214 = <{n: Base[]; } >{ n: [d1, d2] };
var x216 = <Genric<Base>>{ func: n => { return [d1, d2]; } };
var x217 = (<() => Base[]>undefined) || function() { return [d1, d2] };
var x218 = (<() => Base[]>undefined) || function named() { return [d1, d2] };
var x219 = (<{ (): Base[]; }>undefined) || function() { return [d1, d2] };
var x220 = (<{ (): Base[]; }>undefined) || function named() { return [d1, d2] };
var x221 = (<Base[]>undefined) || [d1, d2];
var x222 = (<Array<Base>>undefined) || [d1, d2];
var x223 = (<{ [n: number]: Base; }>undefined) || [d1, d2];
var x224 = (<{n: Base[]; } >undefined) || { n: [d1, d2] };
var x225: () => Base[]; x225 = () => [d1, d2];
var x226: () => Base[]; x226 = function() { return [d1, d2] };
var x227: () => Base[]; x227 = function named() { return [d1, d2] };
var x228: { (): Base[]; }; x228 = () => [d1, d2];
var x229: { (): Base[]; }; x229 = function() { return [d1, d2] };
var x230: { (): Base[]; }; x230 = function named() { return [d1, d2] };
var x231: Base[]; x231 = [d1, d2];
var x232: Array<Base>; x232 = [d1, d2];
var x233: { [n: number]: Base; }; x233 = [d1, d2];
var x234: {n: Base[]; } ; x234 = { n: [d1, d2] };
var x235: (s: Base[]) => any; x235 = n => { var n: Base[]; return null; };
var x236: Genric<Base>; x236 = { func: n => { return [d1, d2]; } };
var x237: { n: () => Base[]; } = { n: () => [d1, d2] };
var x238: { n: () => Base[]; } = { n: function() { return [d1, d2] } };
var x239: { n: () => Base[]; } = { n: function named() { return [d1, d2] } };
var x240: { n: { (): Base[]; }; } = { n: () => [d1, d2] };
var x241: { n: { (): Base[]; }; } = { n: function() { return [d1, d2] } };
var x242: { n: { (): Base[]; }; } = { n: function named() { return [d1, d2] } };
var x243: { n: Base[]; } = { n: [d1, d2] };
var x244: { n: Array<Base>; } = { n: [d1, d2] };
var x245: { n: { [n: number]: Base; }; } = { n: [d1, d2] };
var x246: { n: {n: Base[]; } ; } = { n: { n: [d1, d2] } };
var x247: { n: (s: Base[]) => any; } = { n: n => { var n: Base[]; return null; } };
var x248: { n: Genric<Base>; } = { n: { func: n => { return [d1, d2]; } } };
var x252: { (): Base[]; }[] = [() => [d1, d2]];
var x253: { (): Base[]; }[] = [function() { return [d1, d2] }];
var x254: { (): Base[]; }[] = [function named() { return [d1, d2] }];
var x255: Base[][] = [[d1, d2]];
var x256: Array<Base>[] = [[d1, d2]];
var x257: { [n: number]: Base; }[] = [[d1, d2]];
var x258: {n: Base[]; } [] = [{ n: [d1, d2] }];
var x260: Genric<Base>[] = [{ func: n => { return [d1, d2]; } }];
var x261: () => Base[] = function() { return [d1, d2] } || undefined;
var x262: () => Base[] = function named() { return [d1, d2] } || undefined;
var x263: { (): Base[]; } = function() { return [d1, d2] } || undefined;
var x264: { (): Base[]; } = function named() { return [d1, d2] } || undefined;
var x265: Base[] = [d1, d2] || undefined;
var x266: Array<Base> = [d1, d2] || undefined;
var x267: { [n: number]: Base; } = [d1, d2] || undefined;
var x268: {n: Base[]; }  = { n: [d1, d2] } || undefined;
var x269: () => Base[] = undefined || function() { return [d1, d2] };
var x270: () => Base[] = undefined || function named() { return [d1, d2] };
var x271: { (): Base[]; } = undefined || function() { return [d1, d2] };
var x272: { (): Base[]; } = undefined || function named() { return [d1, d2] };
var x273: Base[] = undefined || [d1, d2];
var x274: Array<Base> = undefined || [d1, d2];
var x275: { [n: number]: Base; } = undefined || [d1, d2];
var x276: {n: Base[]; }  = undefined || { n: [d1, d2] };
var x277: () => Base[] = function() { return [d1, d2] } || function() { return [d1, d2] };
var x278: () => Base[] = function named() { return [d1, d2] } || function named() { return [d1, d2] };
var x279: { (): Base[]; } = function() { return [d1, d2] } || function() { return [d1, d2] };
var x280: { (): Base[]; } = function named() { return [d1, d2] } || function named() { return [d1, d2] };
var x281: Base[] = [d1, d2] || [d1, d2];
var x282: Array<Base> = [d1, d2] || [d1, d2];
var x283: { [n: number]: Base; } = [d1, d2] || [d1, d2];
var x284: {n: Base[]; }  = { n: [d1, d2] } || { n: [d1, d2] };
var x285: () => Base[] = true ? () => [d1, d2] : () => [d1, d2];
var x286: () => Base[] = true ? function() { return [d1, d2] } : function() { return [d1, d2] };
var x287: () => Base[] = true ? function named() { return [d1, d2] } : function named() { return [d1, d2] };
var x288: { (): Base[]; } = true ? () => [d1, d2] : () => [d1, d2];
var x289: { (): Base[]; } = true ? function() { return [d1, d2] } : function() { return [d1, d2] };
var x290: { (): Base[]; } = true ? function named() { return [d1, d2] } : function named() { return [d1, d2] };
var x291: Base[] = true ? [d1, d2] : [d1, d2];
var x292: Array<Base> = true ? [d1, d2] : [d1, d2];
var x293: { [n: number]: Base; } = true ? [d1, d2] : [d1, d2];
var x294: {n: Base[]; }  = true ? { n: [d1, d2] } : { n: [d1, d2] };
var x295: (s: Base[]) => any = true ? n => { var n: Base[]; return null; } : n => { var n: Base[]; return null; };
var x296: Genric<Base> = true ? { func: n => { return [d1, d2]; } } : { func: n => { return [d1, d2]; } };
var x297: () => Base[] = true ? undefined : () => [d1, d2];
var x298: () => Base[] = true ? undefined : function() { return [d1, d2] };
var x299: () => Base[] = true ? undefined : function named() { return [d1, d2] };
var x300: { (): Base[]; } = true ? undefined : () => [d1, d2];
var x301: { (): Base[]; } = true ? undefined : function() { return [d1, d2] };
var x302: { (): Base[]; } = true ? undefined : function named() { return [d1, d2] };
var x303: Base[] = true ? undefined : [d1, d2];
var x304: Array<Base> = true ? undefined : [d1, d2];
var x305: { [n: number]: Base; } = true ? undefined : [d1, d2];
var x306: {n: Base[]; }  = true ? undefined : { n: [d1, d2] };
var x307: (s: Base[]) => any = true ? undefined : n => { var n: Base[]; return null; };
var x308: Genric<Base> = true ? undefined : { func: n => { return [d1, d2]; } };
var x309: () => Base[] = true ? () => [d1, d2] : undefined;
var x310: () => Base[] = true ? function() { return [d1, d2] } : undefined;
var x311: () => Base[] = true ? function named() { return [d1, d2] } : undefined;
var x312: { (): Base[]; } = true ? () => [d1, d2] : undefined;
var x313: { (): Base[]; } = true ? function() { return [d1, d2] } : undefined;
var x314: { (): Base[]; } = true ? function named() { return [d1, d2] } : undefined;
var x315: Base[] = true ? [d1, d2] : undefined;
var x316: Array<Base> = true ? [d1, d2] : undefined;
var x317: { [n: number]: Base; } = true ? [d1, d2] : undefined;
var x318: {n: Base[]; }  = true ? { n: [d1, d2] } : undefined;
var x319: (s: Base[]) => any = true ? n => { var n: Base[]; return null; } : undefined;
var x320: Genric<Base> = true ? { func: n => { return [d1, d2]; } } : undefined;
function x321(n: () => Base[]) { }; x321(() => [d1, d2]);
function x322(n: () => Base[]) { }; x322(function() { return [d1, d2] });
function x323(n: () => Base[]) { }; x323(function named() { return [d1, d2] });
function x324(n: { (): Base[]; }) { }; x324(() => [d1, d2]);
function x325(n: { (): Base[]; }) { }; x325(function() { return [d1, d2] });
function x326(n: { (): Base[]; }) { }; x326(function named() { return [d1, d2] });
function x327(n: Base[]) { }; x327([d1, d2]);
function x328(n: Array<Base>) { }; x328([d1, d2]);
function x329(n: { [n: number]: Base; }) { }; x329([d1, d2]);
function x330(n: {n: Base[]; } ) { }; x330({ n: [d1, d2] });
function x331(n: (s: Base[]) => any) { }; x331(n => { var n: Base[]; return null; });
function x332(n: Genric<Base>) { }; x332({ func: n => { return [d1, d2]; } });
var x333 = (n: () => Base[]) => n; x333(() => [d1, d2]);
var x334 = (n: () => Base[]) => n; x334(function() { return [d1, d2] });
var x335 = (n: () => Base[]) => n; x335(function named() { return [d1, d2] });
var x336 = (n: { (): Base[]; }) => n; x336(() => [d1, d2]);
var x337 = (n: { (): Base[]; }) => n; x337(function() { return [d1, d2] });
var x338 = (n: { (): Base[]; }) => n; x338(function named() { return [d1, d2] });
var x339 = (n: Base[]) => n; x339([d1, d2]);
var x340 = (n: Array<Base>) => n; x340([d1, d2]);
var x341 = (n: { [n: number]: Base; }) => n; x341([d1, d2]);
var x342 = (n: {n: Base[]; } ) => n; x342({ n: [d1, d2] });
var x343 = (n: (s: Base[]) => any) => n; x343(n => { var n: Base[]; return null; });
var x344 = (n: Genric<Base>) => n; x344({ func: n => { return [d1, d2]; } });
var x345 = function(n: () => Base[]) { }; x345(() => [d1, d2]);
var x346 = function(n: () => Base[]) { }; x346(function() { return [d1, d2] });
var x347 = function(n: () => Base[]) { }; x347(function named() { return [d1, d2] });
var x348 = function(n: { (): Base[]; }) { }; x348(() => [d1, d2]);
var x349 = function(n: { (): Base[]; }) { }; x349(function() { return [d1, d2] });
var x350 = function(n: { (): Base[]; }) { }; x350(function named() { return [d1, d2] });
var x351 = function(n: Base[]) { }; x351([d1, d2]);
var x352 = function(n: Array<Base>) { }; x352([d1, d2]);
var x353 = function(n: { [n: number]: Base; }) { }; x353([d1, d2]);
var x354 = function(n: {n: Base[]; } ) { }; x354({ n: [d1, d2] });
var x355 = function(n: (s: Base[]) => any) { }; x355(n => { var n: Base[]; return null; });
var x356 = function(n: Genric<Base>) { }; x356({ func: n => { return [d1, d2]; } });

//// [generatedContextualTyping.js]
class Base {
    p;
}
class Derived1 extends Base {
    m;
}
class Derived2 extends Base {
    n;
}
var b = new Base(), d1 = new Derived1(), d2 = new Derived2();
var x1 = () => [d1, d2];
var x2 = function () { return [d1, d2]; };
var x3 = function named() { return [d1, d2]; };
var x4 = () => [d1, d2];
var x5 = function () { return [d1, d2]; };
var x6 = function named() { return [d1, d2]; };
var x7 = [d1, d2];
var x8 = [d1, d2];
var x9 = [d1, d2];
var x10 = { n: [d1, d2] };
var x11 = n => { var n; return null; };
var x12 = { func: n => { return [d1, d2]; } };
class x13 {
    member = () => [d1, d2];
}
class x14 {
    member = function () { return [d1, d2]; };
}
class x15 {
    member = function named() { return [d1, d2]; };
}
class x16 {
    member = () => [d1, d2];
}
class x17 {
    member = function () { return [d1, d2]; };
}
class x18 {
    member = function named() { return [d1, d2]; };
}
class x19 {
    member = [d1, d2];
}
class x20 {
    member = [d1, d2];
}
class x21 {
    member = [d1, d2];
}
class x22 {
    member = { n: [d1, d2] };
}
class x23 {
    member = n => { var n; return null; };
}
class x24 {
    member = { func: n => { return [d1, d2]; } };
}
class x25 {
    member = () => [d1, d2];
}
class x26 {
    member = function () { return [d1, d2]; };
}
class x27 {
    member = function named() { return [d1, d2]; };
}
class x28 {
    member = () => [d1, d2];
}
class x29 {
    member = function () { return [d1, d2]; };
}
class x30 {
    member = function named() { return [d1, d2]; };
}
class x31 {
    member = [d1, d2];
}
class x32 {
    member = [d1, d2];
}
class x33 {
    member = [d1, d2];
}
class x34 {
    member = { n: [d1, d2] };
}
class x35 {
    member = n => { var n; return null; };
}
class x36 {
    member = { func: n => { return [d1, d2]; } };
}
class x37 {
    member = () => [d1, d2];
}
class x38 {
    member = function () { return [d1, d2]; };
}
class x39 {
    member = function named() { return [d1, d2]; };
}
class x40 {
    member = () => [d1, d2];
}
class x41 {
    member = function () { return [d1, d2]; };
}
class x42 {
    member = function named() { return [d1, d2]; };
}
class x43 {
    member = [d1, d2];
}
class x44 {
    member = [d1, d2];
}
class x45 {
    member = [d1, d2];
}
class x46 {
    member = { n: [d1, d2] };
}
class x47 {
    member = n => { var n; return null; };
}
class x48 {
    member = { func: n => { return [d1, d2]; } };
}
class x49 {
    static member = () => [d1, d2];
}
class x50 {
    static member = function () { return [d1, d2]; };
}
class x51 {
    static member = function named() { return [d1, d2]; };
}
class x52 {
    static member = () => [d1, d2];
}
class x53 {
    static member = function () { return [d1, d2]; };
}
class x54 {
    static member = function named() { return [d1, d2]; };
}
class x55 {
    static member = [d1, d2];
}
class x56 {
    static member = [d1, d2];
}
class x57 {
    static member = [d1, d2];
}
class x58 {
    static member = { n: [d1, d2] };
}
class x59 {
    static member = n => { var n; return null; };
}
class x60 {
    static member = { func: n => { return [d1, d2]; } };
}
class x61 {
    static member = () => [d1, d2];
}
class x62 {
    static member = function () { return [d1, d2]; };
}
class x63 {
    static member = function named() { return [d1, d2]; };
}
class x64 {
    static member = () => [d1, d2];
}
class x65 {
    static member = function () { return [d1, d2]; };
}
class x66 {
    static member = function named() { return [d1, d2]; };
}
class x67 {
    static member = [d1, d2];
}
class x68 {
    static member = [d1, d2];
}
class x69 {
    static member = [d1, d2];
}
class x70 {
    static member = { n: [d1, d2] };
}
class x71 {
    static member = n => { var n; return null; };
}
class x72 {
    static member = { func: n => { return [d1, d2]; } };
}
class x73 {
    static member = () => [d1, d2];
}
class x74 {
    static member = function () { return [d1, d2]; };
}
class x75 {
    static member = function named() { return [d1, d2]; };
}
class x76 {
    static member = () => [d1, d2];
}
class x77 {
    static member = function () { return [d1, d2]; };
}
class x78 {
    static member = function named() { return [d1, d2]; };
}
class x79 {
    static member = [d1, d2];
}
class x80 {
    static member = [d1, d2];
}
class x81 {
    static member = [d1, d2];
}
class x82 {
    static member = { n: [d1, d2] };
}
class x83 {
    static member = n => { var n; return null; };
}
class x84 {
    static member = { func: n => { return [d1, d2]; } };
}
class x85 {
    constructor(parm = () => [d1, d2]) { }
}
class x86 {
    constructor(parm = function () { return [d1, d2]; }) { }
}
class x87 {
    constructor(parm = function named() { return [d1, d2]; }) { }
}
class x88 {
    constructor(parm = () => [d1, d2]) { }
}
class x89 {
    constructor(parm = function () { return [d1, d2]; }) { }
}
class x90 {
    constructor(parm = function named() { return [d1, d2]; }) { }
}
class x91 {
    constructor(parm = [d1, d2]) { }
}
class x92 {
    constructor(parm = [d1, d2]) { }
}
class x93 {
    constructor(parm = [d1, d2]) { }
}
class x94 {
    constructor(parm = { n: [d1, d2] }) { }
}
class x95 {
    constructor(parm = n => { var n; return null; }) { }
}
class x96 {
    constructor(parm = { func: n => { return [d1, d2]; } }) { }
}
class x97 {
    parm;
    constructor(parm = () => [d1, d2]) {
        this.parm = parm;
    }
}
class x98 {
    parm;
    constructor(parm = function () { return [d1, d2]; }) {
        this.parm = parm;
    }
}
class x99 {
    parm;
    constructor(parm = function named() { return [d1, d2]; }) {
        this.parm = parm;
    }
}
class x100 {
    parm;
    constructor(parm = () => [d1, d2]) {
        this.parm = parm;
    }
}
class x101 {
    parm;
    constructor(parm = function () { return [d1, d2]; }) {
        this.parm = parm;
    }
}
class x102 {
    parm;
    constructor(parm = function named() { return [d1, d2]; }) {
        this.parm = parm;
    }
}
class x103 {
    parm;
    constructor(parm = [d1, d2]) {
        this.parm = parm;
    }
}
class x104 {
    parm;
    constructor(parm = [d1, d2]) {
        this.parm = parm;
    }
}
class x105 {
    parm;
    constructor(parm = [d1, d2]) {
        this.parm = parm;
    }
}
class x106 {
    parm;
    constructor(parm = { n: [d1, d2] }) {
        this.parm = parm;
    }
}
class x107 {
    parm;
    constructor(parm = n => { var n; return null; }) {
        this.parm = parm;
    }
}
class x108 {
    parm;
    constructor(parm = { func: n => { return [d1, d2]; } }) {
        this.parm = parm;
    }
}
class x109 {
    parm;
    constructor(parm = () => [d1, d2]) {
        this.parm = parm;
    }
}
class x110 {
    parm;
    constructor(parm = function () { return [d1, d2]; }) {
        this.parm = parm;
    }
}
class x111 {
    parm;
    constructor(parm = function named() { return [d1, d2]; }) {
        this.parm = parm;
    }
}
class x112 {
    parm;
    constructor(parm = () => [d1, d2]) {
        this.parm = parm;
    }
}
class x113 {
    parm;
    constructor(parm = function () { return [d1, d2]; }) {
        this.parm = parm;
    }
}
class x114 {
    parm;
    constructor(parm = function named() { return [d1, d2]; }) {
        this.parm = parm;
    }
}
class x115 {
    parm;
    constructor(parm = [d1, d2]) {
        this.parm = parm;
    }
}
class x116 {
    parm;
    constructor(parm = [d1, d2]) {
        this.parm = parm;
    }
}
class x117 {
    parm;
    constructor(parm = [d1, d2]) {
        this.parm = parm;
    }
}
class x118 {
    parm;
    constructor(parm = { n: [d1, d2] }) {
        this.parm = parm;
    }
}
class x119 {
    parm;
    constructor(parm = n => { var n; return null; }) {
        this.parm = parm;
    }
}
class x120 {
    parm;
    constructor(parm = { func: n => { return [d1, d2]; } }) {
        this.parm = parm;
    }
}
function x121(parm = () => [d1, d2]) { }
function x122(parm = function () { return [d1, d2]; }) { }
function x123(parm = function named() { return [d1, d2]; }) { }
function x124(parm = () => [d1, d2]) { }
function x125(parm = function () { return [d1, d2]; }) { }
function x126(parm = function named() { return [d1, d2]; }) { }
function x127(parm = [d1, d2]) { }
function x128(parm = [d1, d2]) { }
function x129(parm = [d1, d2]) { }
function x130(parm = { n: [d1, d2] }) { }
function x131(parm = n => { var n; return null; }) { }
function x132(parm = { func: n => { return [d1, d2]; } }) { }
function x133() { return () => [d1, d2]; }
function x134() { return function () { return [d1, d2]; }; }
function x135() { return function named() { return [d1, d2]; }; }
function x136() { return () => [d1, d2]; }
function x137() { return function () { return [d1, d2]; }; }
function x138() { return function named() { return [d1, d2]; }; }
function x139() { return [d1, d2]; }
function x140() { return [d1, d2]; }
function x141() { return [d1, d2]; }
function x142() { return { n: [d1, d2] }; }
function x143() { return n => { var n; return null; }; }
function x144() { return { func: n => { return [d1, d2]; } }; }
function x145() { return () => [d1, d2]; return () => [d1, d2]; }
function x146() { return function () { return [d1, d2]; }; return function () { return [d1, d2]; }; }
function x147() { return function named() { return [d1, d2]; }; return function named() { return [d1, d2]; }; }
function x148() { return () => [d1, d2]; return () => [d1, d2]; }
function x149() { return function () { return [d1, d2]; }; return function () { return [d1, d2]; }; }
function x150() { return function named() { return [d1, d2]; }; return function named() { return [d1, d2]; }; }
function x151() { return [d1, d2]; return [d1, d2]; }
function x152() { return [d1, d2]; return [d1, d2]; }
function x153() { return [d1, d2]; return [d1, d2]; }
function x154() { return { n: [d1, d2] }; return { n: [d1, d2] }; }
function x155() { return n => { var n; return null; }; return n => { var n; return null; }; }
function x156() { return { func: n => { return [d1, d2]; } }; return { func: n => { return [d1, d2]; } }; }
var x157 = () => { return () => [d1, d2]; };
var x158 = () => { return function () { return [d1, d2]; }; };
var x159 = () => { return function named() { return [d1, d2]; }; };
var x160 = () => { return () => [d1, d2]; };
var x161 = () => { return function () { return [d1, d2]; }; };
var x162 = () => { return function named() { return [d1, d2]; }; };
var x163 = () => { return [d1, d2]; };
var x164 = () => { return [d1, d2]; };
var x165 = () => { return [d1, d2]; };
var x166 = () => { return { n: [d1, d2] }; };
var x167 = () => { return n => { var n; return null; }; };
var x168 = () => { return { func: n => { return [d1, d2]; } }; };
var x169 = function () { return () => [d1, d2]; };
var x170 = function () { return function () { return [d1, d2]; }; };
var x171 = function () { return function named() { return [d1, d2]; }; };
var x172 = function () { return () => [d1, d2]; };
var x173 = function () { return function () { return [d1, d2]; }; };
var x174 = function () { return function named() { return [d1, d2]; }; };
var x175 = function () { return [d1, d2]; };
var x176 = function () { return [d1, d2]; };
var x177 = function () { return [d1, d2]; };
var x178 = function () { return { n: [d1, d2] }; };
var x179 = function () { return n => { var n; return null; }; };
var x180 = function () { return { func: n => { return [d1, d2]; } }; };
var x181;
(function (x181) {
    var t = () => [d1, d2];
})(x181 || (x181 = {}));
var x182;
(function (x182) {
    var t = function () { return [d1, d2]; };
})(x182 || (x182 = {}));
var x183;
(function (x183) {
    var t = function named() { return [d1, d2]; };
})(x183 || (x183 = {}));
var x184;
(function (x184) {
    var t = () => [d1, d2];
})(x184 || (x184 = {}));
var x185;
(function (x185) {
    var t = function () { return [d1, d2]; };
})(x185 || (x185 = {}));
var x186;
(function (x186) {
    var t = function named() { return [d1, d2]; };
})(x186 || (x186 = {}));
var x187;
(function (x187) {
    var t = [d1, d2];
})(x187 || (x187 = {}));
var x188;
(function (x188) {
    var t = [d1, d2];
})(x188 || (x188 = {}));
var x189;
(function (x189) {
    var t = [d1, d2];
})(x189 || (x189 = {}));
var x190;
(function (x190) {
    var t = { n: [d1, d2] };
})(x190 || (x190 = {}));
var x191;
(function (x191) {
    var t = n => { var n; return null; };
})(x191 || (x191 = {}));
var x192;
(function (x192) {
    var t = { func: n => { return [d1, d2]; } };
})(x192 || (x192 = {}));
var x193;
(function (x193) {
    x193.t = () => [d1, d2];
})(x193 || (x193 = {}));
var x194;
(function (x194) {
    x194.t = function () { return [d1, d2]; };
})(x194 || (x194 = {}));
var x195;
(function (x195) {
    x195.t = function named() { return [d1, d2]; };
})(x195 || (x195 = {}));
var x196;
(function (x196) {
    x196.t = () => [d1, d2];
})(x196 || (x196 = {}));
var x197;
(function (x197) {
    x197.t = function () { return [d1, d2]; };
})(x197 || (x197 = {}));
var x198;
(function (x198) {
    x198.t = function named() { return [d1, d2]; };
})(x198 || (x198 = {}));
var x199;
(function (x199) {
    x199.t = [d1, d2];
})(x199 || (x199 = {}));
var x200;
(function (x200) {
    x200.t = [d1, d2];
})(x200 || (x200 = {}));
var x201;
(function (x201) {
    x201.t = [d1, d2];
})(x201 || (x201 = {}));
var x202;
(function (x202) {
    x202.t = { n: [d1, d2] };
})(x202 || (x202 = {}));
var x203;
(function (x203) {
    x203.t = n => { var n; return null; };
})(x203 || (x203 = {}));
var x204;
(function (x204) {
    x204.t = { func: n => { return [d1, d2]; } };
})(x204 || (x204 = {}));
var x206 = function () { return [d1, d2]; };
var x207 = function named() { return [d1, d2]; };
var x209 = function () { return [d1, d2]; };
var x210 = function named() { return [d1, d2]; };
var x211 = [d1, d2];
var x212 = [d1, d2];
var x213 = [d1, d2];
var x214 = { n: [d1, d2] };
var x216 = { func: n => { return [d1, d2]; } };
var x217 = undefined || function () { return [d1, d2]; };
var x218 = undefined || function named() { return [d1, d2]; };
var x219 = undefined || function () { return [d1, d2]; };
var x220 = undefined || function named() { return [d1, d2]; };
var x221 = undefined || [d1, d2];
var x222 = undefined || [d1, d2];
var x223 = undefined || [d1, d2];
var x224 = undefined || { n: [d1, d2] };
var x225;
x225 = () => [d1, d2];
var x226;
x226 = function () { return [d1, d2]; };
var x227;
x227 = function named() { return [d1, d2]; };
var x228;
x228 = () => [d1, d2];
var x229;
x229 = function () { return [d1, d2]; };
var x230;
x230 = function named() { return [d1, d2]; };
var x231;
x231 = [d1, d2];
var x232;
x232 = [d1, d2];
var x233;
x233 = [d1, d2];
var x234;
x234 = { n: [d1, d2] };
var x235;
x235 = n => { var n; return null; };
var x236;
x236 = { func: n => { return [d1, d2]; } };
var x237 = { n: () => [d1, d2] };
var x238 = { n: function () { return [d1, d2]; } };
var x239 = { n: function named() { return [d1, d2]; } };
var x240 = { n: () => [d1, d2] };
var x241 = { n: function () { return [d1, d2]; } };
var x242 = { n: function named() { return [d1, d2]; } };
var x243 = { n: [d1, d2] };
var x244 = { n: [d1, d2] };
var x245 = { n: [d1, d2] };
var x246 = { n: { n: [d1, d2] } };
var x247 = { n: n => { var n; return null; } };
var x248 = { n: { func: n => { return [d1, d2]; } } };
var x252 = [() => [d1, d2]];
var x253 = [function () { return [d1, d2]; }];
var x254 = [function named() { return [d1, d2]; }];
var x255 = [[d1, d2]];
var x256 = [[d1, d2]];
var x257 = [[d1, d2]];
var x258 = [{ n: [d1, d2] }];
var x260 = [{ func: n => { return [d1, d2]; } }];
var x261 = function () { return [d1, d2]; } || undefined;
var x262 = function named() { return [d1, d2]; } || undefined;
var x263 = function () { return [d1, d2]; } || undefined;
var x264 = function named() { return [d1, d2]; } || undefined;
var x265 = [d1, d2] || undefined;
var x266 = [d1, d2] || undefined;
var x267 = [d1, d2] || undefined;
var x268 = { n: [d1, d2] } || undefined;
var x269 = undefined || function () { return [d1, d2]; };
var x270 = undefined || function named() { return [d1, d2]; };
var x271 = undefined || function () { return [d1, d2]; };
var x272 = undefined || function named() { return [d1, d2]; };
var x273 = undefined || [d1, d2];
var x274 = undefined || [d1, d2];
var x275 = undefined || [d1, d2];
var x276 = undefined || { n: [d1, d2] };
var x277 = function () { return [d1, d2]; } || function () { return [d1, d2]; };
var x278 = function named() { return [d1, d2]; } || function named() { return [d1, d2]; };
var x279 = function () { return [d1, d2]; } || function () { return [d1, d2]; };
var x280 = function named() { return [d1, d2]; } || function named() { return [d1, d2]; };
var x281 = [d1, d2] || [d1, d2];
var x282 = [d1, d2] || [d1, d2];
var x283 = [d1, d2] || [d1, d2];
var x284 = { n: [d1, d2] } || { n: [d1, d2] };
var x285 = true ? () => [d1, d2] : () => [d1, d2];
var x286 = true ? function () { return [d1, d2]; } : function () { return [d1, d2]; };
var x287 = true ? function named() { return [d1, d2]; } : function named() { return [d1, d2]; };
var x288 = true ? () => [d1, d2] : () => [d1, d2];
var x289 = true ? function () { return [d1, d2]; } : function () { return [d1, d2]; };
var x290 = true ? function named() { return [d1, d2]; } : function named() { return [d1, d2]; };
var x291 = true ? [d1, d2] : [d1, d2];
var x292 = true ? [d1, d2] : [d1, d2];
var x293 = true ? [d1, d2] : [d1, d2];
var x294 = true ? { n: [d1, d2] } : { n: [d1, d2] };
var x295 = true ? n => { var n; return null; } : n => { var n; return null; };
var x296 = true ? { func: n => { return [d1, d2]; } } : { func: n => { return [d1, d2]; } };
var x297 = true ? undefined : () => [d1, d2];
var x298 = true ? undefined : function () { return [d1, d2]; };
var x299 = true ? undefined : function named() { return [d1, d2]; };
var x300 = true ? undefined : () => [d1, d2];
var x301 = true ? undefined : function () { return [d1, d2]; };
var x302 = true ? undefined : function named() { return [d1, d2]; };
var x303 = true ? undefined : [d1, d2];
var x304 = true ? undefined : [d1, d2];
var x305 = true ? undefined : [d1, d2];
var x306 = true ? undefined : { n: [d1, d2] };
var x307 = true ? undefined : n => { var n; return null; };
var x308 = true ? undefined : { func: n => { return [d1, d2]; } };
var x309 = true ? () => [d1, d2] : undefined;
var x310 = true ? function () { return [d1, d2]; } : undefined;
var x311 = true ? function named() { return [d1, d2]; } : undefined;
var x312 = true ? () => [d1, d2] : undefined;
var x313 = true ? function () { return [d1, d2]; } : undefined;
var x314 = true ? function named() { return [d1, d2]; } : undefined;
var x315 = true ? [d1, d2] : undefined;
var x316 = true ? [d1, d2] : undefined;
var x317 = true ? [d1, d2] : undefined;
var x318 = true ? { n: [d1, d2] } : undefined;
var x319 = true ? n => { var n; return null; } : undefined;
var x320 = true ? { func: n => { return [d1, d2]; } } : undefined;
function x321(n) { }
;
x321(() => [d1, d2]);
function x322(n) { }
;
x322(function () { return [d1, d2]; });
function x323(n) { }
;
x323(function named() { return [d1, d2]; });
function x324(n) { }
;
x324(() => [d1, d2]);
function x325(n) { }
;
x325(function () { return [d1, d2]; });
function x326(n) { }
;
x326(function named() { return [d1, d2]; });
function x327(n) { }
;
x327([d1, d2]);
function x328(n) { }
;
x328([d1, d2]);
function x329(n) { }
;
x329([d1, d2]);
function x330(n) { }
;
x330({ n: [d1, d2] });
function x331(n) { }
;
x331(n => { var n; return null; });
function x332(n) { }
;
x332({ func: n => { return [d1, d2]; } });
var x333 = (n) => n;
x333(() => [d1, d2]);
var x334 = (n) => n;
x334(function () { return [d1, d2]; });
var x335 = (n) => n;
x335(function named() { return [d1, d2]; });
var x336 = (n) => n;
x336(() => [d1, d2]);
var x337 = (n) => n;
x337(function () { return [d1, d2]; });
var x338 = (n) => n;
x338(function named() { return [d1, d2]; });
var x339 = (n) => n;
x339([d1, d2]);
var x340 = (n) => n;
x340([d1, d2]);
var x341 = (n) => n;
x341([d1, d2]);
var x342 = (n) => n;
x342({ n: [d1, d2] });
var x343 = (n) => n;
x343(n => { var n; return null; });
var x344 = (n) => n;
x344({ func: n => { return [d1, d2]; } });
var x345 = function (n) { };
x345(() => [d1, d2]);
var x346 = function (n) { };
x346(function () { return [d1, d2]; });
var x347 = function (n) { };
x347(function named() { return [d1, d2]; });
var x348 = function (n) { };
x348(() => [d1, d2]);
var x349 = function (n) { };
x349(function () { return [d1, d2]; });
var x350 = function (n) { };
x350(function named() { return [d1, d2]; });
var x351 = function (n) { };
x351([d1, d2]);
var x352 = function (n) { };
x352([d1, d2]);
var x353 = function (n) { };
x353([d1, d2]);
var x354 = function (n) { };
x354({ n: [d1, d2] });
var x355 = function (n) { };
x355(n => { var n; return null; });
var x356 = function (n) { };
x356({ func: n => { return [d1, d2]; } });
