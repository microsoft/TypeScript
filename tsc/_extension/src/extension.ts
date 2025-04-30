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
let statusBarItem: vscode.StatusBarItem;

const BUILTIN_TS_EXTENSION_ID = "vscode.typescript-language-features";

export function activate(context: vscode.ExtensionContext) {
    const tsExtension = vscode.extensions.getExtension(BUILTIN_TS_EXTENSION_ID);
    if (tsExtension?.isActive && !vscode.workspace.getConfiguration("typescript").get<boolean>("experimental.useTsgo")) {
        return;
    }

    const output = vscode.window.createOutputChannel("typescript-go", "log");
    const traceOutput = vscode.window.createOutputChannel("typescript-go (LSP)");

    setupStatusBar(context);
    registerCommands(context, output, traceOutput);

    const config = vscode.workspace.getConfiguration("typescript-go");

    const exe = config.get<string>("executablePath") || context.asAbsolutePath(
        path.join("../", "built", "local", `tsgo${process.platform === "win32" ? ".exe" : ""}`),
    );

    output.appendLine(`Resolved to ${exe}`);

    // Get pprofDir
    const pprofDir = config.get<string>("pprofDir");
    const pprofArgs = pprofDir ? ["-pprofDir", pprofDir] : [];

    const serverOptions: ServerOptions = {
        run: {
            command: exe,
            args: ["lsp", ...pprofArgs],
            transport: TransportKind.stdio,
        },
        debug: {
            command: exe,
            args: ["lsp", ...pprofArgs],
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
    vscode.commands.executeCommand("setContext", "typescript-go.serverRunning", true);
}

/**
 * Sets up the status bar item for TypeScript Go
 * @param context Extension context
 */
function setupStatusBar(context: vscode.ExtensionContext): void {
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = "$(beaker) tsgo";
    statusBarItem.tooltip = "TypeScript Go Language Server";
    statusBarItem.command = "typescript-go.showMenu";
    statusBarItem.backgroundColor = new vscode.ThemeColor("statusBarItem.warningBackground");
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);
}

/**
 * Registers all commands for the extension
 * @param context Extension context
 */
function registerCommands(context: vscode.ExtensionContext, outputChannel: vscode.OutputChannel, traceOutputChannel: vscode.OutputChannel): void {
    context.subscriptions.push(vscode.commands.registerCommand("typescript-go.restart", async () => {
        await client.restart();
    }));

    context.subscriptions.push(vscode.commands.registerCommand("typescript-go.output.focus", () => {
        outputChannel.show();
    }));

    context.subscriptions.push(vscode.commands.registerCommand("typescript-go.lsp-trace.focus", () => {
        traceOutputChannel.show();
    }));

    context.subscriptions.push(vscode.commands.registerCommand("typescript-go.showMenu", showQuickPickMenu));
}

/**
 * Shows the quick pick menu for TypeScript Go options
 */
async function showQuickPickMenu(): Promise<void> {
    const selected = await vscode.window.showQuickPick([
        { label: "$(refresh) Restart Server", description: "Restart the TypeScript Go language server" },
        { label: "$(output) Show TS Server Log", description: "Show the TypeScript Go server log" },
        { label: "$(debug-console) Show LSP Messages", description: "Show the LSP communication trace" },
        { label: "$(stop-circle) Disable TypeScript Go", description: "Switch back to the built-in TypeScript extension" },
    ], {
        placeHolder: "TypeScript Go Options",
    });

    if (selected) {
        if (selected.label.includes("Restart Server")) {
            await vscode.commands.executeCommand("typescript-go.restart");
        }
        else if (selected.label.includes("Show TS Server Log")) {
            await vscode.commands.executeCommand("typescript-go.output.focus");
        }
        else if (selected.label.includes("Show LSP Messages")) {
            await vscode.commands.executeCommand("typescript-go.lsp-trace.focus");
        }
        else if (selected.label.includes("Disable TypeScript Go")) {
            // Fire and forget, because this command will restart the whole extension host
            // and awaiting it shows a weird cancellation error.
            vscode.commands.executeCommand("typescript.experimental.disableTsgo");
        }
    }
}

export async function deactivate(): Promise<void> {
    // Dispose of status bar item
    if (statusBarItem) {
        statusBarItem.dispose();
    }

    if (!client) {
        return;
    }

    await client.stop();
    return vscode.commands.executeCommand("setContext", "typescript-go.serverRunning", false);
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
