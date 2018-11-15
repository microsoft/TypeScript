// @ts-check
const Vinyl = require("vinyl");

/**
 * @param {File} file
 * @returns {*}
 */
function vinylToJson(file) {
    if (file.isStream()) throw new TypeError("Streams not supported.");
    return {
        path: file.path,
        cwd: file.cwd,
        base: file.base,
        contents: file.isBuffer() ? file.contents.toString("utf8") : undefined,
        sourceMap: file.sourceMap
    };
}
exports.vinylToJson = vinylToJson;

/**
 * @param {*} json
 * @returns {File}
 */
function vinylFromJson(json) {
    return new Vinyl({
        path: json.path,
        cwd: json.cwd,
        base: json.base,
        contents: typeof json.contents === "string" ? Buffer.from(json.contents, "utf8") : undefined,
        sourceMap: json.sourceMap
    });
}
exports.vinylFromJson = vinylFromJson;

/**
 * @param {Error} error
 * @returns {*}
 */
function errorToJson(error) {
    return {
        name: error.name,
        message: error.message,
        stack: error.stack
    };
}
exports.errorToJson = errorToJson;

/**
 * @param {*} json
 * @returns {Error}
 */
function errorFromJson(json) {
    const error = new Error();
    error.name = json.name;
    error.message = json.message;
    error.stack = json.stack;
    return error;
}
exports.errorFromJson = errorFromJson;

/**
 * @param {TypeScriptError} error
 * @returns {*}
 */
function typeScriptErrorToJson(error) {
    return Object.assign({}, errorToJson(error), {
        fullFilename: error.fullFilename,
        relativeFilename: error.relativeFilename,
        file: error.file && { path: error.file.path },
        tsFile: error.tsFile && sourceFileToJson(error.tsFile),
        diagnostic: diagnosticToJson(error.diagnostic),
        startPosition: error.startPosition,
        endPosition: error.endPosition
    });
}
exports.typeScriptErrorToJson = typeScriptErrorToJson;

/**
 * @param {*} json
 * @param {SourceFileHost & VinylHost} host
 * @returns {TypeScriptError}
 */
function typeScriptErrorFromJson(json, host) {
    const error = /**@type {TypeScriptError}*/(errorFromJson(json));
    error.fullFilename = json.fullFilename;
    error.relativeFilename = json.relativeFilename;
    error.file = json.file && host.getVinyl(json.file.path);
    error.tsFile = json.tsFile && sourceFileFromJson(json.tsFile, host);
    error.diagnostic = diagnosticFromJson(json.diagnostic, host);
    error.startPosition = json.startPosition;
    error.endPosition = json.endPosition;
    return error;
}
exports.typeScriptErrorFromJson = typeScriptErrorFromJson;

/**
 * @param {SourceFile} file
 * @returns {*}
 */
function sourceFileToJson(file) {
    return {
        fileName: file.fileName,
        text: file.text,
        languageVersion: file.languageVersion
    };
}
exports.sourceFileToJson = sourceFileToJson;

/**
 * @param {*} json
 * @param {SourceFileHost} host
 */
function sourceFileFromJson(json, host) {
    return host.getSourceFile(json.fileName)
        || host.createSourceFile(json.fileName, json.text, json.languageVersion);
}
exports.sourceFileFromJson = sourceFileFromJson;

/**
 * @param {Diagnostic} diagnostic
 * @returns {*}
 */
function diagnosticToJson(diagnostic) {
    return Object.assign({}, diagnosticRelatedInformationToJson(diagnostic), {
        category: diagnostic.category,
        code: diagnostic.code,
        source: diagnostic.source,
        relatedInformation: diagnostic.relatedInformation && diagnostic.relatedInformation.map(diagnosticRelatedInformationToJson)
    });
}
exports.diagnosticToJson = diagnosticToJson;

/**
 * @param {*} json
 * @param {SourceFileHost} host
 * @returns {Diagnostic}
 */
function diagnosticFromJson(json, host) {
    return Object.assign({}, diagnosticRelatedInformationFromJson(json, host), {
        category: json.category,
        code: json.code,
        source: json.source,
        relatedInformation: json.relatedInformation && json.relatedInformation.map(json => diagnosticRelatedInformationFromJson(json, host))
    });
}
exports.diagnosticFromJson = diagnosticFromJson;

