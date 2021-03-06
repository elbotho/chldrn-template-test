$(document).ready(setup);
window.addEventListener('mercury:load', setup); //sq load event

function setup(){
	setupFold();
	disableGalleryLinks();
	setupFixedHeader();
	setupSmoothScroll();
	setupAnchorFix();
	setupLoadThumbnail();
	setupTwingle();
	setupBackToTop();
	setTimeout(setupCarouselFix, 400);
	setupGallerySingleViewFix();
	setTimeout(setupCustomNewsletterForms, 400);
	setupNewsletterButtons();
	analyticsPageView();
}

window.addEventListener("orientationchange", function() {
	setupGallerySingleViewFix();
}, false);

document.addEventListener("DOMContentLoaded", function() {
	setTimeout(setupSearchFix, 1200);
});


function setupSearchFix(){
	if( $('.sqs-search-page .sqs-search-page-input input').length === 0 ) return;
	console.log('squarespace search-fix');
	var searchInput = Y.Widget.getByNode( Y.one ('.sqs-search-page .sqs-search-page-input input') );
	var str = searchInput.get('queryString');

	if ( !/[\-_.\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]/i.test(str) ) return; //no umlauts to fix

	searchInput.set('queryString', str+' ' );
	searchInput.set('queryString', str.substring(0,str.length) );
}

function setupGallerySingleViewFix(){
	if( $('Main.Main--gallery-list').length ) {
		$('section.Intro').hide();
	}
}

function setupFold(){

	var markerSelector = 'h2 > a[href="#fold"],h3 > a[href="#fold"]';
	var nextUntilSelector = 'h2.fold-toggle, h3.fold-toggle, hr, footer';
	var toggles = $();
	var firstClick = true;

	$('.Content-outer main').find(markerSelector).each( function(i,elem){
		var toggle = $(elem).parent();
		toggles = toggles.add(toggle);
		$(elem).remove();
		toggles.add(toggle);
	});
	toggles.addClass('fold-toggle');

	for (var i = 0; i < toggles.length; i++) {

		var toggle= $(toggles[i]);
		var foldSection = toggle.nextUntil(nextUntilSelector);

		if(foldSection.length > 0){
			foldSection.addClass("fold-section-hidden");
			continue;
		}

		if( i+1 > toggles.length ) continue; //todo
		var nextToggle = $(toggles[i+1]);
		var thisParent = toggle.parents('div.sqs-block');
		var nextParent = nextToggle.parents('div.sqs-block');

		var stopElement = thisParent.nextUntil( $(nextParent).add('.horizontalrule-block') );

		foldSection = $( stopElement )
		.add( stopElement.find(nextUntilSelector).prevAll() );
		foldSection.addClass("fold-section-hidden");

		toggle.data(foldSection);
	}

	toggles.click(function(){
		var obj = $(this).data();
		if(firstClick) {
			$('.fold-section-hidden').hide().removeClass('fold-section-hidden');
			firstClick = false;
		}
		if(Object.keys(obj).length == 0) {
			$(this).nextUntil(nextUntilSelector).slideToggle();
			return true;
		}
		obj.slideToggle();
	});
}

function disableGalleryLinks(){
	$('.sqs-block-summary-v2 .summary-block-collection-type-gallery .summary-item').each( function(){
		
		var container = $(this);
		var links = container.find('a.sqs-gallery-image-container, a.summary-title-link');
		var url = links.first().attr('href');
	
		if( url.indexOf('galerie') !== -1 || url.indexOf('gallery') !== -1 ) {
			container.addClass('nolink');
			links.attr('href','');
		}
	});
}

function setupFixedHeader(){
	$(document).on('scroll',function(){
	    if ($(document).scrollTop() > 32) {
	        $('header.Header--top').addClass('fixed')
	    } else {
	        $('header.Header--top').removeClass('fixed')
	    }
	 });
}
 
function setupSmoothScroll(){
	
	$('a[href*=\\#]:not([href=\\#])').click(function() {if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {var target = $(this.hash);target = target.length ? target : $('[name=' + this.hash.slice(1) +']');if (target.length) {$('html,body').animate({scrollTop: target.offset().top-190}, 1000);history.pushState(null,null,this.hash); return false;}}});
}

function setupAnchorFix () {
	if(window.location.hash.substr(0,7) === '#itemId') return;
  	
  	var target = $(window.location.hash);
	if(target.length > 0) {
		$('html,body').animate({scrollTop: target.offset().top-190}, 0);
    }
}

function setupLoadThumbnail(){ //for blogs
	if( $('.Main--blog-item .BlogItem').length ) {
		if( window.location.pathname.indexOf( '/jobs' ) !== -1) return;
		loadThumbnail();
	}
}

