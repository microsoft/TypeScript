import * as path from "path";
import * as vscode from "vscode";

import {
    LanguageClient,
    LanguageClientOptions,
    NotebookDocumentFilter,
    ServerOptions,
    TextDocumentFilter,
    TransportKind,
} from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand("typescript-go.restart", () => {
        client.restart();
    }));

    const output = vscode.window.createOutputChannel("typescript-go", "log");
    const traceOutput = vscode.window.createOutputChannel("typescript-go (LSP)");

    const exe = context.asAbsolutePath(
        path.join("../", "built", "local", `tsgo${process.platform === "win32" ? ".exe" : ""}`),
    );

    output.appendLine(`Resolved to ${exe}`);

    const serverOptions: ServerOptions = {
        run: {
            command: exe,
            args: ["lsp"],
            transport: TransportKind.stdio,
        },
        debug: {
            command: exe,
            args: ["lsp"],
            transport: TransportKind.stdio,
        },
    };

    const clientOptions: LanguageClientOptions = {
        documentSelector: [
            { scheme: "file", language: "typescript" },
            { scheme: "file", language: "typescriptreact" },
            { scheme: "file", language: "javascript" },
            { scheme: "file", language: "javascriptreact" },
            { scheme: "untitled", language: "typescript" },
            { scheme: "untitled", language: "typescriptreact" },
            { scheme: "untitled", language: "javascript" },
            { scheme: "untitled", language: "javascriptreact" },
        ],
        outputChannel: output,
        traceOutputChannel: traceOutput,
        diagnosticPullOptions: {
            onChange: true,
            onSave: true,
            onTabs: true,
            match(documentSelector, resource) {
                // This function is called when diagnostics are requested but
                // only the URI itself is known (e.g. open but not yet focused tabs),
                // so will not be present in vscode.workspace.textDocuments.
                // See if this file matches without consulting vscode.languages.match
                // (which requires a TextDocument).

                const language = getLanguageForUri(resource);

                for (const selector of documentSelector) {
                    if (typeof selector === "string") {
                        if (selector === language) {
                            return true;
                        }
                        continue;
                    }
                    if (NotebookDocumentFilter.is(selector)) {
                        continue;
                    }
                    if (TextDocumentFilter.is(selector)) {
                        if (selector.language !== undefined && selector.language !== language) {
                            continue;
                        }

                        if (selector.scheme !== undefined && selector.scheme !== resource.scheme) {
                            continue;
                        }

                        if (selector.pattern !== undefined) {
                            // VS Code's glob matcher is not available via the API;
                            // see: https://github.com/microsoft/vscode/issues/237304
                            // But, we're only called on selectors passed above, so just ignore this for now.
                            throw new Error("Not implemented");
                        }

                        return true;
                    }
                }

                return false;
            },
        },
    };

    client = new LanguageClient(
        "typescript-go",
        "typescript-go-lsp",
        serverOptions,
        clientOptions,
    );

    output.appendLine(`Starting language server...`);
    client.start();
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }
    return client.stop();
}

function getLanguageForUri(uri: vscode.Uri): string | undefined {
    const ext = path.posix.extname(uri.path);
    switch (ext) {
        case ".ts":
        case ".mts":
        case ".cts":
            return "typescript";
        case ".js":
        case ".mjs":
        case ".cjs":
            return "javascript";
        case ".tsx":
            return "typescriptreact";
        case ".jsx":
            return "javascriptreact";
        default:
            return undefined;
    }
}
