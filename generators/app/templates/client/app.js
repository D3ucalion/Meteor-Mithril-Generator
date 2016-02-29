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
        
        return [
	m('.select', [
	m('header'),
    
    m('span', {class: "pageRibbon", role: "navigation", config: function(e){console.log(e); Meteor.sharedFunctions.fade('in', 1500, e, true)}}, [
		btn("Home",  "/"),
		btn("About",  "/about"),
		btn("Contact",  "/contact")
		
		])])]

	function btn(name, route){
		var isCurrent = (m.route() === route);
		var click = function(){ m.route(route); };
		return m("button"+(isCurrent ? ".navBtn.Active" : ".navBtn"), {onclick: click}, name);
	}

    }
    
    
}

function Page(content, placePlugin){
	    this.view = function(){
		return [ Menu.view(), m(".page", content ) ];
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
