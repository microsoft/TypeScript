// @declaration: true
export function enumFromStrings<const Members extends readonly string[]>() {
    type Part1 = {
        [key in keyof Members as Members[key] extends string
        ? Members[key]
        : never]: Members[key];
    };
    type Part2 = { [Property in keyof Part1]: Part1[Property] };
    return Object.create(null) as Part2;
}
