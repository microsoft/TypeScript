// @ts-check
const path = require("path");
const fs = require("fs");
const gulp = require("./gulp");
const PluginError = require("plugin-error");
const log = require("fancy-log"); // was `require("gulp-util").log (see https://github.com/gulpjs/gulp-util)
const gulpif = require("gulp-if");
const sourcemaps = require("gulp-sourcemaps");
const merge2 = require("merge2");
const tsc = require("gulp-typescript");
const tsc_oop = require("./gulp-typescript-oop");
const upToDate = require("./upToDate");
const ts = require("../../lib/typescript");
const debugMode = require("./debugMode");
const del = require("del");
const needsUpdate = require("./needsUpdate");
const mkdirp = require("./mkdirp");

module.exports = exports = project;

/** @type {Map<string, Map<string, ResolvedProject>>} */
const typescriptProjects = new Map();

/** @type {Record<string, { typescript: string, deps?: string[] }>} */
const typescriptRegistry = { };

/**
 * Defines a series of gulp tasks for a TypeScript project, returning the root task name.
 * @param {string} projectSpec
 * @param {ProjectOptions} [options]
 * @param {(project: ParsedCommandLine, destPath: string, options: ResolvedProjectOptions) => NodeJS.ReadWriteStream} [task]
 */
function project(projectSpec, options, task) {
    return makeProject(projectSpec, resolveProjectOptions(options), /*referer*/ undefined, task).taskName;
}
exports.project = project;

/**
 * Defines a deferred gulp pipeline for a TypeScript project.
 * @param {string} projectSpec
 * @param {ProjectOptions} [options]
 * @param {(project: ParsedCommandLine, destPath: string, options: ResolvedProjectOptions) => NodeJS.ReadWriteStream} [task]
 */
function defer(projectSpec, options, task) {
    const resolvedOptions = resolveProjectOptions(options);
    resolvedOptions.defer = true;
    const resolvedProject = prepareProject(projectSpec, resolvedOptions, /*referer*/ undefined, task);
    return getProjectTaskFunction(resolvedProject);
}
exports.defer = defer;

/**
 * Defines a series of gulp tasks to clean the outputs of a TypeScript project, returning the root task name.
 * @param {string} projectSpec
 * @param {CleanOptions} [options]
 */
function clean(projectSpec, options) {
    return makeClean(projectSpec, resolveCleanOptions(options), /*referer*/ undefined);
}
exports.clean = clean;

/**
 * Defines the default task behavior.
 * @param {ParsedCommandLine} parsedProject
 * @param {string} destPath
 * @param {ResolvedTaskConfiguration} options
 */
function defaultTask(parsedProject, destPath, options) {
    const { sourceMap, inlineSourceMap, inlineSources = false, sourceRoot, declarationMap } = parsedProject.options;
    const configFilePath = parsedProject.options.configFilePath;
    const sourceMapPath = inlineSourceMap ? undefined : ".";
    const sourceMapOptions = { includeContent: inlineSources, sourceRoot, destPath };
    const project = options.inProcess
        ? tsc.createProject(configFilePath, Object.assign({}, options.compilerOptions, { typescript: require(options.typescript)}))
        : tsc_oop.createProject(configFilePath, Object.assign({}, options.compilerOptions), { typescript: options.typescript });
    const stream = project.src()
        .pipe(gulpif(!options.force, upToDate(parsedProject, { verbose: options.verbose })))
        .pipe(gulpif(sourceMap || inlineSourceMap, sourcemaps.init()))
        .pipe(project());
    const js = stream.js
        .pipe(gulpif(sourceMap || inlineSourceMap, sourcemaps.write(sourceMapPath, sourceMapOptions)));
    const dts = stream.dts
        .pipe(gulpif(declarationMap, sourcemaps.write(sourceMapPath, sourceMapOptions)));
    return merge2([options.js ? options.js(js) : js, options.dts ? options.dts(dts) : dts])
        .pipe(gulp.dest(destPath));
}
exports.defaultTask = defaultTask;

/**
 * Adds a named alias for a TypeScript language service path
 * @param {string} alias 
 * @param {string} typescript 
 * @param {string[]} [deps] 
 */
function addTypeScript(alias, typescript, deps) {
    typescriptRegistry[alias] = { typescript, deps };
}
exports.addTypeScript = addTypeScript;

