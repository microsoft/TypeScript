import {
    API,
    type ParsedCommandLine,
} from "@typescript/typescript/async";
import assert from "node:assert";
import {
    describe,
    test,
} from "node:test";
import type { AsyncTransport } from "../../src/api/async/transport.ts";
import { TransportClient } from "../../src/api/async/transportClient.ts";
import { isSpawnOptions } from "../../src/api/options.ts";
import type {
    BatchRequestsParams,
    BatchRequestsResponse,
} from "../../src/api/proto.ts";

describe("async transport", () => {
    test("recognizes connection options inherited from the prototype", async () => {
        class SocketOptions {
            get pipe() {
                return "/socket";
            }
        }
        assert.strictEqual(isSpawnOptions(new SocketOptions()), /*expected*/ false);

        let closed = false;
        const transport: AsyncTransport = {
            request() {
                throw new Error("Unexpected request");
            },
            requestBinary() {
                throw new Error("Unexpected binary request");
            },
            close() {
                closed = true;
            },
        };
        class TransportOptions {
            get transport() {
                return transport;
            }
        }
        const api = new API(new TransportOptions());
        await api.close();
        assert.strictEqual(closed, /*expected*/ true);
    });

    test("handles callback results and promises with inherited then methods", async () => {
        let invokeCallback = (_name: string, _payload: string): string | PromiseLike<string> => {
            throw new Error("Callback not registered");
        };
        const client = new TransportClient({
            request() {
                throw new Error("Unexpected request");
            },
            requestBinary() {
                throw new Error("Unexpected binary request");
            },
            registerCallback(_name, callback) {
                invokeCallback = callback;
            },
            unregisterCallback() {},
            close() {},
        }, /*collectTiming*/ false);
        client.registerCallback("test", () => Promise.resolve({ result: "ok" }));
        assert.strictEqual(await invokeCallback("test", "{}"), '{"result":"ok"}');
        client.registerCallback("test", value => value);
        for (const json of ["null", "0", "false", '""']) {
            assert.strictEqual(invokeCallback("test", json), json);
        }
        client.registerCallback("test", () => undefined);
        assert.strictEqual(invokeCallback("test", "{}"), "");
        await client.close();
    });

    test("constructs an API over an injected transport", async () => {
        const methods: string[] = [];
        let batchParams: BatchRequestsParams | undefined;
        let closes = 0;
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
                    closes++;
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
        await Promise.all([api.close(), api.close()]);
        await api.close();
        assert.strictEqual(closes, 1);
    });

    test("rejects queued requests when closed", async () => {
        const emptyCommandLine: ParsedCommandLine = { options: {}, fileNames: [], errors: [] };
        const respond = (value: unknown) => ({ value: JSON.stringify(value), bytesSent: 0, bytesReceived: 0 });
        // Requests held in a manual batch, both before and after initialization.
        for (const initializeFirst of [false, true]) {
            const api = new API({
                transport: {
                    request(method) {
                        switch (method) {
                            case "initialize":
                                return respond({ currentDirectory: "/", useCaseSensitiveFileNames: true });
                            case "parseCommandLine":
                                return respond(emptyCommandLine);
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
            if (initializeFirst) {
                await api.parseCommandLine([]);
            }
            const batch = api.batchContext();
            const rejected = assert.rejects(api.parseCommandLine([]), /Client is closed/);
            await api.close();
            batch[Symbol.dispose]();
            await rejected;
        }

        // Text and binary requests closed before their microtask sends them.
        const client = new TransportClient({
            request() {
                throw new Error("Unexpected request");
            },
            requestBinary() {
                throw new Error("Unexpected binary request");
            },
            close() {},
        }, /*collectTiming*/ false);
        const text = client.apiRequest("parseCommandLine", { commandLine: [] });
        const binary = client.apiRequestBinary("getSourceFile", {
            snapshot: 1,
            project: 1,
            file: "/index.ts",
        });
        await client.close();
        await assert.rejects(text, /Client is closed/);
        await assert.rejects(binary, /Client is closed/);
    });

    test("can close a process client while initialization is manually batched", async () => {
        const api = new API({ cwd: process.cwd() });
        // @ts-ignore -- Internal client transport is exercised by source tests.
        await api.client.connect();
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
        }, /*collectTiming*/ false);

        const first = client.apiRequest("parseCommandLine", { commandLine: [] });
        const batch = client.batchContext();
        const second = client.apiRequest("parseCommandLine", { commandLine: [] });
        await Promise.resolve();
        assert.deepStrictEqual(methods, ["parseCommandLine"]);
        batch[Symbol.dispose]();
        await Promise.all([first, second]);
        await client.close();
    });

    test("keeps binary requests ordered and isolated inside a manual batch", async () => {
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
            requestBinary(method) {
                methods.push(method);
                throw new Error("could not read file");
            },
            close() {},
        }, /*collectTiming*/ false);

        const batch = client.batchContext();
        const binary = client.apiRequestBinary("getSourceFile", {
            snapshot: 1,
            project: 1,
            file: "/index.ts",
        });
        const text = client.apiRequest("parseCommandLine", { commandLine: [] });
        await Promise.resolve();
        assert.deepStrictEqual(methods, []);
        batch[Symbol.dispose]();
        await assert.rejects(binary, /could not read file/);
        assert.deepStrictEqual(await text, { options: {}, fileNames: [], errors: [] });
        assert.deepStrictEqual(methods, ["getSourceFile", "parseCommandLine"]);
        await client.close();
    });

    test("rejects in-flight requests when closed", async () => {
        const neverResolves = {
            request() {
                return new Promise<never>(() => {});
            },
            requestBinary() {
                throw new Error("Unexpected binary request");
            },
            close() {},
        };

        const client = new TransportClient(neverResolves, /*collectTiming*/ false);
        const request = client.apiRequest("parseCommandLine", { commandLine: [] });
        await Promise.resolve();
        await client.close();
        await assert.rejects(request, /Client is closed/);

        // The API's own initialize request is in flight here.
        const api = new API({ transport: neverResolves });
        const rejected = assert.rejects(api.parseCommandLine([]), /Client is closed/);
        await Promise.resolve();
        await api.close();
        await rejected;
    });

    test("rejects timing requests when closed", async () => {
        const methods: string[] = [];
        const client = new TransportClient({
            request(method) {
                methods.push(method);
                return new Promise(() => {});
            },
            requestBinary() {
                throw new Error("Unexpected binary request");
            },
            close() {},
        }, /*collectTiming*/ true);

        const timing = client.getTimingInfo();
        const reset = client.resetTimingInfo();
        await client.close();
        await assert.rejects(timing, /Client is closed/);
        await assert.rejects(reset, /Client is closed/);
        assert.deepStrictEqual(methods, []);
    });
});