function loadThumbnail(){

	!function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var r={};e.m=t,e.c=r,e.i=function(t){return t},e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=26)}([function(t,e,r){"use strict";(function(e){function n(t){return"[object Array]"===a.call(t)}function o(t){return null!==t&&"object"==typeof t}function i(t){return"[object Function]"===a.call(t)}function u(t,e){if(null!==t&&void 0!==t)if("object"==typeof t||n(t)||(t=[t]),n(t))for(var r=0,o=t.length;r<o;r++)e.call(null,t[r],r,t);else for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.call(null,t[i],i,t)}var s=r(6),a=Object.prototype.toString;t.exports={isArray:n,isArrayBuffer:function(t){return"[object ArrayBuffer]"===a.call(t)},isBuffer:function(t){return void 0!==e&&e.isBuffer&&e.isBuffer(t)},isFormData:function(t){return"undefined"!=typeof FormData&&t instanceof FormData},isArrayBufferView:function(t){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(t):t&&t.buffer&&t.buffer instanceof ArrayBuffer},isString:function(t){return"string"==typeof t},isNumber:function(t){return"number"==typeof t},isObject:o,isUndefined:function(t){return void 0===t},isDate:function(t){return"[object Date]"===a.call(t)},isFile:function(t){return"[object File]"===a.call(t)},isBlob:function(t){return"[object Blob]"===a.call(t)},isFunction:i,isStream:function(t){return o(t)&&i(t.pipe)},isURLSearchParams:function(t){return"undefined"!=typeof URLSearchParams&&t instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:u,merge:function t(){function e(e,n){"object"==typeof r[n]&&"object"==typeof e?r[n]=t(r[n],e):r[n]=e}for(var r={},n=0,o=arguments.length;n<o;n++)u(arguments[n],e);return r},extend:function(t,e,r){return u(e,function(e,n){t[n]=r&&"function"==typeof e?s(e,r):e}),t},trim:function(t){return t.replace(/^\s*/,"").replace(/\s*$/,"")}}}).call(e,r(29).Buffer)},function(t,e,r){"use strict";(function(e){function n(t,e){!i.isUndefined(t)&&i.isUndefined(t["Content-Type"])&&(t["Content-Type"]=e)}var o,i=r(0),u=r(23),s={"Content-Type":"application/x-www-form-urlencoded"},a={adapter:("undefined"!=typeof XMLHttpRequest?o=r(2):void 0!==e&&(o=r(2)),o),transformRequest:[function(t,e){return u(e,"Content-Type"),i.isFormData(t)||i.isArrayBuffer(t)||i.isBuffer(t)||i.isStream(t)||i.isFile(t)||i.isBlob(t)?t:i.isArrayBufferView(t)?t.buffer:i.isURLSearchParams(t)?(n(e,"application/x-www-form-urlencoded;charset=utf-8"),t.toString()):i.isObject(t)?(n(e,"application/json;charset=utf-8"),JSON.stringify(t)):t}],transformResponse:[function(t){if("string"==typeof t)try{t=JSON.parse(t)}catch(t){}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(t){return t>=200&&t<300}};a.headers={common:{Accept:"application/json, text/plain, */*"}},i.forEach(["delete","get","head"],function(t){a.headers[t]={}}),i.forEach(["post","put","patch"],function(t){a.headers[t]=i.merge(s)}),t.exports=a}).call(e,r(33))},function(t,e,r){"use strict";var n=r(0),o=r(15),i=r(18),u=r(24),s=r(22),a=r(5),f="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||r(17);t.exports=function(t){return new Promise(function(e,c){var h=t.data,l=t.headers;n.isFormData(h)&&delete l["Content-Type"];var p=new XMLHttpRequest,d="onreadystatechange",g=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in p||s(t.url)||(p=new window.XDomainRequest,d="onload",g=!0,p.onprogress=function(){},p.ontimeout=function(){}),t.auth){var y=t.auth.username||"",m=t.auth.password||"";l.Authorization="Basic "+f(y+":"+m)}if(p.open(t.method.toUpperCase(),i(t.url,t.params,t.paramsSerializer),!0),p.timeout=t.timeout,p[d]=function(){if(p&&(4===p.readyState||g)&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in p?u(p.getAllResponseHeaders()):null,n={data:t.responseType&&"text"!==t.responseType?p.response:p.responseText,status:1223===p.status?204:p.status,statusText:1223===p.status?"No Content":p.statusText,headers:r,config:t,request:p};o(e,c,n),p=null}},p.onerror=function(){c(a("Network Error",t)),p=null},p.ontimeout=function(){c(a("timeout of "+t.timeout+"ms exceeded",t,"ECONNABORTED")),p=null},n.isStandardBrowserEnv()){var w=r(20),v=(t.withCredentials||s(t.url))&&t.xsrfCookieName?w.read(t.xsrfCookieName):void 0;v&&(l[t.xsrfHeaderName]=v)}if("setRequestHeader"in p&&n.forEach(l,function(t,e){void 0===h&&"content-type"===e.toLowerCase()?delete l[e]:p.setRequestHeader(e,t)}),t.withCredentials&&(p.withCredentials=!0),t.responseType)try{p.responseType=t.responseType}catch(e){if("json"!==t.responseType)throw e}"function"==typeof t.onDownloadProgress&&p.addEventListener("progress",t.onDownloadProgress),"function"==typeof t.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",t.onUploadProgress),t.cancelToken&&t.cancelToken.promise.then(function(t){p&&(p.abort(),c(t),p=null)}),void 0===h&&(h=null),p.send(h)})}},function(t,e,r){"use strict";function n(t){this.message=t}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,t.exports=n},function(t,e,r){"use strict";t.exports=function(t){return!(!t||!t.__CANCEL__)}},function(t,e,r){"use strict";var n=r(14);t.exports=function(t,e,r,o){var i=new Error(t);return n(i,e,r,o)}},function(t,e,r){"use strict";t.exports=function(t,e){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return t.apply(e,r)}}},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t){var e=document.createElement("div");e.className="Intro-image loaded content-fill";var r=document.createElement("img");u.default.get(document.location.pathname+"/?format=json").catch(function(t){return console.log(t)}).then(function(n){var o=n.data.item;if(o.hasOwnProperty("assetUrl")){o.hasOwnProperty("sourceUrl")&&(document.getElementById("image-source").innerHTML=o.sourceUrl);var i=o.assetUrl;r.setAttribute("data-src",i),r.setAttribute("data-image-dimensions",o.originalSize),r.setAttribute("data-image-focal-point",o.mediaFocalPoint.x+","+o.mediaFocalPoint.y),e.appendChild(r),t.appendChild(e),(0,a.default)(".Main--blog-item .Intro img[data-src]"),window.addEventListener("resize",(0,s.default)(function(){(0,a.default)(".Main--blog-item .Intro img[data-src]")},100))}})}function i(){if(f.title){var t=((i=document.createElement("div")).className="Intro Intro--has-image",i),e=document.querySelectorAll("section.Main-content h2")[0],r=document.createElement("div");if(e === undefined){e=document.querySelectorAll("section.Main-content h1")[0]} r.className="custom-img-wrapper";var n=document.createElement("div");n.className="source",n.setAttribute("id","image-source"),r.appendChild(t),r.appendChild(n),e.parentNode.insertBefore(r,e.nextSibling),o(t)}var i}Object.defineProperty(e,"__esModule",{value:!0});var u=n(r(8)),s=n(r(30)),a=n(r(27)),f={},c={init:function(){f.wrapper=document.querySelector(".Main--blog-item"),f.title=document.querySelector(".BlogItem-title"),f.meta=document.querySelector(".BlogItem-meta"),i()}};e.default=c},function(t,e,r){t.exports=r(9)},function(t,e,r){"use strict";function n(t){var e=new u(t),r=i(u.prototype.request,e);return o.extend(r,u.prototype,e),o.extend(r,e),r}var o=r(0),i=r(6),u=r(11),s=r(1),a=n(s);a.Axios=u,a.create=function(t){return n(o.merge(s,t))},a.Cancel=r(3),a.CancelToken=r(10),a.isCancel=r(4),a.all=function(t){return Promise.all(t)},a.spread=r(25),t.exports=a,t.exports.default=a},function(t,e,r){"use strict";function n(t){if("function"!=typeof t)throw new TypeError("executor must be a function.");var e;this.promise=new Promise(function(t){e=t});var r=this;t(function(t){r.reason||(r.reason=new o(t),e(r.reason))})}var o=r(3);n.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},n.source=function(){var t;return{token:new n(function(e){t=e}),cancel:t}},t.exports=n},function(t,e,r){"use strict";function n(t){this.defaults=t,this.interceptors={request:new u,response:new u}}var o=r(1),i=r(0),u=r(12),s=r(13),a=r(21),f=r(19);n.prototype.request=function(t){"string"==typeof t&&(t=i.merge({url:arguments[0]},arguments[1])),(t=i.merge(o,this.defaults,{method:"get"},t)).baseURL&&!a(t.url)&&(t.url=f(t.baseURL,t.url));var e=[s,void 0],r=Promise.resolve(t);for(this.interceptors.request.forEach(function(t){e.unshift(t.fulfilled,t.rejected)}),this.interceptors.response.forEach(function(t){e.push(t.fulfilled,t.rejected)});e.length;)r=r.then(e.shift(),e.shift());return r},i.forEach(["delete","get","head","options"],function(t){n.prototype[t]=function(e,r){return this.request(i.merge(r||{},{method:t,url:e}))}}),i.forEach(["post","put","patch"],function(t){n.prototype[t]=function(e,r,n){return this.request(i.merge(n||{},{method:t,url:e,data:r}))}}),t.exports=n},function(t,e,r){"use strict";function n(){this.handlers=[]}var o=r(0);n.prototype.use=function(t,e){return this.handlers.push({fulfilled:t,rejected:e}),this.handlers.length-1},n.prototype.eject=function(t){this.handlers[t]&&(this.handlers[t]=null)},n.prototype.forEach=function(t){o.forEach(this.handlers,function(e){null!==e&&t(e)})},t.exports=n},function(t,e,r){"use strict";function n(t){t.cancelToken&&t.cancelToken.throwIfRequested()}var o=r(0),i=r(16),u=r(4),s=r(1);t.exports=function(t){return n(t),t.headers=t.headers||{},t.data=i(t.data,t.headers,t.transformRequest),t.headers=o.merge(t.headers.common||{},t.headers[t.method]||{},t.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(e){delete t.headers[e]}),(t.adapter||s.adapter)(t).then(function(e){return n(t),e.data=i(e.data,e.headers,t.transformResponse),e},function(e){return u(e)||(n(t),e&&e.response&&(e.response.data=i(e.response.data,e.response.headers,t.transformResponse))),Promise.reject(e)})}},function(t,e,r){"use strict";t.exports=function(t,e,r,n){return t.config=e,r&&(t.code=r),t.response=n,t}},function(t,e,r){"use strict";var n=r(5);t.exports=function(t,e,r){var o=r.config.validateStatus;r.status&&o&&!o(r.status)?e(n("Request failed with status code "+r.status,r.config,null,r)):t(r)}},function(t,e,r){"use strict";var n=r(0);t.exports=function(t,e,r){return n.forEach(r,function(r){t=r(t,e)}),t}},function(t,e,r){"use strict";function n(){this.message="String contains an invalid character"}var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";n.prototype=new Error,n.prototype.code=5,n.prototype.name="InvalidCharacterError",t.exports=function(t){for(var e,r,i=String(t),u="",s=0,a=o;i.charAt(0|s)||(a="=",s%1);u+=a.charAt(63&e>>8-s%1*8)){if((r=i.charCodeAt(s+=.75))>255)throw new n;e=e<<8|r}return u}},function(t,e,r){"use strict";function n(t){return encodeURIComponent(t).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=r(0);t.exports=function(t,e,r){if(!e)return t;var i;if(r)i=r(e);else if(o.isURLSearchParams(e))i=e.toString();else{var u=[];o.forEach(e,function(t,e){null!==t&&void 0!==t&&(o.isArray(t)&&(e+="[]"),o.isArray(t)||(t=[t]),o.forEach(t,function(t){o.isDate(t)?t=t.toISOString():o.isObject(t)&&(t=JSON.stringify(t)),u.push(n(e)+"="+n(t))}))}),i=u.join("&")}return i&&(t+=(-1===t.indexOf("?")?"?":"&")+i),t}},function(t,e,r){"use strict";t.exports=function(t,e){return e?t.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,""):t}},function(t,e,r){"use strict";var n=r(0);t.exports=n.isStandardBrowserEnv()?{write:function(t,e,r,o,i,u){var s=[];s.push(t+"="+encodeURIComponent(e)),n.isNumber(r)&&s.push("expires="+new Date(r).toGMTString()),n.isString(o)&&s.push("path="+o),n.isString(i)&&s.push("domain="+i),!0===u&&s.push("secure"),document.cookie=s.join("; ")},read:function(t){var e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(t,e,r){"use strict";t.exports=function(t){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)}},function(t,e,r){"use strict";var n=r(0);t.exports=n.isStandardBrowserEnv()?function(){function t(t){var e=t;return r&&(o.setAttribute("href",e),e=o.href),o.setAttribute("href",e),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var e,r=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return e=t(window.location.href),function(r){var o=n.isString(r)?t(r):r;return o.protocol===e.protocol&&o.host===e.host}}():function(){return!0}},function(t,e,r){"use strict";var n=r(0);t.exports=function(t,e){n.forEach(t,function(r,n){n!==e&&n.toUpperCase()===e.toUpperCase()&&(t[e]=r,delete t[n])})}},function(t,e,r){"use strict";var n=r(0);t.exports=function(t){var e,r,o,i={};return t?(n.forEach(t.split("\n"),function(t){o=t.indexOf(":"),e=n.trim(t.substr(0,o)).toLowerCase(),r=n.trim(t.substr(o+1)),e&&(i[e]=i[e]?i[e]+", "+r:r)}),i):i}},function(t,e,r){"use strict";t.exports=function(t){return function(e){return t.apply(null,e)}}},function(t,e,r){"use strict";var n,o=r(7);(n=o,n&&n.__esModule?n:{default:n}).default.init()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"img[data-src]",e=document.querySelectorAll(t),r=0;r<e.length;r++)ImageLoader.load(e[r],{load:!0})}},function(t,e,r){"use strict";function n(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");return"="===t[e-2]?2:"="===t[e-1]?1:0}function o(t,e,r){for(var n,o=[],u=e;u<r;u+=3)n=(t[u]<<16)+(t[u+1]<<8)+t[u+2],o.push((s=n,i[s>>18&63]+i[s>>12&63]+i[s>>6&63]+i[63&s]));var s;return o.join("")}e.byteLength=function(t){return 3*t.length/4-n(t)},e.toByteArray=function(t){var e,r,o,i,a,f,c=t.length;a=n(t),f=new s(3*c/4-a),o=a>0?c-4:c;var h=0;for(e=0,r=0;e<o;e+=4,r+=3)i=u[t.charCodeAt(e)]<<18|u[t.charCodeAt(e+1)]<<12|u[t.charCodeAt(e+2)]<<6|u[t.charCodeAt(e+3)],f[h++]=i>>16&255,f[h++]=i>>8&255,f[h++]=255&i;return 2===a?(i=u[t.charCodeAt(e)]<<2|u[t.charCodeAt(e+1)]>>4,f[h++]=255&i):1===a&&(i=u[t.charCodeAt(e)]<<10|u[t.charCodeAt(e+1)]<<4|u[t.charCodeAt(e+2)]>>2,f[h++]=i>>8&255,f[h++]=255&i),f},e.fromByteArray=function(t){for(var e,r=t.length,n=r%3,u="",s=[],a=0,f=r-n;a<f;a+=16383)s.push(o(t,a,a+16383>f?f:a+16383));return 1===n?(e=t[r-1],u+=i[e>>2],u+=i[e<<4&63],u+="=="):2===n&&(e=(t[r-2]<<8)+t[r-1],u+=i[e>>10],u+=i[e>>4&63],u+=i[e<<2&63],u+="="),s.push(u),s.join("")};for(var i=[],u=[],s="undefined"!=typeof Uint8Array?Uint8Array:Array,a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",f=0,c=a.length;f<c;++f)i[f]=a[f],u[a.charCodeAt(f)]=f;u["-".charCodeAt(0)]=62,u["_".charCodeAt(0)]=63},function(t,e,r){"use strict";(function(t){function n(){return i.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function o(t,e){if(n()<e)throw new RangeError("Invalid typed array length");return i.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(e)).__proto__=i.prototype:(null===t&&(t=new i(e)),t.length=e),t}function i(t,e,r){if(!(i.TYPED_ARRAY_SUPPORT||this instanceof i))return new i(t,e,r);if("number"==typeof t){if("string"==typeof e)throw new Error("If encoding is specified then the first argument must be a string");return a(this,t)}return u(this,t,e,r)}function u(t,e,r,n){if("number"==typeof e)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer?function(t,e,r,n){if(e.byteLength,r<0||e.byteLength<r)throw new RangeError("'offset' is out of bounds");if(e.byteLength<r+(n||0))throw new RangeError("'length' is out of bounds");return e=void 0===r&&void 0===n?new Uint8Array(e):void 0===n?new Uint8Array(e,r):new Uint8Array(e,r,n),i.TYPED_ARRAY_SUPPORT?(t=e).__proto__=i.prototype:t=f(t,e),t}(t,e,r,n):"string"==typeof e?function(t,e,r){if("string"==typeof r&&""!==r||(r="utf8"),!i.isEncoding(r))throw new TypeError('"encoding" must be a valid string encoding');var n=0|h(e,r),u=(t=o(t,n)).write(e,r);return u!==n&&(t=t.slice(0,u)),t}(t,e,r):function(t,e){if(i.isBuffer(e)){var r=0|c(e.length);return 0===(t=o(t,r)).length?t:(e.copy(t,0,0,r),t)}if(e){if("undefined"!=typeof ArrayBuffer&&e.buffer instanceof ArrayBuffer||"length"in e)return"number"!=typeof e.length||(n=e.length,n!=n)?o(t,0):f(t,e);if("Buffer"===e.type&&O(e.data))return f(t,e.data)}var n;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(t,e)}function s(t){if("number"!=typeof t)throw new TypeError('"size" argument must be a number');if(t<0)throw new RangeError('"size" argument must not be negative')}function a(t,e){if(s(e),t=o(t,e<0?0:0|c(e)),!i.TYPED_ARRAY_SUPPORT)for(var r=0;r<e;++r)t[r]=0;return t}function f(t,e){var r=e.length<0?0:0|c(e.length);t=o(t,r);for(var n=0;n<r;n+=1)t[n]=255&e[n];return t}function c(t){if(t>=n())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+n().toString(16)+" bytes");return 0|t}function h(t,e){if(i.isBuffer(t))return t.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;"string"!=typeof t&&(t=""+t);var r=t.length;if(0===r)return 0;for(var n=!1;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":case void 0:return x(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return U(t).length;default:if(n)return x(t).length;e=(""+e).toLowerCase(),n=!0}}function l(t,e,r){var n=t[e];t[e]=t[r],t[r]=n}function p(t,e,r,n,o){if(0===t.length)return-1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),r=+r,isNaN(r)&&(r=o?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){if(o)return-1;r=t.length-1}else if(r<0){if(!o)return-1;r=0}if("string"==typeof e&&(e=i.from(e,n)),i.isBuffer(e))return 0===e.length?-1:d(t,e,r,n,o);if("number"==typeof e)return e&=255,i.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?o?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):d(t,[e],r,n,o);throw new TypeError("val must be string, number or Buffer")}function d(t,e,r,n,o){function i(t,e){return 1===s?t[e]:t.readUInt16BE(e*s)}var u,s=1,a=t.length,f=e.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||e.length<2)return-1;s=2,a/=2,f/=2,r/=2}if(o){var c=-1;for(u=r;u<a;u++)if(i(t,u)===i(e,-1===c?0:u-c)){if(-1===c&&(c=u),u-c+1===f)return c*s}else-1!==c&&(u-=u-c),c=-1}else for(r+f>a&&(r=a-f),u=r;u>=0;u--){for(var h=!0,l=0;l<f;l++)if(i(t,u+l)!==i(e,l)){h=!1;break}if(h)return u}return-1}function g(t,e,r,n){r=Number(r)||0;var o=t.length-r;n?(n=Number(n))>o&&(n=o):n=o;var i=e.length;if(i%2!=0)throw new TypeError("Invalid hex string");n>i/2&&(n=i/2);for(var u=0;u<n;++u){var s=parseInt(e.substr(2*u,2),16);if(isNaN(s))return u;t[r+u]=s}return u}function y(t,e,r,n){return C(function(t){for(var e=[],r=0;r<t.length;++r)e.push(255&t.charCodeAt(r));return e}(e),t,r,n)}function m(t,e,r){r=Math.min(t.length,r);for(var n=[],o=e;o<r;){var i,u,s,a,f=t[o],c=null,h=f>239?4:f>223?3:f>191?2:1;if(o+h<=r)switch(h){case 1:f<128&&(c=f);break;case 2:128==(192&(i=t[o+1]))&&(a=(31&f)<<6|63&i)>127&&(c=a);break;case 3:i=t[o+1],u=t[o+2],128==(192&i)&&128==(192&u)&&(a=(15&f)<<12|(63&i)<<6|63&u)>2047&&(a<55296||a>57343)&&(c=a);break;case 4:i=t[o+1],u=t[o+2],s=t[o+3],128==(192&i)&&128==(192&u)&&128==(192&s)&&(a=(15&f)<<18|(63&i)<<12|(63&u)<<6|63&s)>65535&&a<1114112&&(c=a)}null===c?(c=65533,h=1):c>65535&&(c-=65536,n.push(c>>>10&1023|55296),c=56320|1023&c),n.push(c),o+=h}return function(t){var e=t.length;if(e<=Y)return String.fromCharCode.apply(String,t);for(var r="",n=0;n<e;)r+=String.fromCharCode.apply(String,t.slice(n,n+=Y));return r}(n)}function w(t,e,r){var n="";r=Math.min(t.length,r);for(var o=e;o<r;++o)n+=String.fromCharCode(127&t[o]);return n}function v(t,e,r){var n="";r=Math.min(t.length,r);for(var o=e;o<r;++o)n+=String.fromCharCode(t[o]);return n}function E(t,e,r){var n,o=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>o)&&(r=o);for(var i="",u=e;u<r;++u)i+=(n=t[u],n<16?"0"+n.toString(16):n.toString(16));return i}function b(t,e,r){for(var n=t.slice(e,r),o="",i=0;i<n.length;i+=2)o+=String.fromCharCode(n[i]+256*n[i+1]);return o}function A(t,e,r){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}function R(t,e,r,n,o,u){if(!i.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>o||e<u)throw new RangeError('"value" argument is out of bounds');if(r+n>t.length)throw new RangeError("Index out of range")}function T(t,e,r,n){e<0&&(e=65535+e+1);for(var o=0,i=Math.min(t.length-r,2);o<i;++o)t[r+o]=(e&255<<8*(n?o:1-o))>>>8*(n?o:1-o)}function _(t,e,r,n){e<0&&(e=4294967295+e+1);for(var o=0,i=Math.min(t.length-r,4);o<i;++o)t[r+o]=e>>>8*(n?o:3-o)&255}function B(t,e,r,n,o,i){if(r+n>t.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function P(t,e,r,n,o){return o||B(t,0,r,4),I.write(t,e,r,n,23,4),r+4}function S(t,e,r,n,o){return o||B(t,0,r,8),I.write(t,e,r,n,52,8),r+8}function x(t,e){e=e||1/0;for(var r,n=t.length,o=null,i=[],u=0;u<n;++u){if((r=t.charCodeAt(u))>55295&&r<57344){if(!o){if(r>56319){(e-=3)>-1&&i.push(239,191,189);continue}if(u+1===n){(e-=3)>-1&&i.push(239,191,189);continue}o=r;continue}if(r<56320){(e-=3)>-1&&i.push(239,191,189),o=r;continue}r=65536+(o-55296<<10|r-56320)}else o&&(e-=3)>-1&&i.push(239,191,189);if(o=null,r<128){if((e-=1)<0)break;i.push(r)}else if(r<2048){if((e-=2)<0)break;i.push(r>>6|192,63&r|128)}else if(r<65536){if((e-=3)<0)break;i.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;i.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return i}function U(t){return L.toByteArray(function(t){if((t=(e=t,e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")).replace(D,"")).length<2)return"";for(var e;t.length%4!=0;)t+="=";return t}(t))}function C(t,e,r,n){for(var o=0;o<n&&!(o+r>=e.length||o>=t.length);++o)e[o+r]=t[o];return o}var L=r(28),I=r(31),O=r(32);e.Buffer=i,e.SlowBuffer=function(t){return+t!=t&&(t=0),i.alloc(+t)},e.INSPECT_MAX_BYTES=50,i.TYPED_ARRAY_SUPPORT=void 0!==t.TYPED_ARRAY_SUPPORT?t.TYPED_ARRAY_SUPPORT:function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()&&"function"==typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(t){return!1}}(),e.kMaxLength=n(),i.poolSize=8192,i._augment=function(t){return t.__proto__=i.prototype,t},i.from=function(t,e,r){return u(null,t,e,r)},i.TYPED_ARRAY_SUPPORT&&(i.prototype.__proto__=Uint8Array.prototype,i.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&i[Symbol.species]===i&&Object.defineProperty(i,Symbol.species,{value:null,configurable:!0})),i.alloc=function(t,e,r){return n=null,u=e,a=r,s(i=t),i<=0?o(n,i):void 0!==u?"string"==typeof a?o(n,i).fill(u,a):o(n,i).fill(u):o(n,i);var n,i,u,a},i.allocUnsafe=function(t){return a(null,t)},i.allocUnsafeSlow=function(t){return a(null,t)},i.isBuffer=function(t){return!(null==t||!t._isBuffer)},i.compare=function(t,e){if(!i.isBuffer(t)||!i.isBuffer(e))throw new TypeError("Arguments must be Buffers");if(t===e)return 0;for(var r=t.length,n=e.length,o=0,u=Math.min(r,n);o<u;++o)if(t[o]!==e[o]){r=t[o],n=e[o];break}return r<n?-1:n<r?1:0},i.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},i.concat=function(t,e){if(!O(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return i.alloc(0);var r;if(void 0===e)for(e=0,r=0;r<t.length;++r)e+=t[r].length;var n=i.allocUnsafe(e),o=0;for(r=0;r<t.length;++r){var u=t[r];if(!i.isBuffer(u))throw new TypeError('"list" argument must be an Array of Buffers');u.copy(n,o),o+=u.length}return n},i.byteLength=h,i.prototype._isBuffer=!0,i.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var e=0;e<t;e+=2)l(this,e,e+1);return this},i.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var e=0;e<t;e+=4)l(this,e,e+3),l(this,e+1,e+2);return this},i.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var e=0;e<t;e+=8)l(this,e,e+7),l(this,e+1,e+6),l(this,e+2,e+5),l(this,e+3,e+4);return this},i.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?m(this,0,t):function(t,e,r){var n,o,i,u=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";if((r>>>=0)<=(e>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return E(this,e,r);case"utf8":case"utf-8":return m(this,e,r);case"ascii":return w(this,e,r);case"latin1":case"binary":return v(this,e,r);case"base64":return n=this,i=r,0===(o=e)&&i===n.length?L.fromByteArray(n):L.fromByteArray(n.slice(o,i));case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return b(this,e,r);default:if(u)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),u=!0}}.apply(this,arguments)},i.prototype.equals=function(t){if(!i.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===i.compare(this,t)},i.prototype.inspect=function(){var t="",r=e.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,r).match(/.{2}/g).join(" "),this.length>r&&(t+=" ... ")),"<Buffer "+t+">"},i.prototype.compare=function(t,e,r,n,o){if(!i.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(void 0===e&&(e=0),void 0===r&&(r=t?t.length:0),void 0===n&&(n=0),void 0===o&&(o=this.length),e<0||r>t.length||n<0||o>this.length)throw new RangeError("out of range index");if(n>=o&&e>=r)return 0;if(n>=o)return-1;if(e>=r)return 1;if(e>>>=0,r>>>=0,n>>>=0,o>>>=0,this===t)return 0;for(var u=o-n,s=r-e,a=Math.min(u,s),f=this.slice(n,o),c=t.slice(e,r),h=0;h<a;++h)if(f[h]!==c[h]){u=f[h],s=c[h];break}return u<s?-1:s<u?1:0},i.prototype.includes=function(t,e,r){return-1!==this.indexOf(t,e,r)},i.prototype.indexOf=function(t,e,r){return p(this,t,e,r,!0)},i.prototype.lastIndexOf=function(t,e,r){return p(this,t,e,r,!1)},i.prototype.write=function(t,e,r,n){if(void 0===e)n="utf8",r=this.length,e=0;else if(void 0===r&&"string"==typeof e)n=e,r=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e|=0,isFinite(r)?(r|=0,void 0===n&&(n="utf8")):(n=r,r=void 0)}var o,i,u,s,a,f,c,h,l,p=this.length-e;if((void 0===r||r>p)&&(r=p),t.length>0&&(r<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var d=!1;;)switch(n){case"hex":return g(this,t,e,r);case"utf8":case"utf-8":return h=e,l=r,C(x(t,(c=this).length-h),c,h,l);case"ascii":return y(this,t,e,r);case"latin1":case"binary":return y(this,t,e,r);case"base64":return s=this,a=e,f=r,C(U(t),s,a,f);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return i=e,u=r,C(function(t,e){for(var r,n,o,i=[],u=0;u<t.length&&!((e-=2)<0);++u)r=t.charCodeAt(u),n=r>>8,o=r%256,i.push(o),i.push(n);return i}(t,(o=this).length-i),o,i,u);default:if(d)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),d=!0}},i.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var Y=4096;i.prototype.slice=function(t,e){var r,n=this.length;if(t=~~t,e=void 0===e?n:~~e,t<0?(t+=n)<0&&(t=0):t>n&&(t=n),e<0?(e+=n)<0&&(e=0):e>n&&(e=n),e<t&&(e=t),i.TYPED_ARRAY_SUPPORT)r=this.subarray(t,e),r.__proto__=i.prototype;else{var o=e-t;r=new i(o,void 0);for(var u=0;u<o;++u)r[u]=this[u+t]}return r},i.prototype.readUIntLE=function(t,e,r){t|=0,e|=0,r||A(t,e,this.length);for(var n=this[t],o=1,i=0;++i<e&&(o*=256);)n+=this[t+i]*o;return n},i.prototype.readUIntBE=function(t,e,r){t|=0,e|=0,r||A(t,e,this.length);for(var n=this[t+--e],o=1;e>0&&(o*=256);)n+=this[t+--e]*o;return n},i.prototype.readUInt8=function(t,e){return e||A(t,1,this.length),this[t]},i.prototype.readUInt16LE=function(t,e){return e||A(t,2,this.length),this[t]|this[t+1]<<8},i.prototype.readUInt16BE=function(t,e){return e||A(t,2,this.length),this[t]<<8|this[t+1]},i.prototype.readUInt32LE=function(t,e){return e||A(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},i.prototype.readUInt32BE=function(t,e){return e||A(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},i.prototype.readIntLE=function(t,e,r){t|=0,e|=0,r||A(t,e,this.length);for(var n=this[t],o=1,i=0;++i<e&&(o*=256);)n+=this[t+i]*o;return n>=(o*=128)&&(n-=Math.pow(2,8*e)),n},i.prototype.readIntBE=function(t,e,r){t|=0,e|=0,r||A(t,e,this.length);for(var n=e,o=1,i=this[t+--n];n>0&&(o*=256);)i+=this[t+--n]*o;return i>=(o*=128)&&(i-=Math.pow(2,8*e)),i},i.prototype.readInt8=function(t,e){return e||A(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},i.prototype.readInt16LE=function(t,e){e||A(t,2,this.length);var r=this[t]|this[t+1]<<8;return 32768&r?4294901760|r:r},i.prototype.readInt16BE=function(t,e){e||A(t,2,this.length);var r=this[t+1]|this[t]<<8;return 32768&r?4294901760|r:r},i.prototype.readInt32LE=function(t,e){return e||A(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},i.prototype.readInt32BE=function(t,e){return e||A(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},i.prototype.readFloatLE=function(t,e){return e||A(t,4,this.length),I.read(this,t,!0,23,4)},i.prototype.readFloatBE=function(t,e){return e||A(t,4,this.length),I.read(this,t,!1,23,4)},i.prototype.readDoubleLE=function(t,e){return e||A(t,8,this.length),I.read(this,t,!0,52,8)},i.prototype.readDoubleBE=function(t,e){return e||A(t,8,this.length),I.read(this,t,!1,52,8)},i.prototype.writeUIntLE=function(t,e,r,n){t=+t,e|=0,r|=0,n||R(this,t,e,r,Math.pow(2,8*r)-1,0);var o=1,i=0;for(this[e]=255&t;++i<r&&(o*=256);)this[e+i]=t/o&255;return e+r},i.prototype.writeUIntBE=function(t,e,r,n){t=+t,e|=0,r|=0,n||R(this,t,e,r,Math.pow(2,8*r)-1,0);var o=r-1,i=1;for(this[e+o]=255&t;--o>=0&&(i*=256);)this[e+o]=t/i&255;return e+r},i.prototype.writeUInt8=function(t,e,r){return t=+t,e|=0,r||R(this,t,e,1,255,0),i.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[e]=255&t,e+1},i.prototype.writeUInt16LE=function(t,e,r){return t=+t,e|=0,r||R(this,t,e,2,65535,0),i.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):T(this,t,e,!0),e+2},i.prototype.writeUInt16BE=function(t,e,r){return t=+t,e|=0,r||R(this,t,e,2,65535,0),i.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):T(this,t,e,!1),e+2},i.prototype.writeUInt32LE=function(t,e,r){return t=+t,e|=0,r||R(this,t,e,4,4294967295,0),i.TYPED_ARRAY_SUPPORT?(this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t):_(this,t,e,!0),e+4},i.prototype.writeUInt32BE=function(t,e,r){return t=+t,e|=0,r||R(this,t,e,4,4294967295,0),i.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):_(this,t,e,!1),e+4},i.prototype.writeIntLE=function(t,e,r,n){if(t=+t,e|=0,!n){var o=Math.pow(2,8*r-1);R(this,t,e,r,o-1,-o)}var i=0,u=1,s=0;for(this[e]=255&t;++i<r&&(u*=256);)t<0&&0===s&&0!==this[e+i-1]&&(s=1),this[e+i]=(t/u>>0)-s&255;return e+r},i.prototype.writeIntBE=function(t,e,r,n){if(t=+t,e|=0,!n){var o=Math.pow(2,8*r-1);R(this,t,e,r,o-1,-o)}var i=r-1,u=1,s=0;for(this[e+i]=255&t;--i>=0&&(u*=256);)t<0&&0===s&&0!==this[e+i+1]&&(s=1),this[e+i]=(t/u>>0)-s&255;return e+r},i.prototype.writeInt8=function(t,e,r){return t=+t,e|=0,r||R(this,t,e,1,127,-128),i.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),t<0&&(t=255+t+1),this[e]=255&t,e+1},i.prototype.writeInt16LE=function(t,e,r){return t=+t,e|=0,r||R(this,t,e,2,32767,-32768),i.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):T(this,t,e,!0),e+2},i.prototype.writeInt16BE=function(t,e,r){return t=+t,e|=0,r||R(this,t,e,2,32767,-32768),i.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):T(this,t,e,!1),e+2},i.prototype.writeInt32LE=function(t,e,r){return t=+t,e|=0,r||R(this,t,e,4,2147483647,-2147483648),i.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24):_(this,t,e,!0),e+4},i.prototype.writeInt32BE=function(t,e,r){return t=+t,e|=0,r||R(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),i.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):_(this,t,e,!1),e+4},i.prototype.writeFloatLE=function(t,e,r){return P(this,t,e,!0,r)},i.prototype.writeFloatBE=function(t,e,r){return P(this,t,e,!1,r)},i.prototype.writeDoubleLE=function(t,e,r){return S(this,t,e,!0,r)},i.prototype.writeDoubleBE=function(t,e,r){return S(this,t,e,!1,r)},i.prototype.copy=function(t,e,r,n){if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);var o,u=n-r;if(this===t&&r<e&&e<n)for(o=u-1;o>=0;--o)t[o+e]=this[o+r];else if(u<1e3||!i.TYPED_ARRAY_SUPPORT)for(o=0;o<u;++o)t[o+e]=this[o+r];else Uint8Array.prototype.set.call(t,this.subarray(r,r+u),e);return u},i.prototype.fill=function(t,e,r,n){if("string"==typeof t){if("string"==typeof e?(n=e,e=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),1===t.length){var o=t.charCodeAt(0);o<256&&(t=o)}if(void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!i.isEncoding(n))throw new TypeError("Unknown encoding: "+n)}else"number"==typeof t&&(t&=255);if(e<0||this.length<e||this.length<r)throw new RangeError("Out of range index");if(r<=e)return this;var u;if(e>>>=0,r=void 0===r?this.length:r>>>0,t||(t=0),"number"==typeof t)for(u=e;u<r;++u)this[u]=t;else{var s=i.isBuffer(t)?t:x(new i(t,n).toString()),a=s.length;for(u=0;u<r-e;++u)this[u+e]=s[u%a]}return this};var D=/[^+\/0-9A-Za-z-_]/g}).call(e,r(34))},function(t,e){t.exports=function(t,e,r){function n(){var f=Date.now()-s;f<e&&f>=0?o=setTimeout(n,e-f):(o=null,r||(a=t.apply(u,i),u=i=null))}var o,i,u,s,a;null==e&&(e=100);var f=function(){u=this,i=arguments,s=Date.now();var f=r&&!o;return o||(o=setTimeout(n,e)),f&&(a=t.apply(u,i),u=i=null),a};return f.clear=function(){o&&(clearTimeout(o),o=null)},f}},function(t,e){e.read=function(t,e,r,n,o){var i,u,s=8*o-n-1,a=(1<<s)-1,f=a>>1,c=-7,h=r?o-1:0,l=r?-1:1,p=t[e+h];for(h+=l,i=p&(1<<-c)-1,p>>=-c,c+=s;c>0;i=256*i+t[e+h],h+=l,c-=8);for(u=i&(1<<-c)-1,i>>=-c,c+=n;c>0;u=256*u+t[e+h],h+=l,c-=8);if(0===i)i=1-f;else{if(i===a)return u?NaN:1/0*(p?-1:1);u+=Math.pow(2,n),i-=f}return(p?-1:1)*u*Math.pow(2,i-n)},e.write=function(t,e,r,n,o,i){var u,s,a,f=8*i-o-1,c=(1<<f)-1,h=c>>1,l=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,p=n?0:i-1,d=n?1:-1,g=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(s=isNaN(e)?1:0,u=c):(u=Math.floor(Math.log(e)/Math.LN2),e*(a=Math.pow(2,-u))<1&&(u--,a*=2),(e+=u+h>=1?l/a:l*Math.pow(2,1-h))*a>=2&&(u++,a/=2),u+h>=c?(s=0,u=c):u+h>=1?(s=(e*a-1)*Math.pow(2,o),u+=h):(s=e*Math.pow(2,h-1)*Math.pow(2,o),u=0));o>=8;t[r+p]=255&s,p+=d,s/=256,o-=8);for(u=u<<o|s,f+=o;f>0;t[r+p]=255&u,p+=d,u/=256,f-=8);t[r+p-d]|=128*g}},function(t,e){var r={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==r.call(t)}},function(t,e){function r(){throw new Error("setTimeout has not been defined")}function n(){throw new Error("clearTimeout has not been defined")}function o(t){if(f===setTimeout)return setTimeout(t,0);if((f===r||!f)&&setTimeout)return f=setTimeout,setTimeout(t,0);try{return f(t,0)}catch(e){try{return f.call(null,t,0)}catch(e){return f.call(this,t,0)}}}function i(){d&&l&&(d=!1,l.length?p=l.concat(p):g=-1,p.length&&u())}function u(){if(!d){var t=o(i);d=!0;for(var e=p.length;e;){for(l=p,p=[];++g<e;)l&&l[g].run();g=-1,e=p.length}l=null,d=!1,function(t){if(c===clearTimeout)return clearTimeout(t);if((c===n||!c)&&clearTimeout)return c=clearTimeout,clearTimeout(t);try{c(t)}catch(e){try{return c.call(null,t)}catch(e){return c.call(this,t)}}}(t)}}function s(t,e){this.fun=t,this.array=e}function a(){}var f,c,h=t.exports={};!function(){try{f="function"==typeof setTimeout?setTimeout:r}catch(t){f=r}try{c="function"==typeof clearTimeout?clearTimeout:n}catch(t){c=n}}();var l,p=[],d=!1,g=-1;h.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];p.push(new s(t,e)),1!==p.length||d||o(u)},s.prototype.run=function(){this.fun.apply(null,this.array)},h.title="browser",h.browser=!0,h.env={},h.argv=[],h.version="",h.versions={},h.on=a,h.addListener=a,h.once=a,h.off=a,h.removeListener=a,h.removeAllListeners=a,h.emit=a,h.prependListener=a,h.prependOnceListener=a,h.listeners=function(t){return[]},h.binding=function(t){throw new Error("process.binding is not supported")},h.cwd=function(){return"/"},h.chdir=function(t){throw new Error("process.chdir is not supported")},h.umask=function(){return 0}},function(t,e){var r;r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(r=window)}t.exports=r}])
}

