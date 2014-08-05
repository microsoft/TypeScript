///<reference path='references.ts' />

module TypeScript {
    export module CharacterInfo {
        export function isDecimalDigit(c: number): boolean {
            return c >= CharacterCodes._0 && c <= CharacterCodes._9;
        }

        export function isOctalDigit(c: number): boolean {
            return c >= CharacterCodes._0 && c <= CharacterCodes._7;
        }

        export function isHexDigit(c: number): boolean {
            return CharacterInfo.isDecimalDigit(c) ||
                   (c >= CharacterCodes.A && c <= CharacterCodes.F) ||
                   (c >= CharacterCodes.a && c <= CharacterCodes.f);
        }

        export function hexValue(c: number): number {
            // Debug.assert(isHexDigit(c));
            return CharacterInfo.isDecimalDigit(c)
                ? (c - CharacterCodes._0)
                : (c >= CharacterCodes.A && c <= CharacterCodes.F)
                    ? c - CharacterCodes.A + 10
                    : c - CharacterCodes.a + 10;
        }

        export function isWhitespace(ch: number): boolean {
            switch (ch) {
                // Unicode 3.0 space characters.
                case CharacterCodes.space:
                case CharacterCodes.nonBreakingSpace:
                case CharacterCodes.enQuad:
                case CharacterCodes.emQuad:
                case CharacterCodes.enSpace:
                case CharacterCodes.emSpace:
                case CharacterCodes.threePerEmSpace:
                case CharacterCodes.fourPerEmSpace:
                case CharacterCodes.sixPerEmSpace:
                case CharacterCodes.figureSpace:
                case CharacterCodes.punctuationSpace:
                case CharacterCodes.thinSpace:
                case CharacterCodes.hairSpace:
                case CharacterCodes.zeroWidthSpace:
                case CharacterCodes.narrowNoBreakSpace:
                case CharacterCodes.ideographicSpace:

                case CharacterCodes.tab:
                case CharacterCodes.verticalTab:
                case CharacterCodes.formFeed:
                case CharacterCodes.byteOrderMark:
                    return true;
            }

            return false;
        }

        export function isLineTerminator(ch: number): boolean {
            switch (ch) {
                case CharacterCodes.carriageReturn:
                case CharacterCodes.lineFeed:
                case CharacterCodes.paragraphSeparator:
                case CharacterCodes.lineSeparator:
                    return true;
            }

            return false;
        }
    }
}