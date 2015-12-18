"use strict";

/* Converters stitching together the parsers */
function Html2BB(str) {
	return str.replace( /<img.+?src=[\"'](.+?)[\"'].*?>/gi , function(tag, src) { return '[IMG]' + src + '[/IMG]' } )
	.replace( /<a.+?href=[\"'](.+?)[\"'].*?>(.+?)<\/a>/gi , function(tag, href, txt) { return '[URL=' + href + ']' + txt + '[/URL]' } )
	.replace( /<strike[^>]*>(.+)<\/strike>/gi , function(tag, txt) { return  '[S]' + txt + '[/S]' } )
	.replace( /<i[^>]*>(.+)<\/i>/gi , function(tag, txt) { return '[I]' + txt + '[/I]' } )
	.replace( /<b[^>]*>(.+)<\/b>/gi , function(tag, txt) { return '[B]' + txt + '[/B]' } )
	.replace( /<u[^>]*>(.+)<\/u>/gi , function(tag, txt) { return '[U]' + txt + '[/U]' } )
	.replace( /<[^>]*>/ig , ' ')
	.replace( /\s+/g , ' ');
}

function BB2Html(str) {
	return str.replace( /\[IMG\](.+?)\[\/IMG\]/gi , function(tag, src) { return '<img src="' + src + '">' } )
	.replace( /\[URL=(.+?)\](.+?)\[\/URL\]/gi , function(tag, href, txt) { return '<a href="' + href + '">' + txt + '</a>' } )
	.replace( /\[S\](.+)\[\/S\]/gi , function(tag, txt) { return '<strike>' + txt + '</strike>' } )
	.replace( /\[I\](.+)\[\/I\]/gi , function(tag, txt) { return '<i>' + txt + '</i>' } )
	.replace( /\[B\](.+)\[\/B\]/gi , function(tag, txt) { return '<b>' + txt + '</b>' } )
	.replace( /\[U\](.+)\[\/U\]/gi , function(tag, txt) { return '<u>' + txt + '</u>' } )
	.replace( /\s+/g , ' ');
}


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

/* Methods */
StringBB.prototype.toBB = function() { return Html2BB(this.value) };
StringBB.prototype.toHtml = function() { return BB2Html(this.value) };


/* Export */
module.exports = StringBB;
