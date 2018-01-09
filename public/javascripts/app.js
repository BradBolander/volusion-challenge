

var App = React.createClass({

  getInitialState: function() {
      return{
        meteoriteData: undefined
      };
  },

  setData: function(newData) {
    this.setState({
      meteoriteData: newData
    })
  },

  componentDidMount: function() {
    $.ajax({
      method: "GET",
      url: "https://data.nasa.gov/resource/gh4g-9sfh.json",
      dataType: "json",
      success: function(data) {
        this.setData(data);
      }.bind(this)
    });
  },

    render: function() {
      return (
        <div id="app">
           <h1 className="site-header">Meteorite Landing Locations</h1>
           <section className="about-wrapper">
              This project is the public NASA meteorite landing data, with the geographic locations plotted as Google Maps markers<br/>
              <a target="_blank" href="https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh">Link to API page</a>
           </section>
           <Map setData={this.setData} data={this.state.meteoriteData} />
           <MassDisplay data={this.state.meteoriteData} />
        </div>
      );
    }
});

var Map = React.createClass({

  constructMap: function() {
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 25, lng: -20},
      zoom: 3
    });
    for (let i = 0; i < this.props.data.length; i++) { 
      if (this.props.data[i].geolocation) {
        var uluru = {lat: Number(this.props.data[i].geolocation.latitude), lng: Number(this.props.data[i].geolocation.longitude)};
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      };
    };
  },

  render: function() {
    if (!!this.props.data) {
      this.constructMap();
    }
    
    return (
      <div id="map"></div>
    );
  }
});

var MassDisplay = React.createClass({

  render: function() {
    if (!!this.props.data) {
      let result = this.props.data.sort(function(a,b) {
        return b.mass - a.mass;
      });

      var meteoriteMass = [];
      for(let i = 0; i < 50; i++) {
        meteoriteMass.push(
          <div key={i} className="mass-item col-xs-6 col-sm-6 col-md-3 col-lg-3">
            <span className="mass-item-title">{result[i].name} - {result[i].year.substring(0,4)}</span><br/>
            <span className="mass-item-weight">Mass: {result[i].mass}g</span><br/>
          </div>
        )
      }
    }

    return (
      <div id="mass-list">
        <h1>Top 50 Largest Meteorites</h1>
        {meteoriteMass}
      </div>
    );
  }
})

ReactDOM.render(
  <App/>,
  document.getElementById('container')
);