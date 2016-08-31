define("app",["require","exports"],function(e,t){"use strict";var n=function(){function e(){}return e.prototype.configureRouter=function(e,t){e.title="Idaho Bills",e.map([{route:["","Home"],name:"Home",moduleId:"./Home/home",nav:!0,title:"Home"},{route:["About"],name:"About",moduleId:"./About/about",nav:!0,title:"About"},{route:["Lawmakers"],name:"Lawmakers",moduleId:"./Lawmakers/lawmakers",nav:!0,title:"Lawmakers"},{route:["Topics"],name:"Topics",moduleId:"./Topics/topics",nav:!0,title:"Topics"},{route:"bills/:id",name:"billsDetails",moduleId:"./BillDetails/billDetails"}]),this.router=t},e}();t.App=n}),define("environment",["require","exports"],function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={debug:!1,testing:!1}}),define("main",["require","exports","./environment"],function(e,t,n){"use strict";function a(e){e.use.standardConfiguration().feature("resources"),n.default.debug&&e.use.developmentLogging(),n.default.testing&&e.use.plugin("aurelia-testing"),e.start().then(function(){return e.setRoot()})}Promise.config({warnings:{wForgottenReturn:!1}}),t.configure=a}),define("About/about",["require","exports"],function(e,t){"use strict";var n=function(){function e(){}return e}();t.About=n}),define("BillDetails/billDetails",["require","exports"],function(e,t){"use strict";var n=function(){function e(){}return e}();t.BillDetails=n});var __decorate=this&&this.__decorate||function(e,t,n,a){var i,o=arguments.length,r=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,n,a);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(r=(o<3?i(r):o>3?i(t,n,r):i(t,n))||r);return o>3&&r&&Object.defineProperty(t,n,r),r},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};define("Home/home",["require","exports","aurelia-http-client","aurelia-framework"],function(e,t,n,a){"use strict";var i=function(){function e(e){this.http=e,this.bills=[],this.loaded=!1}return e.prototype.postComment=function(e,t){e.comments.push(t)},e.prototype.getBills=function(){var e=this;this.http.get("https://openstates.org/api/v1/bills/?state=id&apikey=bcc2a830883c4f459dbffe94b2a3e90f").then(function(t){e.bills=JSON.parse(t.response),e.bills.forEach(function(e){e.comments=[]}),e.loaded=!0})},e.prototype.activate=function(e,t,n){this.getBills()},e=__decorate([a.autoinject,__metadata("design:paramtypes",[n.HttpClient])],e)}();t.Home=i}),define("Lawmakers/lawmakers",["require","exports"],function(e,t){"use strict";var n=function(){function e(){}return e}();t.Lawmakers=n}),define("Topics/topics",["require","exports"],function(e,t){"use strict";var n=function(){function e(){}return e}();t.Topics=n}),define("resources/index",["require","exports"],function(e,t){"use strict";function n(e){}t.configure=n}),define("text!app.html",["module"],function(e){e.exports='<template>\n  <require from="./style.css"></require>\n  <require from="./nav-bar.html"></require>\n    <nav-bar router.bind="router"></nav-bar>\n    <div class="container content">\n      <router-view></router-view>\n    </div>\n</template>'}),define("text!style.css",["module"],function(e){e.exports=".content{\n    margin-top: 5%;\n}"}),define("text!nav-bar.html",["module"],function(e){e.exports='<template bindable="router">\n    <nav class="navbar navbar-inverse navbar-fixed-top">\n        <div class="container">\n            <div class="navbar-header">\n                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false"\n                    aria-controls="navbar">\n            <span class="sr-only">Toggle navigation</span>\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n          </button>\n                <a class="navbar-brand" href="#"> ${router.title}</a>\n            </div>\n            <div id="navbar" class="collapse navbar-collapse">\n                <ul class="nav navbar-nav">\n                    <li repeat.for="row of router.navigation" class="${row.isActive ? \'active\' : \'\'}">\n                        <a data-toggle="collapse" data-target="#skeleton-navigation-navbar-collapse.in" href.bind="row.href">${row.title}</a>\n                    </li>\n                </ul>\n            </div>\n            <!--/.nav-collapse -->\n        </div>\n    </nav>\n</template>'}),define("text!About/about.html",["module"],function(e){e.exports="<template>About</template>"}),define("text!Home/home.html",["module"],function(e){e.exports='<template>\n    <div class="row">\n        loading\n        <div if.bind="loaded" class="col-md-4 panel" style="height:300px;" repeat.for="bill of bills">\n            <div class="col-md-12">${bill.id}</div>\n            <div class="col-md-12">${bill.title}</div>\n            <div class="col-md-12">${bill.updated_at}</div>\n            <input type="text-area" value.bind="bill.comment" />\n            <button click.delegate="postComment(bill, bill.comment)">Click Me</button>\n            <ul>\n                <li repeat.for="comment of bill.comments">\n                    ${comment}\n                </li>\n            </ul>\n        </div>\n    </div>\n\n</template>'}),define("text!BillDetails/billDetails.html",["module"],function(e){e.exports="<template>Bill Details</template>"}),define("text!Lawmakers/lawmakers.html",["module"],function(e){e.exports="<template>Lawmakers</template>"}),define("text!Topics/topics.html",["module"],function(e){e.exports="<template>Topics</template>"});