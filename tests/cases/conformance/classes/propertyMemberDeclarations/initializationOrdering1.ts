// @target: esnext, es2021, es2022
// @useDefineForClassFields: true, false

class Helper {
    create(): boolean {
        return true
    }
}

export class Broken {
    constructor(readonly facade: Helper) {
        console.log(this.bug)
    }
    bug = this.facade.create()

}

new Broken(new Helper)