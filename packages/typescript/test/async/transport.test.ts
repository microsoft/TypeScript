import {
    API,
    type ParsedCommandLine,
} from "@typescript/typescript/unstable/async";
import assert from "node:assert";
import {
    describe,
    test,
} from "node:test";
import { TransportClient } from "../../src/api/async/transportClient.ts";
import type {
    BatchRequestsParams,
    BatchRequestsResponse,
} from "../../src/api/proto.ts";

describe("async transport", () => {
    test("constructs an API over an injected transport", async () => {
        const methods: string[] = [];
        let batchParams: BatchRequestsParams | undefined;
        let closed = false;
        const api = new API({
            maxResponseBytesPerPage: 1,
            transport: {
                request(method, payload) {
                    methods.push(method);
                    switch (method) {
                        case "initialize":
                            return {
                                value: JSON.stringify({
                                    currentDirectory: "/",
                                    useCaseSensitiveFileNames: true,
                                }),
                                bytesSent: 0,
                                bytesReceived: 0,
                            };
                        case "parseCommandLine":
                            return {
                                value: JSON.stringify(
                                    {
                                        options: {},
                                        fileNames: [],
                                        errors: [],
                                    } satisfies ParsedCommandLine,
                                ),
                                bytesSent: 0,
                                bytesReceived: 0,
                            };
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
                            return {
                                value: JSON.stringify(response),
                                bytesSent: 0,
                                bytesReceived: 0,
                            };
                        }
                        default:
                            throw new Error(`Unexpected method: ${method}`);
                    }
                },
                requestBinary() {
                    throw new Error("Unexpected binary request");
                },
                close() {
                    closed = true;
                },
            },
        });

        assert.deepStrictEqual(await api.parseCommandLine([]), {
            options: {},
            fileNames: [],
            errors: [],
        });
        let batchRequests: Promise<ParsedCommandLine>[];
        {
            using _ = api.batchContext();
            batchRequests = [api.parseCommandLine([]), api.parseCommandLine([])];
        }
        await Promise.all(batchRequests);
        assert.deepStrictEqual(methods, ["initialize", "parseCommandLine", "batchRequests"]);
        assert.strictEqual(batchParams?.maxResponseBytesPerPage, 1);
        await api.close();
        assert.strictEqual(closed, true);
    });

    test("rejects requests queued when the transport closes", async () => {
        const api = new API({
            transport: {
                request(method) {
                    switch (method) {
                        case "initialize":
                            return {
                                value: JSON.stringify({
                                    currentDirectory: "/",
                                    useCaseSensitiveFileNames: true,
                                }),
                                bytesSent: 0,
                                bytesReceived: 0,
                            };
                        case "parseCommandLine":
                            return {
                                value: JSON.stringify(
                                    {
                                        options: {},
                                        fileNames: [],
                                        errors: [],
                                    } satisfies ParsedCommandLine,
                                ),
                                bytesSent: 0,
                                bytesReceived: 0,
                            };
                        default:
                            throw new Error(`Unexpected method: ${method}`);
                    }
                },
                requestBinary() {
                    throw new Error("Unexpected binary request");
                },
                close() {},
            },
        });

        await api.parseCommandLine([]);
        const batch = api.batchContext();
        const request = api.parseCommandLine([]);
        const rejected = assert.rejects(request, /Client is closed/);
        await api.close();
        batch[Symbol.dispose]();
        await rejected;
    });

    test("can close while initialization is manually batched", async () => {
        const api = new API({
            transport: {
                request(method) {
                    if (method !== "initialize") {
                        throw new Error(`Unexpected method: ${method}`);
                    }
                    return {
                        value: JSON.stringify({
                            currentDirectory: "/",
                            useCaseSensitiveFileNames: true,
                        }),
                        bytesSent: 0,
                        bytesReceived: 0,
                    };
                },
                requestBinary() {
                    throw new Error("Unexpected binary request");
                },
                close() {},
            },
        });

        const batch = api.batchContext();
        const request = api.parseCommandLine([]);
        const rejected = assert.rejects(request, /Client is closed/);
        await api.close();
        batch[Symbol.dispose]();
        await rejected;
    });

    test("does not flush a manual batch from a stale microtask", async () => {
        const methods: string[] = [];
        const client = new TransportClient({
            request(method) {
                methods.push(method);
                if (method !== "parseCommandLine") {
                    throw new Error(`Unexpected method: ${method}`);
                }
                return {
                    value: JSON.stringify(
                        {
                            options: {},
                            fileNames: [],
                            errors: [],
                        } satisfies ParsedCommandLine,
                    ),
                    bytesSent: 0,
                    bytesReceived: 0,
                };
            },
            requestBinary() {
                throw new Error("Unexpected binary request");
            },
            close() {},
        }, false);

        await client.connect();
        const first = client.apiRequest("parseCommandLine", { commandLine: [] });
        const batch = client.batchContext();
        const second = client.apiRequest("parseCommandLine", { commandLine: [] });
        await Promise.resolve();
        assert.deepStrictEqual(methods, ["parseCommandLine"]);
        batch[Symbol.dispose]();
        await Promise.all([first, second]);
        await client.close();
    });

    test("keeps binary requests ordered inside a manual batch", async () => {
        const methods: string[] = [];
        const client = new TransportClient({
            request(method) {
                methods.push(method);
                return {
                    value: JSON.stringify(
                        {
                            options: {},
                            fileNames: [],
                            errors: [],
                        } satisfies ParsedCommandLine,
                    ),
                    bytesSent: 0,
                    bytesReceived: 0,
                };
            },
            requestBinary(method, payload) {
                methods.push(method);
                return {
                    value: payload,
                    bytesSent: payload.length,
                    bytesReceived: payload.length,
                };
            },
            close() {},
        }, false);

        await client.connect();
        const batch = client.batchContext();
        const text = client.apiRequest("parseCommandLine", { commandLine: [] });
        const binary = client.apiRequestBinary("getSourceFile", {
            snapshot: 1,
            project: "project",
            file: "/index.ts",
        });
        await Promise.resolve();
        assert.deepStrictEqual(methods, []);
        batch[Symbol.dispose]();
        await Promise.all([text, binary]);
        assert.deepStrictEqual(methods, ["parseCommandLine", "getSourceFile"]);
        await client.close();
    });

    test("rejects requests that are still active when closed", async () => {
        let resolveRequest:
            | ((value: {
                value: string;
                bytesSent: number;
                bytesReceived: number;
            }) => void)
            | undefined;
        const client = new TransportClient({
            request() {
                return new Promise(resolve => {
                    resolveRequest = resolve;
                });
            },
            requestBinary() {
                throw new Error("Unexpected binary request");
            },
            close() {},
        }, false);

        await client.connect();
        const request = client.apiRequest("parseCommandLine", { commandLine: [] });
        await Promise.resolve();
        await client.close();
        await assert.rejects(request, /Client is closed/);
        resolveRequest?.({
            value: JSON.stringify(
                {
                    options: {},
                    fileNames: [],
                    errors: [],
                } satisfies ParsedCommandLine,
            ),
            bytesSent: 0,
            bytesReceived: 0,
        });
    });

    test("can close while initialization is in flight", async () => {
        const api = new API({
            transport: {
                request() {
                    return new Promise(() => {});
                },
                requestBinary() {
                    throw new Error("Unexpected binary request");
                },
                close() {},
            },
        });

        const request = api.parseCommandLine([]);
        const rejected = assert.rejects(request, /Client is closed/);
        await Promise.resolve();
        await api.close();
        await rejected;
    });

    test("rejects timing requests when closed", async () => {
        const client = new TransportClient({
            request() {
                return new Promise(() => {});
            },
            requestBinary() {
                throw new Error("Unexpected binary request");
            },
            close() {},
        }, true);

        await client.connect();
        const timing = client.getTimingInfo();
        const reset = client.resetTimingInfo();
        await client.close();
        await assert.rejects(timing, /Client is closed/);
        await assert.rejects(reset, /Client is closed/);
    });

    test("does not queue requests after closing during connect", async () => {
        const client = new TransportClient({
            request() {
                throw new Error("Unexpected request");
            },
            requestBinary() {
                throw new Error("Unexpected binary request");
            },
            close() {},
        }, false);

        const text = client.apiRequest("parseCommandLine", { commandLine: [] });
        const binary = client.apiRequestBinary("getSourceFile", {
            snapshot: 1,
            project: "project",
            file: "/index.ts",
        });
        await client.close();
        await assert.rejects(text, /Client is closed/);
        await assert.rejects(binary, /Client is closed/);
    });
});
