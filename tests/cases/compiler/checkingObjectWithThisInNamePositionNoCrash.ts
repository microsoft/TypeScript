// @strict: true
// @declaration: true
export const thing = {
    doit() {
        return {
            [this.a]: "", // should refer to the outer object with the doit method, notably not present
        }
    }
}