import * as fs from "node:fs/promises";
import * as pathModule from "node:path";

import {
    buildTaskFiles,
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

async function loadBundles(directory: string) {
    const files = await listFiles(directory, /package.json/, {
        recursive: true,
        exclude: /(node_modules)|([\\/]\.)/,
    }, 2);
    return files.filter(r => pathModule.dirname(r) !== directory);
}

async function loadBundlesDependencies(packageJsonList: string[]) {
    const dependencyInfo: Record<string, {
        name: string;
        path: string;
        depth?: number;
        dependencies: string[];
        references: string[];
    }> = {};
    for (const packagePath of packageJsonList) {
        const packageInfo = JSON.parse(await fs.readFile(packagePath, { encoding: "utf-8" }));
        dependencyInfo[packageInfo.name] = {
            name: packageInfo.name,
            dependencies: [
                ...((packageInfo.dependencies && Object.keys(packageInfo.dependencies)) ?? []),
                ...((packageInfo.devDependencies && Object.keys(packageInfo.devDependencies)) ?? []),
            ],
            path: pathModule.dirname(packagePath),
            references: [],
        };
    }
    function depth(name: string): number {
        const entry = dependencyInfo[name];
        if (entry === undefined) return 0;
        if (entry.depth) return entry.depth;

        entry.depth = 1 + Math.max(...entry.dependencies.map(depth));
        return entry.depth;
    }

    const sortedBundles = Object.values(dependencyInfo).sort((a, b) => depth(a.name) - depth(b.name));

    sortedBundles.forEach(b => {
        b.dependencies = b.dependencies.filter(n => {
            const entry = dependencyInfo[n];
            if (entry) {
                entry.references.push(b.name);
            }
            return !!entry;
        });
    });
    return sortedBundles;
}

async function main() {
    const path = process.argv[2];
    const outPath = process.argv[3] ?? "./tasks";
    const packageJsonPaths = await loadBundles(path);
    const packageInfoList = await loadBundlesDependencies(packageJsonPaths);
    await buildTaskFiles(outPath, packageInfoList, [
        "tsconfig.es.json",
        "tsconfig.cjs.json",
        "tsconfig.types.json",
    ], "tsconfig.types.json");
}

main();
