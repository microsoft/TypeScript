import assert from "node:assert";
import cp from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import which from "which";

/**
 * @import { MetaModel, OrType, Type } from "./metaModelSchema.mts"
 */
void 0;

const __filename = url.fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);

const out = path.resolve(__dirname, "../lsp_generated.go");

const metaModelPath = path.resolve(__dirname, "metaModel.json");

if (!fs.existsSync(metaModelPath)) {
    console.error("Meta model file not found; did you forget to run fetchModel.mjs?");
    process.exit(1);
}

/** @type {MetaModel} */
const model = JSON.parse(fs.readFileSync(metaModelPath, "utf-8"));

/**
 * @param {string | number} a
 * @param {string | number} b
 * @returns {number}
 */
function compareValues(a, b) {
    if (typeof a === "string" && typeof b === "string") {
        return a < b ? -1 : a > b ? 1 : 0;
    }
    if (typeof a === "number" && typeof b === "number") {
        return a - b;
    }
    throw new Error("Cannot compare values of different types");
}

/** @type {string[]} */
let parts = [];

/**
 * @param {string} s
 */
function write(s) {
    parts.push(s);
}

/**
 * @param {string} s
 */
function writeLine(s) {
    write(s);
    write("\n");
}

/**
 * @param {string | undefined} doc
 */
function writeDocumentation(doc) {
    if (doc) {
        const lines = doc.split("\n");
        for (let line of lines) {
            line = line.replace(/(\w ) +/g, "$1");
            line = line.replace(/\{@link(?:code)?.*?([^} ]+)\}/g, "$1");
            line = line.replace(/@since (.*)/g, "Since: $1\n//");
            if (line.startsWith("@deprecated")) {
                continue;
            }
            if (line.startsWith("@proposed")) {
                line = "Proposed.\n//";
            }

            write("// ");
            writeLine(line);
        }
    }
}

/**
 * @param {string | undefined} deprecated
 */
function writeDeprecation(deprecated) {
    if (deprecated) {
        writeLine("//");
        write("// Deprecated: ");
        writeLine(deprecated);
    }
}

/**
 * @param {string} s
 */
