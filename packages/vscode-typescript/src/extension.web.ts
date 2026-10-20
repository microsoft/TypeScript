import {
    Wasm,
    type WasmProcess,
    type Writable,
} from "@vscode/wasm-wasi/v1";
import * as vscode from "vscode";
import {
    AbstractMessageReader,
    AbstractMessageWriter,
    type DataCallback,
    LanguageClient,
    type LanguageClientOptions,
    type Message,
    type MessageTransports,
} from "vscode-languageclient/browser";
import { nightlyExtensionId } from "./extensionIds";
import { uriToWasmMountPoint } from "./webMountPoint";

declare global {
    interface DedicatedWorkerGlobalScope {
        readonly name: string;
    }
}

const wasmPackagePath = ["node_modules", "@typescript", "typescript-wasip1-wasm", "lib"] as const;

class WasmMessageReader extends AbstractMessageReader {
    private readonly decoder = new TextDecoder();
    private buffer = new Uint8Array();
    private callback: DataCallback | undefined;
    private closed = false;
    private readonly dataSubscription: vscode.Disposable;

    constructor(process: WasmProcess) {
        super();
        this.dataSubscription = process.stdout?.onData(chunk => this.accept(chunk)) ?? new vscode.Disposable(() => {});
    }

    listen(callback: DataCallback): vscode.Disposable {
        this.callback = callback;
        return new vscode.Disposable(() => this.callback = undefined);
    }

    override dispose(): void {
        this.dataSubscription.dispose();
        super.dispose();
    }

    close(): void {
        if (!this.closed) {
            this.closed = true;
            this.fireClose();
        }
    }

    private accept(chunk: Uint8Array): void {
        const next = new Uint8Array(this.buffer.length + chunk.length);
        next.set(this.buffer);
        next.set(chunk, this.buffer.length);
        this.buffer = next;

        while (true) {
            const headerEnd = findHeaderEnd(this.buffer);
            if (headerEnd < 0) return;
            const header = this.decoder.decode(this.buffer.subarray(0, headerEnd));
            const match = /(?:^|\r\n)Content-Length: (\d+)(?:\r\n|$)/i.exec(header);
            if (!match) {
                this.fireError(new Error(`Language server response is missing Content-Length: ${header}`));
                return;
            }
            const contentLength = Number(match[1]);
            const bodyStart = headerEnd + 4;
            if (this.buffer.length < bodyStart + contentLength) return;
            const body = this.decoder.decode(this.buffer.subarray(bodyStart, bodyStart + contentLength));
            this.buffer = this.buffer.slice(bodyStart + contentLength);
            try {
                this.callback?.(JSON.parse(body));
            }
            catch (error) {
                this.fireError(error);
            }
        }
    }
}

class WasmMessageWriter extends AbstractMessageWriter {
    private readonly encoder = new TextEncoder();
    private writes = Promise.resolve();

    constructor(private readonly stdin: Writable) {
        super();
    }

    write(message: Message): Promise<void> {
        const body = this.encoder.encode(JSON.stringify(message));
        const header = this.encoder.encode(`Content-Length: ${body.length}\r\n\r\n`);
        const framed = new Uint8Array(header.length + body.length);
        framed.set(header);
        framed.set(body, header.length);
        this.writes = this.writes.then(() => this.stdin.write(framed));
        return this.writes;
    }

    end(): void {}
}

