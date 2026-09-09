import { createHash } from "node:crypto";

export interface ContentMapperTextRange {
    readonly pos: number;
    readonly end: number;
}

export interface ContentMapperDiagnosticDirective {
    readonly originalRange: ContentMapperTextRange;
    readonly virtualRange: ContentMapperTextRange;
    readonly policy: number;
    readonly unusedCode: number;
}

export interface ContentMapperVirtualSpan {
    readonly generatedStart: number;
    readonly generatedLength: number;
    readonly originalStart: number;
    readonly originalLength: number;
    readonly kind: number;
    readonly features: number;
}

export interface ContentMapperVirtualFile {
    readonly fileName: string;
    readonly text: string;
    readonly originalText: string;
    readonly scriptKind: number;
    readonly mappings: readonly ContentMapperVirtualSpan[];
    readonly diagnosticDirectives: readonly ContentMapperDiagnosticDirective[];
}

export interface MappedOutput extends ContentMapperVirtualFile {
    readonly key: string;
    readonly identity: string;
}

export function containsNonEmptyTextRange(range: ContentMapperTextRange, offset: number): boolean {
    return range.pos < range.end && range.pos <= offset && offset < range.end;
}

export function textRangePreview(text: string, range: ContentMapperTextRange, maxLength = 80): string {
    const preview = text.slice(range.pos, range.end).trim().replace(/\s+/g, " ");
    const characters = [...preview];
    if (characters.length <= maxLength) {
        return preview;
    }
    return `${characters.slice(0, Math.max(0, maxLength - 3)).join("")}...`;
}

export function toMappedOutputs(files: readonly ContentMapperVirtualFile[]): readonly MappedOutput[] {
    return files.map((file, index) => ({
        ...file,
        key: String(index),
        identity: createHash("sha256").update(JSON.stringify(file)).digest("hex"),
    }));
}
