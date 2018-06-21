// @ts-check
const path = require("path");
const fs = require("fs");
const gulp = require("./gulp");
const gulpif = require("gulp-if");
const sourcemaps = require("gulp-sourcemaps");
const merge2 = require("merge2");
const tsc = require("gulp-typescript");
const tsc_oop = require("./gulp-typescript-oop");
const upToDate = require("./upToDate");
const ts = require("../../lib/typescript");
const del = require("del");
const needsUpdate = require("./needsUpdate");
const mkdirp = require("./mkdirp");
const { reportDiagnostics } = require("./diagnostics");
const { PassThrough } = require("stream");

class CompilationGulp extends gulp.Gulp {
    /**
     * @param {import("gulp-help").GulpHelp | import("gulp").Gulp} gulp
     */
    constructor(gulp) {
        super();
        // forward notifications to the outer gulp.
        this.on("task_start", e => gulp.emit("task_start", e));
        this.on("task_stop", e => gulp.emit("task_stop", e));
        this.on("task_err", e => gulp.emit("task_err", e));
        this.on("task_not_found", e => gulp.emit("task_not_found", e));
        this.on("task_recursion", e => gulp.emit("task_recursion", e));
        this.on("err", e => gulp.emit("err", e));
    }

    dispose() {
        this.removeAllListeners();
        this.reset();
    }
    
    // Do not reset tasks when `gulp.start()` is called
    _resetAllTasks() {}
    _resetSpecificTasks() {}
    _resetTask() {}
}

// internal `Gulp` instance for compilation artifacts.
const compilationGulp = new CompilationGulp(gulp);

/** @type {Map<ResolvedProjectSpec, ProjectGraph>} */
const projectGraphCache = new Map();

/** @type {Map<string, { typescript: string, alias: string, paths: ResolvedPathOptions }>} */
const typescriptAliasMap = new Map();

/**
 * Defines a gulp orchestration for a TypeScript project, returning a callback that can be used to trigger compilation.
 * @param {string} projectSpec The path to a tsconfig.json file or its containing directory.
 * @param {ProjectOptions} [options] Project compilation options.
 * @returns {() => Promise<void>}
 */
function createCompiler(projectSpec, options) {
    const resolvedOptions = resolveProjectOptions(options);
    const resolvedProjectSpec = resolveProjectSpec(projectSpec, resolvedOptions.paths, /*referrer*/ undefined);
    const taskName = compileTaskName(ensureCompileTask(getOrCreateProjectGraph(resolvedProjectSpec, resolvedOptions.paths), resolvedOptions), resolvedOptions.typescript);
    return () => new Promise((resolve, reject) => compilationGulp.start(taskName, err => err ? reject(err) : resolve(err)));
}
exports.createCompiler = createCompiler;

/**
 * Defines and executes a gulp orchestration for a TypeScript project.
 * @param {string} projectSpec The path to a tsconfig.json file or its containing directory.
 * @param {ProjectOptions} [options] Project compilation options.
 * @returns {Promise<void>}
 * 
 * @typedef ProjectOptions
 * @property {string} [cwd] The path to use for the current working directory. Defaults to `process.cwd()`.
 * @property {string} [base] The path to use as the base for relative paths. Defaults to `cwd`.
 * @property {string} [typescript] A module specifier or path (relative to gulpfile.js) to the version of TypeScript to use.
 * @property {Hook} [js] Pipeline hook for .js file outputs. For multiple steps, use `stream-combiner`.
 * @property {Hook} [dts] Pipeline hook for .d.ts file outputs. For multiple steps, use `stream-combiner`.
 * @property {boolean} [verbose] Indicates whether verbose logging is enabled.
 * @property {boolean} [force] Force recompilation (no up-to-date check).
 * @property {boolean} [inProcess] Indicates whether to run gulp-typescript in-process or out-of-process (default).
 * 
 * @typedef {NodeJS.ReadWriteStream | (() => NodeJS.ReadWriteStream)} Hook
 */
function compile(projectSpec, options) {
    const compiler = createCompiler(projectSpec, options);
    return compiler();
}
exports.compile = compile;

