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
<<<<<<< HEAD
define(["require", "exports", "fs"], function (require, exports, fs) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function readdir(path, accept, callback) { }
    function join(...paths) { }
    function instrumentFile(covFileDir, covFileName, originalFilePath) {
        fs.readFile(originalFilePath, () => {
            readdir(covFileDir, () => {
            }, (error, files) => {
                files.forEach((file) => {
                    var fullPath = join(IDoNotExist);
                });
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
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
=======
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
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
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
            });
        });
    });
}
