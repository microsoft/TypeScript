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
var Token;
(function (Token) {
    Token[Token["End"] = 0] = "End";
    Token[Token["Word"] = "word"] = "Word";
    Token[Token["Marker"] = 2] = "Marker";
    Token[Token["Flag"] = 3] = "Flag";
    Token[Token["Count"] = 4] = "Count";
})(Token || (Token = {}));
export const end = 0 /* Token.End */;
