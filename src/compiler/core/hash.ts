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

        private static primes =
            [3, 7, 11, 17, 23, 29, 37, 47, 59, 71, 89, 107, 131, 163, 197, 239, 293, 353, 431, 521,
              631, 761, 919, 1103, 1327, 1597, 1931, 2333, 2801, 3371, 4049, 4861, 5839, 7013, 8419,
              10103, 12143, 14591, 17519, 21023, 25229, 30293, 36353, 43627, 52361, 62851, 75431,
              90523, 108631, 130363, 156437, 187751, 225307, 270371, 324449, 389357, 467237, 560689,
              672827, 807403, 968897, 1162687, 1395263, 1674319, 2009191, 2411033, 2893249, 3471899,
              4166287, 4999559, 5999471, 7199369];

        public static getPrime(min: number): number {
            for (var i = 0; i < Hash.primes.length; i++) {
                var num = Hash.primes[i];
                if (num >= min) {
                    return num;
                }
            }

            throw Errors.notYetImplemented();
        }

        public static expandPrime(oldSize: number): number {
            var num = oldSize << 1;
            if (num > 2146435069 && 2146435069 > oldSize) {
                // NOTE: 2146435069 fits in 31 bits.
                return 2146435069;
            }
            return Hash.getPrime(num);
        }

        public static combine(value: number, currentHash: number): number {
            // Ensure we stay within 31 bits.
            return (((currentHash << 5) + currentHash) + value) & 0x7FFFFFFF;
        }
    }
}