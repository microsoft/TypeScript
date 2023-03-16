import * as ts from 'typescript'
import * as fsp from 'fs/promises'
import * as fs from 'fs'
import * as path from 'path'
import { transformFile } from './compiler/transform-file';
import { ArgType, parseArgs } from './utils/cli-parser';
import { ensureDir, readAllFiles } from './utils/fs-utils';
import { changeAnyExtension, normalizePath } from './compiler/path-utils';


(ts as any).Debug.enableDebugInfo();


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
        description: "Keep watching",
    }
});
printUsageOnErrors();

let projectConfig =  normalizePath(path.resolve(parsedArgs.project));
let projectPath = projectConfig;
if (path.extname(projectConfig) !== ".json") {
    projectConfig = normalizePath(path.join(projectConfig, "tsconfig.json"))
} else {
    projectPath = normalizePath(path.dirname(projectConfig));
}


let watched: Array<{
    watcher: fs.FSWatcher,
    path: string,
}> = [];

function watch(rootDir: string) {
    if (parsedArgs.watch) {
        let newWatched: Array<string>;
        if (parsedArgs.default) {
            newWatched = parsedArgs.default;
        } else {
            newWatched = [rootDir];
        }
        if(watched.length != newWatched.length || !watched.every((v, index) => v.path === newWatched[index])) {
            watched.forEach(f => f.watcher.close());
            watched = newWatched.map(f => ({
                path: f,
                watcher: fs.watch(f, { persistent: true, recursive: true }, cancelAndRestart),
            }))
        }
        
    }
}
let lastRunCancellation:CancellationToken = { isCancelled: false }
async function delay(ms:number) {
    return new Promise(r => setTimeout(r, ms));
}
function cancelAndRestart(event: fs.WatchEventType, filename: string) {
    console.log(event, filename)
    lastRunCancellation.isCancelled = true;
    lastRunCancellation = { isCancelled: false };
    main(lastRunCancellation, 50);
}
async function main(cancellationToken: CancellationToken, msDelay: number) {
    await delay(msDelay);
    if(cancellationToken.isCancelled) return;

    console.log("Detected changes rebuilding")

    const tsconfig = ts.readConfigFile(projectConfig, ts.sys.readFile);
    const parsed = ts.parseJsonConfigFileContent(tsconfig.config, ts.sys, "./");
    const options = parsed.options;
    const rootDir = options.rootDir ? normalizePath(path.resolve(path.join(projectPath, options.rootDir))) : projectPath;
    const files = parsedArgs.default ?? readAllFiles(rootDir, /.*\.ts/).filter(t => !/[\\/]node_modules[\\/]/.exec(t));
    
    watch(rootDir);
    if(cancellationToken.isCancelled) return;
    await transformProjectFiles(rootDir, files, options, cancellationToken);
}
main(lastRunCancellation, 0);

type CancellationToken = { isCancelled: boolean };
async function transformProjectFiles(rootDir: string, files: string[], options: ts.CompilerOptions, cancellationToken: CancellationToken) {
    
    const declarationDir = parsedArgs.declarationDir ? normalizePath(path.resolve(parsedArgs.declarationDir)) :
        options.outDir ? normalizePath(path.resolve(options.outDir)) :
        undefined;
    for (let file of files) {
        try {
            const source = await fsp.readFile(file, { encoding: "utf8" });
            if(cancellationToken.isCancelled) return;
            const actualDeclaration = transformFile(file, source, [], [], options, ts.ModuleKind.ESNext);
            const output = 
                declarationDir? changeAnyExtension(file.replace(rootDir, declarationDir), ".d.ts"):
                changeAnyExtension(file, ".d.ts");
            await ensureDir(path.dirname(output));
            await fsp.writeFile(output, actualDeclaration.code);
        } catch (e) {
            console.error(`Failed to transform: ${file}`, e)
        }
    }
    return { rootDir };
}