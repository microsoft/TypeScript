///<reference path='references.ts' />
var TypeScript;
(function (TypeScript) {
    var IntegerUtilities;
    (function (IntegerUtilities) {
        function integerDivide(numerator, denominator) {
            return (numerator / denominator) >> 0;
        }
        IntegerUtilities.integerDivide = integerDivide;
        function integerMultiplyLow32Bits(n1, n2) {
            var resultLow32 = (((n1 & 0xffff0000) * n2) >>> 0) + (((n1 & 0x0000ffff) * n2) >>> 0) >>> 0;
            return resultLow32;
        }
        IntegerUtilities.integerMultiplyLow32Bits = integerMultiplyLow32Bits;
        function isInteger(text) {
            return /^[0-9]+$/.test(text);
        }
        IntegerUtilities.isInteger = isInteger;
        function isHexInteger(text) {
            return /^0(x|X)[0-9a-fA-F]+$/.test(text);
        }
        IntegerUtilities.isHexInteger = isHexInteger;
    })(IntegerUtilities = TypeScript.IntegerUtilities || (TypeScript.IntegerUtilities = {}));
})(TypeScript || (TypeScript = {}));
