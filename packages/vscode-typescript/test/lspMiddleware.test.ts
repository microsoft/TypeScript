import type { ExtensionAPI } from "@typescript/typescript/unstable/vscode";
import assert from "node:assert/strict";
import { PassThrough } from "node:stream";
import test, { describe } from "node:test";
import {
    CancellationToken,
    CancellationTokenSource,
    createProtocolConnection,
    type Diagnostic,
    HoverRequest,
    PublishDiagnosticsNotification,
    type PublishDiagnosticsParams,
} from "vscode-languageserver-protocol/node";
import {
    type FirstPartyLspMiddleware,
    LspMiddlewareRegistry,
} from "../src/lspMiddleware";

const params = { textDocument: { uri: "file:///test.ts" }, position: { line: 0, character: 0 } };

function deferred() {
    let resolve!: () => void;
    const promise = new Promise<void>(resolver => {
        resolve = resolver;
    });
    return { promise, resolve };
}

describe("LSP middleware", () => {
    test("transforms raw results in registration order without changing requests", async () => {
        const registry = new LspMiddlewareRegistry(() => assert.fail("Unexpected error"));
        registry.register("textDocument/hover", (result, context) => {
            assert.deepEqual(context.params, params);
            assert.notEqual(context.params, params);
            assert.equal(Object.isFrozen(context.params.textDocument), false);
            return result && { ...result, contents: "first" };
        });
        registry.register("textDocument/hover", async result => {
            assert.equal(result?.contents, "first");
            return result && { ...result, contents: "second" };
        });
        const original = { contents: "server", canIncreaseVerbosity: true };
        let requests = 0;
        const result = await registry.sendRequest("textDocument/hover", params, undefined, async (type, sentParams, token) => {
            requests++;
            assert.equal(type, "textDocument/hover");
            assert.equal(sentParams, params);
            assert.equal(token, undefined);
            return original;
        });
        assert.equal(requests, 1);
        assert.deepEqual(result, { contents: "second", canIncreaseVerbosity: true });
        assert.equal(original.contents, "server");
    });

    test("rejects excluded methods at registration", () => {
        const registry = new LspMiddlewareRegistry(() => assert.fail("Unexpected error"));
        for (
            const method of [
                "initialize",
                "shutdown",
                "initialized",
                "exit",
                "textDocument/didOpen",
                "textDocument/didChange",
                "textDocument/publishDiagnostics",
                "window/logMessage",
                "window/showMessage",
                "workspace/didChangeConfiguration",
                "workspace/willRenameFiles",
                "workspace/executeCommand",
                "workspace/diagnostic/refresh",
                "client/registerCapability",
                "custom/initializeAPISession",
                "custom/setContentMapperContributions",
                "custom/runGC",
                "custom/projectInfo",
                "$/progress",
                "unknown/feature",
                "__proto__",
            ]
        ) {
            // @ts-expect-error Non-feature methods are also rejected at runtime.
            assert.throws(() => registry.register(method, result => result), /not supported/);
        }
    });

    test("rejects invalid callbacks and registration after extension disposal", () => {
        const registry = new LspMiddlewareRegistry(() => assert.fail("Unexpected error"));
        // @ts-expect-error Invalid JavaScript consumers are checked at runtime too.
        assert.throws(() => registry.register("textDocument/hover", {}), /must be a function/);
        registry.dispose();
        assert.throws(() => registry.register("textDocument/hover", result => result), /disposed/);
    });

    test("passes excluded requests through unchanged", async () => {
        const registry = new LspMiddlewareRegistry(() => assert.fail("Unexpected error"));
        registry.register("textDocument/hover", () => assert.fail("Excluded request intercepted"));
        const original = { result: "unchanged" };
        const token = CancellationToken.None;
        for (const method of ["initialize", "shutdown", "custom/projectInfo", "textDocument/didOpen", "textDocument/publishDiagnostics"]) {
            assert.equal(
                await registry.sendRequest(method, params, token, async (type, sentParams, sentToken) => {
                    assert.equal(type, method);
                    assert.equal(sentParams, params);
                    assert.equal(sentToken, token);
                    return original;
                }),
                original,
            );
        }
    });

    test("handles protocol request signatures and preserves token identity", async () => {
        const registry = new LspMiddlewareRegistry(() => assert.fail("Unexpected error"));
        const token = CancellationToken.None;
        registry.register("textDocument/hover", result => result && { ...result, contents: "transformed" });
        const result = await registry.sendRequest(HoverRequest.type, params, token, async (type, sentParams, sentToken) => {
            assert.equal(type, HoverRequest.type);
            assert.equal(sentParams, params);
            assert.equal(sentToken, token);
            return { contents: "server" };
        });
        assert.deepEqual(result, { contents: "transformed" });
    });

    test("passes server failures through without invoking middleware or logging a transformer error", async () => {
        const registry = new LspMiddlewareRegistry(() => assert.fail("Server errors are not transformer errors"));
        registry.register("textDocument/hover", () => assert.fail("No successful result"));
        const failure = new Error("Server failure");
        await assert.rejects(
            registry.sendRequest("textDocument/hover", params, undefined, async () => {
                throw failure;
            }),
            error => error === failure,
        );
    });

    test("preserves null and empty responses and permits intentional replacements", async () => {
        const registry = new LspMiddlewareRegistry(() => assert.fail("Unexpected error"));
        assert.equal(await registry.sendRequest("textDocument/hover", params, undefined, async () => null), null);
        const empty: Diagnostic[] = [];
        const original = { kind: "full", items: empty };
        assert.equal(await registry.sendRequest("textDocument/diagnostic", params, undefined, async () => original), original);
        registry.register("textDocument/hover", result => result ?? { contents: "replacement" });
        assert.deepEqual(await registry.sendRequest("textDocument/hover", params, undefined, async () => null), { contents: "replacement" });
        registry.register("textDocument/diagnostic", result => {
            if (result.kind === "full") assert.equal(result.items.length, 0);
            return result;
        });
        assert.deepEqual(await registry.sendRequest("textDocument/diagnostic", params, undefined, async () => original), original);
    });

    test("isolates mutable context copies between callbacks and from outgoing parameters", async () => {
        const registry = new LspMiddlewareRegistry(() => assert.fail("Unexpected error"));
        let firstContext: unknown;
        registry.register("textDocument/hover", (result, context) => {
            firstContext = context;
            assert.equal(Object.isFrozen(context), false);
            assert.equal(Object.isFrozen(context.params.textDocument), false);
            // @ts-expect-error Deliberate runtime mutation of readonly request context.
            context.params.textDocument.uri = "file:///modified.ts";
            // @ts-expect-error Nested context mutations must also remain isolated.
            context.params.position.line = 42;
            return result && { ...result, contents: "first" };
        });
        registry.register("textDocument/hover", async (result, context) => {
            assert.notEqual(context, firstContext);
            assert.deepEqual(context.params, params);
            assert.equal(result?.contents, "first");
            // @ts-expect-error Deliberate mutation of this callback's independent copy.
            context.params.textDocument.uri = "file:///second.ts";
            await Promise.resolve();
            return result;
        });
        registry.register("textDocument/hover", (result, context) => {
            assert.deepEqual(context.params, params);
            return result;
        });
        const original = { contents: "server" };
        assert.deepEqual(await registry.sendRequest("textDocument/hover", params, undefined, async () => original), { contents: "first" });
        assert.equal(params.textDocument.uri, "file:///test.ts");
        assert.equal(params.position.line, 0);
        assert.deepEqual(original, { contents: "server" });
    });

    test("captures registrations on response arrival, not request dispatch", async () => {
        const registry = new LspMiddlewareRegistry(() => assert.fail("Unexpected error"));
        const response = deferred();
        const running = registry.sendRequest("textDocument/hover", params, undefined, async () => {
            await response.promise;
            return { contents: "server" };
        });
        registry.register("textDocument/hover", () => ({ contents: "registered while waiting" }));
        response.resolve();
        assert.deepEqual(await running, { contents: "registered while waiting" });
    });

    test("skips remaining transformers when cancellation is requested", async () => {
        const registry = new LspMiddlewareRegistry(() => assert.fail("Unexpected error"));
        const source = new CancellationTokenSource();
        const original = { contents: "server" };
        registry.register("textDocument/hover", result => {
            source.cancel();
            return result && { ...result, contents: "cancelled" };
        });
        registry.register("textDocument/hover", () => assert.fail("Cancelled chain must stop"));
        assert.equal(await registry.sendRequest("textDocument/hover", params, source.token, async () => original), original);
        assert.equal(await registry.sendRequest("textDocument/hover", params, source.token, async () => original), original);
        source.dispose();
    });

    test("logs failures, stops the chain, and restores pristine original data", async () => {
        const errors: unknown[] = [];
        const registry = new LspMiddlewareRegistry((method, error) => {
            assert.equal(method, "textDocument/hover");
            errors.push(error);
        });
        registry.register("textDocument/hover", result => {
            if (result) result.contents = "mutated";
            return result;
        });
        const failure = new Error("Transformer failed");
        registry.register("textDocument/hover", async () => {
            throw failure;
        });
        registry.register("textDocument/hover", () => assert.fail("Chain must stop"));
        const original = { contents: "server" };
        assert.equal(await registry.sendRequest("textDocument/hover", params, undefined, async () => original), original);
        assert.deepEqual(original, { contents: "server" });
        assert.deepEqual(errors, [failure]);
    });

    test("disposal is idempotent and affects future chains, not a running chain", async () => {
        const registry = new LspMiddlewareRegistry(() => assert.fail("Unexpected error"));
        const gate = deferred();
        const started = deferred();
        registry.register("textDocument/hover", async result => {
            started.resolve();
            await gate.promise;
            return result;
        });
        let calls = 0;
        const disposable = registry.register("textDocument/hover", result => {
            calls++;
            return result;
        });
        const running = registry.sendRequest("textDocument/hover", params, undefined, async () => null);
        await started.promise;
        disposable.dispose();
        disposable.dispose();
        gate.resolve();
        await running;
        await registry.sendRequest("textDocument/hover", params, undefined, async () => null);
        assert.equal(calls, 1);
    });
});

