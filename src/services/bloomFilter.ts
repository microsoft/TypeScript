
module ts {
    export class BloomFilter {
        private bitArray: boolean[];
        private hashFunctionCount: number;

        public static falsePositiveProbability: number = 0.0001;

        /*
        * From the bloom filter calculator here: http://hur.st/bloomfilter?n=4&p=1.0E-20
        * 
        * 1) n  = Number of items in the filter
        * 
        * 2) p = Probability of false positives, (a double between 0 and 1).
        * 
        * 3) m = Number of bits in the filter
        * 
        * 4) k = Number of hash functions
        * 
        * m = ceil((n * log(p)) / log(1.0 / (pow(2.0, log(2.0)))))
        * 
        * k = round(log(2.0) * m / n)
        *
        */
        constructor(expectedCount: number) {
            var m: number = Math.max(1, BloomFilter.computeM(expectedCount));
            var k: number = Math.max(1, BloomFilter.computeK(expectedCount));;

            // We must have size in even bytes, so that when we deserialize from bytes we get a bit array with the same count.
            // The count is used by the hash functions.
            var sizeInEvenBytes = (m + 7) & ~7;

            this.bitArray = [];
            for (var i = 0, len = sizeInEvenBytes; i < len; i++) {
                this.bitArray[i] = false;
            }
            this.hashFunctionCount = k;
        }

        // m = ceil((n * log(p)) / log(1.0 / (pow(2.0, log(2.0)))))
        private static computeM(expectedCount: number): number {
            var p: number = BloomFilter.falsePositiveProbability;
            var n: number = expectedCount;

            var numerator = n * Math.log(p);
            var denominator = Math.log(1.0 / Math.pow(2.0, Math.log(2.0)));
            return Math.ceil(numerator / denominator);
        }

        // k = round(log(2.0) * m / n)
        private static computeK(expectedCount: number): number {
            var n: number = expectedCount;
            var m: number = BloomFilter.computeM(expectedCount);

            var temp = Math.log(2.0) * m / n;
            return Math.round(temp);
        }

        /** Modification of the murmurhash2 algorithm.  Code is simpler because it operates over
         * strings instead of byte arrays.  Because each string character is two bytes, it is known
         * that the input will be an even number of bytes (though not necessarily a multiple of 4).
         * 
         * This is needed over the normal 'string.GetHashCode()' because we need to be able to generate
         * 'k' different well distributed hashes for any given string s.  Also, we want to be able to
         * generate these hashes without allocating any memory.  My ideal solution would be to use an
         * MD5 hash.  However, there appears to be no way to do MD5 in .Net where you can:
         * 
         * a) feed it individual values instead of a byte[]
         * 
         * b) have the hash computed into a byte[] you provide instead of a newly allocated one
         * 
         * Generating 'k' pieces of garbage on each insert and lookup seems very wasteful.  So,
         * instead, we use murmur hash since it provides well distributed values, allows for a
         * seed, and allocates no memory.
         * 
         * Murmur hash is public domain.  Actual code is included below as reference.
         */
        private computeHash(key: string, seed: number): number {
            return BloomFilter.computeMurmur2StringHashCode(key, seed);
        }

        public addKeys(keys: string[]) {
            for (var i = 0, n = keys.length; i < n; i++) {
                this.add(keys[i]);
            }
        }

        public add(value: string) {
            for (var i = 0; i < this.hashFunctionCount; i++) {
                var hash = this.computeHash(value, i);
                hash = hash % this.bitArray.length;
                this.bitArray[Math.abs(hash)] = true;
            }
        }

        public probablyContains(value: string): boolean {
            for (var i = 0; i < this.hashFunctionCount; i++) {
                var hash = this.computeHash(value, i);
                hash = hash % this.bitArray.length;
                if (!this.bitArray[Math.abs(hash)]) {
                    return false;
                }
            }

            return true;
        }

        public isEquivalent(filter: BloomFilter): boolean {
            return BloomFilter.isEquivalent(this.bitArray, filter.bitArray)
                && this.hashFunctionCount === filter.hashFunctionCount;
        }

        private static isEquivalent(array1: boolean[], array2: boolean[]): boolean {
            if (array1.length !== array2.length) {
                return false;
            }

            for (var i = 0; i < array1.length; i++) {
                if (array1[i] !== array2[i]) {
                    return false;
                }
            }

            return true;
        }

        private static integerMultiplyLow32Bits(n1: number, n2: number): number {
            var n1Low16 = n1 & 0x0000ffff;
            var n1High16 = n1 >>> 16;

            var n2Low16 = n2 & 0x0000ffff;
            var n2High16 = n2 >>> 16;

            var resultLow32 = (((n1 & 0xffff0000) * n2) >>> 0) + (((n1 & 0x0000ffff) * n2) >>> 0) >>> 0;
            return resultLow32;
        }

        private static computeMurmur2StringHashCode(key: string, seed: number): number {
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

                k = BloomFilter.integerMultiplyLow32Bits(k, m);
                k ^= k >> r;
                k = BloomFilter.integerMultiplyLow32Bits(k, m);

                h = BloomFilter.integerMultiplyLow32Bits(h, m);
                h ^= k;

                index += 2;
                numberOfCharsLeft -= 2;
            }

            // Handle the last char (or 2 bytes) if they exist.  This happens if the original string had
            // odd length.
            if (numberOfCharsLeft === 1) {
                h ^= key.charCodeAt(index);
                h = BloomFilter.integerMultiplyLow32Bits(h, m);
            }

            // Do a few final mixes of the hash to ensure the last few bytes are well-incorporated.

            h ^= h >> 13;
            h = BloomFilter.integerMultiplyLow32Bits(h, m);
            h ^= h >> 15;

            return h;
        }
    }
}