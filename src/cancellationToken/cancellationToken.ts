import * as fs from "fs";

interface ServerCancellationToken {
    isCancellationRequested(): boolean;
    setRequest(requestId: number): void;
    resetRequest(requestId: number): void;
}

function pipeExists(name: string): boolean {
    // Unlike statSync, existsSync doesn't throw an exception if the target doesn't exist.
    // A comment in the node code suggests they're stuck with that decision for back compat
    // (https://github.com/nodejs/node/blob/9da241b600182a9ff400f6efc24f11a6303c27f7/lib/fs.js#L222).
    // Caveat: If a named pipe does exist, the first call to existsSync will return true, as for
    // statSync.  Subsequent calls will return false, whereas statSync would throw an exception
    // indicating that the pipe was busy.  The difference is immaterial, since our statSync
    // implementation returned false from its catch block.
    return fs.existsSync(name);
}

function createCancellationToken(args: string[]): ServerCancellationToken {
    let cancellationPipeName: string | undefined;
    for (let i = 0; i < args.length - 1; i++) {
        if (args[i] === "--cancellationPipeName") {
            cancellationPipeName = args[i + 1];
            break;
        }
    }
    if (!cancellationPipeName) {
        return {
            isCancellationRequested: () => false,
            setRequest: (_requestId: number): void => void 0,
            resetRequest: (_requestId: number): void => void 0,
        };
    }
    // cancellationPipeName is a string without '*' inside that can optionally end with '*'
    // when client wants to signal cancellation it should create a named pipe with name=<cancellationPipeName>
    // server will synchronously check the presence of the pipe and treat its existence as indicator that current request should be canceled.
    // in case if client prefers to use more fine-grained schema than one name for all request it can add '*' to the end of cancellationPipeName.
    // in this case pipe name will be build dynamically as <cancellationPipeName><request_seq>.
    if (cancellationPipeName.charAt(cancellationPipeName.length - 1) === "*") {
        const namePrefix = cancellationPipeName.slice(0, -1);
        if (namePrefix.length === 0 || namePrefix.indexOf("*") >= 0) {
            throw new Error("Invalid name for template cancellation pipe: it should have length greater than 2 characters and contain only one '*'.");
        }
        let perRequestPipeName: string | undefined;
        let currentRequestId: number;
        return {
            isCancellationRequested: () => perRequestPipeName !== undefined && pipeExists(perRequestPipeName),
            setRequest(requestId: number) {
                currentRequestId = requestId;
                perRequestPipeName = namePrefix + requestId;
            },
            resetRequest(requestId: number) {
                if (currentRequestId !== requestId) {
                    throw new Error(`Mismatched request id, expected ${currentRequestId}, actual ${requestId}`);
                }
                perRequestPipeName = undefined;
            },
        };
    }
    else {
        return {
            isCancellationRequested: () => pipeExists(cancellationPipeName!), // TODO: GH#18217
            setRequest: (_requestId: number): void => void 0,
            resetRequest: (_requestId: number): void => void 0,
        };
    }
}
export = createCancellationToken;
