/// <reference path='..\src\harness\external\node.d.ts'/>
"use strict";
var http = require("http");
var fs = require("fs");
var path = require("path");
var url = require("url");
var child_process = require("child_process");
var os = require("os");
/// Command line processing ///
if (process.argv[2] == '--help') {
    console.log('Runs a node server on port 8888 by default, looking for tests folder in the current directory\n');
    console.log('Syntax: node nodeServer.js [port] [typescriptEnlistmentDirectory] [tests] [--browser] [--verbose]\n');
    console.log('Examples: \n\tnode nodeServer.js 8888 .');
    console.log('\tnode nodeServer.js 3000 D:/src/typescript/public --verbose IE');
}
function switchToForwardSlashes(path) {
    return path.replace(/\\/g, "/").replace(/\/\//g, '/');
}
var defaultPort = 8888;
var port = process.argv[2] || defaultPort;
var rootDir = switchToForwardSlashes(__dirname + '/../');
var browser;
if (process.argv[3]) {
    browser = process.argv[3];
    if (browser !== 'chrome' && browser !== 'IE') {
        console.log('Invalid command line arguments. Got ' + browser + ' but expected chrome, IE or nothing.');
    }
}
var grep = process.argv[4];
var verbose = false;
if (process.argv[5] == '--verbose') {
    verbose = true;
}
else if (process.argv[5] && process.argv[5] !== '--verbose') {
    console.log('Invalid command line arguments. Got ' + process.argv[5] + ' but expected --verbose or nothing.');
}
/// Utils ///
function log(msg) {
    if (verbose) {
        console.log(msg);
    }
}
// Copied from the compiler sources
function dir(path, spec, options) {
    options = options || {};
    function filesInFolder(folder) {
        var folder = switchToForwardSlashes(folder);
        var paths = [];
        // Everything after the current directory is relative
        var baseDirectoryLength = process.cwd().length + 1;
        try {
            var files = fs.readdirSync(folder);
            for (var i = 0; i < files.length; i++) {
                var stat = fs.statSync(folder + "/" + files[i]);
                if (options.recursive && stat.isDirectory()) {
                    paths = paths.concat(filesInFolder(folder + "/" + files[i]));
                }
                else if (stat.isFile() && (!spec || files[i].match(spec))) {
                    var relativePath = folder.substring(baseDirectoryLength);
                    paths.push(relativePath + "/" + files[i]);
                }
            }
        }
        catch (err) {
        }
        return paths;
    }
    return filesInFolder(path);
}
// fs.rmdirSync won't delete directories with files in it
function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            }
            else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}