/**
 * Flattens a project with project references into a single project.
 * @param {string} projectSpec
 * @param {string} flattenedProjectSpec
 * @param {FlattenOptions} [options]
 */
function flatten(projectSpec, flattenedProjectSpec, options = {}) {
    const files = [];
    const resolvedOutputSpec = path.resolve(flattenedProjectSpec);
    const resolvedOutputDirectory = path.dirname(resolvedOutputSpec);
    const resolvedProjectSpec = resolveProjectSpec(projectSpec);
    const parsedProject = ts.getParsedCommandLineOfConfigFile(resolvedProjectSpec, {}, parseConfigFileHost);
    recur(parsedProject);

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
     * @param {ParsedCommandLine} parsedProject 
     */
    function recur(parsedProject) {
        if (parsedProject.projectReferences) {
            for (const ref of parsedProject.projectReferences) {
                const resolvedProjectSpec = resolveProjectSpec(ref.path, parsedProject);
                const referencedProject = ts.getParsedCommandLineOfConfigFile(resolvedProjectSpec, {}, parseConfigFileHost);
                recur(referencedProject);
            }
        }
        for (const file of parsedProject.fileNames) {
            files.push(normalizeSlashes(path.relative(resolvedOutputDirectory, path.resolve(file))));
        }
    }
}
exports.flatten = flatten;

/**
 * @param {string} typescript 
 */
function resolveTypeScript(typescript) {
    /** @type {string[] | undefined} */
    let deps;
    while (typescript in typescriptRegistry) {
        const entry = typescriptRegistry[typescript];
        typescript = entry.typescript;
        if (!deps) deps = entry.deps;
    }

    if (typescript === "default") {
        typescript = require.resolve("../../lib/typescript");
    }
    else if (isPath(typescript)) {
        typescript = path.resolve(process.cwd(), typescript);
    }

    return { typescript, deps };
}

/**
 * @param {ProjectOptions} [options]
 * @returns {ResolvedProjectOptions}
 */
function resolveProjectOptions(options = {}) {
    const resolvedTypeScript = resolveTypeScript(options.typescript || "default");
    return {
        typescript: resolvedTypeScript.typescript,
        deps: concat(options.deps, resolvedTypeScript.deps),
        compilerOptions: options.compilerOptions || {},
        js: options.js,
        dts: options.dts,
        debug: resolveProjectConfiguration(options.debug),
        release: resolveProjectConfiguration(options.release),
        verbose: options.verbose || false,
        force: options.force || false,
        inProcess: options.inProcess || false,
        defer: false
    };
}

/**
 * @param {CleanOptions} [options]
 * @returns {ResolvedCleanOptions}
 */
function resolveCleanOptions(options = {}) {
    const resolvedTypeScript = resolveTypeScript(options.typescript || "default");
    return { typescript: resolvedTypeScript.typescript };
}

/**
 * @param {ProjectConfiguration} [config]
 * @returns {ResolvedProjectConfiguration}
 */
function resolveProjectConfiguration(config = {}) {
    return {
        compilerOptions: config.compilerOptions || {},
        deps: config.deps,
        js: config.js,
        dts: config.dts,
        force: config.force,
        inProcess: config.inProcess
    };
}

/**
 * @param {ResolvedProjectOptions} a
 * @param {ResolvedProjectOptions} b
 */
function mergeProjectOptions(a, b) {
    return {
        typescript: a.typescript || b.typescript,
        deps: distinct(concat(a.deps, b.deps)),
        compilerOptions: Object.assign({}, a.compilerOptions, b.compilerOptions),
        js: b.js || a.js,
        dts: b.dts || a.dts,
        debug: mergeProjectConfigurations(a.debug, b.debug),
        release: mergeProjectConfigurations(a.release, b.release),
        verbose: b.verbose || a.verbose,
        force: b.force || a.force,
        inProcess: b.inProcess || a.inProcess,
        defer: a.defer || b.defer
    };
}

/**
 * @param {ResolvedProjectConfiguration} a
 * @param {ResolvedProjectConfiguration} b
 */
function mergeProjectConfigurations(a, b) {
    return {
        compilerOptions: Object.assign({}, a.compilerOptions, b.compilerOptions),
        deps: concat(a.deps, b.deps),
        js: b.js || a.js,
        dts: b.dts || a.dts,
        force: b.force !== undefined ? b.force : a.force,
        inProcess: b.inProcess !== undefined ? b.inProcess : a.inProcess
    };
}

