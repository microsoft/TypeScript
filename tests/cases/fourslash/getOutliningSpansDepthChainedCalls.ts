/// <reference path="fourslash.ts"/>

// Tests that each 'else if' does not count towards a higher nesting depth.

////declare var router: any;
////router
////    .get("/", async(ctx) =>[|{
////        ctx.body = "base";
////    }|])
////    .post("/a", async(ctx) =>[|{
////        //a
////    }|])
////    .get("/", async(ctx) =>[|{
////        ctx.body = "base";
////    }|])
////    .post("/a", async(ctx) =>[|{
////        //a
////    }|])
////    .get("/", async(ctx) =>[|{
////        ctx.body = "base";
////    }|])
////    .post("/a", async(ctx) =>[|{
////        //a
////    }|])
////    .get("/", async(ctx) =>[|{
////        ctx.body = "base";
////    }|])
////    .post("/a", async(ctx) =>[|{
////        //a
////    }|])
////    .get("/", async(ctx) =>[|{
////        ctx.body = "base";
////    }|])
////    .post("/a", async(ctx) =>[|{
////        //a
////    }|])
////    .get("/", async(ctx) =>[|{
////        ctx.body = "base";
////    }|])
////    .post("/a", async(ctx) =>[|{
////        //a
////    }|])
////    .get("/", async(ctx) =>[|{
////        ctx.body = "base";
////    }|])
////    .post("/a", async(ctx) =>[|{
////        //a
////    }|])
////    .get("/", async(ctx) =>[|{
////        ctx.body = "base";
////    }|])
////    .post("/a", async(ctx) =>[|{
////        //a
////    }|])
////    .get("/", async(ctx) =>[|{
////        ctx.body = "base";
////    }|])
////    .post("/a", async(ctx) =>[|{
////        //a
////    }|])
////    .get("/", async(ctx) =>[|{
////        ctx.body = "base";
////    }|])
////    .post("/a", async(ctx) =>[|{
////        //a
////    }|])
////    .get("/", async(ctx) =>[|{
////        ctx.body = "base";
////    }|])
////    .post("/a", async(ctx) =>[|{
////        //a
////    }|])
////    .get("/", async(ctx) =>[|{
////        ctx.body = "base";
////    }|])
////    .post("/a", async(ctx) =>[|{
////        //a
////    }|])
////    .get("/", async(ctx) =>[|{
////        ctx.body = "base";
////    }|])
////    .post("/a", async(ctx) =>[|{
////        //a
////    }|])
////    .get("/", async(ctx) =>[|{
////        ctx.body = "base";
////    }|])
////    .post("/a", async(ctx) =>[|{
////        //a
////    }|])
////    .get("/", async(ctx) =>[|{
////        ctx.body = "base";
////    }|])
////    .post("/a", async(ctx) =>[|{
////        //a
////    }|])
////    .get("/", async(ctx) =>[|{
////        ctx.body = "base";
////    }|])
////    .post("/a", async(ctx) =>[|{
////        //a
////    }|])
////    .get("/", async(ctx) =>[|{
////        ctx.body = "base";
////    }|])
////    .post("/a", async(ctx) =>[|{
////        //a
////    }|])
////    .get("/", async(ctx) =>[|{
////        ctx.body = "base";
////    }|])
////    .post("/a", async(ctx) =>[|{
////        //a
////    }|])

verify.outliningSpansInCurrentFile(test.ranges());
