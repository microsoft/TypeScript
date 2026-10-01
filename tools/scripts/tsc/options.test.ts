import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { repoRoot } from "../gen/utils.mts";
import {
    enumDefs,
    generateEnum,
} from "./generate-enums.ts";
import {
    compilerDeclarations,
    generateCompilerOptionsAPI,
    generateConfigSchema,
    generateOptionComparisons,
    generateOptions,
    generatePrepareCompilerOptionsAPI,
    validateOptions,
} from "./generate-options.ts";
import {
    diagnostic,
    optionKind,
} from "./options-model.ts";
import type { JSONSchema } from "./options-schema.ts";
import { options } from "./options.ts";

test("option metadata is valid", () => {
    validateOptions(options);
});

test("semantic diagnostic options must be stored in build info", () => {
    const model = structuredClone(options);
    model.compilerOptions.find(option => option.name === "noImplicitAny")!.declaration!.affectsBuildInfo = false;
    assert.throws(() => validateOptions(model), /Semantic diagnostics must affect build info: noImplicitAny/);
});

test("compiler test variations accept finite options without requiring affects metadata", () => {
    const source = generateOptions().get("tsc/internal/testrunner/options_generated.go")!;
    for (const name of ["strict", "module", "noCheck", "preserveSymlinks", "noEmit", "isolatedModules"]) {
        assert(source.includes(`"${name.toLowerCase()}",`), name);
    }
    for (const name of ["lib", "maxNodeModuleJsDepth", "outDir", "watch", "configFilePath"]) {
        assert(!source.includes(`"${name.toLowerCase()}",`), name);
    }
});

test("help short aliases preserve parsing metadata without duplicating help text", () => {
    const help = compilerDeclarations().filter(option => option.name === "help");
    assert.deepEqual(help.map(option => option.shortName), ["h", "?"]);
    assert.equal(help[0].description?.text, "Print this message.");
    assert.equal(help[0].showInSimplifiedHelpView, true);
    assert.equal(help[1].description, undefined);
    assert.equal(help[1].showInSimplifiedHelpView, undefined);
    for (const option of help) {
        assert.equal(option.kind, "Boolean");
        assert.equal(option.isCommandLineOnly, true);
        assert.equal(option.group, "commonOptionsWithBuild");
    }
});

