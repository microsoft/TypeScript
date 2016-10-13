/// <reference types="node"/>

import fs = require("fs");

// TODO: remove after extrating services types into separate .d.ts file
interface ServerCancellationToken {
    isCancellationRequested(): boolean;
    attachToRequest(requestId: number): void;
    detachFromRequest(requestId: number): void;
}

function isPipeExist(name: string): boolean {
    try {
        fs.statSync(name);
        return true;
    }
    catch (e) {
        return false;
    }
}

function createCancellationToken(args: string[]): ServerCancellationToken {
    let cancellationPipeName: string;
    for (let i = 0; i < args.length - 1; i++) {
        if (args[i] === "--cancellationPipeName") {
            cancellationPipeName = args[i + 1];
            break;
        }
    }
    if (!cancellationPipeName) {
        return {
            isCancellationRequested: () => false,
            attachToRequest: (requestId: number): void => void 0,
            detachFromRequest: (requestId: number): void => void 0
        };
    }
    if (cancellationPipeName.charAt(cancellationPipeName.length - 1) === "*") {
        const namePrefix = cancellationPipeName.substring(0, cancellationPipeName.length - 1);
        if (namePrefix.length === 0 || namePrefix.indexOf("*") >= 0) {
            throw new Error("Invalid name for template cancellation pipe: it should have length greater than 2 characters and contain only one '*'.");
        }
        let perRequestPipeName: string;
        return {
            isCancellationRequested: () =>  perRequestPipeName !== undefined && isPipeExist(perRequestPipeName),
            attachToRequest(requestId: number) {
                perRequestPipeName = namePrefix + requestId;
            },
            detachFromRequest(requestId: number) {
                perRequestPipeName = undefined;
            }
        };
    }
    else {
        return {
            isCancellationRequested: () => isPipeExist(cancellationPipeName),
            attachToRequest: (requestId: number): void => void 0,
            detachFromRequest: (requestId: number): void => void 0
        };
    }
}
export = createCancellationToken;