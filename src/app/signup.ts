export class Signup {
    name:string;
    username:string;
    phone:number;
    pass:string;
    usertype:string;
    activated:boolean;

    constructor(nm,ph,email,pass, utype)
    {
        this.name= nm;
        this.phone= ph;
        this.username= email;
        this.pass= pass;
        this.usertype= utype
    }
}