test("API compiler options are generated directly from option metadata", () => {
    const source = generateCompilerOptionsAPI();
    for (
        const field of [
            "allowJs?: boolean | undefined;",
            "target?: ScriptTarget | undefined;",
            "maxNodeModuleJsDepth?: number | undefined;",
            "paths?: Record<string, string[]> | undefined;",
            "plugins?: PluginImport[] | undefined;",
            "configFilePath?: RootedFilePath | undefined;",
        ]
    ) assert(source.includes(field), field);
    assert.match(source, /export interface PluginImport \{\s*name: string;/);
    assert.doesNotMatch(source, /baseUrl\?:|outFile\?:|watch\?:|help\?:|configFile\?:/);
    const model = structuredClone(options);
    model.compilerOptions.push({ name: "newAPIOption", type: "Tristate" });
    assert.match(generateCompilerOptionsAPI(model), /newAPIOption\?: boolean \| undefined;/);
});

test("API compiler option path preparation is generated directly from option metadata", () => {
    const source = generatePrepareCompilerOptionsAPI();
    assert.match(source, /configFilePath: configFilePath === undefined \? undefined : toRootedFilePath\(configFilePath, currentDirectory\)/);
    assert.match(source, /outDir: outDir === undefined \? undefined : toRootedDirectoryPath\(outDir, currentDirectory\)/);
    assert.match(source, /project: project === undefined \? undefined : toRootedPath\(project, currentDirectory\)/);
    assert.match(source, /rootDirs: rootDirs\?\.map\(value => toRootedDirectoryPath\(value, currentDirectory\)\)/);
    assert.match(source, /baseUrl: baseUrl === undefined \? undefined : toRootedDirectoryPath\(baseUrl, currentDirectory\)/);
    assert.match(source, /generateTrace: generateTrace === undefined \? undefined : toRootedDirectoryPath\(generateTrace, currentDirectory\)/);
    assert.match(source, /outFile: outFile === undefined \? undefined : toRootedFilePath\(outFile, currentDirectory\)/);
    assert.match(source, /pprofDir: pprofDir === undefined \? undefined : toRootedDirectoryPath\(pprofDir, currentDirectory\)/);

    const model = structuredClone(options);
    model.compilerOptions.push({ name: "newPathOption", type: "string", pathKind: "file" });
    assert.match(generatePrepareCompilerOptionsAPI(model), /newPathOption: newPathOption === undefined \? undefined : toRootedFilePath\(newPathOption, currentDirectory\)/);
});

test("diagnostic references use checked message text and preserve Go names", () => {
    assert.deepEqual(diagnostic("JavaScript Support"), { go: "diagnostics.JavaScript_Support", text: "JavaScript Support" });
    assert.deepEqual(diagnostic("'{0}' expected."), { go: "diagnostics.X_0_expected", text: "'{0}' expected." });
    // @ts-expect-error Diagnostic text must exist in diagnosticMessages.json.
    diagnostic("Not a real diagnostic.");
});

test("explicit option orders reject duplicates, unknown names, and omissions", () => {
    for (
        const select of [
            (model: typeof options) => model.declarationOrder.commonOptionsWithBuild,
            (model: typeof options) => model.declarationOrder.optionsForCompiler,
            (model: typeof options) => model.buildOptionFieldOrder,
        ]
    ) {
        const duplicate = structuredClone(options);
        const duplicateOrder = select(duplicate);
        duplicateOrder.push(duplicateOrder[0]);
        assert.throws(() => validateOptions(duplicate), /Duplicate option in .* order/);

        const unknown = structuredClone(options);
        select(unknown)[0] = "missingOption";
        assert.throws(() => validateOptions(unknown), /Unknown option in .* order: missingOption/);

        const missing = structuredClone(options);
        select(missing).pop();
        assert.throws(() => validateOptions(missing), /Missing options in .* order/);
    }
    const wrongGroup = structuredClone(options);
    wrongGroup.declarationOrder.optionsForCompiler[0] = "watch";
    assert.throws(() => validateOptions(wrongGroup), /Unknown option in optionsForCompiler order: watch/);
});

test("option TypeScript enums are generated without reading their Go definitions", () => {
    for (const optionEnum of options.enums.filter(enumDef => enumDef.api)) {
        const def = enumDefs.find(def => def.name === optionEnum.name);
        assert(def, optionEnum.name);
        const { members, code } = generateEnum({ ...def, goFile: "does-not-exist.go" });
        assert.deepEqual(
            members,
            optionEnum.members.filter(member => !member.excludeFromAPI).map(member => ({
                name: member.name,
                value: String(member.value),
            })),
        );
        assert.match(code, /^\/\/ Code generated by tools\/scripts\/tsc\/generate-enums.ts from tools\/scripts\/tsc\/options.ts\./);
        assert.doesNotMatch(code, /does-not-exist|optionenums_generated/);
        if (def.name === "ScriptTarget") {
            assert(members.some(member => member.name === "Latest" && member.value === "ESNext"));
            for (const name of ["None", "ES5", "LatestStandard"]) assert(!members.some(member => member.name === name), name);
        }
    }
});

test("other TypeScript enums retain their Go sources", () => {
    const def = enumDefs.find(def => def.name === "SymbolFlags")!;
    const { members, code } = generateEnum(def);
    assert(members.length > 0);
    assert.match(code, /from tsc\/internal\/ast\/symbolflags.go/);
    assert.throws(() => generateEnum({ ...def, goFile: "does-not-exist.go" }), /ENOENT/);
});

test("SyntaxKind is generated without reading its Go definition", () => {
    const def = enumDefs.find(def => def.name === "SyntaxKind")!;
    const { members, code } = generateEnum({ ...def, goFile: "does-not-exist.go" });
    assert.match(code, /^\/\/ Code generated by tools\/scripts\/tsc\/generate-enums.ts from tools\/scripts\/tsc\/ast.json\./);
    assert.deepEqual(members[0], { name: "Unknown", value: "0" });
    assert.deepEqual(members[1], { name: "EndOfFile", value: "1" });
    const countIndex = members.findIndex(member => member.name === "Count");
    assert(countIndex > 0);
    assert.equal(members[countIndex].value, String(countIndex));
    assert(members.some(member => member.name === "FirstAssignment" && member.value === "EqualsToken"));
    assert(members.some(member => member.name === "FirstJSDocTagNode" && member.value === "JSDocUnknownTag"));
});

test("metadata enum artifacts are current and use the shared alias ordering", () => {
    for (const def of enumDefs.filter(def => def.metadata)) {
        const { code } = generateEnum(def);
        const name = def.name[0].toLowerCase() + def.name.slice(1);
        const actual = fs.readFileSync(path.join(repoRoot, def.outDir, `${name}.enum.ts`), "utf8");
        assert.equal(actual.replaceAll("\r\n", "\n"), code, def.name);
    }
    const def = enumDefs.find(def => def.name === "SyntaxKind")!;
    const { members } = generateEnum({
        ...def,
        goFile: "does-not-exist.go",
        metadata: {
            file: "metadata.json",
            members: [{ name: "Alias", value: "Value" }, { name: "Value", value: "7" }],
        },
    });
    assert.deepEqual(members, [{ name: "Value", value: "7" }, { name: "Alias", value: "Value" }]);
});

test("option comparisons reject types that require deep equality", () => {
    for (const name of ["maxNodeModuleJsDepth", "types", "paths", "plugins"]) {
        const model = structuredClone(options);
        model.compilerOptions.find(option => option.name === name)!.declaration!.affectsEmit = true;
        assert.throws(() => generateOptionComparisons(model), new RegExp(`Unsupported comparison type for ${name}:`));
    }
});

test("option section headings are detached line comments", () => {
    const generated = generateOptions();
    const go = generated.get("tsc/internal/core/options_generated.go")!;
    assert.match(go, /\n\/\/ Internal fields\n\nConfigFilePath /);
    assert.match(go, /\n\/\/ Internal fields\n\nClean /);
    const api = generated.get("packages/typescript/src/api/compilerOptions.generated.ts")!;
    assert.match(api, /\n\/\/ Internal fields\n\nconfigFilePath\?:/);
    assert.doesNotMatch(api, /\/\*\* Internal fields/);
});

test("all generated options artifacts are checked in and current", () => {
    for (const [file, content] of generateOptions()) {
        const actual = fs.readFileSync(path.join(repoRoot, file), "utf8");
        if (file.endsWith(".json")) {
            assert.deepEqual(JSON.parse(actual), JSON.parse(content), file);
        }
        else {
            // Ignore formatting, but preserve the contents of string literals and comments.
            const tokens = (source: string) => source.match(/"(?:\\.|[^"\\])*"|`[^`]*`|\/\/[^\r\n]*|[^\s]/g);
            assert.deepEqual(tokens(actual), tokens(content), file);
        }
    }
});

