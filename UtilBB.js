"use strict";

/* Matches <img src="..."> tags */
var imgRegex =			/<img.+?src=[\"'](.+?)[\"'].*?>/gi;

/* Matches <a href="...">...</a> tags */
var linkRegex =			/<a.+?href=[\"'](.+?)[\"'].*?>(.+?)<\/a>/gi;

/* Matches <i...>...</i>, selecting the contents */
var italicsRegex =		/<i[^>]*>(.+)<\/i>/gi;
var boldRegex =			/<b[^>]*>(.+)<\/b>/gi;
var underlineRegex =	/<u[^>]*>(.+)<\/u>/gi;
var strikeRegex =		/<strike[^>]*>(.+)<\/strike>/gi;

module.exports = {
	
	img:	str=> str.replace(imgRegex, (tag, src)=>		`[IMG]${src}[/IMG]`),
	a:		str=> str.replace(linkRegex, (tag, href, txt)=>	`[URL=${href}]${txt}[/URL]`),
	i:		str=> str.replace(italicsRegex, (tag, txt)=>	`[I]${txt}[/I]`),
	b:		str=> str.replace(boldRegex, (tag, txt)=>		`[B]${txt}[/B]`),
	u:		str=> str.replace(underlineRegex, (tag, txt)=>	`[U]${txt}[/U]`),
	strike:	str=> str.replace(strikeRegex, (tag, txt)=>		`[S]${txt}[/S]`)
	
};
