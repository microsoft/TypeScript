/// <reference types="node" />
// tslint:disable:no-null-keyword

import minimist = require("minimist");
import http = require("http");
import fs = require("fs");
import path = require("path");
import url = require("url");
import URL = url.URL;
import child_process = require("child_process");
import os = require("os");
import crypto = require("crypto");
import { Readable, Writable } from "stream";
import { isBuffer, isString, isObject } from "util";
import { install, getErrorSource } from "source-map-support";

install();

const port = 8888; // harness.ts and webTestResults.html depend on this exact port number.
const baseUrl = new URL(`http://localhost:${port}/`);
const rootDir = path.dirname(__dirname);
const useCaseSensitiveFileNames = isFileSystemCaseSensitive();

const defaultBrowser = os.platform() === "win32" ? "edge" : "chrome";
let browser: "edge" | "chrome" | "none" = defaultBrowser;
let grep: string | undefined;
let verbose = false;

interface FileBasedTest {
    file: string;
    configurations?: FileBasedTestConfiguration[];
}

interface FileBasedTestConfiguration {
    [setting: string]: string;
}

function isFileSystemCaseSensitive(): boolean {
    // win32\win64 are case insensitive platforms
    const platform = os.platform();
    if (platform === "win32" || <string>platform === "win64") {
        return false;
    }
    // If this file exists under a different case, we must be case-insensitve.
    return !fs.existsSync(swapCase(__filename));
}

function swapCase(s: string): string {
    return s.replace(/\w/g, (ch) => {
        const up = ch.toUpperCase();
        return ch === up ? ch.toLowerCase() : up;
    });
}

function hasLeadingSeparator(pathname: string) {
    const ch = pathname.charAt(0);
    return ch === "/" || ch === "\\";
}

function ensureLeadingSeparator(pathname: string) {
    return hasLeadingSeparator(pathname) ? pathname : "/" + pathname;
}

function trimLeadingSeparator(pathname: string) {
    return hasLeadingSeparator(pathname) ? pathname.slice(1) : pathname;
}

function normalizeSlashes(path: string) {
    return path.replace(/\\+/g, "/");
}

function hasTrailingSeparator(pathname: string) {
    const ch = pathname.charAt(pathname.length - 1);
    return ch === "/" || ch === "\\";
}

function toServerPath(url: url.URL | string) {
    if (typeof url === "string") url = new URL(url, baseUrl);
    const pathname = decodeURIComponent(url.pathname);
    return path.join(rootDir, pathname);
}

function toClientPath(pathname: string) {
    pathname = normalizeSlashes(pathname);
    pathname = trimLeadingSeparator(pathname);

    const serverPath = path.resolve(rootDir, pathname);
    if (serverPath.slice(0, rootDir.length) !== rootDir) {
        return undefined;
    }

    let clientPath = serverPath.slice(rootDir.length);
    clientPath = ensureLeadingSeparator(clientPath);
    clientPath = normalizeSlashes(clientPath);
    return clientPath;
}

function flatMap<T, U>(array: T[], selector: (value: T) => U | U[]) {
    let result: U[] = [];
    for (const item of array) {
        const mapped = selector(item);
        if (Array.isArray(mapped)) {
            result = result.concat(mapped);
        }
        else {
            result.push(mapped);
        }
    }
    return result;
}

declare module "http" {
    interface IncomingHttpHeaders {
        "if-match"?: string;
        "if-none-match"?: string;
        "if-modified-since"?: string;
        "if-unmodified-since"?: string;
        "accept-charset"?: string;
        "accept-encoding"?: string;
        "range"?: string;
    }
}

function getQuality<T extends { quality?: number }>(value: T) {
    return value.quality === undefined ? 1 : value.quality;
}

function bestMatch<T, TPattern extends { quality?: number }>(value: T, patterns: TPattern[], isMatch: (value: T, pattern: TPattern) => boolean) {
    let match: TPattern | undefined;
    for (const pattern of patterns) {
        if (!isMatch(value, pattern)) continue;
        if (match === undefined || getQuality(pattern) > getQuality(match)) {
            match = pattern;
        }
    }
    return match;
}

const mediaTypeParser = /^([^\/]+)\/([^\/;]+)(?:;(.*))?$/;

interface MediaType {
    type: string;
    subtype: string;
    parameters: Record<string, string>;
    charset?: string;
    quality?: number;
}

