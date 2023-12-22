//// [tests/cases/compiler/trackedSymbolsNoCrash.ts] ////

//// [ast.ts]
export enum SyntaxKind { Node0, Node1, Node2, Node3, Node4, Node5, Node6, Node7, Node8, Node9, Node10, Node11, Node12, Node13, Node14, Node15, Node16, Node17, Node18, Node19, Node20, Node21, Node22, Node23, Node24, Node25, Node26, Node27, Node28, Node29, Node30, Node31, Node32, Node33, Node34, Node35, Node36, Node37, Node38, Node39, Node40, Node41, Node42, Node43, Node44, Node45, Node46, Node47, Node48, Node49, Node50, Node51, Node52, Node53, Node54, Node55, Node56, Node57, Node58, Node59, Node60, Node61, Node62, Node63, Node64, Node65, Node66, Node67, Node68, Node69, Node70, Node71, Node72, Node73, Node74, Node75, Node76, Node77, Node78, Node79, Node80, Node81, Node82, Node83, Node84, Node85, Node86, Node87, Node88, Node89, Node90, Node91, Node92, Node93, Node94, Node95, Node96, Node97, Node98, Node99 }

export interface Node0 { kind: SyntaxKind.Node0; propNode0: number; }
export interface Node1 { kind: SyntaxKind.Node1; propNode1: number; }
export interface Node2 { kind: SyntaxKind.Node2; propNode2: number; }
export interface Node3 { kind: SyntaxKind.Node3; propNode3: number; }
export interface Node4 { kind: SyntaxKind.Node4; propNode4: number; }
export interface Node5 { kind: SyntaxKind.Node5; propNode5: number; }
export interface Node6 { kind: SyntaxKind.Node6; propNode6: number; }
export interface Node7 { kind: SyntaxKind.Node7; propNode7: number; }
export interface Node8 { kind: SyntaxKind.Node8; propNode8: number; }
export interface Node9 { kind: SyntaxKind.Node9; propNode9: number; }
export interface Node10 { kind: SyntaxKind.Node10; propNode10: number; }
export interface Node11 { kind: SyntaxKind.Node11; propNode11: number; }
export interface Node12 { kind: SyntaxKind.Node12; propNode12: number; }
export interface Node13 { kind: SyntaxKind.Node13; propNode13: number; }
export interface Node14 { kind: SyntaxKind.Node14; propNode14: number; }
export interface Node15 { kind: SyntaxKind.Node15; propNode15: number; }
export interface Node16 { kind: SyntaxKind.Node16; propNode16: number; }
export interface Node17 { kind: SyntaxKind.Node17; propNode17: number; }
export interface Node18 { kind: SyntaxKind.Node18; propNode18: number; }
export interface Node19 { kind: SyntaxKind.Node19; propNode19: number; }
export interface Node20 { kind: SyntaxKind.Node20; propNode20: number; }
export interface Node21 { kind: SyntaxKind.Node21; propNode21: number; }
export interface Node22 { kind: SyntaxKind.Node22; propNode22: number; }
export interface Node23 { kind: SyntaxKind.Node23; propNode23: number; }
export interface Node24 { kind: SyntaxKind.Node24; propNode24: number; }
export interface Node25 { kind: SyntaxKind.Node25; propNode25: number; }
export interface Node26 { kind: SyntaxKind.Node26; propNode26: number; }
export interface Node27 { kind: SyntaxKind.Node27; propNode27: number; }
export interface Node28 { kind: SyntaxKind.Node28; propNode28: number; }
export interface Node29 { kind: SyntaxKind.Node29; propNode29: number; }
export interface Node30 { kind: SyntaxKind.Node30; propNode30: number; }
export interface Node31 { kind: SyntaxKind.Node31; propNode31: number; }
export interface Node32 { kind: SyntaxKind.Node32; propNode32: number; }
export interface Node33 { kind: SyntaxKind.Node33; propNode33: number; }
export interface Node34 { kind: SyntaxKind.Node34; propNode34: number; }
export interface Node35 { kind: SyntaxKind.Node35; propNode35: number; }
export interface Node36 { kind: SyntaxKind.Node36; propNode36: number; }
export interface Node37 { kind: SyntaxKind.Node37; propNode37: number; }
export interface Node38 { kind: SyntaxKind.Node38; propNode38: number; }
export interface Node39 { kind: SyntaxKind.Node39; propNode39: number; }
export interface Node40 { kind: SyntaxKind.Node40; propNode40: number; }
export interface Node41 { kind: SyntaxKind.Node41; propNode41: number; }
export interface Node42 { kind: SyntaxKind.Node42; propNode42: number; }
export interface Node43 { kind: SyntaxKind.Node43; propNode43: number; }
export interface Node44 { kind: SyntaxKind.Node44; propNode44: number; }
export interface Node45 { kind: SyntaxKind.Node45; propNode45: number; }
export interface Node46 { kind: SyntaxKind.Node46; propNode46: number; }
export interface Node47 { kind: SyntaxKind.Node47; propNode47: number; }
export interface Node48 { kind: SyntaxKind.Node48; propNode48: number; }
export interface Node49 { kind: SyntaxKind.Node49; propNode49: number; }
export interface Node50 { kind: SyntaxKind.Node50; propNode50: number; }
export interface Node51 { kind: SyntaxKind.Node51; propNode51: number; }
export interface Node52 { kind: SyntaxKind.Node52; propNode52: number; }
export interface Node53 { kind: SyntaxKind.Node53; propNode53: number; }
export interface Node54 { kind: SyntaxKind.Node54; propNode54: number; }
export interface Node55 { kind: SyntaxKind.Node55; propNode55: number; }
export interface Node56 { kind: SyntaxKind.Node56; propNode56: number; }
export interface Node57 { kind: SyntaxKind.Node57; propNode57: number; }
export interface Node58 { kind: SyntaxKind.Node58; propNode58: number; }
export interface Node59 { kind: SyntaxKind.Node59; propNode59: number; }
export interface Node60 { kind: SyntaxKind.Node60; propNode60: number; }
export interface Node61 { kind: SyntaxKind.Node61; propNode61: number; }
export interface Node62 { kind: SyntaxKind.Node62; propNode62: number; }
export interface Node63 { kind: SyntaxKind.Node63; propNode63: number; }
export interface Node64 { kind: SyntaxKind.Node64; propNode64: number; }
export interface Node65 { kind: SyntaxKind.Node65; propNode65: number; }
export interface Node66 { kind: SyntaxKind.Node66; propNode66: number; }
export interface Node67 { kind: SyntaxKind.Node67; propNode67: number; }
export interface Node68 { kind: SyntaxKind.Node68; propNode68: number; }
export interface Node69 { kind: SyntaxKind.Node69; propNode69: number; }
export interface Node70 { kind: SyntaxKind.Node70; propNode70: number; }
export interface Node71 { kind: SyntaxKind.Node71; propNode71: number; }
export interface Node72 { kind: SyntaxKind.Node72; propNode72: number; }
export interface Node73 { kind: SyntaxKind.Node73; propNode73: number; }
export interface Node74 { kind: SyntaxKind.Node74; propNode74: number; }
export interface Node75 { kind: SyntaxKind.Node75; propNode75: number; }
export interface Node76 { kind: SyntaxKind.Node76; propNode76: number; }
export interface Node77 { kind: SyntaxKind.Node77; propNode77: number; }
export interface Node78 { kind: SyntaxKind.Node78; propNode78: number; }
export interface Node79 { kind: SyntaxKind.Node79; propNode79: number; }
export interface Node80 { kind: SyntaxKind.Node80; propNode80: number; }
export interface Node81 { kind: SyntaxKind.Node81; propNode81: number; }
export interface Node82 { kind: SyntaxKind.Node82; propNode82: number; }
export interface Node83 { kind: SyntaxKind.Node83; propNode83: number; }
export interface Node84 { kind: SyntaxKind.Node84; propNode84: number; }
export interface Node85 { kind: SyntaxKind.Node85; propNode85: number; }
export interface Node86 { kind: SyntaxKind.Node86; propNode86: number; }
export interface Node87 { kind: SyntaxKind.Node87; propNode87: number; }
export interface Node88 { kind: SyntaxKind.Node88; propNode88: number; }
export interface Node89 { kind: SyntaxKind.Node89; propNode89: number; }
export interface Node90 { kind: SyntaxKind.Node90; propNode90: number; }
export interface Node91 { kind: SyntaxKind.Node91; propNode91: number; }
export interface Node92 { kind: SyntaxKind.Node92; propNode92: number; }
export interface Node93 { kind: SyntaxKind.Node93; propNode93: number; }
export interface Node94 { kind: SyntaxKind.Node94; propNode94: number; }
export interface Node95 { kind: SyntaxKind.Node95; propNode95: number; }
export interface Node96 { kind: SyntaxKind.Node96; propNode96: number; }
export interface Node97 { kind: SyntaxKind.Node97; propNode97: number; }
export interface Node98 { kind: SyntaxKind.Node98; propNode98: number; }
export interface Node99 { kind: SyntaxKind.Node99; propNode99: number; }

