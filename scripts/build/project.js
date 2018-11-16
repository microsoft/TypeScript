// @ts-check
const path = require("path");
const fs = require("fs");
const gulp = require("./gulp");
const gulpif = require("gulp-if");
const log = require("fancy-log"); // was `require("gulp-util").log (see https://github.com/gulpjs/gulp-util)
const chalk = require("./chalk");
const sourcemaps = require("gulp-sourcemaps");
const merge2 = require("merge2");
const tsc = require("gulp-typescript");
const tsc_oop = require("./gulp-typescript-oop");
const upToDate = require("./upToDate");
const ts = require("../../lib/typescript");
const del = require("del");
const needsUpdate = require("./needsUpdate");
const mkdirp = require("./mkdirp");
const prettyTime = require("pretty-hrtime");
const { reportDiagnostics } = require("./diagnostics");
const { CountdownEvent, ManualResetEvent } = require("prex");

const workStartedEvent = new ManualResetEvent();
const countdown = new CountdownEvent(0);

class CompilationGulp extends gulp.Gulp {
    /**
     * @param {boolean} [verbose]
     */
    fork(verbose) {
        const child = new ForkedGulp(this.tasks);
        child.on("task_start", e => {
            if (countdown.remainingCount === 0) {
                countdown.reset(1);
                workStartedEvent.set();
                workStartedEvent.reset();
            }
            else {
                countdown.add();
            }
            if (verbose) {
                log('Starting', `'${chalk.cyan(e.task)}' ${chalk.gray(`(${countdown.remainingCount} remaining)`)}...`);
            }
        });
        child.on("task_stop", e => {
            countdown.signal();
            if (verbose) {
                log('Finished', `'${chalk.cyan(e.task)}' after ${chalk.magenta(prettyTime(/** @type {*}*/(e).hrDuration))} ${chalk.gray(`(${countdown.remainingCount} remaining)`)}`);
            }
        });
        child.on("task_err", e => {
            countdown.signal();
            if (verbose) {
                log(`'${chalk.cyan(e.task)}' ${chalk.red("errored after")} ${chalk.magenta(prettyTime(/** @type {*}*/(e).hrDuration))} ${chalk.gray(`(${countdown.remainingCount} remaining)`)}`);
                log(e.err ? e.err.stack : e.message);
            }
        });
        return child;
    }

    // @ts-ignore
    start() {
        throw new Error("Not supported, use fork.");
    }
}

class ForkedGulp extends gulp.Gulp {
    /**
     * @param {gulp.Gulp["tasks"]} tasks
     */
    constructor(tasks) {
        super();
        this.tasks = tasks;
    }

    // Do not reset tasks
    _resetAllTasks() {}
    _resetSpecificTasks() {}
    _resetTask() {}
}

// internal `Gulp` instance for compilation artifacts.
const compilationGulp = new CompilationGulp();

/** @type {Map<ResolvedProjectSpec, ProjectGraph>} */
const projectGraphCache = new Map();

/** @type {Map<string, { typescript: string, alias: string, paths: ResolvedPathOptions }>} */
const typescriptAliasMap = new Map();

/**
 * Defines a gulp orchestration for a TypeScript project, returning a callback that can be used to trigger compilation.
 * @param {string} projectSpec The path to a tsconfig.json file or its containing directory.
 * @param {CompileOptions} [options] Project compilation options.
 * @returns {() => Promise<void>}
 */
function createCompiler(projectSpec, options) {
    const resolvedOptions = resolveCompileOptions(options);
    const resolvedProjectSpec = resolveProjectSpec(projectSpec, resolvedOptions.paths, /*referrer*/ undefined);
    const projectGraph = getOrCreateProjectGraph(resolvedProjectSpec, resolvedOptions.paths);
    projectGraph.isRoot = true;
    const taskName = compileTaskName(ensureCompileTask(projectGraph, resolvedOptions), resolvedOptions.typescript);
    return () => new Promise((resolve, reject) => compilationGulp
        .fork(resolvedOptions.verbose)
        .start(taskName, err => err ? reject(err) : resolve()));
}
exports.createCompiler = createCompiler;