function parseMediaType(mediaType: string): MediaType {
    const match = mediaTypeParser.exec(mediaType);
    if (!match) throw new Error("Invalid media type");
    const type = match[1].trim();
    const subtype = match[2].trim();
    if (type === "*" && subtype !== "*") throw new Error("Invalid media type");
    const parameters: Record<string, string> = {};
    let charset: string | undefined;
    let quality: number | undefined;
    if (match[3]) {
        for (const parameter of match[3].split(";")) {
            const pair = parameter.split("=");
            const name = pair[0].trim();
            const value = pair[1].trim();
            parameters[name] = value;
            if (name === "charset") charset = value;
            if (name === "q") quality = +value;
        }
    }
    return { type, subtype, parameters, charset, quality };
}

function parseMediaTypes(value: string) {
    const mediaTypes: MediaType[] = [];
    for (const mediaRange of value.split(",")) {
        mediaTypes.push(parseMediaType(mediaRange));
    }
    return mediaTypes;
}

function matchesMediaType(mediaType: MediaType, mediaTypePattern: MediaType) {
    if (mediaTypePattern.type === "*") return true;
    if (mediaTypePattern.type === mediaType.type) {
        if (mediaTypePattern.subtype === "*") return true;
        if (mediaTypePattern.subtype === mediaType.subtype) return true;
    }
    return false;
}

interface StringWithQuality {
    value: string;
    quality?: number;
}

const stringWithQualityParser = /^([^;]+)(;\s*q\s*=\s*([^\s]+)\s*)?$/;

function parseStringWithQuality(value: string) {
    const match = stringWithQualityParser.exec(value);
    if (!match) throw new Error("Invalid header value");
    return { value: match[1].trim(), quality: match[2] ? +match[2] : undefined };
}

function parseStringsWithQuality(value: string) {
    const charsets: StringWithQuality[] = [];
    for (const charset of value.split(",")) {
        charsets.push(parseStringWithQuality(charset));
    }
    return charsets;
}

function matchesCharSet(charset: string, charsetPattern: StringWithQuality) {
    return charsetPattern.value === "*" || charsetPattern.value === charset;
}

function computeETag(stats: fs.Stats) {
    return JSON.stringify(crypto
        .createHash("sha1")
        .update(JSON.stringify({
            dev: stats.dev,
            ino: stats.ino,
            mtime: stats.mtimeMs,
            size: stats.size
        }))
        .digest("base64"));
}

function tryParseETags(value: string | undefined): "*" | string[] | undefined {
    if (!value) return undefined;
    if (value === "*") return value;
    const etags: string[] = [];
    for (const etag of value.split(",")) {
        etags.push(etag.trim());
    }
    return etags;
}

function matchesETag(etag: string | undefined, condition: "*" | string[] | undefined) {
    if (!condition) return true;
    if (!etag) return false;
    return condition === "*" || condition.indexOf(etag) >= 0;
}

function tryParseDate(value: string | undefined) {
    return value ? new Date(value) : undefined;
}

interface ByteRange {
    start: number;
    end: number;
}

const byteRangeParser = /^\s*(\d+)\s*-\s*(\d+)\s*$/;

function tryParseByteRange(value: string, contentLength: number): ByteRange | undefined {
    const match = byteRangeParser.exec(value);
    const firstBytePos = match && match[1] ? +match[1] : undefined;
    const lastBytePos = match && match[2] ? +match[2] : undefined;
    if (firstBytePos !== undefined && lastBytePos !== undefined) {
        if (lastBytePos < firstBytePos) return undefined;
        return { start: firstBytePos, end: lastBytePos + 1 };
    }
    if (firstBytePos !== undefined) return { start: firstBytePos, end: contentLength };
    if (lastBytePos !== undefined) return { start: contentLength - lastBytePos, end: contentLength };
    return undefined;
}

function tryParseByteRanges(value: string, contentLength: number): ByteRange[] | undefined {
    if (!value.startsWith("bytes=")) return;
    const ranges: ByteRange[] = [];
    for (const range of value.slice(6).split(",")) {
        const byteRange = tryParseByteRange(range, contentLength);
        if (byteRange === undefined) return undefined;
        if (byteRange.start >= contentLength) continue;
        ranges.push(byteRange);
    }
    return ranges;
}

function once<T extends (...args: any[]) => void>(callback: T): T;
function once(callback: (...args: any[]) => void) {
    let called = false;
    return (...args: any[]) => {
        if (called) return;
        called = true;
        callback(...args);
    };
}