describe("first-party middleware", () => {
    test("uses original parameters and results without cloning or freezing", async () => {
        const request = { query: "symbol", local: () => "not cloneable" };
        const original = { local: () => "not cloneable" };
        const middleware: FirstPartyLspMiddleware = async (type, sentParams, token, next) => {
            assert.equal(sentParams, request);
            assert.equal(Object.isFrozen(sentParams), false);
            return next(type, sentParams, token);
        };
        const registry = new LspMiddlewareRegistry(() => assert.fail("Unexpected error"), [middleware]);
        const result = await registry.sendRequest("workspace/symbol", request, CancellationToken.None, async (_type, sentParams, token) => {
            assert.equal(sentParams, request);
            assert.equal(token, CancellationToken.None);
            return original;
        });
        assert.equal(result, original);
        assert.equal(Object.isFrozen(request), false);
    });

    test("supplies third-party callbacks with independent copies of first-party request changes", async () => {
        const middleware: FirstPartyLspMiddleware = (type, sentParams, token, next) =>
            next(
                type,
                Object.assign({}, sentParams, {
                    textDocument: { uri: "file:///workspace.ts" },
                }),
                token,
            );
        const registry = new LspMiddlewareRegistry(() => assert.fail("Unexpected error"), [middleware]);
        const request = { query: "symbol" };
        let outgoing: unknown;
        registry.register("workspace/symbol", (result, context) => {
            assert.deepEqual(context.params, { query: "symbol", textDocument: { uri: "file:///workspace.ts" } });
            assert.notEqual(context.params, outgoing);
            assert.equal(Object.isFrozen(context.params), false);
            assert.equal(Object.isFrozen(context.params.textDocument), false);
            return result;
        });
        await registry.sendRequest("workspace/symbol", request, undefined, async (_type, sentParams) => {
            outgoing = sentParams;
            assert.equal(Object.isFrozen(sentParams), false);
            return [];
        });
        assert.deepEqual(request, { query: "symbol" });
        assert.equal(Object.isFrozen(outgoing), false);
    });

    test("runs first-party middleware around dispatch and third-party response transforms", async () => {
        const order: string[] = [];
        const first: FirstPartyLspMiddleware = async (type, sentParams, token, next) => {
            order.push("first request");
            const result = await next(type, sentParams, token);
            order.push("first response");
            return result;
        };
        const second: FirstPartyLspMiddleware = async (type, sentParams, token, next) => {
            order.push("second request");
            const result = await next(type, sentParams, token);
            order.push("second response");
            return result;
        };
        const registry = new LspMiddlewareRegistry(() => assert.fail("Unexpected error"), [first, second]);
        registry.register("textDocument/hover", result => {
            order.push("third-party response");
            return result;
        });
        await registry.sendRequest("textDocument/hover", params, undefined, async () => {
            order.push("server");
            return null;
        });
        assert.deepEqual(order, ["first request", "second request", "server", "third-party response", "second response", "first response"]);
    });

    test("propagates first-party failures without invoking third-party fallback", async () => {
        const failure = new Error("First-party failure");
        const middleware: FirstPartyLspMiddleware = () => Promise.reject(failure);
        const registry = new LspMiddlewareRegistry(() => assert.fail("Not a third-party failure"), [middleware]);
        registry.register("textDocument/hover", () => assert.fail("No response"));
        await assert.rejects(registry.sendRequest("textDocument/hover", params, undefined, async () => assert.fail("No dispatch")), error => error === failure);
    });
});