/**
 * Defines a gulp orchestration to clean the outputs of a TypeScript project, returning a callback that can be used to trigger compilation.
 * @param {string} projectSpec The path to a tsconfig.json file or its containing directory.
 * @param {PathOptions} [options] Project clean options.
 */
function createCleaner(projectSpec, options) {
    const paths = resolvePathOptions(options);
    const resolvedProjectSpec = resolveProjectSpec(projectSpec, paths, /*referrer*/ undefined);
    const taskName = cleanTaskName(ensureCleanTask(getOrCreateProjectGraph(resolvedProjectSpec, paths)));
    return () => new Promise((resolve, reject) => compilationGulp.start(taskName, err => err ? reject(err) : resolve(err)));
}
exports.createCleaner = createCleaner;

/**
 * Defines and executes a gulp orchestration to clean the outputs of a TypeScript project.
 * @param {string} projectSpec The path to a tsconfig.json file or its containing directory.
 * @param {PathOptions} [options] Project clean options.
 */
function clean(projectSpec, options) {
    const cleaner = createCleaner(projectSpec, options);
    return cleaner();
}
exports.clean = clean;

/**
 * Adds a named alias for a TypeScript language service path
 * @param {string} alias An alias for a TypeScript version.
 * @param {string} typescript An alias or module specifier for a TypeScript version.
 * @param {PathOptions} [options] Options used to resolve the path to `typescript`.
 */
function addTypeScript(alias, typescript, options) {
    const paths = resolvePathOptions(options);
    typescriptAliasMap.set(alias, { typescript, alias, paths });
}
exports.addTypeScript = addTypeScript;

/**
 * Flattens a project with project references into a single project.
 * @param {string} projectSpec The path to a tsconfig.json file or its containing directory.
 * @param {string} flattenedProjectSpec The output path for the flattened tsconfig.json file.
 * @param {FlattenOptions} [options] Options used to flatten a project hierarchy.
 * 
 * @typedef FlattenOptions
 * @property {string} [cwd] The path to use for the current working directory. Defaults to `process.cwd()`.
 * @property {CompilerOptions} [compilerOptions] Compiler option overrides.
 * @property {boolean} [force] Forces creation of the output project.
 */
function flatten(projectSpec, flattenedProjectSpec, options = {}) {
    const paths = resolvePathOptions(options);
    const files = [];
    const resolvedOutputSpec = path.resolve(paths.cwd, flattenedProjectSpec);
    const resolvedOutputDirectory = path.dirname(resolvedOutputSpec);
    const resolvedProjectSpec = resolveProjectSpec(projectSpec, paths, /*referrer*/ undefined);
    const projectGraph = getOrCreateProjectGraph(resolvedProjectSpec, paths);
    recur(projectGraph);

    const config = {
        extends: normalizeSlashes(path.relative(resolvedOutputDirectory, resolvedProjectSpec)),
        compilerOptions: options.compilerOptions || {},
        files
    };

    if (options.force || needsUpdate(files, resolvedOutputSpec)) {
        mkdirp.sync(resolvedOutputDirectory);
        fs.writeFileSync(resolvedOutputSpec, JSON.stringify(config, undefined, 2), "utf8");
    }

    /**
     * @param {ProjectGraph} projectGraph 
     */
    function recur(projectGraph) {
        for (const ref of projectGraph.references) {
            recur(ref.target);
        }
        for (const file of projectGraph.project.fileNames) {
            files.push(normalizeSlashes(path.relative(resolvedOutputDirectory, path.resolve(projectGraph.projectDirectory, file))));
        }
    }
}
exports.flatten = flatten;

/**
 * Resolve a TypeScript specifier into a fully-qualified module specifier and any requisite dependencies.
 * @param {string} typescript An unresolved module specifier to a TypeScript version.
 * @param {ResolvedPathOptions} paths Paths used to resolve `typescript`.
 * @returns {ResolvedTypeScript}
 * 
 * @typedef {string & {_isResolvedTypeScript: never}} ResolvedTypeScriptSpec
 * 
 * @typedef ResolvedTypeScript
 * @property {ResolvedTypeScriptSpec} typescript
 * @property {string} [alias]
 */
