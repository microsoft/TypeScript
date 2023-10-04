import * as fs from "fs";
import * as path from "path";
import {
    DocumentRegistry,
    LanguageService,
} from "typescript";

import {
    VersionedFileRegistry,
} from "./snapshots";

export function makeWatcher() {
    let watcher: fs.FSWatcher | undefined;
    async function startWatcher(_service: LanguageService, _documentRegistry: DocumentRegistry, files: VersionedFileRegistry) {
        watcher = fs.watch("./", { recursive: true }, (ev, fileName) => {
            if (ev === "change" && fileName) {
                const normalizedPath = path.resolve(fileName).replaceAll("\\", "/");
                files.updateFromDisk(normalizedPath);
            }
        });
    }
    return {
        startWatcher,
        close() {
            watcher?.close();
        },
    };
}
