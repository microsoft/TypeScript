"use strict";
var fs = require("fs");
function pipeExists(name) {
    try {
        fs.statSync(name);
        return true;
    }
    catch (e) {
        return false;
    }
}
function createCancellationToken(args) {
    var cancellationPipeName;
    for (var i = 0; i < args.length - 1; i++) {
        if (args[i] === "--cancellationPipeName") {
            cancellationPipeName = args[i + 1];
            break;
        }
    }
    if (!cancellationPipeName) {
        return {
            isCancellationRequested: function () { return false; },
            setRequest: function (_requestId) { return void 0; },
            resetRequest: function (_requestId) { return void 0; }
        };
    }
    if (cancellationPipeName.charAt(cancellationPipeName.length - 1) === "*") {
        var namePrefix_1 = cancellationPipeName.slice(0, -1);
        if (namePrefix_1.length === 0 || namePrefix_1.indexOf("*") >= 0) {
            throw new Error("Invalid name for template cancellation pipe: it should have length greater than 2 characters and contain only one '*'.");
        }
        var perRequestPipeName_1;
        var currentRequestId_1;
        return {
            isCancellationRequested: function () { return perRequestPipeName_1 !== undefined && pipeExists(perRequestPipeName_1); },
            setRequest: function (requestId) {
                currentRequestId_1 = requestId;
                perRequestPipeName_1 = namePrefix_1 + requestId;
            },
            resetRequest: function (requestId) {
                if (currentRequestId_1 !== requestId) {
                    throw new Error("Mismatched request id, expected " + currentRequestId_1 + ", actual " + requestId);
                }
                perRequestPipeName_1 = undefined;
            }
        };
    }
    else {
        return {
            isCancellationRequested: function () { return pipeExists(cancellationPipeName); },
            setRequest: function (_requestId) { return void 0; },
            resetRequest: function (_requestId) { return void 0; }
        };
    }
}
module.exports = createCancellationToken;
//# sourceMappingURL=cancellationToken.js.map