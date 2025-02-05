import { compile } from "json-schema-to-typescript-lite";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);

const metaModelPath = path.join(__dirname, "metaModel.json");
const metaModelSchemaPath = path.join(__dirname, "metaModelSchema.mts");

const hash = "dadd73f7fc283b4d0adb602adadcf4be16ef3a7b";

const metaModelURL = `https://raw.githubusercontent.com/microsoft/vscode-languageserver-node/${hash}/protocol/metaModel.json`;
const metaModelSchemaURL = `https://raw.githubusercontent.com/microsoft/vscode-languageserver-node/${hash}/protocol/metaModel.schema.json`;

const metaModelResponse = await fetch(metaModelURL);
const metaModel = await metaModelResponse.json();
fs.writeFileSync(metaModelPath, JSON.stringify(metaModel, undefined, 4));

const metaModelSchemaResponse = await fetch(metaModelSchemaURL);
const metaModelSchema = await metaModelSchemaResponse.json();

Object.assign(metaModelSchema, metaModelSchema.definitions.MetaModel);
delete metaModelSchema.definitions.MetaModel;

const compiled = await compile(metaModelSchema, "MetaModel");
fs.writeFileSync(metaModelSchemaPath, compiled);
