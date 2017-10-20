/// <reference types="node" />

import http = require("http");
import fs = require("fs");
import path = require("path");
import url = require("url");
import URL = url.URL;
import child_process = require("child_process");
import os = require("os");
import crypto = require("crypto");

const port = 8888; // harness.ts and webTestResults.html depend on this exact port number.
const baseUrl = new URL(`http://localhost:8888/`);
const rootDir = path.dirname(__dirname);
const useCaseSensitiveFileNames = isFileSystemCaseSensitive();

let browser = "IE";
let grep: string | undefined;
let verbose = false;

interface HttpContent {
    headers: any;
    content: string;
}

namespace HttpContent {
    export function create(headers: object = {}, content?: string) {
        return { headers, content };
    }

    export function clone(content: HttpContent): HttpContent {
        return content && create(HttpHeaders.clone(content.headers), content.content);
    }

    export function forMediaType(mediaType: string | string[], content: string): HttpContent {
        return create({ "Content-Type": mediaType, "Content-Length": Buffer.byteLength(content, "utf8") }, content);
    }

    export function text(content: string): HttpContent {
        return forMediaType("text/plain", content);
    }

    export function json(content: any): HttpContent {
        return forMediaType("application/json", JSON.stringify(content));
    }
}

namespace HttpHeaders {
    export function clone(headers: http.OutgoingHttpHeaders) {
        return { ...headers };
    }

    export function getCacheControl(headers: http.IncomingHttpHeaders | http.OutgoingHttpHeaders) {
        let cacheControl = headers["Cache-Control"];
        let noCache = false;
        let noStore = false;
        let maxAge: number = undefined;
        let maxStale: number = undefined;
        let minFresh: number = undefined;
        if (typeof cacheControl === "string") cacheControl = [cacheControl];
        if (Array.isArray(cacheControl)) {
            for (const directive of cacheControl) {
                if (directive === "no-cache") noCache = true;
                else if (directive === "no-store") noStore = true;
                else if (directive === "max-stale") maxStale = Infinity;
                else if (/^no-cache=/.test(directive)) noCache = true;
                else if (/^max-age=/.test(directive)) maxAge = +directive.slice(8).trim();
                else if (/^min-fresh=/.test(directive)) minFresh = +directive.slice(10).trim();
                else if (/^max-stale=/.test(directive)) maxStale = +directive.slice(10).trim();
            }
        }
        return { noCache, noStore, maxAge, maxStale, minFresh };
    }

    export function getExpires(headers: http.IncomingHttpHeaders | http.OutgoingHttpHeaders) {
        const expires = headers["Expires"];
        if (typeof expires !== "string") return Infinity;
        return new Date(expires).getTime();
    }

    export function getIfConditions(headers: http.IncomingHttpHeaders): { ifMatch: "*" | string[], ifNoneMatch: "*" | string[], ifModifiedSince: Date, ifUnmodifiedSince: Date } {
        const ifMatch = toMatch(headers["If-Match"]);
        const ifNoneMatch = toMatch(headers["If-None-Match"]);
        const ifModifiedSince = toDate(headers["If-Modified-Since"]);
        const ifUnmodifiedSince = toDate(headers["If-Unmodified-Since"]);
        return { ifMatch, ifNoneMatch, ifModifiedSince, ifUnmodifiedSince };

        function toMatch(value: string | string[]) {
            return typeof value === "string" && value !== "*" ? [value] : value;
        }

        function toDate(value: string | string[]) {
            return value ? new Date(Array.isArray(value) ? value[0] : value) : undefined;
        }
    }

    export function combine(left: http.OutgoingHttpHeaders, right: http.OutgoingHttpHeaders) {
        return left && right ? { ...left, ...right } :
            left ? { ...left } :
            right ? { ...right } :
            {};
    }
}

interface HttpRequestMessage {
    url: url.URL;
    method: string;
    headers: http.IncomingHttpHeaders;
    content?: HttpContent;
    file?: string;
    stats?: fs.Stats;
}

namespace HttpRequestMessage {
    export function create(method: string, url: URL | string, headers: http.IncomingHttpHeaders, content?: HttpContent) {
        return { method, url: typeof url === "string" ? new URL(url, baseUrl) : url, headers, content };
    }

    export function getFile(message: HttpRequestMessage) {
        return message.file || (message.file = path.join(rootDir, decodeURIComponent(message.url.pathname)));
    }

