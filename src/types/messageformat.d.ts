declare module "messageformat" {
  type Msg = (data: object) => string;

  interface MessageFormat {
    constructor(locale: string);
    compile(message: string): Msg;
  }

  export default MessageFormat;
}