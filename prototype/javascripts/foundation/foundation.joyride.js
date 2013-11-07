(function(e,t,n,r){"use strict";var i=i||false;Foundation.libs.joyride={name:"joyride",version:"4.3.2",defaults:{expose:false,modal:false,tipLocation:"bottom",nubPosition:"auto",scrollSpeed:300,timer:0,startTimerOnClick:true,startOffset:0,nextButton:true,tipAnimation:"fade",pauseAfter:[],exposed:[],tipAnimationFadeSpeed:300,cookieMonster:false,cookieName:"joyride",cookieDomain:false,cookieExpires:365,tipContainer:"body",postRideCallback:function(){},postStepCallback:function(){},preStepCallback:function(){},preRideCallback:function(){},postExposeCallback:function(){},template:{link:'<a href="#close" class="joyride-close-tip">×</a>',timer:'<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',tip:'<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',wrapper:'<div class="joyride-content-wrapper"></div>',button:'<a href="#" class="small button joyride-next-tip"></a>',modal:'<div class="joyride-modal-bg"></div>',expose:'<div class="joyride-expose-wrapper"></div>',exposeCover:'<div class="joyride-expose-cover"></div>'},exposeAddClass:""},settings:{},init:function(t,n,r){this.scope=t||this.scope;Foundation.inherit(this,"throttle data_options scrollTo scrollLeft delay");if(typeof n==="object"){e.extend(true,this.settings,this.defaults,n)}else{e.extend(true,this.settings,this.defaults,r)}if(typeof n!=="string"){if(!this.settings.init)this.events();return this.settings.init}else{return this[n].call(this,r)}},events:function(){var n=this;e(this.scope).on("click.joyride",".joyride-next-tip, .joyride-modal-bg",function(e){e.preventDefault();if(this.settings.$li.next().length<1){this.end()}else if(this.settings.timer>0){clearTimeout(this.settings.automate);this.hide();this.show();this.startTimer()}else{this.hide();this.show()}}.bind(this)).on("click.joyride",".joyride-close-tip",function(e){e.preventDefault();this.end()}.bind(this));e(t).on("resize.fndtn.joyride",n.throttle(function(){if(e("[data-joyride]").length>0&&n.settings.$next_tip){if(n.settings.exposed.length>0){var t=e(n.settings.exposed);t.each(function(){var t=e(this);n.un_expose(t);n.expose(t)})}if(n.is_phone()){n.pos_phone()}else{n.pos_default(false,true)}}},100));this.settings.init=true},start:function(){var t=this,n=e(this.scope).find("[data-joyride]"),r=["timer","scrollSpeed","startOffset","tipAnimationFadeSpeed","cookieExpires"],i=r.length;if(!this.settings.init)this.events();this.settings.$content_el=n;this.settings.$body=e(this.settings.tipContainer);this.settings.body_offset=e(this.settings.tipContainer).position();this.settings.$tip_content=this.settings.$content_el.find("> li");this.settings.paused=false;this.settings.attempts=0;this.settings.tipLocationPatterns={top:["bottom"],bottom:[],left:["right","top","bottom"],right:["left","top","bottom"]};if(typeof e.cookie!=="function"){this.settings.cookieMonster=false}if(!this.settings.cookieMonster||this.settings.cookieMonster&&e.cookie(this.settings.cookieName)===null){this.settings.$tip_content.each(function(n){var s=e(this);e.extend(true,t.settings,t.data_options(s));for(var o=i-1;o>=0;o--){t.settings[r[o]]=parseInt(t.settings[r[o]],10)}t.create({$li:s,index:n})});if(!this.settings.startTimerOnClick&&this.settings.timer>0){this.show("init");this.startTimer()}else{this.show("init")}}},resume:function(){this.set_li();this.show()},tip_template:function(t){var n,r;t.tip_class=t.tip_class||"";n=e(this.settings.template.tip).addClass(t.tip_class);r=e.trim(e(t.li).html())+this.button_text(t.button_text)+this.settings.template.link+this.timer_instance(t.index);n.append(e(this.settings.template.wrapper));n.first().attr("data-index",t.index);e(".joyride-content-wrapper",n).append(r);return n[0]},timer_instance:function(t){var n;if(t===0&&this.settings.startTimerOnClick&&this.settings.timer>0||this.settings.timer===0){n=""}else{n=this.outerHTML(e(this.settings.template.timer)[0])}return n},button_text:function(t){if(this.settings.nextButton){t=e.trim(t)||"Next";t=this.outerHTML(e(this.settings.template.button).append(t)[0])}else{t=""}return t},create:function(t){var n=t.$li.attr("data-button")||t.$li.attr("data-text"),r=t.$li.attr("class"),i=e(this.tip_template({tip_class:r,index:t.index,button_text:n,li:t.$li}));e(this.settings.tipContainer).append(i)},show:function(t){var n=null;if(this.settings.$li===r||e.inArray(this.settings.$li.index(),this.settings.pauseAfter)===-1){if(this.settings.paused){this.settings.paused=false}else{this.set_li(t)}this.settings.attempts=0;if(this.settings.$li.length&&this.settings.$target.length>0){if(t){this.settings.preRideCallback(this.settings.$li.index(),this.settings.$next_tip);if(this.settings.modal){this.show_modal()}}this.settings.preStepCallback(this.settings.$li.index(),this.settings.$next_tip);if(this.settings.modal&&this.settings.expose){this.expose()}this.settings.tipSettings=e.extend(this.settings,this.data_options(this.settings.$li));this.settings.timer=parseInt(this.settings.timer,10);this.settings.tipSettings.tipLocationPattern=this.settings.tipLocationPatterns[this.settings.tipSettings.tipLocation];if(!/body/i.test(this.settings.$target.selector)){this.scroll_to()}if(this.is_phone()){this.pos_phone(true)}else{this.pos_default(true)}n=this.settings.$next_tip.find(".joyride-timer-indicator");if(/pop/i.test(this.settings.tipAnimation)){n.width(0);if(this.settings.timer>0){this.settings.$next_tip.show();this.delay(function(){n.animate({width:n.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tipAnimationFadeSpeed)}else{this.settings.$next_tip.show()}}else if(/fade/i.test(this.settings.tipAnimation)){n.width(0);if(this.settings.timer>0){this.settings.$next_tip.fadeIn(this.settings.tipAnimationFadeSpeed).show();this.delay(function(){n.animate({width:n.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tipAnimationFadeSpeed)}else{this.settings.$next_tip.fadeIn(this.settings.tipAnimationFadeSpeed)}}this.settings.$current_tip=this.settings.$next_tip}else if(this.settings.$li&&this.settings.$target.length<1){this.show()}else{this.end()}}else{this.settings.paused=true}},is_phone:function(){if(i){return i.mq("only screen and (max-width: 767px)")||e(".lt-ie9").length>0}return e(t).width()<767},hide:function(){if(this.settings.modal&&this.settings.expose){this.un_expose()}if(!this.settings.modal){e(".joyride-modal-bg").hide()}this.settings.$current_tip.css("visibility","hidden");setTimeout(e.proxy(function(){this.hide();this.css("visibility","visible")},this.settings.$current_tip),0);this.settings.postStepCallback(this.settings.$li.index(),this.settings.$current_tip)},set_li:function(e){if(e){this.settings.$li=this.settings.$tip_content.eq(this.settings.startOffset);this.set_next_tip();this.settings.$current_tip=this.settings.$next_tip}else{this.settings.$li=this.settings.$li.next();this.set_next_tip()}this.set_target()},set_next_tip:function(){this.settings.$next_tip=e(".joyride-tip-guide[data-index='"+this.settings.$li.index()+"']");this.settings.$next_tip.data("closed","")},set_target:function(){var t=this.settings.$li.attr("data-class"),r=this.settings.$li.attr("data-id"),i=function(){if(r){return e(n.getElementById(r))}else if(t){return e("."+t).first()}else{return e("body")}};this.settings.$target=i()},scroll_to:function(){var n,r;n=e(t).height()/2;r=Math.ceil(this.settings.$target.offset().top-n+this.outerHeight(this.settings.$next_tip));if(r>0){this.scrollTo(e("html, body"),r,this.settings.scrollSpeed)}},paused:function(){return e.inArray(this.settings.$li.index()+1,this.settings.pauseAfter)===-1},restart:function(){this.hide();this.settings.$li=r;this.show("init")},pos_default:function(n,r){var i=Math.ceil(e(t).height()/2),s=this.settings.$next_tip.offset(),o=this.settings.$next_tip.find(".joyride-nub"),u=Math.ceil(this.outerWidth(o)/2),a=Math.ceil(this.outerHeight(o)/2),f=n||false;if(f){this.settings.$next_tip.css("visibility","hidden");this.settings.$next_tip.show()}if(typeof r==="undefined"){r=false}if(!/body/i.test(this.settings.$target.selector)){if(this.bottom()){var l=this.settings.$target.offset().left;if(Foundation.rtl){l=this.settings.$target.offset().width-this.settings.$next_tip.width()+l}this.settings.$next_tip.css({top:this.settings.$target.offset().top+a+this.outerHeight(this.settings.$target),left:l});this.nub_position(o,this.settings.tipSettings.nubPosition,"top")}else if(this.top()){var l=this.settings.$target.offset().left;if(Foundation.rtl){l=this.settings.$target.offset().width-this.settings.$next_tip.width()+l}this.settings.$next_tip.css({top:this.settings.$target.offset().top-this.outerHeight(this.settings.$next_tip)-a,left:l});this.nub_position(o,this.settings.tipSettings.nubPosition,"bottom")}else if(this.right()){this.settings.$next_tip.css({top:this.settings.$target.offset().top,left:this.outerWidth(this.settings.$target)+this.settings.$target.offset().left+u});this.nub_position(o,this.settings.tipSettings.nubPosition,"left")}else if(this.left()){this.settings.$next_tip.css({top:this.settings.$target.offset().top,left:this.settings.$target.offset().left-this.outerWidth(this.settings.$next_tip)-u});this.nub_position(o,this.settings.tipSettings.nubPosition,"right")}if(!this.visible(this.corners(this.settings.$next_tip))&&this.settings.attempts<this.settings.tipSettings.tipLocationPattern.length){o.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left");this.settings.tipSettings.tipLocation=this.settings.tipSettings.tipLocationPattern[this.settings.attempts];this.settings.attempts++;this.pos_default()}}else if(this.settings.$li.length){this.pos_modal(o)}if(f){this.settings.$next_tip.hide();this.settings.$next_tip.css("visibility","visible")}},pos_phone:function(t){var n=this.outerHeight(this.settings.$next_tip),r=this.settings.$next_tip.offset(),i=this.outerHeight(this.settings.$target),s=e(".joyride-nub",this.settings.$next_tip),o=Math.ceil(this.outerHeight(s)/2),u=t||false;s.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left");if(u){this.settings.$next_tip.css("visibility","hidden");this.settings.$next_tip.show()}if(!/body/i.test(this.settings.$target.selector)){if(this.top()){this.settings.$next_tip.offset({top:this.settings.$target.offset().top-n-o});s.addClass("bottom")}else{this.settings.$next_tip.offset({top:this.settings.$target.offset().top+i+o});s.addClass("top")}}else if(this.settings.$li.length){this.pos_modal(s)}if(u){this.settings.$next_tip.hide();this.settings.$next_tip.css("visibility","visible")}},pos_modal:function(e){this.center();e.hide();this.show_modal()},show_modal:function(){if(!this.settings.$next_tip.data("closed")){var t=e(".joyride-modal-bg");if(t.length<1){e("body").append(this.settings.template.modal).show()}if(/pop/i.test(this.settings.tipAnimation)){t.show()}else{t.fadeIn(this.settings.tipAnimationFadeSpeed)}}},expose:function(){var n,r,i,s,o,u="expose-"+Math.floor(Math.random()*1e4);if(arguments.length>0&&arguments[0]instanceof e){i=arguments[0]}else if(this.settings.$target&&!/body/i.test(this.settings.$target.selector)){i=this.settings.$target}else{return false}if(i.length<1){if(t.console){console.error("element not valid",i)}return false}n=e(this.settings.template.expose);this.settings.$body.append(n);n.css({top:i.offset().top,left:i.offset().left,width:this.outerWidth(i,true),height:this.outerHeight(i,true)});r=e(this.settings.template.exposeCover);s={zIndex:i.css("z-index"),position:i.css("position")};o=i.attr("class")==null?"":i.attr("class");i.css("z-index",parseInt(n.css("z-index"))+1);if(s.position=="static"){i.css("position","relative")}i.data("expose-css",s);i.data("orig-class",o);i.attr("class",o+" "+this.settings.exposeAddClass);r.css({top:i.offset().top,left:i.offset().left,width:this.outerWidth(i,true),height:this.outerHeight(i,true)});this.settings.$body.append(r);n.addClass(u);r.addClass(u);i.data("expose",u);this.settings.postExposeCallback(this.settings.$li.index(),this.settings.$next_tip,i);this.add_exposed(i)},un_expose:function(){var n,r,i,s,o,u=false;if(arguments.length>0&&arguments[0]instanceof e){r=arguments[0]}else if(this.settings.$target&&!/body/i.test(this.settings.$target.selector)){r=this.settings.$target}else{return false}if(r.length<1){if(t.console){console.error("element not valid",r)}return false}n=r.data("expose");i=e("."+n);if(arguments.length>1){u=arguments[1]}if(u===true){e(".joyride-expose-wrapper,.joyride-expose-cover").remove()}else{i.remove()}s=r.data("expose-css");if(s.zIndex=="auto"){r.css("z-index","")}else{r.css("z-index",s.zIndex)}if(s.position!=r.css("position")){if(s.position=="static"){r.css("position","")}else{r.css("position",s.position)}}o=r.data("orig-class");r.attr("class",o);r.removeData("orig-classes");r.removeData("expose");r.removeData("expose-z-index");this.remove_exposed(r)},add_exposed:function(t){this.settings.exposed=this.settings.exposed||[];if(t instanceof e||typeof t==="object"){this.settings.exposed.push(t[0])}else if(typeof t=="string"){this.settings.exposed.push(t)}},remove_exposed:function(t){var n,r;if(t instanceof e){n=t[0]}else if(typeof t=="string"){n=t}this.settings.exposed=this.settings.exposed||[];r=this.settings.exposed.length;for(var i=0;i<r;i++){if(this.settings.exposed[i]==n){this.settings.exposed.splice(i,1);return}}},center:function(){var n=e(t);this.settings.$next_tip.css({top:(n.height()-this.outerHeight(this.settings.$next_tip))/2+n.scrollTop(),left:(n.width()-this.outerWidth(this.settings.$next_tip))/2+this.scrollLeft(n)});return true},bottom:function(){return/bottom/i.test(this.settings.tipSettings.tipLocation)},top:function(){return/top/i.test(this.settings.tipSettings.tipLocation)},right:function(){return/right/i.test(this.settings.tipSettings.tipLocation)},left:function(){return/left/i.test(this.settings.tipSettings.tipLocation)},corners:function(n){var r=e(t),i=r.height()/2,s=Math.ceil(this.settings.$target.offset().top-i+this.settings.$next_tip.outerHeight()),o=r.width()+this.scrollLeft(r),u=r.height()+s,a=r.height()+r.scrollTop(),f=r.scrollTop();if(s<f){if(s<0){f=0}else{f=s}}if(u>a){a=u}return[n.offset().top<f,o<n.offset().left+n.outerWidth(),a<n.offset().top+n.outerHeight(),this.scrollLeft(r)>n.offset().left]},visible:function(e){var t=e.length;while(t--){if(e[t])return false}return true},nub_position:function(e,t,n){if(t==="auto"){e.addClass(n)}else{e.addClass(t)}},startTimer:function(){if(this.settings.$li.length){this.settings.automate=setTimeout(function(){this.hide();this.show();this.startTimer()}.bind(this),this.settings.timer)}else{clearTimeout(this.settings.automate)}},end:function(){if(this.settings.cookieMonster){e.cookie(this.settings.cookieName,"ridden",{expires:this.settings.cookieExpires,domain:this.settings.cookieDomain})}if(this.settings.timer>0){clearTimeout(this.settings.automate)}if(this.settings.modal&&this.settings.expose){this.un_expose()}this.settings.$next_tip.data("closed",true);e(".joyride-modal-bg").hide();this.settings.$current_tip.hide();this.settings.postStepCallback(this.settings.$li.index(),this.settings.$current_tip);this.settings.postRideCallback(this.settings.$li.index(),this.settings.$current_tip);e(".joyride-tip-guide").remove()},outerHTML:function(e){return e.outerHTML||(new XMLSerializer).serializeToString(e)},off:function(){e(this.scope).off(".joyride");e(t).off(".joyride");e(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride");e(".joyride-tip-guide, .joyride-modal-bg").remove();clearTimeout(this.settings.automate);this.settings={}},reflow:function(){}}})(Foundation.zj,this,this.document)