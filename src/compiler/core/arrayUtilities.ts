///<reference path='references.ts' />

module TypeScript {
    export class ArrayUtilities {
        public static isArray(value: any): boolean {
            return Object.prototype.toString.apply(value, []) === '[object Array]';
        }

        public static sequenceEquals<T>(array1: T[], array2: T[], equals: (v1: T, v2: T) => boolean) {
            if (array1 === array2) {
                return true;
            }

            if (array1 === null || array2 === null) {
                return false;
            }

            if (array1.length !== array2.length) {
                return false;
            }

            for (var i = 0, n = array1.length; i < n; i++) {
                if (!equals(array1[i], array2[i])) {
                    return false;
                }
            }

            return true;
        }

        public static contains<T>(array: T[], value: T): boolean {
            for (var i = 0; i < array.length; i++) {
                if (array[i] === value) {
                    return true;
                }
            }

            return false;
        }

        public static groupBy<T>(array: T[], func: (v: T) => string): any {
            var result: IIndexable<T[]> = {};

            for (var i = 0, n = array.length; i < n; i++) {
                var v: any = array[i];
                var k = func(v);

                var list: T[] = result[k] || [];
                list.push(v);
                result[k] = list;
            }

            return result;
        }


        // Gets unique element array
        public static distinct<T>(array: T[], equalsFn?: (a: T, b: T) => boolean): T[] {
            var result: T[] = [];

            // TODO: use map when available
            for (var i = 0, n = array.length; i < n; i++) {
                var current = array[i];
                for (var j = 0; j < result.length; j++) {
                    if (equalsFn(result[j], current)) {
                        break;
                    }
                }

                if (j === result.length) {
                    result.push(current);
                }
            }

            return result;
        }

        public static min<T>(array: T[], func: (v: T) => number): number {
            // Debug.assert(array.length > 0);
            var min = func(array[0]);

            for (var i = 1; i < array.length; i++) {
                var next = func(array[i]);
                if (next < min) {
                    min = next;
                }
            }

            return min;
        }

        public static max<T>(array: T[], func: (v: T) => number): number {
            // Debug.assert(array.length > 0);
            var max = func(array[0]);

            for (var i = 1; i < array.length; i++) {
                var next = func(array[i]);
                if (next > max) {
                    max = next;
                }
            }

            return max;
        }

        public static last<T>(array: T[]): T {
            if (array.length === 0) {
                throw Errors.argumentOutOfRange('array');
            }

            return array[array.length - 1];
        }

        public static lastOrDefault<T>(array: T[], predicate: (v: T, index: number) => boolean): T {
            for (var i = array.length - 1; i >= 0; i--) {
                var v = array[i];
                if (predicate(v, i)) {
                    return v;
                }
            }

            return null;
        }

        public static firstOrDefault<T>(array: T[], func: (v: T, index: number) => boolean): T {
            for (var i = 0, n = array.length; i < n; i++) {
                var value = array[i];
                if (func(value, i)) {
                    return value;
                }
            }

            return null;
        }

        public static first<T>(array: T[], func?: (v: T, index: number) => boolean): T {
            for (var i = 0, n = array.length; i < n; i++) {
                var value = array[i];
                if (!func || func(value, i)) {
                    return value;
                }
            }

            throw Errors.invalidOperation();
        }

        public static sum<T>(array: T[], func: (v: T) => number): number {
            var result = 0;

            for (var i = 0, n = array.length; i < n; i++) {
                result += func(array[i]);
            }

            return result;
        }

        public static select<T,S>(values: T[], func: (v: T) => S): S[] {
            var result: S[] = new Array<S>(values.length);

            for (var i = 0; i < values.length; i++) {
                result[i] = func(values[i]);
            }

            return result;
        }

        public static where<T>(values: T[], func: (v: T) => boolean): T[] {
            var result = new Array<T>();

            for (var i = 0; i < values.length; i++) {
                if (func(values[i])) {
                    result.push(values[i]);
                }
            }

            return result;
        }

        public static any<T>(array: T[], func: (v: T) => boolean): boolean {
            for (var i = 0, n = array.length; i < n; i++) {
                if (func(array[i])) {
                    return true;
                }
            }

            return false;
        }

        public static all<T>(array: T[], func: (v: T) => boolean): boolean {
            for (var i = 0, n = array.length; i < n; i++) {
                if (!func(array[i])) {
                    return false;
                }
            }

            return true;
        }

        public static binarySearch(array: number[], value: number): number {
            var low = 0;
            var high = array.length - 1;

            while (low <= high) {
                var middle = low + ((high - low) >> 1);
                var midValue = array[middle];

                if (midValue === value) {
                    return middle;
                }
                else if (midValue > value) {
                    high = middle - 1;
                }
                else {
                    low = middle + 1;
                }
            }

            return ~low;
        }

        public static createArray<T>(length: number, defaultValue: any): T[] {
            var result = new Array<T>(length);
            for (var i = 0; i < length; i++) {
                result[i] = defaultValue;
            }

            return result;
        }

        public static grow<T>(array: T[], length: number, defaultValue: T): void {
            var count = length - array.length;
            for (var i = 0; i < count; i++) {
                array.push(defaultValue);
            }
        }

        public static copy<T>(sourceArray: T[], sourceIndex: number, destinationArray: T[], destinationIndex: number, length: number): void {
            for (var i = 0; i < length; i++) {
                destinationArray[destinationIndex + i] = sourceArray[sourceIndex + i];
            }
        }

        public static indexOf<T>(array: T[], predicate: (v: T) => boolean): number {
            for (var i = 0, n = array.length; i < n; i++) {
                if (predicate(array[i])) {
                    return i;
                }
            }

            return -1;
        }
    }
}