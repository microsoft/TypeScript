// @module: es6
// @target: es5
// @emitDecoratorMetadata: true
// @experimentalDecorators: true
// @filename: deps.ts
export function Input(): any { }
export class TemplateRef { }

// @filename: index.ts
import { Input, TemplateRef } from './deps';

export class MyComponent {
    _ref: TemplateRef;

    @Input()
    get ref() { return this._ref; }
    set ref(value: TemplateRef) { this._ref = value; }
}
