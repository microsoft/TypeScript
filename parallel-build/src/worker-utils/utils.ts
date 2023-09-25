import * as perf from "external-declarations/build/compiler/perf-tracer.js";
import ts from "typescript";

export function withTrace<T>(name: string, fn: () => T): T {
    try {
        perf.tracer.current?.start(name);
        return fn();
    }
    finally {
        perf.tracer.current?.end(name);
    }
}

export function parseConfigHostFromCompilerHostLike(host: ts.SolutionBuilderHost<ts.EmitAndSemanticDiagnosticsBuilderProgram>, sys: ts.System): ts.ParseConfigFileHost {
    return {
        fileExists: f => sys.fileExists(f),
        readDirectory(root, extensions, excludes, includes, depth) {
            return sys.readDirectory(root, extensions, excludes, includes, depth);
        },
        readFile: f => sys.readFile(f),
        useCaseSensitiveFileNames: host.useCaseSensitiveFileNames(),
        getCurrentDirectory: () => host.getCurrentDirectory(),
        onUnRecoverableConfigFileDiagnostic: () => undefined,
        trace: host.trace ? s => host.trace!(s) : undefined,
    };
}
