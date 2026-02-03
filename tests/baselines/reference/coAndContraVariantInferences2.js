//// [tests/cases/compiler/coAndContraVariantInferences2.ts] ////

//// [coAndContraVariantInferences2.ts]
interface A { a: string }
interface B extends A { b: string }
interface C extends A { c: string }

declare function cast<T, U extends T>(x: T, test: (x: T) => x is U): U;

declare function isC(x: A): x is C;

function f1(a: A, b: B) {
    const x1 = cast(a, isC);  // cast<A, C>
    const x2 = cast(b, isC);  // cast<A, C>
}

declare function useA(a: A): void;

declare function consume<T, U extends T>(t: T, u: U, f: (x: T) => void): void;

function f2(b: B, c: C) {
    consume(b, c, useA);  // consume<A, C>
    consume(c, b, useA);  // consume<A, B>
    consume(b, b, useA);  // consume<B, B>
    consume(c, c, useA);  // consume<C, C>
}

declare function every<T, U extends T>(array: readonly T[], f: (x: T) => x is U): array is readonly U[];

function f3(arr: readonly B[] | readonly C[]) {
    if (every(arr, isC)) {
        arr; // readonly C[]
    }
    else {
        arr; // readonly B[]
    }
}

// Repro from #52111

enum SyntaxKind {
    Block,
    Identifier,
    CaseClause,
    FunctionExpression,
    FunctionDeclaration,
}

interface Node { kind: SyntaxKind; }
interface Expression extends Node { _expressionBrand: any; }
interface Declaration extends Node { _declarationBrand: any; }
interface Block extends Node { kind: SyntaxKind.Block; }
interface Identifier extends Expression, Declaration { kind: SyntaxKind.Identifier; }
interface CaseClause extends Node { kind: SyntaxKind.CaseClause; }
interface FunctionDeclaration extends Declaration { kind: SyntaxKind.FunctionDeclaration; }

type HasLocals = Block | FunctionDeclaration;
declare function canHaveLocals(node: Node): node is HasLocals;

declare function assertNode<T extends Node, U extends T>(node: T | undefined, test: (node: T) => node is U): asserts node is U;
declare function assertNode(node: Node | undefined, test: ((node: Node) => boolean) | undefined): void;

function foo(node: FunctionDeclaration | CaseClause) {
    assertNode(node, canHaveLocals);  // assertNode<Node, HasLocals>
    node;  // FunctionDeclaration
}

declare function isExpression(node: Node): node is Expression;

declare function tryCast<TOut extends TIn, TIn = any>(value: TIn | undefined, test: (value: TIn) => value is TOut): TOut;

function bar(node: Identifier | FunctionDeclaration) {
    const a = tryCast(node, isExpression);  // tryCast<Expression, Node>
}

// Repro from #49924

const enum SyntaxKind1 {
    ClassExpression,
    ClassStatement,
}

interface Node1 {
    kind: SyntaxKind1;
}

interface Statement1 extends Node1 {
    _statementBrand: any;
}

interface ClassExpression1 extends Node1 {
    kind: SyntaxKind1.ClassExpression;
}

interface ClassStatement1 extends Statement1 {
    kind: SyntaxKind1.ClassStatement;
}

type ClassLike1 = ClassExpression1 | ClassStatement1;

declare function isClassLike(node: Node1): node is ClassLike1;

declare const statement: Statement1 | undefined;

const maybeClassStatement = tryCast(statement, isClassLike);  // ClassLike1

// Repro from #49924

interface TypeNode extends Node {
    typeInfo: string;
}

interface NodeArray<T extends Node> extends Array<T> {
    someProp: string;
}

declare function isNodeArray<T extends Node>(array: readonly T[]): array is NodeArray<T>;

declare const types: readonly TypeNode[];

const x = tryCast(types, isNodeArray);  // NodeAray<TypeNode>


//// [coAndContraVariantInferences2.js]
"use strict";
function f1(a, b) {
    var x1 = cast(a, isC); // cast<A, C>
    var x2 = cast(b, isC); // cast<A, C>
}
function f2(b, c) {
    consume(b, c, useA); // consume<A, C>
    consume(c, b, useA); // consume<A, B>
    consume(b, b, useA); // consume<B, B>
    consume(c, c, useA); // consume<C, C>
}
function f3(arr) {
    if (every(arr, isC)) {
        arr; // readonly C[]
    }
    else {
        arr; // readonly B[]
    }
}
// Repro from #52111
var SyntaxKind;
(function (SyntaxKind) {
    SyntaxKind[SyntaxKind["Block"] = 0] = "Block";
    SyntaxKind[SyntaxKind["Identifier"] = 1] = "Identifier";
    SyntaxKind[SyntaxKind["CaseClause"] = 2] = "CaseClause";
    SyntaxKind[SyntaxKind["FunctionExpression"] = 3] = "FunctionExpression";
    SyntaxKind[SyntaxKind["FunctionDeclaration"] = 4] = "FunctionDeclaration";
})(SyntaxKind || (SyntaxKind = {}));
function foo(node) {
    assertNode(node, canHaveLocals); // assertNode<Node, HasLocals>
    node; // FunctionDeclaration
}
function bar(node) {
    var a = tryCast(node, isExpression); // tryCast<Expression, Node>
}
var maybeClassStatement = tryCast(statement, isClassLike); // ClassLike1
var x = tryCast(types, isNodeArray); // NodeAray<TypeNode>
