
/*
 * We use the Error interface instead of extending the Error object.
 * This is because if you extend Error, it will forcefully overwrite the constructor
 * losing access to it's name, which causes a wide range of negative side effects.
 * 
 * Unfortunately, this means you cannot use instanceof Error checks, but instanceof NBSError
 * checks should still work so that shouldn't be a big deal...
 */
export class NBSError implements Error {
    public name: string;
    public message: string;
    public stack: string;

    public constructor(message: string) {
        this.name = this.constructor.name;
        this.message = message;

        if ((<any>Error).captureStackTrace) {
            (<any>Error).captureStackTrace(this, NBSError)
        }
        else {
            this.stack = new Error().stack;
        }
    }
}