function resolveTypeScript(typescript, paths) {
    let alias;
    while (typescriptAliasMap.has(typescript)) {
        ({ typescript, alias, paths } = typescriptAliasMap.get(typescript));
    }

    if (typescript === "default") {
        typescript = require.resolve("../../lib/typescript");
    }
    else if (isPath(typescript)) {
        typescript = path.resolve(paths.cwd, typescript);
    }

    return { typescript: /**@type {ResolvedTypeScriptSpec}*/(normalizeSlashes(typescript)), alias };
}

/**
 * Gets a suffix to append to Gulp task names that vary by TypeScript version.
 * @param {ResolvedTypeScript} typescript A resolved module specifier to a TypeScript version.
 * @param {ResolvedPathOptions} paths Paths used to resolve a relative reference to `typescript`.
 */
function getTaskNameSuffix(typescript, paths) {
    return typescript.typescript === resolveTypeScript("default", paths).typescript ? "" :
        typescript.alias ? `@${typescript.alias}` :
        isPath(typescript.typescript) ? `@${normalizeSlashes(path.relative(paths.base, typescript.typescript))}` :
        `@${typescript}`;
}

/** @type {ResolvedPathOptions} */
const defaultPaths = { cwd: process.cwd(), base: process.cwd() };

/**
 * @param {PathOptions | undefined} options Path options to resolve and normalize.
 * @returns {ResolvedPathOptions}
 * 
 * @typedef PathOptions
 * @property {string} [cwd] The path to use for the current working directory. Defaults to `process.cwd()`.
 * @property {string} [base] The path to use as the base for relative paths. Defaults to `cwd`.
 * 
 * @typedef ResolvedPathOptions
 * @property {string} cwd The path to use for the current working directory. Defaults to `process.cwd()`.
 * @property {string} base The path to use as the base for relative paths. Defaults to `cwd`.
 */
function resolvePathOptions(options) {
    const cwd = options && options.cwd ? path.resolve(process.cwd(), options.cwd) : process.cwd();
    const base = options && options.base ? path.resolve(cwd, options.base) : cwd;
    return cwd === defaultPaths.cwd && base === defaultPaths.base ? defaultPaths : { cwd, base };
}

/**
 * @param {ProjectOptions} [options]
 * @returns {ResolvedProjectOptions}
 * 
 * @typedef ResolvedProjectOptions
 * @property {ResolvedPathOptions} paths
 * @property {ResolvedTypeScript} typescript A resolved reference to a TypeScript implementation.
 * @property {Hook} [js] Pipeline hook for .js file outputs.
 * @property {Hook} [dts] Pipeline hook for .d.ts file outputs.
 * @property {boolean} [verbose] Indicates whether verbose logging is enabled.
 * @property {boolean} [force] Force recompilation (no up-to-date check).
 * @property {boolean} [inProcess] Indicates whether to run gulp-typescript in-process or out-of-process (default).
 */
function resolveProjectOptions(options = {}) {
    const paths = resolvePathOptions(options);
    const typescript = resolveTypeScript(options.typescript || "default", paths);
    return {
        paths,
        typescript,
        js: options.js,
        dts: options.dts,
        verbose: options.verbose || false,
        force: options.force || false,
        inProcess: options.inProcess || false
    };
}

/**
 * @param {Hook} hook 
 * @returns {NodeJS.ReadWriteStream}
 */
function evaluateHook(hook) {
    return (typeof hook === "function" ? hook() : hook) || new PassThrough({ objectMode: true });
}

/**
 * @param {ResolvedProjectOptions} left
 * @param {ResolvedProjectOptions} right
 * @returns {ResolvedProjectOptions}
 */
function mergeProjectOptions(left, right) {
    if (left.typescript !== right.typescript) throw new Error("Cannot merge project options targeting different TypeScript packages");
    if (tryReuseProjectOptions(left, right)) return left;
    return {
        paths: left.paths,
        typescript: left.typescript,
        js: right.js || left.js,
        dts: right.dts || left.dts,
        verbose: right.verbose || left.verbose,
        force: right.force || left.force,
        inProcess: right.inProcess || left.inProcess
    };
}