test("transforms real protocol responses and leaves push diagnostics untouched", async t => {
    const registry = new LspMiddlewareRegistry(() => assert.fail("Unexpected error"));
    registry.register("textDocument/hover", result => result && { ...result, contents: "transformed hover" });
    const serverToClient = new PassThrough();
    const clientToServer = new PassThrough();
    const client = createProtocolConnection(serverToClient, clientToServer);
    const server = createProtocolConnection(clientToServer, serverToClient);
    t.after(() => {
        client.dispose();
        server.dispose();
        serverToClient.destroy();
        clientToServer.destroy();
    });
    server.onRequest(HoverRequest.type, sentParams => {
        assert.deepEqual(sentParams, params);
        return { contents: "server hover" };
    });
    const original: PublishDiagnosticsParams = {
        uri: params.textDocument.uri,
        version: 1,
        diagnostics: [{
            range: { start: { line: 0, character: 0 }, end: { line: 0, character: 1 } },
            message: "server diagnostic",
            data: { preserved: true },
        }],
    };
    const received = deferred();
    client.onNotification(PublishDiagnosticsNotification.type, diagnostics => {
        assert.deepEqual(diagnostics, original);
        received.resolve();
    });
    client.listen();
    server.listen();
    const result = await registry.sendRequest(HoverRequest.type, params, CancellationToken.None, (type, params, token) => client.sendRequest(typeof type === "string" ? type : type.method, params, token));
    assert.deepEqual(result, { contents: "transformed hover" });
    await server.sendNotification(PublishDiagnosticsNotification.type, original);
    await received.promise;
});