test("schemas retain historical options as deprecated", () => {
    const historical = {
        charset: ["utf8", false],
        out: ["bundle.js", false],
        noImplicitUseStrict: [true, "true"],
        noStrictGenericChecks: [true, "true"],
        keyofStringsOnly: [true, "true"],
        suppressExcessPropertyErrors: [true, "true"],
        suppressImplicitAnyIndexErrors: [true, "true"],
        preserveValueImports: [true, "true"],
        importsNotUsedAsValues: ["preserve", "invalid"],
    };
    for (const kind of ["tsconfig", "jsconfig"] as const) {
        const schema = generateConfigSchema(kind);
        for (const [name, [valid, invalid]] of Object.entries(historical)) {
            const property = schema.definitions.compilerOptions.properties[name];
            assert(property, name);
            assert.equal(property.deprecated, true, name);
            assert(property.deprecationMessage, name);
            assert(property.markdownDescription, name);
            assert(accepts(property, valid, schema), name);
            assert(accepts(property, null, schema), name);
            assert(!accepts(property, invalid, schema), name);
        }
        for (const [name, value] of [["target", "es3"], ["target", "es5"], ["module", "none"]]) {
            const property = schema.definitions.compilerOptions.properties[name];
            assert(accepts(property, value, schema), `${name}: ${value}`);
            assert(accepts(property, value.toUpperCase(), schema), `${name}: ${value.toUpperCase()}`);
            const suggestions = property.anyOf![0].anyOf![0];
            assert.equal(suggestions.enumDescriptions![suggestions.enum!.indexOf(value)], "Deprecated.");
        }
        for (const value of ["remove", "preserve", "error", "REMOVE", "PrEsErVe", "ERROR"]) {
            assert(accepts(schema.definitions.compilerOptions.properties.importsNotUsedAsValues, value, schema));
        }
        const lib = schema.definitions.compilerOptions.properties.lib;
        assert(accepts(lib, ["es2022.sharedmemory", "ES2022.SharedMemory"], schema));
        assert(!accepts(lib, ["es2022.sharedmemory.invalid"], schema));
        const suggestions = lib.anyOf![0].items!.anyOf![0];
        assert.equal(suggestions.enumDescriptions![suggestions.enum!.indexOf("es2022.sharedmemory")], "Deprecated.");
    }
});

