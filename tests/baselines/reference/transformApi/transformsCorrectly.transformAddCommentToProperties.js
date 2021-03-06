/*comment*/
class Clazz {
    /*comment*/
    constructor(/*comment*/
    field = 1) {
        this.field = field;
        /*comment*/
        this.instanceProp = 2;
    }
}
(function () {
    /*comment*/
    Clazz.staticProp = 1;
}).call(Clazz);
