declare module process {
    export var argv: string[];
    export var platform: string;
    export function on(event: string, handler: (arg: any) => void ): void;
    export module stdout {
        export function write(str: string): any;
        export function on(event: string, action: () => void ): void;
    }
    export module stderr {
        export function write(str: string): any;
        export function on(event: string, action: () => void): void;
    }
    export module mainModule {
        export var filename: string;
    }
    export function exit(exitCode?: number): any;
}