// @skipLibCheck: true
// @strict: false
// @strictFunctionTypes: true

// @filename: handlers.d.ts
interface FilterHandlers {
    update: (value: object) => void;
    remove: (value: string) => void;
}
interface ServerHandlers {
    save: (value) => "saved";
}
interface Handlers extends ServerHandlers, FilterHandlers {}

// @filename: main.ts
function runHandler<T extends Handlers[keyof Handlers]>(handler: T, value: Parameters<T>[0]) {
    handler(value);
}
