import {SyntacticLintWalker} from "extension-api";

export default class Throws extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, error) {
        error("Not allowed.");
        return false;
    }
}

export class Throws2 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, error) {
        error("THROWS2", "Not allowed.");
        return false;
    }
}

export class Throws3 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, error) {
        error("THROWS3", "Not allowed.", node);
        return false;
    }
}

export class Throws4 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, error) {
        error("THROWS4", "Not allowed.", 0, 10);
        return false;
    }
}

export class Throws5 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, error) {
        error("Not allowed.", node);
        return false;
    }
}

export class Throws6 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, error) {
        error("Not allowed.", 0, 10);
        return false;
    }
}

export class Throws7 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, error) {
        error(this.ts.DiagnosticCategory.Error, "Not allowed.");
        return false;
    }
}

export class Throws8 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, error) {
        error(this.ts.DiagnosticCategory.Error, "THROWS8", "Not allowed.");
        return false;
    }
}

export class Throws9 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, error) {
        error(this.ts.DiagnosticCategory.Error, "THROWS9", "Not allowed.", node);
        return false;
    }
}

export class Throws10 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, error) {
        error(this.ts.DiagnosticCategory.Error, "THROWS10", "Not allowed.", 0, 10);
        return false;
    }
}

export class Throws11 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, error) {
        error(this.ts.DiagnosticCategory.Error, "Not allowed.", node);
        return false;
    }
}

export class Throws12 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, error) {
        error(this.ts.DiagnosticCategory.Error, "Not allowed.", 0, 10);
        return false;
    }
}

export class ThrowsOnConstruct extends SyntacticLintWalker {
    constructor(state) { super(state); throw new Error("Throws on construct"); }
    visit(node, error) {}
}

export class ThrowsOnVisit extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, error) {
        throw new Error("Throws on visit");
    }
}

export class ThrowsOnAfterVisit extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, error) { return false; }
    afterVisit(node, error) {
        throw new Error("Throws on afterVisit");
    }
}