function checkPublicTypes(api: ExtensionAPI): void {
    api.registerLspMiddleware("textDocument/hover", (result, context) => {
        // @ts-expect-error Request context cannot be mutated.
        context.params.textDocument.uri = "file:///changed.ts";
        return result;
    });
    // @ts-expect-error Push-diagnostic notifications cannot be intercepted.
    api.registerLspMiddleware("textDocument/publishDiagnostics", result => result);
    // @ts-expect-error Transformers must return the method's result type.
    api.registerLspMiddleware("textDocument/hover", () => []);
    // @ts-expect-error Lifecycle methods cannot be registered.
    api.registerLspMiddleware("initialize", result => result);
    api.registerLspMiddleware("textDocument/completion", (result, context) => {
        const trigger: string | undefined = context.params.context?.triggerCharacter;
        void trigger;
        return result;
    });
    api.registerLspMiddleware("custom/textDocument/multiDocumentHighlight", (result, context) => {
        const files: readonly string[] = context.params.filesToSearch;
        void files;
        return result;
    });
    api.registerLspMiddleware("workspace/symbol", (result, context) => {
        const uri: string | undefined = context.params.textDocument?.uri;
        void uri;
        return result;
    });
    api.registerLspMiddleware("completionItem/resolve", (result, context) => {
        // @ts-expect-error Opaque protocol data must not bypass the readonly context contract.
        context.params.data.property = "modified";
        return result;
    });
}
void checkPublicTypes;
