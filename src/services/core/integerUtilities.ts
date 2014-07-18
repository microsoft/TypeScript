///<reference path='references.ts' />

module TypeScript {
    export module IntegerUtilities {
        export function integerDivide(numerator: number, denominator: number): number {
            return (numerator / denominator) >> 0;
        }

        export function integerMultiplyLow32Bits(n1: number, n2: number): number {
            var n1Low16 = n1 & 0x0000ffff;
            var n1High16 = n1 >>> 16;

            var n2Low16 = n2 & 0x0000ffff;
            var n2High16 = n2 >>> 16;

            var resultLow32 = (((n1 & 0xffff0000) * n2) >>> 0) + (((n1 & 0x0000ffff) * n2) >>> 0) >>> 0;
            return resultLow32;
        }

        export function isInteger(text: string): boolean {
            return /^[0-9]+$/.test(text);
        }

        export function isHexInteger(text: string): boolean {
            return /^0(x|X)[0-9a-fA-F]+$/.test(text);
        }
    }
}