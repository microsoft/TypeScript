//// [tests/cases/compiler/constEnumInitializerTypeErasure.ts] ////

//// [constEnumInitializerTypeErasure.ts]
const enum Token {
    End = 0,
    Word = "word" as string,
    Marker = <number>2,
    Flag = 3!,
    Count = 4 satisfies number,
}

export const end = Token.End;


//// [constEnumInitializerTypeErasure.js]
export const end = 0 /* Token.End */;
