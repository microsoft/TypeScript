///<reference path='references.ts' />

module TypeScript {
    export interface IBitMatrix {
        // Returns true if the bit at the specified indices is set.  False otherwise.
        valueAt(x: number, y: number): boolean;

        // Sets the value at this specified indices.
        setValueAt(x: number, y: number, value: boolean): void;

        // Releases the bit matrix, allowing its resources to be used by another matrix.
        // This instance cannot be used after it is released.
        release(): void;
    }

    export module BitMatrix {
        var pool: BitMatrixImpl[] = [];

        class BitMatrixImpl implements IBitMatrix {
            public isReleased = false;
            private vectors: IBitVector[] = [];

            constructor(public allowUndefinedValues: boolean) {
            }

            public valueAt(x: number, y: number): boolean {
                Debug.assert(!this.isReleased, "Should not use a released bitvector");
                var vector = this.vectors[x];
                if (!vector) {
                    return this.allowUndefinedValues ? undefined : false;
                }

                return vector.valueAt(y);
            }

            public setValueAt(x: number, y: number, value: boolean): void {
                Debug.assert(!this.isReleased, "Should not use a released bitvector");
                var vector = this.vectors[x];
                if (!vector) {
                    if (value === undefined) {
                        // If they're storing an undefined value, and we don't even have a vector,
                        // then we can short circuit early here.
                        return;
                    }

                    vector = BitVector.getBitVector(this.allowUndefinedValues);
                    this.vectors[x] = vector;
                }

                vector.setValueAt(y, value);
            }

            public release() {
                Debug.assert(!this.isReleased, "Should not use a released bitvector");
                this.isReleased = true;

                // Release all the vectors back.
                for (var name in this.vectors) {
                    if (this.vectors.hasOwnProperty(name)) {
                        var vector = this.vectors[name];
                        vector.release();
                    }
                }

                this.vectors.length = 0;
                pool.push(this);
            }
        }

        export function getBitMatrix(allowUndefinedValues: boolean): IBitMatrix {
            if (pool.length === 0) {
                return new BitMatrixImpl(allowUndefinedValues);
            }

            var matrix = pool.pop();
            matrix.isReleased = false;
            matrix.allowUndefinedValues = allowUndefinedValues;

            return matrix;
        }
    }
}