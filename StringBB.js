"use strict";

var UtilBB = require('./UtilBB.js');

/* Main class */
function StringBB(val) {
	this.value = val || '';
	
	Object.defineProperty(this, 'length', {
		get: function() { return this.value.length; }
	});
}

/* Pseudo-subclass String */
StringBB.prototype = new String;
StringBB.prototype.toString = StringBB.prototype.valueOf = function() { return this.value };

/* Export */
module.exports = StringBB;
