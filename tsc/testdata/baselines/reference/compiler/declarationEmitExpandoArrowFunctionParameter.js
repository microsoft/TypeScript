//// [tests/cases/compiler/declarationEmitExpandoArrowFunctionParameter.ts] ////

//// [component.ts]
interface Props<T extends string = string> {
    colors: Array<T>;
    value: T;
    onValueChange: (value: T) => void;
    disabled?: boolean;
}

declare function forwardRef<T, P>(
    render: (props: P, ref: { current: T | null }) => string
): (props: P & { ref?: { current: T | null } }) => string;

type FixedForwardRef = <T, P = {}>(
    render: (props: P, ref: { current: T | null }) => string
) => (props: P & { ref?: { current: T | null } }) => string;

const GenericForwardRef = forwardRef as FixedForwardRef;

function Inner<T extends string>(
    { disabled, value, onValueChange, colors }: Props<T>,
    ref: { current: HTMLButtonElement | null }
) {
    return "rendered";
}

export const ColorPicker = GenericForwardRef(Inner);

//// [story.ts]
import { ColorPicker } from "./component";

type StoryFn<T> = ((args: T extends (props: infer P) => any ? P : never) => string) & {
    args?: Partial<T extends (props: infer P) => any ? P : never>;
};

// Story with StoryFn<typeof ImportedGenericComponent>
export const Default: StoryFn<typeof ColorPicker> = (args) => {
    return "story";
};

// Property assignment on arrow function - TRIGGERS PANIC
Default.args = {
    disabled: false,
};


//// [component.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorPicker = void 0;
const GenericForwardRef = forwardRef;
function Inner({ disabled, value, onValueChange, colors }, ref) {
    return "rendered";
}
exports.ColorPicker = GenericForwardRef(Inner);
//// [story.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
// Story with StoryFn<typeof ImportedGenericComponent>
const Default = (args) => {
    return "story";
};
exports.Default = Default;
// Property assignment on arrow function - TRIGGERS PANIC
exports.Default.args = {
    disabled: false,
};


//// [component.d.ts]
interface Props<T extends string = string> {
    colors: Array<T>;
    value: T;
    onValueChange: (value: T) => void;
    disabled?: boolean;
}
export declare const ColorPicker: <T extends string>(props: Props<T> & {
    ref?: {
        current: HTMLButtonElement | null;
    } | undefined;
}) => string;
export {};
//// [story.d.ts]
import { ColorPicker } from "./component";
type StoryFn<T> = ((args: T extends (props: infer P) => any ? P : never) => string) & {
    args?: Partial<T extends (props: infer P) => any ? P : never>;
};
export declare const Default: StoryFn<typeof ColorPicker>;
export {};
