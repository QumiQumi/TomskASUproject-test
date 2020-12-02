// export interface Person {
// 	id: bigint;
// 	firstName: string;
// 	lastName: string;
// }
export class Person {
    public id: number;
    public firstName: string;
    public lastName: string;
    constructor() {
        this.id = 0,
            this.firstName = '',
            this.lastName = '';
    }
}