export type Node = Node0 | Node1 | Node2 | Node3 | Node4 | Node5 | Node6 | Node7 | Node8 | Node9 | Node10 | Node11 | Node12 | Node13 | Node14 | Node15 | Node16 | Node17 | Node18 | Node19 | Node20 | Node21 | Node22 | Node23 | Node24 | Node25 | Node26 | Node27 | Node28 | Node29 | Node30 | Node31 | Node32 | Node33 | Node34 | Node35 | Node36 | Node37 | Node38 | Node39 | Node40 | Node41 | Node42 | Node43 | Node44 | Node45 | Node46 | Node47 | Node48 | Node49 | Node50 | Node51 | Node52 | Node53 | Node54 | Node55 | Node56 | Node57 | Node58 | Node59 | Node60 | Node61 | Node62 | Node63 | Node64 | Node65 | Node66 | Node67 | Node68 | Node69 | Node70 | Node71 | Node72 | Node73 | Node74 | Node75 | Node76 | Node77 | Node78 | Node79 | Node80 | Node81 | Node82 | Node83 | Node84 | Node85 | Node86 | Node87 | Node88 | Node89 | Node90 | Node91 | Node92 | Node93 | Node94 | Node95 | Node96 | Node97 | Node98 | Node99;

//// [index.ts]
import * as ast from "./ast";

