namespace ts {
    export interface DecodedSourceMapAnnotation {
        generatedLine: number;
        generatedCharacter: number;
        annotations: SourceMapAnnotation[];
    }

    /**
     * Decodes the custom `x_ms_ts_annotations` field of a SourceMap.
     */
    export function decodeSourceMapAnnotations(annotations: string, names: readonly string[]): Iterator<DecodedSourceMapAnnotation> {
        const reader = createCharCodeReader(annotations);
        let done = false;
        let generatedLine = 0;
        let generatedCharacter = 0;
        let nameIndex = 0;

        return {
            next() {
                debugger;
                while (!done && reader.pos < reader.length) {
                    const ch = reader.peek();
                    if (ch === CharacterCodes.semicolon) {
                        generatedLine++;
                        generatedCharacter = 0;
                        reader.read();
                        continue;
                    }
                    if (ch === CharacterCodes.comma) {
                        reader.read();
                        continue;
                    }

                    generatedCharacter += base64VLQFormatDecode(reader, noop);
                    if (generatedCharacter < 0) break;
                    if (isSegmentEnd()) continue;

                    nameIndex += base64VLQFormatDecode(reader, noop);
                    const name = elementAt(names, nameIndex);
                    if (name) {
                        const annotations = decodeAnnotations(createCharCodeReader(name));
                        if (annotations) {
                            return { value: { generatedLine, generatedCharacter, annotations }, done };
                        }
                    }
                }

                done = true;
                return { value: undefined!, done: true } as { value: never, done: true };
            }
        };

        function isSegmentEnd() {
            return (reader.pos === reader.length ||
                reader.peek() === CharacterCodes.comma ||
                reader.peek() === CharacterCodes.semicolon);
        }

        function decodeAnnotations(reader: CharCodeReader): SourceMapAnnotation[] | undefined {
            let nameIndex = 0;
            const annotations = decodeAnnotationWorker();
            if (Array.isArray(annotations) && annotations.every(isSourceMapAnnotation)) {
                return annotations;
            }

            function decodeAnnotationWorker(): unknown {
                if (reader.pos < reader.length) {
                    let ch = reader.peek();
                    if (ch === CharacterCodes.hash) {
                        reader.read();
                        return base64VLQFormatDecode(reader, noop);
                    }
                    else if (ch === CharacterCodes.at) {
                        reader.read();
                        nameIndex += base64VLQFormatDecode(reader, noop);
                        return elementAt(names, nameIndex);
                    }
                    else if (ch === CharacterCodes.t || ch === CharacterCodes.f) {
                        reader.read();
                        return ch === CharacterCodes.t;
                    }
                    else if (ch === CharacterCodes.exclamation) {
                        reader.read();
                        return null; // eslint-disable-line no-null/no-null
                    }
                    else if (ch === CharacterCodes.openBracket) {
                        const array: unknown[] = [];
                        reader.read();
                        while (reader.pos < reader.length) {
                            ch = reader.peek();
                            if (ch === CharacterCodes.closeBracket) {
                                reader.read();
                                return array;
                            }
                            if (array.length > 0) {
                                if (ch !== CharacterCodes.comma) {
                                    return;
                                }
                                reader.read();
                            }
                            array.push(decodeAnnotationWorker());
                        }
                    }
                    else if (ch === CharacterCodes.openBrace) {
                        const obj: any = {};
                        let hasReadProperty = false;
                        reader.read();
                        while (reader.pos < reader.length) {
                            ch = reader.peek();
                            if (ch === CharacterCodes.closeBrace) {
                                reader.read();
                                return obj;
                            }

                            if (hasReadProperty) {
                                if (ch !== CharacterCodes.comma) {
                                    return;
                                }
                                reader.read();
                                if (reader.pos >= reader.length) return;
                            }

                            const key = decodeAnnotationWorker();
                            if (typeof key !== "string") return;
                            if (reader.pos >= reader.length) return;

                            ch = reader.peek();
                            if (ch !== CharacterCodes.colon) return;

                            reader.read();
                            if (reader.pos >= reader.length) return;

                            const value = decodeAnnotationWorker();
                            obj[key] = value;
                            hasReadProperty = true;
                        }
                    }
                }
            }
        }
    }

    function isSourceMapAnnotation(value: unknown): value is SourceMapAnnotation {
        return typeof value === "object" && !!value && typeof (value as SourceMapAnnotation).name === "string";
    }
}