import * as tsi from "typescript";

export abstract class SyntacticLintWalker implements tsi.LintWalker {
    static "extension-kind": tsi.ExtensionKind.SyntacticLint = "syntactic-lint";
    protected ts: typeof tsi;
    protected args: any;
    protected host: tsi.CompilerHost;
    protected program: tsi.Program;
    constructor(state: {ts: typeof tsi, args: any, host: tsi.CompilerHost, program: tsi.Program}) {
        this.ts = state.ts;
        this.args = state.args;
        this.host = state.host;
        this.program = state.program;
    }
    abstract visit(node: tsi.Node, error: tsi.LintErrorMethod): boolean | void;
}

export abstract class SemanticLintWalker implements tsi.LintWalker {
    static "extension-kind": tsi.ExtensionKind.SemanticLint = "semantic-lint";
    protected ts: typeof tsi;
    protected args: any;
    protected host: tsi.CompilerHost;
    protected program: tsi.Program;
    protected checker: tsi.TypeChecker;
    constructor(state: {ts: typeof tsi, args: any, host: tsi.CompilerHost, program: tsi.Program, checker: tsi.TypeChecker}) {
        this.ts = state.ts;
        this.args = state.args;
        this.host = state.host;
        this.program = state.program;
        this.checker = state.checker;
    }
    abstract visit(node: tsi.Node, error: tsi.LintErrorMethod): boolean | void;
}

