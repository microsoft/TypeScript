/*@internal*/
/** Tracing events for the compiler. */
namespace ts.tracing {
    type WriteFn = (data: string) => void;

    let write: WriteFn | undefined;

    /** Enables (and resets) tracing events for the compiler. */
    export function startTracing(w: WriteFn) {
        write = w;
        write(`[\n`);
    }

    /** Disables tracing events for the compiler. */
    export function stopTracing() {
        // This both indicates that the trace is untruncated and conveniently
        // ensures that the last array element won't have a trailing comma.
        write?.(`{"pid":1,"tid":1,"ph":"i","ts":${1000 * timestamp()},"name":"done","s":"g"}\n`);
        write?.(`]\n`);
        write = undefined;
    }

    export function isTracing() {
        return !!write;
    }

    export const enum Phase {
        Parse = "parse",
        Program = "program",
        Bind = "bind",
        Check = "check",
        Emit = "emit",
    }

    export function begin(phase: Phase, name: string, args: object) {
        performance.mark("beginTracing");
        write?.(`{"pid":1,"tid":1,"ph":"B","cat":"${phase}","ts":${1000 * timestamp()},"name":"${name}","args":{ "ts": ${JSON.stringify(args)} }},\n`);
        performance.mark("endTracing");
        performance.measure("Tracing", "beginTracing", "endTracing");
    }

    export function end() {
        performance.mark("beginTracing");
        write?.(`{"pid":1,"tid":1,"ph":"E","ts":${1000 * timestamp()}},\n`);
        performance.mark("endTracing");
        performance.measure("Tracing", "beginTracing", "endTracing");
    }

    function indexFromOne(lc: LineAndCharacter): LineAndCharacter {
        return {
            line: lc.line + 1,
            character: lc.character + 1,
        };
    }

    export function dumpTypes(types: readonly Type[], write: WriteFn) {
        performance.mark("beginDumpTypes");

        const numTypes = types.length;

        // Cleverness: no line break hear so that the type ID will match the line number
        write("[");
        for (let i = 0; i < numTypes; i++) {
            const type = types[i];
            const objectFlags = (type as any).objectFlags;
            const symbol = type.aliasSymbol ?? type.symbol;
            const firstDeclaration = symbol?.declarations?.[0];
            const firstFile = firstDeclaration && getSourceFileOfNode(firstDeclaration);

            // It's slow to compute the display text, so skip it unless it's really valuable (or cheap)
            let display: string | undefined;
            if ((objectFlags & ObjectFlags.Anonymous) | (type.flags & TypeFlags.Literal)) {
                try {
                    display = type.checker?.typeToString(type);
                }
                catch {
                    display = undefined;
                }
            }

            let indexedAccessProperties: object = {};
            if (type.flags & TypeFlags.IndexedAccess) {
                const indexedAccessType = type as IndexedAccessType;
                indexedAccessProperties = {
                    indexedAccessObjectType: indexedAccessType.objectType?.id,
                    indexedAccessIndexType: indexedAccessType.indexType?.id,
                };
            }

            let referenceProperties: object = {};
            if (objectFlags & ObjectFlags.Reference) {
                const referenceType = type as TypeReference;
                referenceProperties = {
                    instantiatedType: referenceType.target?.id,
                    typeArguments: referenceType.resolvedTypeArguments?.map(t => t.id),
                };
            }

            let conditionalProperties: object = {};
            if (type.flags & TypeFlags.Conditional) {
                const conditionalType = type as ConditionalType;
                conditionalProperties = {
                    conditionalCheckType: conditionalType.checkType?.id,
                    conditionalExtendsType: conditionalType.extendsType?.id,
                    conditionalTrueType: conditionalType.resolvedTrueType?.id ?? -1,
                    conditionalFalseType: conditionalType.resolvedFalseType?.id ?? -1,
                };
            }

            const descriptor = {
                id: type.id,
                intrinsicName: (type as any).intrinsicName,
                symbolName: symbol?.escapedName && unescapeLeadingUnderscores(symbol.escapedName),
                unionTypes: (type.flags & TypeFlags.Union) ? (type as UnionType).types?.map(t => t.id) : undefined,
                intersectionTypes: (type.flags & TypeFlags.Intersection) ? (type as IntersectionType).types.map(t => t.id) : undefined,
                aliasTypeArguments: type.aliasTypeArguments?.map(t => t.id),
                keyofType: (type.flags & TypeFlags.Index) ? (type as IndexType).type?.id : undefined,
                ...indexedAccessProperties,
                ...referenceProperties,
                ...conditionalProperties,
                firstDeclaration: firstDeclaration && {
                    path: firstFile.path,
                    start: indexFromOne(getLineAndCharacterOfPosition(firstFile, firstDeclaration.pos)),
                    end: indexFromOne(getLineAndCharacterOfPosition(getSourceFileOfNode(firstDeclaration), firstDeclaration.end)),
                },
                flags: Debug.formatTypeFlags(type.flags).split("|"),
                display,
            };

            write(JSON.stringify(descriptor));
            if (i < numTypes - 1) {
                write(",\n");
            }
        }
        write("]\n");

        performance.mark("endDumpTypes");
        performance.measure("Dump types", "beginDumpTypes", "endDumpTypes");
    }
}