// Evaluate only the validation keywords emitted by this generator. Unknown keywords
// fail the test so new schema features must also get acceptance/rejection coverage.
function accepts(schema: JSONSchema, value: unknown, root: JSONSchema): boolean {
    for (const key of Object.keys(schema)) {
        assert(
            [
                "$schema",
                "$comment",
                "$ref",
                "title",
                "description",
                "markdownDescription",
                "type",
                "properties",
                "definitions",
                "additionalProperties",
                "required",
                "items",
                "anyOf",
                "allOf",
                "enum",
                "enumDescriptions",
                "pattern",
                "default",
                "minimum",
                "minLength",
                "deprecated",
                "deprecationMessage",
                "allowComments",
                "allowTrailingCommas",
            ].includes(key),
            `Unsupported schema keyword: ${key}`,
        );
    }
    if (schema.$ref) {
        assert.match(schema.$ref, /^#\/definitions\/\w+$/);
        const referenced = root.definitions?.[schema.$ref.slice("#/definitions/".length)];
        assert(referenced, `Missing reference: ${schema.$ref}`);
        return accepts(referenced, value, root);
    }
    if (schema.anyOf && !schema.anyOf.some(branch => accepts(branch, value, root))) return false;
    if (schema.allOf && !schema.allOf.every(branch => accepts(branch, value, root))) return false;
    if (schema.type) {
        const types = Array.isArray(schema.type) ? schema.type : [schema.type];
        const type = value === null ? "null" : Array.isArray(value) ? "array" : typeof value;
        if (!types.includes(type)) return false;
    }
    if (schema.enum && !schema.enum.some(item => item === value)) return false;
    if (typeof value === "string") {
        if (schema.pattern && !new RegExp(schema.pattern).test(value)) return false;
        if (schema.minLength !== undefined && value.length < schema.minLength) return false;
    }
    if (typeof value === "number" && schema.minimum !== undefined && value < schema.minimum) return false;
    if (Array.isArray(value) && schema.items && !value.every(item => accepts(schema.items!, item, root))) return false;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        if (schema.required?.some(name => !Object.hasOwn(value, name))) return false;
        for (const [name, property] of Object.entries(value)) {
            const child = schema.properties?.[name];
            if (child) {
                if (!accepts(child, property, root)) return false;
            }
            else if (schema.additionalProperties === false) return false;
            else if (typeof schema.additionalProperties === "object" && !accepts(schema.additionalProperties, property, root)) return false;
        }
    }
    return true;
}

test("root option documentation is outside draft-07 references", () => {
    for (const kind of ["tsconfig", "jsconfig"] as const) {
        const schema = generateConfigSchema(kind);
        for (const name of ["compilerOptions", "typeAcquisition"]) {
            const property = schema.properties[name];
            assert.equal(property.$ref, undefined, name);
            assert.deepEqual(property.allOf, [{ $ref: `#/definitions/${name}` }]);
            assert(property.description, name);
            assert(property.markdownDescription, name);
        }
    }
});