/**
 * @param {ResolvedProjectOptions} left
 * @param {ResolvedProjectOptions} right
 */
function tryReuseProjectOptions(left, right) {
    return left === right
        || left.js === (right.js || left.js)
        && left.dts === (right.dts || left.dts)
        && !left.verbose === !(right.verbose || left.verbose)
        && !left.force === !(right.force || left.force)
        && !left.inProcess === !(right.inProcess || left.inProcess);
}

/**
 * @param {ResolvedProjectSpec} projectSpec
 * @param {ResolvedPathOptions} paths
 * @returns {UnqualifiedProjectName}
 * 
 * @typedef {string & {_isUnqualifiedProjectName:never}} UnqualifiedProjectName
 */
function getUnqualifiedProjectName(projectSpec, paths) {
    return /**@type {UnqualifiedProjectName}*/(normalizeSlashes(path.relative(paths.base, projectSpec)));
}

/**
 * @param {UnqualifiedProjectName} projectName
 * @param {ResolvedPathOptions} paths
 * @param {ResolvedTypeScript} typescript
 * @returns {QualifiedProjectName}
 * 
 * @typedef {string & {_isQualifiedProjectName:never}} QualifiedProjectName
 */
function getQualifiedProjectName(projectName, paths, typescript) {
    return /**@type {QualifiedProjectName}*/(projectName + getTaskNameSuffix(typescript, paths));
}

/** 
 * @typedef {import("../../lib/typescript").ParseConfigFileHost} ParseConfigFileHost
 * @type {ParseConfigFileHost} 
 */
const parseConfigFileHost = {
    useCaseSensitiveFileNames: ts.sys.useCaseSensitiveFileNames,
    fileExists: fileName => ts.sys.fileExists(fileName),
    readFile: fileName => ts.sys.readFile(fileName),
    getCurrentDirectory: () => process.cwd(),
    readDirectory: (rootDir, extensions, exclude, include, depth) => ts.sys.readDirectory(rootDir, extensions, exclude, include, depth),
    onUnRecoverableConfigFileDiagnostic: diagnostic => reportDiagnostics([diagnostic])
};

/**
 * @param {string} [cwd] 
 * @returns {ParseConfigFileHost}
 */
function getParseConfigFileHost(cwd) {
    if (!cwd || cwd === process.cwd()) return parseConfigFileHost;
    return {
        useCaseSensitiveFileNames: parseConfigFileHost.useCaseSensitiveFileNames,
        fileExists: parseConfigFileHost.fileExists,
        readFile: parseConfigFileHost.readFile,
        getCurrentDirectory: () => cwd,
        readDirectory: parseConfigFileHost.readDirectory,
        onUnRecoverableConfigFileDiagnostic: diagnostic => reportDiagnostics([diagnostic], { cwd })
    };
}

/**
 * @param {ResolvedProjectSpec} projectSpec
 * @param {ResolvedPathOptions} paths
 * @returns {ProjectGraph}
 *
 * @typedef ProjectGraph
 * @property {ResolvedProjectSpec} projectSpec The fully qualified path to the tsconfig.json of the project
 * @property {UnqualifiedProjectName} projectName The relative project name, excluding any TypeScript suffix.
 * @property {string} projectDirectory The fully qualified path to the project directory.
 * @property {ParsedCommandLine} project The parsed tsconfig.json file.
 * @property {ProjectGraphReference[]} references An array of project references.
 * @property {Map<ResolvedTypeScriptSpec, ProjectGraphConfiguration>} configurations TypeScript-specific configurations for the project.
 * @property {boolean} cleanTaskCreated A value indicating whether a `clean:` task has been created for this project (not dependent on TypeScript version).
 * 
 * @typedef ProjectGraphReference
 * @property {ProjectGraph} source The referring project.
 * @property {ProjectGraph} target The referenced project.
 */
