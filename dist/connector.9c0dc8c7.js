parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"FfNe":[function(require,module,exports) {
console.log("Hello World!");var e=function(e,t){return console.log("Someone clicked the button"),e.popup({title:"Demand Change",items:[{text:"Choose Time"},{text:"In 1 hour"},{text:"In 2 hour"}]})};window.TrelloPowerUp.initialize({"card-badges":function(e,t){e.card("attachments");return e.card("name").get("name").then(function(e){return console.log("card name  "+e),[{dynamic:function(){return{text:"Dynamic"+(100*Math.random()).toFixed(0).toString(),color:"green",refresh:10}}},{text:"Static",color:null}]})},"card-buttons":function(t,n){return[{text:"Demand-Power-Up",callback:e,condition:"edit"},{text:"Open",condition:"always",target:"Trello Developer Site"}]},"card-detail-badges":function(e,t){return e.card("name").get("name").then(function(e){return[{dynamic:function(){return{title:"Detail Badge",text:"5",color:"red",refresh:10}}}]})}});
},{}]},{},["FfNe"], null)
//# sourceMappingURL=/connector.9c0dc8c7.js.map