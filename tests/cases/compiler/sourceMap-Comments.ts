// @target: ES5
// @sourcemap: true
module sas.tools {
    export class Test {
        public doX(): void {
            let f: number = 2;
            switch (f) {
                case 1:
                    break;
                case 2:
                    //line comment 1
                    //line comment 2
                    break;
                case 3:
                    //a comment
                    break;
            }
        }
    }

}
