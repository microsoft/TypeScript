#!/usr/bin/env -S node --experimental-strip-types

// Usage: node --experimental-strip-types fetchModel.mts

import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);

const metaModelPath = path.join(__dirname, "metaModel.json");
const metaModelSchemaPath = path.join(__dirname, "metaModelSchema.mts");

// Resolve the vscode-languageclient version from the root package-lock.json.
const lockfilePath = path.resolve(__dirname, "../../../../package-lock.json");
const lockfile = JSON.parse(fs.readFileSync(lockfilePath, "utf-8"));
const clientVersion: string = lockfile.packages["node_modules/vscode-languageclient"].version;

const ref = `release/client/${clientVersion}`;
console.log(`Using vscode-languageclient@${clientVersion}`);

const metaModelURL = `https://raw.githubusercontent.com/microsoft/vscode-languageserver-node/${ref}/protocol/metaModel.json`;
const metaModelSchemaURL = `https://raw.githubusercontent.com/microsoft/vscode-languageserver-node/${ref}/tools/src/metaModel.ts`;

const metaModelResponse = await fetch(metaModelURL);
const metaModel = await metaModelResponse.text();
fs.writeFileSync(metaModelPath, metaModel);

const metaModelSchemaResponse = await fetch(metaModelSchemaURL);
let metaModelSchema = await metaModelSchemaResponse.text();

// Patch the schema to add omitzeroValue property to Property type
metaModelSchema = metaModelSchema.replace(
    /(\t \* Whether the property is deprecated or not\. If deprecated\n\t \* the property contains the deprecation message\.\n\t \*\/\n\tdeprecated\?: string;)\n}/m,
    `$1\n\n\t/**\n\t * Whether this property uses omitzero without being a pointer.\n\t * Custom extension for special value types.\n\t */\n\tomitzeroValue?: boolean;\n}`,
);

fs.writeFileSync(metaModelSchemaPath, metaModelSchema);
