// @strict: true

interface DeprecationOptions {
    message?: string;
    error?: boolean;
    name?: string;
}

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

type OverloadDefinitions = { readonly [P in number]: (...args: any[]) => any; };

type OverloadBinder<T extends OverloadDefinitions> = (args: OverloadParameters<T>) => OverloadKeys<T> | undefined;

type OverloadKeys<T extends OverloadDefinitions> = Extract<keyof T, number>;

type OverloadParameters<T extends OverloadDefinitions> = Parameters<{ [P in OverloadKeys<T>]: T[P]; }[OverloadKeys<T>]>;

type OverloadFunction<T extends OverloadDefinitions> = UnionToIntersection<T[keyof T]>;

type OverloadBinders<T extends OverloadDefinitions> = { [P in OverloadKeys<T>]: (args: OverloadParameters<T>) => boolean | undefined; };

type OverloadDeprecations<T extends OverloadDefinitions> = { [P in OverloadKeys<T>]?: DeprecationOptions; };

declare function createOverload<T extends OverloadDefinitions>(name: string, overloads: T, binder: OverloadBinders<T>, deprecations?: OverloadDeprecations<T>): UnionToIntersection<T[keyof T]>;

declare function createBinder<T extends OverloadDefinitions>(overloads: T, binder: OverloadBinders<T>): OverloadBinder<T>;

interface OverloadBuilder {
    overload<T extends OverloadDefinitions>(overloads: T): BindableOverloadBuilder<T>;
}

interface BindableOverloadBuilder<T extends OverloadDefinitions> {
    bind(binder: OverloadBinders<T>): BoundOverloadBuilder<T>;
}

interface FinishableOverloadBuilder<T extends OverloadDefinitions> {
    finish(): OverloadFunction<T>;
}

interface BoundOverloadBuilder<T extends OverloadDefinitions> extends FinishableOverloadBuilder<T> {
    deprecate(deprecations: OverloadDeprecations<T>): FinishableOverloadBuilder<T>;
}

declare function buildOverload(name: string): OverloadBuilder;

const enum SyntaxKind {
    ImportDeclaration,
    Modifier,
    ImportClause,
    AssertClause,
    Decorator
}

interface Node {
    kind: SyntaxKind;
}

interface Declaration extends Node { _declarationBrand: any }
interface Statement extends Node { _statementBrand: any };
interface Expression extends Node { _expressionBrand: any; }

interface ImportDeclaration extends Statement { kind: SyntaxKind.ImportDeclaration; }
interface Modifier extends Node { kind: SyntaxKind.Modifier; }
interface Decorator extends Node { kind: SyntaxKind.Decorator; }
interface ImportClause extends Declaration { kind: SyntaxKind.ImportClause; }
interface AssertClause extends Node { kind: SyntaxKind.AssertClause; }

declare function isExpression(node: Node): node is Expression;
declare function isAssertClause(node: Node): node is AssertClause;
declare function isImportClause(node: Node): node is ImportClause;
declare function isModifier(node: Node): node is Modifier;
declare function isDecorator(node: Node): node is Decorator;

declare const updateImportDeclaration: {
    (node: ImportDeclaration, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause: AssertClause | undefined): ImportDeclaration;
    (node: ImportDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause: AssertClause | undefined): ImportDeclaration;
}

declare function every<T, U extends T>(array: readonly T[], callback: (element: T, index: number) => element is U): array is readonly U[];
declare function every<T, U extends T>(array: readonly T[] | undefined, callback: (element: T, index: number) => element is U): array is readonly U[] | undefined;
declare function every<T>(array: readonly T[] | undefined, callback: (element: T, index: number) => boolean): boolean;

declare function isArray(value: any): value is readonly unknown[];

declare const DISALLOW_DECORATORS: DeprecationOptions;

buildOverload("updateImportDeclaration")
    .overload({
        0(node: ImportDeclaration, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause: AssertClause | undefined): ImportDeclaration {
            return updateImportDeclaration(node, modifiers, importClause, moduleSpecifier, assertClause);
        },

        1(node: ImportDeclaration, _decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause: AssertClause | undefined): ImportDeclaration {
            return updateImportDeclaration(node, modifiers, importClause, moduleSpecifier, assertClause);
        },
    })
    .bind({
        0: ([, modifiers, importClause, moduleSpecifier, assertClause, other]) =>
            (other === undefined) &&
            (modifiers === undefined || every(modifiers, isModifier)) &&
            (importClause === undefined || !isArray(importClause)) &&
            (moduleSpecifier === undefined || isExpression(moduleSpecifier)) &&
            (assertClause === undefined || isAssertClause(assertClause)),

        1: ([, decorators, modifiers, importClause, moduleSpecifier, assertClause]) =>
            (decorators === undefined || every(decorators, isDecorator)) &&
            (modifiers === undefined || isArray(modifiers)) &&
            (importClause === undefined || isImportClause(importClause)) &&
            (moduleSpecifier !== undefined && isExpression(moduleSpecifier)) &&
            (assertClause === undefined || isAssertClause(assertClause)),
    })
    .deprecate({
        1: DISALLOW_DECORATORS
    })
    .finish();


declare const modifiers: readonly Modifier[] | readonly Decorator[];

function foo() {
    every(modifiers, isModifier);
    every(modifiers, isDecorator);
}
