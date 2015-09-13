'use strict';
const util = require('util');
const EventEmitter = require('events').EventEmitter;
function MyEventEmitter() {
    // Initialize necessary properties from `EventEmitter` in this instance
    EventEmitter.call(this);
}
// Inherit functions from `EventEmitter`'s prototype
util.inherits(MyEventEmitter, EventEmitter);

module.exports = new MyEventEmitter();