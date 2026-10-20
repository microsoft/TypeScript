// @strict: true

declare const items: { id: number }[];
declare const registry: { [id: number]: { [frame: number]: unknown } };

items
    .filter(item => true)
    .filter(item => !registry[item.id])
    .forEach(item => item.id);
