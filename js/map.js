require([
    "esri/config", 
    "esri/Map",  
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/renderers/visualVariables/ColorVariable"
  ], function(esriConfig, Map, MapView, FeatureLayer) {
      
      esriConfig.apiKey = "AAPK5915b242a27845f389e0a11a17dc46b46gXNFj09FJVdb711lVLGhgoVFJBqdW6ow3bl71N1hx2llpMyogGBeF8kgvrKm3cY";

  const map = new Map({
    // basemap: "arcgis/topographic" // basemap styles service  
    basemap: "arcgis-imagery"
    //basemap: "arcgis-navigation"
    //basemap: "arcgis-light-gray"

  });

  const view = new MapView({
    map: map,
    center: [-111.8587166, 40.7665529], // Longitude, latitude
    zoom: 18, // Zoom level
    container: "main" // Div element
  });


  const housingRenderer = {
    type: "unique-value",
    legendOptions: {
      title: "Housing Type"
    },
    field: "SUBTYPE",
    uniqueValueInfos: [{
      value: "single_family",
      label: "Single Family",
      symbol: {
        type: "simple-fill",
        color: "#faeca7"
      }
    }, {
        value: "duplex",
        label: "Duplex",
        symbol: {
            type: "simple-fill",
            color: "#fc921f"
      }
    }, {
        value: "single_family_adu",
        label: "Single Family ADU",
        symbol: {
            type: "simple-fill",
            color: "#e60049"
    }
    }, {
        value: "townhome",
        label: "Townhome",
        symbol: {
            type: "simple-fill",
            color: "#28c830"
        }
    }, {
        value: "condo",
        label: "Condo",
        symbol: {
            type: "simple-fill",
            color: "#9e559c"
        }
    }, {
        value: "mobile_home_park",
        label: "Mobile Home Park",
        symbol: {
          type: "simple-fill",
          color: "#5b49c4"
        }
    }, {
        value: 'mixed th/single_family',
        label: "Townhome/Single Family",
        symbol: {
          type: "simple-fill",
          color: "#1e8553"
        }
    }, {
        value: "apartment",
        label: "Apartment",
        symbol: {
            type: "simple-fill",
            color: "#149ece"
      }
    }]
  };


  const housingPts2020Layer = new FeatureLayer({
    url: "https://services1.arcgis.com/taguadKoI1XFwivx/arcgis/rest/services/wfrc_hui_20220103_web_gdb/FeatureServer/3"
  });

  const housingParcelsLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/taguadKoI1XFwivx/arcgis/rest/services/housing_unit_inventory_2022_gdb/FeatureServer/0",
  
    renderer:housingRenderer

    });

  const housingPtsLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/taguadKoI1XFwivx/arcgis/rest/services/housing_unit_inventory_2022_gdb/FeatureServer/3"
  });


  



  // map.add(trailheadsLayer);
  map.add(housingParcelsLayer);
    
    });