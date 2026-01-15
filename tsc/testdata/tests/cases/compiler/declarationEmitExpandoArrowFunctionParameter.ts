// @strict: true
// @declaration: true

// @filename: component.ts
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

// @filename: story.ts
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
