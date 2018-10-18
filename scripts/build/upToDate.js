// @ts-check
const path = require("path");
const fs = require("fs");
const log = require("fancy-log"); // was `require("gulp-util").log (see https://github.com/gulpjs/gulp-util)
const ts = require("../../lib/typescript");
const { Duplex } = require("stream");
const chalk = /**@type {*} */(require("chalk"));
const Vinyl = require("vinyl");

/**
 * Creates a stream that passes through its inputs only if the project outputs are not up to date
 * with respect to the inputs. 
 * @param {ParsedCommandLine} parsedProject
 * @param {UpToDateOptions} [options]
 * 
 * @typedef UpToDateOptions
 * @property {boolean | "minimal"} [verbose]
 * @property {(configFilePath: string) => ParsedCommandLine | undefined} [parseProject]
 */
function upToDate(parsedProject, options) {
    /** @type {File[]} */
    const inputs = [];
    /** @type {Map<string, File>} */
    const inputMap = new Map();
    /** @type {Map<string, fs.Stats>} */
    const statCache = new Map();
    /** @type {UpToDateHost} */
    const upToDateHost = {
        fileExists(fileName) {
            const stats = getStat(fileName);
            return stats ? stats.isFile() : false;
        },
        getModifiedTime(fileName) {
            return getStat(fileName).mtime;
        },
        parseConfigFile: options && options.parseProject
    };
    const duplex = new Duplex({
        objectMode: true,
        /**
         * @param {string|Buffer|File} file 
         */
        write(file, _, cb) {
            if (typeof file === "string" || Buffer.isBuffer(file)) return cb(new Error("Only Vinyl files are supported."));
            inputs.push(file);
            inputMap.set(path.resolve(file.path), file);
            cb();
        },
        final(cb) {
            const status = getUpToDateStatus(upToDateHost, parsedProject);
            reportStatus(parsedProject, status, options);
            if (status.type !== UpToDateStatusType.UpToDate) {
                for (const input of inputs) duplex.push(input);
            }
            duplex.push(null);
            inputMap.clear();
            statCache.clear();
            cb();
        },
        read() {
        }
    });
    return duplex;

    function getStat(fileName) {
        fileName = path.resolve(fileName);
        const inputFile = inputMap.get(fileName);
        if (inputFile && inputFile.stat) return inputFile.stat;
        
        let stats = statCache.get(fileName);
        if (!stats && fs.existsSync(fileName)) {
            stats = fs.statSync(fileName);
            statCache.set(fileName, stats);
        }
        return stats;
    }
}
module.exports = exports = upToDate;

/**
 * @param {DiagnosticMessage} message 
 * @param {...string} args 
 */
function formatMessage(message, ...args) {
    log.info(formatStringFromArgs(message.message, args));
}

/**
 * @param {ParsedCommandLine} project
 * @param {UpToDateStatus} status
 * @param {{verbose?: boolean | "minimal"}} options
 */
function reportStatus(project, status, options) {
    switch (options.verbose) {
        case "minimal":
            switch (status.type) {
                case UpToDateStatusType.UpToDate:
                    log.info(`Project '${fileName(project.options.configFilePath)}' is up to date.`);
                    break;
                default:
                    log.info(`Project '${fileName(project.options.configFilePath)}' is out of date, rebuilding...`);
                    break;
            }
            break;
        case true:
            /**@type {*}*/(ts).formatUpToDateStatus(project.options.configFilePath, status, fileName, formatMessage);
            break;
    }
    if (!options.verbose) return;
}

/**
 * @param {string} file
 * @private
 */
function normalizeSlashes(file) {
    return file.replace(/\\/g, "/");
}

/**
 * @param {string} file
 * @private
 */
function fileName(file) {
    return chalk.cyan(normalizeSlashes(path.relative(process.cwd(), path.resolve(file))));
}

/**
 * @param {string} text
 * @param {string[]} args
 * @param {number} [baseIndex]
 */
function formatStringFromArgs(text, args, baseIndex = 0) {
    return text.replace(/{(\d+)}/g, (_match, index) => args[+index + baseIndex]);
}

const minimumDate = new Date(-8640000000000000);
const maximumDate = new Date(8640000000000000);
const missingFileModifiedTime = new Date(0);

