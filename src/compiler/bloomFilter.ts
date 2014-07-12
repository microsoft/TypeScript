///<reference path='core\integerUtilities.ts' />

module TypeScript {

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
        static computeM(expectedCount: number): number {
            var p: number = BloomFilter.falsePositiveProbability;
            var n: number = expectedCount;

            var numerator = n * Math.log(p);
            var denominator = Math.log(1.0 / Math.pow(2.0, Math.log(2.0)));
            return Math.ceil(numerator / denominator);
        }

        // k = round(log(2.0) * m / n)
        static computeK(expectedCount: number): number {
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
            return Hash.computeMurmur2StringHashCode(key, seed);
        }

        public addKeys(keys: IIndexable<any>) {
            for (var name in keys) {
                if (keys[name]) {
                    this.add(name);
                }
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

        static isEquivalent(array1: boolean[], array2: boolean[]): boolean {
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
    }
}
