//// [intersectionOfIdenticalTypesNotComplex.ts]
// Just a short block to make a union with > 300 unique members
export type Bit = 0 | 1;
export type SyntaxKind = `${Bit}${Bit}${Bit}${Bit}${Bit}${Bit}${Bit}${Bit}${Bit}`
type NodeMaker<T extends SyntaxKind = SyntaxKind> = T extends T ? {kind: T}: never;

type Node = NodeMaker;
type Ok = Node & Node;

type Node2 = NodeMaker;
type Wat = Node & Node2;

//// [intersectionOfIdenticalTypesNotComplex.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
