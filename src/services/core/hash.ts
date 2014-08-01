///<reference path='references.ts' />

module TypeScript {
    export class Hash {
        // This table uses FNV1a as a string hash
        private static FNV_BASE = 2166136261;
        private static FNV_PRIME = 16777619;

        private static computeFnv1aCharArrayHashCode(text: number[], start: number, len: number): number {
            var hashCode = Hash.FNV_BASE;
            var end = start + len;

            for (var i = start; i < end; i++) {
                hashCode = IntegerUtilities.integerMultiplyLow32Bits(hashCode ^ text[i], Hash.FNV_PRIME);
            }

            return hashCode;
        }

        public static computeSimple31BitCharArrayHashCode(key: number[], start: number, len: number): number {
            // Start with an int.
            var hash = 0;

            for (var i = 0; i < len; i++) {
                var ch = key[start + i];

                // Left shift keeps things as a 32bit int.  And we're only doing two adds.  Chakra and
                // V8 recognize this as not needing to go past the 53 bits needed for the float 
                // mantissa.  Or'ing with 0 keeps this 32 bits.
                hash = ((((hash << 5) - hash) | 0) + ch) | 0;
            }

            // Ensure we fit in 31 bits.  That way if/when this gets stored, it won't require any heap
            // allocation.
            return hash & 0x7FFFFFFF;
        }

        public static computeSimple31BitStringHashCode(key: string): number {
            // Start with an int.
            var hash = 0;

            var start = 0;
            var len = key.length;

            for (var i = 0; i < len; i++) {
                var ch = key.charCodeAt(start + i);

                // Left shift keeps things as a 32bit int.  And we're only doing two adds.  Chakra and
                // V8 recognize this as not needing to go past the 53 bits needed for the float 
                // mantissa.  Or'ing with 0 keeps this 32 bits.
                hash = ((((hash << 5) - hash) | 0) + ch) | 0;
            }

            // Ensure we fit in 31 bits.  That way if/when this gets stored, it won't require any heap
            // allocation.
            return hash & 0x7FFFFFFF;
        }

        public static computeMurmur2StringHashCode(key: string, seed: number): number {
            // 'm' and 'r' are mixing constants generated offline.
            // They're not really 'magic', they just happen to work well.

            var m: number = 0x5bd1e995;
            var r: number = 24;

            // Initialize the hash to a 'random' value

            var numberOfCharsLeft = key.length;
            var h = Math.abs(seed ^ numberOfCharsLeft);

            // Mix 4 bytes at a time into the hash.  NOTE: 4 bytes is two chars, so we iterate
            // through the string two chars at a time.
            var index = 0;
            while (numberOfCharsLeft >= 2) {
                var c1 = key.charCodeAt(index);
                var c2 = key.charCodeAt(index + 1);

                var k = Math.abs(c1 | (c2 << 16));

                k = IntegerUtilities.integerMultiplyLow32Bits(k, m);
                k ^= k >> r;
                k = IntegerUtilities.integerMultiplyLow32Bits(k, m);

                h = IntegerUtilities.integerMultiplyLow32Bits(h, m);
                h ^= k;

                index += 2;
                numberOfCharsLeft -= 2;
            }

            // Handle the last char (or 2 bytes) if they exist.  This happens if the original string had
            // odd length.
            if (numberOfCharsLeft === 1) {
                h ^= key.charCodeAt(index);
                h = IntegerUtilities.integerMultiplyLow32Bits(h, m);
            }

            // Do a few final mixes of the hash to ensure the last few bytes are well-incorporated.

            h ^= h >> 13;
            h = IntegerUtilities.integerMultiplyLow32Bits(h, m);
            h ^= h >> 15;

            return h;
        }

        public static combine(value: number, currentHash: number): number {
            // Ensure we stay within 31 bits.
            return (((currentHash << 5) + currentHash) + value) & 0x7FFFFFFF;
        }
    }
}