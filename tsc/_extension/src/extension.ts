import * as path from "path";
import * as vscode from "vscode";

import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
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
                const document = vscode.workspace.textDocuments.find(doc => doc.uri.toString() === resource.toString());
                if (!document) {
                    return false;
                }
                return vscode.languages.match(documentSelector, document) > 0;
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