function getOrCreateProjectGraph(projectSpec, paths) {
    let projectGraph = projectGraphCache.get(projectSpec);
    if (!projectGraph) {
        const project = ts.getParsedCommandLineOfConfigFile(projectSpec, {}, getParseConfigFileHost(paths.cwd));
        projectGraph = {
            projectSpec,
            projectName: getUnqualifiedProjectName(projectSpec, paths),
            projectDirectory: path.dirname(projectSpec),
            project,
            references: [],
            configurations: new Map(),
            cleanTaskCreated: false
        };
        projectGraphCache.set(projectSpec, projectGraph);
        if (project.projectReferences) {
            for (const projectReference of project.projectReferences) {
                const resolvedProjectSpec = resolveProjectSpec(projectReference.path, paths, projectGraph);
                const referencedProject = getOrCreateProjectGraph(resolvedProjectSpec, paths);
                const reference = { source: projectGraph, target: referencedProject };
                projectGraph.references.push(reference);
            }
        }
    }
    return projectGraph;
}

/**
 * @param {ProjectGraph} projectGraph
 * @param {ResolvedProjectOptions} resolvedOptions
 * @returns {ProjectGraphConfiguration}
 *
 * @typedef ProjectGraphConfiguration
 * @property {QualifiedProjectName} projectName
 * @property {ResolvedProjectOptions} resolvedOptions
 * @property {boolean} compileTaskCreated
 */
function getOrCreateProjectGraphConfiguration(projectGraph, resolvedOptions) {
    let projectGraphConfig = projectGraph.configurations.get(resolvedOptions.typescript.typescript);
    if (!projectGraphConfig) {
        projectGraphConfig = {
            projectName: getQualifiedProjectName(projectGraph.projectName, resolvedOptions.paths, resolvedOptions.typescript),
            resolvedOptions,
            compileTaskCreated: false
        };
        projectGraph.configurations.set(resolvedOptions.typescript.typescript, projectGraphConfig);
    }
    return projectGraphConfig;
}

/**
 * @param {string} projectSpec
 * @param {ResolvedPathOptions} paths
 * @param {ProjectGraph | undefined} referrer
 * @returns {ResolvedProjectSpec}
 * 
 * @typedef {string & {_isResolvedProjectSpec: never}} ResolvedProjectSpec
 */
function resolveProjectSpec(projectSpec, paths, referrer) {
    projectSpec = path.resolve(paths.cwd, referrer && referrer.projectDirectory || "", projectSpec);
    if (!ts.sys.fileExists(projectSpec)) projectSpec = path.join(projectSpec, "tsconfig.json");
    return /**@type {ResolvedProjectSpec}*/(normalizeSlashes(projectSpec));
}

/**
 * @param {ProjectGraph} projectGraph
 * @param {ResolvedPathOptions} paths
 */
function resolveDestPath(projectGraph, paths) {
    /** @type {string} */
    let destPath = projectGraph.projectDirectory;
    if (projectGraph.project.options.outDir) {
        destPath = path.resolve(paths.cwd, destPath, projectGraph.project.options.outDir);
    }
    else if (projectGraph.project.options.outFile || projectGraph.project.options.out) {
        destPath = path.dirname(path.resolve(paths.cwd, destPath, projectGraph.project.options.outFile || projectGraph.project.options.out));
    }
    return normalizeSlashes(path.relative(paths.base, destPath));
}

/**
 * @param {ProjectGraph} projectGraph
 * @param {ResolvedProjectOptions} resolvedOptions
 */
