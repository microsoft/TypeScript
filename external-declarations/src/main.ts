import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";

import { normalizePath } from "./compiler/path-utils";
import { installTracer, tracer } from "./compiler/perf-tracer";
import { transformProject } from "./compiler/transform-project";
import { ArgType, parseArgs } from "./utils/cli-parser";


(ts as any).Debug.enableDebugInfo();
type CancellationToken = { isCancelled: boolean }

const { value: parsedArgs, printUsageOnErrors } = parseArgs(process.argv.slice(2), {
    default: ArgType.StringArray(),
    project: {
        type: ArgType.String(),
        description: "Project configuration",
        required: true
    },
    watch: {
        type: ArgType.Boolean(),
        description: "Keep watching",
    },
    declarationDir: {
        type: ArgType.String(),
        description: "Output dir",
    }
});
printUsageOnErrors();

let projectConfig = normalizePath(path.resolve(parsedArgs.project));
if (path.extname(projectConfig) !== ".json") {
    projectConfig = normalizePath(path.join(projectConfig, "tsconfig.json"));
}


let watched: {
    watcher: fs.FSWatcher,
    path: string,
}[] = [];

function watch(rootDir: string) {
    if (parsedArgs.watch) {
        let newWatched: string[];
        if (parsedArgs.default) {
            newWatched = parsedArgs.default;
        }
        else {
            newWatched = [rootDir];
        }
        if(watched.length !== newWatched.length || !watched.every((v, index) => v.path === newWatched[index])) {
            watched.forEach(f => f.watcher.close());
            watched = newWatched.map(f => ({
                path: f,
                watcher: fs.watch(f, { persistent: true, recursive: true }, cancelAndRestart),
            }));
        }

    }
}
let lastRunCancellation: CancellationToken = { isCancelled: false };
async function delay(ms: number) {
    // eslint-disable-next-line no-restricted-globals
    return new Promise(r => setTimeout(r, ms));
}
function cancelAndRestart(event: fs.WatchEventType, filename: string) {
    console.log(event, filename);
    lastRunCancellation.isCancelled = true;
    lastRunCancellation = { isCancelled: false };
    main(lastRunCancellation, 50);
}
async function main(cancellationToken: CancellationToken, msDelay: number) {
    await delay(msDelay);
    if(cancellationToken.isCancelled) return;

    console.log("Detected changes rebuilding");

    installTracer();
    const tsconfig = ts.readConfigFile(projectConfig, ts.sys.readFile);
    const parsed = ts.parseJsonConfigFileContent(tsconfig.config, ts.sys, "./");
    const options = parsed.options;
    if(parsedArgs.declarationDir) {
        options.declarationDir = parsedArgs.declarationDir;
    }
    const host = ts.createCompilerHost(options, /*setParentNodes*/ true);
    const rootDir = await transformProject(path.dirname(projectConfig), /*files*/ undefined, options, host);
    console.log(tracer.current?.times);
    watch(rootDir);
    if(cancellationToken.isCancelled) return;
}
main(lastRunCancellation, 0);
