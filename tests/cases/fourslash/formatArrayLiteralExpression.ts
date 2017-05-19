///<reference path='fourslash.ts' />

////export let Things = [{
////    Hat: 'hat', /*1*/
////    Glove: 'glove',
////    Umbrella: 'umbrella'
////},{/*2*/
////        Salad: 'salad', /*3*/
////        Burrito: 'burrito',
////        Pie: 'pie'
////    }];/*4*/
////
////export let Things2 = [
////{
////    Hat: 'hat', /*5*/
////    Glove: 'glove',
////    Umbrella: 'umbrella'
////}/*6*/,
////    {
////        Salad: 'salad', /*7*/
////        Burrito: ['burrito', 'carne asada', 'tinga de res', 'tinga de pollo'], /*8*/
////        Pie: 'pie'
////    }];/*9*/

format.document();

goTo.marker("1");
verify.currentLineContentIs("    Hat: 'hat',");
goTo.marker("2");
verify.currentLineContentIs("}, {");
goTo.marker("3");
verify.currentLineContentIs("    Salad: 'salad',");
goTo.marker("4");
verify.currentLineContentIs("}];");

goTo.marker("5");
verify.currentLineContentIs("        Hat: 'hat',");
goTo.marker("6");
verify.currentLineContentIs("    },");
goTo.marker("7");
verify.currentLineContentIs("        Salad: 'salad',");
goTo.marker("8");
verify.currentLineContentIs("        Burrito: ['burrito', 'carne asada', 'tinga de res', 'tinga de pollo'],");
goTo.marker("9");
verify.currentLineContentIs("    }];");
