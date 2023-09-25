import * as fs from "node:fs/promises";

import * as path from "path";
import {
    CompilerOptions,
} from "typescript";

import {
    Message,
    Task,
} from "../protocol.js";

export interface PackageInfo {
    name: string;
    dependencies: string[];
    path: string;
}
export async function buildTaskFiles(
    outputPath: string,
    bundles: PackageInfo[],
    tsconfig: (string | null)[] = ["tsconfig.json"],
    declarationConfig: string | undefined | null = "tsconfig.json",
) {
    const bundleNames = new Set(bundles.map(b => b.name));

    const taskName = (name: string | null) =>
        tsconfig.length === 1 ? "" :
            name === declarationConfig ? "-declaration" :
            name ? "-" + path.basename(name).replace(".json", "").replace("tsconfig.", "") :
            name;

    const makeTask = (b: PackageInfo, tscConfig: string | null, name = taskName(tscConfig)): Task => ({
        name: b.name + name,
        group: b.name,
        dependencies: b.dependencies.filter(d => bundleNames.has(d)).map(d => d + name),
        config: {
            type: "tsc",
            project: tscConfig ? path.join(b.path, tscConfig) : b.path,
            redirectDeclarationOutput: true,
            tsconfigOverrides: {},
        },
    });
    const tasks = bundles.flatMap(b => tsconfig.map(tscConfig => makeTask(b, tscConfig)));
    interface ConfigFile {
        globalTsOverrides: CompilerOptions;
        tasks: Task[];
    }
    interface VarOption<K extends string, T> {
        values: T[];
        make: (value: T, data: ConfigFile) => ConfigFile;
        name: K;
        format: (v: T) => string;
    }
    function makeOption<T, K extends string>(
        name: K,
        values: T[],
        make: (v: T, data: ConfigFile) => ConfigFile,
        format?: (v: T) => string,
    ): VarOption<K, T> {
        return {
            values,
            make,
            name,
            format: format ?? (v => `${v}`),
        };
    }
    function booleanCompilerOption<K extends string>(key: K, make?: (v: boolean, data: ConfigFile) => ConfigFile) {
        const defaultMaker: VarOption<K, boolean>["make"] = (value, data) => {
            return {
                ...data,
                globalTsOverrides: {
                    ...data.globalTsOverrides,
                    [key]: value,
                },
            };
        };
        return makeOption(
            key,
            [true, false],
            make ? (v, d) => make(v, defaultMaker(v, d)) : defaultMaker,
            v => v ? "T" : "F",
        );
    }

    const baseConfigFileData = {
        globalTsOverrides: {
            allowJs: false,
            skipLibCheck: true,
        } as CompilerOptions,
        tasks,
    };

    const cleanTasks = {
        ...baseConfigFileData,
        tasks: tasks.map(t => ({
            ...t,
            config: {
                ...t.config,
                type: "clean",
            },
        })),
    };
    await fs.writeFile(path.join(outputPath, `clean.json`), JSON.stringify(cleanTasks, undefined, 2));

    const ensureDeclarationTask = (d: string) => d.endsWith("-declarations") ? d : d + "-declarations";
    const options = [
        booleanCompilerOption("b", (value, data) => {
            if (!value) return data;
            const leafTasks = tasks.filter(t => tasks.every(s => s.dependencies.indexOf(t.name) === -1));
            return {
                ...data,
                tasks: leafTasks.map((t, i) => ({
                    ...t,
                    dependencies: leafTasks[i + 1] ? [leafTasks[i + 1].name] : [],
                    config: t.config.type !== "tsc" ? t.config : {
                        ...t.config,
                        type: "tsc-b",
                    },
                })),
            };
        }),
        booleanCompilerOption("isolatedDeclarations", (v, d) => {
            if (!v) return d;
            return {
                ...d,
                tasks: [
                    ...bundles.map(b => makeTask(b, declarationConfig, "-declarations")).map(t => ({
                        ...t,
                        config: {
                            ...t.config,
                            type: "declaration",
                            tsconfigOverrides: {},
                        } as Message,
                        name: t.name,
                        dependencies: [],
                    })),
                    ...d.tasks.map(t => ({
                        ...t,
                        config: {
                            ...t.config,
                            type: "tsc",
                            tsconfigOverrides: {
                                declaration: false,
                            },
                        } as Message,
                        name: t.name,
                        dependencies: [
                            ensureDeclarationTask(t.name),
                            ...t.dependencies.map(ensureDeclarationTask),
                        ],
                    })),
                ],
            };
        }),
        // booleanCompilerOption("deps", (value, data) => {
        //     if (value) return data;
        //     return {
        //         ...data,
        //         tasks: data.tasks.map(t => ({
        //             ...t,
        //             dependencies: []
        //         }))
        //     }
        // }),
        // booleanCompilerOption("declaration"),
        // booleanCompilerOption("skipLibCheck"),
        // booleanCompilerOption("noEmit", (v, d) => ({
        //     ...d,
        //     globalTsOverrides: {
        //         ...d.globalTsOverrides,
        //         noEmit: d.tasks.some(t => t.config.type === "tsc-b") ? false: true,
        //     },
        //     tasks: d.tasks.map(t => ({...t, suppressOutput: true})),
        // })),
        makeOption("cpus", [6, 8, 10, 12, 16, 24], (n, data) => ({
            ...data,
            cpus: n,
        })),
    ];

    const varValueIndexes = options.map(() => 0);
    type FileOptions = {
        [P in typeof options[number] as P["name"]]: P["values"][number];
    };
    function validateConfiguration(o: FileOptions) {
        // if(o.b && !o.declaration) return false;
        if (o.b && o.isolatedDeclarations) return false;
        // if(o.b && !o.deps) return false;
        if (o.b && o.cpus > 6) return false;
        if (!o.b && !o.isolatedDeclarations && o.cpus > 10) return false;
        // if(o.deps && o.cpus > 8) return false;
        return true;
    }
    function next() {
        for (let i = 0; i < options.length; i++) {
            varValueIndexes[i]++;
            if (varValueIndexes[i] >= options[i].values.length) {
                varValueIndexes[i] = 0;
                if (i === options.length - 1) {
                    return false;
                }
                continue;
            }
            break;
        }
        return true;
    }

    while (true) {
        let configFileData = baseConfigFileData;
        const fileName = [];
        const currentOptions: FileOptions = {} as FileOptions;
        for (let i = 0; i < options.length; i++) {
            const opt = options[i];
            const value = opt.values[varValueIndexes[i]];
            configFileData = opt.make(value as never, configFileData);
            fileName.push(`${opt.name}=${opt.format(value as never)}`);
            currentOptions[opt.name] = value as never;
        }
        if (validateConfiguration(currentOptions)) {
            await fs.writeFile(path.join(outputPath, `${fileName.join("-")}.json`), JSON.stringify(configFileData, undefined, 2));
        }
        if (!next()) break;
    }

    // const leafTasks = tasks
    //     .filter(t => tasks.every(s => s.dependencies.indexOf(t.name) === -1));
    // fs.writeFile(`./tasks-leafs.json`, JSON.stringify({
    //     globalTsOverrides: {
    //         allowJs: false,
    //     } as CompilerOptions,
    //     tasks: leafTasks.map((t, i) => ({
    //         ...t,
    //         config: {
    //             ...t.config,
    //             type: "tsc-b"
    //         },
    //         dependencies: i === leafTasks.length - 1 ? [] : [leafTasks[i + 1].name]
    //     })),
    // }, undefined, 2));

    // console.log(tasks);
}
