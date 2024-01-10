// renderer used to setup the symbolizaton of the housing layers
dPixelSize = "6px"
dOutlineWidth = 1
transparency = 1
PtOutlineColor = [40,40,40]


const countyRenderer = {
    type: "unique-value",
          legendOptions: {
              title: "County"
          },
          field: "MPO",
          uniqueValueInfos: [{
                  value: "WFRC",
                  label: "WFRC",
                  symbol: {
                      type: "simple-fill",
                      color: null,
                      outline: {
                        color: [222,45,38, 1],
                        width: 2
                    }
                  }

            },{
                  value: "WFRC-Box Elder",
                  label: "WFRC-Box Elder",
                  symbol: {
                      type: "simple-fill",
                      color: null,
                      outline: {
                        color: [0,0,0, .75],
                        width: 1
                    }
                  }
            },{
                  value: "MAG",
                  label: "MAG",
                  symbol: {
                      type: "simple-fill",
                      color: null,
                      outline: {
                        color: [0,0,0, .75],
                        width: 1
                    }
                  }
            }]  
    };

const cityRenderer = {
        type: "unique-value",
              legendOptions: {
                  title: "City"
              },
              field: "MPO",
              uniqueValueInfos: [{
                      value: "WFRC",
                      label: "WFRC",
                      symbol: {
                          type: "simple-fill",
                          color: null,
                          outline: {
                            color: [222,45,38, 1],
                            width: 2
                        }
                      }
    
                },{
                      value: "WFRC-Box Elder",
                      label: "WFRC-Box Elder",
                      symbol: {
                          type: "simple-fill",
                          color: null,
                          outline: {
                            color: [0,0,255, .5],
                            width: 1
                        }
                      }
                },{
                      value: "MAG",
                      label: "MAG",
                      symbol: {
                          type: "simple-fill",
                          color: null,
                          outline: {
                            color: [0,0,255, .5],
                            width: 1
                        }
                      }
                }]  
        };
const centerRenderer = {
    type: "unique-value",
            legendOptions: {
                title: "City"
            },
            field: "Area",
            uniqueValueInfos: [{
                    value: "WFRC",
                    label: "WFRC",
                    symbol: {
                        type: "simple-fill",
                        color: null,
                        outline: {
                        color: [222,45,38, 1],
                        width: 3
                    }
                    }

            },{
                    value: "WFRC-Box Elder",
                    label: "WFRC-Box Elder",
                    symbol: {
                        type: "simple-fill",
                        color: null,
                        outline: {
                        color: [128,0,0, 1],
                        width: 1
                    }
                    }
            },{
                    value: "MAG",
                    label: "MAG",
                    symbol: {
                        type: "simple-fill",
                        color: null,
                        outline: {
                        color: [128,0,0, 1],
                        width: 1
                    }
                    }
            }]  
    };


  const pointRenderer = {
          type: "unique-value",
          legendOptions: {
              title: "Housing Type"
          },
          field: "SUBTYPE",
          uniqueValueInfos: [{
              value: "single_family",
              label: "Single Family",
              symbol: {
                type: "simple-marker",
                color: [250, 236, 167, transparency], // [R,G,B, Transparency]
                size: dPixelSize,
                outline: {
                  color: PtOutlineColor,
                  width: dOutlineWidth
              }
            }
          }, {
              value: "duplex",
              label: "Duplex",
              symbol: {
                  type: "simple-marker",
                  color: [252, 146, 31, transparency],
                  size: dPixelSize,
                  outline: {
                    color: PtOutlineColor,
                    width: dOutlineWidth
                }
              }
          }, {
              value: "single_family_adu",
              label: "Single Family ADU",
              symbol: {
                  type: "simple-marker",
                  color: [230, 0, 73, transparency],
                  size: dPixelSize,
                  outline: {
                    color: PtOutlineColor,
                    width: dOutlineWidth
                }
              }
          }, {
              value: "townhome",
              label: "Townhome",
              symbol: {
                  type: "simple-marker",
                  color: [40, 200, 48, transparency],
                  size: dPixelSize,
                  outline: {
                    color: PtOutlineColor,
                    width: dOutlineWidth
                }
              }
          }, {
              value: "condo",
              label: "Condo",
              symbol: {
                  type: "simple-marker",
                  color: [158, 85, 156, transparency],
                  size: dPixelSize,
                  outline: {
                    color: PtOutlineColor,
                    width: dOutlineWidth
                }
              }
          }, {
              value: "mobile_home_park",
              label: "Mobile Home Park",
              symbol: {
                  type: "simple-marker",
                  color: [91, 73, 196, transparency],
                  size: dPixelSize,
                  outline: {
                    color: PtOutlineColor,
                    width: dOutlineWidth
                }
              }
          }, {
              value: 'mixed th/single_family',
              label: "Townhome/Single Family",
              symbol: {
                  type: "simple-marker",
                  color: [30, 133, 83, transparency],
                  size: dPixelSize,
                  outline: {
                    color: PtOutlineColor,
                    width: dOutlineWidth
                }
              }
          }, {
              value: "apartment",
              label: "Apartment",
              symbol: {
                  type: "simple-marker",
                  color: [20, 158, 206, transparency],
                  size: dPixelSize,
                  outline: {
                    color: PtOutlineColor,
                    width: dOutlineWidth
                }
              }
          }]
        };