/** 
 * @typedef {0} UpToDateStatusType.Unbuildable
 * @typedef {1} UpToDateStatusType.UpToDate
 * @typedef {2} UpToDateStatusType.UpToDateWithUpstreamTypes
 * @typedef {3} UpToDateStatusType.OutputMissing
 * @typedef {4} UpToDateStatusType.OutOfDateWithSelf
 * @typedef {5} UpToDateStatusType.OutOfDateWithUpstream
 * @typedef {6} UpToDateStatusType.UpstreamOutOfDate
 * @typedef {7} UpToDateStatusType.UpstreamBlocked
 * @typedef {8} UpToDateStatusType.ComputingUpstream
 * @typedef {9} UpToDateStatusType.ContainerOnly
 * @enum {UpToDateStatusType.Unbuildable | UpToDateStatusType.UpToDate | UpToDateStatusType.UpToDateWithUpstreamTypes | UpToDateStatusType.OutputMissing | UpToDateStatusType.OutOfDateWithSelf | UpToDateStatusType.OutOfDateWithUpstream | UpToDateStatusType.UpstreamOutOfDate | UpToDateStatusType.UpstreamBlocked | UpToDateStatusType.ComputingUpstream | UpToDateStatusType.ContainerOnly}
 */
const UpToDateStatusType = {
    Unbuildable: /** @type {0} */(0),
    UpToDate: /** @type {1} */(1),
    UpToDateWithUpstreamTypes: /** @type {2} */(2),
    OutputMissing: /** @type {3} */(3),
    OutOfDateWithSelf: /** @type {4} */(4),
    OutOfDateWithUpstream: /** @type {5} */(5),
    UpstreamOutOfDate: /** @type {6} */(6),
    UpstreamBlocked: /** @type {7} */(7),
    ComputingUpstream: /** @type {8} */(8),
    ContainerOnly: /** @type {9} */(9),
};

/**
 * @param {Date} date1 
 * @param {Date} date2 
 * @returns {Date}
 */
function newer(date1, date2) {
    return date2 > date1 ? date2 : date1;
}

/**
 * @param {UpToDateHost} host 
 * @param {ParsedCommandLine | undefined} project
 * @returns {UpToDateStatus}
 */
function getUpToDateStatus(host, project) {
    if (project === undefined) return { type: UpToDateStatusType.Unbuildable, reason: "File deleted mid-build" };
    const prior = host.getLastStatus ? host.getLastStatus(project.options.configFilePath) : undefined;
    if (prior !== undefined) {
        return prior;
    }
    const actual = getUpToDateStatusWorker(host, project);
    if (host.setLastStatus) {
        host.setLastStatus(project.options.configFilePath, actual);
    }
    return actual;
}

/**
 * @param {UpToDateHost} host 
 * @param {ParsedCommandLine | undefined} project
 * @returns {UpToDateStatus}
 */
