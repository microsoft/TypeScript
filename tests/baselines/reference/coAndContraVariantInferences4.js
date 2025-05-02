//// [tests/cases/compiler/coAndContraVariantInferences4.ts] ////

//// [coAndContraVariantInferences4.ts]
const enum SyntaxKind {
    Modifier,
    Decorator,
}

interface Node {
    kind: SyntaxKind;
}

interface Modifier extends Node { kind: SyntaxKind.Modifier; }
interface Decorator extends Node { kind: SyntaxKind.Decorator; }

declare function isModifier(node: Node): node is Modifier;
declare function isDecorator(node: Node): node is Decorator;

declare function every<T, U extends T>(array: readonly T[], callback: (element: T) => element is U): array is readonly U[];

declare const modifiers: readonly Decorator[] | readonly Modifier[];

function foo() {
    every(modifiers, isModifier);
    every(modifiers, isDecorator);
}


//// [coAndContraVariantInferences4.js]
"use strict";
function foo() {
    every(modifiers, isModifier);
    every(modifiers, isDecorator);
}
