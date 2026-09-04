import {
    type WasmReactorExports,
    WasmTransport,
} from "@typescript/typescript-wasip1-wasm";
import {
    API,
    type ParsedCommandLine,
} from "@typescript/typescript/unstable/sync";
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

    test("drives the WASM reactor ABI", () => {
        const memory = { buffer: new ArrayBuffer(65536) };
        const requestPointer = 0;
        const responsePointer = 4096;
        let responseLength = 0;
        let closed = false;
        const files = new Map<string, string>();

        function setResponse(value: string | Uint8Array) {
            const bytes = typeof value === "string" ? new TextEncoder().encode(value) : value;
            new Uint8Array(memory.buffer).set(bytes, responsePointer);
            responseLength = bytes.length;
        }

        const exports: WasmReactorExports = {
            memory,
            create_session() {
                setResponse("");
                return 0;
            },
            close_session() {
                closed = true;
            },
            get_request_buffer() {
                return requestPointer;
            },
            handle_request(methodLength, payloadLength) {
                const bytes = new Uint8Array(memory.buffer);
                const method = new TextDecoder().decode(bytes.subarray(requestPointer, requestPointer + methodLength));
                const payload = bytes.slice(requestPointer + methodLength, requestPointer + methodLength + payloadLength);
                if (method === "text") {
                    setResponse(new TextDecoder().decode(payload).toUpperCase());
                }
                else {
                    setResponse(payload.reverse());
                }
                return 0;
            },
            set_file(pathLength, contentLength) {
                const bytes = new Uint8Array(memory.buffer);
                const path = new TextDecoder().decode(bytes.subarray(requestPointer, requestPointer + pathLength));
                const content = new TextDecoder().decode(
                    bytes.subarray(requestPointer + pathLength, requestPointer + pathLength + contentLength),
                );
                files.set(path, content);
                return 0;
            },
            read_file(pathLength) {
                const path = new TextDecoder().decode(new Uint8Array(memory.buffer, requestPointer, pathLength));
                const content = files.get(path);
                if (content === undefined) {
                    setResponse("");
                    return 2;
                }
                setResponse(content);
                return 0;
            },
            remove_file(pathLength) {
                const path = new TextDecoder().decode(new Uint8Array(memory.buffer, requestPointer, pathLength));
                files.delete(path);
                return 0;
            },
            response_ptr: () => responsePointer,
            response_len: () => responseLength,
        };

        const transport = new WasmTransport({
            instance: { exports },
            cwd: "/workspace",
        });
        transport.setFile("/workspace/index.ts", "const value = 1;");
        assert.strictEqual(files.get("/workspace/index.ts"), "const value = 1;");
        assert.strictEqual(transport.readFile("/workspace/index.ts"), "const value = 1;");
        assert.strictEqual(transport.readFile("/workspace/missing.ts"), undefined);
        assert.strictEqual(transport.requestSync("text", "hello"), "HELLO");
        assert.deepStrictEqual(transport.requestBinarySync("binary", new Uint8Array([1, 2, 3])), new Uint8Array([3, 2, 1]));
        transport.removeFile("/workspace/index.ts");
        assert.strictEqual(files.has("/workspace/index.ts"), false);
        transport.close();
        assert.strictEqual(closed, true);
        assert.throws(
            () => transport.setFileSystem({ writeFile() {} }),
            /TypeScript WASM transport is closed/,
        );
    });
});
