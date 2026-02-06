import * as vscode from "vscode";
import { jsTsLanguageModes } from "./util";

export function setupVersionStatusItem(
    version: string,
): vscode.Disposable {
    const statusItem = vscode.languages.createLanguageStatusItem("typescript.native-preview.version", jsTsLanguageModes);
    statusItem.name = "TypeScript Native Preview version";
    statusItem.detail = "TypeScript Native Preview version";
    statusItem.text = version;
    return statusItem;
}
