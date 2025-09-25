import * as vscode from "vscode";
import { Client } from "./client";
import { jsTsLanguageModes } from "./util";

export function setupVersionStatusItem(
    client: Client,
): vscode.Disposable[] {
    const statusItem = vscode.languages.createLanguageStatusItem("typescript.native-preview.version", jsTsLanguageModes);
    statusItem.name = "TypeScript Native Preview version";
    statusItem.detail = "TypeScript Native Preview version";
    return [
        statusItem,
        client.onStarted(() => {
            statusItem.text = client.getCurrentExe()!.version;
        }),
    ];
}
