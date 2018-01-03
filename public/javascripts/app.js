

var App = React.createClass({
    
    componentDidMount: function() {
      
    },  

    render: function() {
      return (
        <div id="app">
           <h1 className="site-header">Meteorite Landing Locations</h1>
        </div>
      );
    }
  });


  ReactDOM.render(
    <App/>,
    document.getElementById('container')
  );