/**
 * Defines and executes a gulp orchestration for a TypeScript project.
 * @param {string} projectSpec The path to a tsconfig.json file or its containing directory.
 * @param {CompileOptions} [options] Project compilation options.
 * @returns {Promise<void>}
 *
 * @typedef CompileOptions
 * @property {string} [cwd] The path to use for the current working directory. Defaults to `process.cwd()`.
 * @property {string} [base] The path to use as the base for relative paths. Defaults to `cwd`.
 * @property {string} [typescript] A module specifier or path (relative to gulpfile.js) to the version of TypeScript to use.
 * @property {Hook} [js] Pipeline hook for .js file outputs.
 * @property {Hook} [dts] Pipeline hook for .d.ts file outputs.
 * @property {boolean} [verbose] Indicates whether verbose logging is enabled.
 * @property {boolean} [force] Force recompilation (no up-to-date check).
 * @property {boolean} [inProcess] Indicates whether to run gulp-typescript in-process or out-of-process (default).
 *
 * @typedef {(stream: NodeJS.ReadableStream) => NodeJS.ReadWriteStream} Hook
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
    const projectGraph = getOrCreateProjectGraph(resolvedProjectSpec, paths);
    projectGraph.isRoot = true;
    const taskName = cleanTaskName(ensureCleanTask(projectGraph));
    return () => new Promise((resolve, reject) => compilationGulp
        .fork()
        .start(taskName, err => err ? reject(err) : resolve()));
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
 * Defines a watcher to execute a gulp orchestration to recompile a TypeScript project.
 * @param {string} projectSpec
 * @param {WatchCallback | string[] | CompileOptions} [options]
 * @param {WatchCallback | string[]} [tasks]
 * @param {WatchCallback} [callback]
 */
function watch(projectSpec, options, tasks, callback) {
    if (typeof tasks === "function") callback = tasks, tasks = /**@type {string[] | undefined}*/(undefined);
    if (typeof options === "function") callback = options, tasks = /**@type {string[] | undefined}*/(undefined), options = /**@type {CompileOptions | undefined}*/(undefined);
    if (Array.isArray(options)) tasks = options, options = /**@type {CompileOptions | undefined}*/(undefined);
    const resolvedOptions = resolveCompileOptions(options);
    resolvedOptions.watch = true;
    const resolvedProjectSpec = resolveProjectSpec(projectSpec, resolvedOptions.paths, /*referrer*/ undefined);
    const projectGraph = getOrCreateProjectGraph(resolvedProjectSpec, resolvedOptions.paths);
    projectGraph.isRoot = true;
    ensureWatcher(projectGraph, resolvedOptions, tasks, callback);
}
exports.watch = watch;

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
 * @property {string[]} [exclude] Files to exclude (relative to `cwd`)
 */
function flatten(projectSpec, flattenedProjectSpec, options = {}) {
    const paths = resolvePathOptions(options);
    const files = [];
    const resolvedOutputSpec = path.resolve(paths.cwd, flattenedProjectSpec);
    const resolvedOutputDirectory = path.dirname(resolvedOutputSpec);
    const resolvedProjectSpec = resolveProjectSpec(projectSpec, paths, /*referrer*/ undefined);
    const projectGraph = getOrCreateProjectGraph(resolvedProjectSpec, paths);
    const skipProjects = /**@type {Set<ProjectGraph>}*/(new Set());
    const skipFiles = new Set(options && options.exclude && options.exclude.map(file => path.resolve(paths.cwd, file)));
    recur(projectGraph);

    if (options.force || needsUpdate(files, resolvedOutputSpec)) {
        const config = {
            extends: normalizeSlashes(path.relative(resolvedOutputDirectory, resolvedProjectSpec)),
            compilerOptions: options.compilerOptions || {},
            files: files.map(file => normalizeSlashes(path.relative(resolvedOutputDirectory, file)))
        };
        mkdirp.sync(resolvedOutputDirectory);
        fs.writeFileSync(resolvedOutputSpec, JSON.stringify(config, undefined, 2), "utf8");
    }

    /**
     * @param {ProjectGraph} projectGraph
     */
    function recur(projectGraph) {
        if (skipProjects.has(projectGraph)) return;
        skipProjects.add(projectGraph);
        for (const ref of projectGraph.references) {
            recur(ref.target);
        }
        for (let file of projectGraph.project.fileNames) {
            file = path.resolve(projectGraph.projectDirectory, file);
            if (skipFiles.has(file)) continue;
            skipFiles.add(file);
            files.push(file);
        }
    }
}
exports.flatten = flatten;

/**
 * Returns a Promise that resolves when all pending build tasks have completed
 * @param {import("prex").CancellationToken} [token]
 */
function waitForWorkToComplete(token) {
    return countdown.wait(token);
}
exports.waitForWorkToComplete = waitForWorkToComplete;

