"use strict";

UtilBB = {
	/* Matches <img src="..."> tags */
	img: str=> str.replace( /<img.+?src=[\"'](.+?)[\"'].*?>/gi , (tag, src)=> new StringBB(`[IMG]${src}[/IMG]`) ),
	/* Matches <a href="...">...</a> tags */
	a: str=> str.replace( /<a.+?href=[\"'](.+?)[\"'].*?>(.+?)<\/a>/gi , (tag, href, txt)=> new StringBB(`[URL=${href}]${txt}[/URL]`) ),
	/* Matches <i...>...</i>, selecting the contents */
	strike: str=> str.replace( /<strike[^>]*>(.+)<\/strike>/gi , (tag, txt)=> new StringBB(`[S]${txt}[/S]`) ),
	i: str=> str.replace( /<i[^>]*>(.+)<\/i>/gi , (tag, txt)=> new StringBB(`[I]${txt}[/I]`) ),
	b: str=> str.replace( /<b[^>]*>(.+)<\/b>/gi , (tag, txt)=> new StringBB(`[B]${txt}[/B]`) ),
	u: str=> str.replace( /<u[^>]*>(.+)<\/u>/gi , (tag, txt)=> new StringBB(`[U]${txt}[/U]`) )
};

/* Converters stitching together the parsers */
var Html2BB = str=> str.replace( /<img.+?src=[\"'](.+?)[\"'].*?>/gi , (tag, src)=> `[IMG]${src}[/IMG]` )
		.replace( /<a.+?href=[\"'](.+?)[\"'].*?>(.+?)<\/a>/gi , (tag, href, txt)=> `[URL=${href}]${txt}[/URL]` )
		.replace( /<strike[^>]*>(.+)<\/strike>/gi , (tag, txt)=> `[S]${txt}[/S]` )
		.replace( /<i[^>]*>(.+)<\/i>/gi , (tag, txt)=> `[I]${txt}[/I]` )
		.replace( /<b[^>]*>(.+)<\/b>/gi , (tag, txt)=> `[B]${txt}[/B]` )
		.replace( /<u[^>]*>(.+)<\/u>/gi , (tag, txt)=> `[U]${txt}[/U]` )
		.replace( /<[^>]*>/ig , ' ')
		.replace( /\s+/g , ' ');
var BB2Html = str=> str.replace( /\[IMG\](.+?)\[\/IMG\]/gi , (tag, src)=> `<img src="${src}">` )
		.replace( /\[URL=(.+?)\](.+?)\[\/URL\]/gi , (tag, href, txt)=> `<a href="${href}">${txt}</a>` )
		.replace( /\[S\](.+)\[\/S\]/gi , (tag, txt)=> `<strike>${txt}</strike>` )
		.replace( /\[I\](.+)\[\/I\]/gi , (tag, txt)=> `<i>${txt}</i>` )
		.replace( /\[B\](.+)\[\/B\]/gi , (tag, txt)=> `<b>${txt}</b>` )
		.replace( /\[U\](.+)\[\/U\]/gi , (tag, txt)=> `<u>${txt}</u>` )
		.replace( /\s+/g , ' ');

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
