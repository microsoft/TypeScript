module ObjectLiterals {
    interface MyPoint {
        x1: number;
        y1: number;
    }

    var p1: MyPoint = {
          /*here*/
    };

    var p2: MyPoint = {
        x1: 5,
          /*here*/
    };

    var p3: MyPoint = {
        x1 /*here*/
    };

    var p4: MyPoint = {
        x1: 5,
        y1 /*here*/ : 6
    };

    // Negative cases (global completion)
    var n4: MyPoint = {
        x1:  /*here*/
    };

    var n2: MyPoint = {
        x1:  /*here*/,
    };
}
