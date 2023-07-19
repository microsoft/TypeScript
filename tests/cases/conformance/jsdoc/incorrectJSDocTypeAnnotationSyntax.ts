// @filename: incorrectJSDocTypeAnnotationSyntax.js
// @checkJs: true
// @noEmit: true

class Bad { message = "doom" }
class Worse { message = "doooooom" }
/**
 * @throws {@link Bad} it's real bad
 * @throws {@type Worse} definitely don't want to see this one!
 * @throws {@TotalType} didn't even mean to put the @ there
 * @return {void}
 */
function can(b) {
    if (b)
        throw new Bad()
    else
        throw new Worse()
}
