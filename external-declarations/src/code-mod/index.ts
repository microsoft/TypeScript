import ts from "typescript";

import {
    fixProject,
} from "./fixer/code-fixer-applier";
import {
    isolatedDeclarationsErrors,
} from "./fixer/isolated-declarations-errors";

(ts as any).Debug.enableDebugInfo();

async function main() {
    const config = process.argv[2] ?? "./tsconfig.json";
    if (process.argv.includes("--interactive")) {
        const { interactiveFixSelector, interactiveFixValidator } = await import("./fixer/interactive-fix-selector");
        const { makeWatcher } = await import("./fixer/watch");
        const watcher = makeWatcher();
        await fixProject(config, isolatedDeclarationsErrors, {}, interactiveFixSelector, interactiveFixValidator, watcher.startWatcher);
        watcher.close();
    }
    else {
        await fixProject(config, isolatedDeclarationsErrors, {}, async () => 0);
    }
}

main();
