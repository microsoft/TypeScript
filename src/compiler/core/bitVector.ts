///<reference path='references.ts'/>

module TypeScript {
    export interface IBitVector {
        // Returns the value at the specified index.  If this is a bi-state vector, then the result
        // will only be 'true' or 'false'.  If this is a tri-state vector, then the result can be 
        // 'true', 'false', or 'undefined'.
        valueAt(index: number): boolean;

        // Sets the value at this specified bit.  For a bi-state vector the value must be 'true' or
        // 'false'.  For a tri-state vector, it can be 'true', 'false', or 'undefined'.
        setValueAt(index: number, value: boolean): void;

        // Releases the bit vector, allowing its resources to be used by another BitVector.
        // This instance cannot be used after it is released.
        release(): void;
    }

    export module BitVector {
        var pool: BitVectorImpl[] = [];
        enum Constants {
            // We only use up to 30 bits in a number.  That way the encoded value can always fit
            // within an int so that the underlying engine doesn't use a 64bit float here.
            MaxBitsPerEncodedNumber = 30,
            BitsPerEncodedBiStateValue = 1,

            // For a tri state vector we need 2 bits per encoded value.  00 for 'undefined',
            // '01' for 'false' and '10' for true.
            BitsPerEncodedTriStateValue = 2,

            BiStateEncodedTrue    = 1, // 1
            BiStateClearBitsMask  = 1, // 1

            TriStateEncodedFalse  = 1, // 01
            TriStateEncodedTrue   = 2, // 10
            TriStateClearBitsMask = 3, // 11
        }

        class BitVectorImpl implements IBitVector {
            public isReleased = false;
            private bits: number[] = [];

            constructor(public allowUndefinedValues: boolean) {
            }

            private computeTriStateArrayIndex(index: number): number {
                // The number of values that can be encoded in a single number.
                var encodedValuesPerNumber = Constants.MaxBitsPerEncodedNumber / Constants.BitsPerEncodedTriStateValue;

                return (index / encodedValuesPerNumber) >>> 0;
            }

            private computeBiStateArrayIndex(index: number): number {
                // The number of values that can be encoded in a single number.
                var encodedValuesPerNumber = Constants.MaxBitsPerEncodedNumber / Constants.BitsPerEncodedBiStateValue;

                return (index / encodedValuesPerNumber) >>> 0;
            }

            private computeTriStateEncodedValueIndex(index: number): number {
                // The number of values that can be encoded in a single number.
                var encodedValuesPerNumber = Constants.MaxBitsPerEncodedNumber / Constants.BitsPerEncodedTriStateValue;

                return (index % encodedValuesPerNumber) * Constants.BitsPerEncodedTriStateValue;
            }

            private computeBiStateEncodedValueIndex(index: number): number {
                // The number of values that can be encoded in a single number.
                var encodedValuesPerNumber = Constants.MaxBitsPerEncodedNumber / Constants.BitsPerEncodedBiStateValue;

                return (index % encodedValuesPerNumber) * Constants.BitsPerEncodedBiStateValue;
            }

            public valueAt(index: number): boolean {
                Debug.assert(!this.isReleased, "Should not use a released bitvector");
                if (this.allowUndefinedValues) {
                    // tri-state bit vector.  2 bits per value.

                    var arrayIndex = this.computeTriStateArrayIndex(index);
                    var encoded = this.bits[arrayIndex];
                    if (encoded === undefined) {
                        // We don't even have an encoded value at this array position.  That's
                        // equivalent to 'undefined' for a tri-state vector.
                        return undefined;
                    }
                    
                    var bitIndex = this.computeTriStateEncodedValueIndex(index);
                    if (encoded & (Constants.TriStateEncodedTrue << bitIndex)) {
                        return true;
                    }
                    else if (encoded & (Constants.TriStateEncodedFalse << bitIndex)) {
                        return false;
                    }
                    else {
                        return undefined;
                    }
                }
                else {
                    // Normal bitvector.  One bit per value stored.

                    var arrayIndex = this.computeBiStateArrayIndex(index);
                    var encoded = this.bits[arrayIndex];
                    if (encoded === undefined) {
                        // We don't even have an encoded value at this array position.  That's
                        // equivalent to 'false' for a bi-state vector.
                        return false;
                    }

                    // If we don't support undefined values, then we use one bit per value. Just
                    // index to that bit and see if it's set or not.
                    var bitIndex = this.computeBiStateEncodedValueIndex(index);
                    if (encoded & (Constants.BiStateEncodedTrue << bitIndex)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }

            public setValueAt(index: number, value: boolean): void {
                Debug.assert(!this.isReleased, "Should not use a released bitvector");
                if (this.allowUndefinedValues) {
                    Debug.assert(value === true || value === false || value === undefined, "value must only be true, false or undefined.");

                    var arrayIndex = this.computeTriStateArrayIndex(index);
                    var encoded = this.bits[arrayIndex];
                    if (encoded === undefined) {
                        if (value === undefined) {
                            // They're trying to set a bit to undefined that we don't even have an entry 
                            // for.  We can bail out quickly here.
                            return;
                        }

                        encoded = 0;
                    }

                    // First, we clear out any bits set at the appropriate index.  
                    var bitIndex = this.computeTriStateEncodedValueIndex(index);

                    // Create a mask similar to: 11111111100111111
                    // i.e. all 1's except for 2 zeroes in the appropriate place.
                    var clearMask = ~(Constants.TriStateClearBitsMask << bitIndex)
                    encoded = encoded & clearMask;

                    if (value === true) {
                        encoded = encoded | (Constants.TriStateEncodedTrue << bitIndex);
                    }
                    else if (value === false) {
                        encoded = encoded | (Constants.TriStateEncodedFalse << bitIndex);
                    }
                    // else {
                    //   They're setting the value to 'undefined'.  We already cleared the value
                    //   so there's nothing we need to do here.
                    // }

                    this.bits[arrayIndex] = encoded;
                }
                else {
                    Debug.assert(value === true || value === false, "value must only be true or false.");

                    var arrayIndex = this.computeBiStateArrayIndex(index);
                    var encoded = this.bits[arrayIndex];
                    if (encoded === undefined) {
                        if (value === false) {
                            // They're trying to set a bit to false that we don't even have an entry 
                            // for.  We can bail out quickly here.
                            return;
                        }

                        encoded = 0;
                    }

                    var bitIndex = this.computeBiStateEncodedValueIndex(index);
                    // First, clear out the bit at this location.
                    encoded = encoded & ~(Constants.BiStateClearBitsMask << bitIndex);

                    if (value) {
                        encoded = encoded | (Constants.BiStateEncodedTrue << bitIndex);
                    }
                    // else {
                    //   They're setting the value to 'false'.  We already cleared the value
                    //   so there's nothing we need to do here.
                    // }

                    this.bits[arrayIndex] = encoded;
                }
            }

            public release() {
                Debug.assert(!this.isReleased, "Should not use a released bitvector");
                this.isReleased = true;
                this.bits.length = 0;
                pool.push(this);
            }
        }

        export function getBitVector(allowUndefinedValues: boolean): IBitVector {
            if (pool.length === 0) {
                return new BitVectorImpl(allowUndefinedValues);
            }

            var vector = pool.pop();
            vector.isReleased = false;
            vector.allowUndefinedValues = allowUndefinedValues;

            return vector;
        }
    }
}