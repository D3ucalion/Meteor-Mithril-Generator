//meteor helper which replaces Blaze with Mithril
var reactive = function(controller) {
    return function() {
        var instance = {};

        var computation = Deps.autorun(function() {
            m.startComputation()
            controller.call(instance)
            m.endComputation()
        });

        instance.onunload = function() {
            computation.stop();
        };

        return instance;
    };
};


//App view model
App = {};

//application actions
App.Action = function() {
    return this.someAction;
};
var Menu = {
    controller: function(){
        var ctrl = this;
		
    },
    view: function(ctrl){
        //let pageRibbon = document.querySelector('.pageRibbon')
        //Meteor.sharedFunctions.fade('in', 1000, pageRibbon, true)
        return [
	m('div.navbar.navbar-default.navbar-static-top', [
    m('.container',[
    m('.navbar-collapse.collapse#navbar-main', [    
    m('ul.nav.navbar-nav', {role: "navigation"}, [
        m('a.navbar-brand', 'Meteor-Mithril'),
		nav("Home",  "/"),
		nav("About",  "/about"),
		nav("Contact",  "/contact")
		
	])])
	])]), 

	]

	function btn(name, route){
		var isCurrent = (m.route() === route);
		var click = function(){ m.route(route); };
		return m("button"+
		(isCurrent ? ".btn.btn-default.navbar-btn.active" : ".btn.btn-default.navbar-btn"), 
		{onclick: click, type: 'button'}, name);
	}
		function nav(name, route){
		var isCurrent = (m.route() === route);
		var click = function(){ m.route(route); };
		return m("li"+
		(isCurrent ? ".active" : ""), 
		{onclick: click},[ m('a.Pointer', name)]);
	}
    }
    
    
}

function Page(content, placePlugin){
	    this.view = function(){
		return [ Menu.view(), m(".container", content ) ];
	}

}

//controller as well as global routing declarations.
App.controller = reactive(function() {
        var ctrl = this;

        Home = new Page(home);
        About = new Page(about);
        Contact = new Page(contact);
        m.route.mode = "pathname";
        
        m.route(document.body, "/", {
    	    "/": Home,
    	    "/about": About,
    	    "/contact": Contact
});  

})

//render the app
if (Meteor.isClient) {
    Meteor.startup(function() {
        m.module(document.body, App)
    })
}
