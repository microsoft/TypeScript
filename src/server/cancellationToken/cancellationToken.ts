/// <reference types="node" />


// TODO: extract services types
interface HostCancellationToken {
    isCancellationRequested(): boolean;
}

import fs = require("fs");

function createCancellationToken(args: string[]): HostCancellationToken {
    let cancellationPipeName: string;
    for (let i = 0; i < args.length - 1; i++) {
        if (args[i] === "--cancellationPipeName") {
            cancellationPipeName = args[i + 1];
            break;
        }
    }
    if (!cancellationPipeName) {
        return { isCancellationRequested: () => false };
    }
    return {
        isCancellationRequested() {
            try {
                fs.statSync(cancellationPipeName);
                return true;
            }
            catch (e) {
                return false;
            }
        }
    };
}
export = createCancellationToken;