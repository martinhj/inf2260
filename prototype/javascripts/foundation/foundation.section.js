(function(e,t,n){"use strict";Foundation.libs.section={name:"section",version:"4.3.2",settings:{deep_linking:false,one_up:true,multi_expand:false,section_selector:"[data-section]",region_selector:"section, .section, [data-section-region]",title_selector:".title, [data-section-title]",resized_data_attr:"data-section-resized",small_style_data_attr:"data-section-small-style",content_selector:".content, [data-section-content]",nav_selector:'[data-section="vertical-nav"], [data-section="horizontal-nav"]',active_class:"active",callback:function(){}},init:function(t,n,r){var i=this;Foundation.inherit(this,"throttle data_options position_right offset_right");if(typeof n==="object"){e.extend(true,i.settings,n)}if(typeof n!=="string"){this.events();return true}else{return this[n].call(this,r)}},events:function(){var r=this;var i=[],s=r.settings.section_selector,o=r.settings.region_selector.split(","),u=r.settings.title_selector.split(",");for(var a=0,f=o.length;a<f;a++){var l=o[a];for(var c=0,h=u.length;c<h;c++){var p=s+">"+l+">"+u[c];i.push(p+" a");i.push(p)}}e(r.scope).on("click.fndtn.section",i.join(","),function(t){var n=e(this).closest(r.settings.title_selector);r.close_navs(n);if(n.siblings(r.settings.content_selector).length>0){r.toggle_active.call(n[0],t)}});e(t).on("resize.fndtn.section",r.throttle(function(){r.resize()},30)).on("hashchange.fndtn.section",r.set_active_from_hash);e(n).on("click.fndtn.section",function(t){if(t.isPropagationStopped&&t.isPropagationStopped())return;if(t.target===n)return;r.close_navs(e(t.target).closest(r.settings.title_selector))});e(t).triggerHandler("resize.fndtn.section");e(t).triggerHandler("hashchange.fndtn.section")},close_navs:function(t){var n=Foundation.libs.section,r=e(n.settings.nav_selector).filter(function(){return!e.extend({},n.settings,n.data_options(e(this))).one_up});if(t.length>0){var i=t.parent().parent();if(n.is_horizontal_nav(i)||n.is_vertical_nav(i)){r=r.filter(function(){return this!==i[0]})}}r.children(n.settings.region_selector).removeClass(n.settings.active_class)},supports_multi_expand:function(t){var n=Foundation.libs.section,r=e.extend({},n.settings,n.data_options(t));return n.is_accordion(t)&&r.multi_expand},can_close:function(t){var n=Foundation.libs.section,r=t.parent(),i=e.extend({},n.settings,n.data_options(r));return!i.one_up},should_show_one:function(t){var n=Foundation.libs.section,r=e.extend({},n.settings,n.data_options(t));return r.one_up&&!n.is_horizontal_nav(t)&&!n.is_vertical_nav(t)},ensure_region_shown:function(t){var n=Foundation.libs.section,r=e.extend({},n.settings,n.data_options(t)),i=t.children(n.settings.region_selector);if(i.filter("."+r.active_class).length==0){i.filter(":visible").first().addClass(r.active_class)}},toggle_active:function(n){var r=e(this),i=Foundation.libs.section,s=r.parent(),o=r.siblings(i.settings.content_selector),u=s.parent(),a=e.extend({},i.settings,i.data_options(u)),f=u.children(i.settings.region_selector).filter("."+i.settings.active_class);if(!a.deep_linking&&o.length>0){n.preventDefault()}n.stopPropagation();if(!s.hasClass(i.settings.active_class)){if(!i.supports_multi_expand(u)){f.removeClass(i.settings.active_class);f.trigger("closed.fndtn.section")}s.addClass(i.settings.active_class);i.resize(s.find(i.settings.section_selector).not("["+i.settings.resized_data_attr+"]"),true);s.trigger("opened.fndtn.section")}else if(i.can_close(s)){n.preventDefault();if(a.deep_linking){t.location.hash=""}s.removeClass(i.settings.active_class);s.trigger("closed.fndtn.section")}a.callback(u)},check_resize_timer:null,resize:function(t,n){var r=Foundation.libs.section,i=e(r.settings.section_selector),s=!matchMedia(Foundation.media_queries["small"]).matches,o=function(e,t){return!r.is_accordion(e)&&!e.is("["+r.settings.resized_data_attr+"]")&&(!s||r.is_horizontal_tabs(e))&&t===(e.css("display")==="none"||!e.parent().is(":visible"))};t=t||e(r.settings.section_selector);clearTimeout(r.check_resize_timer);if(!s){t.removeAttr(r.settings.small_style_data_attr)}t.filter(function(){return o(e(this),false)}).each(function(){var t=e(this),i=t.children(r.settings.region_selector),s=i.children(r.settings.title_selector),o=i.children(r.settings.content_selector),u=0;if(n){var a=e.extend({},r.settings,r.data_options(t));if(r.should_show_one(t)){r.ensure_region_shown(t)}}if(r.is_horizontal_tabs(t)||r.is_auto(t)){var f=0;s.each(function(){var t=e(this);if(t.is(":visible")){t.css(!r.rtl?"left":"right",f);var n=parseInt(t.css("border-"+(r.rtl?"left":"right")+"-width"),10);if(n.toString()==="Nan"){n=0}f+=r.outerWidth(t)-n;u=Math.max(u,r.outerHeight(t))}});s.css("height",u);i.each(function(){var t=e(this),n=t.children(r.settings.content_selector),i=parseInt(n.css("border-top-width"),10);if(i.toString()==="Nan"){i=0}t.css("padding-top",u-i)});t.css("min-height",u)}else if(r.is_horizontal_nav(t)){var l=true;s.each(function(){u=Math.max(u,r.outerHeight(e(this)))});i.each(function(){var n=e(this);n.css("margin-left","-"+(l?t:n.children(r.settings.title_selector)).css("border-left-width"));l=false});i.css("margin-top","-"+t.css("border-top-width"));s.css("height",u);o.css("top",u);t.css("min-height",u)}else if(r.is_vertical_tabs(t)){var c=0;s.each(function(){var t=e(this);if(t.is(":visible")){t.css("top",c);var n=parseInt(t.css("border-top-width"),10);if(n.toString()==="Nan"){n=0}c+=r.outerHeight(t)-n}});o.css("min-height",c+1)}else if(r.is_vertical_nav(t)){var h=0,p=true;s.each(function(){h=Math.max(h,r.outerWidth(e(this)))});i.each(function(){var n=e(this);n.css("margin-top","-"+(p?t:n.children(r.settings.title_selector)).css("border-top-width"));p=false});s.css("width",h);o.css(!r.rtl?"left":"right",h);t.css("width",h)}t.attr(r.settings.resized_data_attr,true)});if(e(r.settings.section_selector).filter(function(){return o(e(this),true)}).length>0)r.check_resize_timer=setTimeout(function(){r.resize(t.filter(function(){return o(e(this),false)}),true)},700);if(s){t.attr(r.settings.small_style_data_attr,true)}},is_vertical_nav:function(e){return/vertical-nav/i.test(e.data("section"))},is_horizontal_nav:function(e){return/horizontal-nav/i.test(e.data("section"))},is_accordion:function(e){return/accordion/i.test(e.data("section"))},is_horizontal_tabs:function(e){return/^tabs$/i.test(e.data("section"))},is_vertical_tabs:function(e){return/vertical-tabs/i.test(e.data("section"))},is_auto:function(e){var t=e.data("section");return t===""||/auto/i.test(t)},set_active_from_hash:function(){var n=Foundation.libs.section,r=t.location.hash.substring(1),i=e(n.settings.section_selector);i.each(function(){var t=e(this),i=e.extend({},n.settings,n.data_options(t)),s=i.deep_linking&&r.length>0,o=false,u=[],a=t.children(n.settings.region_selector);a.each(function(){var t=e(this),s="^"+t.children(n.settings.content_selector).data("slug")+"$";if(!o&&(new RegExp(s,"i")).test(r)){o=true;t.addClass(n.settings.active_class)}else if(!i.multi_expand){u.push(t)}});if(o){while(region=u.pop()){region.removeClass(n.settings.active_class)}return false}else{if(n.should_show_one(t)){n.ensure_region_shown(t)}}})},reflow:function(){var t=Foundation.libs.section;e(t.settings.section_selector).removeAttr(t.settings.resized_data_attr);t.throttle(function(){t.resize()},30)()},small:function(t){if(this.is_horizontal_tabs(t)){return false}if(t&&this.is_accordion(t)){return true}if(e("html").hasClass("lt-ie9")){return true}if(e("html").hasClass("ie8compat")){return true}return!matchMedia(Foundation.media_queries["small"]).matches},off:function(){e(this.scope).off(".fndtn.section");e(t).off(".fndtn.section");e(n).off(".fndtn.section")}};e.fn.reflow_section=function(e){var t=this,n=Foundation.libs.section;t.removeAttr(n.settings.resized_data_attr);n.throttle(function(){n.resize(t,e)},30)();return this}})(Foundation.zj,window,document)