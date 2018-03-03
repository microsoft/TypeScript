/// <reference path="fourslash.ts"/>

// @Filename: /a.ts
////export type x = number;
////export class y {};

// @Filename: /b.ts
////import { /*0*/x, /*1*/y } from "./a";
////const v: /*2*/x = /*3*/y;

goTo.file("/b.ts");

const [m0, m1, m2, m3] = test.markers();
const c = classification;
verify.semanticClassificationsAre(
    c.typeAliasName("x", m0.position),
    c.className("y", m1.position),
    c.typeAliasName("x", m2.position),
    c.className("y", m3.position),
);