function setupTwingle() {
	$('.twingle-form').each(function(){
		$el = $(this);
		if($el.data('loaded')==true) return;
		$el.data('loaded', true);
		var u= $el.data('u');
		var id = '_' + Math.random().toString(36).substr(2, 9);
		var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
		$el.html('<div id="twingle-public-embed-' + id + '"></div>');
		g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'/'+id; s.parentNode.insertBefore(g,s);
	});		
}

function setupBackToTop(){
	$link = $('#back-to-top');
	$(window).off('scroll').scroll(function() {
		var showFromHere = $(document).height()/2.5;
	    if ( $(window).scrollTop() > showFromHere && showFromHere > 1000 || $(window).scrollTop() > 2500 ) {
	        $link.fadeIn('slow');
	    } else {
	        $link.fadeOut('slow');
	    }
	});
	$link.click(function() {
	    $('html, body').animate({
	        scrollTop: 0
	    }, 600);
	    return false;
	});
}

function setupCarouselFix(){
	if ( $(document).width() > 600 ) return;
	
	var galleries = Y.Squarespace.GalleryManager.getGalleries();

	for( i = 0; i<galleries.length; i++){
		var carousel = galleries[i]["gallery-design"];
		if (carousel["name"] !== "GalleryDesignCarousel") continue;

		//overwrite internat sq function to match one row display on mobile
		carousel._getSlidesPerRow = function() {
	        var t = this.get("slidesPerRowOriginal");
	        var res = $(document).width() < 480 && t > 1 ? 2 : $(document).width() < 724 && t > 2 ? 3 : t
	        if( $(document).width() < 600 ) res = 1; //change
	        return res;
	    }
	    carousel._updateCarousel();
	}
}

