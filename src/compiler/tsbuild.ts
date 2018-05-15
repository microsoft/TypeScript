namespace ts {
/*
    interface BuildContext {
        unchangedOutputs: FileMap<number>;
    }



    interface FileMap<T> {
        setValue(fileName: string, value: T): void;
        getValue(fileName: string): T | never;
        getValueOrUndefined(fileName: string): T | undefined;
        getValueOrDefault(fileName: string, defaultValue: T): T;
        tryGetValue(fileName: string): [false, undefined] | [true, T];
    }

    function createFileMap<T>(): FileMap<T> {
        const lookup: { [key: string]: T } = Object.create(null);

        return {
            setValue,
            getValue,
            getValueOrUndefined,
            getValueOrDefault,
            tryGetValue
        }

        function setValue(fileName: string, value: T) {
            lookup[normalizePath(fileName)] = value;
        }

        function getValue(fileName: string): T | never {
            const f = normalizePath(fileName);
            if (f in lookup) {
                return lookup[f];
            } else {
                throw new Error(`No value corresponding to ${fileName} exists in this map`);
            }
        }

        function getValueOrUndefined(fileName: string): T | undefined {
            const f = normalizePath(fileName);
            if (f in lookup) {
                return lookup[f];
            } else {
                return undefined;
            }
        }

        function getValueOrDefault(fileName: string, defaultValue: T): T {
            const f = normalizePath(fileName);
            if (f in lookup) {
                return lookup[f];
            } else {
                return defaultValue;
            }
        }

        function tryGetValue(fileName: string): [false, undefined] | [true, T] {
            const f = normalizePath(fileName);
            if (f in lookup) {
                return [true as true, lookup[f]];
            } else {
                return [false as false, undefined];
            }
        }
    }
    */
}
