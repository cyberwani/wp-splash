define(["site.locale","site.model","jquery","skrollr","bootstrap"],function(a,b,c){console.log("app","loaded",require("site.model").domain),window.skrollr.init({forceHeight:!1}),require(["sticky"],function(){var a=0;c("#wpadminbar").length>0&&(a=c("#wpadminbar").height()),c(".navbar-top-home").sticky({topSpacing:a})})});