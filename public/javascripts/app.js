

var App = React.createClass({

  getInitialState: function() {
      return{
        meteoriteData: undefined
      };
  },

  componentDidMount: function() {
    $.ajax({
      method: "GET",
      url: "https://data.nasa.gov/resource/gh4g-9sfh.json",
      dataType: "json",
      success: function(data) {
        this.setState({
          meteoriteData: data
        })
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
      let sortedByMass = this.props.data.sort(function(a,b) {
        return b.mass - a.mass;
      });

      var meteoriteMass = [];
      for(let i = 0; i < 10; i++) {
        meteoriteMass.push(
          <div key={i} className="mass-item col-xs-6 col-sm-6 col-md-4 col-lg-4">
            <div className="index-display">{i+1}</div>
            <span className="mass-item-title">{sortedByMass[i].name} - {sortedByMass[i].year.substring(0,4)}</span><br/>
            <span className="mass-item-weight">Mass: {sortedByMass[i].mass}g</span><br/>
          </div>
        )
      }
    }

    return (
      <section id="mass-list">
        <h1 className="mass-list-title">Top 10 Largest Meteorites</h1>
        {meteoriteMass}
      </section>
    );
  }
})

ReactDOM.render(
  <App/>,
  document.getElementById('container')
);