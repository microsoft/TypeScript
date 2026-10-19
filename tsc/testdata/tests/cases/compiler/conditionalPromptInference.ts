// @strict: true
// @noEmit: true

declare function createPrompt<Value, Config>(
    view: (config: Config, done: (value: Value) => void) => void,
): (config: Config) => Value;

const numberPrompt = createPrompt(<Required extends boolean>(
    config: { required?: Required },
    done: (value: Required extends true ? number : number | undefined) => void,
) => {});

const required: number = numberPrompt<true>({ required: true });
const optional: number | undefined = numberPrompt<false>({ required: false });
