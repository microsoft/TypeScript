// @strict: true
// @lib: dom,esnext

export const carQuery = new URLSearchParams([
    ["query", "suv"],
    ["new", true],
    ["accidents", false],
    ["miles", 42_000],
]);

carQuery.set("used", true);
carQuery.append("year", 2023);
carQuery.append("year", 2024);

let str: string | null, strs: string[];

str = carQuery.get("query");
strs = carQuery.getAll("year");

for (const [key, value] of carQuery) {
    str = key;
    str = value;
}
for (const [key, value] of carQuery.entries()) {
    str = key;
    str = value;
}
for (const value of carQuery.values()) {
    str = value;
}
carQuery.forEach((value, key) => {
    str = key;
    str = value;
});
