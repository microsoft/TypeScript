// @module: esnext
// @target: esnext
// @preserveConstEnums: true, false
// @noTypesAndSymbols: true

const enum Token {
    End = 0,
    Word = "word" as string,
    Marker = <number>2,
    Flag = 3!,
    Count = 4 satisfies number,
}

export const end = Token.End;