// renderer used to setup the symbolizaton of the housing layers
const parcelTransparency = .5;
const parcelRenderer = {
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
                    color: [250, 236, 167, parcelTransparency], // [R,G,B, Transparency]
                }
            }, {
                value: "duplex",
                label: "Duplex",
                symbol: {
                    type: "simple-fill",
                    color: [252, 146, 31, parcelTransparency]
                }
            }, {
                value: "single_family_adu",
                label: "Single Family ADU",
                symbol: {
                    type: "simple-fill",
                    color: [230, 0, 73,parcelTransparency]
                }
            }, {
                value: "townhome",
                label: "Townhome",
                symbol: {
                    type: "simple-fill",
                    color: [40, 200, 48,parcelTransparency]
                }
            }, {
                value: "condo",
                label: "Condo",
                symbol: {
                    type: "simple-fill",
                    color: [158, 85, 156,parcelTransparency]
                }
            }, {
                value: "mobile_home_park",
                label: "Mobile Home Park",
                symbol: {
                    type: "simple-fill",
                    color: [91, 73, 196,parcelTransparency]
                }
            }, {
                value: 'mixed th/single_family',
                label: "Townhome/Single Family",
                symbol: {
                    type: "simple-fill",
                    color: [30, 133, 83,parcelTransparency]
                }
            }, {
                value: "apartment",
                label: "Apartment",
                symbol: {
                    type: "simple-fill",
                    color: [20, 158, 206,parcelTransparency]
                }
            }]
          };

// arcade functions used to modify text in the popup window
const arcadeExpressionInfos = [
    {
      name: "capitalize-subtype-arcade",
      title: "Subtype",
      expression: "Proper(Replace($feature.SUBTYPE, '_', ' '))"
    },
    {
      name: "format-type-arcade",
      title: "Type",
      expression: "Proper(Replace($feature.TYPE, '_', ' '))"
    },
    {
        name: "format-value-arcade",
        title: "Total Assessed Value",
        expression: 
        "'$'+ Text($feature.TOT_VALUE, '###,###')"
    }
  ];

const parcelPopupTemplate = {
    title: "{expression/capitalize-subtype-arcade} in {CITY}",
    content: [{
          type: "fields",
          fieldInfos: [
            {
              fieldName: "expression/format-type-arcade",
              // label: "Type"
            },
            {
              fieldName: "expression/capitalize-subtype-arcade",
            },
            {
              fieldName:'APX_BLT_YR',
              label: "Approximate Year Built"
            },
            {
              fieldName:"UNIT_COUNT",
              label: "Number of Units"
            },
            {
              fieldName:"TOT_BD_FT2",
              label: "Total Bldg Square Ft.",
              format: {
                digitSeparator: true, // Uses a comma separator in numbers >999
                places: 0 // Sets the number of decimal places to 0 and rounds up
              }
            },
            {
              fieldName:'ACRES',
              label: "Acres",
              format: {
                digitSeparator: true, // Uses a comma separator in numbers >999
                places: 1 // Sets the number of decimal places to 0 and rounds up
              }
            },
            {
              fieldName:"expression/format-value-arcade",
            },  
            {
              fieldName:"COUNTY",
              label: "County"
            },
            {
              fieldName:"CITY",
              label: "City"
            },
            {
              fieldName:"CENTER",
              label: "Center"
            },
            {
              fieldName:"CENTERTYPE",
              label: "Center Type"
            },
          ],
        }
      ],
      expressionInfos: arcadeExpressionInfos
    }