/**
 * Returns a Promise that resolves when all pending build tasks have completed
 * @param {import("prex").CancellationToken} [token]
 */
function waitForWorkToStart(token) {
    return workStartedEvent.wait(token);
}
exports.waitForWorkToStart = waitForWorkToStart;

function getRemainingWork() {
    return countdown.remainingCount > 0;
}
exports.hasRemainingWork = getRemainingWork;

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
function resolveTypeScript(typescript = "default", paths) {
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
const defaultPaths = (() => {
    const cwd = /**@type {AbsolutePath}*/(normalizeSlashes(process.cwd()));
    return { cwd, base: cwd };
})();

/**
 * @param {PathOptions | undefined} options Path options to resolve and normalize.
 * @returns {ResolvedPathOptions}
 *
 * @typedef PathOptions
 * @property {string} [cwd] The path to use for the current working directory. Defaults to `process.cwd()`.
 * @property {string} [base] The path to use as the base for relative paths. Defaults to `cwd`.
 *
 * @typedef ResolvedPathOptions
 * @property {AbsolutePath} cwd The path to use for the current working directory. Defaults to `process.cwd()`.
 * @property {AbsolutePath} base The path to use as the base for relative paths. Defaults to `cwd`.
 */
function resolvePathOptions(options) {
    const cwd = options && options.cwd ? resolvePath(defaultPaths.cwd, options.cwd) : defaultPaths.cwd;
    const base = options && options.base ? resolvePath(cwd, options.base) : cwd;
    return cwd === defaultPaths.cwd && base === defaultPaths.base ? defaultPaths : { cwd, base };
}

/**
 * @param {CompileOptions} [options]
 * @returns {ResolvedCompileOptions}
 *
 * @typedef ResolvedCompileOptions
 * @property {ResolvedPathOptions} paths
 * @property {ResolvedTypeScript} typescript A resolved reference to a TypeScript implementation.
 * @property {Hook} [js] Pipeline hook for .js file outputs.
 * @property {Hook} [dts] Pipeline hook for .d.ts file outputs.
 * @property {boolean} [verbose] Indicates whether verbose logging is enabled.
 * @property {boolean} [force] Force recompilation (no up-to-date check).
 * @property {boolean} [inProcess] Indicates whether to run gulp-typescript in-process or out-of-process (default).
 * @property {boolean} [watch] Indicates the project was created in watch mode
 */
function resolveCompileOptions(options = {}) {
    const paths = resolvePathOptions(options);
    const typescript = resolveTypeScript(options.typescript, paths);
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
 * @param {ResolvedCompileOptions} left
 * @param {ResolvedCompileOptions} right
 * @returns {ResolvedCompileOptions}
 */
function mergeCompileOptions(left, right) {
    if (left.typescript.typescript !== right.typescript.typescript) throw new Error("Cannot merge project options targeting different TypeScript packages");
    if (tryReuseCompileOptions(left, right)) return left;
    return {
        paths: left.paths,
        typescript: left.typescript,
        js: right.js || left.js,
        dts: right.dts || left.dts,
        verbose: right.verbose || left.verbose,
        force: right.force || left.force,
        inProcess: right.inProcess || left.inProcess,
        watch: right.watch || left.watch
    };
}

/**
 * @param {ResolvedCompileOptions} left
 * @param {ResolvedCompileOptions} right
 */
function tryReuseCompileOptions(left, right) {
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
    let projectName = path.relative(paths.base, projectSpec);
    if (path.basename(projectName) === "tsconfig.json") projectName = path.dirname(projectName);
    return /**@type {UnqualifiedProjectName}*/(normalizeSlashes(projectName));
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
 * @param {AbsolutePath} [cwd]
 * @returns {ParseConfigFileHost}
 */
function getParseConfigFileHost(cwd) {
    if (!cwd || cwd === defaultPaths.cwd) return parseConfigFileHost;
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
 * @property {ResolvedPathOptions} paths
 * @property {ResolvedProjectSpec} projectSpec The fully qualified path to the tsconfig.json of the project
 * @property {UnqualifiedProjectName} projectName The relative project name, excluding any TypeScript suffix.
 * @property {AbsolutePath} projectDirectory The fully qualified path to the project directory.
 * @property {ParsedCommandLine} project The parsed tsconfig.json file.
 * @property {ProjectGraphReference[]} references An array of project references.
 * @property {Set<ProjectGraph>} referrers An array of referring projects.
 * @property {Set<AbsolutePath>} inputs A set of compilation inputs.
 * @property {Set<AbsolutePath>} outputs A set of compilation outputs.
 * @property {Map<ResolvedTypeScriptSpec, ProjectGraphConfiguration>} configurations TypeScript-specific configurations for the project.
 * @property {boolean} cleanTaskCreated A value indicating whether a `clean:` task has been created for this project (not dependent on TypeScript version).
 * @property {boolean} watcherCreated A value indicating whether a watcher has been created for this project.
 * @property {boolean} isRoot The project graph is a root project reference.
 * @property {Set<Watcher>} [allWatchers] Tasks to execute when the compilation has completed after being triggered by a watcher.
 *
 * @typedef ProjectGraphReference
 * @property {ProjectGraph} source The referring project.
 * @property {ProjectGraph} target The referenced project.
 */
function getOrCreateProjectGraph(projectSpec, paths) {
    let projectGraph = projectGraphCache.get(projectSpec);
    if (!projectGraph) {
        const project = parseProject(projectSpec, paths);
        const projectDirectory = parentDirectory(projectSpec);
        projectGraph = {
            paths,
            projectSpec,
            projectName: getUnqualifiedProjectName(projectSpec, paths),
            projectDirectory,
            project,
            references: [],
            referrers: new Set(),
            inputs: new Set(project.fileNames.map(file => resolvePath(projectDirectory, file))),
            outputs: new Set(ts.getAllProjectOutputs(project).map(file => resolvePath(projectDirectory, file))),
            configurations: new Map(),
            cleanTaskCreated: false,
            watcherCreated: false,
            isRoot: false
        };
        projectGraphCache.set(projectSpec, projectGraph);
        if (project.projectReferences) {
            for (const projectReference of project.projectReferences) {
                const resolvedProjectSpec = resolveProjectSpec(projectReference.path, paths, projectGraph);
                const referencedProject = getOrCreateProjectGraph(resolvedProjectSpec, paths);
                const reference = { source: projectGraph, target: referencedProject };
                projectGraph.references.push(reference);
                referencedProject.referrers.add(projectGraph);
            }
        }
    }
    return projectGraph;
}

/**
 * @param {ResolvedPathOptions} paths
 */
function createParseProject(paths) {
    /**
     * @param {string} configFilePath
     */
    function getProject(configFilePath) {
        const projectSpec = resolveProjectSpec(configFilePath, paths, /*referrer*/ undefined);
        const projectGraph = getOrCreateProjectGraph(projectSpec, defaultPaths);
        return projectGraph && projectGraph.project;
    }
    return getProject;
}

/**
 * @param {ProjectGraph} projectGraph
 * @param {ParsedCommandLine} parsedProject
 */
function updateProjectGraph(projectGraph, parsedProject) {
    projectGraph.project = parsedProject;
    projectGraph.inputs = new Set(projectGraph.project.fileNames.map(file => resolvePath(projectGraph.projectDirectory, file)));
    projectGraph.outputs = new Set(ts.getAllProjectOutputs(projectGraph.project).map(file => resolvePath(projectGraph.projectDirectory, file)));

    // Update project references.
    const oldReferences = new Set(projectGraph.references.map(ref => ref.target));
    projectGraph.references = [];
    if (projectGraph.project.projectReferences) {
        for (const projectReference of projectGraph.project.projectReferences) {
            const resolvedProjectSpec = resolveProjectSpec(projectReference.path, projectGraph.paths, projectGraph);
            const referencedProject = getOrCreateProjectGraph(resolvedProjectSpec, projectGraph.paths);
            const reference = { source: projectGraph, target: referencedProject };
            projectGraph.references.push(reference);
            referencedProject.referrers.add(projectGraph);
            oldReferences.delete(referencedProject);
        }
    }

    // Remove project references that have been removed from the project
    for (const referencedProject of oldReferences) {
        referencedProject.referrers.delete(projectGraph);
        // If there are no more references to this project and the project was not directly requested,
        // remove it from the cache.
        if (referencedProject.referrers.size === 0 && !referencedProject.isRoot) {
            projectGraphCache.delete(referencedProject.projectSpec);
        }
    }
}

/**
 * @param {ResolvedProjectSpec} projectSpec
 * @param {ResolvedPathOptions} paths
 */
function parseProject(projectSpec, paths) {
    return ts.getParsedCommandLineOfConfigFile(projectSpec, {}, getParseConfigFileHost(paths.cwd));
}

/**
 * @param {ProjectGraph} projectGraph
 * @param {ResolvedCompileOptions} resolvedOptions
 * @returns {ProjectGraphConfiguration}
 *
 * @typedef ProjectGraphConfiguration
 * @property {QualifiedProjectName} projectName
 * @property {ResolvedCompileOptions} resolvedOptions
 * @property {boolean} compileTaskCreated A value indicating whether a `compile:` task has been created for this project.
 * @property {Set<Watcher>} [watchers] Tasks to execute when the compilation has completed after being triggered by a watcher.
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
 * Resolves a series of path steps as a normalized, canonical, and absolute path.
 * @param {AbsolutePath} basePath
 * @param {...string} paths
 * @returns {AbsolutePath}
 *
 * @typedef {string & {_isResolvedPath:never}} AbsolutePath
 */
function resolvePath(basePath, ...paths) {
    return /**@type {AbsolutePath}*/(normalizeSlashes(path.resolve(basePath, ...paths)));
}

/**
 * @param {AbsolutePath} from
 * @param {AbsolutePath} to
 * @returns {Path}
 *
 * @typedef {string & {_isRelativePath:never}} RelativePath
 * @typedef {RelativePath | AbsolutePath} Path
 */
function relativePath(from, to) {
    let relativePath = normalizeSlashes(path.relative(from, to));
    if (!relativePath) relativePath = ".";
    if (path.isAbsolute(relativePath)) return /**@type {AbsolutePath}*/(relativePath);
    if (relativePath.charAt(0) !== ".") relativePath = "./" + relativePath;
    return /**@type {RelativePath}*/(relativePath);
}

/**
 * @param {AbsolutePath} file
 * @returns {AbsolutePath}
 */
function parentDirectory(file) {
    const dirname = path.dirname(file);
    if (!dirname || dirname === file) return file;
    return /**@type {AbsolutePath}*/(normalizeSlashes(dirname));
}

/**
 * @param {string} projectSpec
 * @param {ResolvedPathOptions} paths
 * @param {ProjectGraph | undefined} referrer
 * @returns {ResolvedProjectSpec}
 *
 * @typedef {AbsolutePath & {_isResolvedProjectSpec: never}} ResolvedProjectSpec
 */
function resolveProjectSpec(projectSpec, paths, referrer) {
    let projectPath = resolvePath(paths.cwd, referrer && referrer.projectDirectory || "", projectSpec);
    if (!ts.sys.fileExists(projectPath)) projectPath = resolvePath(paths.cwd, projectPath, "tsconfig.json");
    return /**@type {ResolvedProjectSpec}*/(normalizeSlashes(projectPath));
}

/**
 * @param {ProjectGraph} projectGraph
 * @param {ResolvedPathOptions} paths
 */
function resolveDestPath(projectGraph, paths) {
    /** @type {AbsolutePath} */
    let destPath = projectGraph.projectDirectory;
    if (projectGraph.project.options.outDir) {
        destPath = resolvePath(paths.cwd, destPath, projectGraph.project.options.outDir);
    }
    else if (projectGraph.project.options.outFile || projectGraph.project.options.out) {
        destPath = parentDirectory(resolvePath(paths.cwd, destPath, projectGraph.project.options.outFile || projectGraph.project.options.out));
    }
    return relativePath(paths.base, destPath);
}

/**
 * @param {ProjectGraph} projectGraph
 * @param {ResolvedCompileOptions} options
 */
function ensureCompileTask(projectGraph, options) {
    const projectGraphConfig = getOrCreateProjectGraphConfiguration(projectGraph, options);
    projectGraphConfig.resolvedOptions = mergeCompileOptions(projectGraphConfig.resolvedOptions, options);
    const hasCompileTask = projectGraphConfig.compileTaskCreated;
    projectGraphConfig.compileTaskCreated = true;
    const deps = makeProjectReferenceCompileTasks(projectGraph, projectGraphConfig.resolvedOptions.typescript, projectGraphConfig.resolvedOptions.paths, projectGraphConfig.resolvedOptions.watch);
    if (!hasCompileTask) {
        compilationGulp.task(compileTaskName(projectGraph, projectGraphConfig.resolvedOptions.typescript), deps, () => {
            const destPath = resolveDestPath(projectGraph, projectGraphConfig.resolvedOptions.paths);
            const { sourceMap, inlineSourceMap, inlineSources = false, sourceRoot, declarationMap } = projectGraph.project.options;
            const configFilePath = projectGraph.project.options.configFilePath;
            const sourceMapPath = inlineSourceMap ? undefined : ".";
            const sourceMapOptions = { includeContent: inlineSources, sourceRoot, destPath };
            const project = projectGraphConfig.resolvedOptions.inProcess
                ? tsc.createProject(configFilePath, { typescript: require(projectGraphConfig.resolvedOptions.typescript.typescript) })
                : tsc_oop.createProject(configFilePath, {}, { typescript: projectGraphConfig.resolvedOptions.typescript.typescript });
            const stream = project.src()
                .pipe(gulpif(!projectGraphConfig.resolvedOptions.force, upToDate(projectGraph.project, { verbose: projectGraphConfig.resolvedOptions.verbose, parseProject: createParseProject(projectGraphConfig.resolvedOptions.paths) })))
                .pipe(gulpif(sourceMap || inlineSourceMap, sourcemaps.init()))
                .pipe(project());
            if (projectGraphConfig.resolvedOptions.watch) {
                stream.on("error", error => {
                    if (error.message === "TypeScript: Compilation failed") {
                        stream.emit("end");
                        stream.js.emit("end");
                        stream.dts.emit("end");
                    }
                });
            }
            const js = (projectGraphConfig.resolvedOptions.js ? projectGraphConfig.resolvedOptions.js(stream.js) : stream.js)
                .pipe(gulpif(sourceMap || inlineSourceMap, sourcemaps.write(sourceMapPath, sourceMapOptions)));
            const dts = (projectGraphConfig.resolvedOptions.dts ? projectGraphConfig.resolvedOptions.dts(stream.dts) : stream.dts)
                .pipe(gulpif(declarationMap, sourcemaps.write(sourceMapPath, sourceMapOptions)));
            return merge2([js, dts])
                .pipe(gulp.dest(destPath));
        });
    }
    return projectGraph;
}

/**
 * @param {ProjectGraph} projectGraph
 * @param {ResolvedTypeScript} typescript
 * @param {ResolvedPathOptions} paths
 * @param {boolean} watch
 */
function makeProjectReferenceCompileTasks(projectGraph, typescript, paths, watch) {
    return projectGraph.references.map(({target}) => compileTaskName(ensureCompileTask(target, { paths, typescript, watch }), typescript));
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
 * @param {ResolvedCompileOptions} options
 * @param {string[]} [tasks]
 * @param {(err?: any) => void} [callback]
 *
 * @typedef Watcher
 * @property {string[]} [tasks]
 * @property {(err?: any) => void} [callback]
 *
 * @typedef WatcherRegistration
 * @property {() => void} end
 */
function ensureWatcher(projectGraph, options, tasks, callback) {
    ensureCompileTask(projectGraph, options);
    if (!projectGraph.watcherCreated) {
        projectGraph.watcherCreated = true;
        makeProjectReferenceWatchers(projectGraph, options.typescript, options.paths);
        createWatcher(projectGraph, options, () => {
            for (const config of projectGraph.configurations.values()) {
                const taskName = compileTaskName(projectGraph, config.resolvedOptions.typescript);
                const task = compilationGulp.tasks[taskName];
                if (!task) continue;
                possiblyTriggerRecompilation(config, task);
            }
        });
    }
    if ((tasks && tasks.length) || callback) {
        const projectGraphConfig = getOrCreateProjectGraphConfiguration(projectGraph, options);
        if (!projectGraphConfig.watchers) projectGraphConfig.watchers = new Set();
        if (!projectGraph.allWatchers) projectGraph.allWatchers = new Set();

        /** @type {Watcher} */
        const watcher = { tasks, callback };
        projectGraphConfig.watchers.add(watcher);
        projectGraph.allWatchers.add(watcher);

        /** @type {WatcherRegistration} */
        const registration = {
            end() {
                projectGraphConfig.watchers.delete(watcher);
                projectGraph.allWatchers.delete(watcher);
            }
        };
        return registration;
    }
}

/**
 * @param {ProjectGraphConfiguration} config
 * @param {import("orchestrator").Task} task
 */
function possiblyTriggerRecompilation(config, task) {
    // if any of the task's dependencies are still running, wait until they are complete.
    for (const dep of task.dep) {
        if (compilationGulp.tasks[dep].running) {
            setTimeout(possiblyTriggerRecompilation, 50, config, task);
            return;
        }
    }

    triggerRecompilation(task, config);
}

/**
 * @param {import("orchestrator").Task} task
 * @param {ProjectGraphConfiguration} config
 */
function triggerRecompilation(task, config) {
    compilationGulp._resetTask(task);
    if (config.watchers && config.watchers.size) {
        compilationGulp.fork().start(task.name, () => {
            /** @type {Set<string>} */
            const taskNames = new Set();
            /** @type {((err?: any) => void)[]} */
            const callbacks = [];
            for (const { tasks, callback } of config.watchers) {
                if (tasks) for (const task of tasks) taskNames.add(task);
                if (callback) callbacks.push(callback);
            }
            if (taskNames.size) {
                gulp.start([...taskNames], error => {
                    for (const callback of callbacks) callback(error);
                });
            }
            else {
                for (const callback of callbacks) callback();
            }
        });
    }
    else {
        compilationGulp.fork(/*verbose*/ true).start(task.name);
    }
}

/**
 * @param {ProjectGraph} projectGraph
 * @param {ResolvedTypeScript} typescript
 * @param {ResolvedPathOptions} paths
 */
function makeProjectReferenceWatchers(projectGraph, typescript, paths) {
    for (const { target } of projectGraph.references) {
        ensureWatcher(target, { paths, typescript });
    }
}

/**
 * @param {ProjectGraph} projectGraph
 * @param {ResolvedCompileOptions} options
 * @param {() => void} callback
 */
function createWatcher(projectGraph, options, callback) {
    let projectRemoved = false;
    let patterns = collectWatcherPatterns(projectGraph.projectSpec, projectGraph.project, projectGraph);
    let watcher = /**@type {GulpWatcher}*/ (gulp.watch(patterns, { cwd: projectGraph.projectDirectory }, onWatchEvent));

    /**
     * @param {WatchEvent} event
     */
    function onWatchEvent(event) {
        const file = resolvePath(options.paths.cwd, event.path);
        if (file === projectGraph.projectSpec) {
            onProjectWatchEvent(event);
        }
        else {
            onInputOrOutputChanged(file);
        }
    }

    /**
     * @param {WatchEvent} event
     */
    function onProjectWatchEvent(event) {
        if (event.type === "renamed" || event.type === "deleted") {
            onProjectRenamedOrDeleted();
        }
        else {
            onProjectCreatedOrModified();
        }
    }

    function onProjectRenamedOrDeleted() {
        // stop listening for file changes and wait for the project to be created again
        projectRemoved = true;
        watcher.end();
        watcher = /**@type {GulpWatcher}*/ (gulp.watch([projectGraph.projectSpec], onWatchEvent));
    }

    function onProjectCreatedOrModified() {
        const newParsedProject = parseProject(projectGraph.projectSpec, options.paths);
        const newPatterns = collectWatcherPatterns(projectGraph.projectSpec, newParsedProject, projectGraph);
        if (projectRemoved || !sameValues(patterns, newPatterns)) {
            projectRemoved = false;
            watcher.end();
            updateProjectGraph(projectGraph, newParsedProject);
            // Ensure we catch up with any added projects
            for (const config of projectGraph.configurations.values()) {
                if (config.watchers) {
                    makeProjectReferenceWatchers(projectGraph, config.resolvedOptions.typescript, config.resolvedOptions.paths);
                }
            }
            patterns = newPatterns;
            watcher = /**@type {GulpWatcher}*/ (gulp.watch(patterns, onWatchEvent));
        }
        onProjectInvalidated();
    }

    function onProjectInvalidated() {
        callback();
    }

    /**
     * @param {AbsolutePath} file
     */
    function onInputOrOutputChanged(file) {
        if (projectGraph.inputs.has(file) ||
            projectGraph.references.some(ref => ref.target.outputs.has(file))) {
            onProjectInvalidated();
        }
    }
}

/**
 * @param {ResolvedProjectSpec} projectSpec
 * @param {ParsedCommandLine} parsedProject
 * @param {ProjectGraph} projectGraph
 */
function collectWatcherPatterns(projectSpec, parsedProject, projectGraph) {
    const configFileSpecs = parsedProject.configFileSpecs;

    // NOTE: we do not currently handle files from `/// <reference />` tags
    const patterns = /**@type {string[]} */([]);

    // Add the project contents.
    if (configFileSpecs) {
        addIncludeSpecs(patterns, configFileSpecs.validatedIncludeSpecs);
        addExcludeSpecs(patterns, configFileSpecs.validatedExcludeSpecs);
        addIncludeSpecs(patterns, configFileSpecs.filesSpecs);
    }
    else {
        addWildcardDirectories(patterns, parsedProject.wildcardDirectories);
        addIncludeSpecs(patterns, parsedProject.fileNames);
    }

    // Add the project itself.
    addIncludeSpec(patterns, projectSpec);

    // TODO: Add the project base.
    // addExtendsSpec(patterns, project.raw && project.raw.extends);

    // Add project reference outputs.
    addProjectReferences(patterns, parsedProject.projectReferences);

    return patterns;

    /**
     * @param {string[]} patterns
     * @param {string | undefined} includeSpec
     */
    function addIncludeSpec(patterns, includeSpec) {
        if (!includeSpec) return;
        patterns.push(includeSpec);
    }

    /**
     * @param {string[]} patterns
     * @param {ReadonlyArray<string> | undefined} includeSpecs
     */
    function addIncludeSpecs(patterns, includeSpecs) {
        if (!includeSpecs) return;
        for (const includeSpec of includeSpecs) {
            addIncludeSpec(patterns, includeSpec);
        }
    }

    /**
     * @param {string[]} patterns
     * @param {string | undefined} excludeSpec
     */
    function addExcludeSpec(patterns, excludeSpec) {
        if (!excludeSpec) return;
        patterns.push("!" + excludeSpec);
    }

    /**
     * @param {string[]} patterns
     * @param {ReadonlyArray<string> | undefined} excludeSpecs
     */
    function addExcludeSpecs(patterns, excludeSpecs) {
        if (!excludeSpecs) return;
        for (const excludeSpec of excludeSpecs) {
            addExcludeSpec(patterns, excludeSpec);
        }
    }

    /**
     * @param {string[]} patterns
     * @param {ts.MapLike<ts.WatchDirectoryFlags> | undefined} wildcardDirectories
     */
    function addWildcardDirectories(patterns, wildcardDirectories) {
        if (!wildcardDirectories) return;
        for (const dirname of Object.keys(wildcardDirectories)) {
            const flags = wildcardDirectories[dirname];
            patterns.push(path.join(dirname, flags & ts.WatchDirectoryFlags.Recursive ? "**" : "", "*"));
        }
    }

    // TODO: Add the project base
    // /**
    //  * @param {string[]} patterns
    //  * @param {string | undefined} base
    //  */
    // function addExtendsSpec(patterns, base) {
    //     if (!base) return;
    //     addIncludeSpec(patterns, base);
    // }

    /**
     * @param {string[]} patterns
     * @param {ReadonlyArray<ProjectReference>} projectReferences
     */
    function addProjectReferences(patterns, projectReferences) {
        if (!projectReferences) return;
        for (const projectReference of projectReferences) {
            const resolvedProjectSpec = resolveProjectSpec(projectReference.path, projectGraph.paths, projectGraph);
            const referencedProject = getOrCreateProjectGraph(resolvedProjectSpec, projectGraph.paths);
            for (const output of referencedProject.outputs) {
                patterns.push(output);
            }
        }
    }
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
 * @template T
 * @param {ReadonlyArray<T>} left
 * @param {ReadonlyArray<T>} right
 */
function sameValues(left, right) {
    if (left === right) return true;
    if (left.length !== right.length) return false;
    for (let i = 0; i < left.length; i++) {
        if (left[i] !== right[i]) return false;
    }
    return true;
}

/**
 * @typedef {import("../../lib/typescript").ParsedCommandLine & { options: CompilerOptions, configFileSpecs?: ConfigFileSpecs }} ParsedCommandLine
 * @typedef {import("../../lib/typescript").CompilerOptions & { configFilePath?: string }} CompilerOptions
 * @typedef {import("../../lib/typescript").ProjectReference} ProjectReference
 * @typedef {import("gulp").WatchEvent} WatchEvent
 * @typedef {import("gulp").WatchCallback} WatchCallback
 * @typedef {NodeJS.EventEmitter & { end(): void, add(files: string | string[], done?: () => void): void, remove(file: string): void }} GulpWatcher
 *
 * @typedef ConfigFileSpecs
 * @property {ReadonlyArray<string> | undefined} filesSpecs
 * @property {ReadonlyArray<ProjectReference> | undefined} referenceSpecs
 * @property {ReadonlyArray<string> | undefined} validatedIncludeSpecs
 * @property {ReadonlyArray<string> | undefined} validatedExcludeSpecs
 * @property {ts.MapLike<ts.WatchDirectoryFlags>} wildcardDirectories
 */
void 0;