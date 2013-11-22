/*
    Cornerstone Framework v0.9.2

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
//(function(e){"use strict";function r(e){var n=["Moz","Webkit","O","ms"],r=e.charAt(0).toUpperCase()+e.substr(1);if(e in t.style)return e;for(var i=0;i<n.length;++i){var s=n[i]+r;if(s in t.style)return s}}function i(){return t.style[n.transform]="",t.style[n.transform]="rotateY(90deg)",t.style[n.transform]!==""}function a(e){return typeof e=="string"&&this.parse(e),this}function f(e,t,n){t===!0?e.queue(n):t?e.queue(t,n):n()}function l(t){var n=[];return e.each(t,function(t){t=e.camelCase(t),t=e.transit.propertyMap[t]||t,t=p(t),e.inArray(t,n)===-1&&n.push(t)}),n}function c(t,n,r,i){var s=l(t);e.cssEase[r]&&(r=e.cssEase[r]);var o=""+v(n)+" "+r;parseInt(i,10)>0&&(o+=" "+v(i));var u=[];return e.each(s,function(e,t){u.push(t+" "+o)}),u.join(", ")}function h(t,r){r||(e.cssNumber[t]=!0),e.transit.propertyMap[t]=n.transform,e.cssHooks[t]={get:function(n){var r=e(n).css("transform")||new a;return r.get(t)},set:function(n,r){var i=e(n).css("transform")||new a;i==="none"&&(i=new a),i.setFromString(t,r),e(n).css({transform:i})}}}function p(e){return e.replace(/([A-Z])/g,function(e){return"-"+e.toLowerCase()})}function d(e,t){return typeof e=="string"&&!e.match(/^[\-0-9\.]+$/)?e:""+e+t}function v(t){var n=t;return e.fx.speeds[n]&&(n=e.fx.speeds[n]),d(n,"ms")}e.transit={version:"0.1.3",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:!0,useTransitionEnd:!1};var t=document.createElement("div"),n={},s=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;n.transition=r("transition"),n.transitionDelay=r("transitionDelay"),n.transform=r("transform"),n.transformOrigin=r("transformOrigin"),n.transform3d=i(),e.extend(e.support,n),e.support.transition=function(){var e=function(){var e=document.createElement("bootstrap"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},n;for(n in t)if(e.style[n]!==undefined)return t[n]}();return e&&{end:e}}();var o={MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"},u=n.transitionEnd=o[n.transition]||null;t=null,e.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)"},e.cssHooks.transform={get:function(t){return e(t).data("transform")},set:function(t,r){var i=r;i instanceof a||(i=new a(i)),n.transform==="WebkitTransform"&&!s?t.style[n.transform]=i.toString(!0):t.style[n.transform]=i.toString(),e(t).data("transform",i)}},e.cssHooks.transformOrigin={get:function(e){return e.style[n.transformOrigin]},set:function(e,t){e.style[n.transformOrigin]=t}},e.cssHooks.transition={get:function(e){return e.style[n.transition]},set:function(e,t){e.style[n.transition]=t}},h("scale"),h("translate"),h("rotate"),h("rotateX"),h("rotateY"),h("rotate3d"),h("perspective"),h("skewX"),h("skewY"),h("x",!0),h("y",!0),a.prototype={setFromString:function(e,t){var n=typeof t=="string"?t.split(","):t.constructor===Array?t:[t];n.unshift(e),a.prototype.set.apply(this,n)},set:function(e){var t=Array.prototype.slice.apply(arguments,[1]);this.setter[e]?this.setter[e].apply(this,t):this[e]=t.join(",")},get:function(e){return this.getter[e]?this.getter[e].apply(this):this[e]||0},setter:{rotate:function(e){this.rotate=d(e,"deg")},rotateX:function(e){this.rotateX=d(e,"deg")},rotateY:function(e){this.rotateY=d(e,"deg")},scale:function(e,t){t===undefined&&(t=e),this.scale=e+","+t},skewX:function(e){this.skewX=d(e,"deg")},skewY:function(e){this.skewY=d(e,"deg")},perspective:function(e){this.perspective=d(e,"px")},x:function(e){this.set("translate",e,null)},y:function(e){this.set("translate",null,e)},translate:function(e,t){this._translateX===undefined&&(this._translateX=0),this._translateY===undefined&&(this._translateY=0),e!==null&&(this._translateX=d(e,"px")),t!==null&&(this._translateY=d(t,"px")),this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var e=(this.scale||"1,1").split(",");return e[0]&&(e[0]=parseFloat(e[0])),e[1]&&(e[1]=parseFloat(e[1])),e[0]===e[1]?e[0]:e},rotate3d:function(){var e=(this.rotate3d||"0,0,0,0deg").split(",");for(var t=0;t<=3;++t)e[t]&&(e[t]=parseFloat(e[t]));return e[3]&&(e[3]=d(e[3],"deg")),e}},parse:function(e){var t=this;e.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(e,n,r){t.setFromString(n,r)})},toString:function(e){var t=[];for(var r in this)if(this.hasOwnProperty(r)){if(!n.transform3d&&(r==="rotateX"||r==="rotateY"||r==="perspective"||r==="transformOrigin"))continue;r[0]!=="_"&&(e&&r==="scale"?t.push(r+"3d("+this[r]+",1)"):e&&r==="translate"?t.push(r+"3d("+this[r]+",0)"):t.push(r+"("+this[r]+")"))}return t.join(" ")}},e.fn.transit=function(t,r,i,s){var o=this,a=0,l=!0;typeof r=="function"&&(s=r,r=undefined),typeof i=="function"&&(s=i,i=undefined),typeof t.easing!="undefined"&&(i=t.easing,delete t.easing),typeof t.duration!="undefined"&&(r=t.duration,delete t.duration),typeof t.complete!="undefined"&&(s=t.complete,delete t.complete),typeof t.queue!="undefined"&&(l=t.queue,delete t.queue),typeof t.delay!="undefined"&&(a=t.delay,delete t.delay),typeof r=="undefined"&&(r=e.fx.speeds._default),typeof i=="undefined"&&(i=e.cssEase._default),r=v(r);var h=c(t,r,i,a),p=e.transit.enabled&&n.transition,d=p?parseInt(r,10)+parseInt(a,10):0;if(d===0){var m=function(e){o.css(t),s&&s.apply(o),e&&e()};return f(o,l,m),o}var g={},y=function(r){var i=!1,a=function(){i&&o.unbind(u,a),d>0&&o.each(function(){this.style[n.transition]=g[this]||null}),typeof s=="function"&&s.apply(o),typeof r=="function"&&r()};d>0&&u&&e.transit.useTransitionEnd?(i=!0,o.bind(u,a)):window.setTimeout(a,d),o.each(function(){d>0&&(this.style[n.transition]=h),e(this).css(t)})},b=function(e){var t=0;n.transition==="MozTransition"&&t<25&&(t=25),window.setTimeout(function(){y(e)},t)};return f(o,l,b),this},e.transit.getTransitionValue=c})(jQuery),function(e,t){var n=t.Transition={},r=function(e){this.options=e},i=n.effect=function(e){this.options=e};n.launcher=function(e){return(new r(e)).init()},r.prototype={defaults:{transitionType:"none",fallbackType:"fade",autoDisplay:!0,nested:!1,animationFade:!0,inTarget:{el:undefined,from:undefined,to:undefined,duration:undefined,timing:"ease",done:function(){}},outTarget:{el:undefined,from:undefined,to:undefined,duration:undefined,timing:"ease",done:function(){}},isReverse:!1,done:function(){}},init:function(){return this.options.inTarget=e.extend({},this.defaults.inTarget,this.options.inTarget),this.options.outTarget=e.extend({},this.defaults.outTarget,this.options.outTarget),this.options=e.extend({},this.defaults,this.options),this.run(),this},run:function(){var t=this,n=new i(this.options);this._before();try{e.support.transition||(e.fn.transition=e.fn.animate,this.options.transitionType=this.options.fallbackType,this.options.inTarget.timing="linear",this.options.outTarget.timing="linear"),n.init(t),n[t.options.transitionType](t.options)}catch(r){n.none(this.options)}},_before:function(){var t=e("body");t.css({overflowX:"hidden"}),e(this.options.inTarget.el).show(),e(this.options.outTarget.el).show(),this.options.isReverse&&t.attr("data-transition")!==undefined&&(this.options.transitionType=t.attr("data-transition"))},_done:function(){e("body").css({overflow:"auto"}).attr("data-transition",this.options.transitionType);var t=e(this.options.outTarget.el).removeAttr("style"),n=e(this.options.inTarget.el).removeAttr("style");this.options.autoDisplay&&(t.hide(),n.show()),this.options.inTarget.done(),this.options.done()}},i.prototype={inTargetCss:null,outTargetCss:null,init:function(e){this.launcher=e},extend:function(t,n){return n.inTarget=e.extend({},t.inTarget,n.inTarget),n.outTarget=e.extend({},t.outTarget,n.outTarget),n},none:function(t){var n=this;e(t.outTarget.el).hide(function(){t.outTarget.done(),e(t.inTarget.el).show(function(){n.launcher._done()})})},flip:function(n){var r=this,i={inTarget:{from:"90deg",to:0,duration:350},outTarget:{from:0,to:"-90deg",duration:150}};n.isReverse&&(i={inTarget:{from:"-90deg",to:0,duration:350},outTarget:{from:0,to:"90deg",duration:150}}),n=this.extend(i,n),e(n.outTarget.el).height(),this.outTargetCss={position:"absolute",width:e(n.outTarget.el).width(),perspective:e(n.outTarget.el).width()*2,rotate3d:"0, 1, 0, "+n.outTarget.from,height:e(t).height()>e(n.outTarget.el).height()?e(n.outTarget.el).height():e(t).height(),overflow:"hidden",opacity:1},this.inTargetCss={position:"absolute",width:e(n.inTarget.el).width(),perspective:e(n.inTarget.el).width()*2,rotate3d:"0, 1, 0, "+n.inTarget.from,height:e(t).height()>e(n.inTarget.el).height()?e(n.inTarget.el).height():e(t).height(),overflow:"hidden",opacity:n.animationFade?0:1},e(n.inTarget.el).css(this.inTargetCss),e(n.outTarget.el).css(this.outTargetCss).transit({rotate3d:"0, 1, 0, "+n.outTarget.to,opacity:n.animationFade?0:1},n.outTarget.duration,n.outTarget.timing,function(){n.outTarget.done(),e(n.inTarget.el).transit({rotate3d:"0, 1, 0, "+n.inTarget.to,opacity:1},n.inTarget.duration,n.inTarget.timing,function(){r.launcher._done()})})},spin:function(n){var r=this,i={inTarget:{from:"90deg",to:0,duration:550},outTarget:{from:0,to:"-90deg",duration:550}};n.isReverse&&(i={inTarget:{from:"-90deg",to:0,duration:550},outTarget:{from:0,to:"90deg",duration:550}}),n=this.extend(i,n),this.outTargetCss={position:"absolute",width:e(n.outTarget.el).width(),perspective:e(n.outTarget.el).width(),rotate3d:"0, 0, 0, "+n.outTarget.from,height:e(t).height()>e(n.inTarget.el).height()?e(n.inTarget.el).height():e(t).height(),overflow:"hidden",scale:1,opacity:1},this.inTargetCss={position:"absolute",width:e(n.inTarget.el).width(),perspective:e(n.inTarget.el).width(),rotate3d:"0, 0, 0, "+n.inTarget.from,height:e(t).height()>e(n.inTarget.el).height()?e(n.inTarget.el).height():e(t).height(),overflow:"hidden",scale:0,opacity:n.animationFade?0:1},e(n.inTarget.el).css(this.inTargetCss),e(n.outTarget.el).css(this.outTargetCss).transit({rotate3d:"0, 0, 0, "+n.outTarget.to,scale:0,opacity:n.animationFade?0:1},n.outTarget.duration,n.outTarget.timing,function(){e(this).css({scale:1}),n.outTarget.done(),e(n.inTarget.el).transit({rotate3d:"0, 0, 0, "+n.inTarget.to,scale:1,opacity:1},n.inTarget.duration,n.inTarget.timing,function(){r.launcher._done()})})},slide:function(n){var r=this,i={inTarget:{from:"150%",to:"0",duration:550},outTarget:{from:"0",to:"-150%",duration:550}};n.isReverse&&(i={inTarget:{from:"-150%",to:"0",duration:550},outTarget:{from:"0",to:"150%",duration:550}}),t.scrollTo(0,0),n=this.extend(i,n),this.outTargetCss={position:"absolute",width:e(t).width()>e(n.outTarget.el).width()?e(n.outTarget.el).width():e(t).width(),height:e(t).height()>e(n.outTarget.el).height()?e(n.outTarget.el).height():e(t).height(),transform:"translate("+n.outTarget.from+",0)",opacity:1},this.inTargetCss={position:"absolute",width:e(t).width()>e(n.inTarget.el).width()?e(n.inTarget.el).width():e(t).width(),height:e(t).height()>e(n.inTarget.el).height()?e(n.inTarget.el).height():e(t).height(),transform:"translate("+n.inTarget.from+",0)",opacity:1},n.inTarget.top=e(n.inTarget.el).css("top"),e(n.outTarget.el).css(this.outTargetCss).transit({x:n.outTarget.to,opacity:n.animationFade?0:1},n.outTarget.duration,n.outTarget.timing,function(){n.outTarget.done()}),e(n.inTarget.el).css(this.inTargetCss).transit({x:n.inTarget.to},n.inTarget.duration,n.inTarget.timing,function(){e(n.outTarget.el).css({transform:"translate(0,0)"}),r.launcher._done()})},slideup:function(n){var r=this,i={inTarget:{from:"100%",to:"0",duration:550},outTarget:{from:"0",to:"-100%",duration:550}};n.isReverse&&(i={inTarget:{from:"-100%",to:"0",duration:550},outTarget:{from:"0",to:"100%",duration:550}}),n=this.extend(i,n),this.outTargetCss={position:"absolute",width:e(n.outTarget.el).width(),transform:"translate(0, "+n.outTarget.from+")",height:e(t).height()>e(n.outTarget.el).height()?e(n.outTarget.el).height():e(t).height(),opacity:1},this.inTargetCss={position:"absolute",width:e(n.inTarget.el).width(),transform:"translate(0, "+n.inTarget.from+")",height:e(t).height()>e(n.outTarget.el).height()?e(n.outTarget.el).height():e(t).height(),opacity:1},e(n.outTarget.el).css(this.outTargetCss).transit({y:n.outTarget.to,opacity:n.animationFade?0:1},n.outTarget.duration,n.outTarget.timing,function(){e(this).css({transform:"translate(0,0)"}),n.outTarget.done()}),e(n.inTarget.el).css(this.inTargetCss).transit({y:n.inTarget.to},n.inTarget.duration,n.inTarget.timing,function(){r.launcher._done()})},slidedown:function(t){var n=this,r={inTarget:{from:"-100%",to:"0",duration:550},outTarget:{from:"0",to:"100%",duration:550}};t.isReverse&&(r={inTarget:{from:"100%",to:"0",duration:550},outTarget:{from:"0",to:"-100%",duration:550}}),t=this.extend(r,t),this.outTargetCss={position:"absolute",width:e(t.outTarget.el).width(),transform:"translate(0, "+t.outTarget.from+")",opacity:1},this.inTargetCss={position:"absolute",width:e(t.inTarget.el).width(),transform:"translate(0, "+t.inTarget.from+")",opacity:1},e(t.outTarget.el).css(this.outTargetCss).transit({y:t.outTarget.to,opacity:t.animationFade?0:1},t.outTarget.duration,t.outTarget.timing,function(){e(this).css({transform:"translate(0,0)"}),t.outTarget.done()}),e(t.inTarget.el).css(this.inTargetCss).transit({y:t.inTarget.to},t.inTarget.duration,t.inTarget.timing,function(){n.launcher._done()})},fade:function(t){var n=this,r={inTarget:{duration:250},outTarget:{duration:250}};t=this.extend(r,t),this.outTargetCss={position:"absolute",width:e(t.outTarget.el).width(),opacity:1},this.inTargetCss={position:"absolute",width:e(t.inTarget.el).width(),opacity:t.animationFade?0:1},e(t.inTarget.el).css(this.inTargetCss),e(t.outTarget.el).css(this.outTargetCss).transit({opacity:t.animationFade?0:1},t.outTarget.duration,t.outTarget.timing,function(){t.outTarget.done(),e(t.inTarget.el).transit({opacity:1},t.inTarget.duration,t.inTarget.timing,function(){n.launcher._done()})})},pop:function(t){var n=this,r={inTarget:{duration:350},outTarget:{from:0,duration:350}};t=this.extend(r,t),this.outTargetCss={position:"absolute",width:e(t.outTarget.el).width(),scale:1,opacity:1,perspective:e(t.outTarget.el).width(),rotate3d:"0, 0, 0, 0",overflow:"hidden"},this.inTargetCss={position:"absolute",width:e(t.inTarget.el).width(),scale:.5,opacity:t.animationFade?0:1,perspective:e(t.outTarget.el).width(),rotate3d:"0, 0, 0, 0",overflow:"hidden"},e(t.inTarget.el).css(this.inTargetCss),e(t.outTarget.el).css(this.outTargetCss).transit({scale:.5,opacity:t.animationFade?0:1},t.outTarget.duration,t.outTarget.timing,function(){e(this).css({scale:1}),t.outTarget.done(),e(t.inTarget.el).transit({scale:1,opacity:1},t.inTarget.duration,t.inTarget.timing,function(){n.launcher._done()})})},turn:function(n){var r=this,i={inTarget:{from:"90deg",to:0,duration:350},outTarget:{from:0,to:"-90deg",duration:150}};n.isReverse&&(i={inTarget:{from:"-90deg",to:0,duration:350},outTarget:{from:0,to:"90deg",duration:150}}),n=this.extend(i,n),this.outTargetCss={position:"absolute",width:e(n.outTarget.el).width(),perspective:e(n.outTarget.el).width(),rotate3d:"0, 1, 0, "+n.outTarget.from,transformOrigin:"0 0",opacity:1,height:e(t).height()>e(n.outTarget.el).height()?e(n.outTarget.el).height():e(t).height(),overflow:"hidden"},this.inTargetCss={position:"absolute",width:e(n.inTarget.el).width(),perspective:e(n.inTarget.el).width(),rotate3d:"0, 1, 0, "+n.inTarget.from,transformOrigin:"0 0",opacity:n.animationFade?0:1,height:e(t).height()>e(n.outTarget.el).height()?e(n.outTarget.el).height():e(t).height(),overflow:"hidden"},e(n.inTarget.el).css(this.inTargetCss),e(n.outTarget.el).css(this.outTargetCss).transit({rotate3d:"0, 1, 0, "+n.outTarget.to,opacity:n.animationFade?0:1},n.outTarget.duration,n.outTarget.timing,function(){n.outTarget.done(),e(n.inTarget.el).transit({rotate3d:"0, 1, 0, "+n.inTarget.to,opacity:1},n.inTarget.duration,n.inTarget.timing,function(){r.launcher._done()})})}}}(jQuery,window)
/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  Description: 이 플러그인은 화면전환을 실행하기 위한 플러그인이며,
 *  이 플러그인은 jQuery Core Style Guide(http://docs.jquery.com/JQuery_Core_Style_Guidelines)를 준수합니다.
 *  Author: 김우섭
 *  License :
 */


