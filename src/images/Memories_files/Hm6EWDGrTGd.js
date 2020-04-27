if (self.CavalryLogger) { CavalryLogger.start_js(["4EQrb"]); }

__d("SUIBusinessThemeContainer.react",["React","SUIBusinessTheme","SUIThemeContainer.react"],(function(a,b,c,d,e,f){"use strict";var g=b("React");a=function(a){babelHelpers.inheritsLoose(c,a);function c(){return a.apply(this,arguments)||this}var d=c.prototype;d.render=function(){return g.jsx(b("SUIThemeContainer.react"),{theme:b("SUIBusinessTheme"),children:this.props.children})};return c}(g.PureComponent);e.exports=a}),null);
__d("FDSLink.react",["FDSPrivateThemeContext.react","React","SUILink.react","getSUILinkUniform.fds","makeFDSStandardComponent","makeSUIThemeGetter"],(function(a,b,c,d,e,f){"use strict";var g=b("React"),h=b("makeSUIThemeGetter")({SUILink:b("getSUILinkUniform.fds")});a=function(a){babelHelpers.inheritsLoose(c,a);function c(){return a.apply(this,arguments)||this}var d=c.prototype;d.render=function(){var a=this.props,c=h(this.context);return g.jsx(b("SUILink.react"),{"data-testid":a["data-testid"],display:a.display,href:a.href,isInverseColor:a.isInverseColor,margin:a.margin,onClick:a.onClick,rel:a.rel,showUnderline:a.showUnderline,target:a.target,theme:c,width:a.width,children:a.children})};return c}(g.PureComponent);a.contextType=b("FDSPrivateThemeContext.react");a.defaultProps={display:"inlineBlock",isInverseColor:!1,showUnderline:"hover"};e.exports=b("makeFDSStandardComponent")("FDSLink",a)}),null);
__d("DragDropFileUpload",[],(function(a,b,c,d,e,f){f.isSupported=function(){return typeof FileList!=="undefined"}}),null);
__d("DocumentDragDrop",["Arbiter","CSS","DOMQuery","DragDropFileUpload","Event","emptyFunction","getObjectValues","getOrCreateDOMID"],(function(a,b,c,d,e,f){var g={},h=0;function i(){h=0,b("getObjectValues")(g).forEach(function(a){b("CSS").removeClass(a.element,a.className),b("Arbiter").inform("dragleave",{element:a.element})})}var j=null;function k(){j&&clearTimeout(j),j=setTimeout(function(){i()},500)}var l=function(){if(!b("DragDropFileUpload").isSupported())return;b("Event").listen(document,"dragenter",function(a){h===0&&b("getObjectValues")(g).forEach(function(c){b("CSS").addClass(c.element,c.className),b("Arbiter").inform("dragenter",{element:c.element,event:a})}),h++,k()});b("Event").listen(document,"dragleave",function(a){h--,h===0&&i(),k()});b("Event").listen(document,"drop",function(a){i();var c=a.getTarget();if(b("DOMQuery").isNodeOfType(a.getTarget(),"input")&&c.type==="file")return;a.prevent()});b("Event").listen(document,"dragover",b("Event").prevent);document.addEventListener("dragover",k,!0);l=b("emptyFunction")};a={init:function(){l()},registerStatusElement:function(a,c){l(),g[b("getOrCreateDOMID")(a)]={element:a,className:c},h>0&&b("CSS").addClass(a,c)},removeStatusElement:function(a){a=b("getOrCreateDOMID")(a);var c=g[a];c&&(b("CSS").removeClass(c.element,c.className),delete g[a])}};e.exports=a}),null);
__d("DragDropTarget",["Arbiter","CSS","DataTransfer","DocumentDragDrop","DragDropFileUpload","Event","SubscriptionsHandler","emptyFunction"],(function(a,b,c,d,e,f){function a(a){this._element=a,this._listeners=new(b("SubscriptionsHandler"))(),this._statusElem=a,this._dragEnterCount=0,this._enabled=!1,this._traverseFoldersRecursively=!1}Object.assign(a.prototype,{_onFilesDropCallback:c=b("emptyFunction"),_onFolderDropLogging:c,_onURLDropCallback:c,_onPlainTextDropCallback:c,_onDropCallback:c,_fileFilterFn:c.thatReturnsArgument,setOnDocumentDragEnterCallback:function(a){this._onDocumentDragEnterCallback=a;return this},setOnDocumentDragLeaveCallback:function(a){this._onDocumentDragLeaveCallback=a;return this},setOnDragEnterCallback:function(a){this._onDragEnterCallback=a;return this},setOnDragLeaveCallback:function(a){this._onDragLeaveCallback=a;return this},setOnFilesDropCallback:function(a){this._onFilesDropCallback=a;return this},setOnFolderDropLogging:function(a){this._onFolderDropLogging=a;return this},setOnURLDropCallback:function(a){this._onURLDropCallback=a;return this},setOnPlainTextDropCallback:function(a){this._onPlainTextDropCallback=a;return this},setOnDropCallback:function(a){this._onDropCallback=a;return this},setTraverseFoldersRecursively:function(a){this._traverseFoldersRecursively=a;return this},_uploadData:function(a,b,c){var d={},e=!1;c.length&&(this._onFilesDropCallback(c,b),d.files=c,e=!0);c=a.getLink();c&&(this._onURLDropCallback(c,b),d.url=c,e=!0);c=a.getText();c&&(this._onPlainTextDropCallback(c,b),d.plainText=c,e=!0);e&&this._onDropCallback(d,b)},enable:function(){if(!b("DragDropFileUpload").isSupported())return this;this._listeners.engage();b("DocumentDragDrop").registerStatusElement(this._statusElem,"fbWantsDragDrop");this._listeners.addSubscriptions(b("Event").listen(this._element,"dragenter",this._onDragEnter.bind(this)),b("Event").listen(this._element,"dragleave",this._onDragLeave.bind(this)),b("Event").listen(this._element,"dragover",this._onDragOver.bind(this)),b("Event").listen(this._element,"drop",function(a){var c=this,d;this._dragEnterCount=0;(d=b("CSS")).removeClass(this._statusElem,"fbDropReady");d.removeClass(this._statusElem,"fbDropReadyPhoto");d.removeClass(this._statusElem,"fbDropReadyPhotos");d.removeClass(this._statusElem,"fbDropReadyLink");var e=new(b("DataTransfer"))(a.dataTransfer);if(this._traverseFoldersRecursively){(d=e.getRecursiveFiles(this._onFolderDropLogging))==null?void 0:d.then(function(b){c._uploadData(e,a,c._fileFilterFn(b))})}else this._uploadData(e,a,this._fileFilterFn(a.dataTransfer.files));a.kill()}.bind(this)));this._listeners.addSubscriptions(b("Arbiter").subscribe("dragenter",this._onDocumentDragEnter.bind(this)),b("Arbiter").subscribe("dragleave",this._onDocumentDragLeave.bind(this)));this._enabled=!0;return this},disable:function(){if(!this._enabled)return this;b("DocumentDragDrop").removeStatusElement(this._statusElem,"fbWantsDragDrop");b("CSS").removeClass(this._statusElem,"fbDropReady");b("CSS").removeClass(this._statusElem,"fbDropReadyPhoto");b("CSS").removeClass(this._statusElem,"fbDropReadyPhotos");b("CSS").removeClass(this._statusElem,"fbDropReadyLink");this._listeners.release();this._enabled=!1;return this},setFileFilter:function(a){this._fileFilterFn=a;return this},setStatusElement:function(a){this._statusElem=a;return this},_onDragEnter:function(a){if(this._dragEnterCount===0){var c=new(b("DataTransfer"))(a.dataTransfer);b("CSS").addClass(this._statusElem,"fbDropReady");c.isLink()||!c.isImage()?b("CSS").addClass(this._statusElem,"fbDropReadyLink"):c.getCount()>1?b("CSS").addClass(this._statusElem,"fbDropReadyPhotos"):b("CSS").addClass(this._statusElem,"fbDropReadyPhoto");this._onDragEnterCallback&&this._onDragEnterCallback()}this._dragEnterCount++;a.preventDefault()},_onDragLeave:function(a){this._dragEnterCount=Math.max(this._dragEnterCount-1,0);if(this._dragEnterCount===0){(a=b("CSS")).removeClass(this._statusElem,"fbDropReady");a.removeClass(this._statusElem,"fbDropReadyPhoto");a.removeClass(this._statusElem,"fbDropReadyPhotos");a.removeClass(this._statusElem,"fbDropReadyLink");this._onDragLeaveCallback&&this._onDragLeaveCallback()}},_onDragOver:function(a){if(!a.dataTransfer){b("Event").kill(a);return}try{var c=a.dataTransfer.effectAllowed;a.dataTransfer.dropEffect=c=="move"||c=="linkMove"?"move":"copy"}catch(a){}b("Event").kill(a)},_onDocumentDragEnter:function(a,b){this._onDocumentDragEnterCallback&&b.element==this._element&&this._onDocumentDragEnterCallback()},_onDocumentDragLeave:function(a,b){this._dragEnterCount=0,this._onDragLeave(a),this._onDocumentDragLeaveCallback&&b.element==this._element&&this._onDocumentDragLeaveCallback()}});e.exports=a}),null);
__d("configureTimezones",["RulesTimezoneTransitionProvider","Timezone","TimezoneNamesData","TimezoneRulesFrom2009"],(function(a,b,c,d,e,f){"use strict";function a(){b("Timezone").registerNamesModule(b("TimezoneNamesData")),b("Timezone").registerRulesModule(b("RulesTimezoneTransitionProvider"),b("TimezoneRulesFrom2009"))}e.exports=a}),null);
__d("WorkChatDoNotDisturbStatusImpl.react",["ix","Image.react","MercuryIDs","React","asset"],(function(a,b,c,d,e,f,g){"use strict";var h=b("React");function a(a){var c=a.thread;if(!c)return null;c=b("MercuryIDs").getUserIDFromThreadID(c.thread_id);return c==null?null:a.isDoNotDisturb?h.jsx(b("Image.react"),{className:a.className,src:g("550343"),"data-tooltip-content":a.description,"data-hover":"tooltip"}):null}e.exports=a}),null);
__d("PhotoStoreCore",[],(function(a,b,c,d,e,f){var g={actions:{UPDATE:"update"},_photoCache:{},_postCreateCallbacks:{},getPhotoCache:function(a){if(!this._photoCache[a])throw new Error("Photo cache requested for unknown set ID");return this._photoCache[a]},hasBeenCreated:function(a){return!!this._photoCache[a]},clearSetCache:function(a){delete this._photoCache[a],delete this._postCreateCallbacks[a]},getByIndex:function(a,b,c){this.getPhotoCache(a).getItemAtIndex(b,c)},getByIndexImmediate:function(a,b){return this._photoCache[a]?this._photoCache[a].getItemAtIndexImmediate(b):void 0},getItemsInAvailableRange:function(a){var b=this.getAvailableRange(a),c=[];for(var d=b.offset;d<b.length;d++)c.push(this.getByIndexImmediate(a,d));return c},getItemsAfterIndex:function(a,b,c,d){b=this.getCursorByIndexImmediate(a,b);this.fetchForward(a,b,c,d)},getAllByIDImmediate:function(a){var b=this,c=Object.keys(this._photoCache);return c.map(function(c){return b.getByIndexImmediate(c,b.getIndexForID(c,a))}).filter(function(a){return!!a})},getIndexForID:function(a,b){return this._photoCache[a]?this._photoCache[a].getIndexForID(b):void 0},getEndIndex:function(a){a=this.getAvailableRange(a);return a.offset+a.length-1},getCursorByIndexImmediate:function(a,b){b=this.getByIndexImmediate(a,b);return b?this._photoCache[a].getCursorForID(b.id):void 0},hasNextPage:function(a){var b=this.getCursorByIndexImmediate(a,this.getEndIndex(a));return this.getPhotoCache(a).hasNextPage(b)},getAvailableRange:function(a){return this.getPhotoCache(a).getAvailableRange()},hasLooped:function(a){return this.getPhotoCache(a).hasLooped()},fetchForward:function(a,b,c,d){this.getPhotoCache(a).getItemsAfterCursor(b,c,d)},fetchBackward:function(a,b,c,d){this.getPhotoCache(a).getItemsBeforeCursor(b,c,d)},executePostCreate:function(a,b){this._photoCache[a]?b&&b():this._postCreateCallbacks[a]=b},runPostCreateCallback:function(a){var b=this._postCreateCallbacks[a];b&&(b(),delete this._postCreateCallbacks[a])},setPreFetchCallback:function(a,b){this.getPhotoCache(a).setPreFetchCallback(b)},updateData:function(a){var b=a.set_id;!this._photoCache[b]?(this._photoCache[b]=new a.cache_class(a),this.runPostCreateCallback(b)):a.query_metadata.action==g.actions.UPDATE?this._photoCache[b].updateData(a):this._photoCache[b].addData(a)},updateFeedbackData:function(a){var b=Object.keys(a);b.forEach(function(b){return g.getAllByIDImmediate(b).forEach(function(c){c.feedback=a[b].feedback})})},reset:function(){var a=this;Object.keys(this._photoCache).forEach(function(b){return a.clearSetCache(b)})}};e.exports=g}),null);
__d("PhotoStore",["Arbiter","PhotoStoreCore"],(function(a,b,c,d,e,f){b("Arbiter").subscribe("update-photos",function(a,c){b("PhotoStoreCore").updateData(c)}),e.exports=b("PhotoStoreCore")}),null);
__d("SearchSourceCallbackManager",["invariant","SearchSourceQueryStatus","createObjectFrom","nullthrows"],(function(a,b,c,d,e,f,g){var h=b("SearchSourceQueryStatus").ACTIVE,i=b("SearchSourceQueryStatus").COMPLETE;a=function(){"use strict";function a(a){this.$9=a.parseFn,typeof this.$9==="function"||g(0,4065),this.$8=a.matchFn,typeof this.$8==="function"||g(0,4066),this.$2=a.alwaysPrefixMatch||!1,this.$6=a.indexFn||j,this.$4=a.exclusions||{},this.reset()}var c=a.prototype;c.search=function(a,b){var c=this.$13(a,b);if(c)return 0;this.$1.push({queryString:a,callback:b});c=this.$1.length-1;this.$10.push(c);return c};c.$13=function(a,b){var c=this,d=this.$14(a),e=!!this.$5[a];if(!d.length){b([],a,e?i:h);return e}d=d.map(function(a){return c.$3[a]});b(d,a,e?i:h);return e};c.$15=function(){var a=this.$10;this.$10=[];a.forEach(this.$16,this)};c.$16=function(a){var b=this.$1[a];if(!b)return;b=this.$13(b.queryString,b.callback);if(b){delete this.$1[a];return}this.$10.push(a)};c.reset=function(){this.$3={},this.$12={},this.$7={},this.$11={},this.$5={},this.$10=[],this.$1=[void 0]};c.addLocalEntries=function(a){var b=this;a.forEach(function(a){var c=a.getUniqueID(),d=b.$6(a);b.$3[c]=a;b.$12[c]=d;a=b.$9(d);a.tokens.forEach(function(a){Object.prototype.hasOwnProperty.call(b.$7,a)||(b.$7[a]={}),b.$7[a][c]=!0})});this.$15()};c.addQueryEntries=function(a,c,d){var e=this;d===i&&this.setQueryStringAsExhausted(c);d=this.$14(c);var f=this.$9(c).flatValue;this.$11[f]=b("createObjectFrom")(d,!0);a.forEach(function(a){var b=a.getUniqueID();e.$3[b]=a;e.$12[b]=e.$6(a);e.$11[f][b]=!0});this.$15()};c.unsubscribe=function(a){delete this.$1[a]};c.removeEntry=function(a){delete this.$3[a]};c.getAllEntriesMap=function(){return this.$3};c.setQueryStringAsExhausted=function(a){this.$5[a]=!0};c.unsetQueryStringAsExhausted=function(a){delete this.$5[a]};c.$14=function(a){var b=this,c=this.$17(a,this.$18(a));a=this.$17(a,this.$19(a));c=c.concat(a);var d={},e=[];c.forEach(function(a){d[a]==null&&b.$3[a]!=null&&b.$4[a]==null&&(e.push(a),d[a]=!0)});return e};c.$17=function(a,b){var c=this.$20(a,b),d=this.$3;function e(a,b){if(c[a]!==c[b])return c[a]?-1:1;a=d[a];b=d[b];if(a.getOrder()!==b.getOrder())return a.getOrder()-b.getOrder();var e=a.getTitle().length,f=b.getTitle().length;return e!==f?e-f:a.getUniqueID()-b.getUniqueID()}return b.sort(e).slice()};c.$20=function(a,b){var c=this,d={};b.forEach(function(b){d[b]=c.$8(a,c.$12[b])});return d};c.$18=function(a){var c=this,d=this.$9(a,this.$2),e=this.$2?b("nullthrows")(d.sortedTokens):d.tokens,f=e.length,g=d.isPrefixQuery?f-1:null,h={},i={},j={};d=!1;var k={},l=0;e.forEach(function(a,b){if(Object.prototype.hasOwnProperty.call(k,a))return;l++;k[a]=!0;for(var e in c.$7){var f=e===a&&!Object.prototype.hasOwnProperty.call(h,e),m=!1;f||(m=(c.$2||g===b)&&e.indexOf(a)===0);if(!f&&!m){Object.prototype.hasOwnProperty.call(h,e)||(d=!0);continue}e===a?(Object.prototype.hasOwnProperty.call(i,e)&&(d=!0),h[e]=!0):((Object.prototype.hasOwnProperty.call(h,e)||Object.prototype.hasOwnProperty.call(i,e))&&(d=!0),i[e]=!0);for(var n in c.$7[e])(b===0||Object.prototype.hasOwnProperty.call(j,n)&&j[n]==l-1)&&(j[n]=l)}});e=Object.keys(j).filter(function(a){return j[a]==l});(d||l<f)&&(e=this.$21(a,e));return e};c.$19=function(a){var b=this.$9(a).flatValue,c=this.$22(b);return Object.prototype.hasOwnProperty.call(this.$11,b)?c:this.$21(a,c)};c.$22=function(a){var b=0,c=null,d=this.$11;Object.keys(d).forEach(function(d){a.indexOf(d)===0&&d.length>b&&(b=d.length,c=d)});return c&&Object.prototype.hasOwnProperty.call(d,c)?Object.keys(d[c]):[]};c.$21=function(a,b){var c=this;return b.filter(function(b){return c.$8(a,c.$12[b])})};return a}();function j(a){return[a.getTitle(),a.getKeywordString()].join(" ")}e.exports=a}),null);
__d("AbstractAsyncSearchSource",["AbstractSearchSource","SearchableEntry","SearchSourceCallbackManager","SearchSourceQueryStatus","TokenizeUtil","emptyFunction","isValidUniqueID"],(function(a,b,c,d,e,f){var g=b("SearchSourceQueryStatus").ACTIVE,h=b("SearchSourceQueryStatus").COMPLETE;a=function(a){"use strict";babelHelpers.inheritsLoose(c,a);function c(c,d,e){var f,g;g=a.call(this)||this;g.$AbstractAsyncSearchSource1=c.asyncErrorHandler||b("emptyFunction");g.$AbstractAsyncSearchSource2=c.auxiliaryFields;g.$AbstractAsyncSearchSource4=c.bootstrapRequests;g.$AbstractAsyncSearchSource7=c.getAllForEmptyQuery;g.$AbstractAsyncSearchSource8=c.getAllForBootstrapPrefix;g.$AbstractAsyncSearchSource9=c.bootstrapPrefix;g.$AbstractAsyncSearchSource11=c.packageFn||g.$AbstractAsyncSearchSource15;g.$AbstractAsyncSearchSource12=c.queryRequests;g.$AbstractAsyncSearchSource13=c.requestData||{};g.$AbstractAsyncSearchSource6=(f=c.entryModifier_USE_SPARINGLY)!=null?f:b("emptyFunction").thatReturnsArgument;g.$AbstractAsyncSearchSource3=[];g.$AbstractAsyncSearchSource5=new(b("SearchSourceCallbackManager"))({parseFn:(f=c.parseFn)!=null?f:b("TokenizeUtil").parse,matchFn:c.matchFn||b("TokenizeUtil").isQueryMatch,indexFn:c.indexFn,exclusions:c.exclusions});g.$AbstractAsyncSearchSource14=d;g.$AbstractAsyncSearchSource10=e;return g}var d=c.prototype;d.bootstrapImpl=function(a){var b=this,c=a;if(!this.$AbstractAsyncSearchSource4||!this.$AbstractAsyncSearchSource4.length){c();return}var d=this.$AbstractAsyncSearchSource4.length,e=0;this.$AbstractAsyncSearchSource4.forEach(function(a){b.$AbstractAsyncSearchSource16(b.$AbstractAsyncSearchSource13,a,function(a){a=a.map(function(a){return b.$AbstractAsyncSearchSource6(a)});b.$AbstractAsyncSearchSource5.addLocalEntries(a);b.$AbstractAsyncSearchSource3=b.$AbstractAsyncSearchSource3.concat(a);e++;c&&e===d&&(c(),c=null)})})};d.searchImpl=function(a,c,d){var e=this,f=this.$AbstractAsyncSearchSource9;if(this.$AbstractAsyncSearchSource7&&a===""||this.$AbstractAsyncSearchSource8&&a&&f&&a.trim().toLowerCase()===f.trim().toLowerCase()){this.getBootstrappedEntries(function(d){d=d.map(function(a){return e.$AbstractAsyncSearchSource6(a)});c(d,a,b("SearchSourceQueryStatus").COMPLETE)});return}var i=[],j={};f=this.$AbstractAsyncSearchSource5.search(a,function(b,a,f){if(d&&d.waitForAllResults&&f!==h)return;i.length===0?(i=b,i.forEach(function(a,b){j[a.getUniqueID()]=b})):b.forEach(function(a){a=e.$AbstractAsyncSearchSource6(a);var b=a.getUniqueID();if(!Object.prototype.hasOwnProperty.call(j,b)){var c=i.length;i.push(a);j[b]=c}else{c=j[b];c<i.length&&(i[c]=a)}});c(i,a,f)});if(!f||!this.$AbstractAsyncSearchSource12||!this.$AbstractAsyncSearchSource12.length)return;var k=babelHelpers["extends"]({value:a,existing_ids:d&&d.disableExistingIDs?"":i&&i.map(function(a){return a.getUniqueID()}).join(",")},this.$AbstractAsyncSearchSource13),l=this.$AbstractAsyncSearchSource12.length;this.$AbstractAsyncSearchSource12.forEach(function(b){e.$AbstractAsyncSearchSource16(k,b,function(b){l--;b=Array.from(b.reduce(function(a,b){b=e.$AbstractAsyncSearchSource6(b);var c=b.getUniqueID();if(a.has(c)){var d=a.get(c);d!=null&&b.getOrder()<d.getOrder()&&a.set(c,b)}else a.set(c,b);return a},new Map()).values());e.$AbstractAsyncSearchSource17(b,a,l?g:h)})})};d.getBootstrappedEntries=function(a){var b=this;return this.bootstrap(function(){return a(b.$AbstractAsyncSearchSource3||[])})};d.getAllEntriesMap=function(){return this.$AbstractAsyncSearchSource5.getAllEntriesMap()};d.setRequestData=function(a){this.$AbstractAsyncSearchSource13=a};d.getRequestData=function(){return this.$AbstractAsyncSearchSource13};d.setPackageResult=function(a){this.$AbstractAsyncSearchSource11=a};d.getCallbackManager=function(){return this.$AbstractAsyncSearchSource5};d.$AbstractAsyncSearchSource16=function(a,b,c){var d=this;this.$AbstractAsyncSearchSource14(a,b,function(a){return c(d.$AbstractAsyncSearchSource10(a,d.$AbstractAsyncSearchSource11).filter(Boolean))},this.$AbstractAsyncSearchSource1)};d.$AbstractAsyncSearchSource17=function(a,b,c){this.$AbstractAsyncSearchSource5.addQueryEntries(a,b,c)};d.$AbstractAsyncSearchSource15=function(a,c){var d=a.title||a.text,e=a.uniqueID||a.uid;return!d||!b("isValidUniqueID")(e)?null:new(b("SearchableEntry"))({uniqueID:e,order:a.order||a.index||c,title:d,subtitle:a.subtitle||a.category||a.subtext,keywordString:a.keywordString||a.tokens,type:a.type,photo:a.photo,uri:a.uri||a.path,auxiliaryData:this.$AbstractAsyncSearchSource18(a)})};d.$AbstractAsyncSearchSource18=function(a){var b;if(this.$AbstractAsyncSearchSource2){b={};for(var c in this.$AbstractAsyncSearchSource2){var d=this.$AbstractAsyncSearchSource2[c];b[c]=a[d]}}d=a.aux_data||a.auxiliaryData;d&&(b=babelHelpers["extends"]({},b,d));return b};return c}(b("AbstractSearchSource"));e.exports=a}),null);
__d("WebAsyncSearchSourceUtils",[],(function(a,b,c,d,e,f){a={normalizeResponse:function(a,b){a=a.getPayload();var c;Array.isArray(a)?c=a:a&&a.entries?c=a.entries:c=[];typeof c==="object"&&!Array.isArray(c)&&(c=Object.keys(c).map(function(a){return c[a]}));return c.map(b,this)}};e.exports=a}),null);
__d("WebAsyncSearchSource",["AbstractAsyncSearchSource","AbstractSearchSource","AsyncRequest","WebAsyncSearchSourceUtils"],(function(a,b,c,d,e,f){a=function(a){"use strict";babelHelpers.inheritsLoose(c,a);function c(c){var d;d=a.call(this)||this;d.$WebAsyncSearchSource1=new(b("AbstractAsyncSearchSource"))(c,d.$WebAsyncSearchSource2,b("WebAsyncSearchSourceUtils").normalizeResponse);return d}var d=c.prototype;d.bootstrapImpl=function(a){this.$WebAsyncSearchSource1.bootstrap(a)};d.searchImpl=function(a,b,c){this.$WebAsyncSearchSource1.search(a,b,c)};d.getBootstrappedEntries=function(a){return this.$WebAsyncSearchSource1.getBootstrappedEntries(a)};d.getAllEntriesMap=function(){return this.$WebAsyncSearchSource1.getAllEntriesMap()};d.setRequestData=function(a){this.$WebAsyncSearchSource1.setRequestData(a)};d.getRequestData=function(){return this.$WebAsyncSearchSource1.getRequestData()};d.reset=function(){this.$WebAsyncSearchSource1.getCallbackManager().reset()};d.$WebAsyncSearchSource2=function(a,c,d,e){new(b("AsyncRequest"))(c.uri).setData(babelHelpers["extends"]({},a,c.data)).setMethod("GET").setReadOnly(!0).setAllowCrossPageTransition(!0).setHandler(d).setErrorHandler(e).send()};return c}(b("AbstractSearchSource"));e.exports=a}),null);
__d("Cache",["DateConsts","TimeSlice"],(function(a,b,c,d,e,f){"use strict";a=function(){function a(){this.$1=new Map()}var c=a.prototype;c.has=function(a){return this.$1.has(a)};c.get=function(a,b){a=this.__getRaw(a);return!a?b:a.$2};c.getAll=function(a,b){var c=this,d=new Map();a.forEach(function(a){return d.set(a,c.get(a,b))});return d};c["delete"]=function(a){var b=this.__getRaw(a);b&&b.$3&&clearTimeout(b.$3);return this.$1["delete"](a)};c.clear=function(){this.$1.forEach(function(a){a&&a.$3&&clearTimeout(a.$3)}),this.$1.clear()};c.set=function(a,c,d,e){if(!this.shouldUpdate(a,d))return!1;var f=this.__getRaw(a);f||(f=this.__getNewRawObject());delete f.$2;delete f.$4;f.$3&&clearTimeout(f.$3);delete f.$3;f.$2=c;d!=null&&(f.$4=d);e!=null&&e>=0&&(f.$3=setTimeout(b("TimeSlice").guard(this["delete"].bind(this,a),"Cache expiration timeout"),e*b("DateConsts").MS_PER_SEC*b("DateConsts").SEC_PER_MIN));this.__setRaw(a,f);return!0};c.shouldUpdate=function(a,b){a=this.__getRaw(a);return a==null||a.$4==null||b==null||b>a.$4};c.size=function(){return this.$1.size};c.__getRaw=function(a){return this.$1.get(a)};c.__setRaw=function(a,b){this.$1.set(a,b)};c.__getNewRawObject=function(){return{$2:null,$3:null,$4:null,$5:null,$6:null}};c.__keys=function(){return this.$1.keys()};return a}();e.exports=a}),null);
__d("replaceMentionedTextInEditorState",["replaceSelectionWithMention"],(function(a,b,c,d,e,f){"use strict";function a(a,c,d,e,f){var i=c.getSelection(),j=c.getCurrentContent(),k=i.getAnchorKey(),l=i.getAnchorOffset();j=j.getBlockMap().get(k);k=i.getStartOffset();k=j.getText().substr(k-d,d);var m=f?f(a,k):g(a,k);f=l-h(j.getText().substr(0,l),m,d);return b("replaceSelectionWithMention")(a,c,i.set("anchorOffset",f),e,function(){return m})}function g(a,b){return a.getType()==="group_rule"?a.getSubtitle():a.getTitle()}function h(a,b,c){for(var d=c;d<=b.length;d++)a.substr(-d)==b.substr(0,d)&&(c=d);return c}e.exports=a}),null);
__d("AbstractMentionsTextEditor.react",["DraftEditor.react","Keys","React","TypeaheadNavigation","clearImmediate","getDefaultKeyBinding","getOrCreateDOMID","prop-types","replaceMentionedTextInEditorState","setImmediate","uniqueID"],(function(a,b,c,d,e,f){var g=b("React");a=5;var h="handled",i="not-handled";c=function(a){"use strict";babelHelpers.inheritsLoose(c,a);function c(c,d){var e;e=a.call(this,c,d)||this;e.$1=b("uniqueID")();e.$2=!1;e.$3=[];e.containerRef=g.createRef();e.abstractTextEditorRef=g.createRef();e.__onShowMentions=function(a,b,c){if(!e.$2)return;b=b||0;if(!a||!a.length){var d=e.state.mentionableEntries;if(d&&d.length&&d[0].getDataType()!==(c||""))return;e.setState({highlightedMentionable:null,activeDescendantID:null,mentionableEntries:null,characterOffset:0});return}d=e.props.typeaheadViewProps;c=a;d&&d.mentionSortFn&&c.sort(d.mentionSortFn);c=a.slice(0,e.props.maxResults);e.props.reverseOrder&&(c=c.reverse());d=null;(e.props.autoHighlight||e.state.highlightedMentionable!==null)&&(d=e.props.autoUpdateHighlight?c[0]:e.state.highlightedMentionable);e.setState({highlightedMentionable:d,mentionableEntries:c,characterOffset:b});e.props.onShowMentions&&e.props.onShowMentions(c,b)};e.$13=function(a){var c;if(a.keyCode===b("Keys").TAB)return e.$6(a);if(a.keyCode===b("Keys").ESC)return e.$5(a);if(a.keyCode===b("Keys").UP)return e.$11(a);return a.keyCode===b("Keys").DOWN?e.$4(a):(c=e.props.keyBindingFn==null?void 0:e.props.keyBindingFn(a))!=null?c:b("getDefaultKeyBinding")(a)};e.$8=function(a){e.setState(e.$12()),e.props.onBlur&&e.props.onBlur(a)};e.$7=function(a){e.props.mentionsSource&&e.props.mentionsSource.bootstrap(),e.props.onFocus&&e.props.onFocus(a)};e.$14=function(a,b){if(e.state.highlightedMentionable){e.$10(e.state.highlightedMentionable,a);return h}else if(e.props.handleContentReturn&&e.props.handleContentReturn(a,b))return h;return i};e.$9=function(a){e.setState({highlightedMentionable:a})};e.$15=function(a){a=b("getOrCreateDOMID")(a);e.setState({ariaActiveDescendantID:a})};e.$10=function(a,c){var d,f=a.getDataType(),g=e.props.mentionCreationForContentStateFn;f==="ASSISTANT_TYPEAHEAD"&&e.props.mentionTypeaheadCreationForContentStateFn&&(g=e.props.mentionTypeaheadCreationForContentStateFn);f=e.props.onMentionSelect;f==null?d=b("replaceMentionedTextInEditorState")(a,e.props.editorState,e.state.characterOffset,g,e.props.overrideMentionGetEntryText):d=f(a,e.props.editorState,e.state.characterOffset,g);e.props.onChange(d);e.setState(e.$12());f=e.props.onAddMention;g=e.state.mentionableEntries;if(f&&g){d=g.indexOf(a);f(a,d,c)}};babelHelpers.assertThisInitialized(e).__onShowMentions=e.__onShowMentions.bind(babelHelpers.assertThisInitialized(e));babelHelpers.assertThisInitialized(e).$4=e.$4.bind(babelHelpers.assertThisInitialized(e));babelHelpers.assertThisInitialized(e).$5=e.$5.bind(babelHelpers.assertThisInitialized(e));babelHelpers.assertThisInitialized(e).$6=e.$6.bind(babelHelpers.assertThisInitialized(e));babelHelpers.assertThisInitialized(e).$7=e.$7.bind(babelHelpers.assertThisInitialized(e));babelHelpers.assertThisInitialized(e).$8=e.$8.bind(babelHelpers.assertThisInitialized(e));babelHelpers.assertThisInitialized(e).$9=e.$9.bind(babelHelpers.assertThisInitialized(e));babelHelpers.assertThisInitialized(e).$10=e.$10.bind(babelHelpers.assertThisInitialized(e));babelHelpers.assertThisInitialized(e).$11=e.$11.bind(babelHelpers.assertThisInitialized(e));e.state=e.$12();return e}var d=c.prototype;d.componentDidMount=function(){this.$2=!0};d.componentWillUnmount=function(){this.$2=!1,this.$3.forEach(function(a){return b("clearImmediate")(a)}),this.$3=[]};d.$12=function(){return{highlightedMentionable:null,mentionableEntries:null,characterOffset:0}};d.$6=function(a){var b=this.state.highlightedMentionable;b?(a.preventDefault(),this.$10(b,a)):this.props.onTab&&this.props.onTab(a)};d.$5=function(a){this.props.onEscape&&this.props.onEscape(a),this.state.mentionableEntries&&(a.stopPropagation(),a.nativeEvent.composerPropagationStopped=!0,this.setState(this.$12()))};d.$11=function(a){var c=this.state.mentionableEntries;c?(a.preventDefault(),b("TypeaheadNavigation").moveUp(c,this.state.highlightedMentionable,this.$9)):this.props.onUpArrow&&this.props.onUpArrow(a)};d.$4=function(a){var c=this.state.mentionableEntries;c?(a.preventDefault(),b("TypeaheadNavigation").moveDown(c,this.state.highlightedMentionable,this.$9)):this.props.onDownArrow&&this.props.onDownArrow(a)};d.shouldComponentUpdate=function(a,b){return this.props.editorState!==a.editorState||this.props.placeholder!==a.placeholder||this.props.readOnly!==a.readOnly||this.props.className!==a.className||this.state.mentionableEntries!==b.mentionableEntries||this.state.highlightedMentionable!==b.highlightedMentionable||this.state.ariaActiveDescendantID!==b.ariaActiveDescendantID};d.componentDidUpdate=function(a){var c=this,d=this.props.editorState;if(d===a.editorState)return;var e=d.getSelection();if(e.getHasFocus()&&e.isCollapsed()){var f=d.getCurrentContent(),g=this.props.mentionsSource;g&&this.$3.push(b("setImmediate")(function(){g.search(f,e,c.__onShowMentions)}));var h=this.props.assistantTypeaheadSource;h&&this.$3.push(b("setImmediate")(function(){h.search(f,e,c.__onShowMentions)}))}};d.blur=function(){var a;(a=this.abstractTextEditorRef.current)==null?void 0:a.blur()};d.focus=function(){var a;(a=this.abstractTextEditorRef.current)==null?void 0:a.focus()};d.$16=function(){var a=this.state.mentionableEntries;if(!a||!a.length)return null;var b=this.props.mentionResultsComponent;return g.jsx(b,babelHelpers["extends"]({},this.props.mentionResultsProps,{viewID:this.$1,selection:this.props.editorState.getSelection(),contextComponent:this,characterOffset:this.state.characterOffset,mentionableEntries:a||[],highlightedMentionable:this.state.highlightedMentionable,onMentionSelect:this.$10,onMentionHighlight:this.$9,onMentionRenderHighlight:this.$15}))};d.exitCurrentMode=function(){var a;(a=this.abstractTextEditorRef.current)==null?void 0:a.exitCurrentMode()};d.render=function(){var a=this.state.mentionableEntries;a=!!(a&&a.length);var c=this.props.readOnly?null:"-1",d=this.props.role||"combobox",e=this.props.ariaAutoComplete||"list",f=this.props.ariaLabel,h=this.props;h.onTab;h.onUpArrow;h.onDownArrow;h.onEscape;h=babelHelpers.objectWithoutPropertiesLoose(h,["onTab","onUpArrow","onDownArrow","onEscape"]);return g.jsxs("div",{ref:this.containerRef,className:this.props.className,tabIndex:c,children:[g.jsx(b("DraftEditor.react"),babelHelpers["extends"]({},h,{ref:this.abstractTextEditorRef,role:d,ariaActiveDescendantID:this.state.ariaActiveDescendantID,ariaAutoComplete:e,ariaControls:this.$1,ariaExpanded:a,ariaHasPopup:a,ariaLabel:f,editorState:this.props.editorState,onBlur:this.$8,onChange:this.props.onChange,onFocus:this.$7,handleReturn:this.$14,keyBindingFn:this.$13})),this.$16()]})};d.isShowingMentionables=function(){return!!this.state.mentionableEntries};return c}(g.Component);c.defaultProps=babelHelpers["extends"]({},b("DraftEditor.react").defaultProps,{autoHighlight:!0,autoUpdateHighlight:!0,maxResults:a,reverseOrder:!1});c.propTypes={mentionsSource:(d=b("prop-types")).object,assistantTypeaheadSource:d.object,mentionCreationForContentStateFn:d.func.isRequired,mentionTypeaheadCreationForContentStateFn:d.func,mentionResultsComponent:d.func.isRequired,mentionResultsProps:d.object,excludedEntries:d.object,handleContentReturn:d.func,onAddMention:d.func,onShowMentions:d.func,autoHighlight:d.bool,maxResults:d.number,webDriverTestID:d.string};e.exports=c}),null);
__d("DocumentCompositeMentionsSource",["invariant","createCancelableFunction","emptyFunction","nullthrows"],(function(a,b,c,d,e,f,g){"use strict";function h(a,b){var c=a.getCharacterList().toSeq().slice(0,b).reverse().takeWhile(function(a){return a.getEntity()===null}).count();return a.getText().slice(b-c,b)}a=function(){function a(a){a.length>0||g(0,1514),this.$1=a,this.$2=!1,this.$3=null}var c=a.prototype;c.bootstrap=function(a){if(this.$2)return;this.$2=!0;a=a||b("emptyFunction");var c=this.$1.length;function d(){c--,c||a&&a()}this.$1.forEach(function(a){a.bootstrap(d)})};c.search=function(a,c,d){var e=c.getAnchorKey();a=a.getBlockForKey(e);var f=b("createCancelableFunction")(d);this.$4(h(a,c.getAnchorOffset()),f);return{remove:function(){f.cancel()}}};c.$4=function(a,c){var d=this,e=this.$1.length,f,g;for(var h=0;h<e;h++){f=this.$1[h];g=f.findMatch(a);if(g===null)continue;else{var i=b("nullthrows")(g).matchingString;this.$3=i;f.search(i,function(a,b){d.$3===b&&c(a,g.leadOffset)});return}}this.$3=null;c(null,null)};return a}();e.exports=a}),null);
__d("DocumentMentionsSource",["invariant"],(function(a,b,c,d,e,f,g){"use strict";a=function(){function a(a,b){typeof a.findMentionableString==="function"||g(0,558),this.$1=a,this.$2=b,this.$3=!1}var b=a.prototype;b.findMatch=function(a){return this.$1.findMentionableString(a)};b.bootstrap=function(a){this.$3||(this.$3=!0,this.$2.bootstrap(a))};b.search=function(a,b){this.$2.search(a,b,{strategyName:this.$1.name,disableExistingIDs:!0})};return a}();e.exports=a}),null);
__d("QE",["Banzai","Cache"],(function(a,b,c,d,e,f){var g="qe_log_exposure",h=60,i=new(b("Cache"))();a={logExposure:function(a,c){var d=c?a+"|"+c:a;if(i.has(d))return;var e={signal:!0};a={name:a,id:null};c&&(a.id=c);b("Banzai").post(g,a,e);i.set(d,!0,1,h)}};e.exports=a}),null);
__d("update",["fbjs/lib/invariant"],(function(a,b,c,d,e,f){"use strict";var g={}.hasOwnProperty;function h(a){if(Array.isArray(a))return a.concat();else if(a&&typeof a==="object")return Object.assign(new a.constructor(),a);else return a}var i="$push",j="$unshift",k="$splice",l="$set",m="$merge",n="$apply",o=[i,j,k,l,m,n],p={};o.forEach(function(a){p[a]=!0});function q(a,c,d){Array.isArray(a)||b("fbjs/lib/invariant")(0,1977,d,a);a=c[d];Array.isArray(a)||b("fbjs/lib/invariant")(0,1978,d,a)}function r(a,c){typeof c==="object"||b("fbjs/lib/invariant")(0,1979,o.join(", "),l);if(g.call(c,l)){Object.keys(c).length===1||b("fbjs/lib/invariant")(0,1980,l);return c[l]}var d=h(a);if(g.call(c,m)){var e=c[m];e&&typeof e==="object"||b("fbjs/lib/invariant")(0,1981,m,e);d&&typeof d==="object"||b("fbjs/lib/invariant")(0,1982,m,d);Object.assign(d,c[m])}g.call(c,i)&&(q(a,c,i),c[i].forEach(function(a){d.push(a)}));g.call(c,j)&&(q(a,c,j),c[j].forEach(function(a){d.unshift(a)}));g.call(c,k)&&(Array.isArray(a)||b("fbjs/lib/invariant")(0,1984,k,a),Array.isArray(c[k])||b("fbjs/lib/invariant")(0,1985,k,c[k]),c[k].forEach(function(a){Array.isArray(a)||b("fbjs/lib/invariant")(0,1985,k,c[k]),d.splice.apply(d,a)}));g.call(c,n)&&(typeof c[n]==="function"||b("fbjs/lib/invariant")(0,1986,n,c[n]),d=c[n](d));for(var f in c)Object.prototype.hasOwnProperty.call(p,f)&&p[f]||(d[f]=r(a[f],c[f]));return d}e.exports=r}),null);
__d("FlexboxStyles",[],(function(a,b,c,d,e,f){"use strict";a={alignItems:!0,flexDirection:!0,justifyContent:!0};e.exports=a}),null);
__d("LayoutStyles",["FlexboxStyles"],(function(a,b,c,d,e,f){"use strict";a=babelHelpers["extends"]({},b("FlexboxStyles"),{borderBottomWidth:!0,borderLeftWidth:!0,borderRightWidth:!0,borderTopWidth:!0,borderWidth:!0,bottom:!0,height:!0,left:!0,margin:!0,marginBottom:!0,marginLeft:!0,marginRight:!0,marginTop:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,opacity:!0,overflow:!0,padding:!0,paddingBottom:!0,paddingLeft:!0,paddingRight:!0,paddingTop:!0,position:!0,top:!0,transform:!0,transformOrigin:!0,width:!0});e.exports=a}),null);
__d("flattenStyle",["mapObject"],(function(a,b,c,d,e,f){"use strict";var g;function h(a){if(!a)return null;if(!Array.isArray(a))return(g||(g=b("mapObject"))).untyped(a,function(b,a){return i(b,a)});var c={};for(var d=0,e=a.length;d<e;++d){var f=h(a[d]);if(f)for(var j in f)c[j]=f[j]}return c}function i(a,b){return b==="lineHeight"&&typeof a==="number"?a+"px":a}e.exports=h}),null);
__d("getValidatedStyle",["filterObject","flattenStyle"],(function(a,b,c,d,e,f){"use strict";var g={textDecorationLine:"textDecoration"};function a(a,c){if(!a)return null;a=b("flattenStyle")(a);return h(b("filterObject")(a,function(a,b){return!!c[b]}),g)}function h(a,b){var c=babelHelpers["extends"]({},a);Object.keys(b).forEach(function(a){if(Object.prototype.hasOwnProperty.call(c,a)){var d=b[a];c[d]=c[a];delete c[a]}});return c}e.exports=a}),null);
__d("pluckClassNames",[],(function(a,b,c,d,e,f){"use strict";function g(a){var b=[],c=[];Array.isArray(a)?a.forEach(function(a){a=g(a);var d=a.classNames;a=a.styles;b=b.concat(d);c=c.concat(a)}):typeof a==="string"?b.push(a):c.push(a);return{classNames:b,styles:c}}e.exports=g}),null);
__d("TypeaheadViewItem",["React","ReactDOM","SearchableEntry","prop-types"],(function(a,b,c,d,e,f){var g=b("React");d={children:(c=b("prop-types")).node,className:c.string,entry:c.instanceOf(b("SearchableEntry")).isRequired,highlighted:c.bool,role:c.string,selected:c.bool,onSelect:c.func.isRequired,onHighlight:c.func,onRenderHighlight:c.func};f={children:c.node,className:c.string,entry:c.instanceOf(b("SearchableEntry")).isRequired,highlighted:c.bool,role:c.string,selected:c.bool,onSelect:c.func.isRequired,onHighlight:c.func,onRenderHighlight:c.func};var h={role:"option"};c={_onSelect:function(a){this.props.onSelect(this.props.entry,a)},_onHighlight:function(a){this.props.onHighlight&&this.props.onHighlight(this.props.entry,a)},getDefaultProps:function(){return h},shouldComponentUpdate:function(a){return this.props.entry.getUniqueID()!==a.entry.getUniqueID()||this.props.highlighted!==a.highlighted||this.props.selected!==a.selected},componentDidMount:function(){var a=this.props.onRenderHighlight;this.props.highlighted&&a&&a(b("ReactDOM").findDOMNode(this))},componentDidUpdate:function(){var a=this.props.onRenderHighlight;this.props.highlighted&&a&&a(b("ReactDOM").findDOMNode(this))}};function a(a){var c,d;return d=c=function(c){"use strict";babelHelpers.inheritsLoose(d,c);function d(){var a,b;for(var d=arguments.length,e=new Array(d),f=0;f<d;f++)e[f]=arguments[f];return(a=b=c.call.apply(c,[this].concat(e))||this,b.$1=function(a){b.props.onSelect(b.props.entry,a)},b.$2=function(a){b.props.onHighlight&&b.props.onHighlight(b.props.entry,a)},a)||babelHelpers.assertThisInitialized(b)}var e=d.prototype;e.shouldComponentUpdate=function(a){return this.props.entry.getUniqueID()!==a.entry.getUniqueID()||this.props.highlighted!==a.highlighted||this.props.selected!==a.selected};e.componentDidMount=function(){var a=this.props.onRenderHighlight;this.props.highlighted&&a&&a(b("ReactDOM").findDOMNode(this))};e.componentDidUpdate=function(){var a=this.props.onRenderHighlight;this.props.highlighted&&a&&a(b("ReactDOM").findDOMNode(this))};e.render=function(){return g.jsx(a,babelHelpers["extends"]({},this.props,{onSelect:this.$1,onHighlight:this.$2}))};return d}(g.Component),c.displayName="TypeaheadViewItem("+a.displayName+")",c.defaultProps=h,d}e.exports={makeTypeaheadViewItem:a,Mixin:c,propTypes:d,TypeaheadViewItemPropTypes:f}}),null);
__d("TypeaheadViewPropTypes",["prop-types"],(function(a,b,c,d,e,f){"use strict";c={controlleeID:(a=b("prop-types")).string,highlightedEntry:a.object,entries:a.array.isRequired,onSelect:a.func.isRequired,onHighlight:a.func,onRenderHighlight:a.func,role:a.string,scrolled:a.bool};e.exports=c}),null);