/**
 * @param {ResolvedProjectOptions} options
 * @returns {ResolvedTaskConfiguration}
 */
function getResolvedTaskConfiguration(options) {
    const config = debugMode.useDebugMode ? options.debug : options.release
    return {
        typescript: options.typescript,
        compilerOptions: Object.assign({}, options.compilerOptions, config.compilerOptions),
        deps: concat(options.deps, config.deps),
        dts: config.dts || options.dts,
        js: config.js || options.js,
        verbose: options.verbose,
        force: config.force !== undefined ? config.force : options.force,
        inProcess: config.inProcess !== undefined ? config.inProcess : options.inProcess
    };
}

/**
 * @template T
 * @param {T[] | undefined} a 
 * @param {T[] | undefined} b 
 * @returns {T[] | undefined}
 */
function concat(a, b) {
    return a ? b ? a.concat(b) : a : b;
}

/**
 * @template T
 * @param {T[] | undefined} ar 
 * @returns {T[] | undefined}
 */

function distinct(ar) {
    return ar && [...new Set(ar)];
}

/**
 * @param {string} projectSpec
 * @param {ResolvedProjectOptions} resolvedOptions
 * @param {ParsedCommandLine} [referer]
 * @param {Task} [task]
 */
function prepareProject(projectSpec, resolvedOptions, referer, task) {
    const resolvedProject = resolveProject(projectSpec, resolvedOptions, referer);
    if (resolvedProject.resolvedOptions !== resolvedOptions) {
        resolvedProject.resolvedOptions = mergeProjectOptions(resolvedProject.resolvedOptions, resolvedOptions);
    }
    if (task) resolvedProject.task = task;
    return resolvedProject;
}

/**
 * @param {string} projectSpec
 * @param {ResolvedProjectOptions} resolvedOptions
 * @param {ParsedCommandLine} [referer]
 * @param {Task} [task]
 */
function makeProject(projectSpec, resolvedOptions, referer, task) {
    const resolvedProject = prepareProject(projectSpec, resolvedOptions, referer, task);
    if (!resolvedProject.projectTaskCreated || resolvedProject.task) {
        createProjectTask(resolvedProject);
    }
    return resolvedProject;
}

/**
 * @param {string} projectSpec
 * @param {ResolvedCleanOptions} resolvedOptions
 * @param {ParsedCommandLine} [referer]
 */
function makeClean(projectSpec, resolvedOptions, referer) {
    const projects = getProjects(resolvedOptions);
    const resolvedProjectSpec = resolveProjectSpec(projectSpec, referer, projects);
    const resolvedProject = projects.get(resolvedProjectSpec);
    if (!resolvedProject) throw new PluginError("clean", `Project not found: '${projectSpec}'. Add project via 'project()' first.`);
    if (!resolvedProject.cleanTaskCreated) {
        createCleanTask(resolvedProject);
    }
    return "clean:" + resolvedProject.projectName;
}

/**
 * @param {ResolvedProjectOptions | ResolvedCleanOptions} resolvedOptions
 */
function getProjects(resolvedOptions) {
    let projects = typescriptProjects.get(resolvedOptions.typescript);
    if (!projects) typescriptProjects.set(resolvedOptions.typescript, projects = new Map());
    return projects;
}

/**
 * @param {string} resolvedProjectSpec
 * @param {ResolvedProjectOptions} resolvedOptions
 */
function getProjectName(resolvedProjectSpec, resolvedOptions) {
    let projectName = path.relative(process.cwd(), resolvedProjectSpec);
    if (resolvedOptions.typescript !== resolveTypeScript("default").typescript) {
        projectName += `@${isPath(resolvedOptions.typescript) ? path.relative(process.cwd(), resolvedOptions.typescript) : resolvedOptions.typescript}`;
    }
    return normalizeSlashes(projectName);
}

/** @type {FormatDiagnosticsHost} */
const formatDiagnosticsHost = {
    getCanonicalFileName: fileName => fileName,
    getCurrentDirectory: () => process.cwd(),
    getNewLine: () => ts.sys.newLine
};

