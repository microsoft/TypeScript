
/// <reference path="meta/jake.d.ts" />

var fs = require("fs");
var path = require("path");
function getDiffTool() {
    var program = process.env['DIFF'] || null;
    if (!program) {
		// auto-detect WinMerge
        var winMerge = path.join(process.env['ProgramFiles'], 'WinMerge', 'WinMergeU.exe');
        if (fs.existsSync(winMerge))
            program = winMerge;
    }
    if (!program)
        throw new Error("Add the %DIFF% environment variable to the path of the program you want to use.");
    return program;
}
exports.getDiffTool = getDiffTool;
function checkAdmin(cb, errorMsg) {
    var ex = jake.createExec("net session");
    ex.addListener("error", function (err) {
        console.log(errorMsg || 'This command requires administrator privileges (elevated prompt).');
    });
    ex.addListener("cmdEnd", function () {
        cb();
    });
    ex.run();
}
exports.checkAdmin = checkAdmin;
function getOriginalExt() {
    return '.orig';
}
exports.getOriginalExt = getOriginalExt;
function findTsPathsOfVS() {
    var paths = {
        'tsc': null,
        'tsc.lib.d': null,
        'services': null,
        'services.lib.d': null,
    };
    var oext = getOriginalExt();
    var tscReleases = ['1.1', '1.0'];
    var fpath = '';
    for (var i in tscReleases) {
        fpath = path.join(process.env['ProgramFiles'], 'Microsoft SDKs', 'TypeScript', tscReleases[i], 'tsc.js');
        if (fs.existsSync(fpath) || fs.existsSync(fpath + oext)) {
            paths['tsc'] = fpath;
            paths['tsc.lib.d'] = path.join(path.dirname(fpath), 'lib.d.ts');
            break;
        }
    }
    if (!paths.tsc)
        throw new Error("Could not find TypeScript SDK " + tscReleases.join(','));

	// Try env variables first
    var extPath = path.normalize('Common7/IDE/CommonExtensions/Microsoft/TypeScript/typescriptServices.js');
    var vsVersions = ['12.0', '11.0'];
    var checkPaths = [];
    for (var i in vsVersions) {
        var num = vsVersions[i].replace('.', '');
        if (process.env['VS' + num + 'COMNTOOLS']) {
            checkPaths.push(path.join(process.env['VS' + num + 'COMNTOOLS'], '..', '..', extPath));
        }
        checkPaths.push(path.join(process.env['ProgramFiles'], 'Microsoft Visual Studio ' + vsVersions[i], extPath));
    }
    for (var i in checkPaths) {
        fpath = checkPaths[i];
        if (fs.existsSync(fpath) || fs.existsSync(fpath + oext)) {
            paths['services'] = fpath;
            paths['services.lib.d'] = path.join(path.dirname(fpath), 'lib.d.ts');
            break;
        }
    }
    if (!paths.services)
        throw new Error("Could not find TypeScript Services for Visual Studio " + vsVersions.join(','));
    return paths;
}
exports.findTsPathsOfVS = findTsPathsOfVS;
function unlinkPaths(paths) {
    for (var i in paths) {
        try {
            fs.unlinkSync(paths[i]);
        }
        catch (e) {
        }
    }
}
exports.unlinkPaths = unlinkPaths;