function mkdirp(dirname: string, callback: (err: NodeJS.ErrnoException | null) => void) {
    fs.mkdir(dirname, err => {
        if (err && err.code === "EEXIST") err = null;
        if (err && err.code === "ENOENT") {
            const parentdir = path.dirname(dirname);
            if (!parentdir || parentdir === dirname) return callback(err);
            return mkdirp(parentdir, err => {
                if (err) return callback(err);
                return fs.mkdir(dirname, callback);
            });
        }
        return callback(err);
    });
}

function getAccessibleFileSystemEntries(pathname: string) {
    try {
        const entries = fs.readdirSync(pathname).sort();
        const files: string[] = [];
        const directories: string[] = [];
        for (const entry of entries) {
            // This is necessary because on some file system node fails to exclude
            // "." and "..". See https://github.com/nodejs/node/issues/4002
            if (entry === "." || entry === "..") {
                continue;
            }
            const name = path.join(pathname, entry);

            let stat: fs.Stats;
            try {
                stat = fs.statSync(name);
            }
            catch (e) {
                continue;
            }

            if (stat.isFile()) {
                files.push(entry);
            }
            else if (stat.isDirectory()) {
                directories.push(entry);
            }
        }
        return { files, directories };
    }
    catch (e) {
        return { files: [], directories: [] };
    }
}

function guessMediaType(pathname: string) {
    switch (path.extname(pathname).toLowerCase()) {
        case ".html": return "text/html; charset=utf-8";
        case ".css": return "text/css; charset=utf-8";
        case ".js": return "application/javascript; charset=utf-8";
        case ".mjs": return "application/javascript; charset=utf-8";
        case ".jsx": return "text/jsx; charset=utf-8";
        case ".ts": return "text/plain; charset=utf-8";
        case ".tsx": return "text/plain; charset=utf-8";
        case ".json": return "text/plain; charset=utf-8";
        case ".map": return "application/json; charset=utf-8";
        default: return "application/octet-stream";
    }
}

function readContent(req: http.ServerRequest, callback: (err: NodeJS.ErrnoException | null, content: string | null) => void) {
    const chunks: Buffer[] = [];
    const done = once((err: NodeJS.ErrnoException | null) => {
        if (err) return callback(err, /*content*/ null);
        let content: string | null = null;
        try {
            content = Buffer.concat(chunks).toString("utf8");
        }
        catch (e) {
            err = e;
        }
        return callback(err, content);
    });
    req.on("data", chunk => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, "utf8")));
    req.on("error", err => done(err));
    req.on("end", () => done(/*err*/ null));
}

function saveToFile(file: string, readable: Readable, callback: (err: NodeJS.ErrnoException | null) => void) {
    callback = once(callback);
    const writable = fs.createWriteStream(file, { autoClose: true });
    writable.on("error", err => callback(err));
    readable.on("end", () => callback(/*err*/ null));
    readable.pipe(writable, { end: true });
}

function sendContent(res: http.ServerResponse, statusCode: number, content: string | Buffer, contentType: string): void;
function sendContent(res: http.ServerResponse, statusCode: number, content: Readable, contentType: string, contentLength: number): void;
function sendContent(res: http.ServerResponse, statusCode: number, content: string | Buffer | Readable, contentType: string, contentLength?: number) {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", contentType);
    if (isString(content)) {
        res.setHeader("Content-Length", Buffer.byteLength(content, "utf8"));
        res.end(content, "utf8");
    }
    else if (isBuffer(content)) {
        res.setHeader("Content-Length", content.byteLength);
        res.end(content);
    }
    else {
        if (contentLength !== undefined) res.setHeader("Content-Length", contentLength);
        content.on("error", e => sendInternalServerError(res, e));
        content.pipe(res, { end: true });
    }
}

function sendJson(res: http.ServerResponse, statusCode: number, value: any) {
    try {
        sendContent(res, statusCode, JSON.stringify(value), "application/json; charset=utf-8");
    }
    catch (e) {
        sendInternalServerError(res, e);
    }
}

function sendCreated(res: http.ServerResponse, location?: string, etag?: string) {
    res.statusCode = 201;
    if (location) res.setHeader("Location", location);
    if (etag) res.setHeader("ETag", etag);
    res.end();
}

function sendNoContent(res: http.ServerResponse) {
    res.statusCode = 204;
    res.end();
}

function sendFound(res: http.ServerResponse, location: string) {
    res.statusCode = 302;
    res.setHeader("Location", location);
    res.end();
}