test("schemas accept representative valid configs and reject malformed configs", () => {
    const valid = [
        {},
        { compilerOptions: null, files: null, include: null, exclude: null, references: null, typeAcquisition: null },
        { compilerOptions: { strict: null, target: null, paths: null, types: null, maxNodeModuleJsDepth: null } },
        { extends: "./base.json", files: [] },
        { extends: ["./base.json", "some-package/tsconfig.json"], references: [{ path: "../project", circular: true }] },
        { compilerOptions: { target: "ESNext", module: "NodeNext", moduleResolution: "BUNDLER", jsx: "React-JSX", newLine: "LF" } },
        { compilerOptions: { paths: { "@/*": ["src/*"] }, plugins: [{ name: "some-plugin", customSetting: true }], moduleSuffixes: ["", ".native"] } },
        { typeAcquisition: { enable: true, include: ["node"], exclude: [] } },
        { contentMappers: [{ package: "mapper", extensions: [".vue"], options: { customSetting: true } }] },
        { "$schema": "./tsconfig.schema.json", "tool-specific": { anything: true } },
    ];
    const invalid = [
        null,
        [],
        true,
        { extends: null },
        { extends: 1 },
        { extends: ["./base", false] },
        { files: ["file.ts", 1] },
        { compilerOptions: { strict: "true" } },
        { compilerOptions: { target: "es9999" } },
        { compilerOptions: { target: "es2025\n" } },
        { compilerOptions: { module: 99 } },
        { compilerOptions: { paths: { "@/*": "src/*" } } },
        { compilerOptions: { paths: { "@/*": [false] } } },
        { compilerOptions: { plugins: ["plugin"] } },
        { compilerOptions: { plugins: [{ name: false }] } },
        { compilerOptions: { maxNodeModuleJsDepth: "2" } },
        { typeAcquisition: { enable: "true" } },
        { typeAcquisition: { exclude: [false] } },
        { references: [{ path: false }] },
        { references: [{}] },
        { references: [{ path: "" }] },
        { references: [{ path: null }] },
        { contentMappers: [{ package: "", extensions: [] }] },
        { contentMappers: [{ package: "mapper" }] },
        { contentMappers: [{ package: "mapper", extensions: [1] }] },
        { contentMappers: [{ package: "mapper", extensions: [], options: null }] },
    ];
    for (const kind of ["tsconfig", "jsconfig"] as const) {
        const schema = generateConfigSchema(kind);
        for (const config of valid) assert(accepts(schema, config, schema), `${kind}: ${JSON.stringify(config)}`);
        for (const config of invalid) assert(!accepts(schema, config, schema), `${kind}: ${JSON.stringify(config)}`);
    }
});

test("schemas preserve SchemaStore's extensible and partial option objects", () => {
    const configs = [
        { compilerOptions: { strictTypo: true, showConfig: true } },
        { typeAcquisition: { customSetting: true } },
        { compilerOptions: { plugins: [{}] } },
        { references: [{ path: "../project", customSetting: true }] },
        { "ts-node": { transpileOnly: true }, "buildOptions": { force: true } },
    ];
    for (const kind of ["tsconfig", "jsconfig"] as const) {
        const schema = generateConfigSchema(kind);
        for (const config of configs) assert(accepts(schema, config, schema), `${kind}: ${JSON.stringify(config)}`);
    }
});

test("every enum value accepts mixed casing without broadening the accepted names", () => {
    const schema = generateConfigSchema("tsconfig");
    for (const [name, map] of Object.entries(options.enumMaps)) {
        const option = schema.definitions.compilerOptions.properties[name];
        assert(option, name);
        const list = options.compilerOptions.some(option => option.name === name && optionKind(option) === "List");
        for (const entry of map.values) {
            for (const text of [entry.name, entry.name.toUpperCase(), entry.name.replace(/[a-z]/g, (char, index: number) => index % 2 ? char.toUpperCase() : char)]) {
                assert(accepts(option, list ? [text] : text, schema), `${name}: ${text}`);
            }
            for (const text of [`${entry.name}x`, `x${entry.name}`, `${entry.name}\n`, entry.name.replaceAll(".", "!")]) {
                if (map.values.some(entry => entry.name === text)) continue;
                assert(!accepts(option, list ? [text] : text, schema), `${name}: ${JSON.stringify(text)}`);
            }
        }
    }
});

test("schema defaults are valid and conditional defaults stay descriptive", () => {
    for (const kind of ["tsconfig", "jsconfig"] as const) {
        const schema = generateConfigSchema(kind);
        for (const definition of Object.values(schema.definitions)) {
            for (const [name, property] of Object.entries(definition.properties)) {
                if (property.default !== undefined) assert(accepts(property, property.default, schema), `${kind}: ${name}`);
            }
        }
        assert.equal(schema.definitions.compilerOptions.properties.moduleResolution.default, undefined);
        assert.match(schema.definitions.compilerOptions.properties.moduleResolution.description!, /Default:/);
        const latestStandard = options.enums.find(enumDef => enumDef.name === "ScriptTarget")!.members.find(member => member.name === "LatestStandard")!.value;
        assert.equal(schema.definitions.compilerOptions.properties.target.default, String(latestStandard).toLowerCase());
        for (
            const [name, value] of Object.entries({
                jsxFactory: "React.createElement",
                newLine: "lf",
            })
        ) {
            assert.equal(schema.definitions.compilerOptions.properties[name].default, value, `${kind}: ${name}`);
        }
    }
    assert.doesNotMatch(generateConfigSchema("jsconfig").definitions.compilerOptions.properties.allowJs.description!, /Default:.*false/);
});

