import {SyntacticLintWalker} from "extension-api";

export default class Throws extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        error("Not allowed.");
        stop();
    }
}

export class Throws2 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        error("THROWS2", "Not allowed.");
        stop();
    }
}

export class Throws3 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        error("THROWS3", "Not allowed.", node);
        stop();
    }
}

export class Throws4 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        error("THROWS4", "Not allowed.", 0, 10);
        stop();
    }
}

export class Throws5 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        error("Not allowed.", node);
        stop();
    }
}

export class Throws6 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        error("Not allowed.", 0, 10);
        stop();
    }
}