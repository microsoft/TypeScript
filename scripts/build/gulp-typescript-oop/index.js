// @ts-check
const path = require("path");
const child_process = require("child_process");
const tsc = require("gulp-typescript");
const Vinyl = require("vinyl");
const { Duplex, Readable } = require("stream");
const protocol = require("./protocol");

/**
 * @param {string | undefined} tsConfigFileName
 * @param {tsc.Settings} settings
 * @param {CreateProjectOptions} options
 *
 * @typedef CreateProjectOptions
 * @property {string} [typescript]
 * @property {boolean} [parse]
 */
function createProject(tsConfigFileName, settings, options) {
    settings = Object.assign({}, settings);
    options = Object.assign({}, options);
    if (settings.typescript) throw new Error();

    const localSettings = Object.assign({}, settings);
    if (options.typescript) {
        options.typescript = path.resolve(options.typescript);
        localSettings.typescript = require(options.typescript);
    }

    const project = tsConfigFileName === undefined ? tsc.createProject(localSettings) : tsc.createProject(tsConfigFileName, localSettings);
    const wrappedProject = /** @type {tsc.Project} */((reporter = tsc.reporter.defaultReporter()) => {
        const ts = project.typescript;
        const proc = child_process.fork(require.resolve("./worker.js"), [], {
            // Prevent errors when debugging gulpfile due to the same debug port being passed to forked children.
            execArgv: []
        });
        /** @type {Map<string, import("vinyl")>} */
        const inputs = new Map();
        /** @type {Map<string, *>} */
        const sourceFiles = new Map();
        /** @type {protocol.SourceFileHost & protocol.VinylHost} */
        const host = {
            getVinyl(path) { return inputs.get(path); },
            getSourceFile(fileName) { return sourceFiles.get(fileName); },
            createSourceFile(fileName, text, languageVersion) {
                if (text === undefined) throw new Error("File not cached.");
                /** @type {protocol.SourceFile} */
                let file;
                if (options.parse) {
                    file = ts.createSourceFile(fileName, text, languageVersion, /*setParentNodes*/ true);
                }
                else {
                    // NOTE: the built-in reporters in gulp-typescript don't actually need a full
                    // source file, so save time by faking one unless requested.
                    file = /**@type {protocol.SourceFile}*/({
                        pos: 0,
                        end: text.length,
                        kind: ts.SyntaxKind.SourceFile,
                        fileName,
                        text,
                        languageVersion,
                        statements: /**@type {*} */([]),
                        endOfFileToken: { pos: text.length, end: text.length, kind: ts.SyntaxKind.EndOfFileToken },
                        amdDependencies: /**@type {*} */([]),
                        referencedFiles: /**@type {*} */([]),
                        typeReferenceDirectives: /**@type {*} */([]),
                        libReferenceDirectives: /**@type {*} */([]),
                        languageVariant: ts.LanguageVariant.Standard,
                        isDeclarationFile: /\.d\.ts$/.test(fileName),
                        hasNoDefaultLib: /[\\/]lib\.[^\\/]+\.d\.ts$/.test(fileName)
                    });
                }
                sourceFiles.set(fileName, file);
                return file;
            }
        };
        /** @type {Duplex & { js?: Readable, dts?: Readable }} */
        const compileStream = new Duplex({
            objectMode: true,
            read() {},
            /** @param {*} file */
            write(file, _encoding, callback) {
                inputs.set(file.path, file);
                proc.send(protocol.message.write(file));
                callback();
            },
            final(callback) {
                proc.send(protocol.message.final());
                callback();
            }
        });
        const jsStream = compileStream.js = new Readable({
            objectMode: true,
            read() {}
        });
        const dtsStream = compileStream.dts = new Readable({
            objectMode: true,
            read() {}
        });
        proc.send(protocol.message.createProject(tsConfigFileName, settings, options));
        proc.on("message", (/**@type {protocol.WorkerMessage}*/ message) => {
            switch (message.method) {
                case "write": {
                    const file = protocol.vinylFromJson(message.params);
                    compileStream.push(file);
                    if (file.path.endsWith(".d.ts")) {
                        dtsStream.push(file);
                    }
                    else {
                        jsStream.push(file);
                    }
                    break;
                }
                case "final": {
                    compileStream.push(null);
                    jsStream.push(null);
                    dtsStream.push(null);
                    proc.kill(); // TODO(rbuckton): pool workers? may not be feasible due to gulp-typescript holding onto memory
                    break;
                }
                case "error": {
                    const error = protocol.errorFromJson(message.params);
                    compileStream.emit("error", error);
                    proc.kill(); // TODO(rbuckton): pool workers? may not be feasible due to gulp-typescript holding onto memory
                    break;
                }
                case "reporter.error": {
                    if (reporter.error) {
                        const error = protocol.typeScriptErrorFromJson(message.params, host);
                        reporter.error(error, project.typescript);
                    }
                    break;
                }
                case "reporter.finish": {
                    if (reporter.finish) {
                        reporter.finish(message.params);
                    }
                }
            }
        });
        return /** @type {*} */(compileStream);
    });
    return Object.assign(wrappedProject, project);
}

exports.createProject = createProject;