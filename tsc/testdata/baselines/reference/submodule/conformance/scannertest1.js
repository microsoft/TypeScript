//// [tests/cases/conformance/scanner/ecmascript5/scannertest1.ts] ////

//// [scannertest1.ts]
///<reference path='References.ts' />

class CharacterInfo {
    public static isDecimalDigit(c: number): boolean {
        return c >= CharacterCodes._0 && c <= CharacterCodes._9;
    }

    public static isHexDigit(c: number): boolean {
        return isDecimalDigit(c) ||
               (c >= CharacterCodes.A && c <= CharacterCodes.F) ||
               (c >= CharacterCodes.a && c <= CharacterCodes.f);
    }

    public static hexValue(c: number): number {
        Debug.assert(isHexDigit(c));
        return isDecimalDigit(c)
            ? (c - CharacterCodes._0)
            : (c >= CharacterCodes.A && c <= CharacterCodes.F)
                ? c - CharacterCodes.A + 10
                : c - CharacterCodes.a + 10;
    }
}



//// [References.js]
//// [scannertest1.js]
class CharacterInfo {
    static isDecimalDigit(c) {
        return c >= CharacterCodes._0 && c <= CharacterCodes._9;
    }
    static isHexDigit(c) {
        return isDecimalDigit(c) ||
            (c >= CharacterCodes.A && c <= CharacterCodes.F) ||
            (c >= CharacterCodes.a && c <= CharacterCodes.f);
    }
    static hexValue(c) {
        Debug.assert(isHexDigit(c));
        return isDecimalDigit(c)
            ? (c - CharacterCodes._0)
            : (c >= CharacterCodes.A && c <= CharacterCodes.F)
                ? c - CharacterCodes.A + 10
                : c - CharacterCodes.a + 10;
    }
}
