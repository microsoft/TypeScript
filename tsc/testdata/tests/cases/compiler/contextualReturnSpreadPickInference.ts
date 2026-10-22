// @strict: true
// @target: es2015
// @noEmit: true

type Many<T> = T | readonly T[];
declare function pick<T extends object, Key extends keyof T>(
    object: T,
    ...props: Many<Key>[]
): Pick<T, Key>;

async function getPage(page: any): Promise<{ title: string; intro: string }> {
    return {
        title: "",
        ...pick(page, ["intro"]),
    };
}