;
function writeFile(path, data, opts) {
    try {
        fs.writeFileSync(path, data);
    }
    catch (e) {
        // assume file was written to a directory that exists, if not, start recursively creating them as necessary
        var parts = switchToForwardSlashes(path).split('/');
        for (var i = 0; i < parts.length; i++) {
            var subDir = parts.slice(0, i).join('/');
            if (!fs.existsSync(subDir)) {
                fs.mkdir(subDir);
            }
        }
        fs.writeFileSync(path, data);
    }
}
/// Request Handling ///
function handleResolutionRequest(filePath, res) {
    var resolvedPath = path.resolve(filePath, '');
    resolvedPath = resolvedPath.substring(resolvedPath.indexOf('tests'));
    resolvedPath = switchToForwardSlashes(resolvedPath);
    send('success', res, resolvedPath);
    return;
}
function send(result, res, contents, contentType) {
    if (contentType === void 0) { contentType = "binary"; }
    var responseCode = result === "success" ? 200 : result === "fail" ? 500 : result === 'unknown' ? 404 : parseInt(result);
    res.writeHead(responseCode, { "Content-Type": contentType });
    res.end(contents);
    return;
}
// Reads the data from a post request and passes it to the given callback
function processPost(req, res, callback) {
    var queryData = "";
    if (typeof callback !== 'function')
        return null;
    if (req.method == 'POST') {
        req.on('data', function (data) {
            queryData += data;
            if (queryData.length > 1e8) {
                queryData = "";
                send("413", res, null);
                console.log("ERROR: destroying connection");
                req.connection.destroy();
            }
        });
        req.on('end', function () {
            //res.post = url.parse(req.url).query;
            callback(queryData);
        });
    }
    else {
        send("405", res, null);
    }
}
var RequestType;
(function (RequestType) {
    RequestType[RequestType["GetFile"] = 0] = "GetFile";
    RequestType[RequestType["GetDir"] = 1] = "GetDir";
    RequestType[RequestType["ResolveFile"] = 2] = "ResolveFile";
    RequestType[RequestType["WriteFile"] = 3] = "WriteFile";
    RequestType[RequestType["DeleteFile"] = 4] = "DeleteFile";
    RequestType[RequestType["WriteDir"] = 5] = "WriteDir";
    RequestType[RequestType["DeleteDir"] = 6] = "DeleteDir";
    RequestType[RequestType["AppendFile"] = 7] = "AppendFile";
    RequestType[RequestType["Unknown"] = 8] = "Unknown";
})(RequestType || (RequestType = {}));
function getRequestOperation(req, filename) {
    if (req.method === 'GET' && req.url.indexOf('?') === -1) {
        if (req.url.indexOf('.') !== -1)
            return RequestType.GetFile;
        else
            return RequestType.GetDir;
    }
    else {
        var queryData = url.parse(req.url, true).query;
        if (req.method === 'GET' && queryData.resolve !== undefined)
            return RequestType.ResolveFile;
        // mocha uses ?grep=<regexp> query string as equivalent to the --grep command line option used to filter tests
        if (req.method === 'GET' && queryData.grep !== undefined)
            return RequestType.GetFile;
        if (req.method === 'POST' && queryData.action) {
            var path = req.url.substr(0, req.url.lastIndexOf('?'));
            var isFile = path.substring(path.lastIndexOf('/')).indexOf('.') !== -1;
            switch (queryData.action.toUpperCase()) {
                case 'WRITE':
                    return isFile ? RequestType.WriteFile : RequestType.WriteDir;
                case 'DELETE':
                    return isFile ? RequestType.DeleteFile : RequestType.DeleteDir;
                case 'APPEND':
                    return isFile ? RequestType.AppendFile : RequestType.Unknown;
            }
        }
        return RequestType.Unknown;
    }
}
function handleRequestOperation(req, res, operation, reqPath) {
    switch (operation) {
        case RequestType.GetDir:
            var filesInFolder = dir(reqPath, "", { recursive: true });
            send('success', res, filesInFolder.join(','));
            break;
        case RequestType.GetFile:
            fs.readFile(reqPath, function (err, file) {
                var ext = reqPath.substr(reqPath.lastIndexOf('.'));
                var contentType = 'binary';
                if (ext === '.js')
                    contentType = 'text/javascript';
                else if (ext === '.css')
                    contentType = 'text/javascript';
                else if (ext === '.html')
                    contentType = 'text/html';
                err
                    ? send('fail', res, err.message, contentType)
                    : send('success', res, file, contentType);
            });
            break;
        case RequestType.ResolveFile:
            var resolveRequest = req.url.match(/(.*)\?resolve/);
            handleResolutionRequest(resolveRequest[1], res);
            break;
        case RequestType.WriteFile:
            processPost(req, res, function (data) {
                writeFile(reqPath, data, { recursive: true });
            });
            send('success', res, null);
            break;
        case RequestType.WriteDir:
            fs.mkdirSync(reqPath);
            send('success', res, null);
            break;
        case RequestType.DeleteFile:
            if (fs.existsSync(reqPath)) {
                fs.unlinkSync(reqPath);
            }
            send('success', res, null);
            break;
        case RequestType.DeleteDir:
            if (fs.existsSync(reqPath)) {
                fs.rmdirSync(reqPath);
            }
            send('success', res, null);
            break;
        case RequestType.AppendFile:
            processPost(req, res, function (data) {
                fs.appendFileSync(reqPath, data);
            });
            send('success', res, null);
            break;
        case RequestType.Unknown:
        default:
            send('unknown', res, null);
            break;
    }
}
console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
http.createServer(function (req, res) {
    log(req.method + ' ' + req.url);
    var uri = url.parse(req.url).pathname;
    var reqPath = path.join(process.cwd(), uri);
    var operation = getRequestOperation(req, reqPath);
    handleRequestOperation(req, res, operation, reqPath);
}).listen(8888);
var browserPath;
if ((browser && browser === 'chrome')) {
    var defaultChromePath = "";
    switch (os.platform()) {
        case "win32":
        case "win64":
            defaultChromePath = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe";
            break;
        case "darwin":
            defaultChromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
            break;
        case "linux":
            defaultChromePath = "/opt/google/chrome/chrome";
            break;
        default:
            console.log("default Chrome location is unknown for platform '" + os.platform() + "'");
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
    var defaultIEPath = 'C:/Program Files/Internet Explorer/iexplore.exe';
    if (fs.existsSync(defaultIEPath)) {
        browserPath = defaultIEPath;
    }
    else {
        browserPath = browser;
    }
}
console.log('Using browser: ' + browserPath);
var queryString = grep ? "?grep=" + grep : '';
child_process.spawn(browserPath, ['http://localhost:' + port + '/tests/webTestResults.html' + queryString], {
    stdio: 'inherit'
});
//# sourceMappingURL=file:///C:/Users/lizhe/Documents/github/TypeScript/tests/webTestServer.js.map