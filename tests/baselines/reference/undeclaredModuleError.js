//// [tests/cases/compiler/undeclaredModuleError.ts] ////

//// [undeclaredModuleError.ts]
import fs = require('fs');
function readdir(path: string, accept: (stat: fs.Stats, name: string) => boolean, callback: (error: Error, results: { name: string; stat: fs.Stats; }[]) => void ) {}

function join(...paths: string[]) {}

function instrumentFile(covFileDir: string, covFileName: string, originalFilePath: string) {
    fs.readFile(originalFilePath, () => {       
        readdir(covFileDir, () => {
        } , (error: Error, files: {}[]) => {
                files.forEach((file) => {
                    var fullPath = join(IDoNotExist);
                } );
            } );
    } );
}

//// [undeclaredModuleError.js]
define(["require", "exports", "fs"], function (require, exports, fs) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function readdir(path, accept, callback) { }
    function join() {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
    }
    function instrumentFile(covFileDir, covFileName, originalFilePath) {
        fs.readFile(originalFilePath, function () {
            readdir(covFileDir, function () {
            }, function (error, files) {
                files.forEach(function (file) {
                    var fullPath = join(IDoNotExist);
                });
            });
        });
    }
});