function setupCustomNewsletterForms(){

	$('.lightbox-handle').click( function(){
		replaceLightboxContent();
	});
}

function replaceLightboxContent(){
	var innerWrappers = $(".sqs-modal-lightbox .sqs-modal-lightbox-content .form-submission-text:contains('Import_CleverReach')").parents('.form-inner-wrapper');
	if(innerWrappers.length == 0) return;

	innerWrappers.each(function(){
		innerWrapper = $(this);
		formHTML = innerWrapper.find('.form-submission-html').data('submission-html');
		innerWrapper.html( formHTML );
	});
}

function setupNewsletterButtons(){
	$('.sqs-block-button-element[href^="#newsletter-signup"]').click( function(evnt){
		evnt.preventDefault();
		var targets = $('.Footer-blocks--bottom .lightbox-handle');
		var target;
		switch( $(this).attr('href') ){
			case '#newsletter-signup-children':
				target = targets.eq( 0 );
			break;
			case '#newsletter-signup-jugendhilft':
				target = targets.eq( 1 );
			break;
			case '#newsletter-signup-entdecker':
				target = targets.eq( 2 );
			break;
		}
		target.click();
	});
}

function analyticsPageView(){
	gtag('config', 'UA-70813689-1', { 'anonymize_ip': true, 'page_location': window.location.href, 'page_path': window.location.pathname, 'page_title': document.title });
}