function sendNotModified(res: http.ServerResponse) {
    res.statusCode = 304;
    res.end();
}

function sendBadRequest(res: http.ServerResponse) {
    res.statusCode = 400;
    res.end();
}

function sendNotFound(res: http.ServerResponse) {
    res.statusCode = 404;
    res.end();
}

function sendMethodNotAllowed(res: http.ServerResponse, allowedMethods: string[]) {
    res.statusCode = 405;
    res.setHeader("Allow", allowedMethods);
    res.end();
}

function sendNotAcceptable(res: http.ServerResponse) {
    res.statusCode = 406;
    res.end();
}

function sendPreconditionFailed(res: http.ServerResponse) {
    res.statusCode = 412;
    res.end();
}

function sendUnsupportedMediaType(res: http.ServerResponse) {
    res.statusCode = 415;
    res.end();
}

function sendRangeNotSatisfiable(res: http.ServerResponse) {
    res.statusCode = 416;
    res.end();
}

function sendInternalServerError(res: http.ServerResponse, error: Error) {
    console.error(error);
    return sendContent(res, /*statusCode*/ 500, error.stack, "text/plain; charset=utf8");
}

function sendNotImplemented(res: http.ServerResponse) {
    res.statusCode = 501;
    res.end();
}

function shouldIgnoreCache(url: URL) {
    switch (url.pathname) {
        case "/built/local/bundle.js":
        case "/built/local/bundle.js.map":
            return true;
        default:
            return false;
    }
}

function isAcceptable(req: http.ServerRequest, contentType: string) {
    const mediaType = parseMediaType(contentType);
    return isAcceptableMediaType(req, mediaType)
        && isAcceptableCharSet(req, mediaType)
        && isAcceptableEncoding(req);
}

function isAcceptableMediaType(req: http.ServerRequest, mediaType: MediaType) {
    if (!req.headers.accept) return true;
    const acceptedMediaType = bestMatch(mediaType, parseMediaTypes(req.headers.accept), matchesMediaType);
    return acceptedMediaType ? getQuality(acceptedMediaType) > 0 : false;
}

function isAcceptableCharSet(req: http.ServerRequest, mediaType: MediaType) {
    if (!req.headers["accept-charset"]) return true;
    const acceptedCharSet = bestMatch(mediaType.charset || "utf-8", parseStringsWithQuality(req.headers["accept-charset"]), matchesCharSet);
    return acceptedCharSet ? getQuality(acceptedCharSet) > 0 : false;
}

function isAcceptableEncoding(req: http.ServerRequest) {
    if (!req.headers["accept-encoding"]) return true;
    const acceptedEncoding = bestMatch(/*value*/ undefined, parseStringsWithQuality(req.headers["accept-encoding"]), (_, pattern) => pattern.value === "*" || pattern.value === "identity");
    return acceptedEncoding ? getQuality(acceptedEncoding) > 0 : true;
}

function shouldSendNotModified(req: http.ServerRequest, stats: fs.Stats, etag: string) {
    const ifNoneMatch = tryParseETags(req.headers["if-none-match"]);
    if (ifNoneMatch) return matchesETag(etag, ifNoneMatch);

    const ifModifiedSince = tryParseDate(req.headers["if-modified-since"]);
    if (ifModifiedSince) return stats.mtime.getTime() <= ifModifiedSince.getTime();

    return false;
}

function shouldSendPreconditionFailed(req: http.ServerRequest, stats: fs.Stats, etag: string) {
    const ifMatch = tryParseETags(req.headers["if-match"]);
    if (ifMatch && !matchesETag(etag, ifMatch)) return true;

    const ifUnmodifiedSince = tryParseDate(req.headers["if-unmodified-since"]);
    if (ifUnmodifiedSince && stats.mtime.getTime() > ifUnmodifiedSince.getTime()) return true;

    return false;
}

