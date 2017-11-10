import { EventEmitterRx } from './../lib/EventEmitterRx';
import { Observable, Subscription ,Subject} from 'rxjs';
import "mocha";
import {expect} from 'chai';
import { ok } from "assert";
import * as Sinon from 'sinon';
var sinon = require("sinon");


describe("EventEmitterRx", function () {
    var emitter: EventEmitterRx;
    
        beforeEach(() => {
            emitter = new EventEmitterRx();
        });
    
        it('subscribes an Observer', () => {
            var callback:Sinon.SinonSpy = sinon.spy();
            const EVENT:string = 'myEvent';
            var result:Subscription = emitter.subscribe(EVENT, callback);
            emitter.next(EVENT);
            expect(callback.calledOnce).to.be.ok;
        });
    
        it('has no Observers by default', () => {
            expect(emitter.hasObserver('anyEvent')).to.be.false;
        });
    
        it('has Observers', () => {
            const EVENT:string = 'myEvent';
            var result:Subscription = emitter.subscribe(EVENT, sinon.spy());
            expect(emitter.hasObserver(EVENT)).to.be.ok;
        });
    
        it('calls the Observer with data', () => {
            var callback:Sinon.SinonSpy = sinon.spy();
            const EVENT:string = 'myEvent';
            const DATA: string = 'myData';
            var result:Subscription = emitter.subscribe(EVENT, callback);
            emitter.next(EVENT, DATA);
            expect(callback.calledWith(DATA)).to.be.ok;
        });
    
        it('unsubscribes an Observer', () => {
            var callback:Sinon.SinonSpy = sinon.spy();
            const EVENT:string = 'myEvent';
            var result:Subscription = emitter.subscribe(EVENT, callback);
            // first call
            emitter.next(EVENT);
            // unsubscribes event
            result.unsubscribe();
            // second call
            emitter.next(EVENT);
            // callback should be called only once
            expect(callback.callCount).to.be.equal(1);
        });
    
        it('clean up a Subject', () => {
            var callback:Sinon.SinonSpy = sinon.spy();
            const EVENT:string = 'myEvent';
            var resultA:Subscription= emitter.subscribe(EVENT, callback);
            // observers has to be there
            expect(emitter.hasObserver(EVENT)).to.be.ok;
            // dispose all
            emitter.unsubscribe(EVENT);
            // no observer has to be there now
            expect(emitter.hasObserver(EVENT)).to.be.false;
        });
    
        it('clean up all Subjects and its Observers', () => {
            var callback:Sinon.SinonSpy = sinon.spy();
            const EVENT_A:string = 'myEventA';
            const EVENT_B:string = 'myEventB';
            var resultA:Subscription = emitter.subscribe(EVENT_A, callback);
            var resultB:Subscription = emitter.subscribe(EVENT_B, callback);
            // observers has to be there
            expect(emitter.hasObserver(EVENT_A)).to.be.ok;
            expect(emitter.hasObserver(EVENT_B)).to.be.ok;
            // dispose all
            emitter.unsubscribeAll()
            // no observer has to be there now
            expect(emitter.hasObserver(EVENT_A)).to.be.false;
            expect(emitter.hasObserver(EVENT_B)).to.be.false;
        });
    
})
