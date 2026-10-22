import {
    API,
    type ParsedCommandLine,
} from "@typescript/typescript/sync";
import assert from "node:assert";
import {
    describe,
    test,
} from "node:test";
import type {
    BatchRequestsParams,
    BatchRequestsResponse,
} from "../../src/api/proto.ts";

describe("sync transport", () => {
    test("constructs an API over an injected transport", () => {
        const methods: string[] = [];
        let batchParams: BatchRequestsParams | undefined;
        let closed = false;
        const api = new API({
            maxResponseBytesPerPage: 1,
            transport: {
                lastBytesSent: 0,
                lastBytesReceived: 0,
                requestSync(method, payload) {
                    methods.push(method);
                    switch (method) {
                        case "initialize":
                            return JSON.stringify({
                                currentDirectory: "/",
                                useCaseSensitiveFileNames: true,
                            });
                        case "parseCommandLine":
                            return JSON.stringify(
                                {
                                    options: {},
                                    fileNames: [],
                                    errors: [],
                                } satisfies ParsedCommandLine,
                            );
                        case "batchRequests": {
                            batchParams = JSON.parse(payload) as BatchRequestsParams;
                            assert.ok(batchParams.requests);
                            const response: BatchRequestsResponse = {
                                responses: batchParams.requests.map(request => ({
                                    method: request.method,
                                    result: {
                                        options: {},
                                        fileNames: [],
                                        errors: [],
                                    } satisfies ParsedCommandLine,
                                })),
                            };
                            return JSON.stringify(response);
                        }
                        default:
                            throw new Error(`Unexpected method: ${method}`);
                    }
                },
                requestBinarySync() {
                    throw new Error("Unexpected binary request");
                },
                close() {
                    closed = true;
                },
            },
        });

        assert.deepStrictEqual(api.parseCommandLine([]), {
            options: {},
            fileNames: [],
            errors: [],
        });
        assert.deepStrictEqual(
            api.batch(api.parseCommandLine.gen([]), api.parseCommandLine.gen([])),
            [
                { options: {}, fileNames: [], errors: [] },
                { options: {}, fileNames: [], errors: [] },
            ],
        );
        assert.deepStrictEqual(methods, ["initialize", "parseCommandLine", "batchRequests"]);
        assert.strictEqual(batchParams?.maxResponseBytesPerPage, 1);
        api.close();
        assert.strictEqual(closed, true);
    });
});
