import * as fs from "node:fs/promises";
import * as pathModule from "node:path";

import JSONC from "json5";

import {
    buildTaskFiles,
    PackageInfo,
} from "./build-task-files.js";

function listFiles(path: string, spec: RegExp, options: { recursive?: boolean; exclude?: RegExp; } = {}, depth = Number.MAX_SAFE_INTEGER) {
    async function filesInFolder(folder: string, depth: number) {
        let paths: string[] = [];

        for (const file of await fs.readdir(folder)) {
            const pathToFile = pathModule.join(folder, file);
            const stat = await fs.stat(pathToFile);
            if (depth !== 0 && options.recursive && stat.isDirectory() && !options.exclude?.exec(pathToFile)) {
                paths = paths.concat(await filesInFolder(pathToFile, depth - 1));
            }
            else if (stat.isFile() && (!spec || file.match(spec))) {
                paths.push(pathToFile);
            }
        }

        return paths;
    }

    return filesInFolder(path, depth);
}

async function loadBundlesDependencies(tsConfigs: string[]) {
    const dependencyInfo: Record<
        string,
        PackageInfo & {
            depth?: number;
        }
    > = {};

    async function loadTsConfig(filePath: string): Promise<string> {
        let resolvedPath = pathModule.resolve(filePath);

        const stat = await fs.stat(resolvedPath);
        if (stat.isDirectory()) {
            resolvedPath = pathModule.join(resolvedPath, "tsconfig.json");
        }

        if (dependencyInfo[resolvedPath]) return resolvedPath;
        const tsConfigData = JSONC.parse(await fs.readFile(resolvedPath, { encoding: "utf-8" })) as {
            references: {
                path: string;
            }[];
        };
        const configInfo: PackageInfo = dependencyInfo[resolvedPath] = {
            name: resolvedPath,
            path: resolvedPath,
            dependencies: [],
        };
        const directory = pathModule.dirname(resolvedPath);
        if (tsConfigData.references) {
            for (const ref of tsConfigData.references) {
                configInfo.dependencies.push(await loadTsConfig(pathModule.join(directory, ref.path)));
            }
        }
        return resolvedPath;
    }

    for (const tsConfig of tsConfigs) {
        await loadTsConfig(tsConfig);
    }
    function depth(name: string): number {
        const entry = dependencyInfo[name];
        if (entry === undefined) return 0;
        if (entry.depth) return entry.depth;

        
        entry.depth = 1 + (entry.dependencies.length === 0? 0: Math.max(...entry.dependencies.map(depth)));
        return entry.depth;
    }

    const sortedBundles = Object.values(dependencyInfo).sort((a, b) => depth(a.name) - depth(b.name));

    sortedBundles.forEach(b => {
        b.dependencies = b.dependencies.filter(n => {
            const entry = dependencyInfo[n];
            return !!entry;
        });
    });
    return sortedBundles;
}

async function main() {
    const paths = process.argv.slice(2);
    const outPath = "./tasks";
    const packageInfoList = await loadBundlesDependencies(paths);
    // eslint-disable-next-line no-null/no-null
    await buildTaskFiles(outPath, packageInfoList, [null], /*declarationConfig*/ null);
}

main();