    export function getStats(message: HttpRequestMessage, throwErrors?: boolean) {
        return message.stats || (message.stats = throwErrors ? fs.statSync(getFile(message)) : tryStat(getFile(message)));
    }

    export function readRequest(req: http.ServerRequest) {
        return new Promise<HttpRequestMessage>((resolve, reject) => {
            let entityData: string | undefined;
            req.setEncoding("utf8");
            req.on("data", (data: string) => {
                if (entityData === undefined) {
                    entityData = data;
                }
                else {
                    entityData += data;
                }
            });
            req.on("end", () => {
                const content = entityData !== undefined
                    ? HttpContent.forMediaType(req.headers["Content-Type"], entityData)
                    : undefined;
                resolve(HttpRequestMessage.create(req.method, req.url, req.headers, content));
            });
            req.on("error", reject);
        });
    }
}

interface HttpResponseMessage {
    statusCode?: number;
    statusMessage?: string;
    headers: http.OutgoingHttpHeaders;
    content?: HttpContent;
}

namespace HttpResponseMessage {
    export function create(statusCode: number, headers: http.OutgoingHttpHeaders = {}, content?: HttpContent) {
        return { statusCode, headers, content };
    }

    export function clone(message: HttpResponseMessage): HttpResponseMessage {
        return {
            statusCode: message.statusCode,
            statusMessage: message.statusMessage,
            headers: HttpHeaders.clone(message.headers),
            content: HttpContent.clone(message.content)
        };
    }

    export function ok(headers: http.OutgoingHttpHeaders, content: HttpContent | undefined): HttpResponseMessage;
    export function ok(content?: HttpContent): HttpResponseMessage;
    export function ok(contentOrHeaders: http.OutgoingHttpHeaders | HttpContent | undefined, content?: HttpContent): HttpResponseMessage {
        let headers: http.OutgoingHttpHeaders;
        if (!content) {
            content = <HttpContent>contentOrHeaders;
            headers = {};
        }
        return create(200, headers, content);
    }

    export function created(location?: string, etag?: string): HttpResponseMessage {
        return create(201, { "Location": location, "ETag": etag });
    }

    export function noContent(headers?: http.OutgoingHttpHeaders): HttpResponseMessage {
        return create(204, headers);
    }

    export function notModified(): HttpResponseMessage {
        return create(304);
    }

    export function badRequest(): HttpResponseMessage {
        return create(400);
    }

    export function notFound(): HttpResponseMessage {
        return create(404);
    }

    export function methodNotAllowed(allowedMethods: string[]): HttpResponseMessage {
        return create(405, { "Allow": allowedMethods });
    }

    export function preconditionFailed(): HttpResponseMessage {
        return create(412);
    }

    export function unsupportedMediaType(): HttpResponseMessage {
        return create(415);
    }

    export function internalServerError(content?: HttpContent): HttpResponseMessage {
        return create(500, {}, content);
    }

    export function notImplemented(): HttpResponseMessage {
        return create(501);
    }

    export function setHeaders(obj: HttpResponseMessage | HttpContent, headers: http.OutgoingHttpHeaders) {
        Object.assign(obj.headers, headers);
    }

    export function writeResponse(message: HttpResponseMessage, response: http.ServerResponse) {
        const content = message.content;
        const headers = HttpHeaders.combine(message.headers, content && content.headers);
        response.writeHead(message.statusCode, message.statusMessage || http.STATUS_CODES[message.statusCode], headers);
        response.end(content && content.content, "utf8");
    }
}

namespace HttpFileMessageHandler {
    function handleGetRequest(request: HttpRequestMessage): HttpResponseMessage {
        const file = HttpRequestMessage.getFile(request);
        const stat = HttpRequestMessage.getStats(request);
        const etag = ETag.compute(stat);
        const headers: http.OutgoingHttpHeaders = {
            "Last-Modified": stat.mtime.toUTCString(),
            "ETag": etag
        };

        let content: HttpContent | undefined;
        if (stat.isFile()) {
            if (request.method === "HEAD") {
                headers["Content-Type"] = guessMediaType(file);
                headers["Content-Length"] = stat.size;
            }
            else {
                content = HttpContent.forMediaType(guessMediaType(file), fs.readFileSync(file, "utf8"));
            }
        }
        else {
            return HttpResponseMessage.notFound();
        }

        return HttpResponseMessage.ok(headers, content);
    }

