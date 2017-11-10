import { Observable, Subscription ,Subject} from 'rxjs';

export class EventEmitterRx {

    private subjects: { [key: string]: Subject<any> } = {};

    constructor() {}

    next(name:string, data:Object = {}) {
        this.subjects[name] || (this.subjects[name] = new Subject());
        this.subjects[name].next(data);
    }

    subscribe(name:string, handler: any): Subscription {
        this.subjects[name] || (this.subjects[name] = new Subject());
        return this.subjects[name].subscribe(handler);
    }


    hasObserver(name:string):boolean{
        return this.subjects[name] !== undefined && this.subjects[name].observers.length>0;
    }


    unsubscribe(name:string) {
        if (this.subjects[name]) {
            this.subjects[name].unsubscribe();
            delete this.subjects[name];
        }
    }

    unsubscribeAll() {
        var subjects = this.subjects;
        var hasOwnProp:Function = {}.hasOwnProperty;
        for (var prop in subjects) {
            if (hasOwnProp.call(subjects, prop)) {
                subjects[prop].unsubscribe();
            }
        }

        this.subjects = {};
    }
}