function titleCase(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * @typedef {{ type: Type; name: string; }} UnionMember
 */
void 0;

/**
 * Map from literal value to type name.
 * @type {Map<string | number | boolean, string>}
 */
const literalTypes = new Map();

/** @type {Map<string, UnionMember[]>} */
const unionTypes = new Map();

/**
 * @param {OrType} t
 * @param {boolean} wasOptional
 * @returns {boolean}
 */
function writeOr(t, wasOptional = false) {
    let nullable = false;
    let omitEmpty = true;
    const types = t.items.filter(item => {
        if (item.kind === "base" && item.name === "null") {
            nullable = true;
            return false;
        }
        return true;
    });
    if (nullable) {
        if (wasOptional) {
            write("Nullable[");
        }
        else {
            write("*");
            omitEmpty = false;
        }
    }
    if (types.length === 1) {
        writeTypeElement(types[0]);
    }
    else {
        /** @type {UnionMember[]} */
        const members = [];
        for (const t of types) {
            let name;
            if (t.kind === "reference") {
                name = t.name;
            }
            else if (t.kind === "base") {
                name = t.name;
            }
            else if (t.kind === "array" && (t.element.kind === "reference" || t.element.kind === "base")) {
                name = titleCase(t.element.name) + "s";
            }
            else if (t.kind === "tuple") {
                assert(t.items.length === 2);
                assert(t.items[0].kind === "base" && t.items[0].name === "uinteger");
                assert(t.items[1].kind === "base" && t.items[1].name === "uinteger");
                name = "UintegerPair";
            }
            else if (t.kind === "or") {
                throw new Error("Nested or types are not supported");
            }
            else if (t.kind === "literal") {
                assert(t.value.properties.length === 0);
                name = "EmptyObject";
            }
            else {
                name = "_TODO_or_" + t.kind + "_";
            }
            members.push({ type: t, name });
        }

        const name = members.map(m => titleCase(m.name)).join("Or");
        unionTypes.set(name, members);
        write(name);
    }
    if (nullable && wasOptional) {
        write("]");
    }
    return omitEmpty;
}

/**
 * @param {Type} t
 * @param {boolean} wasOptional
 * @returns {boolean}
 */
function writeTypeElement(t, wasOptional = false) {
    switch (t.kind) {
        case "reference":
            write(t.name);
            break;
        case "base":
            switch (t.name) {
                case "integer":
                    write("int32");
                    break;
                case "uinteger":
                    write("uint32");
                    break;
                case "string":
                    write("string");
                    break;
                case "boolean":
                    write("bool");
                    break;
                case "URI":
                    write("URI");
                    break;
                case "DocumentUri":
                    write("DocumentUri");
                    break;
                case "decimal":
                    write("float64");
                    break;
                default:
                    write("TODO_base_" + t.name);
                    break;
            }
            break;
        case "array":
            write("[]");
            writeTypeElement(t.element);
            break;
        case "stringLiteral": {
            const typeName = `StringLiteral${titleCase(t.value)}`;
            literalTypes.set(t.value, typeName);
            write(typeName);
            break;
        }
        case "booleanLiteral": {
            const typeName = `BooleanLiteral${t.value ? "True" : "False"}`;
            literalTypes.set(t.value, typeName);
            write(typeName);
            break;
        }
        case "integerLiteral": {
            const typeName = `IntegerLiteral${t.value}`;
            literalTypes.set(t.value, typeName);
            write(typeName);
            break;
        }
        case "literal":
            assert(t.value.properties.length === 0);
            write("struct{}");
            break;
        case "tuple":
            assert(t.items.length === 2);
            assert(t.items[0].kind === "base" && t.items[0].name === "uinteger");
            assert(t.items[1].kind === "base" && t.items[1].name === "uinteger");
            write("[2]uint32");
            break;
        case "map":
            write("map[");
            write(t.key.name);
            write("]");

            const vt = t.value;
            switch (vt.kind) {
                case "reference":
                    write(vt.name);
                    break;
                case "array":
                    write("[]");
                    writeTypeElement(vt.element);
                    break;
                case "or":
                    writeOr(vt);
                    break;
                default:
                    write("TODO_map_value_" + vt.kind);
                    break;
            }
            break;
        case "or":
            return writeOr(t, wasOptional);
        default:
            write("TODO_" + t.kind);
            break;
    }
    return wasOptional;
}

// Generation

writeLine("// Code generated by generate.mjs; DO NOT EDIT.");
writeLine("");
writeLine("package lsproto");
writeLine("");
writeLine(`import (`);
writeLine(`\t"encoding/json"`);
writeLine(`\t"fmt"`);
writeLine(`)`);
writeLine("");
writeLine("// Meta model version " + model.metaData.version);
writeLine("");

writeLine("// Structures\n");

for (const t of model.structures) {
    writeDocumentation(t.documentation);
    writeDeprecation(t.deprecated);

    writeLine("type " + t.name + " struct {");

    for (const e of t.extends ?? []) {
        if (e.kind !== "reference") {
            throw new Error("Unexpected extends kind: " + e.kind);
        }
        writeLine(e.name);
    }
    for (const m of t.mixins ?? []) {
        if (m.kind !== "reference") {
            throw new Error("Unexpected mixin kind: " + m.kind);
        }
        writeLine(m.name);
    }

    if (t.extends || t.mixins) {
        writeLine("");
    }

    for (const p of t.properties) {
        writeDocumentation(p.documentation);
        writeDeprecation(p.deprecated);

        write(titleCase(p.name) + " ");

        if (p.optional) {
            write("*");
        }

        const omitEmpty = writeTypeElement(p.type, !!p.optional);
        write(' `json:"');
        write(p.name);
        if (omitEmpty) {
            write(",omitempty");
        }
        writeLine('"`');
        writeLine("");
    }

    writeLine("}");
    writeLine("");
}

writeLine("// Enumerations\n");

for (const t of model.enumerations) {
    writeDocumentation(t.documentation);
    writeDeprecation(t.deprecated);

    /** @type {string} */
    let underlyingType;
    switch (t.type.name) {
        case "string":
            underlyingType = "string";
            break;
        case "integer":
            underlyingType = "int32";
            break;
        case "uinteger":
            underlyingType = "uint32";
            break;
    }

    writeLine("type " + t.name + " " + underlyingType);
    writeLine("");

    /**
     * @param {string | number} v
     * @returns {string}
     */
    function valueToLiteral(v) {
        return typeof v === "string" ? '"' + v + '"' : `${v}`;
    }

    writeLine("const (");
    for (const v of t.values) {
        writeDocumentation(v.documentation);
        writeDeprecation(v.deprecated);

        write(t.name);
        write(v.name);
        write(" ");
        write(t.name);
        write(" = ");
        writeLine(valueToLiteral(v.value));
    }
    writeLine(")");

    writeLine("");

    writeLine("func (e *" + t.name + ") UnmarshalJSON(data []byte) error {");
    writeLine("var v " + underlyingType);
    writeLine("if err := json.Unmarshal(data, &v); err != nil {");
    writeLine("return err");
    writeLine("}");
    writeLine("switch v {");
    const values = [...new Set(t.values.map(v => v.value))].sort(compareValues);
    for (let i = 0; i < values.length; i++) {
        const v = values[i];
        if (i === 0) {
            write("case ");
        }
        write(valueToLiteral(v));
        if (i === values.length - 1) {
            writeLine(":");
        }
        else {
            if (i % 3 === 2) {
                writeLine(",");
            }
            else {
                write(", ");
            }
        }
    }
    writeLine("*e = " + t.name + "(v)");
    writeLine("return nil");
    writeLine("default:");
    writeLine(`return fmt.Errorf("unknown ${t.name} value: %v", v)`);
    writeLine("}");
    writeLine("}");
    writeLine("");
}

writeLine("// Type aliases\n");

for (const t of model.typeAliases) {
    writeDocumentation(t.documentation);
    writeDeprecation(t.deprecated);

    if (t.name === "LSPAny") {
        writeLine("type LSPAny = any\n");
        continue;
    }

    write("type " + t.name + " = ");
    writeTypeElement(t.type);
    writeLine("");
    writeLine("");
}

/**
 * @param {string} method
 * @returns {string}
 */
function methodNameToIdentifier(method) {
    return method.split("/").map(v => v === "$" ? "" : titleCase(v)).join("");
}

writeLine("// Unmarshallers\n");

writeLine("var unmarshallers = map[Method]func([]byte) (any, error){");
for (const t of [...model.requests, ...model.notifications]) {
    if (t.messageDirection === "serverToClient") {
        continue;
    }

    let name = "any";
    if (t.params) {
        assert(!Array.isArray(t.params));
        assert(t.params.kind === "reference");
        name = t.params.name;
    }

    writeLine(`Method${methodNameToIdentifier(t.method)}: unmarshallerFor[${name}],`);
}
writeLine("}");

writeLine("// Requests");
writeLine("const (");
for (const t of model.requests) {
    writeDocumentation(t.documentation);
    writeDeprecation(t.deprecated);
    writeLine("Method" + methodNameToIdentifier(t.method) + ' Method = "' + t.method + '"');
}
writeLine(")\n");

writeLine("// Notifications");
writeLine("const (");
for (const t of model.notifications) {
    writeDocumentation(t.documentation);
    writeDeprecation(t.deprecated);
    writeLine("Method" + methodNameToIdentifier(t.method) + ' Method = "' + t.method + '"');
}
writeLine(")\n");

writeLine("// Union types\n");

for (const [name, members] of unionTypes) {
    writeLine("type " + name + " struct {");

    for (const member of members) {
        write(titleCase(member.name) + " *");
        writeTypeElement(member.type, false);
        writeLine("");
    }

    writeLine("}");
    writeLine("");

    writeLine("func (o " + name + ") MarshalJSON() ([]byte, error) {");
    write(`assertOnlyOne("more than one element of ${name} is set", `);
    for (let i = 0; i < members.length; i++) {
        if (i > 0) {
            write(", ");
        }
        write("o." + titleCase(members[i].name) + " != nil");
    }
    writeLine(")");

    for (const member of members) {
        const name = titleCase(member.name);
        writeLine("if o." + name + " != nil {");
        writeLine("return json.Marshal(*o." + name + ")");
        writeLine("}");
    }
    writeLine('panic("unreachable")');
    writeLine("}");
    writeLine("");

    // TODO: do this way more efficiently
    // TODO: this doesn't work when union members overlap
    writeLine("func (o *" + name + ") UnmarshalJSON(data []byte) error {");
    writeLine("*o = " + name + "{}");
    for (const member of members) {
        const name = titleCase(member.name);
        const local = "v" + name;
        write("var " + local + " ");
        writeTypeElement(member.type);
        writeLine("");
        writeLine("if err := json.Unmarshal(data, &" + local + "); err == nil {");
        writeLine("o." + name + " = &" + local);
        writeLine("return nil");
        writeLine("}");
    }
    writeLine(`return fmt.Errorf("invalid ${name}: %s", data)`);
    writeLine("}");
}

writeLine("// Literal types\n");

for (const [value, name] of literalTypes) {
    const jsonValue = JSON.stringify(value);

    writeLine(`// ${name} is a literal type for ${jsonValue}`);
    writeLine("type " + name + " struct{}");
    writeLine("");

    writeLine("func (o " + name + ") MarshalJSON() ([]byte, error) {");
    writeLine("return []byte(`" + jsonValue + "`), nil");
    writeLine("}");
    writeLine("");

    writeLine("func (o *" + name + ") UnmarshalJSON(data []byte) error {");
    writeLine("if string(data) != `" + jsonValue + "` {");
    writeLine(`return fmt.Errorf("invalid ${name}: %s", data)`);
    writeLine("}");
    writeLine("return nil");
    writeLine("}");
    writeLine("");
}

fs.writeFileSync(out, parts.join(""));

const gofmt = which.sync("gofmt");
cp.execFileSync(gofmt, ["-w", out]);