function handleGetRequest(req: http.ServerRequest, res: http.ServerResponse) {
    const url = new URL(req.url, baseUrl);
    if (url.pathname === "/") {
        url.pathname = "/tests/webTestResults.html";
        return sendFound(res, url.toString());
    }

    const file = toServerPath(url);
    fs.stat(file, (err, stats) => {
        try {
            if (err) {
                if (err.code === "ENOENT") return sendNotFound(res);
                return sendInternalServerError(res, err);
            }
            if (stats && stats.isFile()) {
                const contentType = guessMediaType(file);
                if (!isAcceptable(req, contentType)) return sendNotAcceptable(res);

                const etag = computeETag(stats);
                if (shouldSendNotModified(req, stats, etag)) return sendNotModified(res);
                if (shouldSendPreconditionFailed(req, stats, etag)) return sendPreconditionFailed(res);

                if (shouldIgnoreCache(url)) res.setHeader("Cache-Control", "no-store");
                res.setHeader("Last-Modified", stats.mtime.toUTCString());
                res.setHeader("ETag", etag);
                res.setHeader("Content-Type", contentType);
                res.setHeader("Accept-Ranges", "bytes");

                const ranges = req.headers.range && tryParseByteRanges(req.headers.range, stats.size);
                if (ranges && ranges.length === 0) return sendRangeNotSatisfiable(res);

                let start: number | undefined;
                let end: number | undefined;
                if (ranges && ranges.length === 1) {
                    start = ranges[0].start;
                    end = ranges[0].end;
                    if (start >= stats.size || end > stats.size) return sendRangeNotSatisfiable(res);
                    res.statusCode = 206;
                    res.setHeader("Content-Length", end - start);
                    res.setHeader("Content-Range", `bytes ${start}-${end - 1}/${stats.size}`);
                }
                else {
                    res.statusCode = 200;
                    res.setHeader("Content-Length", stats.size);
                }
                if (req.method === "HEAD") return res.end();
                const readable = fs.createReadStream(file, { start, end, autoClose: true });
                readable.on("error", err => sendInternalServerError(res, err));
                readable.pipe(res, { end: true });
            }
            else {
                if (req.headers["if-match"] === "*") return sendPreconditionFailed(res);
                return sendNotFound(res);
            }
        }
        catch (e) {
            return sendInternalServerError(res, e);
        }
    });
}

function handlePutRequest(req: http.ServerRequest, res: http.ServerResponse) {
    if (req.headers["content-encoding"]) return sendUnsupportedMediaType(res);
    if (req.headers["content-range"]) return sendNotImplemented(res);
    const file = toServerPath(req.url);
    fs.stat(file, (err, stats) => {
        try {
            if (err && err.code !== "ENOENT") return sendInternalServerError(res, err);
            if (stats && !stats.isFile()) return sendMethodNotAllowed(res, []);
            return mkdirp(path.dirname(file), err => {
                if (err) return sendInternalServerError(res, err);
                try {
                    const writable = fs.createWriteStream(file, { autoClose: true });
                    writable.on("error", err => sendInternalServerError(res, err));
                    writable.on("finish", () => {
                        if (stats) return sendNoContent(res);
                        fs.stat(file, (err, stats) => {
                            if (err) return sendInternalServerError(res, err);
                            return sendCreated(res, toClientPath(file), computeETag(stats));
                        });
                    });
                    req.pipe(writable, { end: true });
                    return;
                }
                catch (e) {
                    return sendInternalServerError(res, e);
                }
            });
        }
        catch (e) {
            return sendInternalServerError(res, e);
        }
    });
}

function handleDeleteRequest(req: http.ServerRequest, res: http.ServerResponse) {
    const file = toServerPath(req.url);
    fs.stat(file, (err, stats) => {
        try {
            if (err && err.code !== "ENOENT") return sendInternalServerError(res, err);
            if (!stats) return sendNotFound(res);
            if (stats.isFile()) return fs.unlink(file, handleResult);
            if (stats.isDirectory()) return fs.rmdir(file, handleResult);
            return sendNotFound(res);
            function handleResult(err: NodeJS.ErrnoException) {
                if (err && err.code !== "ENOENT") return sendInternalServerError(res, err);
                if (err) return sendNotFound(res);
                return sendNoContent(res);
            }
        }
        catch (e) {
            return sendInternalServerError(res, e);
        }
    });
}

function handleOptionsRequest(req: http.ServerRequest, res: http.ServerResponse) {
    res.setHeader("X-Case-Sensitivity", useCaseSensitiveFileNames ? "CS" : "CI");
    return sendNoContent(res);
}

function handleApiResolve(req: http.ServerRequest, res: http.ServerResponse) {
    readContent(req, (err, content) => {
        try {
            if (err) return sendInternalServerError(res, err);
            if (!content) return sendBadRequest(res);
            const serverPath = toServerPath(content);
            const clientPath = toClientPath(serverPath);
            if (clientPath === undefined) return sendBadRequest(res);
            return sendContent(res, /*statusCode*/ 200, clientPath, /*contentType*/ "text/plain;charset=utf-8");
        }
        catch (e) {
            return sendInternalServerError(res, e);
        }
    });
}

