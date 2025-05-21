import * as vscode from "vscode";
import { Client } from "./client";
import { jsTsLanguageModes } from "./util";

export function setupVersionStatusItem(
    context: vscode.ExtensionContext,
    client: Client,
): void {
    const statusItem = vscode.languages.createLanguageStatusItem("typescript.native-preview.version", jsTsLanguageModes);
    statusItem.name = "TypeScript Native Preview version";
    statusItem.detail = "TypeScript Native Preview version";
    context.subscriptions.push(client.onStarted(() => {
        statusItem.text = client.getCurrentExe()!.version;
    }));
    context.subscriptions.push(statusItem);
}
