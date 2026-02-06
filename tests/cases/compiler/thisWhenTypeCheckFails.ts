// @target: es2015
class c {
    public n() {
        var k = () => {
            var s: string = this.n();
        }
    }    
}