function handleApiEnumerateTestFiles(req: http.ServerRequest, res: http.ServerResponse) {
    readContent(req, (err, content) => {
        try {
            if (err) return sendInternalServerError(res, err);
            if (!content) return sendBadRequest(res);
            const tests: (string | FileBasedTest)[] = enumerateTestFiles(content);
            return sendJson(res, /*statusCode*/ 200, tests);
        }
        catch (e) {
            return sendInternalServerError(res, e);
        }
    });
}

function enumerateTestFiles(runner: string) {
    switch (runner) {
        case "conformance":
        case "compiler":
            return listFiles(`tests/cases/${runner}`, /*serverDirname*/ undefined, /\.tsx?$/, { recursive: true }).map(parseCompilerTestConfigurations);
        case "fourslash":
            return listFiles(`tests/cases/fourslash`, /*serverDirname*/ undefined, /\.ts/i, { recursive: false });
        case "fourslash-shims":
            return listFiles(`tests/cases/fourslash/shims`, /*serverDirname*/ undefined, /\.ts/i, { recursive: false });
        case "fourslash-shims-pp":
            return listFiles(`tests/cases/fourslash/shims-pp`, /*serverDirname*/ undefined, /\.ts/i, { recursive: false });
        case "fourslash-server":
            return listFiles(`tests/cases/fourslash/server`, /*serverDirname*/ undefined, /\.ts/i, { recursive: false });
        default:
            throw new Error(`Runner '${runner}' not supported in browser tests.`);
    }
}

// Regex for parsing options in the format "@Alpha: Value of any sort"
const optionRegex = /^[\/]{2}\s*@(\w+)\s*:\s*([^\r\n]*)/gm;  // multiple matches on multiple lines

function extractCompilerSettings(content: string): Record<string, string> {
    const opts: Record<string, string> = {};

    let match: RegExpExecArray;
    while ((match = optionRegex.exec(content)) !== null) {
        opts[match[1]] = match[2].trim();
    }

    return opts;
}

function splitVaryBySettingValue(text: string): string[] | undefined {
    if (!text) return undefined;
    const entries = text.split(/,/).map(s => s.trim().toLowerCase()).filter(s => s.length > 0);
    return entries && entries.length > 1 ? entries : undefined;
}

function computeFileBasedTestConfigurationVariations(configurations: FileBasedTestConfiguration[], variationState: FileBasedTestConfiguration, varyByEntries: [string, string[]][], offset: number) {
    if (offset >= varyByEntries.length) {
        // make a copy of the current variation state
        configurations.push({ ...variationState });
        return;
    }

    const [varyBy, entries] = varyByEntries[offset];
    for (const entry of entries) {
        // set or overwrite the variation
        variationState[varyBy] = entry;
        computeFileBasedTestConfigurationVariations(configurations, variationState, varyByEntries, offset + 1);
    }
}

function getFileBasedTestConfigurations(settings: Record<string, string>, varyBy: string[]): FileBasedTestConfiguration[] | undefined {
    let varyByEntries: [string, string[]][] | undefined;
    for (const varyByKey of varyBy) {
        if (Object.prototype.hasOwnProperty.call(settings, varyByKey)) {
            const entries = splitVaryBySettingValue(settings[varyByKey]);
            if (entries) {
                if (!varyByEntries) varyByEntries = [];
                varyByEntries.push([varyByKey, entries]);
            }
        }
    }

    if (!varyByEntries) return undefined;

    const configurations: FileBasedTestConfiguration[] = [];
    computeFileBasedTestConfigurationVariations(configurations, {}, varyByEntries, 0);
    return configurations;
}

function parseCompilerTestConfigurations(file: string): FileBasedTest {
    const content = fs.readFileSync(path.join(rootDir, file), "utf8");
    const settings = extractCompilerSettings(content);
    const configurations = getFileBasedTestConfigurations(settings, ["module", "target"]);
    return { file, configurations };
}

function handleApiListFiles(req: http.ServerRequest, res: http.ServerResponse) {
    readContent(req, (err, content) => {
        try {
            if (err) return sendInternalServerError(res, err);
            if (!content) return sendBadRequest(res);
            const serverPath = toServerPath(content);
            const files = listFiles(content, serverPath, /*spec*/ undefined, { recursive: true });
            return sendJson(res, /*statusCode*/ 200, files);
        }
        catch (e) {
            return sendInternalServerError(res, e);
        }
    });
}

