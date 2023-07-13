// @strict: true
// @noEmit: true

type Thing = 'a' | 'b';

function f(
    options: SelectOptions<Thing>,
    onChange: (status: Thing | null) => void,
): void {
    select({
        options,
        onChange,
    });
}

declare function select<KeyT extends string>(props: SelectProps<KeyT>): void;

type SelectProps<KeyT extends string> = {
    options?: SelectOptions<KeyT>;
    onChange: (key: KeyT) => void;
};

type SelectOptions<KeyT extends string> =
    | Array<{key: KeyT}>
    | Array<KeyT>;
