namespace ts.wasm {
    export interface WasmSourceFile {
        readonly fileName: string;
        readonly magic: [number, number, number, number];
        readonly version: number;
        readonly sections: WasmSection[];
    }

    export enum SectionKind {
        Custom,
        Type,
        Import,
        Function,
        Table,
        Memory,
        Global,
        Export,
        Start,
        Element,
        Code,
        Data,
    }

    export function parse(fileName: string, buf: Uint8Array): WasmSourceFile {
        let sections: WasmSection[];
        let magic: [number, number, number, number];
        Debug.assert(buf.length >= 8); // Minimum size of a wasm file: "magic" 4 bytes + version TODO: Issue diagnostic on failure
        return {
            fileName,
            get magic() {
                return magic ||= [buf[0], buf[1], buf[2], buf[3]];
            },
            get version() {
                return (buf as Buffer).readUInt32LE(4); // cast to node builtin read methods to save time putting this together TODO: probably don't need this, since we don't really check the `version` anywhere yet
            },
            get sections() {
                if (sections) {
                    return sections;
                }

                const result = [];
                const cursor: Cursor = { index: 8 };
                while (true) {
                    if (cursor.index >= buf.length) {
                        break;
                    }
                    const id = buf[cursor.index];
                    cursor.index++;
                    const size = parseUnsignedLEB128u32(cursor);
                    result.push(createWasmSection(id as SectionKind, cursor.index, size));
                    cursor.index += size;
                }
                return sections = result;
            }
        };

        interface Cursor {
            index: number;
        }

        function parseExpected(cursor: Cursor, byte: number) {
            Debug.assert(buf[cursor.index] === byte); // TODO: Issue diagnostic on malformed wasm, rather than crash
            cursor.index++;
        }

        function parseUnsignedLEB128u32(cursor: Cursor): number {
            let result = 0;
            let offset = 0;
            while (true) {
                const b = buf[cursor.index];
                cursor.index++;
                result |= (b & 0b0111_1111) << offset;
                if ((b & 0b1000_0000) === 0) {
                    break;
                }
                offset += 7;
            }
            return result;
        }

        function parseVector<T>(cursor: Cursor, parseElement: (cursor: Cursor) => T): T[] {
            const size = parseUnsignedLEB128u32(cursor);
            const elements: T[] = [];
            for (let i = 0; i < size; i++) {
                elements.push(parseElement(cursor));
            }
            return elements;
        }

        function parseValueType(cursor: Cursor): ValueType {
            const byte = buf[cursor.index];
            switch (byte) {
                case ValueType.i32:
                case ValueType.i64:
                case ValueType.f32:
                case ValueType.f64:
                    cursor.index++;
                    return byte;
                default:
                    Debug.fail(`Unknown value type: ${byte}`); // TODO: Issue diagnostic
            }
        }

        function parseResultTypes(cursor: Cursor): ValueType[] {
            return parseVector(cursor, parseValueType);
        }

        function parseFunctionType(cursor: Cursor): [parameters: ValueType[], returns: ValueType[]] {
            parseExpected(cursor, 0x60); // Function type section start byte
            const paramTypes = parseResultTypes(cursor);
            const returnTypes = parseResultTypes(cursor);
            return [paramTypes, returnTypes];
        }

        function parseUtf8Character(cursor: Cursor): string {
            const b1 = buf[cursor.index++];
            if ((b1 & 0b1000_0000) === 0) {
                return utf16EncodeAsString(b1);
            }
            const b2 = buf[cursor.index++];
            if ((b1 & 0b0010_0000) === 0) {
                return utf16EncodeAsString(((b1 & 0b0001_1111) << 6) | (b2 & 0b0011_1111));
            }
            const b3 = buf[cursor.index++];
            if ((b1 & 0b0001_0000) === 0) {
                return utf16EncodeAsString(
                    ((b1 & 0b0000_1111) << 12) |
                    ((b2 & 0b0011_1111) << 6) |
                    (b3 & 0b0011_1111)
                );
            }
            const b4 = buf[cursor.index++];
            return utf16EncodeAsString(
                ((b1 & 0b0000_0111) << 18) |
                ((b2 & 0b0011_1111) << 12) |
                ((b3 & 0b0011_1111) << 6) |
                (b4 & 0b0011_1111)
            );
        }

        function parseUtf8String(cursor: Cursor, byteLength: number): string {
            const start = cursor.index;
            Debug.assert((start + byteLength) < buf.byteLength); // TODO: Issue malformed file diagnostic if untrue
            let result = "";
            while (cursor.index < (start + byteLength)) {
                result += parseUtf8Character(cursor);
            }
            Debug.assert(cursor.index === start + byteLength); // TODO: Issue malformed file diagnostic if untrue
            return result;
        }

        function parseName(cursor: Cursor): string {
            const byteLength = parseUnsignedLEB128u32(cursor);
            return parseUtf8String(cursor, byteLength);
        }

        function parseExportDescription(cursor: Cursor): ExportDescription {
            const byte = buf[cursor.index];
            switch (byte) {
                case ExportKind.Func:
                case ExportKind.Table:
                case ExportKind.Mem:
                case ExportKind.Global:
                    cursor.index++;
                    const index = parseUnsignedLEB128u32(cursor);
                    return { kind: byte, index };
                default:
                    Debug.fail(`Unknown export kind: ${byte}`); // TODO: Issue diagnostic
            }
        }

        function parseWasmExport(cursor: Cursor): WasmExport {
            const name = parseName(cursor);
            const exportdesc = parseExportDescription(cursor);
            return { name, exportdesc };
        }

        function createWasmSection(kind: SectionKind, start: number, size: number): WasmSection {
            switch (kind) {
                case SectionKind.Custom: return createCustomSection(start, size);
                case SectionKind.Type: return createTypeSection(start, size);
                case SectionKind.Import: return createImportSection(start, size);
                case SectionKind.Function: return createFunctionSection(start, size);
                case SectionKind.Table: return createTableSection(start, size);
                case SectionKind.Memory: return createMemorySection(start, size);
                case SectionKind.Global: return createGlobalSection(start, size);
                case SectionKind.Export: return createExportSection(start, size);
                case SectionKind.Start: return createStartSection(start, size);
                case SectionKind.Element: return createElementSection(start, size);
                case SectionKind.Code: return createCodeSection(start, size);
                case SectionKind.Data: return createDataSection(start, size);
                default: Debug.assertNever(kind);
            }
        }

        function createCustomSection(start: number, size: number): CustomSection {
            // TODO: How should we reinterpret a custom section into a specific type of custom section
            // such as the `name` section?
            let name: string;
            let bytes: Uint8Array;
            return {
                id: SectionKind.Custom,
                start,
                size,
                get name() {
                    if (name) {
                        return name;
                    }
                    const nameCursor: Cursor = { index: start };
                    name = parseName(nameCursor);
                    const nameSize = (nameCursor.index - start);
                    const bytesSize = size - nameSize;
                    // TODO: This makes a view on node (which is what we want), but would clone the underlying memory in a browser
                    // It might be better to explicitly make a new ArrayBufferView over the same backing buffer for consistent behavior
                    // across platforms
                    bytes = buf.slice(nameCursor.index, nameCursor.index + bytesSize);
                    return name;
                },
                get bytes() {
                    void this.name; // intializes bytes
                    return bytes;
                }
            };
        }

        function createTypeSection(start: number, size: number): TypeSection {
            let funcs: TypeSection["funcs"];
            return {
                id: SectionKind.Type,
                start,
                size,
                get funcs() {
                    if (funcs) {
                        return funcs;
                    }
                    const cursor: Cursor = { index: start };
                    return funcs = parseVector(cursor, parseFunctionType);
                }
            };
        }

        function createImportSection(start: number, size: number): ImportSection {
            return {
                id: SectionKind.Import,
                start,
                size
            };
        }

        function createFunctionSection(start: number, size: number): FunctionSection {
            let indices: number[];
            return {
                id: SectionKind.Function,
                start,
                size,
                get indices() {
                    if (indices) {
                        return indices;
                    }
                    const cursor: Cursor = { index: start };
                    return indices = parseVector(cursor, parseUnsignedLEB128u32);
                }
            };
        }

        function createTableSection(start: number, size: number): TableSection {
            return {
                id: SectionKind.Table,
                start,
                size
            };
        }

        function createMemorySection(start: number, size: number): MemorySection {
            return {
                id: SectionKind.Memory,
                start,
                size
            };
        }

        function createGlobalSection(start: number, size: number): GlobalSection {
            return {
                id: SectionKind.Global,
                start,
                size
            };
        }

        function createExportSection(start: number, size: number): ExportSection {
            let exports: WasmExport[];
            return {
                id: SectionKind.Export,
                start,
                size,
                get exports() {
                    if (exports) {
                        return exports;
                    }
                    const cursor: Cursor = { index: start };
                    return exports = parseVector(cursor, parseWasmExport);
                }
            };
        }

        function createStartSection(start: number, size: number): StartSection {
            return {
                id: SectionKind.Start,
                start,
                size
            };
        }

        function createElementSection(start: number, size: number): ElementSection {
            return {
                id: SectionKind.Element,
                start,
                size
            };
        }

        function createCodeSection(start: number, size: number): CodeSection {
            return {
                id: SectionKind.Code,
                start,
                size
            };
        }

        function createDataSection(start: number, size: number): DataSection {
            return {
                id: SectionKind.Data,
                start,
                size
            };
        }
    }

