define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
        }
        App.prototype.configureRouter = function (config, router) {
            config.title = 'Idaho Bills';
            config.map([
                { route: ['', 'Home'], name: 'Home', moduleId: './Home/home', nav: true, title: 'Home' },
                { route: ['About'], name: 'About', moduleId: './About/about', nav: true, title: 'About' },
                { route: ['Lawmakers'], name: 'Lawmakers', moduleId: './Lawmakers/lawmakers', nav: true, title: 'Lawmakers' },
                { route: ['Topics'], name: 'Topics', moduleId: './Topics/topics', nav: true, title: 'Topics' },
                { route: 'bills/:id', name: 'billsDetails', moduleId: './BillDetails/billDetails' },
            ]);
            this.router = router;
        };
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", './environment'], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('About/about',["require", "exports"], function (require, exports) {
    "use strict";
    var About = (function () {
        function About() {
        }
        return About;
    }());
    exports.About = About;
});

define('BillDetails/billDetails',["require", "exports"], function (require, exports) {
    "use strict";
    var BillDetails = (function () {
        function BillDetails() {
        }
        return BillDetails;
    }());
    exports.BillDetails = BillDetails;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('Home/home',["require", "exports", 'aurelia-http-client', 'aurelia-framework'], function (require, exports, aurelia_http_client_1, aurelia_framework_1) {
    "use strict";
    var Home = (function () {
        function Home(http) {
            this.http = http;
            this.bills = [];
            this.loaded = false;
        }
        Home.prototype.postComment = function (bill, comment) {
            bill.comments = [];
            bill.comments.push(comment);
        };
        Home.prototype.getBills = function () {
            var _this = this;
            this.http.get('https://openstates.org/api/v1/bills/?state=id&search_window=session:2016&page&per_page=10&apikey=bcc2a830883c4f459dbffe94b2a3e90f')
                .then(function (data) {
                _this.bills = JSON.parse(data.response);
                sessionStorage.setItem('bill', data.response);
                _this.loaded = true;
            });
        };
        Home.prototype.activate = function (params, routeConfig, $navigationInstruction) {
            var billStorage = sessionStorage.getItem('bill');
            console.log(billStorage);
            if (billStorage == null) {
                this.getBills();
            }
            else {
                this.bills = JSON.parse(billStorage);
                this.loaded = true;
            }
        };
        Home = __decorate([
            aurelia_framework_1.autoinject, 
            __metadata('design:paramtypes', [aurelia_http_client_1.HttpClient])
        ], Home);
        return Home;
    }());
    exports.Home = Home;
});

define('Lawmakers/lawmakers',["require", "exports"], function (require, exports) {
    "use strict";
    var Lawmakers = (function () {
        function Lawmakers() {
        }
        return Lawmakers;
    }());
    exports.Lawmakers = Lawmakers;
});

define('Topics/topics',["require", "exports"], function (require, exports) {
    "use strict";
    var Topics = (function () {
        function Topics() {
        }
        return Topics;
    }());
    exports.Topics = Topics;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./style.css\"></require>\n  <require from=\"./nav-bar.html\"></require>\n    <nav-bar router.bind=\"router\"></nav-bar>\n    <div class=\"container content\">\n      <router-view></router-view>\n    </div>\n</template>"; });
define('text!style.css', ['module'], function(module) { module.exports = ".content{\n    margin-top: 5%;\n}"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\n    <nav class=\"navbar navbar-inverse navbar-fixed-top\">\n        <div class=\"container\">\n            <div class=\"navbar-header\">\n                <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\"\n                    aria-controls=\"navbar\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n          </button>\n                <a class=\"navbar-brand\" href=\"#\"> ${router.title}</a>\n            </div>\n            <div id=\"navbar\" class=\"collapse navbar-collapse\">\n                <ul class=\"nav navbar-nav\">\n                    <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\n                        <a data-toggle=\"collapse\" data-target=\"#skeleton-navigation-navbar-collapse.in\" href.bind=\"row.href\">${row.title}</a>\n                    </li>\n                </ul>\n            </div>\n            <!--/.nav-collapse -->\n        </div>\n    </nav>\n</template>"; });
define('text!About/about.html', ['module'], function(module) { module.exports = "<template>About</template>"; });
define('text!BillDetails/billDetails.html', ['module'], function(module) { module.exports = "<template>Bill Details</template>"; });
define('text!Lawmakers/lawmakers.html', ['module'], function(module) { module.exports = "<template>Lawmakers</template>"; });
define('text!Home/home.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        loading\n        <div if.bind=\"loaded\" class=\"col-md-4 panel\" style=\"height:300px;\" repeat.for=\"bill of bills\">\n            <div class=\"col-md-12\">${bill.id}</div>\n            <div class=\"col-md-12\">${bill.title}</div>\n            <div class=\"col-md-12\">${bill.updated_at}</div>\n            <input type=\"text-area\" value.bind=\"bill.comment\" />\n            <button click.delegate=\"postComment(bill, bill.comment)\">Click Me</button>\n            <ul>\n                <li repeat.for=\"comment of bill.comments\">\n                    ${comment}\n                </li>\n            </ul>\n        </div>\n    </div>\n\n</template>"; });
define('text!Topics/topics.html', ['module'], function(module) { module.exports = "<template>Topics</template>"; });
//# sourceMappingURL=app-bundle.js.map