    function handlePutRequest(request: HttpRequestMessage): HttpResponseMessage {
        if (request.headers["Content-Encoding"]) return HttpResponseMessage.unsupportedMediaType();
        if (request.headers["Content-Range"]) return HttpResponseMessage.notImplemented();

        const file = toLocalPath(request.url);
        const exists = fs.existsSync(file);
        mkdir(path.dirname(file));
        fs.writeFileSync(file, request.content, "utf8");
        return exists ? HttpResponseMessage.noContent() : HttpResponseMessage.created();
    }

    function handleDeleteRequest(request: HttpRequestMessage): HttpResponseMessage {
        const file = HttpRequestMessage.getFile(request);
        const stats = HttpRequestMessage.getStats(request);
        if (stats.isFile()) {
            fs.unlinkSync(file);
        }
        else if (stats.isDirectory()) {
            fs.rmdirSync(file);
        }

        return HttpResponseMessage.noContent();
    }

    function handleOptionsRequest(request: HttpRequestMessage): HttpResponseMessage {
        return HttpResponseMessage.noContent({
            "X-Case-Sensitivity": useCaseSensitiveFileNames ? "CS" : "CI"
        });
    }

    function handleRequestCore(request: HttpRequestMessage): HttpResponseMessage {
        switch (request.method) {
            case "HEAD":
            case "GET":
                return handleGetRequest(request);
            case "PUT":
                return handlePutRequest(request);
            case "DELETE":
                return handleDeleteRequest(request);
            case "OPTIONS":
                return handleOptionsRequest(request);
            default:
                return HttpResponseMessage.methodNotAllowed(["HEAD", "GET", "PUT", "DELETE", "OPTIONS"]);
        }
    }

    export function handleRequest(request: HttpRequestMessage): HttpResponseMessage {
        let response = HttpCache.get(request);
        if (!response) HttpCache.set(request, response = handleRequestCore(request));
        return response;
    }
}

namespace HttpApiMessageHandler {
    function handleResolveRequest(request: HttpRequestMessage): HttpResponseMessage {
        if (!request.content) return HttpResponseMessage.badRequest();
        const localPath = path.resolve(rootDir, request.content.content);
        const relativePath = toURLPath(localPath);
        return relativePath === undefined
            ? HttpResponseMessage.badRequest()
            : HttpResponseMessage.ok(HttpContent.text(relativePath));
    }

    function handleListFilesRequest(request: HttpRequestMessage): HttpResponseMessage {
        if (!request.content) return HttpResponseMessage.badRequest();
        const localPath = path.resolve(rootDir, request.content.content);
        const files: string[] = [];
        visit(localPath, files);
        return HttpResponseMessage.ok(HttpContent.json(files));

        function visit(dirname: string, results: string[]) {
            const { files, directories } = getAccessibleFileSystemEntries(dirname);
            for (const file of files) {
                results.push(toURLPath(path.join(dirname, file)));
            }
            for (const directory of directories) {
                visit(path.join(dirname, directory), results);
            }
        }
    }

    function handleDirectoryExistsRequest(request: HttpRequestMessage): HttpResponseMessage {
        if (!request.content) return HttpResponseMessage.badRequest();
        const localPath = path.resolve(rootDir, request.content.content);
        return HttpResponseMessage.ok(HttpContent.json(directoryExists(localPath)));
    }

    function handlePostRequest(request: HttpRequestMessage): HttpResponseMessage {
        switch (request.url.pathname) {
            case "/api/resolve":
                return handleResolveRequest(request);
            case "/api/listFiles":
                return handleListFilesRequest(request);
            case "/api/directoryExists":
                return handleDirectoryExistsRequest(request);
            default:
                return HttpResponseMessage.notFound();
        }
    }

    export function handleRequest(request: HttpRequestMessage): HttpResponseMessage {
        switch (request.method) {
            case "POST":
                return handlePostRequest(request);
            default:
                return HttpResponseMessage.methodNotAllowed(["POST"]);
        }
    }

    export function match(request: HttpRequestMessage) {
        return /^\/api\//.test(request.url.pathname);
    }
}

