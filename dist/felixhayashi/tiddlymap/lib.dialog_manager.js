/*\

title: $:/plugins/felixhayashi/tiddlymap/dialog_manager.js
type: application/javascript
module-type: library

@module TiddlyMap
@preserve

\*/
(function(){"use strict";var t=require("$:/plugins/felixhayashi/tiddlymap/utils.js").utils;var e=require("$:/plugins/felixhayashi/tiddlymap/callback_manager.js").CallbackManager;var i=function(t,e){this.wiki=$tw.wiki;this.logger=$tw.tmap.logger;this.adapter=$tw.tmap.adapter;this.opt=$tw.tmap.opt;this.callbackManager=t;if(e){this.context=e}};i.prototype.open=function(e,i,a){if(t.isTrue(this.opt.config.sys.suppressedDialogs[e],false)){this.logger("warning","Suppressed dialog",e);return}if(!i){i={}}this.logger("debug","Dialog param object",i);if(typeof a==="function"&&this.context){a=a.bind(this.context)}var r=this.opt.path.tempRoot+"/dialog-"+t.genUUID();var l={title:r,buttons:"ok_cancel",output:r+"/output",result:r+"/result",temp:r+"/temp",templateId:e,currentTiddler:r+"/output"};if(i.dialog){if(i.dialog.preselects){this.wiki.addTiddler(new $tw.Tiddler({title:l.output},i.dialog.preselects));delete i.dialog.preselects}t.merge(l,i.dialog)}l.footer=t.getText(this.opt.path.footers);l=t.flatten(l);i=t.flatten(i);this.callbackManager.add(l.result,function(e){this.getElement("hidden-close-button").click();var i=this.wiki.getTiddler(e);var s=i.fields.text;if(s){var n=this.wiki.getTiddler(l.output)}else{var n=null;$tw.tmap.notify("operation cancelled")}if(typeof a==="function"){a(s,n)}var o=t.getMatches("[prefix["+r+"]]");t.deleteTiddlers(o)}.bind(this),true);var s=t.getTiddler(this.opt.path.dialogs+"/"+e);var n=new $tw.Tiddler(s,i,l);this.wiki.addTiddler(n);this.logger("debug","Opening dialog",n);$tw.rootWidget.dispatchEvent({type:"tm-modal",param:n.fields.title,paramObject:n.fields});this.addKeyBindings();return n};i.prototype.getElement=function(e){return t.getFirstElementByClassName("tmap-"+e)};i.prototype.addKeyBindings=function(){var e=$tw.tmap.keycharm({container:t.getFirstElementByClassName("tc-modal")});var i=/tmap-triggers-(.+?)-on-(.+?)(?:\s|$)/;var a=document.getElementsByClassName("tmap-trigger-field");for(var r=0;r<a.length;r++){var l=a[r].className.split(" ");for(var s=0;s<l.length;s++){var n=l[s].match(i);if(!n){continue}var o=n[1];var d=n[2];var p=this.getElement(o);if(!p)continue;e.bind(d,function(){this.click()}.bind(p))}}};exports.DialogManager=i})();