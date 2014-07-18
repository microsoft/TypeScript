///<reference path='references.ts' />

module TypeScript {
    export class StringUtilities {
        public static isString(value: any): boolean {
            return Object.prototype.toString.apply(value, []) === '[object String]';
        }

        public static endsWith(string: string, value: string): boolean {
            return string.substring(string.length - value.length, string.length) === value;
        }

        public static startsWith(string: string, value: string): boolean {
            return string.substr(0, value.length) === value;
        }

        public static repeat(value: string, count: number) {
            return Array(count + 1).join(value);
        }
    }
}