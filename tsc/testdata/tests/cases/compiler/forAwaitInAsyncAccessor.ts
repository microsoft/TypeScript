// @filename: a.ts
class C {
    async get x() {
        for await (const y of []) {
        }
    }
}