/**
 * @param {DiagnosticRelatedInformation} diagnostic
 * @returns {*}
 */
function diagnosticRelatedInformationToJson(diagnostic) {
    return {
        file: diagnostic.file && { fileName: diagnostic.file.fileName },
        start: diagnostic.start,
        length: diagnostic.length,
        messageText: diagnostic.messageText
    };
}
exports.diagnosticRelatedInformationToJson = diagnosticRelatedInformationToJson;

/**
 * @param {*} json
 * @param {SourceFileHost} host
 * @returns {DiagnosticRelatedInformation}
 */
function diagnosticRelatedInformationFromJson(json, host) {
    return {
        file: json.file && sourceFileFromJson(json.file, host),
        start: json.start,
        length: json.length,
        messageText: json.messageText,
        category: json.category,
        code: json.code
    };
}
exports.diagnosticRelatedInformationFromJson = diagnosticRelatedInformationFromJson;

exports.message = {};

/**
 * @param {string | undefined} tsConfigFileName
 * @param {import("gulp-typescript").Settings} settings
 * @param {Object} options
 * @param {string} [options.typescript]
 * @returns {CreateProjectMessage}
 *
 * @typedef CreateProjectMessage
 * @property {"createProject"} method
 * @property {CreateProjectParams} params
 *
 * @typedef CreateProjectParams
 * @property {string | undefined} tsConfigFileName
 * @property {import("gulp-typescript").Settings} settings
 * @property {CreateProjectOptions} options
 *
 * @typedef CreateProjectOptions
 * @property {string} [typescript]
 */
exports.message.createProject = function(tsConfigFileName, settings, options) {
    return { method: "createProject", params: { tsConfigFileName, settings, options } };
};

/**
 * @param {File} file
 * @returns {WriteMessage}
 *
 * @typedef WriteMessage
 * @property {"write"} method
 * @property {*} params
 */
exports.message.write = function(file) {
    return { method: "write", params: vinylToJson(file) };
};

/**
 * @returns {FinalMessage}
 *
 * @typedef FinalMessage
 * @property {"final"} method
 */
exports.message.final = function() {
    return { method: "final" };
};

/**
 * @param {Error} error
 * @returns {ErrorMessage}
 *
 * @typedef ErrorMessage
 * @property {"error"} method
 * @property {*} params
 */
exports.message.error = function(error) {
    return { method: "error", params: errorToJson(error) };
};

exports.message.reporter = {};

/**
 * @param {TypeScriptError} error
 * @returns {reporter.ErrorMessage}
 *
 * @typedef reporter.ErrorMessage
 * @property {"reporter.error"} method
 * @property {*} params
 */
exports.message.reporter.error = function(error) {
    return { method: "reporter.error", params: typeScriptErrorToJson(error) };
};

/**
 * @param {*} results
 * @returns {reporter.FinishMessage}
 *
 * @typedef reporter.FinishMessage
 * @property {"reporter.finish"} method
 * @property {*} params
 */
exports.message.reporter.finish = function(results) {
    return { method: "reporter.finish", params: results };
};

/**
 * @typedef {import("vinyl")} File
 * @typedef {typeof import("typescript")} TypeScriptModule
 * @typedef {import("typescript").SourceFile} SourceFile
 * @typedef {import("typescript").Diagnostic} Diagnostic
 * @typedef {import("typescript").DiagnosticRelatedInformation} DiagnosticRelatedInformation
 * @typedef {import("gulp-typescript").reporter.TypeScriptError} TypeScriptError
 * @typedef {WriteMessage | FinalMessage | CreateProjectMessage} HostMessage
 * @typedef {WriteMessage | FinalMessage | ErrorMessage | reporter.ErrorMessage | reporter.FinishMessage} WorkerMessage
 *
 * @typedef SourceFileHost
 * @property {(fileName: string) => SourceFile | undefined} getSourceFile
 * @property {(fileName: string, text: string, languageVersion: number) => SourceFile} createSourceFile
 *
 * @typedef VinylHost
 * @property {(path: string) => File | undefined} getVinyl
 */
void 0;