function listFiles(clientDirname: string, serverDirname: string = path.resolve(rootDir, clientDirname), spec?: RegExp, options: { recursive?: boolean } = {}): string[] {
    const files: string[] = [];
    visit(serverDirname, clientDirname, files);
    return files;

    function visit(dirname: string, relative: string, results: string[]) {
        const { files, directories } = getAccessibleFileSystemEntries(dirname);
        for (const file of files) {
            if (!spec || file.match(spec)) {
                results.push(path.join(relative, file));
            }
        }
        for (const directory of directories) {
            if (options.recursive) {
                visit(path.join(dirname, directory), path.join(relative, directory), results);
            }
        }
    }
}

function handleApiDirectoryExists(req: http.ServerRequest, res: http.ServerResponse) {
    readContent(req, (err, content) => {
        try {
            if (err) return sendInternalServerError(res, err);
            if (!content) return sendBadRequest(res);
            const serverPath = toServerPath(content);
            fs.stat(serverPath, (err, stats) => {
                try {
                    if (err && err.code !== "ENOENT") return sendInternalServerError(res, err);
                    return sendJson(res, /*statusCode*/ 200, !!stats && stats.isDirectory());
                }
                catch (e) {
                    return sendInternalServerError(res, e);
                }
            });
        }
        catch (e) {
            return sendInternalServerError(res, e);
        }
    });
}

function handleApiGetAccessibleFileSystemEntries(req: http.ServerRequest, res: http.ServerResponse) {
    readContent(req, (err, content) => {
        try {
            if (err) return sendInternalServerError(res, err);
            if (!content) return sendBadRequest(res);
            const serverPath = toServerPath(content);
            return sendJson(res, /*statusCode*/ 200, getAccessibleFileSystemEntries(serverPath));
        }
        catch (e) {
            return sendInternalServerError(res, e);
        }
    });
}

function handlePostRequest(req: http.ServerRequest, res: http.ServerResponse) {
    // API responses should not be cached
    res.setHeader("Cache-Control", "no-cache");
    switch (new URL(req.url, baseUrl).pathname) {
        case "/api/resolve": return handleApiResolve(req, res);
        case "/api/listFiles": return handleApiListFiles(req, res);
        case "/api/enumerateTestFiles": return handleApiEnumerateTestFiles(req, res);
        case "/api/directoryExists": return handleApiDirectoryExists(req, res);
        case "/api/getAccessibleFileSystemEntries": return handleApiGetAccessibleFileSystemEntries(req, res);
        default: return sendMethodNotAllowed(res, ["HEAD", "GET", "PUT", "DELETE", "OPTIONS"]);
    }
}

function handleRequest(req: http.ServerRequest, res: http.ServerResponse) {
    try {
        switch (req.method) {
            case "HEAD":
            case "GET": return handleGetRequest(req, res);
            case "PUT": return handlePutRequest(req, res);
            case "POST": return handlePostRequest(req, res);
            case "DELETE": return handleDeleteRequest(req, res);
            case "OPTIONS": return handleOptionsRequest(req, res);
            default: return sendMethodNotAllowed(res, ["HEAD", "GET", "PUT", "POST", "DELETE"]);
        }
    }
    catch (e) {
        return sendInternalServerError(res, e);
    }
}

function startServer() {
    console.log(`Static file server running at\n  => http://localhost:${port}/\nCTRL + C to shutdown`);
    return http.createServer(handleRequest).listen(port);
}

const REG_COLUMN_PADDING = 4;

function queryRegistryValue(keyPath: string, callback: (error: Error | null, value: string) => void) {
    const args = ["query", keyPath];
    child_process.execFile("reg", ["query", keyPath, "/ve"], { encoding: "utf8" }, (error, stdout) => {
        if (error) return callback(error, null);

        const valueLine = stdout.replace(/^\r\n.+?\r\n|\r\n\r\n$/g, "");
        if (!valueLine) {
            return callback(new Error("Unable to retrieve value."), null);
        }

        const valueNameColumnOffset = REG_COLUMN_PADDING;
        if (valueLine.lastIndexOf("(Default)", valueNameColumnOffset) !== valueNameColumnOffset) {
            return callback(new Error("Unable to retrieve value."), null);
        }

        const dataTypeColumnOffset = valueNameColumnOffset + "(Default)".length + REG_COLUMN_PADDING;
        if (valueLine.lastIndexOf("REG_SZ", dataTypeColumnOffset) !== dataTypeColumnOffset) {
            return callback(new Error("Unable to retrieve value."), null);
        }

        const valueColumnOffset = dataTypeColumnOffset + "REG_SZ".length + REG_COLUMN_PADDING;
        const value = valueLine.slice(valueColumnOffset);
        return callback(null, value);
    });
}