export async function activate(context: vscode.ExtensionContext): Promise<void> {
    const output = vscode.window.createOutputChannel("TypeScript 7", { log: true });
    context.subscriptions.push(output);

    const nightlyExtension = vscode.extensions.getExtension(nightlyExtensionId);
    const moduleExtensionUri = nightlyExtension && await hasWasmPayload(nightlyExtension.extensionUri)
        ? nightlyExtension.extensionUri
        : context.extensionUri;
    const modulePackageUri = vscode.Uri.joinPath(moduleExtensionUri, ...wasmPackagePath);
    context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider("bundled", {
        async provideTextDocumentContent(uri) {
            const prefix = "/libs/";
            if (!uri.path.startsWith(prefix)) {
                throw new Error(`Unsupported bundled TypeScript path: ${uri.toString()}`);
            }
            const fileName = uri.path.slice(prefix.length);
            if (!fileName || fileName.includes("/")) {
                throw new Error(`Unsupported bundled TypeScript path: ${uri.toString()}`);
            }
            const contents = await vscode.workspace.fs.readFile(vscode.Uri.joinPath(modulePackageUri, fileName));
            return new TextDecoder().decode(contents);
        },
    }));

    let process: WasmProcess | undefined;
    const stderrDecoder = new TextDecoder();
    const serverOptions = async (): Promise<MessageTransports> => {
        const wasm = await Wasm.load();
        if (!supportsNonBlockingStdin(wasm.versions.extension)) {
            throw new Error(
                `TypeScript requires WebAssembly Execution Engine ${minWasiCoreVersion.join(".")} or newer; found ${wasm.versions.extension}. Update the extension and reload.`,
            );
        }
        const module = wasm.compile(vscode.Uri.joinPath(modulePackageUri, "tsc.wasm"));
        const mountPoints = (vscode.workspace.workspaceFolders ?? []).map(folder => ({
            kind: "vscodeFileSystem" as const,
            uri: folder.uri,
            mountPoint: uriToWasmMountPoint(folder.uri),
        }));
        // Blocking stdin reads stall the Go scheduler, so the server cannot answer requests
        // while waiting for input. `@vscode/wasm-wasi` does not declare this option yet.
        const stdin = { kind: "pipeIn" as const, nonBlocking: true };
        process = await wasm.createProcess("tsc", module, {
            args: ["--lsp", "--stdio"],
            env: { PWD: "/" },
            mountPoints,
            stdio: {
                in: stdin,
                out: { kind: "pipeOut" },
                err: { kind: "pipeOut" },
            },
        });
        if (!process.stdin || !process.stdout) {
            throw new Error("WASM WASI did not create language server stdio pipes");
        }
        process.stderr?.onData(chunk => output.append(stderrDecoder.decode(chunk, { stream: true })));
        const reader = new WasmMessageReader(process);
        void process.run().then(
            code => {
                if (code !== 0) output.error(`TypeScript language server exited with code ${code}`);
            },
            error => output.error(`TypeScript language server failed: ${String(error)}`),
        ).finally(() => reader.close());
        return {
            reader,
            writer: new WasmMessageWriter(process.stdin),
        };
    };
    const clientOptions: LanguageClientOptions = {
        documentSelector: [
            { language: "javascript" },
            { language: "javascriptreact" },
            { language: "typescript" },
            { language: "typescriptreact" },
        ],
        initializationOptions: {
            enableTelemetry: false,
            runExternalCode: false,
        },
        outputChannel: output,
    };
    const client = new LanguageClient("js/ts", "TypeScript Language Server", serverOptions, clientOptions);
    context.subscriptions.push(client, {
        dispose() {
            void process?.terminate();
        },
    });
    await client.start();
}

export function deactivate(): void {}

const minWasiCoreVersion = [1, 0, 4];

function supportsNonBlockingStdin(version: string): boolean {
    const parts = version.split(/[.-]/, 3).map(Number);
    for (let i = 0; i < minWasiCoreVersion.length; i++) {
        if (parts[i] !== minWasiCoreVersion[i]) return parts[i] > minWasiCoreVersion[i];
    }
    return true;
}

async function hasWasmPayload(extensionUri: vscode.Uri): Promise<boolean> {
    try {
        await vscode.workspace.fs.stat(vscode.Uri.joinPath(extensionUri, ...wasmPackagePath, "tsc.wasm"));
        return true;
    }
    catch {
        return false;
    }
}

function findHeaderEnd(buffer: Uint8Array): number {
    for (let i = 0; i + 3 < buffer.length; i++) {
        if (buffer[i] === 13 && buffer[i + 1] === 10 && buffer[i + 2] === 13 && buffer[i + 3] === 10) {
            return i;
        }
    }
    return -1;
}
