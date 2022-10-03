// @noEmit: true
// @allowJs: true
// @filename: spellingUncheckedJS.js
export var inModule = 1
inmodule.toFixed()

function f() {
    var locals = 2 + true
    locale.toFixed()
    // @ts-expect-error
    localf.toExponential()
    // @ts-expect-error
    "this is fine"
}
class Classe {
    non = 'oui'
    methode() {
        // no error on 'this' references
        return this.none
    }
}
class Derivee extends Classe {
    methode() {
        // no error on 'super' references
        return super.none
    }
}


var object = {
    spaaace: 3
}
object.spaaaace // error on read
object.spaace = 12 // error on write
object.fresh = 12 // OK
other.puuuce // OK, from another file
new Date().getGMTDate() // OK, from another file

// No suggestions for globals from other files
const atoc = setIntegral(() => console.log('ok'), 500)
AudioBuffin // etc
Jimmy
Jon

// @filename: other.js
var Jimmy = 1
var John = 2
Jon // error, it's from the same file
var other = {
    puuce: 4
}
