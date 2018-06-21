// @ts-check
const path = require("path");
const log = require("fancy-log"); // was `require("gulp-util").log (see https://github.com/gulpjs/gulp-util)
const ts = require("../../lib/typescript");
const { Duplex } = require("stream");
const chalk = require("./chalk");
const Vinyl = require("vinyl");

/**
 * Creates a stream that passes through its inputs only if the project outputs are not up to date
 * with respect to the inputs. 
 * @param {ParsedCommandLine} parsedProject
 * @param {{verbose?: boolean}} [options]
 */
function upToDate(parsedProject, options) {
    /** @type {File[]} */
    const inputs = [];
    /** @type {Map<string, File>} */
    const inputMap = new Map();
    /** @type {UpToDateHost} */
    const upToDateHost = {
        fileExists(fileName) {
            return inputMap.has(path.resolve(fileName));
        },
        getModifiedTime(fileName) {
            return inputMap.get(path.resolve(fileName)).stat.mtime;
        }
    };
    const duplex = new Duplex({
        objectMode: true,
        /**
         * @param {string|Buffer|File} file 
         */
        write(file, _, cb) {
            if (Vinyl.isVinyl(file)) {
                inputs.push(file);
                inputMap.set(file.path, file);
            }
            cb();
        },
        final(cb) {
            const status = ts.getUpToDateStatus(upToDateHost, parsedProject);
            reportStatus(parsedProject, status, options);
            if (status.type !== ts.UpToDateStatusType.UpToDate) {
                for (const input of inputs) duplex.push(input);
            }
            duplex.push(null);
            cb();
        },
        read() {
        }
    });
    return duplex;
}
module.exports = exports = upToDate;

/**
 * 
 * @param {DiagnosticMessage} message 
 * @param {...string} args 
 */
function formatMessage(message, ...args) {
    log.info(formatStringFromArgs(message.message, args));
}

/**
 * @param {ParsedCommandLine} project
 * @param {UpToDateStatus} status
 * @param {{verbose?: boolean}} options
 */
function reportStatus(project, status, options) {
    if (!options.verbose) return;
    ts.formatUpToDateStatus(project.options.configFilePath, status, fileName, formatMessage);
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

/**
 * @typedef {import("vinyl")} File
 * @typedef {import("../../lib/typescript").ParsedCommandLine & { options: CompilerOptions }} ParsedCommandLine
 * @typedef {import("../../lib/typescript").CompilerOptions & { configFilePath?: string }} CompilerOptions
 * @typedef {import("../../lib/typescript").UpToDateHost} UpToDateHost
 * @typedef {import("../../lib/typescript").UpToDateStatus} UpToDateStatus
 * @typedef {import("../../lib/typescript").DiagnosticMessage} DiagnosticMessage
 */
void 0;