function getUpToDateStatusWorker(host, project) {
    /** @type {string} */
    let newestInputFileName = undefined;
    let newestInputFileTime = minimumDate;
    // Get timestamps of input files
    for (const inputFile of project.fileNames) {
        if (!host.fileExists(inputFile)) {
            return {
                type: UpToDateStatusType.Unbuildable,
                reason: `${inputFile} does not exist`
            };
        }

        const inputTime = host.getModifiedTime(inputFile) || missingFileModifiedTime;
        if (inputTime > newestInputFileTime) {
            newestInputFileName = inputFile;
            newestInputFileTime = inputTime;
        }
    }

    // Collect the expected outputs of this project
    const outputs = /**@type {string[]}*/(/**@type {*}*/(ts).getAllProjectOutputs(project));

    if (outputs.length === 0) {
        return {
            type: UpToDateStatusType.ContainerOnly
        };
    }

    // Now see if all outputs are newer than the newest input
    let oldestOutputFileName = "(none)";
    let oldestOutputFileTime = maximumDate;
    let newestOutputFileName = "(none)";
    let newestOutputFileTime = minimumDate;
    /** @type {string | undefined} */
    let missingOutputFileName;
    let newestDeclarationFileContentChangedTime = minimumDate;
    let isOutOfDateWithInputs = false;
    for (const output of outputs) {
        // Output is missing; can stop checking
        // Don't immediately return because we can still be upstream-blocked, which is a higher-priority status
        if (!host.fileExists(output)) {
            missingOutputFileName = output;
            break;
        }

        const outputTime = host.getModifiedTime(output) || missingFileModifiedTime;
        if (outputTime < oldestOutputFileTime) {
            oldestOutputFileTime = outputTime;
            oldestOutputFileName = output;
        }

        // If an output is older than the newest input, we can stop checking
        // Don't immediately return because we can still be upstream-blocked, which is a higher-priority status
        if (outputTime < newestInputFileTime) {
            isOutOfDateWithInputs = true;
            break;
        }

        if (outputTime > newestOutputFileTime) {
            newestOutputFileTime = outputTime;
            newestOutputFileName = output;
        }

        // Keep track of when the most recent time a .d.ts file was changed.
        // In addition to file timestamps, we also keep track of when a .d.ts file
        // had its file touched but not had its contents changed - this allows us
        // to skip a downstream typecheck
        if (path.extname(output) === ".d.ts") {
            const unchangedTime = host.getUnchangedTime ? host.getUnchangedTime(output) : undefined;
            if (unchangedTime !== undefined) {
                newestDeclarationFileContentChangedTime = newer(unchangedTime, newestDeclarationFileContentChangedTime);
            }
            else {
                const outputModifiedTime = host.getModifiedTime(output) || missingFileModifiedTime;
                newestDeclarationFileContentChangedTime = newer(newestDeclarationFileContentChangedTime, outputModifiedTime);
            }
        }
    }

    let pseudoUpToDate = false;
    let usesPrepend = false;
    /** @type {string | undefined} */
    let upstreamChangedProject;
    if (project.projectReferences) {
        if (host.setLastStatus) host.setLastStatus(project.options.configFilePath, { type: UpToDateStatusType.ComputingUpstream });
        for (const ref of project.projectReferences) {
            usesPrepend = usesPrepend || !!(ref.prepend);
            const resolvedRef = ts.resolveProjectReferencePath(host, ref);
            const parsedRef = host.parseConfigFile ? host.parseConfigFile(resolvedRef) : ts.getParsedCommandLineOfConfigFile(resolvedRef, {}, parseConfigHost);
            const refStatus = getUpToDateStatus(host, parsedRef);

            // Its a circular reference ignore the status of this project
            if (refStatus.type === UpToDateStatusType.ComputingUpstream) {
                continue;
            }

            // An upstream project is blocked
            if (refStatus.type === UpToDateStatusType.Unbuildable) {
                return {
                    type: UpToDateStatusType.UpstreamBlocked,
                    upstreamProjectName: ref.path
                };
            }

            // If the upstream project is out of date, then so are we (someone shouldn't have asked, though?)
            if (refStatus.type !== UpToDateStatusType.UpToDate) {
                return {
                    type: UpToDateStatusType.UpstreamOutOfDate,
                    upstreamProjectName: ref.path
                };
            }

            // If the upstream project's newest file is older than our oldest output, we
            // can't be out of date because of it
            if (refStatus.newestInputFileTime && refStatus.newestInputFileTime <= oldestOutputFileTime) {
                continue;
            }

            // If the upstream project has only change .d.ts files, and we've built
            // *after* those files, then we're "psuedo up to date" and eligible for a fast rebuild
            if (refStatus.newestDeclarationFileContentChangedTime && refStatus.newestDeclarationFileContentChangedTime <= oldestOutputFileTime) {
                pseudoUpToDate = true;
                upstreamChangedProject = ref.path;
                continue;
            }

            // We have an output older than an upstream output - we are out of date
            return {
                type: UpToDateStatusType.OutOfDateWithUpstream,
                outOfDateOutputFileName: oldestOutputFileName,
                newerProjectName: ref.path
            };
        }
    }

    if (missingOutputFileName !== undefined) {
        return {
            type: UpToDateStatusType.OutputMissing,
            missingOutputFileName
        };
    }

    if (isOutOfDateWithInputs) {
        return {
            type: UpToDateStatusType.OutOfDateWithSelf,
            outOfDateOutputFileName: oldestOutputFileName,
            newerInputFileName: newestInputFileName
        };
    }

    if (usesPrepend && pseudoUpToDate) {
        return {
            type: UpToDateStatusType.OutOfDateWithUpstream,
            outOfDateOutputFileName: oldestOutputFileName,
            newerProjectName: upstreamChangedProject
        };
    }

    // Up to date
    return {
        type: pseudoUpToDate ? UpToDateStatusType.UpToDateWithUpstreamTypes : UpToDateStatusType.UpToDate,
        newestDeclarationFileContentChangedTime,
        newestInputFileTime,
        newestOutputFileTime,
        newestInputFileName,
        newestOutputFileName,
        oldestOutputFileName
    };
}

