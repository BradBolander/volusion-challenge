

var App = React.createClass({
    
    componentDidMount: function() {
      var map;
      $.ajax({
          method: "GET",
          url: "https://data.nasa.gov/resource/gh4g-9sfh.json",
          dataType: "json",
          success: function(data) {
            initMap(data);
          }
      });
  
      function initMap(data) {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 0, lng: 0},
          zoom: 3
        });
  
        for (i = 0; i < data.length; i++) { 
          if (data[i].geolocation) {
            var uluru = {lat: Number(data[i].geolocation.latitude), lng: Number(data[i].geolocation.longitude)};
            var marker = new google.maps.Marker({
              position: uluru,
              map: map
            });
          }
        }
      }
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