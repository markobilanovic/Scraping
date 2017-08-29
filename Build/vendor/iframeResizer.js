!function(a){"use strict";function b(b,c,d){"addEventListener"in a?b.addEventListener(c,d,!1):"attachEvent"in a&&b.attachEvent("on"+c,d)}function c(){var b,c=["moz","webkit","o","ms"];for(b=0;b<c.length&&!M;b+=1)M=a[c[b]+"RequestAnimationFrame"];M||g("setup","RequestAnimationFrame not supported")}function d(b){var c="Host page: "+b;return a.top!==a.self&&(c=a.parentIFrame&&a.parentIFrame.getId?a.parentIFrame.getId()+": "+b:"Nested host page: "+b),c}function e(a){return J+"["+d(a)+"]"}function f(a){return O[a]?O[a].log:F}function g(a,b){j("log",a,b,f(a))}function h(a,b){j("info",a,b,f(a))}function i(a,b){j("warn",a,b,!0)}function j(b,c,d,f){!0===f&&"object"==typeof a.console&&console[b](e(c),d)}function k(b){function c(){function a(){r(N),o(P)}e("Height"),e("Width"),s(a,N,"init")}function d(){var a=M.substr(K).split(":");return{iframe:O[a[0]].iframe,id:a[0],height:a[1],width:a[2],type:a[3]}}function e(a){var b=Number(O[P]["max"+a]),c=Number(O[P]["min"+a]),d=a.toLowerCase(),e=Number(N[d]);g(P,"Checking "+d+" is in range "+c+"-"+b),c>e&&(e=c,g(P,"Set "+d+" to min value")),e>b&&(e=b,g(P,"Set "+d+" to max value")),N[d]=""+e}function f(){function a(){function a(){var a=0,b=!1;for(g(P,"Checking connection is from allowed list of origins: "+d);a<d.length;a++)if(d[a]===c){b=!0;break}return b}function b(){var a=O[P].remoteHost;return g(P,"Checking connection is from: "+a),c===a}return d.constructor===Array?a():b()}var c=b.origin,d=O[P].checkOrigin;if(d&&""+c!="null"&&!a())throw new Error("Unexpected message received from: "+c+" for "+N.iframe.id+". Message was: "+b.data+". This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.");return!0}function j(){return J===(""+M).substr(0,K)&&M.substr(K).split(":")[0]in O}function k(){var a=N.type in{"true":1,"false":1,undefined:1};return a&&g(P,"Ignoring init message from meta parent page"),a}function v(a){return M.substr(M.indexOf(":")+I+a)}function w(a){g(P,"MessageCallback passed: {iframe: "+N.iframe.id+", message: "+a+"}"),D("messageCallback",{iframe:N.iframe,message:JSON.parse(a)}),g(P,"--")}function x(){var b=document.body.getBoundingClientRect(),c=N.iframe.getBoundingClientRect(),d=JSON.stringify({clientHeight:Math.max(document.documentElement.clientHeight,a.innerHeight||0),clientWidth:Math.max(document.documentElement.clientWidth,a.innerWidth||0),offsetTop:parseInt(c.top-b.top,10),offsetLeft:parseInt(c.left-b.left,10),scrollTop:a.pageYOffset,scrollLeft:a.pageXOffset});t("Send Page Info","pageInfo:"+d,O[P].iframe,P)}function y(){var a=!0;return null===N.iframe&&(i(P,"IFrame ("+N.id+") not found"),a=!1),a}function z(a){var b=a.getBoundingClientRect();return n(P),{x:Math.floor(Number(b.left)+Number(L.x)),y:Math.floor(Number(b.top)+Number(L.y))}}function A(b){function c(){L=h,B(),g(P,"--")}function d(){return{x:Number(N.width)+f.x,y:Number(N.height)+f.y}}function e(){a.parentIFrame?a.parentIFrame["scrollTo"+(b?"Offset":"")](h.x,h.y):i(P,"Unable to scroll to requested position, window.parentIFrame not found")}var f=b?z(N.iframe):{x:0,y:0},h=d();g(P,"Reposition requested from iFrame (offset x:"+f.x+" y:"+f.y+")"),a.top!==a.self?e():c()}function B(){!1!==D("scrollCallback",L)?o(P):p()}function C(b){function c(){var a=z(h);g(P,"Moving to in page link (#"+e+") at x: "+a.x+" y: "+a.y),L={x:a.x,y:a.y},B(),g(P,"--")}function d(){a.parentIFrame?a.parentIFrame.moveToAnchor(e):g(P,"In page link #"+e+" not found and window.parentIFrame not found")}var e=b.split("#")[1]||"",f=decodeURIComponent(e),h=document.getElementById(f)||document.getElementsByName(f)[0];h?c():a.top!==a.self?d():g(P,"In page link #"+e+" not found")}function D(a,b){return l(P,a,b)}function E(){switch(O[P].firstRun&&H(),N.type){case"close":m(N.iframe);break;case"message":w(v(6));break;case"scrollTo":A(!1);break;case"scrollToOffset":A(!0);break;case"pageInfo":x();break;case"inPageLink":C(v(9));break;case"reset":q(N);break;case"init":c(),D("initCallback",N.iframe),D("resizedCallback",N);break;default:c(),D("resizedCallback",N)}}function F(a){var b=!0;return O[a]||(b=!1,i(N.type+" No settings for "+a+". Message was: "+M)),b}function G(){for(var a in O)t("iFrame requested init",u(a),document.getElementById(a),a)}function H(){O[P].firstRun=!1}var M=b.data,N={},P=null;"[iFrameResizerChild]Ready"===M?G():j()?(N=d(),P=Q=N.id,!k()&&F(P)&&(g(P,"Received: "+M),y()&&f()&&E())):h(P,"Ignored: "+M)}function l(a,b,c){var d=null,e=null;if(O[a]){if(d=O[a][b],"function"!=typeof d)throw new TypeError(b+" on iFrame["+a+"] is not a function");e=d(c)}return e}function m(a){var b=a.id;g(b,"Removing iFrame: "+b),a.parentNode.removeChild(a),l(b,"closedCallback",b),g(b,"--"),delete O[b]}function n(b){null===L&&(L={x:void 0!==a.pageXOffset?a.pageXOffset:document.documentElement.scrollLeft,y:void 0!==a.pageYOffset?a.pageYOffset:document.documentElement.scrollTop},g(b,"Get page position: "+L.x+","+L.y))}function o(b){null!==L&&(a.scrollTo(L.x,L.y),g(b,"Set page position: "+L.x+","+L.y),p())}function p(){L=null}function q(a){function b(){r(a),t("reset","reset",a.iframe,a.id)}g(a.id,"Size reset requested by "+("init"===a.type?"host page":"iFrame")),n(a.id),s(b,a,"reset")}function r(a){function b(b){a.iframe.style[b]=a[b]+"px",g(a.id,"IFrame ("+e+") "+b+" set to "+a[b]+"px")}function c(b){G||"0"!==a[b]||(G=!0,g(e,"Hidden iFrame detected, creating visibility listener"),x())}function d(a){b(a),c(a)}var e=a.iframe.id;O[e]&&(O[e].sizeHeight&&d("height"),O[e].sizeWidth&&d("width"))}function s(a,b,c){c!==b.type&&M?(g(b.id,"Requesting animation frame"),M(a)):a()}function t(a,b,c,d){function e(){g(d,"["+a+"] Sending msg to iframe["+d+"] ("+b+") targetOrigin: "+i),c.contentWindow.postMessage(J+b,i)}function f(){h(d,"["+a+"] IFrame("+d+") not found"),O[d]&&delete O[d]}d=d||c.id;var i=O[d].targetOrigin;c&&"contentWindow"in c?e():f()}function u(a){return a+":"+O[a].bodyMarginV1+":"+O[a].sizeWidth+":"+O[a].log+":"+O[a].interval+":"+O[a].enablePublicMethods+":"+O[a].autoResize+":"+O[a].bodyMargin+":"+O[a].heightCalculationMethod+":"+O[a].bodyBackground+":"+O[a].bodyPadding+":"+O[a].tolerance+":"+O[a].inPageLinks+":"+O[a].resizeFrom+":"+O[a].widthCalculationMethod}function v(a,c){function d(){function b(b){1/0!==O[w][b]&&0!==O[w][b]&&(a.style[b]=O[w][b]+"px",g(w,"Set "+b+" = "+O[w][b]+"px"))}function c(a){if(O[w]["min"+a]>O[w]["max"+a])throw new Error("Value for min"+a+" can not be greater than max"+a)}c("Height"),c("Width"),b("maxHeight"),b("minHeight"),b("maxWidth"),b("minWidth")}function e(){var a=c&&c.id||R.id+E++;return null!==document.getElementById(a)&&(a+=E++),a}function f(b){return Q=b,""===b&&(a.id=b=e(),F=(c||{}).log,Q=b,g(b,"Added missing iframe ID: "+b+" ("+a.src+")")),b}function h(){g(w,"IFrame scrolling "+(O[w].scrolling?"enabled":"disabled")+" for "+w),a.style.overflow=!1===O[w].scrolling?"hidden":"auto",a.scrolling=!1===O[w].scrolling?"no":"yes"}function j(){("number"==typeof O[w].bodyMargin||"0"===O[w].bodyMargin)&&(O[w].bodyMarginV1=O[w].bodyMargin,O[w].bodyMargin=""+O[w].bodyMargin+"px")}function k(){var b=O[w].firstRun,c=O[w].heightCalculationMethod in N;!b&&c&&q({iframe:a,height:0,width:0,type:"init"})}function l(){Function.prototype.bind&&(O[w].iframe.iFrameResizer={close:m.bind(null,O[w].iframe),resize:t.bind(null,"Window resize","resize",O[w].iframe),moveToAnchor:function(a){t("Move to anchor","inPageLink:"+a,O[w].iframe,w)},sendMessage:function(a){a=JSON.stringify(a),t("Send Message","message:"+a,O[w].iframe,w)}})}function n(c){function d(){t("iFrame.onload",c,a),k()}b(a,"load",d),t("init",c,a)}function o(a){if("object"!=typeof a)throw new TypeError("Options is not an object")}function p(a){for(var b in R)R.hasOwnProperty(b)&&(O[w][b]=a.hasOwnProperty(b)?a[b]:R[b])}function r(a){return""===a||"file://"===a?"*":a}function s(b){b=b||{},O[w]={firstRun:!0,iframe:a,remoteHost:a.src.split("/").slice(0,3).join("/")},o(b),p(b),O[w].targetOrigin=!0===O[w].checkOrigin?r(O[w].remoteHost):"*"}function v(){return w in O&&"iFrameResizer"in a}var w=f(a.id);v()?i(w,"Ignored iFrame, already setup."):(s(c),h(),d(),j(),n(u(w)),l())}function w(a,b){null===P&&(P=setTimeout(function(){P=null,a()},b))}function x(){function b(){function a(a){function b(b){return"0px"===O[a].iframe.style[b]}function c(a){return null!==a.offsetParent}c(O[a].iframe)&&(b("height")||b("width"))&&t("Visibility change","resize",O[a].iframe,a)}for(var b in O)a(b)}function c(a){g("window","Mutation observed: "+a[0].target+" "+a[0].type),w(b,16)}function d(){var a=document.querySelector("body"),b={attributes:!0,attributeOldValue:!1,characterData:!0,characterDataOldValue:!1,childList:!0,subtree:!0},d=new e(c);d.observe(a,b)}var e=a.MutationObserver||a.WebKitMutationObserver;e&&d()}function y(a){function b(){A("Window "+a,"resize")}g("window","Trigger event: "+a),w(b,16)}function z(){function a(){A("Tab Visable","resize")}"hidden"!==document.visibilityState&&(g("document","Trigger event: Visiblity change"),w(a,16))}function A(a,b){function c(a){return"parent"===O[a].resizeFrom&&O[a].autoResize&&!O[a].firstRun}for(var d in O)c(d)&&t(a,b,document.getElementById(d),d)}function B(){b(a,"message",k),b(a,"resize",function(){y("resize")}),b(document,"visibilitychange",z),b(document,"-webkit-visibilitychange",z),b(a,"focusin",function(){y("focus")}),b(a,"focus",function(){y("focus")})}function C(){function a(a,c){if(c){if(!c.tagName)throw new TypeError("Object is not a valid DOM element");if("IFRAME"!==c.tagName.toUpperCase())throw new TypeError("Expected <IFRAME> tag, found <"+c.tagName+">");v(c,a),b.push(c)}}var b;return c(),B(),function(c,d){switch(b=[],typeof d){case"undefined":case"string":Array.prototype.forEach.call(document.querySelectorAll(d||"iframe"),a.bind(void 0,c));break;case"object":a(c,d);break;default:throw new TypeError("Unexpected data type ("+typeof d+")")}return b}}function D(a){a.fn.iFrameResize=function(a){return this.filter("iframe").each(function(b,c){v(c,a)}).end()}}var E=0,F=!1,G=!1,H="message",I=H.length,J="[iFrameSizer]",K=J.length,L=null,M=a.requestAnimationFrame,N={max:1,scroll:1,bodyScroll:1,documentElementScroll:1},O={},P=null,Q="Host Page",R={autoResize:!0,bodyBackground:null,bodyMargin:null,bodyMarginV1:8,bodyPadding:null,checkOrigin:!0,inPageLinks:!1,enablePublicMethods:!0,heightCalculationMethod:"bodyOffset",id:"iFrameResizer",interval:32,log:!1,maxHeight:1/0,maxWidth:1/0,minHeight:0,minWidth:0,resizeFrom:"parent",scrolling:!1,sizeHeight:!0,sizeWidth:!1,tolerance:0,widthCalculationMethod:"scroll",closedCallback:function(){},initCallback:function(){},messageCallback:function(){i("MessageCallback function not defined")},resizedCallback:function(){},scrollCallback:function(){return!0}};a.jQuery&&D(jQuery),"function"==typeof define&&define.amd?define([],C):"object"==typeof module&&"object"==typeof module.exports?module.exports=C():a.iFrameResize=a.iFrameResize||C()}(window||{});