/*!
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2012 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */
(function ($) {
    $.transit = {
        version: "0.9.9",

        // Map of $.css() keys to values for 'transitionProperty'.
        // See https://developer.mozilla.org/en/CSS/CSS_transitions#Properties_that_can_be_animated
        propertyMap: {
            marginLeft: 'margin',
            marginRight: 'margin',
            marginBottom: 'margin',
            marginTop: 'margin',
            paddingLeft: 'padding',
            paddingRight: 'padding',
            paddingBottom: 'padding',
            paddingTop: 'padding'
        },

        // Will simply transition "instantly" if false
        enabled: true,

        // Set this to false if you don't want to use the transition end property.
        useTransitionEnd: false
    };

    var div = document.createElement('div');
    var support = {};

    // Helper function to get the proper vendor property name.
    // (`transition` => `WebkitTransition`)
    function getVendorPropertyName(prop) {
        // Handle unprefixed versions (FF16+, for example)
        if (prop in div.style) return prop;

        var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
        var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

        if (prop in div.style) {
            return prop;
        }

        for (var i = 0; i < prefixes.length; ++i) {
            var vendorProp = prefixes[i] + prop_;
            if (vendorProp in div.style) {
                return vendorProp;
            }
        }
    }

    // Helper function to check if transform3D is supported.
    // Should return true for Webkits and Firefox 10+.
    function checkTransform3dSupport() {
        div.style[support.transform] = '';
        div.style[support.transform] = 'rotateY(90deg)';
        return div.style[support.transform] !== '';
    }

    var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

    // Check for the browser's transitions support.
    support.transition = getVendorPropertyName('transition');
    support.transitionDelay = getVendorPropertyName('transitionDelay');
    support.transform = getVendorPropertyName('transform');
    support.transformOrigin = getVendorPropertyName('transformOrigin');
    support.transform3d = checkTransform3dSupport();

    var eventNames = {
        'transition': 'transitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'WebkitTransition': 'webkitTransitionEnd',
        'msTransition': 'MSTransitionEnd'
    };

    // Detect the 'transitionend' event needed.
    var transitionEnd = support.transitionEnd = eventNames[support.transition] || null;

    // Populate jQuery's `$.support` with the vendor prefixes we know.
    // As per [jQuery's cssHooks documentation](http://api.jquery.com/jQuery.cssHooks/),
    // we set $.support.transition to a string of the actual property name used.
    for (var key in support) {
        if (support.hasOwnProperty(key) && typeof $.support[key] === 'undefined') {
            $.support[key] = support[key];
        }
    }

    // Avoid memory leak in IE.
    div = null;

    // ## $.cssEase
    // List of easing aliases that you can use with `$.fn.transition`.
    $.cssEase = {
        '_default': 'ease',
        'in': 'ease-in',
        'out': 'ease-out',
        'in-out': 'ease-in-out',
        'snap': 'cubic-bezier(0,1,.5,1)',
        // Penner equations
        'easeOutCubic': 'cubic-bezier(.215,.61,.355,1)',
        'easeInOutCubic': 'cubic-bezier(.645,.045,.355,1)',
        'easeInCirc': 'cubic-bezier(.6,.04,.98,.335)',
        'easeOutCirc': 'cubic-bezier(.075,.82,.165,1)',
        'easeInOutCirc': 'cubic-bezier(.785,.135,.15,.86)',
        'easeInExpo': 'cubic-bezier(.95,.05,.795,.035)',
        'easeOutExpo': 'cubic-bezier(.19,1,.22,1)',
        'easeInOutExpo': 'cubic-bezier(1,0,0,1)',
        'easeInQuad': 'cubic-bezier(.55,.085,.68,.53)',
        'easeOutQuad': 'cubic-bezier(.25,.46,.45,.94)',
        'easeInOutQuad': 'cubic-bezier(.455,.03,.515,.955)',
        'easeInQuart': 'cubic-bezier(.895,.03,.685,.22)',
        'easeOutQuart': 'cubic-bezier(.165,.84,.44,1)',
        'easeInOutQuart': 'cubic-bezier(.77,0,.175,1)',
        'easeInQuint': 'cubic-bezier(.755,.05,.855,.06)',
        'easeOutQuint': 'cubic-bezier(.23,1,.32,1)',
        'easeInOutQuint': 'cubic-bezier(.86,0,.07,1)',
        'easeInSine': 'cubic-bezier(.47,0,.745,.715)',
        'easeOutSine': 'cubic-bezier(.39,.575,.565,1)',
        'easeInOutSine': 'cubic-bezier(.445,.05,.55,.95)',
        'easeInBack': 'cubic-bezier(.6,-.28,.735,.045)',
        'easeOutBack': 'cubic-bezier(.175, .885,.32,1.275)',
        'easeInOutBack': 'cubic-bezier(.68,-.55,.265,1.55)'
    };

    // ## 'transform' CSS hook
    // Allows you to use the `transform` property in CSS.
    //
    //     $("#hello").css({ transform: "rotate(90deg)" });
    //
    //     $("#hello").css('transform');
    //     //=> { rotate: '90deg' }
    //
    $.cssHooks['transit:transform'] = {
        // The getter returns a `Transform` object.
        get: function (elem) {
            return $(elem).data('transform') || new Transform();
        },

        // The setter accepts a `Transform` object or a string.
        set: function (elem, v) {
            var value = v;

            if (!(value instanceof Transform)) {
                value = new Transform(value);
            }

            // We've seen the 3D version of Scale() not work in Chrome when the
            // element being scaled extends outside of the viewport.  Thus, we're
            // forcing Chrome to not use the 3d transforms as well.  Not sure if
            // translate is affectede, but not risking it.  Detection code from
            // http://davidwalsh.name/detecting-google-chrome-javascript
            if (support.transform === 'WebkitTransform' && !isChrome) {
                elem.style[support.transform] = value.toString(true);
            } else {
                elem.style[support.transform] = value.toString();
            }

            $(elem).data('transform', value);
        }
    };

    // Add a CSS hook for `.css({ transform: '...' })`.
    // In jQuery 1.8+, this will intentionally override the default `transform`
    // CSS hook so it'll play well with Transit. (see issue #62)
    $.cssHooks.transform = {
        set: $.cssHooks['transit:transform'].set
    };

    // jQuery 1.8+ supports prefix-free transitions, so these polyfills will not
    // be necessary.
    if ($.fn.jquery < "1.8") {
        // ## 'transformOrigin' CSS hook
        // Allows the use for `transformOrigin` to define where scaling and rotation
        // is pivoted.
        //
        //     $("#hello").css({ transformOrigin: '0 0' });
        //
        $.cssHooks.transformOrigin = {
            get: function (elem) {
                return elem.style[support.transformOrigin];
            },
            set: function (elem, value) {
                elem.style[support.transformOrigin] = value;
            }
        };

        // ## 'transition' CSS hook
        // Allows you to use the `transition` property in CSS.
        //
        //     $("#hello").css({ transition: 'all 0 ease 0' });
        //
        $.cssHooks.transition = {
            get: function (elem) {
                return elem.style[support.transition];
            },
            set: function (elem, value) {
                elem.style[support.transition] = value;
            }
        };
    }

    // ## Other CSS hooks
    // Allows you to rotate, scale and translate.
    registerCssHook('scale');
    registerCssHook('translate');
    registerCssHook('rotate');
    registerCssHook('rotateX');
    registerCssHook('rotateY');
    registerCssHook('rotate3d');
    registerCssHook('perspective');
    registerCssHook('skewX');
    registerCssHook('skewY');
    registerCssHook('x', true);
    registerCssHook('y', true);

    // ## Transform class
    // This is the main class of a transformation property that powers
    // `$.fn.css({ transform: '...' })`.
    //
    // This is, in essence, a dictionary object with key/values as `-transform`
    // properties.
    //
    //     var t = new Transform("rotate(90) scale(4)");
    //
    //     t.rotate             //=> "90deg"
    //     t.scale              //=> "4,4"
    //
    // Setters are accounted for.
    //
    //     t.set('rotate', 4)
    //     t.rotate             //=> "4deg"
    //
    // Convert it to a CSS string using the `toString()` and `toString(true)` (for WebKit)
    // functions.
    //
    //     t.toString()         //=> "rotate(90deg) scale(4,4)"
    //     t.toString(true)     //=> "rotate(90deg) scale3d(4,4,0)" (WebKit version)
    //
    function Transform(str) {
        if (typeof str === 'string') {
            this.parse(str);
        }
        return this;
    }

    Transform.prototype = {
        // ### setFromString()
        // Sets a property from a string.
        //
        //     t.setFromString('scale', '2,4');
        //     // Same as set('scale', '2', '4');
        //
        setFromString: function (prop, val) {
            var args =
                (typeof val === 'string') ? val.split(',') :
                    (val.constructor === Array) ? val :
                        [ val ];

            args.unshift(prop);

            Transform.prototype.set.apply(this, args);
        },

        // ### set()
        // Sets a property.
        //
        //     t.set('scale', 2, 4);
        //
        set: function (prop) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            if (this.setter[prop]) {
                this.setter[prop].apply(this, args);
            } else {
                this[prop] = args.join(',');
            }
        },

        get: function (prop) {
            if (this.getter[prop]) {
                return this.getter[prop].apply(this);
            } else {
                return this[prop] || 0;
            }
        },

        setter: {
            // ### rotate
            //
            //     .css({ rotate: 30 })
            //     .css({ rotate: "30" })
            //     .css({ rotate: "30deg" })
            //     .css({ rotate: "30deg" })
            //
            rotate: function (theta) {
                this.rotate = unit(theta, 'deg');
            },

            rotateX: function (theta) {
                this.rotateX = unit(theta, 'deg');
            },

            rotateY: function (theta) {
                this.rotateY = unit(theta, 'deg');
            },

            // ### scale
            //
            //     .css({ scale: 9 })      //=> "scale(9,9)"
            //     .css({ scale: '3,2' })  //=> "scale(3,2)"
            //
            scale: function (x, y) {
                if (y === undefined) {
                    y = x;
                }
                this.scale = x + "," + y;
            },

            // ### skewX + skewY
            skewX: function (x) {
                this.skewX = unit(x, 'deg');
            },

            skewY: function (y) {
                this.skewY = unit(y, 'deg');
            },

            // ### perspectvie
            perspective: function (dist) {
                this.perspective = unit(dist, 'px');
            },

            // ### x / y
            // Translations. Notice how this keeps the other value.
            //
            //     .css({ x: 4 })       //=> "translate(4px, 0)"
            //     .css({ y: 10 })      //=> "translate(4px, 10px)"
            //
            x: function (x) {
                this.set('translate', x, null);
            },

            y: function (y) {
                this.set('translate', null, y);
            },

            // ### translate
            // Notice how this keeps the other value.
            //
            //     .css({ translate: '2, 5' })    //=> "translate(2px, 5px)"
            //
            translate: function (x, y) {
                if (this._translateX === undefined) {
                    this._translateX = 0;
                }
                if (this._translateY === undefined) {
                    this._translateY = 0;
                }

                if (x !== null && x !== undefined) {
                    this._translateX = unit(x, 'px');
                }
                if (y !== null && y !== undefined) {
                    this._translateY = unit(y, 'px');
                }

                this.translate = this._translateX + "," + this._translateY;
            }
        },

        getter: {
            x: function () {
                return this._translateX || 0;
            },

            y: function () {
                return this._translateY || 0;
            },

            scale: function () {
                var s = (this.scale || "1,1").split(',');
                if (s[0]) {
                    s[0] = parseFloat(s[0]);
                }
                if (s[1]) {
                    s[1] = parseFloat(s[1]);
                }

                // "2.5,2.5" => 2.5
                // "2.5,1" => [2.5,1]
                return (s[0] === s[1]) ? s[0] : s;
            },

            rotate3d: function () {
                var s = (this.rotate3d || "0,0,0,0deg").split(',');
                for (var i = 0; i <= 3; ++i) {
                    if (s[i]) {
                        s[i] = parseFloat(s[i]);
                    }
                }
                if (s[3]) {
                    s[3] = unit(s[3], 'deg');
                }

                return s;
            }
        },

        // ### parse()
        // Parses from a string. Called on constructor.
        parse: function (str) {
            var self = this;
            str.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function (x, prop, val) {
                self.setFromString(prop, val);
            });
        },

        // ### toString()
        // Converts to a `transition` CSS property string. If `use3d` is given,
        // it converts to a `-webkit-transition` CSS property string instead.
        toString: function (use3d) {
            var re = [];

            for (var i in this) {
                if (this.hasOwnProperty(i)) {
                    // Don't use 3D transformations if the browser can't support it.
                    if ((!support.transform3d) && (
                        (i === 'rotateX') ||
                            (i === 'rotateY') ||
                            (i === 'perspective') ||
                            (i === 'transformOrigin'))) {
                        continue;
                    }

                    if (i[0] !== '_') {
                        if (use3d && (i === 'scale')) {
                            re.push(i + "3d(" + this[i] + ",1)");
                        } else if (use3d && (i === 'translate')) {
                            re.push(i + "3d(" + this[i] + ",0)");
                        } else {
                            re.push(i + "(" + this[i] + ")");
                        }
                    }
                }
            }

            return re.join(" ");
        }
    };

    function callOrQueue(self, queue, fn) {
        if (queue === true) {
            self.queue(fn);
        } else if (queue) {
            self.queue(queue, fn);
        } else {
            fn();
        }
    }

    // ### getProperties(dict)
    // Returns properties (for `transition-property`) for dictionary `props`. The
    // value of `props` is what you would expect in `$.css(...)`.
    function getProperties(props) {
        var re = [];

        $.each(props, function (key) {
            key = $.camelCase(key); // Convert "text-align" => "textAlign"
            key = $.transit.propertyMap[key] || $.cssProps[key] || key;
            key = uncamel(key); // Convert back to dasherized

            if ($.inArray(key, re) === -1) {
                re.push(key);
            }
        });

        return re;
    }

    // ### getTransition()
    // Returns the transition string to be used for the `transition` CSS property.
    //
    // Example:
    //
    //     getTransition({ opacity: 1, rotate: 30 }, 500, 'ease');
    //     //=> 'opacity 500ms ease, -webkit-transform 500ms ease'
    //
    function getTransition(properties, duration, easing, delay) {
        // Get the CSS properties needed.
        var props = getProperties(properties);

        // Account for aliases (`in` => `ease-in`).
        if ($.cssEase[easing]) {
            easing = $.cssEase[easing];
        }

        // Build the duration/easing/delay attributes for it.
        var attribs = '' + toMS(duration) + ' ' + easing;
        if (parseInt(delay, 10) > 0) {
            attribs += ' ' + toMS(delay);
        }

        // For more properties, add them this way:
        // "margin 200ms ease, padding 200ms ease, ..."
        var transitions = [];
        $.each(props, function (i, name) {
            transitions.push(name + ' ' + attribs);
        });

        return transitions.join(', ');
    }

    // ## $.fn.transition
    // Works like $.fn.animate(), but uses CSS transitions.
    //
    //     $("...").transition({ opacity: 0.1, scale: 0.3 });
    //
    //     // Specific duration
    //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500);
    //
    //     // With duration and easing
    //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in');
    //
    //     // With callback
    //     $("...").transition({ opacity: 0.1, scale: 0.3 }, function() { ... });
    //
    //     // With everything
    //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in', function() { ... });
    //
    //     // Alternate syntax
    //     $("...").transition({
    //       opacity: 0.1,
    //       duration: 200,
    //       delay: 40,
    //       easing: 'in',
    //       complete: function() { /* ... */ }
    //      });
    //
    $.fn.transition = $.fn.transit = function (properties, duration, easing, callback) {
        var self = this;
        var delay = 0;
        var queue = true;

        // Account for `.transition(properties, callback)`.
        if (typeof duration === 'function') {
            callback = duration;
            duration = undefined;
        }

        // Account for `.transition(properties, duration, callback)`.
        if (typeof easing === 'function') {
            callback = easing;
            easing = undefined;
        }

        // Alternate syntax.
        if (typeof properties.easing !== 'undefined') {
            easing = properties.easing;
            delete properties.easing;
        }

        if (typeof properties.duration !== 'undefined') {
            duration = properties.duration;
            delete properties.duration;
        }

        if (typeof properties.complete !== 'undefined') {
            callback = properties.complete;
            delete properties.complete;
        }

        if (typeof properties.queue !== 'undefined') {
            queue = properties.queue;
            delete properties.queue;
        }

        if (typeof properties.delay !== 'undefined') {
            delay = properties.delay;
            delete properties.delay;
        }

        // Set defaults. (`400` duration, `ease` easing)
        if (typeof duration === 'undefined') {
            duration = $.fx.speeds._default;
        }
        if (typeof easing === 'undefined') {
            easing = $.cssEase._default;
        }

        duration = toMS(duration);

        // Build the `transition` property.
        var transitionValue = getTransition(properties, duration, easing, delay);

        // Compute delay until callback.
        // If this becomes 0, don't bother setting the transition property.
        var work = $.transit.enabled && support.transition;
        var i = work ? (parseInt(duration, 10) + parseInt(delay, 10)) : 0;

        // If there's nothing to do...
        if (i === 0) {
            var fn = function (next) {
                self.css(properties);
                if (callback) {
                    callback.apply(self);
                }
                if (next) {
                    next();
                }
            };

            callOrQueue(self, queue, fn);
            return self;
        }

        // Save the old transitions of each element so we can restore it later.
        var oldTransitions = {};

        var run = function (nextCall) {
            var bound = false;

            // Prepare the callback.
            var cb = function () {
                if (bound) {
                    self.unbind(transitionEnd, cb);
                }

                if (i > 0) {
                    self.each(function () {
                        this.style[support.transition] = (oldTransitions[this] || null);
                    });
                }

                if (typeof callback === 'function') {
                    callback.apply(self);
                }
                if (typeof nextCall === 'function') {
                    nextCall();
                }
            };

            if ((i > 0) && (transitionEnd) && ($.transit.useTransitionEnd)) {
                // Use the 'transitionend' event if it's available.
                bound = true;
                self.bind(transitionEnd, cb);
            } else {
                // Fallback to timers if the 'transitionend' event isn't supported.
                window.setTimeout(cb, i);
            }

            // Apply transitions.
            self.each(function () {
                if (i > 0) {
                    this.style[support.transition] = transitionValue;
                }
                $(this).css(properties);
            });
        };

        // Defer running. This allows the browser to paint any pending CSS it hasn't
        // painted yet before doing the transitions.
        var deferredRun = function (next) {
            var i = 0;

            // Durations that are too slow will get transitions mixed up.
            // (Tested on Mac/FF 7.0.1)
            if ((support.transition === 'MozTransition') && (i < 25)) {
                i = 25;
            }

            window.setTimeout(function () {
                run(next);
            }, i);
        };

        // Use jQuery's fx queue.
        callOrQueue(self, queue, deferredRun);

        // Chainability.
        return this;
    };

    function registerCssHook(prop, isPixels) {
        // For certain properties, the 'px' should not be implied.
        if (!isPixels) {
            $.cssNumber[prop] = true;
        }

        $.transit.propertyMap[prop] = support.transform;

        $.cssHooks[prop] = {
            get: function (elem) {
                var t = $(elem).css('transit:transform');
                return t.get(prop);
            },

            set: function (elem, value) {
                var t = $(elem).css('transit:transform');
                t.setFromString(prop, value);

                $(elem).css({ 'transit:transform': t });
            }
        };

    }

    // ### uncamel(str)
    // Converts a camelcase string to a dasherized string.
    // (`marginLeft` => `margin-left`)
    function uncamel(str) {
        return str.replace(/([A-Z])/g, function (letter) {
            return '-' + letter.toLowerCase();
        });
    }

    // ### unit(number, unit)
    // Ensures that number `number` has a unit. If no unit is found, assume the
    // default is `unit`.
    //
    //     unit(2, 'px')          //=> "2px"
    //     unit("30deg", 'rad')   //=> "30deg"
    //
    function unit(i, units) {
        if ((typeof i === "string") && (!i.match(/^[\-0-9\.]+$/))) {
            return i;
        } else {
            return "" + i + units;
        }
    }

    // ### toMS(duration)
    // Converts given `duration` to a millisecond string.
    //
    //     toMS('fast')   //=> '400ms'
    //     toMS(10)       //=> '10ms'
    //
    function toMS(duration) {
        var i = duration;

        // Allow for string durations like 'fast'.
        if ($.fx.speeds[i]) {
            i = $.fx.speeds[i];
        }

        return unit(i, 'ms');
    }

    // Export some functions for testable-ness.
    $.transit.getTransitionValue = getTransition;
})(jQuery);

