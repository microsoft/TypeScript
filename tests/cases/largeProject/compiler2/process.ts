declare module process2 {
    export var argv: string[];
    export var platform: string;
    export function on(event: string, handler: (any) => void ): void;
    export module stdout {
        export function write(str: string);
    }
    export module stderr {
        export function write(str: string);
    }
    export module mainModule {
        export var filename: string;
    }
    export function exit(exitCode?: number);
}