namespace HttpMessageHandler {
    export function handleRequest(request: HttpRequestMessage): HttpResponseMessage {
        const { ifMatch, ifNoneMatch, ifModifiedSince, ifUnmodifiedSince } = HttpHeaders.getIfConditions(request.headers);
        const stats = HttpRequestMessage.getStats(request, /*throwErrors*/ false);
        if (stats) {
            const etag = ETag.compute(stats);
            if (ifNoneMatch) {
                if (ETag.matches(etag, ifNoneMatch)) {
                    return HttpResponseMessage.notModified();
                }
            }
            else if (ifModifiedSince && stats.mtime.getTime() <= ifModifiedSince.getTime()) {
                return HttpResponseMessage.notModified();
            }

            if (ifMatch && !ETag.matches(etag, ifMatch)) {
                return HttpResponseMessage.preconditionFailed();
            }

            if (ifUnmodifiedSince && stats.mtime.getTime() > ifUnmodifiedSince.getTime()) {
                return HttpResponseMessage.preconditionFailed();
            }
        }
        else if (ifMatch === "*") {
            return HttpResponseMessage.preconditionFailed();
        }

        if (HttpApiMessageHandler.match(request)) {
            return HttpApiMessageHandler.handleRequest(request);
        }
        else {
            return HttpFileMessageHandler.handleRequest(request);
        }
    }

    export function handleError(e: any): HttpResponseMessage {
        switch (e.code) {
            case "ENOENT": return HttpResponseMessage.notFound();
            default: return HttpResponseMessage.internalServerError(HttpContent.text(e.toString()));
        }
    }
}

namespace HttpCache {
    interface CacheEntry {
        timestamp: number;
        expires: number;
        response: HttpResponseMessage;
    }

    const cache: Record<string, CacheEntry> = Object.create(null);

    export function get(request: HttpRequestMessage) {
        if (request.method !== "GET" && request.method !== "HEAD") return undefined;

        const cacheControl = HttpHeaders.getCacheControl(request.headers);
        if (cacheControl.noCache) return undefined;

        const entry = cache[request.url.toString()];
        if (!entry) return undefined;

        const age = (Date.now() - entry.timestamp) / 1000;
        const lifetime = (entry.expires - Date.now()) / 1000;

        if (cacheControl.maxAge !== undefined && cacheControl.maxAge < age) return undefined;
        if (lifetime >= 0) {
            if (cacheControl.minFresh !== undefined && cacheControl.minFresh < lifetime) return undefined;
        }
        else {
            if (cacheControl.maxStale === undefined || cacheControl.maxStale < -lifetime) {
                return undefined;
            }
        }

        if (request.method === "GET" && !entry.response.content) {
            return undefined; // partial response
        }

        const response = HttpResponseMessage.clone(entry.response);
        response.headers["Age"] = Math.floor(age);
        return response;
    }

    export function set(request: HttpRequestMessage, response: HttpResponseMessage) {
        if (request.method !== "GET" && request.method !== "HEAD") return response;

        const cacheControl = HttpHeaders.getCacheControl(request.headers);
        if (cacheControl.noCache) return response;
        if (cacheControl.noStore) return response;

        const timestamp = Date.now();
        const expires = HttpHeaders.getExpires(response.headers);
        const age = (Date.now() - timestamp) / 1000;
        const lifetime = (expires - Date.now()) / 1000;

        if (cacheControl.maxAge !== undefined && cacheControl.maxAge < age) return response;
        if (lifetime >= 0) {
            if (cacheControl.minFresh !== undefined && cacheControl.minFresh < lifetime) return response;
        }
        else {
            if (cacheControl.maxStale === undefined || cacheControl.maxStale < -lifetime) return response;
        }

        cache[request.url.toString()] = {
            timestamp,
            expires,
            response: HttpResponseMessage.clone(response)
        };

        response.headers["Age"] = Math.floor(age);
        return response;
    }

    function cleanupCache() {
        for (const url in cache) {
            const entry = cache[url];
            if (entry.expires < Date.now()) delete cache[url];
        }
    }

    setInterval(cleanupCache, 60000).unref();
}

