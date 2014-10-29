function init(){this._events={},this._conf&&configure.call(this,this._conf)}function configure(a){this._conf=a||ud.event.prototype.defaults,console.log("configure",this._conf),this._conf.wildcard&&(this.listenerTree={})}function searchListenerTree(a,b,c,d){if(!c)return[];var e,f,g,h,i,j,k,l=[],m=b.length,n=b[d],o=b[d+1];if(d===m&&c._listeners){if("function"==typeof c._listeners)return a&&a.push(c._listeners),[c];for(e=0,f=c._listeners.length;f>e;e++)a&&a.push(c._listeners[e]);return[c]}if("*"===n||"**"===n||c[n]){if("*"===n){for(g in c)"_listeners"!==g&&c.hasOwnProperty(g)&&(l=l.concat(searchListenerTree(a,b,c[g],d+1)));return l}if("**"===n){k=d+1===m||d+2===m&&"*"===o,k&&c._listeners&&(l=l.concat(searchListenerTree(a,b,c,m)));for(g in c)"_listeners"!==g&&c.hasOwnProperty(g)&&("*"===g||"**"===g?(c[g]._listeners&&!k&&(l=l.concat(searchListenerTree(a,b,c[g],m))),l=l.concat(searchListenerTree(a,b,c[g],d))):l=l.concat(g===o?searchListenerTree(a,b,c[g],d+2):searchListenerTree(a,b,c[g],d)));return l}l=l.concat(searchListenerTree(a,b,c[n],d+1))}if(h=c["*"],h&&searchListenerTree(a,b,h,d+1),i=c["**"])if(m>d){i._listeners&&searchListenerTree(a,b,i,m);for(g in i)"_listeners"!==g&&i.hasOwnProperty(g)&&(g===o?searchListenerTree(a,b,i[g],d+2):g===n?searchListenerTree(a,b,i[g],d+1):(j={},j[g]=i[g],searchListenerTree(a,b,{"**":j},d+1)))}else i._listeners?searchListenerTree(a,b,i,m):i["*"]&&i["*"]._listeners&&searchListenerTree(a,b,i["*"],m);return l}function growListenerTree(a,b){a="string"==typeof a?a.split(this._conf.delimiter):a.slice();for(var c=0,d=a.length;d>c+1;c++)if("**"===a[c]&&"**"===a[c+1])return;for(var e=this.listenerTree,f=a.shift();f;){if(e[f]||(e[f]={}),e=e[f],0===a.length){if(e._listeners){if("function"==typeof e._listeners)e._listeners=[e._listeners,b];else if(isArray(e._listeners)&&(e._listeners.push(b),!e._listeners.warned)){var g=this.defaultMaxListeners;"undefined"!=typeof this._events.maxListeners&&(g=this._events.maxListeners),g>0&&e._listeners.length>g&&(e._listeners.warned=!0,console.error("(node) warning: possible ud.event memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",e._listeners.length),console.trace())}}else e._listeners=b;return!0}f=a.shift()}return!0}var ud="object"==typeof ud?ud:{},isArray=Array.isArray?Array.isArray:function(a){return"[object Array]"===Object.prototype.toString.call(a)};ud.event=function(a){this._events={},configure.call(this,a)},ud.event.bestow=function(a,b){var c=new ud.event(b);a=a&&"object"==typeof a?a:{};for(var d in c)"function"==typeof Object.defineProperty?Object.defineProperty(a,d,{value:c[d],enumerable:"function"==typeof c[d]?!1:!0,writable:"function"==typeof c[d]?!1:!0}):a[d]=c[d];return a},ud.event.prototype.defaults={wildcard:!0,defaultMaxListeners:20,delimiter:"."},ud.event.prototype.setMaxListeners=function(a){this._events||init.call(this),this._events.maxListeners=a,this._conf||(this._conf={}),this._conf.maxListeners=a},ud.event.prototype.event="",ud.event.prototype.once=function(a,b){return this.many(a,1,b),this},ud.event.prototype.many=function(a,b,c){function d(){0===--b&&e.off(a,d),c.apply(this,arguments)}var e=this;if("function"!=typeof c)throw new Error("many only accepts instances of Function");return d._origin=c,this.on(a,d),e},ud.event.prototype.emit=function(){this._events||init.call(this);var a=arguments[0];if(this._all){for(var b=arguments.length,c=new Array(b-1),d=1;b>d;d++)c[d-1]=arguments[d];for(d=0,b=this._all.length;b>d;d++)this.event=a,this._all[d].apply(this,c)}if("error"===a&&!(this._all||this._events.error||this._conf.wildcard&&this.listenerTree.error))throw arguments[1]instanceof Error?arguments[1]:new Error("Uncaught, unspecified 'error' event.");var e;if(this._conf.wildcard){e=[];var f="string"==typeof a?a.split(this._conf.delimiter):a.slice();searchListenerTree.call(this,e,f,this.listenerTree,0)}else e=this._events[a];if("function"==typeof e){if(this.event=a,1===arguments.length)e.call(this);else if(arguments.length>1)switch(arguments.length){case 2:e.call(this,arguments[1]);break;case 3:e.call(this,arguments[1],arguments[2]);break;default:for(var b=arguments.length,c=new Array(b-1),d=1;b>d;d++)c[d-1]=arguments[d];e.apply(this,c)}return!0}if(e){for(var b=arguments.length,c=new Array(b-1),d=1;b>d;d++)c[d-1]=arguments[d];for(var g=e.slice(),d=0,b=g.length;b>d;d++)this.event=a,g[d].apply(this,c);return g.length>0||this._all}return this._all},ud.event.prototype.on=function(a,b){if("function"==typeof a)return this.onAny(a),this;if("function"!=typeof b)throw new Error("on only accepts instances of Function");if(this._events||init.call(this),this._conf.wildcard)return growListenerTree.call(this,a,b),this;if(this._events[a]){if("function"==typeof this._events[a])this._events[a]=[this._events[a],b];else if(isArray(this._events[a])&&(this._events[a].push(b),!this._events[a].warned)){var c=this.defaultMaxListeners;"undefined"!=typeof this._events.maxListeners&&(c=this._events.maxListeners),c>0&&this._events[a].length>c&&(this._events[a].warned=!0,console.error("(node) warning: possible ud.event memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[a].length),console.trace())}}else this._events[a]=b;return this},ud.event.prototype.onAny=function(a){if(this._all||(this._all=[]),"function"!=typeof a)throw new Error("onAny only accepts instances of Function");return this._all.push(a),this},ud.event.prototype.addListener=ud.event.prototype.on,ud.event.prototype.off=function(a,b){if("function"!=typeof b)throw new Error("removeListener only takes instances of Function");var c,d=[];if(this._conf.wildcard){var e="string"==typeof a?a.split(this._conf.delimiter):a.slice();d=searchListenerTree.call(this,null,e,this.listenerTree,0)}else{if(!this._events[a])return this;c=this._events[a],d.push({_listeners:c})}for(var f=0;f<d.length;f++){var g=d[f];if(c=g._listeners,isArray(c)){for(var h=-1,i=0,j=c.length;j>i;i++)if(c[i]===b||c[i].listener&&c[i].listener===b||c[i]._origin&&c[i]._origin===b){h=i;break}if(0>h)return this;this._conf.wildcard?g._listeners.splice(h,1):this._events[a].splice(h,1),0===c.length&&(this._conf.wildcard?delete g._listeners:delete this._events[a])}else(c===b||c.listener&&c.listener===b||c._origin&&c._origin===b)&&(this._conf.wildcard?delete g._listeners:delete this._events[a])}return this},ud.event.prototype.offAny=function(a){var b,c=0,d=0;if(a&&this._all&&this._all.length>0){for(b=this._all,c=0,d=b.length;d>c;c++)if(a===b[c])return b.splice(c,1),this}else this._all=[];return this},ud.event.prototype.removeListener=ud.event.prototype.off,ud.event.prototype.removeAllListeners=function(a){if(0===arguments.length)return!this._events||init.call(this),this;if(this._conf.wildcard)for(var b="string"==typeof a?a.split(this._conf.delimiter):a.slice(),c=searchListenerTree.call(this,null,b,this.listenerTree,0),d=0;d<c.length;d++){var e=c[d];e._listeners=null}else{if(!this._events[a])return this;this._events[a]=null}return this},ud.event.prototype.listeners=function(a){if(this._conf.wildcard){var b=[],c="string"==typeof a?a.split(this._conf.delimiter):a.slice();return searchListenerTree.call(this,b,c,this.listenerTree,0),b}return this._events||init.call(this),this._events[a]||(this._events[a]=[]),isArray(this._events[a])||(this._events[a]=[this._events[a]]),this._events[a]},ud.event.prototype.listenersAny=function(){return this._all?this._all:[]};