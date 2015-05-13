// Use this to get emitter-agnostic baselines

class SyntacticCleaner {
    static clean(sourceFileContents: string) {
        return sourceFileContents;
    }
}

/* TODO: Re-implement or maybe delete
class SyntacticCleaner extends TypeScript.SyntaxWalker {
    private emit: string[] = [];

    public visitToken(token: TypeScript.ISyntaxToken): void {
        this.emit.push(token.text());
        if (token.kind() === TypeScript.SyntaxKind.SemicolonToken) {
            this.emit.push('\r\n');
        } else {
            this.emit.push(' ');

        }
    }

    static clean(sourceFileContents: string): string {
        var parsed = TypeScript.Parser.parse('_emitted.ts', TypeScript.SimpleText.fromString(sourceFileContents), TypeScript.LanguageVersion.EcmaScript5, false);
        var cleaner = new SyntacticCleaner();
        cleaner.visitSourceUnit(parsed.sourceUnit());
        return cleaner.emit.join('');
    }
}
*/
