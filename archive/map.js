require([
    "esri/config", 
    "esri/Map",  
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/renderers/visualVariables/ColorVariable",
    "esri/widgets/Legend",
    "esri/widgets/Expand",
    "esri/widgets/TimeSlider",
    "esri/core/reactiveUtils",
    "esri/core/promiseUtils"
  ], function(esriConfig, Map, MapView, FeatureLayer, Legend,
    Expand, TimeSlider, reactiveUtils,
    promiseUtils) {
      
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

  // time slider widget initialization
  const timeSlider = new TimeSlider({
    container: "footer",
    view: view,
    timeVisible: true, // show the time stamps on the timeslider
    loop: true
  });

  const arcadeExpressionInfos = [

    // Arcade expression that returns the total number of people not working
    {
      name: "capitalize-subtype-arcade",
      title: "Subtype",
      expression: "Proper($feature.SUBTYPE)"
    },
    {
      name: "format-type-arcade",
      title: "Type",
      expression: "Proper(Replace($feature.TYPE, '_', ' '))"
    }

  ];


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
            color: [250, 236, 167, 0.5],
            opacity: 0.5
        }
    }, {
        value: "duplex",
        label: "Duplex",
        symbol: {
            type: "simple-fill",
            color: [252, 146, 31, 0.5]
        }
    }, {
        value: "single_family_adu",
        label: "Single Family ADU",
        symbol: {
            type: "simple-fill",
            color: [230, 0, 73, 0.5]
        }
    }, {
        value: "townhome",
        label: "Townhome",
        symbol: {
            type: "simple-fill",
            color: [40, 200, 48, 0.5]
        }
    }, {
        value: "condo",
        label: "Condo",
        symbol: {
            type: "simple-fill",
            color: [158, 85, 156, 0.5]
        }
    }, {
        value: "mobile_home_park",
        label: "Mobile Home Park",
        symbol: {
            type: "simple-fill",
            color: [91, 73, 196, 0.5]
        }
    }, {
        value: 'mixed th/single_family',
        label: "Townhome/Single Family",
        symbol: {
            type: "simple-fill",
            color: [30, 133, 83, 0.5]
        }
    }, {
        value: "apartment",
        label: "Apartment",
        symbol: {
            type: "simple-fill",
            color: [20, 158, 206, 0.5]
        }
    }]
};


  // const housingPts2020Layer = new FeatureLayer({
  //   url: "https://services1.arcgis.com/taguadKoI1XFwivx/arcgis/rest/services/wfrc_hui_20220103_web_gdb/FeatureServer/3"
  // });

  const housingParcelsLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/taguadKoI1XFwivx/arcgis/rest/services/housing_unit_inventory_2022_gdb/FeatureServer/0",
    outFields: ["SUBTYPE", 'TYPE', 'COUNTY', 'BLT_YR2'],
    renderer:housingRenderer,
    popupTemplate:{
      title: "{expression/capitalize-subtype-arcade} in {CITY}",
      content: [
       
        {
          type: "fields",
          fieldInfos: [
            {
              fieldName: "expression/format-type-arcade",
              label: "Type"
            },
            {
              fieldName: "expression/capitalize-subtype-arcade",
            }
          
          ],
          
        
        }
      ],
      expressionInfos: arcadeExpressionInfos
    }
  });

  const housingPtsLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/taguadKoI1XFwivx/arcgis/rest/services/housing_unit_inventory_2022_gdb/FeatureServer/3",
    outFields: ["*"],
  });


  



  // const template = {
  //   // NAME and COUNTY are fields in the service containing the Census Tract (NAME) and county of the feature
  //   title: "Unit {UNIT_ID} in {CITY}",
  //   content: [
     
  //     {
  //       type: "fields",
  //       fieldInfos: [
  //         {
  //           fieldName: "TYPE",
  //           label: "Type"
  //         },
  //         {
  //           fieldName: "expression/capitalize-subtype-arcade",
  //           label: "Subtype"
  //         }
  //       ],
  //       expressionInfos: arcadeExpressionInfos,
      
  //     }
  //   ]
    // content: [
    //   {
    //     type:"text",
    //     text: "{expression/capitalize-subtype-arcade} in {CITY}",
    //   },
    //   {
    //     type: "fields",
    //     fieldInfos: [
    //       {
    //         fieldName: "TYPE",
    //         label: "Type"
    //       },
    //       {
    //         fieldName: "SUBTYPE",
    //         label: "Subtype"
    //       },
    //       {
    //         fieldName: "UNIT_COUNT",
    //         label: "Unit Count"
    //       },
    //       {
    //         fieldName: "APX_BLT_YR",
    //         label: "Year Built (Aprx)"
    //       },
    //       {
    //         fieldName: "TOT_BD_FT2",
    //         label: "Total Building Sqft",
    //         format: {
    //           digitSeparator: true, // Uses a comma separator in numbers >999
    //           places: 0 // Sets the number of decimal places to 0 and rounds up
    //         }
    //       },
    //       {
    //         fieldName: "TOT_VALUE",
    //         label: "Total Market Value",
    //         format: {
    //           digitSeparator: true, // Uses a comma separator in numbers >999
    //           places: 0 // Sets the number of decimal places to 0 and rounds up
    //         }
    //       }
    //     ],
    //     expressionInfos: arcadeExpressionInfos
    //   }
    // ]
  // };

  

  // // map.add(trailheadsLayer);
  map.add(housingParcelsLayer);

  view.whenLayerView(housingParcelsLayer).then((lv) => {
    // around up the full time extent to full hour
    timeSlider.fullTimeExtent =
    housingParcelsLayer.timeInfo.fullTimeExtent.expandTo("years");
    timeSlider.stops = {
      interval: housingParcelsLayer.timeInfo.interval
    };
  });

  // view.when(() => {
  //   timeSlider = new TimeSlider({
  //     container: "footer",
  //     view: view,
  //     mode: "time-window",
  //     fullTimeExtent: {
  //       start: new Date(1850, 0, 1),
  //       end: new Date(2023, 0, 1)
  //     },
  //     playRate: 2000,
  //     stops: {
  //       interval: {
  //         value: 1,
  //         unit: "years"
  //       }
  //     },
      // // create actions that will allow users to
      // // jump to months that had most burns
      // actions: [
      //   {
      //     id: "july",
      //     icon: "clock",
      //     title: "Month with most burns"
      //   },
      //   {
      //     id: "august",
      //     icon: "clock",
      //     title: "Month with second most burns"
      //   },
      //   {
      //     id: "september",
      //     icon: "clock",
      //     title: "Month with third most burns"
      //   }
      // ],
      // set custom labels for the timeslider's min, max dates
      // then hide the extent label
      // labelFormatFunction: (value, type, element, layout) => {
      //   const normal = new Intl.DateTimeFormat("en-us");
      //   switch (type) {
      //     case "min":
      //       element.setAttribute("style", "color: #ff642e;");
      //       element.innerText = "1850";
      //       break;
      //     case "max":
      //       element.setAttribute("style", "color: #ff642e;");
      //       element.innerText = "2023";
      //       break;
      //     case "extent":
      //       element.parentNode.setAttribute("style", "width:0px");
      //       break;
      //   }
      // }
    // });
    // view.ui.add(timeSlider, "top");

    // // the "trigger-action" event occurs when an item in the action button is selected
    // //  define custom actions to occur for each action.id
    // timeSlider.on("trigger-action", function (event) {
    //   const id = event.action.id;

    //   if (id === "july") {
    //     timeSlider.timeExtent = {
    //       start: new Date(2018, 6, 1),
    //       end: new Date(2018, 7, 1)
    //     };
    //   } else if (id === "august") {
    //     timeSlider.timeExtent = {
    //       start: new Date(2018, 7, 1),
    //       end: new Date(2018, 8, 1)
    //     };
    //   } else if (id === "september") {
    //     timeSlider.timeExtent = {
    //       start: new Date(2018, 8, 1),
    //       end: new Date(2018, 9, 1)
    //     };
    //   }
    // });





  // housingParcelsLayer.popupTemplate = template;
    
    });