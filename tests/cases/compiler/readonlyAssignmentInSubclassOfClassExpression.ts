class C extends (class {} as new () => Readonly<{ attrib: number }>) {
    constructor() {
        super()
        this.attrib = 2
    }
}
