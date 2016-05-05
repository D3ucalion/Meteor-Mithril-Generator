results = {
  controller: function(){
    var ctrl = this;
    ctrl.loadResults = false;
    ctrl.results = {};
    ctrl.resultsFetch = function(){
      ctrl.loadResults = true;
      ctrl.results = Messages.find().fetch();
      m.redraw(true);
    }
    ctrl.resultsExternalFetch = function(){
      Meteor.call('ResultsExternal', function (error, response) {
        if (error) { 
        //TODO Add Error Logging 
        } else if(response) {
          ctrl.results = response.data;
          ctrl.loadResults = true;
          return ctrl.results
        }
      }); 
      m.redraw(true);
    }
  },
  view: function(ctrl){
    return m('.jumbotron', [
        m('h2', "Result mapping from a local mongo DB and from an External API")
      ],[
        m('button.btn.btn-success', {
          onclick: function(){ 
            ctrl.resultsFetch();
          }
        }, 'Load Results')
      ],[
        m('button.btn.btn-warning', {
          onclick: function(){
            ctrl.resultsExternalFetch();
          }
        }, 'Load External API Results')
      ],[
        m('hr')
      ],[
        m("ul", [
          ctrl.loadResults ? ctrl.results.map(function(res) {
            return m("li", (res.name||res.title) + ":  " + (res.text || res.body))
          }) : ''
        ])
      ]);
  }
}
