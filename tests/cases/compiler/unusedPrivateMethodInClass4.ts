//@noUnusedLocals:true
//@noUnusedParameters:true

class greeter {
    private function1() {
        var y = 10;
    }

    private function2() {
        var y = 10;
    }

    public function3() {
        var y = 10;
        this.function2();
    }
}