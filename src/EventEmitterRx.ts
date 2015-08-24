/// <reference path="../typings/tsd.d.ts" />

import * as Rx from 'rx';

/**
 * EventEmitter
 * Based on "How do I create a custom event emitter?"
 * @see https://github.com/Reactive-Extensions/RxJS/blob/master/doc/howdoi/eventemitter.md
 */
export default class EventEmitterRx {

    /**
     * Hash map of subjects
     * @type {{Rx.Subject}}
     */
    private subjects: { [key: string]: Rx.Subject<any> } = {};

    constructor() {}

    /**
     * Emits events through a subject to all subscribed broadcaster
     * @param name {string} Name of an event
     * @param data {Object} Event data
     */
    next(name:string, data:Object = {}) {
        this.subjects[name] || (this.subjects[name] = new Rx.Subject());
        this.subjects[name].onNext(data);
    }

    /**
     * Subscribes a Observer (listener) to an event.
     * @param name {string} Name of an event
     * @param handler {any} Callback of the listener (subscriber)
     * @returns {Rx.IDisposable}
     */
    subscribe(name:string, handler: any):Rx.IDisposable {
        this.subjects[name] || (this.subjects[name] = new Rx.Subject());
        return this.subjects[name].subscribe(handler);
    }

    /**
    * Indicates whether a Subject has Observers subscribed to it.
    * @param name {string} Name of an event
    * @returns {boolean} Returns true if the Subject has observers, else false.
    */
    hasObserver(name:string):boolean{
        return this.subjects[name] !== undefined && this.subjects[name].hasObservers();
    }

    /**
     * Cleans up a Subject and remove all its observers.
     * Also it removes the subject from subject map.
     */
    dispose(name:string) {
        if (this.subjects[name]) {
            this.subjects[name].dispose();
            delete this.subjects[name];
        }
    }

    /**
     * Clean up all Observers and clean up map of Subjects
     */
    disposeAll() {
        var subjects = this.subjects;
        var hasOwnProp:Function = {}.hasOwnProperty;
        for (var prop in subjects) {
            if (hasOwnProp.call(subjects, prop)) {
                subjects[prop].dispose();
            }
        }

        this.subjects = {};
    }
}
