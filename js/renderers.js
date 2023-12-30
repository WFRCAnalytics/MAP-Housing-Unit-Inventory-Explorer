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
                        color: [0,0,0, .75],
                        width: 1
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
                            color: [0,0,255, .5],
                            width: 1
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
                        color: [128,0,0, .5],
                        width: 1
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