/** @type {ParseConfigFileHost} */
const parseConfigFileHost = {
    useCaseSensitiveFileNames: ts.sys.useCaseSensitiveFileNames,
    fileExists: fileName => ts.sys.fileExists(fileName),
    readFile: fileName => ts.sys.readFile(fileName),
    getCurrentDirectory: () => ts.sys.getCurrentDirectory(),
    readDirectory: (rootDir, extensions, exclude, include, depth) => ts.sys.readDirectory(rootDir, extensions, exclude, include, depth),
    onUnRecoverableConfigFileDiagnostic: diagnostic => {
        log.warn(ts.formatDiagnosticsWithColorAndContext([diagnostic], formatDiagnosticsHost));
    }
};

/**
 * @param {string} projectSpec
 * @param {ResolvedProjectOptions} resolvedOptions
 * @param {ParsedCommandLine} [referer]
 */
function resolveProject(projectSpec, resolvedOptions, referer) {
    const projects = getProjects(resolvedOptions);
    const resolvedProjectSpec = resolveProjectSpec(projectSpec, referer, projects);
    let resolvedProject = projects.get(resolvedProjectSpec);
    if (!resolvedProject) {
        const projectName = getProjectName(resolvedProjectSpec, resolvedOptions);
        resolvedProject = {
            resolvedProjectSpec,
            projectName,
            taskName: "project:" + projectName,
            parsedProject: undefined,
            resolvedOptions,
            destPath: undefined,
            projectTaskCreated: false,
            cleanTaskCreated: false,
            task: undefined,
            projectTask: undefined
        };
        if (!resolvedOptions.defer) {
            getParsedProject(resolvedProject);
            getDestPath(resolvedProject);
        }
        projects.set(resolvedProjectSpec, resolvedProject);
    }
    return resolvedProject;
}

/**
 * @param {ResolvedProject} resolvedProject 
 */
function getParsedProject(resolvedProject) {
    if (!resolvedProject.parsedProject) {
        resolvedProject.parsedProject = ts.getParsedCommandLineOfConfigFile(
            resolvedProject.resolvedProjectSpec, 
            resolvedProject.resolvedOptions.compilerOptions, 
            parseConfigFileHost);
    }
    return resolvedProject.parsedProject;
}

/**
 * @param {ResolvedProject} resolvedProject 
 */
function getDestPath(resolvedProject) {
    if (!resolvedProject.destPath) {
        resolvedProject.destPath = resolveDestPath(getParsedProject(resolvedProject));
    }
    return resolvedProject.destPath;
}

/**
 * @param {string} projectSpec
 * @param {ParsedCommandLine} [referer]
 * @param {Map<string, ResolvedProject>} [projects]
 */
function resolveProjectSpec(projectSpec, referer, projects) {
    projectSpec = referer ? path.resolve(path.dirname(referer.options.configFilePath), projectSpec) : path.resolve(projectSpec);
    projectSpec = normalizeSlashes(projectSpec);

    // quick checks for existing project in cache
    if (projects && projects.has(projectSpec)) return projectSpec;

    const configSpec = normalizeSlashes(path.join(projectSpec, "tsconfig.json"));
    if (projects && projects.has(configSpec)) return configSpec;

    // slower checks against file system
    if (fs.existsSync(projectSpec) && fs.statSync(projectSpec).isDirectory()) {
        return configSpec;
    }

    return projectSpec;
}

/**
 * @param {ParsedCommandLine} parsedProject
 */
function resolveDestPath(parsedProject) {
    /** @type {string} */
    let destPath = path.dirname(parsedProject.options.configFilePath);
    if (parsedProject.options.outDir) {
        destPath = path.resolve(destPath, parsedProject.options.outDir);
    }
    else if (parsedProject.options.outFile || parsedProject.options.out) {
        destPath = path.dirname(path.resolve(destPath, parsedProject.options.outFile || parsedProject.options.out));
    }
    return normalizeSlashes(path.relative(process.cwd(), destPath));
}

/**
 * @param {ResolvedProject} resolvedProject
 */
function createProjectTask(resolvedProject) {
    const { parsedProject, resolvedOptions, taskName } = resolvedProject;
    const deps = makeProjectDeps(parsedProject, resolvedOptions);
    gulp.task(taskName, /*help*/ false, (resolvedOptions.deps || []).concat(deps), getProjectTaskFunction(resolvedProject));
    resolvedProject.projectTaskCreated = true;
}

