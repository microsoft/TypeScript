import { readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import {
    checkVariant,
    clientRoot,
    generatedRoot,
    repoRoot as root,
    runtimeRoot,
} from "./config.mjs";
import { recordSource } from "./telemetry.mjs";

checkVariant(process.env.API_VARIANT ?? "");
if (process.env.TYPESCRIPT_ESLINT_NATIVE_BINARY || process.env.TSRS_NAPI || process.env.TSRS_BINARY) {
    throw new Error("Unset TYPESCRIPT_ESLINT_NATIVE_BINARY, TSRS_NAPI and TSRS_BINARY: the adapter would select the Rust SDK");
}
const paths = {
    sync: new URL("./profile-api.mjs", import.meta.url).href,
    fs: pathToFileURL(`${clientRoot}/dist/api/fs.js`).href,
    path: pathToFileURL(`${clientRoot}/dist/api/typedPaths.js`).href,
    proto: pathToFileURL(`${clientRoot}/dist/api/proto.js`).href,
    ast: pathToFileURL(`${clientRoot}/dist/ast/index.js`).href,
};

registerHooks({
    resolve(specifier, context, nextResolve) {
        const prefix = "@typescript/native/unstable/";
        if (specifier.startsWith(prefix)) {
            const suffix = specifier.slice(prefix.length);
            const url = paths[suffix] ?? (suffix.startsWith("ast/")
                ? pathToFileURL(`${clientRoot}/dist/${suffix}.js`).href
                : undefined);
            if (!url) throw new Error(`Unmapped native API import: ${specifier}`);
            return { url, format: "module", shortCircuit: true };
        }
        const resolved = nextResolve(specifier, context);
        const repoDist = pathToFileURL(`${root}/packages/typescript/dist/`).href;
        const clientDist = pathToFileURL(`${clientRoot}/dist/`).href;
        if (repoDist !== clientDist && resolved.url?.startsWith(repoDist)) {
            return { ...resolved, url: clientDist + resolved.url.slice(repoDist.length) };
        }
        return resolved;
    },
    load(url, context, nextLoad) {
        let result = nextLoad(url, context);
        if ((url.startsWith(pathToFileURL(`${runtimeRoot}/packages/`).href) || url.startsWith(pathToFileURL(`${clientRoot}/dist/`).href)) && result.source) {
            recordSource(url, result.source);
        }
        const variants = (process.env.API_VARIANT ?? "").split(",");
        const replacements = [
            ["scanner-pool", "/ast/astnav.js", "scanner-pool"],
            ["pooled-buffers", "/api/syncChannel.js", "pooled-buffers"],
            ["handle-cache", "/api/node/node.js", "handle-cache"],
            ["string-cache", "/api/node/node.generated.js", "string-cache"],
            ["method-sidecar", "/api/sync/api.js", "method-sidecar-api"],
            ["method-sidecar", "/api/sync/generatorSupport.js", "method-sidecar-support"],
            ["bound-methods", "/api/sync/api.js", "bound-methods"],
        ];
        for (const [variant, suffix, filename] of replacements) {
            if (variants.includes(variant) && url.startsWith(pathToFileURL(`${clientRoot}/dist/`).href) && url.endsWith(suffix)) {
                result = { ...result, source: readFileSync(join(generatedRoot, `${filename}.js`), "utf8") };
            }
        }
        if (process.env.API_INSTRUMENT !== "1" || !url.startsWith(pathToFileURL(`${clientRoot}/dist/`).href) || !result.source) return result;
        let source = result.source.toString();
        const telemetry = new URL("./telemetry.mjs", import.meta.url).href;
        const prefix = `import { count, countHandle, countMethod, jsonParse, jsonStringify } from ${JSON.stringify(telemetry)};\n`;
        if (url.endsWith("/api/sync/client.js")) {
            source = source.replaceAll("JSON.parse(", "jsonParse(").replaceAll("JSON.stringify(", "jsonStringify(");
        }
        else if (url.endsWith("/api/sync/generatorSupport.js")) {
            source = source.replace("const method = Object.assign", "countMethod(owner, name);\n    const method = Object.assign");
        }
        else if (url.endsWith("/api/sync/api.js")) {
            source = source.replace("getOrCreateType(data) {", 'getOrCreateType(data) {\ncount("TypeResponseInternAttempts");')
                .replace("getOrCreateSignature(data) {", 'getOrCreateSignature(data) {\ncount("SignatureResponseInternAttempts");');
            for (const name of ["TypeObject", "Symbol", "Signature", "NodeHandle"]) {
                const start = source.indexOf(`class ${name}`);
                const ctor = source.indexOf("constructor(", start);
                const body = source.indexOf("{", ctor);
                if (start < 0 || ctor < 0 || body < 0) throw new Error(`Cannot instrument ${name}`);
                source = source.slice(0, body + 1) + `\ncount(${JSON.stringify(name)});` + source.slice(body + 1);
            }
        }
        else if (url.endsWith("/api/node/node.js")) {
            source = source.replace("export function parseNodeHandleFromCompiler(handle) {", "export function parseNodeHandleFromCompiler(handle) {\ncountHandle(handle);");
        }
        return { ...result, source: prefix + source };
    },
});
