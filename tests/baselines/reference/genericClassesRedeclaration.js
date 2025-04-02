//// [tests/cases/compiler/genericClassesRedeclaration.ts] ////

//// [genericClassesRedeclaration.ts]
declare module TypeScript {
    interface IIndexable<T> {
        [s: string]: T;
    }
    function createIntrinsicsObject<T>(): IIndexable<T>;
    interface IHashTable<T> {
        getAllKeys(): string[];
        add(key: string, data: T): boolean;
        addOrUpdate(key: string, data: T): boolean;
        map(fn: (k: string, value: T, context: any) => void, context: any): void;
        every(fn: (k: string, value: T, context: any) => void, context: any): boolean;
        some(fn: (k: string, value: T, context: any) => void, context: any): boolean;
        count(): number;
        lookup(key: string): T;
    }
    class StringHashTable<T> implements IHashTable<T> {
        private itemCount;
        private table;
        public getAllKeys(): string[];
        public add(key: string, data: T): boolean;
        public addOrUpdate(key: string, data: T): boolean;
        public map(fn: (k: string, value: T, context: any) => void, context: any): void;
        public every(fn: (k: string, value: T, context: any) => void, context: any): boolean;
        public some(fn: (k: string, value: T, context: any) => void, context: any): boolean;
        public count(): number;
        public lookup(key: string): T;
        public remove(key: string): void;
    }
    class IdentifierNameHashTable<T> extends StringHashTable<T> {
        public getAllKeys(): string[];
        public add(key: string, data: T): boolean;
        public addOrUpdate(key: string, data: T): boolean;
        public map(fn: (k: string, value: T, context: any) => void, context: any): void;
        public every(fn: (k: string, value: T, context: any) => void, context: any): boolean;
        public some(fn: (k: string, value: any, context: any) => void, context: any): boolean;
        public lookup(key: string): T;
    }
}

declare module TypeScript {
    interface IIndexable<T> {
        [s: string]: T;
    }
    function createIntrinsicsObject<T>(): IIndexable<T>;
    interface IHashTable<T> {
        getAllKeys(): string[];
        add(key: string, data: T): boolean;
        addOrUpdate(key: string, data: T): boolean;
        map(fn: (k: string, value: T, context: any) => void, context: any): void;
        every(fn: (k: string, value: T, context: any) => void, context: any): boolean;
        some(fn: (k: string, value: T, context: any) => void, context: any): boolean;
        count(): number;
        lookup(key: string): T;
    }
    class StringHashTable<T> implements IHashTable<T> {
        private itemCount;
        private table;
        public getAllKeys(): string[];
        public add(key: string, data: T): boolean;
        public addOrUpdate(key: string, data: T): boolean;
        public map(fn: (k: string, value: T, context: any) => void, context: any): void;
        public every(fn: (k: string, value: T, context: any) => void, context: any): boolean;
        public some(fn: (k: string, value: T, context: any) => void, context: any): boolean;
        public count(): number;
        public lookup(key: string): T;
        public remove(key: string): void;
    }
    class IdentifierNameHashTable<T> extends StringHashTable<T> {
        public getAllKeys(): string[];
        public add(key: string, data: T): boolean;
        public addOrUpdate(key: string, data: T): boolean;
        public map(fn: (k: string, value: T, context: any) => void, context: any): void;
        public every(fn: (k: string, value: T, context: any) => void, context: any): boolean;
        public some(fn: (k: string, value: any, context: any) => void, context: any): boolean;
        public lookup(key: string): T;
    }
}

//// [genericClassesRedeclaration.js]
