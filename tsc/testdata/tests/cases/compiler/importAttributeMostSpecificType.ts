// @strict: true
// @module: preserve
// @moduleResolution: bundler
// @noEmit: true

// @filename: /bun-sqlite.d.ts
declare module "databases/*.sqlite" with { type: "sqlite" } {
    const database: {
        storage: "external";
        filename: string;
    };
    export default database;
}

declare module "*.sqlite" with { type: "sqlite", embed: "true" } {
    const database: {
        storage: "embedded";
        contents: Uint8Array;
    };
    export default database;
}

// @filename: /index.ts
import externalDatabase from "databases/app.sqlite" with { type: "sqlite" };
import embeddedDatabase from "databases/app.sqlite" with { type: "sqlite", embed: "true" };

const expectedExternalStorage: "external" = externalDatabase.storage;
const expectedEmbeddedStorage: "embedded" = embeddedDatabase.storage;

externalDatabase.filename;
embeddedDatabase.contents;