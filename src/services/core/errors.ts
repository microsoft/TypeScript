///<reference path='references.ts' />

module TypeScript {
    export class Errors {
        public static argument(argument: string, message?: string): Error {
            return new Error("Invalid argument: " + argument + ". " + message);
        }

        public static argumentOutOfRange(argument: string): Error {
            return new Error("Argument out of range: " + argument);
        }

        public static argumentNull(argument: string): Error {
            return new Error("Argument null: " + argument);
        }

        public static abstract(): Error {
            return new Error("Operation not implemented properly by subclass.");
        }

        public static notYetImplemented(): Error {
            return new Error("Not yet implemented.");
        }

        public static invalidOperation(message?: string): Error {
            return new Error("Invalid operation: " + message);
        }
    }
}