const parseConfigHost = {
    useCaseSensitiveFileNames: true,
    getCurrentDirectory: () => process.cwd(),
    readDirectory: (file) => fs.readdirSync(file),
    fileExists: file => fs.existsSync(file) && fs.statSync(file).isFile(),
    readFile: file => fs.readFileSync(file, "utf8"),
    onUnRecoverableConfigFileDiagnostic: () => undefined
};

/**
 * @typedef {import("vinyl")} File
 * @typedef {import("../../lib/typescript").ParsedCommandLine & { options: CompilerOptions }} ParsedCommandLine
 * @typedef {import("../../lib/typescript").CompilerOptions & { configFilePath?: string }} CompilerOptions
 * @typedef {import("../../lib/typescript").DiagnosticMessage} DiagnosticMessage
 * @typedef UpToDateHost
 * @property {(fileName: string) => boolean} fileExists
 * @property {(fileName: string) => Date} getModifiedTime
 * @property {(fileName: string) => Date} [getUnchangedTime]
 * @property {(configFilePath: string) => ParsedCommandLine | undefined} parseConfigFile
 * @property {(configFilePath: string) => UpToDateStatus} [getLastStatus]
 * @property {(configFilePath: string, status: UpToDateStatus) => void} [setLastStatus]
 * 
 * @typedef Status.Unbuildable
 * @property {UpToDateStatusType.Unbuildable} type
 * @property {string} reason
 * 
 * @typedef Status.ContainerOnly
 * @property {UpToDateStatusType.ContainerOnly} type
 * 
 * @typedef Status.UpToDate
 * @property {UpToDateStatusType.UpToDate | UpToDateStatusType.UpToDateWithUpstreamTypes} type
 * @property {Date} [newestInputFileTime]
 * @property {string} [newestInputFileName]
 * @property {Date} [newestDeclarationFileContentChangedTime]
 * @property {Date} [newestOutputFileTime]
 * @property {string} [newestOutputFileName]
 * @property {string} [oldestOutputFileName]
 * 
 * @typedef Status.OutputMissing
 * @property {UpToDateStatusType.OutputMissing} type
 * @property {string} missingOutputFileName
 * 
 * @typedef Status.OutOfDateWithSelf
 * @property {UpToDateStatusType.OutOfDateWithSelf} type
 * @property {string} outOfDateOutputFileName
 * @property {string} newerInputFileName
 * 
 * @typedef Status.UpstreamOutOfDate
 * @property {UpToDateStatusType.UpstreamOutOfDate} type
 * @property {string} upstreamProjectName
 * 
 * @typedef Status.UpstreamBlocked
 * @property {UpToDateStatusType.UpstreamBlocked} type
 * @property {string} upstreamProjectName
 * 
 * @typedef Status.ComputingUpstream
 * @property {UpToDateStatusType.ComputingUpstream} type
 * 
 * @typedef Status.OutOfDateWithUpstream
 * @property {UpToDateStatusType.OutOfDateWithUpstream} type
 * @property {string} outOfDateOutputFileName
 * @property {string} newerProjectName

 * @typedef {Status.Unbuildable | Status.ContainerOnly | Status.UpToDate | Status.OutputMissing | Status.OutOfDateWithSelf | Status.UpstreamOutOfDate | Status.UpstreamBlocked | Status.ComputingUpstream | Status.OutOfDateWithUpstream} UpToDateStatus
 */
void 0;