test("schema hover documentation includes reference links and conditional defaults", () => {
    for (const kind of ["tsconfig", "jsconfig"] as const) {
        const schema = generateConfigSchema(kind);
        const compiler = schema.definitions.compilerOptions.properties;
        for (const [name, property] of Object.entries(compiler)) {
            const declaration = options.compilerOptions.find(option => option.name === name)?.declaration
                ?? options.schemaOnlyOptions.find(option => option.name === name);
            assert(declaration, `${kind}: ${name}`);
            if (!declaration.description) {
                assert.equal(property.markdownDescription, undefined, `${kind}: ${name}`);
                continue;
            }
            assert(property.description, `${kind}: ${name}`);
            const markdown = property.markdownDescription;
            assert(markdown, `${kind}: ${name}`);
            assert(markdown.startsWith(property.description), `${kind}: ${name}`);
            if (name === "deduplicatePackages" || name === "stableTypeOrdering") {
                assert.equal(property.markdownDescription, property.description);
            }
            else {
                assert(markdown.includes(`https://www.typescriptlang.org/tsconfig/#${name}`), `${kind}: ${name}`);
            }
        }
        assert.match(compiler.moduleResolution.markdownDescription!, /Default:/);
        for (const property of Object.values(schema.definitions.typeAcquisition.properties)) {
            assert.match(property.markdownDescription!, /tsconfig\/#typeAcquisition/);
        }
        assert.match(schema.properties.include.markdownDescription!, /tsconfig\/#include/);
        assert.equal(schema.properties.contentMappers.markdownDescription, schema.properties.contentMappers.description);
    }
});

test("invalid metadata is rejected before generating files", () => {
    const duplicate = structuredClone(options);
    duplicate.compilerOptions.push(duplicate.compilerOptions[0]);
    assert.throws(() => validateOptions(duplicate), /Duplicate compiler option/);
    const missingEnum = structuredClone(options);
    delete missingEnum.enumMaps.target;
    assert.throws(() => validateOptions(missingEnum), /Missing enum map: target/);
    const missingElement = structuredClone(options);
    delete missingElement.elements.lib;
    assert.throws(() => validateOptions(missingElement), /Missing list element: lib/);
    const removedValidation = structuredClone(options);
    // @ts-expect-error Only locale validation is supported.
    removedValidation.elements.lib.extraValidation = "spec";
    assert.throws(() => validateOptions(removedValidation), /Invalid extra validation: spec/);
    const missingConstant = structuredClone(options);
    missingConstant.enumMaps.target.values[0].value = { go: "core.ScriptTargetMissing" };
    assert.throws(() => validateOptions(missingConstant), /Unknown enum constant/);
    const invalidAlias = structuredClone(options);
    invalidAlias.enums[0].members[0].value = "Missing";
    assert.throws(() => validateOptions(invalidAlias), /Unknown enum alias/);
    const invalidTranspile = structuredClone(options);
    invalidTranspile.compilerOptions[0].transpile = { value: true, unless: "missing" };
    assert.throws(() => validateOptions(invalidTranspile), /Unknown transpile condition/);
});

test("schemas include config options, not API-only or command-line-only fields", () => {
    const schema = generateConfigSchema("tsconfig");
    const properties = schema.definitions.compilerOptions.properties;
    for (const name of ["strict", "paths", "plugins", "lib", "target", "diagnostics", "pretty"]) {
        assert.ok(properties[name], name);
    }
    for (const name of ["configFilePath", "pathsBasePath", "noDtsResolution", "help", "watch", "showConfig", "runExternalCode"]) {
        assert.equal(properties[name], undefined, name);
    }
});

test("jsconfig defaults are distinct from tsconfig defaults", () => {
    const ts = generateConfigSchema("tsconfig");
    const js = generateConfigSchema("jsconfig");
    for (const [name, value] of Object.entries({ allowJs: true, noEmit: true, skipLibCheck: true, maxNodeModuleJsDepth: 2 })) {
        assert.equal(js.definitions.compilerOptions.properties[name].default, value);
        assert.notEqual(ts.definitions.compilerOptions.properties[name].default, value);
    }
    assert.equal(js.definitions.typeAcquisition.properties.enable.default, true);
    assert.equal(ts.definitions.typeAcquisition.properties.enable.default, false);
});