export const isNodeOfType =
  <NodeType extends ast.SyntaxKind>(nodeType: NodeType) =>
  (
    node: ast.Node | null | undefined,
  ): node is Extract<ast.Node, { kind: NodeType }> =>
    node?.kind === nodeType;



//// [ast.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntaxKind = void 0;
var SyntaxKind;
(function (SyntaxKind) {
    SyntaxKind[SyntaxKind["Node0"] = 0] = "Node0";
    SyntaxKind[SyntaxKind["Node1"] = 1] = "Node1";
    SyntaxKind[SyntaxKind["Node2"] = 2] = "Node2";
    SyntaxKind[SyntaxKind["Node3"] = 3] = "Node3";
    SyntaxKind[SyntaxKind["Node4"] = 4] = "Node4";
    SyntaxKind[SyntaxKind["Node5"] = 5] = "Node5";
    SyntaxKind[SyntaxKind["Node6"] = 6] = "Node6";
    SyntaxKind[SyntaxKind["Node7"] = 7] = "Node7";
    SyntaxKind[SyntaxKind["Node8"] = 8] = "Node8";
    SyntaxKind[SyntaxKind["Node9"] = 9] = "Node9";
    SyntaxKind[SyntaxKind["Node10"] = 10] = "Node10";
    SyntaxKind[SyntaxKind["Node11"] = 11] = "Node11";
    SyntaxKind[SyntaxKind["Node12"] = 12] = "Node12";
    SyntaxKind[SyntaxKind["Node13"] = 13] = "Node13";
    SyntaxKind[SyntaxKind["Node14"] = 14] = "Node14";
    SyntaxKind[SyntaxKind["Node15"] = 15] = "Node15";
    SyntaxKind[SyntaxKind["Node16"] = 16] = "Node16";
    SyntaxKind[SyntaxKind["Node17"] = 17] = "Node17";
    SyntaxKind[SyntaxKind["Node18"] = 18] = "Node18";
    SyntaxKind[SyntaxKind["Node19"] = 19] = "Node19";
    SyntaxKind[SyntaxKind["Node20"] = 20] = "Node20";
    SyntaxKind[SyntaxKind["Node21"] = 21] = "Node21";
    SyntaxKind[SyntaxKind["Node22"] = 22] = "Node22";
    SyntaxKind[SyntaxKind["Node23"] = 23] = "Node23";
    SyntaxKind[SyntaxKind["Node24"] = 24] = "Node24";
    SyntaxKind[SyntaxKind["Node25"] = 25] = "Node25";
    SyntaxKind[SyntaxKind["Node26"] = 26] = "Node26";
    SyntaxKind[SyntaxKind["Node27"] = 27] = "Node27";
    SyntaxKind[SyntaxKind["Node28"] = 28] = "Node28";
    SyntaxKind[SyntaxKind["Node29"] = 29] = "Node29";
    SyntaxKind[SyntaxKind["Node30"] = 30] = "Node30";
    SyntaxKind[SyntaxKind["Node31"] = 31] = "Node31";
    SyntaxKind[SyntaxKind["Node32"] = 32] = "Node32";
    SyntaxKind[SyntaxKind["Node33"] = 33] = "Node33";
    SyntaxKind[SyntaxKind["Node34"] = 34] = "Node34";
    SyntaxKind[SyntaxKind["Node35"] = 35] = "Node35";
    SyntaxKind[SyntaxKind["Node36"] = 36] = "Node36";
    SyntaxKind[SyntaxKind["Node37"] = 37] = "Node37";
    SyntaxKind[SyntaxKind["Node38"] = 38] = "Node38";
    SyntaxKind[SyntaxKind["Node39"] = 39] = "Node39";
    SyntaxKind[SyntaxKind["Node40"] = 40] = "Node40";
    SyntaxKind[SyntaxKind["Node41"] = 41] = "Node41";
    SyntaxKind[SyntaxKind["Node42"] = 42] = "Node42";
    SyntaxKind[SyntaxKind["Node43"] = 43] = "Node43";
    SyntaxKind[SyntaxKind["Node44"] = 44] = "Node44";
    SyntaxKind[SyntaxKind["Node45"] = 45] = "Node45";
    SyntaxKind[SyntaxKind["Node46"] = 46] = "Node46";
    SyntaxKind[SyntaxKind["Node47"] = 47] = "Node47";
    SyntaxKind[SyntaxKind["Node48"] = 48] = "Node48";
    SyntaxKind[SyntaxKind["Node49"] = 49] = "Node49";
    SyntaxKind[SyntaxKind["Node50"] = 50] = "Node50";
    SyntaxKind[SyntaxKind["Node51"] = 51] = "Node51";
    SyntaxKind[SyntaxKind["Node52"] = 52] = "Node52";
    SyntaxKind[SyntaxKind["Node53"] = 53] = "Node53";
    SyntaxKind[SyntaxKind["Node54"] = 54] = "Node54";
    SyntaxKind[SyntaxKind["Node55"] = 55] = "Node55";
    SyntaxKind[SyntaxKind["Node56"] = 56] = "Node56";
    SyntaxKind[SyntaxKind["Node57"] = 57] = "Node57";
    SyntaxKind[SyntaxKind["Node58"] = 58] = "Node58";
    SyntaxKind[SyntaxKind["Node59"] = 59] = "Node59";
    SyntaxKind[SyntaxKind["Node60"] = 60] = "Node60";
    SyntaxKind[SyntaxKind["Node61"] = 61] = "Node61";
    SyntaxKind[SyntaxKind["Node62"] = 62] = "Node62";
    SyntaxKind[SyntaxKind["Node63"] = 63] = "Node63";
    SyntaxKind[SyntaxKind["Node64"] = 64] = "Node64";
    SyntaxKind[SyntaxKind["Node65"] = 65] = "Node65";
    SyntaxKind[SyntaxKind["Node66"] = 66] = "Node66";
    SyntaxKind[SyntaxKind["Node67"] = 67] = "Node67";
    SyntaxKind[SyntaxKind["Node68"] = 68] = "Node68";
    SyntaxKind[SyntaxKind["Node69"] = 69] = "Node69";
    SyntaxKind[SyntaxKind["Node70"] = 70] = "Node70";
    SyntaxKind[SyntaxKind["Node71"] = 71] = "Node71";
    SyntaxKind[SyntaxKind["Node72"] = 72] = "Node72";
    SyntaxKind[SyntaxKind["Node73"] = 73] = "Node73";
    SyntaxKind[SyntaxKind["Node74"] = 74] = "Node74";
    SyntaxKind[SyntaxKind["Node75"] = 75] = "Node75";
    SyntaxKind[SyntaxKind["Node76"] = 76] = "Node76";
    SyntaxKind[SyntaxKind["Node77"] = 77] = "Node77";
    SyntaxKind[SyntaxKind["Node78"] = 78] = "Node78";
    SyntaxKind[SyntaxKind["Node79"] = 79] = "Node79";
    SyntaxKind[SyntaxKind["Node80"] = 80] = "Node80";
    SyntaxKind[SyntaxKind["Node81"] = 81] = "Node81";
    SyntaxKind[SyntaxKind["Node82"] = 82] = "Node82";
    SyntaxKind[SyntaxKind["Node83"] = 83] = "Node83";
    SyntaxKind[SyntaxKind["Node84"] = 84] = "Node84";
    SyntaxKind[SyntaxKind["Node85"] = 85] = "Node85";
    SyntaxKind[SyntaxKind["Node86"] = 86] = "Node86";
    SyntaxKind[SyntaxKind["Node87"] = 87] = "Node87";
    SyntaxKind[SyntaxKind["Node88"] = 88] = "Node88";
    SyntaxKind[SyntaxKind["Node89"] = 89] = "Node89";
    SyntaxKind[SyntaxKind["Node90"] = 90] = "Node90";
    SyntaxKind[SyntaxKind["Node91"] = 91] = "Node91";
    SyntaxKind[SyntaxKind["Node92"] = 92] = "Node92";
    SyntaxKind[SyntaxKind["Node93"] = 93] = "Node93";
    SyntaxKind[SyntaxKind["Node94"] = 94] = "Node94";
    SyntaxKind[SyntaxKind["Node95"] = 95] = "Node95";
    SyntaxKind[SyntaxKind["Node96"] = 96] = "Node96";
    SyntaxKind[SyntaxKind["Node97"] = 97] = "Node97";
    SyntaxKind[SyntaxKind["Node98"] = 98] = "Node98";
    SyntaxKind[SyntaxKind["Node99"] = 99] = "Node99";
})(SyntaxKind || (exports.SyntaxKind = SyntaxKind = {}));
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNodeOfType = void 0;
var isNodeOfType = function (nodeType) {
    return function (node) {
        return (node === null || node === void 0 ? void 0 : node.kind) === nodeType;
    };
};
exports.isNodeOfType = isNodeOfType;


