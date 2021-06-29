/*@internal*/
namespace ts.server {
    enum languageModeIds {
        typescript = "typescript",
        typescriptreact = "typescriptreact",
        javascript = "javascript",
        javascriptreact = "javascriptreact",
    }

    export function mode2ScriptKind(mode: string): 'TS' | 'TSX' | 'JS' | 'JSX' | undefined {
        switch (mode) {
            case languageModeIds.typescript: return 'TS';
            case languageModeIds.typescriptreact: return 'TSX';
            case languageModeIds.javascript: return 'JS';
            case languageModeIds.javascriptreact: return 'JSX';
        }
        return undefined;
    }

    export function getLineAndOffsetFromPosition(position: lsp.Position) {
        // TS assumes the client is 1-based
        return { line: position.line + 1, offset: position.character + 1 };
    }

    export function getLspPositionFromLocation(location: protocol.Location): lsp.Position {
        return { line: Math.max(0, location.line - 1), character: Math.max(0, location.offset - 1) };
    }
}