interface Browser {
    description: string;
    command: string;
}

function createBrowserFromPath(path: string): Browser {
    return { description: path, command: path };
}

function getChromePath(callback: (error: Error | null, browser: Browser | string | null) => void) {
    switch (os.platform()) {
        case "win32":
            return queryRegistryValue("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\App Paths\\chrome.exe", (error, value) => {
                if (error) return callback(null, "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe");
                return callback(null, createBrowserFromPath(value));
            });
        case "darwin": return callback(null, "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome");
        case "linux": return callback(null, "/opt/google/chrome/chrome");
        default: return callback(new Error(`Chrome location is unknown for platform '${os.platform()}'`), null);
    }
}

function getEdgePath(callback: (error: Error | null, browser: Browser | null) => void) {
    switch (os.platform()) {
        case "win32": return callback(null, { description: "Microsoft Edge", command: "cmd /c start microsoft-edge:%1" });
        default: return callback(new Error(`Edge location is unknown for platform '${os.platform()}'`), null);
    }
}

function getBrowserPath(callback: (error: Error | null, browser: Browser | null) => void) {
    switch (browser) {
        case "chrome": return getChromePath(afterGetBrowserPath);
        case "edge": return getEdgePath(afterGetBrowserPath);
        default: return callback(new Error(`Browser location is unknown for '${browser}'`), null);
    }

    function afterGetBrowserPath(error: Error | null, browser: Browser | string | null) {
        if (error) return callback(error, null);
        if (typeof browser === "object") return callback(null, browser);
        return fs.stat(browser, (error, stats) => {
            if (!error && stats.isFile()) {
                return callback(null, createBrowserFromPath(browser));
            }
            if (browser === "chrome") return callback(null, createBrowserFromPath("chrome"));
            return callback(new Error(`Browser location is unknown for '${browser}'`), null);
        });
    }
}

function startClient(server: http.Server) {
    let browserPath: string;
    if (browser === "none") {
        return;
    }

    getBrowserPath((error, browser) => {
        if (error) return console.error(error);
        console.log(`Using browser: ${browser.description}`);
        const queryString = grep ? `?grep=${grep}` : "";
        const args = [`http://localhost:${port}/tests/webTestResults.html${queryString}`];
        if (browser.command.indexOf("%") === -1) {
            child_process.spawn(browser.command, args);
        }
        else {
            const command = browser.command.replace(/%(\d+)/g, (_, offset) => args[+offset - 1]);
            child_process.exec(command);
        }
    });
}

function printHelp() {
    console.log("Runs an http server on port 8888, looking for tests folder in the current directory\n");
    console.log("Syntax: node webTestServer.js [browser] [tests] [--verbose]\n");
    console.log("Options:");
    console.log(" <browser>     The browser to launch. One of 'edge', 'chrome', or 'none' (default 'edge' on Windows, otherwise `chrome`).");
    console.log(" <tests>       A regular expression to pass to Mocha.");
    console.log(" --verbose     Enables verbose logging.");
}

function parseCommandLine(args: string[]) {
    const parsed = minimist(args, { boolean: ["help", "verbose"] });
    if (parsed.help) {
        printHelp();
        return false;
    }

    if (parsed.verbose) {
        verbose = true;
    }

    const [parsedBrowser = defaultBrowser, parsedGrep, ...unrecognized] = parsed._;
    if (parsedBrowser !== "edge" && parsedBrowser !== "chrome" && parsedBrowser !== "none") {
        console.log(`Unrecognized browser '${parsedBrowser}', expected 'edge', 'chrome', or 'none'.`);
        return false;
    }

    if (unrecognized.length > 0) {
        console.log(`Unrecognized argument: ${unrecognized[0]}`);
        return false;
    }

    browser = parsedBrowser;
    grep = parsedGrep;
    return true;
}

function log(msg: string) {
    if (verbose) {
        console.log(msg);
    }
}

function main() {
    if (parseCommandLine(process.argv.slice(2))) {
        startClient(startServer());
    }
}

main();
// tslint:enable:no-null-keyword