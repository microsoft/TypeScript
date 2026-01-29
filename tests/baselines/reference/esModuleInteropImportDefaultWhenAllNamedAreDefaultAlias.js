//// [tests/cases/compiler/esModuleInteropImportDefaultWhenAllNamedAreDefaultAlias.ts] ////

//// [esModuleInteropImportDefaultWhenAllNamedAreDefaultAlias.ts]
import {default as a, default as b} from "m";
void a;
void b;

//// [esModuleInteropImportDefaultWhenAllNamedAreDefaultAlias.js]
import { default as a, default as b } from "m";
void a;
void b;
