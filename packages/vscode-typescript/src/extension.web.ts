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
import {
    uriSegmentToWasmName,
    uriToWasmMountPoint,
    wasmPathToUriText,
} from "./webMountPoint";

declare global {
    interface DedicatedWorkerGlobalScope {
        readonly name: string;
    }
}

const wasmPackagePath = ["node_modules", "@typescript", "typescript-wasip1-wasm", "lib"] as const;

const wasmFileSystemScheme = "ts-wasi";

/**
 * Serves virtual workspace files under the names the server derives from
 * their document URIs, since WASI joins those names onto the folder URI
 * literally and would otherwise miss files whose URIs contain escapes.
 */
class WasmFileSystemProvider implements vscode.FileSystemProvider {
    private readonly changeEmitter = new vscode.EventEmitter<vscode.FileChangeEvent[]>();
    readonly onDidChangeFile = this.changeEmitter.event;

    watch(): vscode.Disposable {
        return new vscode.Disposable(() => {});
    }

    stat(uri: vscode.Uri): Thenable<vscode.FileStat> {
        return vscode.workspace.fs.stat(toWorkspaceUri(uri));
    }

    async readDirectory(uri: vscode.Uri): Promise<[string, vscode.FileType][]> {
        const directory = toWorkspaceUri(uri);
        const entries = await vscode.workspace.fs.readDirectory(directory);
        return entries.map(([name, type]) => {
            const text = vscode.Uri.joinPath(directory, name).toString();
            const segment = text.slice(text.lastIndexOf("/") + 1);
            return [uriSegmentToWasmName(segment, (type & vscode.FileType.Directory) === 0), type];
        });
    }

    createDirectory(uri: vscode.Uri): Thenable<void> {
        return vscode.workspace.fs.createDirectory(toWorkspaceUri(uri));
    }

    readFile(uri: vscode.Uri): Thenable<Uint8Array> {
        return vscode.workspace.fs.readFile(toWorkspaceUri(uri));
    }

    writeFile(uri: vscode.Uri, content: Uint8Array): Thenable<void> {
        return vscode.workspace.fs.writeFile(toWorkspaceUri(uri), content);
    }

    delete(uri: vscode.Uri, options: { readonly recursive: boolean; }): Thenable<void> {
        return vscode.workspace.fs.delete(toWorkspaceUri(uri), options);
    }

    rename(oldUri: vscode.Uri, newUri: vscode.Uri, options: { readonly overwrite: boolean; }): Thenable<void> {
        return vscode.workspace.fs.rename(toWorkspaceUri(oldUri), toWorkspaceUri(newUri), options);
    }
}

function toWorkspaceUri(uri: vscode.Uri): vscode.Uri {
    const text = wasmPathToUriText(uri.path);
    if (text === undefined) throw vscode.FileSystemError.FileNotFound(uri);
    return vscode.Uri.parse(text, true);
}

class WasmMessageReader extends AbstractMessageReader {
    private readonly decoder = new TextDecoder();
    private buffer = new Uint8Array(4096);
    private length = 0;
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
        if (this.length + chunk.length > this.buffer.length) {
            const next = new Uint8Array(Math.max(this.buffer.length * 2, this.length + chunk.length));
            next.set(this.buffer.subarray(0, this.length));
            this.buffer = next;
        }
        this.buffer.set(chunk, this.length);
        this.length += chunk.length;

        let offset = 0;
        while (true) {
            const pending = this.buffer.subarray(offset, this.length);
            const headerEnd = findHeaderEnd(pending);
            if (headerEnd < 0) break;
            const header = this.decoder.decode(pending.subarray(0, headerEnd));
            const match = /(?:^|\r\n)Content-Length: (\d+)(?:\r\n|$)/i.exec(header);
            if (!match) {
                this.fireError(new Error(`Language server response is missing Content-Length: ${header}`));
                break;
            }
            const contentLength = Number(match[1]);
            const bodyStart = headerEnd + 4;
            if (pending.length < bodyStart + contentLength) break;
            const body = this.decoder.decode(pending.subarray(bodyStart, bodyStart + contentLength));
            offset += bodyStart + contentLength;
            try {
                this.callback?.(JSON.parse(body));
            }
            catch (error) {
                this.fireError(error);
            }
        }
        if (offset > 0) {
            this.buffer.copyWithin(0, offset, this.length);
            this.length -= offset;
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
    context.subscriptions.push(vscode.workspace.registerFileSystemProvider(wasmFileSystemScheme, new WasmFileSystemProvider(), { isCaseSensitive: true }));

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
        const mountPoints = (vscode.workspace.workspaceFolders ?? []).map(folder => {
            const mountPoint = uriToWasmMountPoint(folder.uri);
            return {
                kind: "vscodeFileSystem" as const,
                uri: folder.uri.scheme === "file" ? folder.uri : vscode.Uri.from({ scheme: wasmFileSystemScheme, path: mountPoint }),
                mountPoint,
            };
        });
        // Blocking stdin reads stall the Go scheduler, so the server cannot answer requests
        // while waiting for input. `@vscode/wasm-wasi` does not declare this option yet.
        const stdin = { kind: "pipeIn" as const, nonBlocking: true };
        await process?.terminate();
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
    // WASI mounts are fixed when the process starts, so new folders need a new process.
    let restarting = Promise.resolve();
    context.subscriptions.push(vscode.workspace.onDidChangeWorkspaceFolders(() => {
        restarting = restarting.then(async () => {
            await client.stop();
            await client.start();
        }).catch(error => output.error(`Failed to restart TypeScript language server: ${String(error)}`));
    }));
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