/**
 * @param {ResolvedProject} resolvedProject
 */
function getProjectTaskFunction(resolvedProject) {
    if (!resolvedProject.projectTask) {
        resolvedProject.projectTask = () => (resolvedProject.task || exports.defaultTask)(
            getParsedProject(resolvedProject),
            getDestPath(resolvedProject),
            getResolvedTaskConfiguration(resolvedProject.resolvedOptions));
    }
    return resolvedProject.projectTask;
}

/**
 * @param {ParsedCommandLine | undefined} parsedProject
 * @param {ResolvedProjectOptions} resolvedOptions
 */
function makeProjectDeps(parsedProject, resolvedOptions) {
    /** @type {string[]} */
    const deps = [];
    if (parsedProject && parsedProject.projectReferences) {
        for (const projectReference of parsedProject.projectReferences) {
            const projectReferenceOptions = resolveProjectOptions({
                typescript: resolvedOptions.typescript,
                deps: resolvedOptions.deps
            });
            deps.push(makeProject(projectReference.path, projectReferenceOptions, parsedProject).taskName);
        }
    }
    return deps;
}

/**
 * @param {ResolvedProject} resolvedProject
 */
function createCleanTask(resolvedProject) {
    const { parsedProject, resolvedOptions, projectName } = resolvedProject;
    const deps = makeCleanDeps(parsedProject, resolvedOptions);
    gulp.task("clean:" + projectName, /*help*/ false, deps, () => {
        let outputs = ts.getAllProjectOutputs(parsedProject);
        if (!parsedProject.options.inlineSourceMap) {
            if (parsedProject.options.sourceMap) {
                outputs = outputs.concat(outputs.filter(file => /\.jsx?$/.test(file)).map(file => file + ".map"));
            }
            if (parsedProject.options.declarationMap) {
                outputs = outputs.concat(outputs.filter(file => /\.d.ts$/.test(file)).map(file => file + ".map"));
            }
        }
        return del(outputs);
    });
    resolvedProject.cleanTaskCreated = true;
}

/**
 * @param {ParsedCommandLine} parsedProject
 * @param {ResolvedCleanOptions} resolvedOptions
 */
