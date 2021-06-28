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
}