function ensureCompileTask(projectGraph, resolvedOptions) {
    const projectGraphConfig = getOrCreateProjectGraphConfiguration(projectGraph, resolvedOptions);
    projectGraphConfig.resolvedOptions = resolvedOptions = mergeProjectOptions(resolvedOptions, resolvedOptions);
    if (!projectGraphConfig.compileTaskCreated) {
        const deps = makeProjectReferenceCompileTasks(projectGraph, resolvedOptions.typescript, resolvedOptions.paths);
        compilationGulp.task(compileTaskName(projectGraph, resolvedOptions.typescript), deps, () => {
            const destPath = resolveDestPath(projectGraph, resolvedOptions.paths);
            const { sourceMap, inlineSourceMap, inlineSources = false, sourceRoot, declarationMap } = projectGraph.project.options;
            const configFilePath = projectGraph.project.options.configFilePath;
            const sourceMapPath = inlineSourceMap ? undefined : ".";
            const sourceMapOptions = { includeContent: inlineSources, sourceRoot, destPath };
            const project = resolvedOptions.inProcess
                ? tsc.createProject(configFilePath, { typescript: require(resolvedOptions.typescript.typescript) })
                : tsc_oop.createProject(configFilePath, {}, { typescript: resolvedOptions.typescript.typescript });
            const stream = project.src()
                .pipe(gulpif(!resolvedOptions.force, upToDate(projectGraph.project, { verbose: resolvedOptions.verbose })))
                .pipe(gulpif(sourceMap || inlineSourceMap, sourcemaps.init()))
                .pipe(project());
            const js = stream.js
                .pipe(evaluateHook(resolvedOptions.js))
                .pipe(gulpif(sourceMap || inlineSourceMap, sourcemaps.write(sourceMapPath, sourceMapOptions)));
            const dts = stream.dts
                .pipe(evaluateHook(resolvedOptions.dts))
                .pipe(gulpif(declarationMap, sourcemaps.write(sourceMapPath, sourceMapOptions)));
            return merge2([js, dts])
                .pipe(gulp.dest(destPath));
        });
        projectGraphConfig.compileTaskCreated = true;
    }
    return projectGraph;
}

/**
 * @param {ProjectGraph} projectGraph
 * @param {ResolvedTypeScript} typescript
 * @param {ResolvedPathOptions} paths
 */
function makeProjectReferenceCompileTasks(projectGraph, typescript, paths) {
    return projectGraph.references.map(({target}) => compileTaskName(ensureCompileTask(target, { paths, typescript }), typescript));
}

/**
 * @param {ProjectGraph} projectGraph
 */
function ensureCleanTask(projectGraph) {
    if (!projectGraph.cleanTaskCreated) {
        const deps = makeProjectReferenceCleanTasks(projectGraph);
        compilationGulp.task(cleanTaskName(projectGraph), deps, () => {
            let outputs = ts.getAllProjectOutputs(projectGraph.project);
            if (!projectGraph.project.options.inlineSourceMap) {
                if (projectGraph.project.options.sourceMap) {
                    outputs = outputs.concat(outputs.filter(file => /\.jsx?$/.test(file)).map(file => file + ".map"));
                }
                if (projectGraph.project.options.declarationMap) {
                    outputs = outputs.concat(outputs.filter(file => /\.d.ts$/.test(file)).map(file => file + ".map"));
                }
            }
            return del(outputs);
        });
        projectGraph.cleanTaskCreated = true;
    }
    return projectGraph;
}

/**
 * @param {ProjectGraph} projectGraph
 */
function makeProjectReferenceCleanTasks(projectGraph) {
    return projectGraph.references.map(({target}) => cleanTaskName(ensureCleanTask(target)));
}

/**
 * @param {ProjectGraph} projectGraph 
 * @param {ResolvedTypeScript} typescript
 */
function compileTaskName(projectGraph, typescript) {
    return `compile:${projectGraph.configurations.get(typescript.typescript).projectName}`;
}

/**
 * @param {ProjectGraph} projectGraph 
 */
function cleanTaskName(projectGraph) {
    return `clean:${projectGraph.projectName}`;
}

/**
 * @param {string} file
 */
function normalizeSlashes(file) {
    return file.replace(/\\/g, "/");
}

/**
 * Determines whether a module specifier is a path
 * @param {string} moduleSpec
 */
function isPath(moduleSpec) {
    return path.isAbsolute(moduleSpec) || /^\.\.?([\\/]|$)/.test(moduleSpec);
}

/**
 * @typedef {import("../../lib/typescript").ParsedCommandLine & { options: CompilerOptions }} ParsedCommandLine
 * @typedef {import("../../lib/typescript").CompilerOptions & { configFilePath?: string }} CompilerOptions
 */
void 0;