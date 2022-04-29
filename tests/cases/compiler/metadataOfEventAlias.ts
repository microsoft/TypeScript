// @experimentalDecorators: true
// @emitDecoratorMetadata: true
// @target: es5
// @skipLibCheck: true
// @includeBuiltFile: lib.d.ts

// @filename: event.ts
export interface Event { title: string };

// @filename: test.ts
import { Event } from './event';
function Input(target: any, key: string): void { }
export class SomeClass {
    @Input event: Event;
}