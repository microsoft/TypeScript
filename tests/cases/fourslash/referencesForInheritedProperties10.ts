/// <reference path='fourslash.ts'/>

//// interface IFeedbackHandler {
////   /*1*/handleAccept?(): void;
////   handleReject?(): void;
//// }
////
//// abstract class AbstractFeedbackHandler implements IFeedbackHandler {}
////
//// class FeedbackHandler extends AbstractFeedbackHandler {
////   /*2*/handleAccept(): void {
////     console.log("Feedback accepted");
////   }
////
////   handleReject(): void {
////     console.log("Feedback rejected");
////   }
//// }
////
//// function foo(handler: IFeedbackHandler) {
////   handler./*3*/handleAccept?.();
////   handler.handleReject?.();
//// }

verify.baselineFindAllReferences('1', '2', '3');
