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
    readonly hash: string;
    readonly text: string;
    readonly originalText: string;
    readonly scriptKind: number;
    readonly mappings: readonly ContentMapperVirtualSpan[];
    readonly diagnosticDirectives: readonly ContentMapperDiagnosticDirective[];
}

export interface MappedOutput extends ContentMapperVirtualFile {
    readonly key: string;
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

export function textPositionAt(text: string, offset: number): { readonly line: number; readonly character: number; } {
    const limit = Math.min(Math.max(offset, 0), text.length);
    let line = 0;
    let lineStart = 0;
    for (let index = 0; index < limit; index++) {
        const character = text.charCodeAt(index);
        if (character === 13) {
            if (index + 1 < limit && text.charCodeAt(index + 1) === 10) {
                index++;
            }
            line++;
            lineStart = index + 1;
        }
        else if (character === 10) {
            line++;
            lineStart = index + 1;
        }
    }
    return { line, character: limit - lineStart };
}

export function toMappedOutputs(files: readonly ContentMapperVirtualFile[]): readonly MappedOutput[] {
    return files.map((file, index) => ({
        ...file,
        key: String(index),
    }));
}
