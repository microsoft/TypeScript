// @strict: true
// @noEmit: true
// @checkOrder: default,typesfirst

// Inferring a method's return type resolves a call whose argument check
// relates the method's own class to an interface containing that method, so
// the relation compares the method while its return type is in progress.
// TypeScript reads the in-progress return type as `any` there without failing
// it, and call resolution hides the resolutions below it, so no TS7023 is
// reported in any check order and the method gets the call's return type.
// (Reduced from meta/lexical HeadingNode.$config and effect SchemaAST getParser.)

// Through a callback returning an instance (lexical).
interface Base { m(): unknown }
declare function config(config: { f?: () => Base }): void;

declare const h: Heading;
const b: Base = h;

class Heading {
    m() {
        return config({ f: () => create() });
    }
}

declare function create(): Heading;

const r: void = new Heading().m();

// Passing `this` directly (effect).
type Parser = (input: unknown) => unknown;
interface NullNode { readonly _tag: "Null"; getParser(): Parser }
interface UndefinedNode { readonly _tag: "Undefined"; getParser(): Parser }
type AST = NullNode | UndefinedNode;
declare function fromConst(ast: AST, value: unknown): Parser;

const NullNode: new () => NullNode = class {
    readonly _tag = "Null";
    getParser() {
        return fromConst(this, null);
    }
};

const p: Parser = new NullNode().getParser();
