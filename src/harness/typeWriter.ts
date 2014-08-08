interface TypeWriterResult {
    line: number;
    column: number;
    syntaxKind: string;
    identifierName: string;
    type: string;
}

class TypeWriterWalker {
    constructor(public program: ts.Program, public checker: ts.TypeChecker) {
    }
    public getTypes(fileName: string): TypeWriterResult[] {
        return [];
    }
}