//// [ast.d.ts]
export declare enum SyntaxKind {
    Node0 = 0,
    Node1 = 1,
    Node2 = 2,
    Node3 = 3,
    Node4 = 4,
    Node5 = 5,
    Node6 = 6,
    Node7 = 7,
    Node8 = 8,
    Node9 = 9,
    Node10 = 10,
    Node11 = 11,
    Node12 = 12,
    Node13 = 13,
    Node14 = 14,
    Node15 = 15,
    Node16 = 16,
    Node17 = 17,
    Node18 = 18,
    Node19 = 19,
    Node20 = 20,
    Node21 = 21,
    Node22 = 22,
    Node23 = 23,
    Node24 = 24,
    Node25 = 25,
    Node26 = 26,
    Node27 = 27,
    Node28 = 28,
    Node29 = 29,
    Node30 = 30,
    Node31 = 31,
    Node32 = 32,
    Node33 = 33,
    Node34 = 34,
    Node35 = 35,
    Node36 = 36,
    Node37 = 37,
    Node38 = 38,
    Node39 = 39,
    Node40 = 40,
    Node41 = 41,
    Node42 = 42,
    Node43 = 43,
    Node44 = 44,
    Node45 = 45,
    Node46 = 46,
    Node47 = 47,
    Node48 = 48,
    Node49 = 49,
    Node50 = 50,
    Node51 = 51,
    Node52 = 52,
    Node53 = 53,
    Node54 = 54,
    Node55 = 55,
    Node56 = 56,
    Node57 = 57,
    Node58 = 58,
    Node59 = 59,
    Node60 = 60,
    Node61 = 61,
    Node62 = 62,
    Node63 = 63,
    Node64 = 64,
    Node65 = 65,
    Node66 = 66,
    Node67 = 67,
    Node68 = 68,
    Node69 = 69,
    Node70 = 70,
    Node71 = 71,
    Node72 = 72,
    Node73 = 73,
    Node74 = 74,
    Node75 = 75,
    Node76 = 76,
    Node77 = 77,
    Node78 = 78,
    Node79 = 79,
    Node80 = 80,
    Node81 = 81,
    Node82 = 82,
    Node83 = 83,
    Node84 = 84,
    Node85 = 85,
    Node86 = 86,
    Node87 = 87,
    Node88 = 88,
    Node89 = 89,
    Node90 = 90,
    Node91 = 91,
    Node92 = 92,
    Node93 = 93,
    Node94 = 94,
    Node95 = 95,
    Node96 = 96,
    Node97 = 97,
    Node98 = 98,
    Node99 = 99
}
export interface Node0 {
    kind: SyntaxKind.Node0;
    propNode0: number;
}
export interface Node1 {
    kind: SyntaxKind.Node1;
    propNode1: number;
}
export interface Node2 {
    kind: SyntaxKind.Node2;
    propNode2: number;
}
export interface Node3 {
    kind: SyntaxKind.Node3;
    propNode3: number;
}
export interface Node4 {
    kind: SyntaxKind.Node4;
    propNode4: number;
}
export interface Node5 {
    kind: SyntaxKind.Node5;
    propNode5: number;
}
export interface Node6 {
    kind: SyntaxKind.Node6;
    propNode6: number;
}
export interface Node7 {
    kind: SyntaxKind.Node7;
    propNode7: number;
}
export interface Node8 {
    kind: SyntaxKind.Node8;
    propNode8: number;
}
export interface Node9 {
    kind: SyntaxKind.Node9;
    propNode9: number;
}
export interface Node10 {
    kind: SyntaxKind.Node10;
    propNode10: number;
}
export interface Node11 {
    kind: SyntaxKind.Node11;
    propNode11: number;
}
export interface Node12 {
    kind: SyntaxKind.Node12;
    propNode12: number;
}
export interface Node13 {
    kind: SyntaxKind.Node13;
    propNode13: number;
}
export interface Node14 {
    kind: SyntaxKind.Node14;
    propNode14: number;
}
export interface Node15 {
    kind: SyntaxKind.Node15;
    propNode15: number;
}
export interface Node16 {
    kind: SyntaxKind.Node16;
    propNode16: number;
}
export interface Node17 {
    kind: SyntaxKind.Node17;
    propNode17: number;
}
export interface Node18 {
    kind: SyntaxKind.Node18;
    propNode18: number;
}
export interface Node19 {
    kind: SyntaxKind.Node19;
    propNode19: number;
}
export interface Node20 {
    kind: SyntaxKind.Node20;
    propNode20: number;
}
export interface Node21 {
    kind: SyntaxKind.Node21;
    propNode21: number;
}
export interface Node22 {
    kind: SyntaxKind.Node22;
    propNode22: number;
}
export interface Node23 {
    kind: SyntaxKind.Node23;
    propNode23: number;
}
export interface Node24 {
    kind: SyntaxKind.Node24;
    propNode24: number;
}
export interface Node25 {
    kind: SyntaxKind.Node25;
    propNode25: number;
}
export interface Node26 {
    kind: SyntaxKind.Node26;
    propNode26: number;
}
export interface Node27 {
    kind: SyntaxKind.Node27;
    propNode27: number;
}
export interface Node28 {
    kind: SyntaxKind.Node28;
    propNode28: number;
}
export interface Node29 {
    kind: SyntaxKind.Node29;
    propNode29: number;
}
export interface Node30 {
    kind: SyntaxKind.Node30;
    propNode30: number;
}
export interface Node31 {
    kind: SyntaxKind.Node31;
    propNode31: number;
}
export interface Node32 {
    kind: SyntaxKind.Node32;
    propNode32: number;
}
export interface Node33 {
    kind: SyntaxKind.Node33;
    propNode33: number;
}
export interface Node34 {
    kind: SyntaxKind.Node34;
    propNode34: number;
}
export interface Node35 {
    kind: SyntaxKind.Node35;
    propNode35: number;
}
export interface Node36 {
    kind: SyntaxKind.Node36;
    propNode36: number;
}
export interface Node37 {
    kind: SyntaxKind.Node37;
    propNode37: number;
}
export interface Node38 {
    kind: SyntaxKind.Node38;
    propNode38: number;
}
export interface Node39 {
    kind: SyntaxKind.Node39;
    propNode39: number;
}
export interface Node40 {
    kind: SyntaxKind.Node40;
    propNode40: number;
}
export interface Node41 {
    kind: SyntaxKind.Node41;
    propNode41: number;
}
export interface Node42 {
    kind: SyntaxKind.Node42;
    propNode42: number;
}
export interface Node43 {
    kind: SyntaxKind.Node43;
    propNode43: number;
}
export interface Node44 {
    kind: SyntaxKind.Node44;
    propNode44: number;
}
export interface Node45 {
    kind: SyntaxKind.Node45;
    propNode45: number;
}
export interface Node46 {
    kind: SyntaxKind.Node46;
    propNode46: number;
}
export interface Node47 {
    kind: SyntaxKind.Node47;
    propNode47: number;
}
export interface Node48 {
    kind: SyntaxKind.Node48;
    propNode48: number;
}
export interface Node49 {
    kind: SyntaxKind.Node49;
    propNode49: number;
}
export interface Node50 {
    kind: SyntaxKind.Node50;
    propNode50: number;
}
export interface Node51 {
    kind: SyntaxKind.Node51;
    propNode51: number;
}
export interface Node52 {
    kind: SyntaxKind.Node52;
    propNode52: number;
}
export interface Node53 {
    kind: SyntaxKind.Node53;
    propNode53: number;
}
export interface Node54 {
    kind: SyntaxKind.Node54;
    propNode54: number;
}
export interface Node55 {
    kind: SyntaxKind.Node55;
    propNode55: number;
}
export interface Node56 {
    kind: SyntaxKind.Node56;
    propNode56: number;
}
export interface Node57 {
    kind: SyntaxKind.Node57;
    propNode57: number;
}
export interface Node58 {
    kind: SyntaxKind.Node58;
    propNode58: number;
}
export interface Node59 {
    kind: SyntaxKind.Node59;
    propNode59: number;
}
export interface Node60 {
    kind: SyntaxKind.Node60;
    propNode60: number;
}
export interface Node61 {
    kind: SyntaxKind.Node61;
    propNode61: number;
}
export interface Node62 {
    kind: SyntaxKind.Node62;
    propNode62: number;
}
export interface Node63 {
    kind: SyntaxKind.Node63;
    propNode63: number;
}
export interface Node64 {
    kind: SyntaxKind.Node64;
    propNode64: number;
}
export interface Node65 {
    kind: SyntaxKind.Node65;
    propNode65: number;
}
export interface Node66 {
    kind: SyntaxKind.Node66;
    propNode66: number;
}
export interface Node67 {
    kind: SyntaxKind.Node67;
    propNode67: number;
}
export interface Node68 {
    kind: SyntaxKind.Node68;
    propNode68: number;
}
export interface Node69 {
    kind: SyntaxKind.Node69;
    propNode69: number;
}
export interface Node70 {
    kind: SyntaxKind.Node70;
    propNode70: number;
}
export interface Node71 {
    kind: SyntaxKind.Node71;
    propNode71: number;
}
export interface Node72 {
    kind: SyntaxKind.Node72;
    propNode72: number;
}
export interface Node73 {
    kind: SyntaxKind.Node73;
    propNode73: number;
}
export interface Node74 {
    kind: SyntaxKind.Node74;
    propNode74: number;
}
export interface Node75 {
    kind: SyntaxKind.Node75;
    propNode75: number;
}
export interface Node76 {
    kind: SyntaxKind.Node76;
    propNode76: number;
}
export interface Node77 {
    kind: SyntaxKind.Node77;
    propNode77: number;
}
export interface Node78 {
    kind: SyntaxKind.Node78;
    propNode78: number;
}
export interface Node79 {
    kind: SyntaxKind.Node79;
    propNode79: number;
}
export interface Node80 {
    kind: SyntaxKind.Node80;
    propNode80: number;
}
export interface Node81 {
    kind: SyntaxKind.Node81;
    propNode81: number;
}
export interface Node82 {
    kind: SyntaxKind.Node82;
    propNode82: number;
}
export interface Node83 {
    kind: SyntaxKind.Node83;
    propNode83: number;
}
export interface Node84 {
    kind: SyntaxKind.Node84;
    propNode84: number;
}
export interface Node85 {
    kind: SyntaxKind.Node85;
    propNode85: number;
}
export interface Node86 {
    kind: SyntaxKind.Node86;
    propNode86: number;
}
export interface Node87 {
    kind: SyntaxKind.Node87;
    propNode87: number;
}
export interface Node88 {
    kind: SyntaxKind.Node88;
    propNode88: number;
}
export interface Node89 {
    kind: SyntaxKind.Node89;
    propNode89: number;
}
export interface Node90 {
    kind: SyntaxKind.Node90;
    propNode90: number;
}
export interface Node91 {
    kind: SyntaxKind.Node91;
    propNode91: number;
}
export interface Node92 {
    kind: SyntaxKind.Node92;
    propNode92: number;
}
export interface Node93 {
    kind: SyntaxKind.Node93;
    propNode93: number;
}
export interface Node94 {
    kind: SyntaxKind.Node94;
    propNode94: number;
}
export interface Node95 {
    kind: SyntaxKind.Node95;
    propNode95: number;
}
export interface Node96 {
    kind: SyntaxKind.Node96;
    propNode96: number;
}
export interface Node97 {
    kind: SyntaxKind.Node97;
    propNode97: number;
}
export interface Node98 {
    kind: SyntaxKind.Node98;
    propNode98: number;
}
export interface Node99 {
    kind: SyntaxKind.Node99;
    propNode99: number;
}
export type Node = Node0 | Node1 | Node2 | Node3 | Node4 | Node5 | Node6 | Node7 | Node8 | Node9 | Node10 | Node11 | Node12 | Node13 | Node14 | Node15 | Node16 | Node17 | Node18 | Node19 | Node20 | Node21 | Node22 | Node23 | Node24 | Node25 | Node26 | Node27 | Node28 | Node29 | Node30 | Node31 | Node32 | Node33 | Node34 | Node35 | Node36 | Node37 | Node38 | Node39 | Node40 | Node41 | Node42 | Node43 | Node44 | Node45 | Node46 | Node47 | Node48 | Node49 | Node50 | Node51 | Node52 | Node53 | Node54 | Node55 | Node56 | Node57 | Node58 | Node59 | Node60 | Node61 | Node62 | Node63 | Node64 | Node65 | Node66 | Node67 | Node68 | Node69 | Node70 | Node71 | Node72 | Node73 | Node74 | Node75 | Node76 | Node77 | Node78 | Node79 | Node80 | Node81 | Node82 | Node83 | Node84 | Node85 | Node86 | Node87 | Node88 | Node89 | Node90 | Node91 | Node92 | Node93 | Node94 | Node95 | Node96 | Node97 | Node98 | Node99;
//// [index.d.ts]
import * as ast from "./ast";
export declare const isNodeOfType: <NodeType extends ast.SyntaxKind>(nodeType: NodeType) => (node: ast.Node | null | undefined) => node is Extract<ast.Node0, {
    kind: NodeType;
}> | Extract<ast.Node1, {
    kind: NodeType;
}> | Extract<ast.Node2, {
    kind: NodeType;
}> | Extract<ast.Node3, {
    kind: NodeType;
}> | Extract<ast.Node4, {
    kind: NodeType;
}> | Extract<ast.Node5, {
    kind: NodeType;
}> | Extract<ast.Node6, {
    kind: NodeType;
}> | Extract<ast.Node7, {
    kind: NodeType;
}> | Extract<ast.Node8, {
    kind: NodeType;
}> | Extract<ast.Node9, {
    kind: NodeType;
}> | Extract<ast.Node10, {
    kind: NodeType;
}> | Extract<ast.Node11, {
    kind: NodeType;
}> | Extract<ast.Node12, {
    kind: NodeType;
}> | Extract<ast.Node13, {
    kind: NodeType;
}> | Extract<ast.Node14, {
    kind: NodeType;
}> | Extract<ast.Node15, {
    kind: NodeType;
}> | Extract<ast.Node16, {
    kind: NodeType;
}> | Extract<ast.Node17, {
    kind: NodeType;
}> | Extract<ast.Node18, {
    kind: NodeType;
}> | Extract<ast.Node19, {
    kind: NodeType;
}> | Extract<ast.Node20, {
    kind: NodeType;
}> | Extract<ast.Node21, {
    kind: NodeType;
}> | Extract<ast.Node22, {
    kind: NodeType;
}> | Extract<ast.Node23, {
    kind: NodeType;
}> | Extract<ast.Node24, {
    kind: NodeType;
}> | Extract<ast.Node25, {
    kind: NodeType;
}> | Extract<ast.Node26, {
    kind: NodeType;
}> | Extract<ast.Node27, {
    kind: NodeType;
}> | Extract<ast.Node28, {
    kind: NodeType;
}> | Extract<ast.Node29, {
    kind: NodeType;
}> | Extract<ast.Node30, {
    kind: NodeType;
}> | Extract<ast.Node31, {
    kind: NodeType;
}> | Extract<ast.Node32, {
    kind: NodeType;
}> | Extract<ast.Node33, {
    kind: NodeType;
}> | Extract<ast.Node34, {
    kind: NodeType;
}> | Extract<ast.Node35, {
    kind: NodeType;
}> | Extract<ast.Node36, {
    kind: NodeType;
}> | Extract<ast.Node37, {
    kind: NodeType;
}> | Extract<ast.Node38, {
    kind: NodeType;
}> | Extract<ast.Node39, {
    kind: NodeType;
}> | Extract<ast.Node40, {
    kind: NodeType;
}> | Extract<ast.Node41, {
    kind: NodeType;
}> | Extract<ast.Node42, {
    kind: NodeType;
}> | Extract<ast.Node43, {
    kind: NodeType;
}> | Extract<ast.Node44, {
    kind: NodeType;
}> | Extract<ast.Node45, {
    kind: NodeType;
}> | Extract<ast.Node46, {
    kind: NodeType;
}> | Extract<ast.Node47, {
    kind: NodeType;
}> | Extract<ast.Node48, {
    kind: NodeType;
}> | Extract<ast.Node49, {
    kind: NodeType;
}> | Extract<ast.Node50, {
    kind: NodeType;
}> | Extract<ast.Node51, {
    kind: NodeType;
}> | Extract<ast.Node52, {
    kind: NodeType;
}> | Extract<ast.Node53, {
    kind: NodeType;
}> | Extract<ast.Node54, {
    kind: NodeType;
}> | Extract<ast.Node55, {
    kind: NodeType;
}> | Extract<ast.Node56, {
    kind: NodeType;
}> | Extract<ast.Node57, {
    kind: NodeType;
}> | Extract<ast.Node58, {
    kind: NodeType;
}> | Extract<ast.Node59, {
    kind: NodeType;
}> | Extract<ast.Node60, {
    kind: NodeType;
}> | Extract<ast.Node61, {
    kind: NodeType;
}> | Extract<ast.Node62, {
    kind: NodeType;
}> | Extract<ast.Node63, {
    kind: NodeType;
}> | Extract<ast.Node64, {
    kind: NodeType;
}> | Extract<ast.Node65, {
    kind: NodeType;
}> | Extract<ast.Node66, {
    kind: NodeType;
}> | Extract<ast.Node67, {
    kind: NodeType;
}> | Extract<ast.Node68, {
    kind: NodeType;
}> | Extract<ast.Node69, {
    kind: NodeType;
}> | Extract<ast.Node70, {
    kind: NodeType;
}> | Extract<ast.Node71, {
    kind: NodeType;
}> | Extract<ast.Node72, {
    kind: NodeType;
}> | Extract<ast.Node73, {
    kind: NodeType;
}> | Extract<ast.Node74, {
    kind: NodeType;
}> | Extract<ast.Node75, {
    kind: NodeType;
}> | Extract<ast.Node76, {
    kind: NodeType;
}> | Extract<ast.Node77, {
    kind: NodeType;
}> | Extract<ast.Node78, {
    kind: NodeType;
}> | Extract<ast.Node79, {
    kind: NodeType;
}> | Extract<ast.Node80, {
    kind: NodeType;
}> | Extract<ast.Node81, {
    kind: NodeType;
}> | Extract<ast.Node82, {
    kind: NodeType;
}> | Extract<ast.Node83, {
    kind: NodeType;
}> | Extract<ast.Node84, {
    kind: NodeType;
}> | Extract<ast.Node85, {
    kind: NodeType;
}> | Extract<ast.Node86, {
    kind: NodeType;
}> | Extract<ast.Node87, {
    kind: NodeType;
}> | Extract<ast.Node88, {
    kind: NodeType;
}> | Extract<ast.Node89, {
    kind: NodeType;
}> | Extract<ast.Node90, {
    kind: NodeType;
}> | Extract<ast.Node91, {
    kind: NodeType;
}> | Extract<ast.Node92, {
    kind: NodeType;
}> | Extract<ast.Node93, {
    kind: NodeType;
}> | Extract<ast.Node94, {
    kind: NodeType;
}> | Extract<ast.Node95, {
    kind: NodeType;
}> | Extract<ast.Node96, {
    kind: NodeType;
}> | Extract<ast.Node97, {
    kind: NodeType;
}> | Extract<ast.Node98, {
    kind: NodeType;
}> | Extract<ast.Node99, {
    kind: NodeType;
}>;
