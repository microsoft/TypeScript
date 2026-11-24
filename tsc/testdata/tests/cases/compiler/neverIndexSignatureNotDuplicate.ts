// `never` distributes to no types, so these aren't duplicate index signatures.
interface I {
    [k: never]: string;
    [k: never]: number;
}