function makeCleanDeps(parsedProject, resolvedOptions) {
    /** @type {string[]} */
    const deps = [];
    if (parsedProject.projectReferences) {
        for (const projectReference of parsedProject.projectReferences) {
            const projectReferenceOptions = resolveCleanOptions({ typescript: resolvedOptions.typescript });
            deps.push(makeClean(projectReference.path, projectReferenceOptions, parsedProject));
        }
    }
    return deps;
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
 * @typedef {import("../../lib/typescript").ParseConfigFileHost} ParseConfigFileHost
 * @typedef {import("../../lib/typescript").FormatDiagnosticsHost} FormatDiagnosticsHost
 * @typedef {(project: ParsedCommandLine, destPath: string, options: ResolvedTaskConfiguration) => NodeJS.ReadWriteStream} Task
 * 
 * @typedef ProjectOptions
 * @property {string} [typescript] A module specifier or path (relative to gulpfile.js) to the version of TypeScript to use.
 * @property {string[]} [deps] Gulp task dependencies for all tasks created for a project.
 * @property {CompilerOptions} [compilerOptions] Default options to pass to the compiler.
 * @property {(stream: NodeJS.ReadWriteStream) => NodeJS.ReadWriteStream} [js] Pipeline hook for .js file outputs.
 * @property {(stream: NodeJS.ReadWriteStream) => NodeJS.ReadWriteStream} [dts] Pipeline hook for .d.ts file outputs.
 * @property {ProjectConfiguration} [debug] Project option overrides when building a "debug" build.
 * @property {ProjectConfiguration} [release] Project option overrides when building a "release" build.
 * @property {boolean} [verbose] Indicates whether verbose logging is enabled.
 * @property {boolean} [force] Force recompilation (no up-to-date check).
 * @property {boolean} [inProcess] Indicates whether to run gulp-typescript in-process or out-of-process (default).
 *
 * @typedef ProjectConfiguration
 * @property {CompilerOptions} [compilerOptions] Default options to pass to the compiler.
 * @property {string[]} [deps] Gulp task dependencies for all tasks created for a project.
 * @property {(stream: NodeJS.ReadWriteStream) => NodeJS.ReadWriteStream} [js] Pipeline hook for .js file outputs.
 * @property {(stream: NodeJS.ReadWriteStream) => NodeJS.ReadWriteStream} [dts] Pipeline hook for .d.ts file outputs.
 * @property {boolean} [force] Force recompilation (no up-to-date check).
 * @property {boolean} [inProcess] Indicates whether to run gulp-typescript in-process or out-of-process (default).
 *
 * @typedef ResolvedProjectOptions
 * @property {string} typescript A module specifier or path (relative to gulpfile.js) to the version of TypeScript to use.
 * @property {CompilerOptions} compilerOptions Default options to pass to the compiler.
 * @property {string[] | undefined} deps Gulp task dependencies for all tasks created for a project.
 * @property {(stream: NodeJS.ReadWriteStream) => NodeJS.ReadWriteStream | undefined} js Pipeline hook for .js file outputs.
 * @property {(stream: NodeJS.ReadWriteStream) => NodeJS.ReadWriteStream | undefined} dts Pipeline hook for .d.ts file outputs.
 * @property {ResolvedProjectConfiguration} debug Project option overrides when building a "debug" build.
 * @property {ResolvedProjectConfiguration} release Project option overrides when building a "release" build.
 * @property {boolean} verbose Indicates whether verbose logging is enabled.
 * @property {boolean} force Force recompilation (no up-to-date check).
 * @property {boolean} inProcess Indicates whether to run gulp-typescript in-process or out-of-process (default).
 * @property {boolean} defer Defer loading the project until later (not supported for projects with project references).
 *
 * @typedef ResolvedProjectConfiguration
 * @property {CompilerOptions} compilerOptions Project configuration overrides to pass to the compiler.
 * @property {string[] | undefined} deps Gulp task dependencies for all tasks created for a project.
 * @property {(stream: NodeJS.ReadWriteStream) => NodeJS.ReadWriteStream | undefined} js Pipeline hook for .js file outputs.
 * @property {(stream: NodeJS.ReadWriteStream) => NodeJS.ReadWriteStream | undefined} dts Pipeline hook for .d.ts file outputs.
 * @property {boolean | undefined} force Force recompilation (no up-to-date check).
 * @property {boolean | undefined} inProcess Indicates whether to run gulp-typescript in-process or out-of-process (default).
 *
 * @typedef ResolvedTaskConfiguration
 * @property {string} typescript
 * @property {CompilerOptions} compilerOptions Project configuration overrides to pass to the compiler.
 * @property {string[] | undefined} deps Gulp task dependencies for all tasks created for a project.
 * @property {(stream: NodeJS.ReadWriteStream) => NodeJS.ReadWriteStream | undefined} js Pipeline hook for .js file outputs.
 * @property {(stream: NodeJS.ReadWriteStream) => NodeJS.ReadWriteStream | undefined} dts Pipeline hook for .d.ts file outputs.
 * @property {boolean} verbose Indicates whether verbose logging is enabled.
 * @property {boolean} force Force recompilation (no up-to-date check).
 * @property {boolean} inProcess Indicates whether to run gulp-typescript in-process or out-of-process (default).
 *
 * @typedef ResolvedProject
 * @property {string} resolvedProjectSpec
 * @property {string} projectName
 * @property {string} taskName
 * @property {ParsedCommandLine | undefined} parsedProject
 * @property {string | undefined} destPath
 * @property {ResolvedProjectOptions} resolvedOptions
 * @property {Task | undefined} task
 * @property {(() => NodeJS.ReadWriteStream) | undefined} projectTask
 * @property {boolean} projectTaskCreated
 * @property {boolean} cleanTaskCreated
 * 
 * @typedef CleanOptions
 * @property {string} [typescript] A module specifier or path (relative to gulpfile.js) to the version of TypeScript to use.
 * 
 * @typedef ResolvedCleanOptions
 * @property {string | undefined} typescript A module specifier or path (relative to gulpfile.js) to the version of TypeScript to use.
 * 
 * @typedef FlattenOptions
 * @property {CompilerOptions} [compilerOptions]
 * @property {string} [base]
 * @property {boolean} [force]
 */
void 0;

