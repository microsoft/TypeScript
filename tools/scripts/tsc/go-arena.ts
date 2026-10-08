import * as fs from "node:fs";
import * as path from "node:path";
import { repoRoot } from "../gen/utils.mts";
import type {
    MemberInfo,
    NodeType,
} from "./schema.ts";
import { api } from "./schema.ts";

interface Writer {
    write(line?: string): void;
    push(): void;
    pop(): void;
}

export const arenaHeaderWords = 8;

interface ArenaField {
    name: string;
    type: string;
    storage: string;
}

const handwritten = fs.readFileSync(path.join(repoRoot, "tsc/internal/ast/ast.go"), "utf8");
const handwrittenMethods = new Set(
    [...handwritten.matchAll(/func \(\w+ \*?(\w+)\) (\w+)\(/g)].map(m => `${m[1]}.${m[2]}`),
);

export function arenaFields(node: NodeType): MemberInfo[] {
    const fields = new Map<string, MemberInfo>();
    const visit = (type: NodeType) => {
        for (const base of type.extends) visit(base);
        for (const field of type.isBase ? type.fields : type.members) {
            if (field.noGo || field.inherited || field.isKindParam() || (type.key === "NodeBase" && field.name === "Flags")) continue;
            if (type.name === "SourceFile" && !type.isBase) continue;
            fields.set(field.name, field);
        }
    };
    visit(node);
    return [...fields.values()];
}

export function arenaFieldType(field: MemberInfo): string {
    const type = field.goOnly ? field.rawType as string : field.type.formatGoReference();
    return type === "*Node" ? "Node" : type;
}

function storageType(field: MemberInfo): string {
    const type = arenaFieldType(field);
    if (type === "Node") return "Node";
    if (!field.goOnly && field.type.baseKind() === "node") return "Node";
    if (type.startsWith("*") && api.listAliases().some(alias => `*${alias.name}` === type)) return "*NodeList";
    return type;
}

function isScalar(type: string): boolean {
    return type === "bool" || type === "int" || type === "int32" || type === "Kind" ||
        type.endsWith("Flags") || type.endsWith("SyntaxKind");
}

const poolTypes = [
    ...new Set(
        [...api.nodes()].flatMap(node => arenaFields(node).map(storageType))
            .concat(["*SourceFile", "*FlowLabel", "*FlowList"]),
    ),
]
    .filter(type => type !== "Node" && type !== "atomic.Uint32" && !isScalar(type)).sort();

function poolName(type: string): string {
    if (!poolTypes.includes(type)) throw new Error(`No arena pool for ${type}`);
    return `pool${api.capitalize(type.replaceAll("[]", "Slice").replaceAll("*", ""))}`;
}

export function generateArenaPools(w: Writer): void {
    w.write("type nodeArenaPools struct {");
    w.push();
    for (const type of poolTypes) w.write(`${poolName(type)} []${type}`);
    w.pop();
    w.write("}");
    w.write("");
    for (const type of poolTypes) {
        const pool = poolName(type);
        w.write(`func (node Node) ${pool}(index uint32) ${type} {`);
        w.push();
        w.write(`if index == 0 { return ${type === "string" ? '""' : "nil"} }`);
        w.write(`return node.file.arena.${pool}[index-1]`);
        w.pop();
        w.write("}");
    }
}

export function arenaReadField(node: NodeType, field: MemberInfo, record: string, handle = "node.Node"): string {
    const index = arenaFields(node).findIndex(f => f.name === field.name);
    if (index < 0) throw new Error(`${node.name}.${field.name} has no arena field`);
    const offset = `${record}[${arenaHeaderWords + index}]`;
    const type = storageType(field);
    if (type === "Node") return `${handle}.nodeFromOffset(${offset})`;
    return `${handle}.${poolName(type)}(${offset})`;
}

function methodOwner(node: NodeType, method: string): string {
    if (handwrittenMethods.has(`${node.name}.${method}`)) return node.name;
    if (method === "computeSubtreeFacts" && node.generateSubtreeFacts) return node.name;
    for (const base of node.extends) {
        const owner = methodOwner(base, method);
        if (owner !== "NodeDefault") return owner;
    }
    return "NodeDefault";
}

function setterName(name: string): string {
    if (name === "modifiers") return "setModifiersField";
    return `${name[0] === name[0].toLowerCase() ? "set" : "Set"}${api.capitalize(name)}`;
}

function emitField(w: Writer, owner: string, field: ArenaField, offset: string): void {
    const { type, storage } = field;
    const getterType = type === "atomic.Uint32" ? "*atomic.Uint32" : type;
    w.write(`func (node ${owner}) ${field.name}() ${getterType} {`);
    w.push();
    if (storage === "Node") w.write(`return node.Node.nodeField(${offset})`);
    else if (storage === "atomic.Uint32") w.write(`return node.Node.atomicField(${offset})`);
    else if (storage === "bool") w.write(`return node.Node.uintField(${offset}) != 0`);
    else if (isScalar(storage)) w.write(`return ${type}(node.Node.uintField(${offset}))`);
    else {
        w.write(`return node.Node.${poolName(storage)}(node.Node.uintField(${offset}))`);
    }
    w.pop();
    w.write("}");
    if (storage === "atomic.Uint32") return;
    w.write(`func (node ${owner}) ${setterName(field.name)}(value ${type}) {`);
    w.push();
    if (storage === "Node") w.write(`node.Node.setNodeField(${offset}, value)`);
    else if (storage === "bool") {
        w.write("var bits uint32");
        w.write("if value { bits = 1 }");
        w.write(`node.Node.setUintField(${offset}, bits)`);
    }
    else if (isScalar(storage)) w.write(`node.Node.setUintField(${offset}, uint32(value))`);
    else {
        const pool = `node.Node.file.arena.${poolName(storage)}`;
        w.write(`index := node.Node.uintField(${offset})`);
        w.write(`if index != 0 { ${pool}[index-1] = value; return }`);
        w.write(`if ${type === "string" ? 'value == ""' : "value == nil"} { return }`);
        w.write(`${pool} = append(${pool}, value)`);
        w.write(`node.Node.setUintField(${offset}, arenaPoolIndex(len(${pool})))`);
    }
    w.pop();
    w.write("}");
    w.write("");
}

function baseFieldOffset(w: Writer, base: NodeType, field: MemberInfo): string {
    const name = `arena${base.name}${api.capitalize(field.name)}Offset`;
    w.write(`var ${name} = [arenaLayoutCount]uint8{`);
    w.push();
    for (const node of api.nodes()) {
        const fields = arenaFields(node);
        const index = fields.findIndex(f => f === field);
        if (index >= 0) w.write(`arenaLayout${node.name}: ${arenaHeaderWords + index},`);
    }
    w.pop();
    w.write("}");
    return `node.Node.baseOffset(&${name})`;
}

export function generateArenaView(w: Writer, node: NodeType): void {
    if (!node.handWritten && node.name !== "NodeBase") {
        w.write(`type ${node.name} struct { NodeDefault }`);
    }
    const fields = arenaFields(node);
    for (const [i, field] of fields.entries()) {
        const offset = node.isBase ? baseFieldOffset(w, node, field) : String(arenaHeaderWords + i);
        emitField(w, node.name, { name: field.name, type: arenaFieldType(field), storage: storageType(field) }, offset);
    }
    const bases = new Set<string>();
    const visit = (type: NodeType) => {
        for (const base of type.extends) {
            bases.add(base.name);
            visit(base);
        }
    };
    visit(node);
    for (const base of bases) {
        if (base === "NodeBase") continue;
        w.write(`func (node ${node.name}) ${base}() ${base} { return ${base}{NodeDefault{node.Node}} }`);
    }
    for (const method of ["computeSubtreeFacts", "propagateSubtreeFacts", "subtreeFactsWorker"]) {
        const owner = methodOwner(node, method);
        if (owner === node.name || owner === "NodeDefault" || (method === "subtreeFactsWorker" && owner !== "CompositeBase")) continue;
        const params = method === "subtreeFactsWorker" ? "self Node" : "";
        const args = method === "subtreeFactsWorker" ? "self" : "";
        w.write(`func (node ${node.name}) ${method}(${params}) SubtreeFacts { return (${owner}{NodeDefault{node.Node}}).${method}(${args}) }`);
    }
    w.write("");
}

export function arenaSourceFileOffset(): number {
    return arenaHeaderWords + arenaFields(api.getNode("SourceFile")!).length;
}

export function arenaSourceFilePool(): string {
    return poolName("*SourceFile");
}

export function generateArenaSizes(w: Writer): void {
    w.write(`const arenaHeaderWords = ${arenaHeaderWords}`);
    w.write("const (");
    w.push();
    let first = true;
    for (const node of api.nodes()) {
        w.write(`arenaLayout${node.name}${first ? " uint32 = iota" : ""}`);
        first = false;
    }
    w.write("arenaLayoutFlowSwitchClauseData");
    w.write("arenaLayoutFlowReduceLabelData");
    w.write("arenaLayoutCount");
    w.pop();
    w.write(")");
    w.write("");
    w.write("func (f *NodeFactory) newSourceFile(file *SourceFile) Node {");
    w.push();
    w.write("node := f.newNode(KindSourceFile, arenaLayoutSourceFile)");
    w.write("file.NodeBase = NodeBase{NodeDefault{node}}");
    const pool = `node.file.arena.${arenaSourceFilePool()}`;
    w.write(`${pool} = append(${pool}, file)`);
    w.write(`node.setUintField(${arenaSourceFileOffset()}, arenaPoolIndex(len(${pool})))`);
    w.write("f.onCreate(node)");
    w.write("return node");
    w.pop();
    w.write("}");
    w.write("var arenaNodeSizes = [arenaLayoutCount]uint8{");
    w.push();
    for (const node of api.nodes()) {
        const size = arenaHeaderWords + arenaFields(node).length + (node.name === "SourceFile" ? 1 : 0);
        if (size > 255) throw new Error(`${node.name} exceeds arena size table capacity`);
        w.write(`arenaLayout${node.name}: ${size},`);
    }
    w.write(`arenaLayoutFlowSwitchClauseData: ${arenaHeaderWords + 3},`);
    w.write(`arenaLayoutFlowReduceLabelData: ${arenaHeaderWords + 2},`);
    w.pop();
    w.write("}");
    w.write("");
}

export function generateFlowArenaViews(w: Writer): void {
    for (
        const [owner, name, type, offset] of [
            ["FlowSwitchClauseData", "SwitchStatement", "Node", 0],
            ["FlowSwitchClauseData", "ClauseStart", "int32", 1],
            ["FlowSwitchClauseData", "ClauseEnd", "int32", 2],
            ["FlowReduceLabelData", "Target", "*FlowLabel", 0],
            ["FlowReduceLabelData", "Antecedents", "*FlowList", 1],
        ] as const
    ) {
        emitField(w, owner, { name, type, storage: type }, String(arenaHeaderWords + offset));
    }
}
