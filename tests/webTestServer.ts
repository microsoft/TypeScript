/// <reference types="node" />

import http = require("http");
import fs = require("fs");
import path = require("path");
import url = require("url");
import child_process = require("child_process");
import os = require("os");

/// Command line processing ///

if (process.argv[2] == "--help") {
    console.log("Runs a node server on port 8888, looking for tests folder in the current directory\n");
    console.log("Syntax: node nodeServer.js [typescriptEnlistmentDirectory] [tests] [--browser] [--verbose]\n");
    console.log("Examples: \n\tnode nodeServer.js .");
    console.log("\tnode nodeServer.js 3000 D:/src/typescript/public --verbose IE");
}

function switchToForwardSlashes(path: string) {
    return path.replace(/\\/g, "/").replace(/\/\//g, "/");
}

const port = 8888; // harness.ts and webTestResults.html depend on this exact port number.

let browser: string;
if (process.argv[2]) {
    browser = process.argv[2];
    if (browser !== "chrome" && browser !== "IE") {
        console.log(`Invalid command line arguments. Got ${browser} but expected chrome, IE or nothing.`);
    }
}

const grep = process.argv[3];

let verbose = false;
if (process.argv[4] == "--verbose") {
    verbose = true;
}
else if (process.argv[4] && process.argv[4] !== "--verbose") {
    console.log(`Invalid command line arguments. Got ${process.argv[4]} but expected --verbose or nothing.`);
}

/// Utils ///
function log(msg: string) {
    if (verbose) {
        console.log(msg);
    }
}


const directorySeparator = "/";

function getRootLength(path: string): number {
    if (path.charAt(0) === directorySeparator) {
        if (path.charAt(1) !== directorySeparator) return 1;
        const p1 = path.indexOf("/", 2);
        if (p1 < 0) return 2;
        const p2 = path.indexOf("/", p1 + 1);
        if (p2 < 0) return p1 + 1;
        return p2 + 1;
    }
    if (path.charAt(1) === ":") {
        if (path.charAt(2) === directorySeparator) return 3;
        return 2;
    }
    // Per RFC 1738 'file' URI schema has the shape file://<host>/<path>
    // if <host> is omitted then it is assumed that host value is 'localhost',
    // however slash after the omitted <host> is not removed.
    // file:///folder1/file1 - this is a correct URI
    // file://folder2/file2 - this is an incorrect URI
    if (path.lastIndexOf("file:///", 0) === 0) {
        return "file:///".length;
    }
    const idx = path.indexOf("://");
    if (idx !== -1) {
        return idx + "://".length;
    }
    return 0;
}

function getDirectoryPath(path: string): any {
    path = switchToForwardSlashes(path);
    return path.substr(0, Math.max(getRootLength(path), path.lastIndexOf(directorySeparator)));
}

function ensureDirectoriesExist(path: string) {
    path = switchToForwardSlashes(path);
    if (path.length > getRootLength(path) && !fs.existsSync(path)) {
        const parentDirectory = getDirectoryPath(path);
        ensureDirectoriesExist(parentDirectory);
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
    }
}

// Copied from the compiler sources
function dir(dirPath: string, spec?: string, options?: any) {
    options = options || <{ recursive?: boolean; }>{};
    return filesInFolder(dirPath);

    function filesInFolder(folder: string): string[] {
        folder = switchToForwardSlashes(folder);
        let paths: string[] = [];
        // Everything after the current directory is relative
        const baseDirectoryLength = process.cwd().length + 1;

        try {
            const files = fs.readdirSync(folder);
            for (let i = 0; i < files.length; i++) {
                const stat = fs.statSync(path.join(folder, files[i]));
                if (options.recursive && stat.isDirectory()) {
                    paths = paths.concat(filesInFolder(path.join(folder, files[i])));
                }
                else if (stat.isFile() && (!spec || files[i].match(spec))) {
                    const relativePath = folder.substring(baseDirectoryLength);
                    paths.push(path.join(relativePath, files[i]));
                }
            }
        }
        catch (err) {
            // Skip folders that are inaccessible
        }
        return paths;
    }
}

// fs.rmdirSync won't delete directories with files in it
function deleteFolderRecursive(dirPath: string) {
    if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach((file) => {
            const curPath = path.join(dirPath, file);
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            }
            else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(dirPath);
    }
};

function writeFile(path: string, data: any) {
    ensureDirectoriesExist(getDirectoryPath(path));
    fs.writeFileSync(path, data);
}

/// Request Handling ///

function handleResolutionRequest(filePath: string, res: http.ServerResponse) {
    let resolvedPath = path.resolve(filePath, "");
    resolvedPath = resolvedPath.substring(resolvedPath.indexOf("tests"));
    resolvedPath = switchToForwardSlashes(resolvedPath);
    send(ResponseCode.Success, res, resolvedPath);
}

const enum ResponseCode {
    Success = 200,
    BadRequest = 400,
    NotFound = 404,
    MethodNotAllowed = 405,
    PayloadTooLarge = 413,
    Fail = 500
}

function send(responseCode: number, res: http.ServerResponse, contents: string, contentType = "binary"): void {
    res.writeHead(responseCode, { "Content-Type": contentType });
    res.end(contents);
}

// Reads the data from a post request and passes it to the given callback
function processPost(req: http.ServerRequest, res: http.ServerResponse, callback: (data: string) => any): void {
    let queryData = "";
    if (typeof callback !== "function") return;

    if (req.method == "POST") {
        req.on("data", (data: string) => {
            queryData += data;
            if (queryData.length > 1e8) {
                queryData = "";
                send(ResponseCode.PayloadTooLarge, res, undefined);
                console.log("ERROR: destroying connection");
                req.connection.destroy();
            }
        });

        req.on("end", () => {
            // res.post = url.parse(req.url).query;
            callback(queryData);
        });

    }
    else {
        send(ResponseCode.MethodNotAllowed, res, undefined);
    }
}

enum RequestType {
    GetFile,
    GetDir,
    ResolveFile,
    WriteFile,
    DeleteFile,
    WriteDir,
    DeleteDir,
    AppendFile,
    Unknown
}

function getRequestOperation(req: http.ServerRequest) {
    if (req.method === "GET" && req.url.indexOf("?") === -1) {
        if (req.url.indexOf(".") !== -1) return RequestType.GetFile;
        else return RequestType.GetDir;
    }
    else {

        const queryData: any = url.parse(req.url, /*parseQueryString*/ true).query;
        if (req.method === "GET" && queryData.resolve !== undefined) return RequestType.ResolveFile;
        // mocha uses ?grep=<regexp> query string as equivalent to the --grep command line option used to filter tests
        if (req.method === "GET" && queryData.grep !== undefined) return RequestType.GetFile;
        if (req.method === "POST" && queryData.action) {
            const path = req.url.substr(0, req.url.lastIndexOf("?"));
            const isFile = path.substring(path.lastIndexOf("/")).indexOf(".") !== -1;
            switch (queryData.action.toUpperCase()) {
                case "WRITE":
                    return isFile ? RequestType.WriteFile : RequestType.WriteDir;
                case "DELETE":
                    return isFile ? RequestType.DeleteFile : RequestType.DeleteDir;
                case "APPEND":
                    return isFile ? RequestType.AppendFile : RequestType.Unknown;
            }
        }
        return RequestType.Unknown;
    }
}

function handleRequestOperation(req: http.ServerRequest, res: http.ServerResponse, operation: RequestType, reqPath: string) {
    switch (operation) {
        case RequestType.GetDir:
            const filesInFolder = dir(reqPath, "", { recursive: true });
            send(ResponseCode.Success, res, filesInFolder.join(","));
            break;
        case RequestType.GetFile:
            fs.readFile(reqPath, (err, file) => {
                const contentType = contentTypeForExtension(path.extname(reqPath));
                if (err) {
                    send(ResponseCode.NotFound, res, err.message, contentType);
                }
                else {
                    send(ResponseCode.Success, res, <any>file, contentType);
                }
            });
            break;
        case RequestType.ResolveFile:
            const resolveRequest = req.url.match(/(.*)\?resolve/);
            handleResolutionRequest(resolveRequest[1], res);
            break;
        case RequestType.WriteFile:
            processPost(req, res, (data) => {
                writeFile(reqPath, data);
            });
            send(ResponseCode.Success, res, undefined);
            break;
        case RequestType.WriteDir:
            fs.mkdirSync(reqPath);
            send(ResponseCode.Success, res, undefined);
            break;
        case RequestType.DeleteFile:
            if (fs.existsSync(reqPath)) {
                fs.unlinkSync(reqPath);
            }
            send(ResponseCode.Success, res, undefined);
            break;
        case RequestType.DeleteDir:
            if (fs.existsSync(reqPath)) {
                fs.rmdirSync(reqPath);
            }
            send(ResponseCode.Success, res, undefined);
            break;
        case RequestType.AppendFile:
            processPost(req, res, (data) => {
                fs.appendFileSync(reqPath, data);
            });
            send(ResponseCode.Success, res, undefined);
            break;
        case RequestType.Unknown:
        default:
            send(ResponseCode.BadRequest, res, undefined);
            break;
    }

    function contentTypeForExtension(ext: string) {
        switch (ext) {
            case ".js": return "text/javascript";
            case ".css": return "text/css";
            case ".html": return "text/html";
            default: return "binary";
        }
    }
}

console.log(`Static file server running at\n  => http://localhost:${port}/\nCTRL + C to shutdown`);

http.createServer((req: http.ServerRequest, res: http.ServerResponse) => {
    log(`${req.method} ${req.url}`);
    const uri = url.parse(req.url).pathname;
    const reqPath = path.join(process.cwd(), uri);
    const operation = getRequestOperation(req);
    handleRequestOperation(req, res, operation, reqPath);
}).listen(port);

let browserPath: string;
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
