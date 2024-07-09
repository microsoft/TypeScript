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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
var Derived1 = /** @class */ (function (_super) {
    __extends(Derived1, _super);
    function Derived1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived1;
}(Base));
var Derived2 = /** @class */ (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived2;
}(Base));
var b = new Base(), d1 = new Derived1(), d2 = new Derived2();
var x1 = function () { return [d1, d2]; };
var x2 = function () { return [d1, d2]; };
var x3 = function named() { return [d1, d2]; };
var x4 = function () { return [d1, d2]; };
var x5 = function () { return [d1, d2]; };
var x6 = function named() { return [d1, d2]; };
var x7 = [d1, d2];
var x8 = [d1, d2];
var x9 = [d1, d2];
var x10 = { n: [d1, d2] };
var x11 = function (n) { var n; return null; };
var x12 = { func: function (n) { return [d1, d2]; } };
var x13 = /** @class */ (function () {
    function x13() {
        this.member = function () { return [d1, d2]; };
    }
    return x13;
}());
var x14 = /** @class */ (function () {
    function x14() {
        this.member = function () { return [d1, d2]; };
    }
    return x14;
}());
var x15 = /** @class */ (function () {
    function x15() {
        this.member = function named() { return [d1, d2]; };
    }
    return x15;
}());
var x16 = /** @class */ (function () {
    function x16() {
        this.member = function () { return [d1, d2]; };
    }
    return x16;
}());
var x17 = /** @class */ (function () {
    function x17() {
        this.member = function () { return [d1, d2]; };
    }
    return x17;
}());
var x18 = /** @class */ (function () {
    function x18() {
        this.member = function named() { return [d1, d2]; };
    }
    return x18;
}());
var x19 = /** @class */ (function () {
    function x19() {
        this.member = [d1, d2];
    }
    return x19;
}());
var x20 = /** @class */ (function () {
    function x20() {
        this.member = [d1, d2];
    }
    return x20;
}());
var x21 = /** @class */ (function () {
    function x21() {
        this.member = [d1, d2];
    }
    return x21;
}());
var x22 = /** @class */ (function () {
    function x22() {
        this.member = { n: [d1, d2] };
    }
    return x22;
}());
var x23 = /** @class */ (function () {
    function x23() {
        this.member = function (n) { var n; return null; };
    }
    return x23;
}());
var x24 = /** @class */ (function () {
    function x24() {
        this.member = { func: function (n) { return [d1, d2]; } };
    }
    return x24;
}());
var x25 = /** @class */ (function () {
    function x25() {
        this.member = function () { return [d1, d2]; };
    }
    return x25;
}());
var x26 = /** @class */ (function () {
    function x26() {
        this.member = function () { return [d1, d2]; };
    }
    return x26;
}());
var x27 = /** @class */ (function () {
    function x27() {
        this.member = function named() { return [d1, d2]; };
    }
    return x27;
}());
var x28 = /** @class */ (function () {
    function x28() {
        this.member = function () { return [d1, d2]; };
    }
    return x28;
}());
var x29 = /** @class */ (function () {
    function x29() {
        this.member = function () { return [d1, d2]; };
    }
    return x29;
}());
var x30 = /** @class */ (function () {
    function x30() {
        this.member = function named() { return [d1, d2]; };
    }
    return x30;
}());
var x31 = /** @class */ (function () {
    function x31() {
        this.member = [d1, d2];
    }
    return x31;
}());
var x32 = /** @class */ (function () {
    function x32() {
        this.member = [d1, d2];
    }
    return x32;
}());
var x33 = /** @class */ (function () {
    function x33() {
        this.member = [d1, d2];
    }
    return x33;
}());
var x34 = /** @class */ (function () {
    function x34() {
        this.member = { n: [d1, d2] };
    }
    return x34;
}());
var x35 = /** @class */ (function () {
    function x35() {
        this.member = function (n) { var n; return null; };
    }
    return x35;
}());
var x36 = /** @class */ (function () {
    function x36() {
        this.member = { func: function (n) { return [d1, d2]; } };
    }
    return x36;
}());
var x37 = /** @class */ (function () {
    function x37() {
        this.member = function () { return [d1, d2]; };
    }
    return x37;
}());
var x38 = /** @class */ (function () {
    function x38() {
        this.member = function () { return [d1, d2]; };
    }
    return x38;
}());
var x39 = /** @class */ (function () {
    function x39() {
        this.member = function named() { return [d1, d2]; };
    }
    return x39;
}());
var x40 = /** @class */ (function () {
    function x40() {
        this.member = function () { return [d1, d2]; };
    }
    return x40;
}());
var x41 = /** @class */ (function () {
    function x41() {
        this.member = function () { return [d1, d2]; };
    }
    return x41;
}());
var x42 = /** @class */ (function () {
    function x42() {
        this.member = function named() { return [d1, d2]; };
    }
    return x42;
}());
var x43 = /** @class */ (function () {
    function x43() {
        this.member = [d1, d2];
    }
    return x43;
}());
var x44 = /** @class */ (function () {
    function x44() {
        this.member = [d1, d2];
    }
    return x44;
}());
var x45 = /** @class */ (function () {
    function x45() {
        this.member = [d1, d2];
    }
    return x45;
}());
var x46 = /** @class */ (function () {
    function x46() {
        this.member = { n: [d1, d2] };
    }
    return x46;
}());
var x47 = /** @class */ (function () {
    function x47() {
        this.member = function (n) { var n; return null; };
    }
    return x47;
}());
var x48 = /** @class */ (function () {
    function x48() {
        this.member = { func: function (n) { return [d1, d2]; } };
    }
    return x48;
}());
var x49 = /** @class */ (function () {
    function x49() {
    }
    x49.member = function () { return [d1, d2]; };
    return x49;
}());
var x50 = /** @class */ (function () {
    function x50() {
    }
    x50.member = function () { return [d1, d2]; };
    return x50;
}());
var x51 = /** @class */ (function () {
    function x51() {
    }
    x51.member = function named() { return [d1, d2]; };
    return x51;
}());
var x52 = /** @class */ (function () {
    function x52() {
    }
    x52.member = function () { return [d1, d2]; };
    return x52;
}());
var x53 = /** @class */ (function () {
    function x53() {
    }
    x53.member = function () { return [d1, d2]; };
    return x53;
}());
var x54 = /** @class */ (function () {
    function x54() {
    }
    x54.member = function named() { return [d1, d2]; };
    return x54;
}());
var x55 = /** @class */ (function () {
    function x55() {
    }
    x55.member = [d1, d2];
    return x55;
}());
var x56 = /** @class */ (function () {
    function x56() {
    }
    x56.member = [d1, d2];
    return x56;
}());
var x57 = /** @class */ (function () {
    function x57() {
    }
    x57.member = [d1, d2];
    return x57;
}());
var x58 = /** @class */ (function () {
    function x58() {
    }
    x58.member = { n: [d1, d2] };
    return x58;
}());
var x59 = /** @class */ (function () {
    function x59() {
    }
    x59.member = function (n) { var n; return null; };
    return x59;
}());
var x60 = /** @class */ (function () {
    function x60() {
    }
    x60.member = { func: function (n) { return [d1, d2]; } };
    return x60;
}());
var x61 = /** @class */ (function () {
    function x61() {
    }
    x61.member = function () { return [d1, d2]; };
    return x61;
}());
var x62 = /** @class */ (function () {
    function x62() {
    }
    x62.member = function () { return [d1, d2]; };
    return x62;
}());
var x63 = /** @class */ (function () {
    function x63() {
    }
    x63.member = function named() { return [d1, d2]; };
    return x63;
}());
var x64 = /** @class */ (function () {
    function x64() {
    }
    x64.member = function () { return [d1, d2]; };
    return x64;
}());
var x65 = /** @class */ (function () {
    function x65() {
    }
    x65.member = function () { return [d1, d2]; };
    return x65;
}());
var x66 = /** @class */ (function () {
    function x66() {
    }
    x66.member = function named() { return [d1, d2]; };
    return x66;
}());
var x67 = /** @class */ (function () {
    function x67() {
    }
    x67.member = [d1, d2];
    return x67;
}());
var x68 = /** @class */ (function () {
    function x68() {
    }
    x68.member = [d1, d2];
    return x68;
}());
var x69 = /** @class */ (function () {
    function x69() {
    }
    x69.member = [d1, d2];
    return x69;
}());
var x70 = /** @class */ (function () {
    function x70() {
    }
    x70.member = { n: [d1, d2] };
    return x70;
}());
var x71 = /** @class */ (function () {
    function x71() {
    }
    x71.member = function (n) { var n; return null; };
    return x71;
}());
var x72 = /** @class */ (function () {
    function x72() {
    }
    x72.member = { func: function (n) { return [d1, d2]; } };
    return x72;
}());
var x73 = /** @class */ (function () {
    function x73() {
    }
    x73.member = function () { return [d1, d2]; };
    return x73;
}());
var x74 = /** @class */ (function () {
    function x74() {
    }
    x74.member = function () { return [d1, d2]; };
    return x74;
}());
var x75 = /** @class */ (function () {
    function x75() {
    }
    x75.member = function named() { return [d1, d2]; };
    return x75;
}());
var x76 = /** @class */ (function () {
    function x76() {
    }
    x76.member = function () { return [d1, d2]; };
    return x76;
}());
var x77 = /** @class */ (function () {
    function x77() {
    }
    x77.member = function () { return [d1, d2]; };
    return x77;
}());
var x78 = /** @class */ (function () {
    function x78() {
    }
    x78.member = function named() { return [d1, d2]; };
    return x78;
}());
var x79 = /** @class */ (function () {
    function x79() {
    }
    x79.member = [d1, d2];
    return x79;
}());
var x80 = /** @class */ (function () {
    function x80() {
    }
    x80.member = [d1, d2];
    return x80;
}());
var x81 = /** @class */ (function () {
    function x81() {
    }
    x81.member = [d1, d2];
    return x81;
}());
var x82 = /** @class */ (function () {
    function x82() {
    }
    x82.member = { n: [d1, d2] };
    return x82;
}());
var x83 = /** @class */ (function () {
    function x83() {
    }
    x83.member = function (n) { var n; return null; };
    return x83;
}());
var x84 = /** @class */ (function () {
    function x84() {
    }
    x84.member = { func: function (n) { return [d1, d2]; } };
    return x84;
}());
var x85 = /** @class */ (function () {
    function x85(parm) {
        if (parm === void 0) { parm = function () { return [d1, d2]; }; }
    }
    return x85;
}());
var x86 = /** @class */ (function () {
    function x86(parm) {
        if (parm === void 0) { parm = function () { return [d1, d2]; }; }
    }
    return x86;
}());
var x87 = /** @class */ (function () {
    function x87(parm) {
        if (parm === void 0) { parm = function named() { return [d1, d2]; }; }
    }
    return x87;
}());
var x88 = /** @class */ (function () {
    function x88(parm) {
        if (parm === void 0) { parm = function () { return [d1, d2]; }; }
    }
    return x88;
}());
var x89 = /** @class */ (function () {
    function x89(parm) {
        if (parm === void 0) { parm = function () { return [d1, d2]; }; }
    }
    return x89;
}());
var x90 = /** @class */ (function () {
    function x90(parm) {
        if (parm === void 0) { parm = function named() { return [d1, d2]; }; }
    }
    return x90;
}());
var x91 = /** @class */ (function () {
    function x91(parm) {
        if (parm === void 0) { parm = [d1, d2]; }
    }
    return x91;
}());
var x92 = /** @class */ (function () {
    function x92(parm) {
        if (parm === void 0) { parm = [d1, d2]; }
    }
    return x92;
}());
var x93 = /** @class */ (function () {
    function x93(parm) {
        if (parm === void 0) { parm = [d1, d2]; }
    }
    return x93;
}());
var x94 = /** @class */ (function () {
    function x94(parm) {
        if (parm === void 0) { parm = { n: [d1, d2] }; }
    }
    return x94;
}());
var x95 = /** @class */ (function () {
    function x95(parm) {
        if (parm === void 0) { parm = function (n) { var n; return null; }; }
    }
    return x95;
}());
var x96 = /** @class */ (function () {
    function x96(parm) {
        if (parm === void 0) { parm = { func: function (n) { return [d1, d2]; } }; }
    }
    return x96;
}());
var x97 = /** @class */ (function () {
    function x97(parm) {
        if (parm === void 0) { parm = function () { return [d1, d2]; }; }
        this.parm = parm;
    }
    return x97;
}());
var x98 = /** @class */ (function () {
    function x98(parm) {
        if (parm === void 0) { parm = function () { return [d1, d2]; }; }
        this.parm = parm;
    }
    return x98;
}());
var x99 = /** @class */ (function () {
    function x99(parm) {
        if (parm === void 0) { parm = function named() { return [d1, d2]; }; }
        this.parm = parm;
    }
    return x99;
}());
var x100 = /** @class */ (function () {
    function x100(parm) {
        if (parm === void 0) { parm = function () { return [d1, d2]; }; }
        this.parm = parm;
    }
    return x100;
}());
var x101 = /** @class */ (function () {
    function x101(parm) {
        if (parm === void 0) { parm = function () { return [d1, d2]; }; }
        this.parm = parm;
    }
    return x101;
}());
var x102 = /** @class */ (function () {
    function x102(parm) {
        if (parm === void 0) { parm = function named() { return [d1, d2]; }; }
        this.parm = parm;
    }
    return x102;
}());
var x103 = /** @class */ (function () {
    function x103(parm) {
        if (parm === void 0) { parm = [d1, d2]; }
        this.parm = parm;
    }
    return x103;
}());
var x104 = /** @class */ (function () {
    function x104(parm) {
        if (parm === void 0) { parm = [d1, d2]; }
        this.parm = parm;
    }
    return x104;
}());
var x105 = /** @class */ (function () {
    function x105(parm) {
        if (parm === void 0) { parm = [d1, d2]; }
        this.parm = parm;
    }
    return x105;
}());
var x106 = /** @class */ (function () {
    function x106(parm) {
        if (parm === void 0) { parm = { n: [d1, d2] }; }
        this.parm = parm;
    }
    return x106;
}());
var x107 = /** @class */ (function () {
    function x107(parm) {
        if (parm === void 0) { parm = function (n) { var n; return null; }; }
        this.parm = parm;
    }
    return x107;
}());
var x108 = /** @class */ (function () {
    function x108(parm) {
        if (parm === void 0) { parm = { func: function (n) { return [d1, d2]; } }; }
        this.parm = parm;
    }
    return x108;
}());
var x109 = /** @class */ (function () {
    function x109(parm) {
        if (parm === void 0) { parm = function () { return [d1, d2]; }; }
        this.parm = parm;
    }
    return x109;
}());
var x110 = /** @class */ (function () {
    function x110(parm) {
        if (parm === void 0) { parm = function () { return [d1, d2]; }; }
        this.parm = parm;
    }
    return x110;
}());
var x111 = /** @class */ (function () {
    function x111(parm) {
        if (parm === void 0) { parm = function named() { return [d1, d2]; }; }
        this.parm = parm;
    }
    return x111;
}());
var x112 = /** @class */ (function () {
    function x112(parm) {
        if (parm === void 0) { parm = function () { return [d1, d2]; }; }
        this.parm = parm;
    }
    return x112;
}());
var x113 = /** @class */ (function () {
    function x113(parm) {
        if (parm === void 0) { parm = function () { return [d1, d2]; }; }
        this.parm = parm;
    }
    return x113;
}());
var x114 = /** @class */ (function () {
    function x114(parm) {
        if (parm === void 0) { parm = function named() { return [d1, d2]; }; }
        this.parm = parm;
    }
    return x114;
}());
var x115 = /** @class */ (function () {
    function x115(parm) {
        if (parm === void 0) { parm = [d1, d2]; }
        this.parm = parm;
    }
    return x115;
}());
var x116 = /** @class */ (function () {
    function x116(parm) {
        if (parm === void 0) { parm = [d1, d2]; }
        this.parm = parm;
    }
    return x116;
}());
var x117 = /** @class */ (function () {
    function x117(parm) {
        if (parm === void 0) { parm = [d1, d2]; }
        this.parm = parm;
    }
    return x117;
}());
var x118 = /** @class */ (function () {
    function x118(parm) {
        if (parm === void 0) { parm = { n: [d1, d2] }; }
        this.parm = parm;
    }
    return x118;
}());
var x119 = /** @class */ (function () {
    function x119(parm) {
        if (parm === void 0) { parm = function (n) { var n; return null; }; }
        this.parm = parm;
    }
    return x119;
}());
var x120 = /** @class */ (function () {
    function x120(parm) {
        if (parm === void 0) { parm = { func: function (n) { return [d1, d2]; } }; }
        this.parm = parm;
    }
    return x120;
}());
function x121(parm) {
    if (parm === void 0) { parm = function () { return [d1, d2]; }; }
}
function x122(parm) {
    if (parm === void 0) { parm = function () { return [d1, d2]; }; }
}
function x123(parm) {
    if (parm === void 0) { parm = function named() { return [d1, d2]; }; }
}
function x124(parm) {
    if (parm === void 0) { parm = function () { return [d1, d2]; }; }
}
function x125(parm) {
    if (parm === void 0) { parm = function () { return [d1, d2]; }; }
}
function x126(parm) {
    if (parm === void 0) { parm = function named() { return [d1, d2]; }; }
}
function x127(parm) {
    if (parm === void 0) { parm = [d1, d2]; }
}
function x128(parm) {
    if (parm === void 0) { parm = [d1, d2]; }
}
function x129(parm) {
    if (parm === void 0) { parm = [d1, d2]; }
}
function x130(parm) {
    if (parm === void 0) { parm = { n: [d1, d2] }; }
}
function x131(parm) {
    if (parm === void 0) { parm = function (n) { var n; return null; }; }
}
function x132(parm) {
    if (parm === void 0) { parm = { func: function (n) { return [d1, d2]; } }; }
}
function x133() { return function () { return [d1, d2]; }; }
function x134() { return function () { return [d1, d2]; }; }
function x135() { return function named() { return [d1, d2]; }; }
function x136() { return function () { return [d1, d2]; }; }
function x137() { return function () { return [d1, d2]; }; }
function x138() { return function named() { return [d1, d2]; }; }
function x139() { return [d1, d2]; }
function x140() { return [d1, d2]; }
function x141() { return [d1, d2]; }
function x142() { return { n: [d1, d2] }; }
function x143() { return function (n) { var n; return null; }; }
function x144() { return { func: function (n) { return [d1, d2]; } }; }
function x145() { return function () { return [d1, d2]; }; return function () { return [d1, d2]; }; }
function x146() { return function () { return [d1, d2]; }; return function () { return [d1, d2]; }; }
function x147() { return function named() { return [d1, d2]; }; return function named() { return [d1, d2]; }; }
function x148() { return function () { return [d1, d2]; }; return function () { return [d1, d2]; }; }
function x149() { return function () { return [d1, d2]; }; return function () { return [d1, d2]; }; }
function x150() { return function named() { return [d1, d2]; }; return function named() { return [d1, d2]; }; }
function x151() { return [d1, d2]; return [d1, d2]; }
function x152() { return [d1, d2]; return [d1, d2]; }
function x153() { return [d1, d2]; return [d1, d2]; }
function x154() { return { n: [d1, d2] }; return { n: [d1, d2] }; }
function x155() { return function (n) { var n; return null; }; return function (n) { var n; return null; }; }
function x156() { return { func: function (n) { return [d1, d2]; } }; return { func: function (n) { return [d1, d2]; } }; }
var x157 = function () { return function () { return [d1, d2]; }; };
var x158 = function () { return function () { return [d1, d2]; }; };
var x159 = function () { return function named() { return [d1, d2]; }; };
var x160 = function () { return function () { return [d1, d2]; }; };
var x161 = function () { return function () { return [d1, d2]; }; };
var x162 = function () { return function named() { return [d1, d2]; }; };
var x163 = function () { return [d1, d2]; };
var x164 = function () { return [d1, d2]; };
var x165 = function () { return [d1, d2]; };
var x166 = function () { return { n: [d1, d2] }; };
var x167 = function () { return function (n) { var n; return null; }; };
var x168 = function () { return { func: function (n) { return [d1, d2]; } }; };
var x169 = function () { return function () { return [d1, d2]; }; };
var x170 = function () { return function () { return [d1, d2]; }; };
var x171 = function () { return function named() { return [d1, d2]; }; };
var x172 = function () { return function () { return [d1, d2]; }; };
var x173 = function () { return function () { return [d1, d2]; }; };
var x174 = function () { return function named() { return [d1, d2]; }; };
var x175 = function () { return [d1, d2]; };
var x176 = function () { return [d1, d2]; };
var x177 = function () { return [d1, d2]; };
var x178 = function () { return { n: [d1, d2] }; };
var x179 = function () { return function (n) { var n; return null; }; };
var x180 = function () { return { func: function (n) { return [d1, d2]; } }; };
var x181;
(function (x181) {
    var t = function () { return [d1, d2]; };
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
    var t = function () { return [d1, d2]; };
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
    var t = function (n) { var n; return null; };
})(x191 || (x191 = {}));
var x192;
(function (x192) {
    var t = { func: function (n) { return [d1, d2]; } };
})(x192 || (x192 = {}));
var x193;
(function (x193) {
    x193.t = function () { return [d1, d2]; };
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
    x196.t = function () { return [d1, d2]; };
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
    x203.t = function (n) { var n; return null; };
})(x203 || (x203 = {}));
var x204;
(function (x204) {
    x204.t = { func: function (n) { return [d1, d2]; } };
})(x204 || (x204 = {}));
var x206 = function () { return [d1, d2]; };
var x207 = function named() { return [d1, d2]; };
var x209 = function () { return [d1, d2]; };
var x210 = function named() { return [d1, d2]; };
var x211 = [d1, d2];
var x212 = [d1, d2];
var x213 = [d1, d2];
var x214 = { n: [d1, d2] };
var x216 = { func: function (n) { return [d1, d2]; } };
var x217 = undefined || function () { return [d1, d2]; };
var x218 = undefined || function named() { return [d1, d2]; };
var x219 = undefined || function () { return [d1, d2]; };
var x220 = undefined || function named() { return [d1, d2]; };
var x221 = undefined || [d1, d2];
var x222 = undefined || [d1, d2];
var x223 = undefined || [d1, d2];
var x224 = undefined || { n: [d1, d2] };
var x225;
x225 = function () { return [d1, d2]; };
var x226;
x226 = function () { return [d1, d2]; };
var x227;
x227 = function named() { return [d1, d2]; };
var x228;
x228 = function () { return [d1, d2]; };
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
x235 = function (n) { var n; return null; };
var x236;
x236 = { func: function (n) { return [d1, d2]; } };
var x237 = { n: function () { return [d1, d2]; } };
var x238 = { n: function () { return [d1, d2]; } };
var x239 = { n: function named() { return [d1, d2]; } };
var x240 = { n: function () { return [d1, d2]; } };
var x241 = { n: function () { return [d1, d2]; } };
var x242 = { n: function named() { return [d1, d2]; } };
var x243 = { n: [d1, d2] };
var x244 = { n: [d1, d2] };
var x245 = { n: [d1, d2] };
var x246 = { n: { n: [d1, d2] } };
var x247 = { n: function (n) { var n; return null; } };
var x248 = { n: { func: function (n) { return [d1, d2]; } } };
var x252 = [function () { return [d1, d2]; }];
var x253 = [function () { return [d1, d2]; }];
var x254 = [function named() { return [d1, d2]; }];
var x255 = [[d1, d2]];
var x256 = [[d1, d2]];
var x257 = [[d1, d2]];
var x258 = [{ n: [d1, d2] }];
var x260 = [{ func: function (n) { return [d1, d2]; } }];
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
var x285 = true ? function () { return [d1, d2]; } : function () { return [d1, d2]; };
var x286 = true ? function () { return [d1, d2]; } : function () { return [d1, d2]; };
var x287 = true ? function named() { return [d1, d2]; } : function named() { return [d1, d2]; };
var x288 = true ? function () { return [d1, d2]; } : function () { return [d1, d2]; };
var x289 = true ? function () { return [d1, d2]; } : function () { return [d1, d2]; };
var x290 = true ? function named() { return [d1, d2]; } : function named() { return [d1, d2]; };
var x291 = true ? [d1, d2] : [d1, d2];
var x292 = true ? [d1, d2] : [d1, d2];
var x293 = true ? [d1, d2] : [d1, d2];
var x294 = true ? { n: [d1, d2] } : { n: [d1, d2] };
var x295 = true ? function (n) { var n; return null; } : function (n) { var n; return null; };
var x296 = true ? { func: function (n) { return [d1, d2]; } } : { func: function (n) { return [d1, d2]; } };
var x297 = true ? undefined : function () { return [d1, d2]; };
var x298 = true ? undefined : function () { return [d1, d2]; };
var x299 = true ? undefined : function named() { return [d1, d2]; };
var x300 = true ? undefined : function () { return [d1, d2]; };
var x301 = true ? undefined : function () { return [d1, d2]; };
var x302 = true ? undefined : function named() { return [d1, d2]; };
var x303 = true ? undefined : [d1, d2];
var x304 = true ? undefined : [d1, d2];
var x305 = true ? undefined : [d1, d2];
var x306 = true ? undefined : { n: [d1, d2] };
var x307 = true ? undefined : function (n) { var n; return null; };
var x308 = true ? undefined : { func: function (n) { return [d1, d2]; } };
var x309 = true ? function () { return [d1, d2]; } : undefined;
var x310 = true ? function () { return [d1, d2]; } : undefined;
var x311 = true ? function named() { return [d1, d2]; } : undefined;
var x312 = true ? function () { return [d1, d2]; } : undefined;
var x313 = true ? function () { return [d1, d2]; } : undefined;
var x314 = true ? function named() { return [d1, d2]; } : undefined;
var x315 = true ? [d1, d2] : undefined;
var x316 = true ? [d1, d2] : undefined;
var x317 = true ? [d1, d2] : undefined;
var x318 = true ? { n: [d1, d2] } : undefined;
var x319 = true ? function (n) { var n; return null; } : undefined;
var x320 = true ? { func: function (n) { return [d1, d2]; } } : undefined;
function x321(n) { }
;
x321(function () { return [d1, d2]; });
function x322(n) { }
;
x322(function () { return [d1, d2]; });
function x323(n) { }
;
x323(function named() { return [d1, d2]; });
function x324(n) { }
;
x324(function () { return [d1, d2]; });
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
x331(function (n) { var n; return null; });
function x332(n) { }
;
x332({ func: function (n) { return [d1, d2]; } });
var x333 = function (n) { return n; };
x333(function () { return [d1, d2]; });
var x334 = function (n) { return n; };
x334(function () { return [d1, d2]; });
var x335 = function (n) { return n; };
x335(function named() { return [d1, d2]; });
var x336 = function (n) { return n; };
x336(function () { return [d1, d2]; });
var x337 = function (n) { return n; };
x337(function () { return [d1, d2]; });
var x338 = function (n) { return n; };
x338(function named() { return [d1, d2]; });
var x339 = function (n) { return n; };
x339([d1, d2]);
var x340 = function (n) { return n; };
x340([d1, d2]);
var x341 = function (n) { return n; };
x341([d1, d2]);
var x342 = function (n) { return n; };
x342({ n: [d1, d2] });
var x343 = function (n) { return n; };
x343(function (n) { var n; return null; });
var x344 = function (n) { return n; };
x344({ func: function (n) { return [d1, d2]; } });
var x345 = function (n) { };
x345(function () { return [d1, d2]; });
var x346 = function (n) { };
x346(function () { return [d1, d2]; });
var x347 = function (n) { };
x347(function named() { return [d1, d2]; });
var x348 = function (n) { };
x348(function () { return [d1, d2]; });
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
x355(function (n) { var n; return null; });
var x356 = function (n) { };
x356({ func: function (n) { return [d1, d2]; } });