    export type WasmSection =
        | CustomSection
        | TypeSection
        | ImportSection
        | FunctionSection
        | TableSection
        | MemorySection
        | GlobalSection
        | ExportSection
        | StartSection
        | ElementSection
        | CodeSection
        | DataSection;

    export interface SectionBase {
        readonly id: SectionKind;
        readonly start: number;
        readonly size: number;
    }

    export interface CustomSection extends SectionBase {
        readonly id: SectionKind.Custom;
        readonly name: string;
        readonly bytes: Uint8Array;
    }

    export interface TypeSection extends SectionBase {
        readonly id: SectionKind.Type;
        readonly funcs: [parameters: ValueType[], results: ValueType[]][]
    }

    export interface ImportSection extends SectionBase {
        readonly id: SectionKind.Import;
    }

    export interface FunctionSection extends SectionBase {
        readonly id: SectionKind.Function;
        readonly indices: number[];
    }

    export interface TableSection extends SectionBase {
        readonly id: SectionKind.Table;
    }

    export interface MemorySection extends SectionBase {
        readonly id: SectionKind.Memory;
    }

    export interface GlobalSection extends SectionBase {
        readonly id: SectionKind.Global;
    }

    export interface ExportSection extends SectionBase {
        readonly id: SectionKind.Export;
        readonly exports: WasmExport[];
    }

    export interface StartSection extends SectionBase {
        readonly id: SectionKind.Start;
    }

    export interface ElementSection extends SectionBase {
        readonly id: SectionKind.Element;
    }

    export interface CodeSection extends SectionBase {
        readonly id: SectionKind.Code;
    }

    export interface DataSection extends SectionBase {
        readonly id: SectionKind.Data;
    }

    export enum ValueType {
        i32 = 0x7F,
        i64 = 0x7E,
        f32 = 0x7D,
        f64 = 0x7C,
    }

    export interface WasmExport {
        readonly name: string;
        readonly exportdesc: ExportDescription;
    }

    export enum ExportKind {
        Func = 0x00,
        Table = 0x01,
        Mem = 0x02,
        Global = 0x03,
    }

    export interface ExportDescription {
        readonly kind: ExportKind;
        readonly index: number;
    }
}