namespace ETag {
    export function compute(stats: fs.Stats) {
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

    export function matches(etag: string | undefined, condition: "*" | string[]) {
        return etag && condition === "*" || condition.indexOf(etag) >= 0;
    }
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

function toLocalPath(url: url.URL) {
    const pathname = decodeURIComponent(url.pathname);
    return path.join(rootDir, pathname);
}

function toURLPath(pathname: string) {
    pathname = normalizeSlashes(pathname);
    pathname = trimLeadingSeparator(pathname);

    const resolvedPath = path.resolve(rootDir, pathname);
    if (resolvedPath.slice(0, rootDir.length) !== rootDir) {
        return undefined;
    }

    let relativePath = resolvedPath.slice(rootDir.length);
    relativePath = ensureLeadingSeparator(relativePath);
    relativePath = normalizeSlashes(relativePath);
    return relativePath;
}

function directoryExists(dirname: string) {
    const stat = tryStat(dirname);
    return !!stat && stat.isDirectory();
}

function mkdir(dirname: string) {
    try {
        fs.mkdirSync(dirname);
    }
    catch (e) {
        if (e.code === "EEXIST") {
            return;
        }
        if (e.code === "ENOENT") {
            const parentdir = path.dirname(dirname);
            if (!parentdir || parentdir === dirname) throw e;
            mkdir(parentdir);
            fs.mkdirSync(dirname);
            return;
        }
        throw e;
    }
}

function tryStat(pathname: string) {
    try {
        return fs.statSync(pathname);
    }
    catch (e) {
        return undefined;
    }
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

function log(msg: string) {
    if (verbose) {
        console.log(msg);
    }
}

function guessMediaType(pathname: string) {
    switch (path.extname(pathname).toLowerCase()) {
        case ".html": return "text/html";
        case ".css": return "text/css";
        case ".js": return "application/javascript";
        case ".ts": return "text/plain";
        case ".json": return "text/plain";
        default: return "binary";
    }
}

function printHelp() {
    console.log("Runs an http server on port 8888, looking for tests folder in the current directory\n");
    console.log("Syntax: node webTestServer.js [browser] [tests] [--verbose]\n");
    console.log("Options:");
    console.log(" <browser>     The browser to launch. One of 'IE', 'chrome', or 'none' (default 'IE').");
    console.log(" <tests>       A regular expression to pass to Mocha.");
    console.log(" --verbose     Enables verbose logging.")
}

function parseCommandLine(args: string[]) {
    let offset = 0;
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        const argLower = arg.toLowerCase();
        if (argLower === "--help") {
            printHelp();
            return false;
        }
        else if (argLower === "--verbose") {
            verbose = true;
        }
        else {
            if (offset === 0) {
                browser = arg;
            }
            else if (offset === 1) {
                grep = arg;
            }
            else {
                console.log(`Unrecognized argument: ${arg}\n`);
                return false;
            }
            offset++;
        }
    }

    if (browser !== "IE" && browser !== "chrome") {
        console.log(`Unrecognized browser '${browser}', expected 'IE' or 'chrome'.`);
        return false;
    }

    return true;
}

function startServer() {
    console.log(`Static file server running at\n  => http://localhost:${port}/\nCTRL + C to shutdown`);
    http.createServer((serverRequest: http.ServerRequest, serverResponse: http.ServerResponse) => {
        log(`${serverRequest.method} ${serverRequest.url}`);
        HttpRequestMessage
            .readRequest(serverRequest)
            .then(HttpMessageHandler.handleRequest)
            .catch(HttpMessageHandler.handleError)
            .then(response => HttpResponseMessage.writeResponse(response, serverResponse));
    }).listen(port);
}

function startClient() {
    let browserPath: string;
    if (browser === "none") {
        return;
    }

    if (browser === "chrome") {
        let defaultChromePath = "";
        switch (os.platform()) {
            case "win32":
                defaultChromePath = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe";
                break;
            case "darwin":
                defaultChromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
                break;
            case "linux":
                defaultChromePath = "/opt/google/chrome/chrome";
                break;
            default:
                console.log(`default Chrome location is unknown for platform '${os.platform()}'`);
                break;
        }
        if (fs.existsSync(defaultChromePath)) {
            browserPath = defaultChromePath;
        }
        else {
            browserPath = browser;
        }
    }
    else {
        const defaultIEPath = "C:/Program Files/Internet Explorer/iexplore.exe";
        if (fs.existsSync(defaultIEPath)) {
            browserPath = defaultIEPath;
        }
        else {
            browserPath = browser;
        }
    }

    console.log(`Using browser: ${browserPath}`);

    const queryString = grep ? `?grep=${grep}` : "";
    child_process.spawn(browserPath, [`http://localhost:${port}/tests/webTestResults.html${queryString}`], {
        stdio: "inherit"
    });
}

function main() {
    if (parseCommandLine(process.argv.slice(2))) {
        startServer();
        startClient();
    }
}

main();