(function ($, window) {

    /**
     * Transition 은 화면 전환를 구현 하기 위해 Launcher 와 Effect로 이뤄져 있다.
     * @name Transition
     * @constructor
     * @class Transition
     */
    var Transition = window.Transition = {};

    /**
     * Launcher 은 화면 전환를 구현 하기 위해 Launcher 와 Effect로 이뤄져 있다.
     * @name Launcher
     * @class Launcher
     * @constructor
     * @param {JSON} options - 옵션값
     */
    var Launcher = function (options) {
        this.options = options;
    };

    var Effect = Transition.effect = function (options) {
        this.options = options;
    };

    Transition.launcher = function (option) {
        return new Launcher(option).init();
    };

    Launcher.prototype = {
        defaults: {
            transitionType: "none", // 화면전환 효과 기본 None(효과 없음)
            fallbackType: "fade", // IE에서 임시로 사용할 효과
            autoDisplay: true, // 완료시 자동으로 이전페이지를 감출지 여부
            nested: false, // 네스티드 여부
            animationFade: true, // 트랜지션 중 페이드인아웃
            inTarget: {
                el: undefined, // 들어오는 페이지의 element의 셀렉터나 ID 또는 클래스
                from: undefined, // 들어오는 페이지의 시작점
                to: undefined, // 들어오는 페이지의 도착점
                duration: undefined, // 들어오는 페이지의 애니메이션 시간
                timing: "ease", // linear ease ease-in ease-out ease-in-out
                done: function () {

                }
            },
            outTarget: {
                el: undefined, // 나가는 페이지의 element의 셀렉터나 ID 또는 클래스
                from: undefined, // 나가는 페이지의 시작점
                to: undefined, // 나가는 페이지의 도착점
                duration: undefined, // 나가는 페이지의 애니메이션 시간
                timing: "ease",
                done: function () {

                }
            },
            isReverse: false, // 뒤로가기 여부
            done: function () {

            }
        },

        // 초기화
        init: function () {
            // 기본 설정과 사용자가 정의한 값을 병합
            this.options.inTarget = $.extend({}, this.defaults.inTarget, this.options.inTarget);
            this.options.outTarget = $.extend({}, this.defaults.outTarget, this.options.outTarget);
            this.options = $.extend({}, this.defaults, this.options);

            this.run();
            return this;
        },

        /**
         * 화면 전환 실행 함수
         * @name Launcher#run
         * @function
         * @example
         * this.run();
         */
        run: function () {
            var self = this;
            var effect = new Effect(this.options);

            this._before();

            try {
                // Fallback for MSIE
                if (!$.support.transition) {
                    $.fn.transition = $.fn.animate;
                    this.options.transitionType = this.options.fallbackType;
                    this.options.inTarget.timing = "linear";
                    this.options.outTarget.timing = "linear";
                }

                effect.init(self);
                effect[self.options.transitionType](self.options);
            } catch (e) {
                effect.none(this.options);
            }
        },

        /**
         * 화면 전환 시작전 실행 함수
         * @name Launcher#_before
         * @function
         * @example
         * this._before();
         */
        _before: function () {
            var $body = $("body");
            this.$bodyOverflowX = $body.css("overflowX");
            $body.css({overflowX: "hidden"});
            $(this.options.inTarget.el).show();
            $(this.options.outTarget.el).show();

            if (this.options.isReverse && $body.attr("data-transition") !== undefined) {
                this.options.transitionType = $body.attr("data-transition");
            }
        },

        /**
         * 화면 전환 완료시 실행 함수
         * @name Launcher#_done
         * @function
         * @example
         * self.launcher._done();
         */
        _done: function () {
            $("body").css({overflowX: this.$bodyOverflowX}).attr("data-transition", this.options.transitionType);
            var $outTargetEl = $(this.options.outTarget.el).attr("style", "");
            var $inTargetEl = $(this.options.inTarget.el).attr("style", "");

            // 자동으로 이전페이지를 숨기기
            if (this.options.autoDisplay) {
                $outTargetEl.hide();
                $inTargetEl.show();
            }

            this.options.inTarget.done();
            this.options.done();
        }
    };

    // 화면전환 효과
    Effect.prototype = {
        inTargetCss: null,
        outTargetCss: null,

        // 초기화
        init: function (launcher) {
            this.launcher = launcher;
        },

        // 페이지별 설정값 병합 유틸리티
        extend: function (defaultValue, opt) {
            opt.inTarget = $.extend({}, defaultValue.inTarget, opt.inTarget);
            opt.outTarget = $.extend({}, defaultValue.outTarget, opt.outTarget);
            return opt;
        },

        // 효과가 없는 경우
        none: function (opt) {
            var self = this;
            $(opt.outTarget.el).hide(function () {
                opt.outTarget.done();
                $(opt.inTarget.el).show(function () {
                    self.launcher._done();
                });
            });
        },

        // 플립효과
        flip: function (opt) {
            // 플립 기본 값
            var self = this,
                defaultValue = {
                    inTarget: {
                        from: "90deg",
                        to: 0,
                        duration: 350
                    },
                    outTarget: {
                        from: 0,
                        to: "-90deg",
                        duration: 150
                    }
                };

            // 뒤로가기시 반대 효과 좌표 값
            if (opt.isReverse) {
                defaultValue = {
                    inTarget: {
                        from: "-90deg",
                        to: 0,
                        duration: 350
                    },
                    outTarget: {
                        from: 0,
                        to: "90deg",
                        duration: 150
                    }
                };
            }

            // 기본값과 사용자 정의 값 병합
            opt = this.extend(defaultValue, opt);

            $(opt.outTarget.el).height();
            // 나가는 페이지 스타일 초기화 값
            this.outTargetCss = {
//                position: "absolute",
                position:"relative",
                width: $(opt.outTarget.el).width(),
                perspective: $(opt.outTarget.el).width() * 2,
                rotate3d: "0, 1, 0, " + opt.outTarget.from,
                height: $(window).height() > $(opt.outTarget.el).height() ?
                    $(opt.outTarget.el).height() : $(window).height(),
                overflow: "hidden",
                opacity: 1
            };

            // 들어오는 페이지 스타일 초기화 값
            this.inTargetCss = {
//                position: "absolute",
                position:"relative",
                width: $(opt.inTarget.el).width(),
                perspective: $(opt.inTarget.el).width() * 2,
                rotate3d: "0, 1, 0, " + opt.inTarget.from,
                height: $(window).height() > $(opt.inTarget.el).height() ?
                    $(opt.inTarget.el).height() : $(window).height(),
                overflow: "hidden",
                opacity: opt.animationFade ? 0 : 1
            };

            $(opt.inTarget.el).css(this.inTargetCss);
            $(opt.outTarget.el).css(this.outTargetCss).transit({
                rotate3d: "0, 1, 0, " + opt.outTarget.to,
                opacity: opt.animationFade ? 0 : 1
            }, opt.outTarget.duration, opt.outTarget.timing, function () {
                opt.outTarget.done();

                $(opt.inTarget.el).transit({
                    rotate3d: "0, 1, 0, " + opt.inTarget.to,
                    opacity: 1
                }, opt.inTarget.duration, opt.inTarget.timing, function () {
                    self.launcher._done();
                });
            });

        },

        // 회전 효과
        spin: function (opt) {
            // 회전 기본값
            var self = this,
                defaultValue = {
                    inTarget: {
                        from: "90deg",
                        to: 0,
                        duration: 550
                    },
                    outTarget: {
                        from: 0,
                        to: "-90deg",
                        duration: 550
                    }
                };
            // 뒤로가기시 반대 효과 좌표 값
            if (opt.isReverse) {
                defaultValue = {
                    inTarget: {
                        from: "-90deg",
                        to: 0,
                        duration: 550
                    },
                    outTarget: {
                        from: 0,
                        to: "90deg",
                        duration: 550
                    }
                };
            }
            // 기본값과 사용자 정의 값 병합
            opt = this.extend(defaultValue, opt);
            // 나가는 페이지 스타일 초기화 값
            this.outTargetCss = {
                position:"relative",
                //position: "absolute",
                width: $(opt.outTarget.el).width(),
                perspective: $(opt.outTarget.el).width(),
                rotate3d: "1, 1, 1, " + opt.outTarget.from,
                height: $(window).height() > $(opt.inTarget.el).height() ?
                    $(opt.inTarget.el).height() : $(window).height(),
                overflow: "hidden",
                scale: 1,
                opacity: 1
            };
            // 들어오는 페이지 스타일 초기화 값
            this.inTargetCss = {
                position:"relative",//position: "absolute",
                width: $(opt.inTarget.el).width(),
                perspective: $(opt.inTarget.el).width(),
                rotate3d: "1, 1, 1, " + opt.inTarget.from,
                height: $(window).height() > $(opt.inTarget.el).height() ?
                    $(opt.inTarget.el).height() : $(window).height(),
                overflow: "hidden",
                scale: 0,
                opacity: opt.animationFade ? 0 : 1
            };
            $(opt.inTarget.el).css(this.inTargetCss);
            $(opt.outTarget.el).css(this.outTargetCss).transit({
                rotate3d: "1, 1, 1, " + opt.outTarget.to,
                scale: 0,
                opacity: opt.animationFade ? 0 : 1
            }, opt.outTarget.duration, opt.outTarget.timing, function () {
                $(this).css({
                    scale: 1
                });
                opt.outTarget.done();
                $(opt.inTarget.el).transit({
                    rotate3d: "1, 1, 1, " + opt.inTarget.to,
                    scale: 1,
                    opacity: 1
                }, opt.inTarget.duration, opt.inTarget.timing, function () {
                    self.launcher._done();
                });
            });
        },

        // 슬라이드 효과
        slide: function (opt) {
            // 슬라이드 기본 좌표 값
            var self = this,
                defaultValue = {
                    inTarget: {
                        from: "150%", // width 100%인 경우 UI 상 페이지가 붙는 상태로 보이는 문제를 위해 좌표 20% 증가
                        to: "0",
                        duration: 550
                    },
                    outTarget: {
                        from: "0",
                        to: '-150%',
                        duration: 550
                    }
                };

            // 뒤로가기시 슬라이드 반대 효과 좌표 값
            if (opt.isReverse) {
                defaultValue = {
                    inTarget: {
                        from: "-150%",
                        to: "0",
                        duration: 550
                    },
                    outTarget: {
                        from: "0",
                        to: '150%',
                        duration: 550
                    }
                };
            }

            window.scrollTo(0, 0);
            // 기본값과 사용자 정의 값 병합
            opt = this.extend(defaultValue, opt);

            // 나가는 페이지 스타일 초기화
            this.outTargetCss = {
                position:"relative",//position: "absolute",
                width: $(window).width() > $(opt.outTarget.el).width() ?
                    $(opt.outTarget.el).width() : $(window).width(),
                height: $(window).height() > $(opt.outTarget.el).height() ?
                    $(opt.outTarget.el).height() : $(window).height(),
                transform: "translate(" + opt.outTarget.from + ",0)",
                opacity: 1
            };

            // 들어오는 페이지 스타일 초기화
            this.inTargetCss = {
                position:"relative",//position: "absolute",
                width: $(window).width() > $(opt.inTarget.el).width() ?
                    $(opt.inTarget.el).width() : $(window).width(),
                height: $(window).height() > $(opt.inTarget.el).height() ?
                    $(opt.inTarget.el).height() : $(window).height(),
                transform: "translate(" + opt.inTarget.from + ",0)",
                opacity: 1
            };

            opt.inTarget.top = $(opt.inTarget.el).css("top");

            // 나가는 페이지 슬라이드
            $(opt.outTarget.el).css(this.outTargetCss).transit({
                x: opt.outTarget.to,
                opacity: opt.animationFade ? 0 : 1
            }, opt.outTarget.duration, opt.outTarget.timing, function () {
                opt.outTarget.done();
            });

            // 들어오는 페이지 슬라이드
            $(opt.inTarget.el).css(this.inTargetCss).transit({
                x: opt.inTarget.to
            }, opt.inTarget.duration, opt.inTarget.timing, function () {
                // 기본 좌표로 초기화
                $(opt.outTarget.el).css({
                    transform: "translate(0,0)"
                });
                self.launcher._done();
            });

        },

        // 슬라이드 업 효과
        slideup: function (opt) {
            // 슬라이드 기본 좌표 값
            var self = this,
                defaultValue = {
                    inTarget: {
                        from: "100%",
                        to: "0",
                        duration: 550
                    },
                    outTarget: {
                        from: "0",
                        to: '-100%',
                        duration: 550
                    }
                };

            // 뒤로가기시 슬라이드 반대 효과 좌표 값
            if (opt.isReverse) {
                defaultValue = {
                    inTarget: {
                        from: "-100%",
                        to: "0",
                        duration: 550
                    },
                    outTarget: {
                        from: "0",
                        to: '100%',
                        duration: 550
                    }
                };
            }

            // 기본값과 사용자 정의 값 병합
            opt = this.extend(defaultValue, opt);

            // 나가는 페이지 스타일 초기화
            this.outTargetCss = {
                position:"relative",//position: "absolute",
                width: $(opt.outTarget.el).width(),
                transform: "translate(0, " + opt.outTarget.from + ")",
                height: $(window).height() > $(opt.outTarget.el).height() ?
                    $(opt.outTarget.el).height() : $(window).height(),
                opacity: 1
            };

            // 들어오는 페이지 스타일 초기화
            this.inTargetCss = {
                position:"relative",//position: "absolute",
                width: $(opt.inTarget.el).width(),
                transform: "translate(0, " + opt.inTarget.from + ")",
                height: $(window).height() > $(opt.outTarget.el).height() ?
                    $(opt.outTarget.el).height() : $(window).height(),
                opacity: 1
            };

            // 나가는 페이지 슬라이드
            $(opt.outTarget.el).css(this.outTargetCss).transit({
                y: opt.outTarget.to,
                opacity: opt.animationFade ? 0 : 1
            }, opt.outTarget.duration, opt.outTarget.timing, function () {
                $(this).css({
                    transform: "translate(0,0)"
                });
                opt.outTarget.done();
            });

            // 들어오는 페이지 슬라이드
            $(opt.inTarget.el).css(this.inTargetCss).transit({
                y: opt.inTarget.to
            }, opt.inTarget.duration, opt.inTarget.timing, function () {
                self.launcher._done();
            });

        },

        // 슬라이드 다운 효과
        slidedown: function (opt) {
            // 슬라이드 기본 좌표 값
            var self = this,
                defaultValue = {
                    inTarget: {
                        from: "-100%",
                        to: "0",
                        duration: 550
                    },
                    outTarget: {
                        from: "0",
                        to: '100%',
                        duration: 550
                    }
                };

            // 뒤로가기시 슬라이드 반대 효과 좌표 값
            if (opt.isReverse) {
                defaultValue = {
                    inTarget: {
                        from: "100%",
                        to: "0",
                        duration: 550
                    },
                    outTarget: {
                        from: "0",
                        to: '-100%',
                        duration: 550
                    }
                };
            }

            // 기본값과 사용자 정의 값 병합
            opt = this.extend(defaultValue, opt);

            // 나가는 페이지 스타일 초기화
            this.outTargetCss = {
                //position: "absolute",
                position:"relative",
                width: $(opt.outTarget.el).width(),
                transform: "translate(0, " + opt.outTarget.from + ")",
                opacity: 1
            };

            // 들어오는 페이지 스타일 초기화
            this.inTargetCss = {
                //position: "absolute",
                position:"relative",
                width: $(opt.inTarget.el).width(),
                transform: "translate(0, " + opt.inTarget.from + ")",
                opacity: 1
            };

            // 나가는 페이지 슬라이드
            $(opt.outTarget.el).css(this.outTargetCss).transit({
                y: opt.outTarget.to,
                opacity: opt.animationFade ? 0 : 1
            }, opt.outTarget.duration, opt.outTarget.timing, function () {
                $(this).css({
                    transform: "translate(0,0)"
                });
                opt.outTarget.done();
            });

            // 들어오는 페이지 슬라이드
            $(opt.inTarget.el).css(this.inTargetCss).transit({
                y: opt.inTarget.to
            }, opt.inTarget.duration, opt.inTarget.timing, function () {
                self.launcher._done();
            });

        },

        // 페이드 효과
        fade: function (opt) {
            // 페이드 기본 값
            var self = this,
                defaultValue = {
                    inTarget: {
                        duration: 250
                    },
                    outTarget: {
                        duration: 250
                    }
                };

            // 기본값과 사용자 정의 값 병합
            opt = this.extend(defaultValue, opt);

            // 나가는 페이지 스타일 초기화 값
            this.outTargetCss = {
                position:"relative",//position: "absolute",
                width: $(opt.outTarget.el).width(),
                opacity: 1
            };

            // 들어오는 페이지 스타일 초기화 값
            this.inTargetCss = {
                position:"relative",//position: "absolute",
                width: $(opt.inTarget.el).width(),
                opacity: opt.animationFade ? 0 : 1
            };

            // 페이지 스타일 초기화
            $(opt.inTarget.el).css(this.inTargetCss);
            $(opt.outTarget.el).css(this.outTargetCss).transit({
                opacity: opt.animationFade ? 0 : 1
            }, opt.outTarget.duration, opt.outTarget.timing, function () {
                opt.outTarget.done();
                $(opt.inTarget.el).transit({
                    opacity: 1
                }, opt.inTarget.duration, opt.inTarget.timing, function () {
                    self.launcher._done();
                });
            });
        },

        // 팝 효과
        pop: function (opt) {
            // 회전 기본 값
            var self = this,
                defaultValue = {
                    inTarget: {
                        duration: 350
                    },
                    outTarget: {
                        from: 0,
                        duration: 350
                    }
                };

            // 기본값과 사용자 정의 값 병합
            opt = this.extend(defaultValue, opt);

            // 나가는 페이지 스타일 초기화 값
            this.outTargetCss = {
                position:"relative",//position: "absolute",
                width: $(opt.outTarget.el).width(),
                scale: 1,
                opacity: 1,
                perspective: $(opt.outTarget.el).width(),
                rotate3d: "0, 0, 0, 0",
                overflow: "hidden"
            };

            // 들어오는 페이지 스타일 초기화 값
            this.inTargetCss = {
                position:"relative",//position: "absolute",
                width: $(opt.inTarget.el).width(),
                scale: 0.5,
                opacity: opt.animationFade ? 0 : 1,
                perspective: $(opt.outTarget.el).width(),
                rotate3d: "0, 0, 0, 0",
                overflow: "hidden"
            };

            $(opt.inTarget.el).css(this.inTargetCss);
            $(opt.outTarget.el).css(this.outTargetCss).transit({
                scale: 0.5,
                opacity: opt.animationFade ? 0 : 1
            }, opt.outTarget.duration, opt.outTarget.timing, function () {
                $(this).css({
                    scale: 1
                });
                opt.outTarget.done();

                $(opt.inTarget.el).transit({
                    scale: 1,
                    opacity: 1
                }, opt.inTarget.duration, opt.inTarget.timing, function () {
                    self.launcher._done();
                });
            });
        },

        // 전환 효과
        turn: function (opt) {
            // 회전 기본 값
            var self = this,
                defaultValue = {
                    inTarget: {
                        from: "90deg",
                        to: 0,
                        duration: 350
                    },
                    outTarget: {
                        from: 0,
                        to: "-90deg",
                        duration: 150
                    }
                };

            // 뒤로가기시 반대 효과 좌표 값
            if (opt.isReverse) {
                defaultValue = {
                    inTarget: {
                        from: "-90deg",
                        to: 0,
                        duration: 350
                    },
                    outTarget: {
                        from: 0,
                        to: "90deg",
                        duration: 150
                    }
                };
            }

            // 기본값과 사용자 정의 값 병합
            opt = this.extend(defaultValue, opt);

            // 나가는 페이지 스타일 초기화 값
            this.outTargetCss = {
                position:"relative",//position: "absolute",
                width: $(opt.outTarget.el).width(),
                perspective: $(opt.outTarget.el).width(),
                rotate3d: "0, 1, 0, " + opt.outTarget.from,
                transformOrigin: "0 0",
                opacity: 1,
                height: $(window).height() > $(opt.outTarget.el).height() ?
                    $(opt.outTarget.el).height() : $(window).height(),
                overflow: "hidden"
            };

            // 들어오는 페이지 스타일 초기화 값
            this.inTargetCss = {
                position:"relative",//position: "absolute",
                width: $(opt.inTarget.el).width(),
                perspective: $(opt.inTarget.el).width(),
                rotate3d: "0, 1, 0, " + opt.inTarget.from,
                transformOrigin: "0 0",
                opacity: opt.animationFade ? 0 : 1,
                height: $(window).height() > $(opt.outTarget.el).height() ?
                    $(opt.outTarget.el).height() : $(window).height(),
                overflow: "hidden"
            };

            $(opt.inTarget.el).css(this.inTargetCss);
            $(opt.outTarget.el).css(this.outTargetCss).transit({
                rotate3d: "0, 1, 0, " + opt.outTarget.to,
                opacity: opt.animationFade ? 0 : 1
            }, opt.outTarget.duration, opt.outTarget.timing, function () {
                opt.outTarget.done();

                $(opt.inTarget.el).transit({
                    rotate3d: "0, 1, 0, " + opt.inTarget.to,
                    opacity: 1
                }, opt.inTarget.duration, opt.inTarget.timing, function () {
                    self.launcher._done();
                });
            });
        }

    }
})(jQuery, window);