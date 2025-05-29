/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/no-amd */
/* eslint-disable linebreak-style */
// sets the calcite select boxes to a specified value

function setCalciteSelectValue(selectElement, newValue) {
    // Find the option with the specified value
    const optionToSelect = Array.from(selectElement.children).find(
        (option) => option.value === newValue,
    );

    if (optionToSelect) {
    // Set the 'selected' attribute on the option
        optionToSelect.setAttribute('selected', '');

        // Dispatch a 'change' event to simulate user interaction
        const changeEvent = new Event('change', { bubbles: true });
        selectElement.dispatchEvent(changeEvent);
    }
}

// read in a local json
function fetchLocalJsonArray(filePath) {
    return fetch(filePath)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error reading JSON file:', error);
        });
}

// populate a select box
function populateSelectBox(selectName, array) {
    const selectBox = document.getElementById(selectName);

    // Clear existing options
    selectBox.innerHTML = '';

    // Populate with options from the array
    array.forEach((item) => {
        const option = document.createElement('calcite-option');
        // option.value = item.value;  // Set the value attribute if needed
        option.setAttribute('value', item);
        option.setAttribute('label', item);
        // option.text = item;    // Set the text content of the option
        selectBox.appendChild(option);
    });
}

// populate a combobox
function populateComboBox(comboBoxName, array) {
    const comboBox = document.getElementById(comboBoxName);

    // Populate with options from the array
    array.forEach((item) => {
        const comboItem = document.createElement('calcite-combobox-item');
        // option.value = item.value;  // Set the value attribute if needed
        comboItem.setAttribute('value', item);
        comboItem.setAttribute('text-label', item);
        comboBox.appendChild(comboItem);
    });
}

function hideAndResetDefinition(feature) {
    feature.definition = null;
    feature.visible = false;
}

require([
    'esri/config',
    'esri/Map',
    'esri/geometry/Point',
    'esri/layers/FeatureLayer',
    'esri/views/MapView',
    'esri/widgets/Legend',
    'esri/widgets/TimeSlider',
    'esri/widgets/Expand',
    'esri/widgets/BasemapGallery',
    'esri/core/reactiveUtils',
    'esri/core/promiseUtils',
    'esri/rest/support/Query',
    'esri/widgets/Sketch/SketchViewModel',
    'esri/layers/GraphicsLayer',
    'esri/geometry/geometryEngineAsync',
], (
    esriConfig,
    Map,
    Point,
    FeatureLayer,
    MapView,
    Legend,
    TimeSlider,
    Expand,
    BasemapGallery,
    reactiveUtils,
    promiseUtils,
    Query,
    SketchViewModel,
    GraphicsLayer,
    geometryEngineAsync,
) => {
    esriConfig.apiKey = 'AAPK5915b242a27845f389e0a11a17dc46b46gXNFj09FJVdb711lVLGhgoVFJBqdW6ow3bl71N1hx2llpMyogGBeF8kgvrKm3cY';

    function createTimeSlider() {
        const timeSlider = new TimeSlider({
            container: 'timeSlider',
            visible: true,
            mode: 'time-window',
            view,
            // full min max of time slider
            fullTimeExtent: {
                start: new Date(1850, 0, 1),
                end: new Date(2026, 0, 1),
            },
            // starting min max of time slider
            timeExtent: {
                start: new Date(1850, 0, 1),
                end: new Date(2025, 0, 1),
            },
            // play speed, not needed?
            playRate: 2000,
            stops: {
                interval: {
                    value: 1,
                    unit: 'years',
                },
            },

            // set custom labels for the timeslider's min, max, and extent dates
            labelFormatFunction: (value, type, element, layout) => {
                const options = { year: 'numeric' };
                const normal = new Intl.DateTimeFormat('en-us', options);
                switch (type) {
                case 'min':
                    element.setAttribute('style', 'color: #0091e6;font-size: 16px;');
                    element.innerText = normal.format(value);
                    break;
                case 'max':
                    element.setAttribute('style', 'color: #0091e6;font-size: 16px;');
                    element.innerText = normal.format(value);
                    break;
                case 'extent':
                    year0 = value[0].getFullYear();
                    year1 = value[1].getFullYear();
                    element.innerText = `Year Built:
                        ${year0} - ${year1}`;
                    break;
                default:
        // do nothing
                }
            },
        });
        return timeSlider;
    }

    // Splash page
    document.getElementById('splash-page').addEventListener('click', function () {
        this.style.display = 'none'; // Hide the splash page when clicked
    });

    // store the base url
    const providedURL = window.location;
    const newURL = new URL(providedURL);

    // store paths to jsons
    const jsonBase = 'json/BASE.json';
    const jsonCounty = 'json/COUNTY.json';
    const jsonSubregion = 'json/SUBREGION.json';
    const jsonCity = 'json/CITY.json';
    const jsonCenter = 'json/CENTER.json';
    const jsonType = 'json/TYPE.json';
    const jsonCenterType = 'json/CENTER_TYPE.json';

    let activeLayer;
    let position;
    let positionChartBaseMap;
    let positionTS;
    let expanded;
    let geomParam;
    let countyParam;
    let subregionParam;
    let cityParam;
    let centerParam;
    let subtypeParam;
    let centerTypeParam;
    let lrParam;
    let frParam;
    let brtParam;
    let fwyeParam;
    let pkParam;
    let trlParam;
    let logOpParam;
    let xParam;
    let yParam;
    let zoomParam;
    let yearParam;
    let baseMapParam;
    let symbologyParam;
    let queryModeParam;
    let timeSlider;
    let year0;
    let year1;
    let x;
    let y;
    let zoom;

    // initialize variable for setting expand widget visibility on load
    const windowSizeSmall = 640; // from tailwind recommendation
    if (window.innerWidth < windowSizeSmall) {
        expanded = false;
        position = 'top-left';
        positionChartBaseMap = 'top-left';
        positionTS = 'top-left';
    } else {
        expanded = true;
        position = 'top-left';
        positionChartBaseMap = 'top-right';
        positionTS = 'bottom-left';
    }

    // initialize geographic filter options
    fetchLocalJsonArray(jsonBase).then((data) => {
        const countyArray = data[0].COUNTY;
        const subregionArray = data[0].SUBREGION;
        const cityArray = data[0].CITY;
        const centerArray = data[0].CENTER;
        populateSelectBox('countySelect', countyArray);
        populateSelectBox('subregionSelect', subregionArray);
        populateSelectBox('citySelect', cityArray);
        populateSelectBox('centerSelect', centerArray);
    });

    // initialize housing type options
    fetchLocalJsonArray(jsonType).then((data) => {
        const subtypeArray = data[0].SUBTYPE;
        populateComboBox('subtypeSelect', subtypeArray);
    });

    // initialize housing type options
    fetchLocalJsonArray(jsonCenterType).then((data) => {
        const centerTypeArray = data[0].CENTERTYPE;
        populateComboBox('centerTypeSelect', centerTypeArray);
    });

    const countiesLayer = new FeatureLayer({
        outFields: ['NAME'],
        url: 'https://services1.arcgis.com/taguadKoI1XFwivx/arcgis/rest/services/Boundaries_gdb/FeatureServer/0',
        renderer: countyRenderer,
        maxScale: 0,
        visible: false,
    });

    const subregionsLayer = new FeatureLayer({
        // outFields: ['CO_NAME'],
        url: 'https://services1.arcgis.com/taguadKoI1XFwivx/arcgis/rest/services/SubCountyArea_2019/FeatureServer',
        renderer: subregionRenderer,
        maxScale: 0,
        visible: false,
    });

    const citiesLayer = new FeatureLayer({
        outFields: ['NAME'],
        url: 'https://services1.arcgis.com/taguadKoI1XFwivx/arcgis/rest/services/Boundaries_gdb/FeatureServer/1',
        renderer: cityRenderer,
        maxScale: 0,
        // minScale: 100000,
        visible: false,
    });

    // const centersLayer = new FeatureLayer({
    //     outFields: ['AreaName', 'AreaType'],
    //     url: 'https://services1.arcgis.com/taguadKoI1XFwivx/arcgis/rest/services/Boundaries_gdb/FeatureServer/2',
    //     renderer: centerRenderer,
    //     maxScale: 0,
    //     // minScale: 50000,
    //     visible: false,
    //     popupTemplate: centerPopupTemplate,
    // });

    const centersLayer = new FeatureLayer({
        outFields: ['CenterName', 'CenterType'],
        url: 'https://services1.arcgis.com/taguadKoI1XFwivx/arcgis/rest/services/WCV_Centers_and_Regional_Land_Uses/FeatureServer/0',
        renderer: centerRenderer,
        maxScale: 0,
        // minScale: 50000,
        visible: false,
        popupTemplate: centerPopupTemplate,
    });

    // const lrStationsLayer = new FeatureLayer({
    //     // outFields: ['AreaName', 'AreaType'],
    //     url: 'https://services1.arcgis.com/taguadKoI1XFwivx/arcgis/rest/services/Tranportation_Layers_For_Housing_Explorer_gdb/FeatureServer/1',
    //     renderer: lrStationsRenderer,
    //     maxScale: 0,
    //     // minScale: 50000,
    //     visible: false,
    //     // popupTemplate: '',
    // });

    // const lrRouteLayer = new FeatureLayer({
    //     outFields: ['AreaName', 'AreaType'],
    //     url: 'https://services1.arcgis.com/taguadKoI1XFwivx/arcgis/rest/services/Tranportation_Layers_For_Housing_Explorer_gdb/FeatureServer/4',
    //     // renderer: '',
    //     maxScale: 0,
    //     // minScale: 50000,
    //     visible: false,
    //     // popupTemplate: '',
    // });

    // const crStationsLayer = new FeatureLayer({
    //     outFields: ['AreaName', 'AreaType'],
    //     url: 'https://services1.arcgis.com/taguadKoI1XFwivx/arcgis/rest/services/Tranportation_Layers_For_Housing_Explorer_gdb/FeatureServer/2',
    //     // renderer: '',
    //     maxScale: 0,
    //     // minScale: 50000,
    //     visible: false,
    //     // popupTemplate: '',
    // });

    // const crRouteLayer = new FeatureLayer({
    //     outFields: ['AreaName', 'AreaType'],
    //     url: 'https://services1.arcgis.com/taguadKoI1XFwivx/arcgis/rest/services/Tranportation_Layers_For_Housing_Explorer_gdb/FeatureServer/5',
    //     // renderer: '',
    //     maxScale: 0,
    //     // minScale: 50000,
    //     visible: false,
    //     // popupTemplate: '',
    // });

    // const brtStationsLayer = new FeatureLayer({
    //     outFields: ['AreaName', 'AreaType'],
    //     url: 'https://services1.arcgis.com/taguadKoI1XFwivx/arcgis/rest/services/Tranportation_Layers_For_Housing_Explorer_gdb/FeatureServer/3',
    //     // renderer: '',
    //     maxScale: 0,
    //     // minScale: 50000,
    //     visible: false,
    //     // popupTemplate: '',
    // });

    // const fwyInterchangesLayer = new FeatureLayer({
    //     outFields: ['AreaName', 'AreaType'],
    //     url: 'https://services1.arcgis.com/taguadKoI1XFwivx/arcgis/rest/services/Tranportation_Layers_For_Housing_Explorer_gdb/FeatureServer/0',
    //     // renderer: '',
    //     maxScale: 0,
    //     // minScale: 50000,
    //     visible: false,
    //     // popupTemplate: '',
    // });

    const ParcelsLayer = new FeatureLayer({
        outFields: ['*'],
        url: 'https://services1.arcgis.com/taguadKoI1XFwivx/arcgis/rest/services/hui_for_web2_gdb/FeatureServer/0',
        renderer: pclRendererType,
        maxScale: 0,
        visible: false,
        popupTemplate: parcelPopupTemplate,
    });

    const PointsLayer = new FeatureLayer({
        url: 'https://services1.arcgis.com/taguadKoI1XFwivx/arcgis/rest/services/hui_for_web2_gdb/FeatureServer/1',
        renderer: ptRendererType,
        outFields: ['*'],
        visible: true,
    });

    const sketchLayer = new GraphicsLayer();

    // store the main data layers in an array for loops later
    const DataLayers = [PointsLayer, ParcelsLayer];

    // Create the Map and View objects
    const defaultZoom = 13;
    const map = new Map({
        basemap: 'hybrid',
        layers: [
            PointsLayer,
            ParcelsLayer,
            centersLayer,
            citiesLayer,
            countiesLayer,
            subregionsLayer,
            sketchLayer,
            // lrStationsLayer,
        ],
    });

    const view = new MapView({
        container: 'viewDiv',
        map,
        zoom: defaultZoom,
        center: [-111.91, 40.8],
    });

    // use SketchViewModel to draw polygons that are used as a query
    let sketchGeometry = null;
    // let sketchGeometry = new GroupLayer({});
    const sketchViewModel = new SketchViewModel({
        layer: sketchLayer,

        // defaultUpdateOptions: {
        //     tool: 'reshape',
        //     toggleToolOnClick: false,
        // },
        view,
        polygonSymbol: {
            type: 'simple-fill',
            style: 'cross', // backward-diagonal, horizontal, horizontal
            // color: '#EFC8B1',
            outline: {
                width: 3,
                style: 'solid',
                color: '#23e4eb',
            },
        },
        defaultCreateOptions: { hasZ: false },
    });

    if (newURL.searchParams.toString() === '') {
        activeLayer = PointsLayer;
        // console.log('no url params');
    } else {
    // var newURL = new URL(providedURL)
        // console.log('has url params');
        const { searchParams } = newURL;
        geomParam = searchParams.get('geom');

        countyParam = searchParams.get('cny');
        subregionParam = searchParams.get('srgn');
        cityParam = searchParams.get('cty');
        centerParam = searchParams.get('ctr');
        subtypeParam = searchParams.get('type');
        centerTypeParam = searchParams.get('cen');

        lrParam = searchParams.get('lr');
        frParam = searchParams.get('fr');
        brtParam = searchParams.get('brt');
        fwyeParam = searchParams.get('fwye');
        pkParam = searchParams.get('pk');
        trlParam = searchParams.get('trl');
        logOpParam = searchParams.get('op');
        queryModeParam = searchParams.get('mode');

        xParam = Number(searchParams.get('x'));
        yParam = Number(searchParams.get('y'));
        zoomParam = Number(searchParams.get('zoom'));
        yearParam = searchParams.get('yr');
        baseMapParam = searchParams.get('bmap');
        symbologyParam = searchParams.get('sym');

        if (geomParam === 'pcl') {
            activeLayer = ParcelsLayer;
        }
        if (geomParam === 'pt') {
            activeLayer = PointsLayer;
        }
    }

    // create the base map gallery expand object
    const basemapGallery = new BasemapGallery({
        view,
        container: document.createElement('div'),
    });

    // Create an Expand instance and set the content
    // property to the DOM node of the basemap gallery widget
    // Use an Esri icon font to represent the content inside
    // of the Expand widget
    const bgExpand = new Expand({
        expandTooltip: 'Basemap',
        view,
        content: basemapGallery,
        group: 'top-right',
    });

    // basemap on change functions
    reactiveUtils.watch(
        () => basemapGallery.activeBasemap,
        () => {
            // set basemap url param
            if (basemapGallery.activeBasemap.title !== 'Basemap') { // catchs unwanted basemap value, might be fixed with Map.when()
                newURL.searchParams.set('bmap', basemapGallery.activeBasemap.title);
                window.history.replaceState({ additionalInformation: 'Updated the URL with JS' }, '', newURL);
            }
            // close the expand whenever a basemap is selected
            const mobileSize = view.heightBreakpoint === 'xsmall' || view.widthBreakpoint === 'xsmall';
            if (mobileSize) {
                bgExpand.collapse();
            }
        },
    );

    // store ui objects as variables
    const countySelect = document.getElementById('countySelect');
    const subregionSelect = document.getElementById('subregionSelect');
    const citySelect = document.getElementById('citySelect');
    const centerSelect = document.getElementById('centerSelect');
    const subtypeSelect = document.getElementById('subtypeSelect');
    const centerTypeSelect = document.getElementById('centerTypeSelect');
    const resetButton = document.getElementById('resetButton');
    const statsModeToggle = document.getElementById('statsModeToggle');
    const typeButton = document.getElementById('typeButton');
    const bltDecButton = document.getElementById('bltDecButton');
    const densityButton = document.getElementById('densityButton');
    const valueButton = document.getElementById('valueButton');
    const andButton = document.getElementById('andButton');
    const orButton = document.getElementById('orButton');

    // define default queries
    const defaultCountyQuery = '(COUNTY IS NULL OR COUNTY IS NOT NULL)';
    const defaultSubregionQuery = '(SUBCOUNTY IS NULL OR SUBCOUNTY IS NOT NULL)';
    const defaultCityQuery = '(CITY IS NULL OR CITY IS NOT NULL)';
    const defaultCenterQuery = '(CENTER IS NULL OR CENTER IS NOT NULL)';
    const defaultSubtypeQuery = '(SUBTYPE IS NULL OR SUBTYPE IS NOT NULL)';
    const defaultCenterTypeQuery = '(CENTERTYPE IS NULL OR CENTERTYPE IS NOT NULL)';

    const defaultLRquery = null;
    const defaultFRquery = null;
    const defaultBRTquery = null;
    const defaultFWYEquery = null;
    const defaultPARKquery = null;
    const defaultTRAILquery = null;
    const defaultLogicOperator = 'AND';

    const defaultYearQuery = '(APX_BLT_YR IS NULL OR APX_BLT_YR IS NOT NULL)';

    // set initial selection for geography filters - could switch to a placeholder?
    let countySelectionCurrent = null;
    let subregionSelectionCurrent = null;
    let citySelectionCurrent = null;
    let centerSelectionCurrent = null;

    let countyQuery = defaultCountyQuery;
    let subregionQuery = defaultSubregionQuery;
    let cityQuery = defaultCityQuery;
    let centerQuery = defaultCenterQuery;
    let subtypeQuery = defaultSubtypeQuery;
    let centerTypeQuery = defaultCenterTypeQuery;

    let LRquery = null;
    let FRquery = null;
    let BRTquery = null;
    let FWYEquery = null;
    let PARKquery = null;
    let TRAILquery = null;
    let logicOperator = defaultLogicOperator;
    let yearQuery = defaultYearQuery;

    let fullQuery = null;

    let countyActive = false;
    let subregionActive = false;
    let cityActive = false;
    let centerActive = false;

    let queryMode = 'ALL'; // ALL or GEOG
    let colorMode = 'TYPE'; // TYPE, DECADE, DENSITY, VALUE
    statsModeToggle.checked = false;

    // when the view object is created, create a time slider
    view.when(() => {
        // Option 1: time slider expand
        const timeSliderExpand = new Expand({
            expandIcon: 'date-time',
            expandTooltip: 'TimeSlider',
            view,
            // content: timeSlider.container,
            content: null,
            expanded: false,
        });

        view.ui.add(timeSliderExpand, { position: positionTS });

        // if the timeslider expand widget is expanded create the timeslider
        timeSliderExpand.watch('expanded', (value) => {
            if (document.getElementById('timeSlider').innerHTML.trim() === '') {
                timeSlider = createTimeSlider();
                timeSliderExpand.content = timeSlider.container;
            }
        });

        // url params for the time slider
        if (yearParam !== 'None' && yearParam) {
            timeSlider = createTimeSlider();
            timeSliderExpand.content = timeSlider.container;

            const yeerStart = yearParam.split('_')[0];
            const yeerEnd = yearParam.split('_')[1];
            timeSlider.timeExtent.start = new Date(yeerStart, 0, 1);
            timeSlider.timeExtent.end = new Date(yeerEnd, 0, 1);
            yearQuery = `(APX_BLT_YR >= ${yeerStart} AND APX_BLT_YR < ${yeerEnd})`;
        }

        // routine for timeslider stored in function
        function timeSliderChangeFunction() {
            // get the year from the slider
            const yStart = timeSlider.timeExtent.start.getFullYear();
            const yEnd = timeSlider.timeExtent.end.getFullYear();

            // set url params
            newURL.searchParams.set('yr', `${yStart}_${yEnd}`);
            window.history.replaceState({ additionalInformation: 'Updated the URL with JS' }, '', newURL);

            // update active query
            yearQuery = `(APX_BLT_YR >= ${yStart} AND APX_BLT_YR < ${yEnd})`;
            generateFullQuery();
            updateChartsUsingActiveLayerView();
        }
        // watch the time slider for changes (mouse release or arrow key press)
        document.getElementById('timeSlider').addEventListener('pointerup', timeSliderChangeFunction);
        document.getElementById('timeSlider').addEventListener('keydown', timeSliderChangeFunction);
    });

    // dynamically create the active query depending on which filters are active
    function generateFullQuery() {
        const queryComponents = [
            countyQuery,
            subregionQuery,
            cityQuery,
            centerQuery,
            subtypeQuery,
            centerTypeQuery,
            yearQuery,
        ];
        const distArray = [
            LRquery,
            FRquery,
            BRTquery,
            FWYEquery,
            PARKquery,
            TRAILquery,
        ].filter((item) => item !== null);

        const hasDistValues = distArray.length > 0;

        const distQuery = hasDistValues
            ? ` AND (${distArray.join(` ${logicOperator} `)})`
            : '';

        fullQuery = queryComponents.join(' AND ') + distQuery;
        console.log(fullQuery);
    }

    // setup actions for the reset button
    resetButton.addEventListener('click', () => {
        DataLayers.forEach((layer) => {
            // clear the filter
            view.whenLayerView(layer).then((layerView) => {
                layerView.filter = null;
            });
        });

        hideAndResetDefinition(countiesLayer);
        hideAndResetDefinition(subregionsLayer);
        hideAndResetDefinition(citiesLayer);
        hideAndResetDefinition(centersLayer);

        countyActive = false;
        subregionActive = false;
        cityActive = false;
        centerActive = false;

        countySelectionCurrent = 'None';
        subregionSelectionCurrent = 'None';
        citySelectionCurrent = 'None';
        centerSelectionCurrent = 'None';

        countySelect.disabled = false;
        subregionSelect.disabled = false;
        citySelect.disabled = false;
        centerSelect.disabled = false;

        fetchLocalJsonArray(jsonBase).then((data) => {
            const countyArray = data[0].COUNTY;
            const subregionArray = data[0].SUBREGION;
            const cityArray = data[0].CITY;
            const centerArray = data[0].CENTER;
            populateSelectBox('countySelect', countyArray);
            populateSelectBox('subregionSelect', subregionArray);
            populateSelectBox('citySelect', cityArray);
            populateSelectBox('centerSelect', centerArray);
        });

        countyQuery = defaultCountyQuery;
        subregionQuery = defaultSubregionQuery;
        cityQuery = defaultCityQuery;
        centerQuery = defaultCenterQuery;
        subtypeQuery = defaultSubtypeQuery;
        centerTypeQuery = defaultCenterTypeQuery;
        LRquery = null;
        FRquery = null;
        BRTquery = null;
        FWYEquery = null;
        PARKquery = null;
        TRAILquery = null;
        logicOperator = defaultLogicOperator;
        yearQuery = defaultYearQuery;

        subtypeSelect.value = null;
        centerTypeSelect.value = null;
        inputLR.value = null;
        inputFR.value = null;
        inputBRT.value = null;
        inputFWYE.value = null;
        inputPARK.value = null;
        inputTRAIL.value = null;
        logicOperator = 'And';

        generateFullQuery();
        andButton.style.backgroundColor = '#00619B';
        orButton.style.backgroundColor = '#797979';

        // reset time slider
        if (timeSlider) {
            timeSlider.timeExtent.start = new Date(1850, 0, 1);
            timeSlider.timeExtent.end = new Date(2024, 0, 1);
        }
        // clear sketches
        clearBtn.click();

        // remove all search params
        newURL.searchParams.delete('cny');
        newURL.searchParams.delete('srgn');
        newURL.searchParams.delete('cty');
        newURL.searchParams.delete('ctr');
        newURL.searchParams.delete('type');
        newURL.searchParams.delete('lr');
        newURL.searchParams.delete('fr');
        newURL.searchParams.delete('brt');
        newURL.searchParams.delete('fwye');
        newURL.searchParams.delete('pk');
        newURL.searchParams.delete('trl');
        newURL.searchParams.delete('yr');
        newURL.searchParams.set('op', logicOperator);

        window.history.replaceState(
            { additionalInformation: 'Updated the URL with JS' },
            '',
            newURL,
        );
        updateChartsUsingActiveLayerView();
    });

    // setup actions for the AND button
    andButton.addEventListener('click', () => {
        DataLayers.forEach((layer) => {
            logicOperator = 'And';
            generateFullQuery();

            newURL.searchParams.set('op', logicOperator);
            window.history.replaceState(
                { additionalInformation: 'Updated the URL with JS' },
                '',
                newURL,
            );
            view.whenLayerView(layer).then((layerView) => {
                layerView.filter = { where: fullQuery };
            });

            andButton.style.backgroundColor = '#00619B';
            orButton.style.backgroundColor = '#797979';
        });
        updateChartsUsingActiveLayerView();
    });

    // setup actions for the OR button
    orButton.addEventListener('click', () => {
        DataLayers.forEach((layer) => {
            logicOperator = 'Or';
            newURL.searchParams.set('op', logicOperator);
            window.history.replaceState(
                { additionalInformation: 'Updated the URL with JS' },
                '',
                newURL,
            );
            generateFullQuery();
            view.whenLayerView(layer).then((layerView) => {
                layerView.filter = { where: fullQuery };
            });
            orButton.style.backgroundColor = '#00619B';
            andButton.style.backgroundColor = '#797979';
        });
        updateChartsUsingActiveLayerView();
    });

    // setup actions for chart toggle
    statsModeToggle.addEventListener('calciteCheckboxChange', () => {
        if (statsModeToggle.checked === true) {
            queryMode = 'GEOG';
            document.getElementById('countHeader').innerHTML = 'Units in View:';
            updateChartsUsingActiveLayerView();
        } else if (statsModeToggle.checked === false) {
            queryMode = 'ALL';
            document.getElementById('countHeader').innerHTML = 'Total Units:';
            updateChartsUsingActiveLayerView();
        }
        // url params
        newURL.searchParams.set('mode', queryMode);
        window.history.replaceState({ additionalInformation: 'Updated the URL with JS' }, '', newURL);
        // console.log('queryMode', queryMode);
    });

    // setup actions for the type button
    typeButton.addEventListener('click', () => {
        typeButton.style.backgroundColor = '#00619B';
        bltDecButton.style.backgroundColor = '#797979';
        densityButton.style.backgroundColor = '#797979';
        valueButton.style.backgroundColor = '#797979';
        PointsLayer.renderer = ptRendererType;
        ParcelsLayer.renderer = pclRendererType;
        colorMode = 'TYPE';
        newURL.searchParams.set('sym', colorMode);
        window.history.replaceState({ additionalInformation: 'Updated the URL with JS' }, '', newURL);
        createYearChart();
        createTypeChart();
        updateChartsUsingActiveLayerView();
    });

    // setup actions for the Built Decade button
    bltDecButton.addEventListener('click', () => {
        typeButton.style.backgroundColor = '#797979';
        bltDecButton.style.backgroundColor = '#00619B';
        densityButton.style.backgroundColor = '#797979';
        valueButton.style.backgroundColor = '#797979';
        PointsLayer.renderer = ptRendererBuiltDecade;
        ParcelsLayer.renderer = pclRendererBuiltDecade;
        colorMode = 'DECADE';

        // url params
        newURL.searchParams.set('sym', colorMode);
        window.history.replaceState({ additionalInformation: 'Updated the URL with JS' }, '', newURL);

        createYearChart();
        createTypeChart();
        updateChartsUsingActiveLayerView();
    });

    // setup actions for the Density button
    densityButton.addEventListener('click', () => {
        typeButton.style.backgroundColor = '#797979';
        bltDecButton.style.backgroundColor = '#797979';
        densityButton.style.backgroundColor = '#00619B';
        valueButton.style.backgroundColor = '#797979';
        PointsLayer.renderer = ptRendererDensity;
        ParcelsLayer.renderer = pclRendererDensity;
        colorMode = 'DENSITY';

        // url params
        newURL.searchParams.set('sym', colorMode);
        window.history.replaceState({ additionalInformation: 'Updated the URL with JS' }, '', newURL);

        createYearChart();
        createTypeChart();
        updateChartsUsingActiveLayerView();
    });

    // setup actions for the Value button
    valueButton.addEventListener('click', () => {
        typeButton.style.backgroundColor = '#797979';
        bltDecButton.style.backgroundColor = '#797979';
        densityButton.style.backgroundColor = '#797979';
        valueButton.style.backgroundColor = '#00619B';
        PointsLayer.renderer = ptRendererValue;
        ParcelsLayer.renderer = pclRendererValue;
        colorMode = 'VALUE';

        // url params
        newURL.searchParams.set('sym', colorMode);
        window.history.replaceState({ additionalInformation: 'Updated the URL with JS' }, '', newURL);

        createYearChart();
        createTypeChart();
        updateChartsUsingActiveLayerView();
    });

    // COUNTY - filter and zoom features, update select options
    countySelect.addEventListener('calciteSelectChange', () => {
        // get the selection text
        const selectionText = countySelect.value;
        countySelectionCurrent = selectionText;

        DataLayers.forEach((layer) => {
            if (selectionText === 'None') {
                newURL.searchParams.delete('cny');
                window.history.replaceState(
                    { additionalInformation: 'Updated the URL with JS' },
                    '',
                    newURL,
                );
                countyQuery = defaultCountyQuery;
                countyActive = false;
            } else {
                newURL.searchParams.set('cny', selectionText);
                window.history.replaceState(
                    { additionalInformation: 'Updated the URL with JS' },
                    '',
                    newURL,
                );
                countyQuery = `COUNTY = '${selectionText}'`;
                countyActive = true;
            }

            // update the main query
            generateFullQuery();

            // filter the view of both layers
            view.whenLayerView(layer).then((layerView) => {
                layerView.filter = { where: fullQuery };
            });

            // update the select options
            fetchLocalJsonArray(jsonCounty).then((data) => {
                if (selectionText !== 'None') {
                    const dataFiltered = data.find((item) => item.NAME === selectionText);
                    // const countyArray = dataFiltered.COUNTY;
                    const subregionArray = dataFiltered.SUBREGION;
                    const cityArray = dataFiltered.CITY;
                    const centerArray = dataFiltered.CENTER;

                    if (subregionActive !== true && cityActive !== true && centerActive !== true) {
                        populateSelectBox('subregionSelect', subregionArray);
                        populateSelectBox('citySelect', cityArray);
                        populateSelectBox('centerSelect', centerArray);
                    }
                }
                if (selectionText === 'None') {
                    fetchLocalJsonArray(jsonBase).then((data) => {
                        const countyArray = data[0].COUNTY;
                        const subregionArray = data[0].SUBREGION;
                        const cityArray = data[0].CITY;
                        const centerArray = data[0].CENTER;
                        populateSelectBox('countySelect', countyArray);
                        populateSelectBox('subregionSelect', subregionArray);
                        populateSelectBox('citySelect', cityArray);
                        populateSelectBox('centerSelect', centerArray);
                    });
                }

                setCalciteSelectValue(countySelect, countySelectionCurrent);
                setCalciteSelectValue(subregionSelect, subregionSelectionCurrent);
                setCalciteSelectValue(citySelect, citySelectionCurrent);
                setCalciteSelectValue(centerSelect, centerSelectionCurrent);
            });
        });

        // show county outline
        hideAndResetDefinition(subregionsLayer);
        hideAndResetDefinition(citiesLayer);
        hideAndResetDefinition(centersLayer);
        countiesLayer.definitionExpression = `NAME = '${selectionText}'`;
        countiesLayer.visible = true;

        // zoom to the boundary layer (faster but zooms farther out)
        if (selectionText !== 'None') {
            const query = new Query();
            query.where = `NAME = '${selectionText}'`;
            countiesLayer.queryExtent(query).then((results) => {
                view.goTo(results.extent);
            });
        }
        if (queryMode === 'ALL') {
            updateChartsUsingActiveLayerView();
        }
    });

    // SUBREGION - filter and zoom features, update select options
    subregionSelect.addEventListener('calciteSelectChange', () => {
        // get the selection text
        const selectionText = subregionSelect.value;
        subregionSelectionCurrent = selectionText;

        DataLayers.forEach((layer) => {
            if (selectionText === 'None') {
                newURL.searchParams.delete('cny');
                window.history.replaceState(
                    { additionalInformation: 'Updated the URL with JS' },
                    '',
                    newURL,
                );
                subregionQuery = defaultSubregionQuery;
                subregionActive = false;
            } else {
                newURL.searchParams.set('srgn', selectionText);
                window.history.replaceState(
                    { additionalInformation: 'Updated the URL with JS' },
                    '',
                    newURL,
                );
                subregionQuery = `SUBCOUNTY = '${selectionText}'`;
                subregionActive = true;
            }

            // update the main query
            generateFullQuery();

            // filter the view of both layers
            view.whenLayerView(layer).then((layerView) => {
                layerView.filter = { where: fullQuery };
            });

            // update the select options
            fetchLocalJsonArray(jsonSubregion).then((data) => {
                if (selectionText !== 'None') {
                    const dataFiltered = data.find((item) => item.NAME === selectionText);
                    const countyArray = dataFiltered.COUNTY;
                    const cityArray = dataFiltered.CITY;
                    const centerArray = dataFiltered.CENTER;

                    if (countyActive !== true && cityActive !== true && centerActive !== true) {
                        populateSelectBox('countySelect', countyArray);
                        populateSelectBox('citySelect', cityArray);
                        populateSelectBox('centerSelect', centerArray);
                    }
                    if (countyActive === true) {
                        populateSelectBox('countySelect', countyArray);
                        populateSelectBox('citySelect', cityArray);
                        populateSelectBox('centerSelect', centerArray);
                    }
                }
                if (selectionText === 'None') {
                    fetchLocalJsonArray(jsonBase).then((data) => {
                        const countyArray = data[0].COUNTY;
                        const subregionArray = data[0].SUBREGION;
                        const cityArray = data[0].CITY;
                        const centerArray = data[0].CENTER;
                        populateSelectBox('countySelect', countyArray);
                        populateSelectBox('subregionSelect', subregionArray);
                        populateSelectBox('citySelect', cityArray);
                        populateSelectBox('centerSelect', centerArray);
                    });
                }

                setCalciteSelectValue(countySelect, countySelectionCurrent);
                setCalciteSelectValue(subregionSelect, subregionSelectionCurrent);
                setCalciteSelectValue(citySelect, citySelectionCurrent);
                setCalciteSelectValue(centerSelect, centerSelectionCurrent);
            });
        });

        // show subregion outline
        hideAndResetDefinition(countiesLayer);
        hideAndResetDefinition(citiesLayer);
        hideAndResetDefinition(centersLayer);
        subregionsLayer.definitionExpression = `NewSA = '${selectionText}'`;
        subregionsLayer.visible = true;

        // zoom to the boundary layer (faster but zooms farther out)
        if (selectionText !== 'None') {
            const query = new Query();
            query.where = `NewSA = '${selectionText}'`;
            subregionsLayer.queryExtent(query).then((results) => {
                view.goTo(results.extent);
            });
        }
        if (queryMode === 'ALL') {
            updateChartsUsingActiveLayerView();
        }
    });

    // CITY - filter and zoom features, update select options
    citySelect.addEventListener('calciteSelectChange', () => {
        const selectionText = citySelect.value;
        citySelectionCurrent = selectionText;

        DataLayers.forEach((layer) => {
            // fix this to include parcels and points in main app

            if (selectionText === 'None') {
                newURL.searchParams.delete('cty');
                window.history.replaceState(
                    { additionalInformation: 'Updated the URL with JS' },
                    '',
                    newURL,
                );
                cityQuery = defaultCityQuery;
                cityActive = false;
            } else {
                newURL.searchParams.set('cty', selectionText);
                window.history.replaceState(
                    { additionalInformation: 'Updated the URL with JS' },
                    '',
                    newURL,
                );
                cityQuery = `CITY = '${selectionText}'`;
                cityActive = true;
            }

            // update the main query
            generateFullQuery();

            view.whenLayerView(layer).then((layerView) => {
                layerView.filter = { where: fullQuery };
            });

            // update the select options
            fetchLocalJsonArray(jsonCity).then((data) => {
                if (selectionText !== 'None') {
                    const dataFiltered = data.find((item) => item.NAME === selectionText);
                    const countyArray = dataFiltered.COUNTY;
                    const subregionArray = dataFiltered.SUBREGION;
                    const centerArray = dataFiltered.CENTER;

                    // eslint-disable-next-line max-len
                    if (countyActive !== true && subregionActive !== true && centerActive !== true) {
                        populateSelectBox('countySelect', countyArray);
                        populateSelectBox('subregionSelect', subregionArray);
                        populateSelectBox('centerSelect', centerArray);
                    }
                    if (countyActive === true) {
                        populateSelectBox('countySelect', countyArray);
                        populateSelectBox('centerSelect', centerArray);
                    }

                    if (subregionActive === true) {
                        populateSelectBox('countySelect', countyArray);
                        populateSelectBox('subregionSelect', subregionArray);
                        populateSelectBox('centerSelect', centerArray);
                    }
                    if (centerActive === true) {
                        populateSelectBox('centerSelect', centerArray);
                    }
                }
                if (selectionText === 'None') {
                    if (countyActive === true) {
                        fetchLocalJsonArray(jsonCounty).then((data) => {
                            const dataFiltered = data.find(
                                (item) => item.NAME === countySelectionCurrent,
                            );
                            const centerArray = dataFiltered.CENTER;
                            populateSelectBox('centerSelect', centerArray);
                        });
                    }
                    if (countyActive !== true) {
                        fetchLocalJsonArray(jsonBase).then((data) => {
                            const centerArray = data[0].CENTER;
                            populateSelectBox('centerSelect', centerArray);
                        });
                    }
                }

                setCalciteSelectValue(countySelect, countySelectionCurrent);
                setCalciteSelectValue(subregionSelect, subregionSelectionCurrent);
                setCalciteSelectValue(citySelect, citySelectionCurrent);
                setCalciteSelectValue(centerSelect, centerSelectionCurrent);
            });
        });

        // show city outline
        hideAndResetDefinition(countiesLayer);
        hideAndResetDefinition(subregionsLayer);
        hideAndResetDefinition(centersLayer);
        citiesLayer.definitionExpression = `NAME = '${selectionText}'`;
        citiesLayer.visible = true;

        // zoom to the boundary layer instead
        if (selectionText !== 'None') {
            const query = new Query();
            query.where = `NAME = '${selectionText}'`;
            citiesLayer.queryExtent(query).then((results) => {
                view.goTo(results.extent);
            });
        }
        if (queryMode === 'ALL') {
            updateChartsUsingActiveLayerView();
        }
    });

    // CENTER - filter and zoom features, update select options
    centerSelect.addEventListener('calciteSelectChange', () => {
        const selectionText = centerSelect.value;
        centerSelectionCurrent = selectionText;

        DataLayers.forEach((layer) => {
            // fix this to include parcels and points in main app

            if (selectionText === 'None') {
                newURL.searchParams.delete('ctr');
                window.history.replaceState(
                    { additionalInformation: 'Updated the URL with JS' },
                    '',
                    newURL,
                );

                centerQuery = defaultCenterQuery;
                centerActive = false;
            } else {
                // update URL params
                newURL.searchParams.set('ctr', selectionText);
                window.history.replaceState(
                    { additionalInformation: 'Updated the URL with JS' },
                    '',
                    newURL,
                );

                centerQuery = `CENTER = '${selectionText}'`;
                centerActive = true;
            }

            // update the main query
            generateFullQuery();

            view.whenLayerView(layer).then((layerView) => {
                layerView.filter = { where: fullQuery };
            });

            // update the select options
            fetchLocalJsonArray(jsonCenter).then((data) => {
                const dataFiltered = data.find((item) => item.NAME === selectionText);
                const countyArray = dataFiltered.COUNTY;
                const subregionArray = dataFiltered.SUBREGION;
                const cityArray = dataFiltered.CITY;
                // const centerArray = dataFiltered.CENTER;

                if (countyActive !== true && subregionActive !== true && cityActive !== true) {
                    populateSelectBox('countySelect', countyArray);
                    populateSelectBox('subregionSelect', subregionArray);
                    populateSelectBox('citySelect', cityArray);
                }
                if (countyActive === true) {
                    populateSelectBox('countySelect', countyArray);
                    populateSelectBox('subregionSelect', subregionArray);
                    populateSelectBox('citySelect', cityArray);
                }
                if (subregionActive === true) {
                    populateSelectBox('countySelect', countyArray);
                    populateSelectBox('subregionSelect', subregionArray);
                    populateSelectBox('citySelect', cityArray);
                }
                if (cityActive === true) {
                    populateSelectBox('citySelect', cityArray);
                }

                setCalciteSelectValue(countySelect, countySelectionCurrent);
                setCalciteSelectValue(subregionSelect, subregionSelectionCurrent);
                setCalciteSelectValue(citySelect, citySelectionCurrent);
                setCalciteSelectValue(centerSelect, centerSelectionCurrent);
            });
        });

        // show center outline
        hideAndResetDefinition(countiesLayer);
        hideAndResetDefinition(subregionsLayer);
        hideAndResetDefinition(citiesLayer);
        centersLayer.definitionExpression = `CenterName = '${selectionText}'`;
        centersLayer.visible = true;

        // zoom to the boundary layer instead
        const query = new Query();
        query.where = `CenterName = '${selectionText}'`;
        centersLayer.queryExtent(query).then((results) => {
            view.goTo(results.extent);
        });

        if (queryMode === 'ALL') {
            updateChartsUsingActiveLayerView();
        }
    });

    // SUBTYPE Select
    subtypeSelect.addEventListener('calciteComboboxChange', () => {
        let selection = subtypeSelect.value;

        if (Array.isArray(selection) === false) {
            if ((selection === null) || (selection === ' ') || (selection === '')) {
                newURL.searchParams.delete('type');
                window.history.replaceState(
                    { additionalInformation: 'Updated the URL with JS' },
                    '',
                    newURL,
                );
                subtypeQuery = defaultSubtypeQuery;
            } else {
                // update URL params

                newURL.searchParams.set('type', selection);
                window.history.replaceState(
                    { additionalInformation: 'Updated the URL with JS' },
                    '',
                    newURL,
                );

                subtypeQuery = `SUBTYPE IN ('${selection}')`;
            }
        } else {
            newURL.searchParams.set('type', selection);
            window.history.replaceState(
                { additionalInformation: 'Updated the URL with JS' },
                '',
                newURL,
            );
            selection = selection.map((value) => `'${value}'`);
            subtypeQuery = `SUBTYPE IN (${selection})`;
        }

        // update the main query
        generateFullQuery();
        DataLayers.forEach((layer) => {
            view.whenLayerView(layer).then((layerView) => {
                layerView.filter = { where: fullQuery };
            });
        });
        updateChartsUsingActiveLayerView();
    });

    // CENTERTYPE Select
    centerTypeSelect.addEventListener('calciteComboboxChange', () => {
        let selection = centerTypeSelect.value;
        if (Array.isArray(selection) === false) {
            if ((selection === null) || (selection === ' ') || (selection === '')) {
                newURL.searchParams.delete('cen');
                window.history.replaceState(
                    { additionalInformation: 'Updated the URL with JS' },
                    '',
                    newURL,
                );
                centerTypeQuery = defaultCenterTypeQuery;
            } else {
                // update URL params

                newURL.searchParams.set('cen', selection);
                window.history.replaceState(
                    { additionalInformation: 'Updated the URL with JS' },
                    '',
                    newURL,
                );

                centerTypeQuery = `CENTERTYPE IN ('${selection}')`;
            }
        } else {
            newURL.searchParams.set('cen', selection);
            window.history.replaceState(
                { additionalInformation: 'Updated the URL with JS' },
                '',
                newURL,
            );
            selection = selection.map((value) => `'${value}'`);
            centerTypeQuery = `CENTERTYPE IN (${selection})`;
        }

        // update the main query
        generateFullQuery();

        DataLayers.forEach((layer) => {
            view.whenLayerView(layer).then((layerView) => {
                layerView.filter = { where: fullQuery };
            });
        });

        // show center outline
        hideAndResetDefinition(countiesLayer);
        hideAndResetDefinition(subregionsLayer);
        hideAndResetDefinition(citiesLayer);

        if (Array.isArray(selection) === false) {
            centersLayer.definitionExpression = `CenterType IN ('${selection}')`;
        } else {
            centersLayer.definitionExpression = `CenterType IN (${selection})`;
        }
        centersLayer.visible = true;

        updateChartsUsingActiveLayerView();
    });

    // initialize light rail dist filter
    const inputLR = document.getElementById('inputLR');
    inputLR.value = null;
    inputLR.addEventListener('calciteInputChange', () => {
        const userInput = inputLR.value;

        if ((userInput === null) || (userInput === ' ') || (userInput === '')) {
            newURL.searchParams.delete('lr');
            window.history.replaceState(
                { additionalInformation: 'Updated the URL with JS' },
                '',
                newURL,
            );
            LRquery = defaultLRquery;
        } else {
            // update URL params
            newURL.searchParams.set('lr', userInput);
            window.history.replaceState(
                { additionalInformation: 'Updated the URL with JS' },
                '',
                newURL,
            );
            LRquery = `DIST_LR <= '${userInput}'`;
        }

        // update the main query
        generateFullQuery();

        DataLayers.forEach((layer) => {
            view.whenLayerView(layer).then((layerView) => {
                layerView.filter = { where: fullQuery };
            });
        });

        updateChartsUsingActiveLayerView();

        // // stations (currently disabled)
        // if (userInput > 0) {
        //     lrStationsLayer.visible = true;
        // } else {
        //     lrStationsLayer.visible = false;
        // }
    });

    // initialize frontrunner dist filter
    const inputFR = document.getElementById('inputFR');
    inputFR.value = null;
    inputFR.addEventListener('calciteInputChange', () => {
        const userInput = inputFR.value;

        if ((userInput === null) || (userInput === ' ') || (userInput === '')) {
            newURL.searchParams.delete('fr');
            window.history.replaceState(
                { additionalInformation: 'Updated the URL with JS' },
                '',
                newURL,
            );
            FRquery = defaultFRquery;
        } else {
            newURL.searchParams.set('fr', userInput);
            window.history.replaceState(
                { additionalInformation: 'Updated the URL with JS' },
                '',
                newURL,
            );
            FRquery = `DIST_FR <= '${userInput}'`;
        }

        // update the main query
        generateFullQuery();

        DataLayers.forEach((layer) => {
            view.whenLayerView(layer).then((layerView) => {
                layerView.filter = { where: fullQuery };
            });
        });
        updateChartsUsingActiveLayerView();
    });

    // initialize BRT dist filter
    const inputBRT = document.getElementById('inputBRT');
    inputBRT.value = null;
    inputBRT.addEventListener('calciteInputChange', () => {
        const userInput = inputBRT.value;

        if ((userInput === null) || (userInput === ' ') || (userInput === '')) {
            newURL.searchParams.delete('brt');
            window.history.replaceState(
                { additionalInformation: 'Updated the URL with JS' },
                '',
                newURL,
            );
            BRTquery = defaultBRTquery;
        } else {
            newURL.searchParams.set('brt', userInput);
            window.history.replaceState(
                { additionalInformation: 'Updated the URL with JS' },
                '',
                newURL,
            );
            BRTquery = `DIST_BRT <= '${userInput}'`;
        }

        // update the main query
        generateFullQuery();

        DataLayers.forEach((layer) => {
            view.whenLayerView(layer).then((layerView) => {
                layerView.filter = { where: fullQuery };
            });
        });
        updateChartsUsingActiveLayerView();
    });

    // initialize FWYE dist filter
    const inputFWYE = document.getElementById('inputFWYE');
    inputFWYE.value = null;
    inputFWYE.addEventListener('calciteInputChange', () => {
        const userInput = inputFWYE.value;

        if ((userInput === null) || (userInput === ' ') || (userInput === '')) {
            newURL.searchParams.delete('fwye');
            window.history.replaceState(
                { additionalInformation: 'Updated the URL with JS' },
                '',
                newURL,
            );
            FWYEquery = defaultFWYEquery;
        } else {
            newURL.searchParams.set('fwye', userInput);
            window.history.replaceState(
                { additionalInformation: 'Updated the URL with JS' },
                '',
                newURL,
            );

            FWYEquery = `DIST_FWYE <= '${userInput}'`;
        }

        // update the main query
        generateFullQuery();

        DataLayers.forEach((layer) => {
            view.whenLayerView(layer).then((layerView) => {
                layerView.filter = { where: fullQuery };
            });
        });
        updateChartsUsingActiveLayerView();
    });

    // initialize PARK dist filter
    const inputPARK = document.getElementById('inputPARK');
    inputPARK.value = null;
    inputPARK.addEventListener('calciteInputChange', () => {
        const userInput = inputPARK.value;

        if ((userInput === null) | (userInput === ' ') | (userInput === '')) {
            newURL.searchParams.delete('pk');
            window.history.replaceState(
                { additionalInformation: 'Updated the URL with JS' },
                '',
                newURL,
            );

            PARKquery = defaultPARKquery;
        } else {
            // update URL params
            newURL.searchParams.set('pk', userInput);
            window.history.replaceState(
                { additionalInformation: 'Updated the URL with JS' },
                '',
                newURL,
            );
            PARKquery = `DIST_PARK <= '${userInput}'`;
        }

        // update the main query
        generateFullQuery();

        DataLayers.forEach((layer) => {
            view.whenLayerView(layer).then((layerView) => {
                layerView.filter = { where: fullQuery };
            });
        });
        updateChartsUsingActiveLayerView();
    });

    // initialize PARK dist filter
    const inputTRAIL = document.getElementById('inputTRAIL');
    inputTRAIL.value = null;
    inputTRAIL.addEventListener('calciteInputChange', () => {
        const userInput = inputTRAIL.value;

        if ((userInput === null) | (userInput === ' ') | (userInput === '')) {
            newURL.searchParams.delete('trl');
            window.history.replaceState(
                { additionalInformation: 'Updated the URL with JS' },
                '',
                newURL,
            );

            TRAILquery = defaultTRAILquery;
        } else {
            // update URL params
            newURL.searchParams.set('trl', userInput);
            window.history.replaceState(
                { additionalInformation: 'Updated the URL with JS' },
                '',
                newURL,
            );
            TRAILquery = `DIST_TRAIL <= '${userInput}'`;
        }

        // update the main query
        generateFullQuery();

        DataLayers.forEach((layer) => {
            view.whenLayerView(layer).then((layerView) => {
                layerView.filter = { where: fullQuery };
            });
        });

        updateChartsUsingActiveLayerView();
    });

    // =========================
    // sketch model actions
    // =========================
    const polygonBtn = document.getElementById('polygonBtn');
    const circleBtn = document.getElementById('circleBtn');
    const rectangleBtn = document.getElementById('rectangleBtn');
    const clearBtn = document.getElementById('clearBtn');

    polygonBtn.onclick = () => {
        sketchViewModel.create('polygon');
        polygonBtn.style.backgroundColor = '#00619b';
    };
    circleBtn.onclick = () => {
        sketchViewModel.create('circle');
        circleBtn.style.backgroundColor = '#00619b';
    };
    rectangleBtn.onclick = () => {
        sketchViewModel.create('rectangle');
        rectangleBtn.style.backgroundColor = '#00619b';
    };
    clearBtn.onclick = () => {
        sketchViewModel.complete();
        sketchViewModel.layer.removeAll();
        console.log('sketch deleted');
        sketchGeometry = null;
        polygonBtn.style.backgroundColor = '#2c2c2c';
        circleBtn.style.backgroundColor = '#2c2c2c';
        rectangleBtn.style.backgroundColor = '#2c2c2c';
        DataLayers.forEach((layer) => {
            view.whenLayerView(layer).then((layerView) => {
                layerView.featureEffect = null;
                layerView.filter = { where: fullQuery, geometry: sketchGeometry };
            });
        });
        updateChartsUsingActiveLayerView();
    };

    sketchViewModel.on('create', async (event) => {
        if (event.state === 'complete') {
            const geometries = sketchLayer.graphics.map((graphic) => graphic.geometry);
            sketchGeometry = await geometryEngineAsync.union(geometries.toArray());

            // apply a grayscale feature effect to non selected features
            DataLayers.forEach((layer) => {
                view.whenLayerView(layer).then((layerView) => {
                    const featureFilter = { where: fullQuery, geometry: sketchGeometry };
                    layerView.featureEffect = {
                        filter: featureFilter,
                        excludedEffect: 'grayscale(100%) opacity(90%)',
                    };
                });
            });
            updateChartsUsingActiveLayerView();
        }
    });

    sketchViewModel.on('update', async (event) => {
        // if (event.state === 'complete') // omitting this redraws the charts upon each edit event
        const geometries = sketchLayer.graphics.map((graphic) => graphic.geometry);
        sketchGeometry = await geometryEngineAsync.union(geometries.toArray());

        DataLayers.forEach((layer) => {
            view.whenLayerView(layer).then((layerView) => {
                const featureFilter = { where: fullQuery, geometry: sketchGeometry };
                layerView.featureEffect = {
                    filter: featureFilter,
                    excludedEffect: 'grayscale(100%) opacity(90%)',
                };
            });
        });
        updateChartsUsingActiveLayerView();
        // }
    });

    // ==============================================
    // on zoom, change unit of representaion
    // ==============================================

    view.watch('zoom', (newZoom) => {
    // console.log("Zoom level changed to: ", newZoom);

        if (newZoom >= 15) {
            view.whenLayerView(ParcelsLayer).then((layerView) => {
                reactiveUtils
                    .whenOnce(() => !layerView.updating)
                    .then(() => {
                        ParcelsLayer.visible = true;
                        PointsLayer.visible = false;
                    });
            });
        } else if (newZoom < 15 && newZoom > 5) {
            ParcelsLayer.visible = false;
            PointsLayer.visible = true;
            activeLayer = PointsLayer;
        }
    });

    const filtersPanel = document.getElementById('filtersPanel');
    const filtersPanelExpand = new Expand({
        expandIcon: 'sliders-horizontal',
        expandTooltip: 'Filters',
        view,
        content: filtersPanel,
        expanded,
        group: 'top-left',
    });

    view.ui.add(filtersPanelExpand, { position });

    const symbologyDiv = document.getElementById('symbology');
    const symbologyExpand = new Expand({
        expandIcon: 'legend',
        expandTooltip: 'Symbology',
        view,
        content: symbologyDiv,
        expanded: false,
        group: 'top-left',
    });
    view.ui.add(symbologyExpand, { position });

    //= ========================
    // chart stuff
    //= ========================

    // the chart objects
    let chartTop = null;
    let chartBottom = null;

    // the canvas containers
    const canvasTop = document.getElementById('canvas-top');
    const canvasBottom = document.getElementById('canvas-bottom');

    // Updates the given chart with new data
    function updatePieChart2(chart, labels, dataValues, text, colors) {
        chart.data.labels = labels;
        chart.data.datasets[0].data = dataValues;
        chart.options.title.text = text;
        chart.data.datasets[0].backgroundColor = colors;
        chart.update();
    }

    // Updates the given chart with new data
    function updateBarChart(chart, labels, dataValues, text, colors) {
        chart.data.labels = labels;
        chart.data.datasets[0].data = dataValues;
        chart.data.datasets[0].backgroundColor = colors;
        chart.options.title.text = text;
        chart.update();
    }

    // Updates the given chart with new data
    function updateStackedChart(chart, labels, dataValues, text) {
        chart.data.labels = labels;
        chart.data.datasets = dataValues;
        chart.options.title.text = text;
        chart.update();
    }

    //---------------------------------------
    // query the data the for the Type Bar chart
    //---------------------------------------

    const queryStatisticsForTypeBarChart = promiseUtils.debounce(async (
        layerview,
    ) => {
        canvasTop.style.visibility = 'hidden';

        const yearChartDefinitions = [

            {
                onStatisticField:
          "CASE WHEN BLT_DECADE = '1840-1890' THEN UNIT_COUNT ELSE 0 END",
                outStatisticFieldName: '1840-1890',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          "CASE WHEN BLT_DECADE = '1900-1950' THEN UNIT_COUNT ELSE 0 END",
                outStatisticFieldName: '1900-1950',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          "CASE WHEN BLT_DECADE = '1960' THEN UNIT_COUNT ELSE 0 END",
                outStatisticFieldName: '1960',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          "CASE WHEN BLT_DECADE = '1970' THEN UNIT_COUNT ELSE 0 END",
                outStatisticFieldName: '1970',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          "CASE WHEN BLT_DECADE = '1980' THEN UNIT_COUNT ELSE 0 END",
                outStatisticFieldName: '1980',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          "CASE WHEN BLT_DECADE = '1990' THEN UNIT_COUNT ELSE 0 END",
                outStatisticFieldName: '1990',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          "CASE WHEN BLT_DECADE = '2000' THEN UNIT_COUNT ELSE 0 END",
                outStatisticFieldName: '2000',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          "CASE WHEN BLT_DECADE = '2010' THEN UNIT_COUNT ELSE 0 END",
                outStatisticFieldName: '2010',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          "CASE WHEN BLT_DECADE = '2020' THEN UNIT_COUNT ELSE 0 END",
                outStatisticFieldName: '2020',
                statisticType: 'sum',
            },
        ];

        // the yearChartDefinintions are instantiated in a separate script
        // console.log(yearChartDefinitions)

        // query for stacked bar chart data
        let yearChartQuery;
        if (queryMode === 'ALL') {
            yearChartQuery = activeLayer.createQuery();
            yearChartQuery.where = fullQuery;
            yearChartQuery.outStatistics = yearChartDefinitions;
            yearChartQuery.cacheHint = true;
            yearChartQuery.groupByFieldsForStatistics = ['SUBTYPE'];
            if (sketchGeometry) {
                yearChartQuery.geometry = sketchGeometry;
            }
            yearChartQuery = activeLayer.queryFeatures(yearChartQuery);
        } else if (queryMode === 'GEOG') {
            yearChartQuery = layerview.createQuery();
            yearChartQuery.where = fullQuery;
            yearChartQuery.geometry = view.extent;
            yearChartQuery.outStatistics = yearChartDefinitions;
            yearChartQuery.cacheHint = true;
            yearChartQuery.groupByFieldsForStatistics = ['SUBTYPE'];
            if (sketchGeometry) {
                yearChartQuery.geometry = sketchGeometry;
            }
            yearChartQuery = layerview.queryFeatures(yearChartQuery);
        }

        return yearChartQuery.then((result) => {
            const yearChartQueryResult = result.features;
            // console.log(result.features);

            function convertWithCorrectOrder(data) {
                const { attributes } = data;
                const label = attributes.SUBTYPE;
                // Specify the order of keys based on user's request
                const orderedKeys = ['1840-1890', '1900-1950'].concat(
                    Object.keys(attributes).filter((key) => key.match(/^\d{4}$/)).sort((a, b) => parseInt(a) - parseInt(b)),
                );
                const dataValues = orderedKeys.map((key) => attributes[key]).filter((value) => typeof value === 'number');

                return {
                    label,
                    data: dataValues,
                    backgroundColor: null,
                };
            }

            const convertedArray = yearChartQueryResult.map(convertWithCorrectOrder);
            // console.log(convertedArray);

            const uniqueDecades = ['1840-1890', '1900-1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020'];
            // // console.log(uniqueDecades);

            // Update the backgroundColor attribute using the typeColorMap
            const typeColorMap = {
                single_family: '#FAECA7',
                duplex: '#FC921F',
                single_family_adu: '#E60049',
                condo: '#BD7EBE',
                townhome: '#28C830',
                mobile_home_park: '#5b49c4',
                'mixed th/single_family': '#1E8553',
                apartment: '#149ECE',
            };

            const updatedDataArray = convertedArray.map((item) => ({
                ...item,
                backgroundColor: typeColorMap[item.label],
            }));

            // console.log(updatedDataArray);

            // Function to sum corresponding elements of arrays
            function sumArrays(arrays) {
                // Find the longest array
                const maxLength = Math.max(...arrays.map((arr) => arr.length));
                // Initialize an array of zeros with the length of the longest array
                const sum = new Array(maxLength).fill(0);
                // Iterate over each array
                arrays.forEach((arr) => {
                    arr.forEach((num, index) => {
                        sum[index] += num;
                    });
                });
                return sum;
            }

            // Extract the 'data' arrays and sum them
            const summedData = sumArrays(updatedDataArray.map((obj) => obj.data));

            // console.log(summedData);

            // Function to find indices of elements that are 0
            function findZeroIndices(arr) {
                const zeroIndices = [];

                // Iterate through the array
                arr.forEach((value, index) => {
                    if (value === 0) {
                        // If the value is 0, push the index to zeroIndices
                        zeroIndices.push(index);
                    }
                });

                return zeroIndices;
            }

            // Use the function and log the result
            const zeroIndices = findZeroIndices(summedData);
            // console.log(zeroIndices);

            // Function to filter out elements by indices
            const filterDataByRemovingIndices = (dataObjects, indices) => {
                // Convert indices to a Set for faster lookup
                const indicesSet = new Set(indices);

                // Map over each dataObject to produce a new array
                return dataObjects.map((obj) => ({
                    ...obj, // Spread to copy other properties
                    data: obj.data.filter((_, index) => !indicesSet.has(index)),
                }));
            };

            // filter out the decades with zero units
            const filteredDataArray = filterDataByRemovingIndices(updatedDataArray, zeroIndices);
            // console.log(filteredDataArray);

            const uniqueDecades2 = uniqueDecades.filter((_, index) => !zeroIndices.includes(index));
            // console.log(uniqueDecades2);

            canvasTop.style.visibility = 'visible';
            updateStackedChart(
                chartTop,
                uniqueDecades2,
                filteredDataArray,
                'Housing Types - By Decade',
            );
        }, console.error);
    });

    //---------------------------------------
    // query the data the for the Type Pie chart
    //---------------------------------------

    const queryStatisticsForTypePieChart = promiseUtils.debounce((layerView) => {
        document.getElementById('countDiv').innerHTML = 'Loading...';
        canvasBottom.style.visibility = 'hidden';

        const statDefinitions = [
            {
                onStatisticField:
        'CASE WHEN (COUNTY IS NULL) OR (COUNTY IS NOT NULL) THEN UNIT_COUNT ELSE 0 END',
                outStatisticFieldName: 'total',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          "CASE WHEN SUBTYPE = 'single_family' THEN UNIT_COUNT ELSE 0 END",
                outStatisticFieldName: 'single_family',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          "CASE WHEN SUBTYPE = 'duplex' THEN UNIT_COUNT ELSE 0 END",
                outStatisticFieldName: 'duplex',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          "CASE WHEN SUBTYPE = 'single_family_adu' THEN UNIT_COUNT ELSE 0 END",
                outStatisticFieldName: 'single_family_adu',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          "CASE WHEN SUBTYPE = 'condo' THEN UNIT_COUNT ELSE 0 END",
                outStatisticFieldName: 'condo',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          "CASE WHEN SUBTYPE = 'townhome' THEN UNIT_COUNT ELSE 0 END",
                outStatisticFieldName: 'townhome',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          "CASE WHEN SUBTYPE = 'mobile_home_park' THEN UNIT_COUNT ELSE 0 END",
                outStatisticFieldName: 'mobile_home_park',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          "CASE WHEN SUBTYPE = 'mixed th/single_family' THEN UNIT_COUNT ELSE 0 END",
                outStatisticFieldName: 'mixed_th_single_family',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          "CASE WHEN SUBTYPE = 'apartment' THEN UNIT_COUNT ELSE 0 END",
                outStatisticFieldName: 'apartment',
                statisticType: 'sum',
            },
        ];

        // query data for the pie chart
        let query;
        if (queryMode === 'ALL') {
            query = activeLayer.createQuery();
            query.where = fullQuery;
            query.outStatistics = statDefinitions;
            if (sketchGeometry) {
                query.geometry = sketchGeometry;
            }
            query.cacheHint = true;
            query = activeLayer.queryFeatures(query);
        }
        if (queryMode === 'GEOG') {
            query = layerView.createQuery();
            query.where = fullQuery;
            query.geometry = view.extent;
            query.outStatistics = statDefinitions;
            if (sketchGeometry) {
                query.geometry = sketchGeometry;
            }
            query.cacheHint = true;
            query = layerView.queryFeatures(query);
        }

        return query.then((result) => {
            const allStats = result.features[0].attributes;
            document.getElementById('countDiv').innerHTML = allStats.total;
            delete allStats.total;
            const colors = [
                '#FAECA7',
                '#FC921F',
                '#E60049',
                '#BD7EBE',
                '#28C830',
                '#5b49c4',
                '#1E8553',
                '#149ECE',
            ];
            canvasBottom.style.visibility = 'visible';
            updatePieChart2(
                chartBottom,
                Object.keys(allStats),
                Object.values(allStats),
                'Housing Types',
                colors,
            );
        }, console.error);
    });

    //----------------------------------------------
    // query the data the for the Decade Bar chart
    //----------------------------------------------

    const queryStatisticsForDecadeBarChart = promiseUtils.debounce(
        async (layerview) => {
            canvasTop.style.visibility = 'hidden';

            const decadeChartDefinitions = [
                {
                    onStatisticField: "CASE WHEN (BLT_DECADE IN ('1840-1890')) THEN UNIT_COUNT ELSE 0 END",
                    outStatisticFieldName: 'year_1840-1890',
                    statisticType: 'sum',
                },
                {
                    onStatisticField: "CASE WHEN (BLT_DECADE IN ('1900-1950')) THEN UNIT_COUNT ELSE 0 END",
                    outStatisticFieldName: 'year_1900-1950',
                    statisticType: 'sum',
                },
                {
                    onStatisticField: "CASE WHEN (BLT_DECADE = '1960') THEN UNIT_COUNT ELSE 0 END",
                    outStatisticFieldName: 'year_1960',
                    statisticType: 'sum',
                },
                {
                    onStatisticField: "CASE WHEN (BLT_DECADE = '1970') THEN UNIT_COUNT ELSE 0 END",
                    outStatisticFieldName: 'year_1970',
                    statisticType: 'sum',
                },
                {
                    onStatisticField: "CASE WHEN (BLT_DECADE = '1980') THEN UNIT_COUNT ELSE 0 END",
                    outStatisticFieldName: 'year_1980',
                    statisticType: 'sum',
                },
                {
                    onStatisticField: "CASE WHEN (BLT_DECADE = '1990') THEN UNIT_COUNT ELSE 0 END",
                    outStatisticFieldName: 'year_1990',
                    statisticType: 'sum',
                },
                {
                    onStatisticField: "CASE WHEN (BLT_DECADE = '2000') THEN UNIT_COUNT ELSE 0 END",
                    outStatisticFieldName: 'year_2000',
                    statisticType: 'sum',
                },
                {
                    onStatisticField: "CASE WHEN (BLT_DECADE = '2010') THEN UNIT_COUNT ELSE 0 END",
                    outStatisticFieldName: 'year_2010',
                    statisticType: 'sum',
                },
                {
                    onStatisticField: "CASE WHEN (BLT_DECADE = '2020') THEN UNIT_COUNT ELSE 0 END",
                    outStatisticFieldName: 'year_2020',
                    statisticType: 'sum',
                },
            ];
            // console.log(statDefinitions)

            // query for stacked bar chart data
            let yearChartQuery;
            if (queryMode === 'ALL') {
                yearChartQuery = activeLayer.createQuery();
                yearChartQuery.where = fullQuery;
                yearChartQuery.outStatistics = decadeChartDefinitions;
                if (sketchGeometry) {
                    yearChartQuery.geometry = sketchGeometry;
                }
                yearChartQuery.cacheHint = true;
                yearChartQuery = activeLayer.queryFeatures(yearChartQuery);
            } else if (queryMode === 'GEOG') {
                yearChartQuery = layerview.createQuery();
                yearChartQuery.where = fullQuery;
                yearChartQuery.geometry = view.extent;
                yearChartQuery.outStatistics = decadeChartDefinitions;
                if (sketchGeometry) {
                    yearChartQuery.geometry = sketchGeometry;
                }
                yearChartQuery.cacheHint = true;
                yearChartQuery = layerview.queryFeatures(yearChartQuery);
            }

            return yearChartQuery.then((result) => {
                const yearChartQueryResult = result.features[0].attributes;
                // console.log(yearChartQueryResult)

                // Filter out objects with a sum of 0 and get an array of unique decades
                const filteredObject = Object.fromEntries(
                    Object.entries(yearChartQueryResult).filter(
                        ([key, value]) => value !== 0,
                    ),
                );
                // console.log(filteredObject);
                const valuesArray = Object.values(filteredObject);

                const uniqueDecades = Object.keys(filteredObject).map(
                    (key) => key.split('_')[1],
                );
                // console.log(uniqueDecades);

                // Update the backgroundColor attribute using the typeColorMap
                const typeColorMap = {
                    '1840-1890': '#0D0887',
                    '1900-1950': '#4D02A2',
                    1960: '#7E03A8',
                    1970: '#AA2396',
                    1980: '#CC4779',
                    1990: '#E66C5D',
                    2000: '#F99541',
                    2010: '#FEC428',
                    2020: '#FFFFBE',
                };

                const filteredColors = uniqueDecades.map((key) => typeColorMap[key]);

                canvasTop.style.visibility = 'visible';
                updateBarChart(
                    chartTop,
                    uniqueDecades,
                    valuesArray,
                    'Built Decade',
                    filteredColors,
                );
            }, console.error);
        },
    );

    //----------------------------------------------
    // query the data the for the Decade Pie chart
    //----------------------------------------------

    const queryStatisticsForDecadePieChart = promiseUtils.debounce(
        async (layerview) => {
            document.getElementById('countDiv').innerHTML = 'Loading...';
            canvasBottom.style.visibility = 'hidden';

            const decadeChartDefinitions = [
                {
                    onStatisticField:
            'CASE WHEN (COUNTY IS NULL) OR (COUNTY IS NOT NULL) THEN UNIT_COUNT ELSE 0 END',
                    outStatisticFieldName: 'total',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            "CASE WHEN (BLT_DECADE IN ('1840','1850','1860','1870', '1880','1890')) THEN UNIT_COUNT ELSE 0 END",
                    outStatisticFieldName: 'year_1840-1890',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            "CASE WHEN (BLT_DECADE IN ('1900','1910','1920','1930','1940','1950')) THEN UNIT_COUNT ELSE 0 END",
                    outStatisticFieldName: 'year_1900-1950',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            "CASE WHEN (BLT_DECADE = '1960') THEN UNIT_COUNT ELSE 0 END",
                    outStatisticFieldName: 'year_1960',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            "CASE WHEN (BLT_DECADE = '1970') THEN UNIT_COUNT ELSE 0 END",
                    outStatisticFieldName: 'year_1970',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            "CASE WHEN (BLT_DECADE = '1980') THEN UNIT_COUNT ELSE 0 END",
                    outStatisticFieldName: 'year_1980',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            "CASE WHEN (BLT_DECADE = '1990') THEN UNIT_COUNT ELSE 0 END",
                    outStatisticFieldName: 'year_1990',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            "CASE WHEN (BLT_DECADE = '2000') THEN UNIT_COUNT ELSE 0 END",
                    outStatisticFieldName: 'year_2000',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            "CASE WHEN (BLT_DECADE = '2010') THEN UNIT_COUNT ELSE 0 END",
                    outStatisticFieldName: 'year_2010',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            "CASE WHEN (BLT_DECADE = '2020') THEN UNIT_COUNT ELSE 0 END",
                    outStatisticFieldName: 'year_2020',
                    statisticType: 'sum',
                },
            ];
            // console.log(statDefinitions)

            // query for stacked bar chart data
            let yearChartQuery;
            if (queryMode === 'ALL') {
                yearChartQuery = activeLayer.createQuery();
                yearChartQuery.where = fullQuery;
                yearChartQuery.outStatistics = decadeChartDefinitions;
                if (sketchGeometry) {
                    yearChartQuery.geometry = sketchGeometry;
                }
                yearChartQuery.cacheHint = true;
                yearChartQuery = activeLayer.queryFeatures(yearChartQuery);
            } else if (queryMode === 'GEOG') {
                yearChartQuery = layerview.createQuery();
                yearChartQuery.where = fullQuery;
                yearChartQuery.geometry = view.extent;
                yearChartQuery.outStatistics = decadeChartDefinitions;
                if (sketchGeometry) {
                    yearChartQuery.geometry = sketchGeometry;
                }
                yearChartQuery.cacheHint = true;
                yearChartQuery = layerview.queryFeatures(yearChartQuery);
            }

            return yearChartQuery.then((result) => {
                const yearChartQueryResult = result.features[0].attributes;
                document.getElementById('countDiv').innerHTML = yearChartQueryResult.total;
                delete yearChartQueryResult.total;

                // Filter out objects with a sum of 0 and get an array of unique decades
                const filteredObject = Object.fromEntries(
                    Object.entries(yearChartQueryResult).filter(
                        ([key, value]) => value !== 0,
                    ),
                );
                // console.log(filteredObject);
                const valuesArray = Object.values(filteredObject);

                const uniqueDecades = Object.keys(filteredObject).map(
                    (key) => key.split('_')[1],
                );
                // console.log(uniqueDecades);

                // Update the backgroundColor attribute using the typeColorMap
                const typeColorMap = {
                    '1840-1890': '#0D0887',
                    '1900-1950': '#4D02A2',
                    1960: '#7E03A8',
                    1970: '#AA2396',
                    1980: '#CC4779',
                    1990: '#E66C5D',
                    2000: '#F99541',
                    2010: '#FEC428',
                    2020: '#FFFFBE',
                };

                const filteredColors = uniqueDecades.map((key) => typeColorMap[key]);

                canvasBottom.style.visibility = 'visible';
                updatePieChart2(
                    chartBottom,
                    uniqueDecades,
                    valuesArray,
                    'Built Decade',
                    filteredColors,
                );
            }, console.error);
        },
    );

    //----------------------------------------------
    // query the data the for the Density Bar chart
    //----------------------------------------------

    const queryStatisticsForDensityBarChart = promiseUtils.debounce(
        async (layerview) => {
            canvasTop.style.visibility = 'hidden';

            const decadeChartDefinitions = [
                {
                    onStatisticField: 'CASE WHEN (DUA < 1) THEN UNIT_COUNT ELSE 0 END',
                    outStatisticFieldName: 'class1',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            'CASE WHEN ((DUA >= 1) AND (DUA < 2)) THEN UNIT_COUNT ELSE 0 END',
                    outStatisticFieldName: 'class2',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            'CASE WHEN ((DUA >= 2) AND (DUA < 3)) THEN UNIT_COUNT ELSE 0 END',
                    outStatisticFieldName: 'class3',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            'CASE WHEN ((DUA >= 3) AND (DUA < 5)) THEN UNIT_COUNT ELSE 0 END',
                    outStatisticFieldName: 'class4',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            'CASE WHEN ((DUA >= 5) AND (DUA < 7)) THEN UNIT_COUNT ELSE 0 END',
                    outStatisticFieldName: 'class5',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            'CASE WHEN ((DUA >= 7) AND (DUA < 10)) THEN UNIT_COUNT ELSE 0 END',
                    outStatisticFieldName: 'class6',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            'CASE WHEN ((DUA >= 10) AND (DUA < 20)) THEN UNIT_COUNT ELSE 0 END',
                    outStatisticFieldName: 'class7',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            'CASE WHEN ((DUA >= 20) AND (DUA < 50)) THEN UNIT_COUNT ELSE 0 END',
                    outStatisticFieldName: 'class8',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            'CASE WHEN ((DUA >= 50) AND (DUA < 100)) THEN UNIT_COUNT ELSE 0 END',
                    outStatisticFieldName: 'class9',
                    statisticType: 'sum',
                },
                {
                    onStatisticField: 'CASE WHEN (DUA >= 100) THEN UNIT_COUNT ELSE 0 END',
                    outStatisticFieldName: 'class10',
                    statisticType: 'sum',
                },
            ];

            // query for stacked bar chart data
            let yearChartQuery;
            if (queryMode === 'ALL') {
                yearChartQuery = activeLayer.createQuery();
                yearChartQuery.where = fullQuery;
                yearChartQuery.outStatistics = decadeChartDefinitions;
                if (sketchGeometry) {
                    yearChartQuery.geometry = sketchGeometry;
                }
                yearChartQuery.cacheHint = true;
                yearChartQuery = activeLayer.queryFeatures(yearChartQuery);
            } else if (queryMode === 'GEOG') {
                yearChartQuery = layerview.createQuery();
                yearChartQuery.where = fullQuery;
                yearChartQuery.geometry = view.extent;
                yearChartQuery.outStatistics = decadeChartDefinitions;
                if (sketchGeometry) {
                    yearChartQuery.geometry = sketchGeometry;
                }
                yearChartQuery.cacheHint = true;
                yearChartQuery = layerview.queryFeatures(yearChartQuery);
            }

            return yearChartQuery.then((result) => {
                const yearChartQueryResult = result.features[0].attributes;

                // Filter out objects with a sum of 0 and get an array of unique decades
                const filteredObject = Object.fromEntries(
                    Object.entries(yearChartQueryResult).filter(
                        ([key, value]) => value !== 0,
                    ),
                );
                const valuesArray = Object.values(filteredObject);
                const uniqueKeys = Object.keys(filteredObject);

                // Update the backgroundColor attribute using the typeColorMap
                const colorMap = {
                    class1: '#FFFFD9',
                    class2: '#EFF9B5',
                    class3: '#CFECB3',
                    class4: '#97D6B9',
                    class5: '#5DC0C0',
                    class6: '#31A6C2',
                    class7: '#1F80B8',
                    class8: '#2355A4',
                    class9: '#22318D',
                    class10: '#081D58',
                };

                const labelMap = {
                    class1: '< 1 units / acre',
                    class2: '1 - 2 units / acre',
                    class3: '2 - 3 units / acre',
                    class4: '3 - 5 units / acre',
                    class5: '5 - 7 units / acre',
                    class6: '7 - 10 units / acre',
                    class7: '10 - 20 units / acre',
                    class8: '20 - 50 units / acre',
                    class9: '50 - 100 units / acre',
                    class10: '> 100 units / acre',
                };

                const filteredColors = uniqueKeys.map((key) => colorMap[key]);
                const filteredLabels = uniqueKeys.map((key) => labelMap[key]);

                canvasTop.style.visibility = 'visible';
                updateBarChart(
                    chartTop,
                    filteredLabels,
                    valuesArray,
                    'Residential Density',
                    filteredColors,
                );
            }, console.error);
        },
    );

    //----------------------------------------------
    // query the data the for the Density Pie chart
    //----------------------------------------------

    const queryStatisticsForDensityPieChart = promiseUtils.debounce(
        async (layerview) => {
            document.getElementById('countDiv').innerHTML = 'Loading...';
            canvasBottom.style.visibility = 'hidden';

            const decadeChartDefinitions = [
                {
                    onStatisticField:
            'CASE WHEN (COUNTY IS NULL) OR (COUNTY IS NOT NULL) THEN UNIT_COUNT ELSE 0 END',
                    outStatisticFieldName: 'total',
                    statisticType: 'sum',
                },
                {
                    onStatisticField: 'CASE WHEN (DUA < 1) THEN UNIT_COUNT ELSE 0 END',
                    outStatisticFieldName: 'class1',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            'CASE WHEN ((DUA >= 1) AND (DUA < 2)) THEN UNIT_COUNT ELSE 0 END',
                    outStatisticFieldName: 'class2',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            'CASE WHEN ((DUA >= 2) AND (DUA < 3)) THEN UNIT_COUNT ELSE 0 END',
                    outStatisticFieldName: 'class3',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            'CASE WHEN ((DUA >= 3) AND (DUA < 5)) THEN UNIT_COUNT ELSE 0 END',
                    outStatisticFieldName: 'class4',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            'CASE WHEN ((DUA >= 5) AND (DUA < 7)) THEN UNIT_COUNT ELSE 0 END',
                    outStatisticFieldName: 'class5',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            'CASE WHEN ((DUA >= 7) AND (DUA < 10)) THEN UNIT_COUNT ELSE 0 END',
                    outStatisticFieldName: 'class6',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            'CASE WHEN ((DUA >= 10) AND (DUA < 20)) THEN UNIT_COUNT ELSE 0 END',
                    outStatisticFieldName: 'class7',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            'CASE WHEN ((DUA >= 20) AND (DUA < 50)) THEN UNIT_COUNT ELSE 0 END',
                    outStatisticFieldName: 'class8',
                    statisticType: 'sum',
                },
                {
                    onStatisticField:
            'CASE WHEN ((DUA >= 50) AND (DUA < 100)) THEN UNIT_COUNT ELSE 0 END',
                    outStatisticFieldName: 'class9',
                    statisticType: 'sum',
                },
                {
                    onStatisticField: 'CASE WHEN (DUA >= 100) THEN UNIT_COUNT ELSE 0 END',
                    outStatisticFieldName: 'class10',
                    statisticType: 'sum',
                },
            ];

            // query for stacked bar chart data
            let yearChartQuery;
            if (queryMode === 'ALL') {
                yearChartQuery = activeLayer.createQuery();
                yearChartQuery.where = fullQuery;
                yearChartQuery.outStatistics = decadeChartDefinitions;
                if (sketchGeometry) {
                    yearChartQuery.geometry = sketchGeometry;
                }
                yearChartQuery.cacheHint = true;
                yearChartQuery = activeLayer.queryFeatures(yearChartQuery);
            } else if (queryMode === 'GEOG') {
                yearChartQuery = layerview.createQuery();
                yearChartQuery.where = fullQuery;
                yearChartQuery.geometry = view.extent;
                yearChartQuery.outStatistics = decadeChartDefinitions;
                if (sketchGeometry) {
                    yearChartQuery.geometry = sketchGeometry;
                }
                yearChartQuery.cacheHint = true;
                yearChartQuery = layerview.queryFeatures(yearChartQuery);
            }

            return yearChartQuery.then((result) => {
                const yearChartQueryResult = result.features[0].attributes;
                document.getElementById('countDiv').innerHTML = yearChartQueryResult.total;
                delete yearChartQueryResult.total;
                // Filter out objects with a sum of 0 and get an array of unique decades
                const filteredObject = Object.fromEntries(
                    Object.entries(yearChartQueryResult).filter(
                        ([key, value]) => value !== 0,
                    ),
                );
                const valuesArray = Object.values(filteredObject);
                const uniqueKeys = Object.keys(filteredObject);

                // Update the backgroundColor attribute using the typeColorMap
                const colorMap = {
                    class1: '#FFFFD9',
                    class2: '#EFF9B5',
                    class3: '#CFECB3',
                    class4: '#97D6B9',
                    class5: '#5DC0C0',
                    class6: '#31A6C2',
                    class7: '#1F80B8',
                    class8: '#2355A4',
                    class9: '#22318D',
                    class10: '#081D58',
                };

                const labelMap = {
                    class1: '< 1 units / acre',
                    class2: '1 - 2 units / acre',
                    class3: '2 - 3 units / acre',
                    class4: '3 - 5 units / acre',
                    class5: '5 - 7 units / acre',
                    class6: '7 - 10 units / acre',
                    class7: '10 - 20 units / acre',
                    class8: '20 - 50 units / acre',
                    class9: '50 - 100 units / acre',
                    class10: '> 100 units / acre',
                };

                const filteredColors = uniqueKeys.map((key) => colorMap[key]);
                const filteredLabels = uniqueKeys.map((key) => labelMap[key]);
                canvasBottom.style.visibility = 'visible';
                updatePieChart2(
                    chartBottom,
                    filteredLabels,
                    valuesArray,
                    'Residential Density',
                    filteredColors,
                );
            }, console.error);
        },
    );

    //----------------------------------------------
    // query the data the for the Value Bar chart
    //----------------------------------------------

    const queryStatisticsForValueBarChart = promiseUtils.debounce(async (
        layerview,
    ) => {
        canvasTop.style.visibility = 'hidden';

        const decadeChartDefinitions = [
            {
                onStatisticField:
          'CASE WHEN ((TOT_VALUE / ACRES ) < 1200000) THEN UNIT_COUNT ELSE 0 END',
                outStatisticFieldName: 'class1',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          'CASE WHEN (((TOT_VALUE / ACRES ) >= 1200000) AND ((TOT_VALUE / ACRES ) < 1600000)) THEN UNIT_COUNT ELSE 0 END',
                outStatisticFieldName: 'class2',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          'CASE WHEN (((TOT_VALUE / ACRES ) >= 1600000) AND ((TOT_VALUE / ACRES ) < 1900000)) THEN UNIT_COUNT ELSE 0 END',
                outStatisticFieldName: 'class3',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          'CASE WHEN (((TOT_VALUE / ACRES ) >= 1900000) AND ((TOT_VALUE / ACRES ) < 2100000)) THEN UNIT_COUNT ELSE 0 END',
                outStatisticFieldName: 'class4',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          'CASE WHEN (((TOT_VALUE / ACRES ) >= 2100000) AND ((TOT_VALUE / ACRES ) < 2400000)) THEN UNIT_COUNT ELSE 0 END',
                outStatisticFieldName: 'class5',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          'CASE WHEN (((TOT_VALUE / ACRES ) >= 2400000) AND ((TOT_VALUE / ACRES ) < 2800000)) THEN UNIT_COUNT ELSE 0 END',
                outStatisticFieldName: 'class6',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          'CASE WHEN (((TOT_VALUE / ACRES ) >= 2800000) AND ((TOT_VALUE / ACRES ) < 3500000)) THEN UNIT_COUNT ELSE 0 END',
                outStatisticFieldName: 'class7',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          'CASE WHEN ((TOT_VALUE / ACRES ) >= 3500000) THEN UNIT_COUNT ELSE 0 END',
                outStatisticFieldName: 'class8',
                statisticType: 'sum',
            },
        ];

        // query for stacked bar chart data
        let yearChartQuery;
        if (queryMode === 'ALL') {
            yearChartQuery = activeLayer.createQuery();
            yearChartQuery.where = fullQuery;
            yearChartQuery.outStatistics = decadeChartDefinitions;
            if (sketchGeometry) {
                yearChartQuery.geometry = sketchGeometry;
            }
            yearChartQuery.cacheHint = true;
            yearChartQuery = activeLayer.queryFeatures(yearChartQuery);
        } else if (queryMode === 'GEOG') {
            yearChartQuery = layerview.createQuery();
            yearChartQuery.where = fullQuery;
            yearChartQuery.geometry = view.extent;
            yearChartQuery.outStatistics = decadeChartDefinitions;
            if (sketchGeometry) {
                yearChartQuery.geometry = sketchGeometry;
            }
            yearChartQuery.cacheHint = true;
            yearChartQuery = layerview.queryFeatures(yearChartQuery);
        }

        return yearChartQuery.then((result) => {
            const yearChartQueryResult = result.features[0].attributes;

            // Filter out objects with a sum of 0 and get an array of unique decades
            const filteredObject = Object.fromEntries(
                Object.entries(yearChartQueryResult).filter(
                    ([key, value]) => value !== 0,
                ),
            );
            const valuesArray = Object.values(filteredObject);
            const uniqueKeys = Object.keys(filteredObject);

            // Update the backgroundColor attribute using the typeColorMap
            const colorMap = {
                class1: '#3DA1D1',
                class2: '#86BAD9',
                class3: '#FFE300',
                class4: '#DEEE89',
                class5: '#F6E36B',
                class6: '#F8AF4E',
                class7: '#F77833',
                class8: '#F0261C',
            };

            const labelMap = {
                class1: '< 1.2 M$',
                class2: '1.2 - 1.6 M$',
                class3: '1.6 - 1.9 M$',
                class4: '1.9 - 2.1 M$',
                class5: '2.1 - 2.4 M$',
                class6: '2.4 - 2.8 M$',
                class7: '2.8 - 3.5 M$',
                class8: '> 3.5 M$',
            };

            const filteredColors = uniqueKeys.map((key) => colorMap[key]);
            const filteredLabels = uniqueKeys.map((key) => labelMap[key]);
            canvasTop.style.visibility = 'visible';
            updateBarChart(
                chartTop,
                filteredLabels,
                valuesArray,
                'Valuation per Acre',
                filteredColors,
            );
        }, console.error);
    });

    //----------------------------------------------
    // query the data the for the Value Pie chart
    //----------------------------------------------

    const queryStatisticsForValuePieChart = promiseUtils.debounce(async (
        layerview,
    ) => {
        document.getElementById('countDiv').innerHTML = 'Loading...';
        canvasBottom.style.visibility = 'hidden';

        const decadeChartDefinitions = [
            {
                onStatisticField:
          'CASE WHEN (COUNTY IS NULL) OR (COUNTY IS NOT NULL) THEN UNIT_COUNT ELSE 0 END',
                outStatisticFieldName: 'total',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          'CASE WHEN ((TOT_VALUE / ACRES ) < 1200000) THEN UNIT_COUNT ELSE 0 END',
                outStatisticFieldName: 'class1',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          'CASE WHEN (((TOT_VALUE / ACRES ) >= 1200000) AND ((TOT_VALUE / ACRES ) < 1600000)) THEN UNIT_COUNT ELSE 0 END',
                outStatisticFieldName: 'class2',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          'CASE WHEN (((TOT_VALUE / ACRES ) >= 1600000) AND ((TOT_VALUE / ACRES ) < 1900000)) THEN UNIT_COUNT ELSE 0 END',
                outStatisticFieldName: 'class3',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          'CASE WHEN (((TOT_VALUE / ACRES ) >= 1900000) AND ((TOT_VALUE / ACRES ) < 2100000)) THEN UNIT_COUNT ELSE 0 END',
                outStatisticFieldName: 'class4',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          'CASE WHEN (((TOT_VALUE / ACRES ) >= 2100000) AND ((TOT_VALUE / ACRES ) < 2400000)) THEN UNIT_COUNT ELSE 0 END',
                outStatisticFieldName: 'class5',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          'CASE WHEN (((TOT_VALUE / ACRES ) >= 2400000) AND ((TOT_VALUE / ACRES ) < 2800000)) THEN UNIT_COUNT ELSE 0 END',
                outStatisticFieldName: 'class6',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          'CASE WHEN (((TOT_VALUE / ACRES ) >= 2800000) AND ((TOT_VALUE / ACRES ) < 3500000)) THEN UNIT_COUNT ELSE 0 END',
                outStatisticFieldName: 'class7',
                statisticType: 'sum',
            },
            {
                onStatisticField:
          'CASE WHEN ((TOT_VALUE / ACRES ) >= 3500000) THEN UNIT_COUNT ELSE 0 END',
                outStatisticFieldName: 'class8',
                statisticType: 'sum',
            },
        ];

        // query for stacked bar chart data
        let yearChartQuery;
        if (queryMode === 'ALL') {
            yearChartQuery = activeLayer.createQuery();
            yearChartQuery.where = fullQuery;
            yearChartQuery.outStatistics = decadeChartDefinitions;
            if (sketchGeometry) {
                yearChartQuery.geometry = sketchGeometry;
            }
            yearChartQuery.cacheHint = true;
            yearChartQuery = activeLayer.queryFeatures(yearChartQuery);
        } else if (queryMode === 'GEOG') {
            yearChartQuery = layerview.createQuery();
            yearChartQuery.where = fullQuery;
            yearChartQuery.geometry = view.extent;
            yearChartQuery.outStatistics = decadeChartDefinitions;
            if (sketchGeometry) {
                yearChartQuery.geometry = sketchGeometry;
            }
            yearChartQuery.cacheHint = true;
            yearChartQuery = layerview.queryFeatures(yearChartQuery);
        }

        return yearChartQuery.then((result) => {
            const yearChartQueryResult = result.features[0].attributes;
            document.getElementById('countDiv').innerHTML = yearChartQueryResult.total;
            delete yearChartQueryResult.total;
            // Filter out objects with a sum of 0 and get an array of unique decades
            const filteredObject = Object.fromEntries(
                Object.entries(yearChartQueryResult).filter(
                    ([key, value]) => value !== 0,
                ),
            );
            const valuesArray = Object.values(filteredObject);
            const uniqueKeys = Object.keys(filteredObject);

            // Update the backgroundColor attribute using the typeColorMap
            const colorMap = {
                class1: '#F0261C',
                class2: '#F77833',
                class3: '#F8AF4E',
                class4: '#F6E36B',
                class5: '#DEEE89',
                class6: '#FFE300',
                class7: '#86BAD9',
                class8: '#3DA1D1',
            };

            const labelMap = {
                class1: '< 1.2 M$',
                class2: '1.2 - 1.6 M$',
                class3: '1.6 - 1.9 M$',
                class4: '1.9 - 2.1 M$',
                class5: '2.1 - 2.4 M$',
                class6: '2.4 - 2.8 M$',
                class7: '2.8 - 3.5 M$',
                class8: '> 3.5 M$',
            };

            const filteredColors = uniqueKeys.map((key) => colorMap[key]);
            const filteredLabels = uniqueKeys.map((key) => labelMap[key]);

            canvasBottom.style.visibility = 'visible';

            updatePieChart2(
                chartBottom,
                filteredLabels,
                valuesArray,
                'Valuation per Acre',
                filteredColors,
            );
        }, console.error);
    });

    // updates the charts using the layerview of whichever layer is active
    function updateChartsUsingActiveLayerView() {
        view.whenLayerView(activeLayer).then((layerView) => {
            reactiveUtils
                .whenOnce(() => !layerView.updating)
                .then(() => {
                    switch (colorMode) {
                    case 'TYPE':
                        queryStatisticsForTypePieChart(layerView);
                        queryStatisticsForTypeBarChart(layerView);
                        break;
                    case 'DECADE':
                        queryStatisticsForDecadePieChart(layerView);
                        queryStatisticsForDecadeBarChart(layerView);
                        break;
                    case 'DENSITY':
                        queryStatisticsForDensityPieChart(layerView);
                        queryStatisticsForDensityBarChart(layerView);
                        break;
                    case 'VALUE':
                        queryStatisticsForValuePieChart(layerView);
                        queryStatisticsForValueBarChart(layerView);
                        break;
                    default:
                      // do nothing
                    }
                });
        });
    }

    // instantiate the year stacked chart
    function createYearChart() {
    // Destroy the existing chart instance if it exists
        if (chartTop) {
            chartTop.destroy();
        }

        chartTop = new Chart(canvasTop.getContext('2d'), {
            type: 'bar',
            data: {
                labels: [],
                datasets: [
                    {
                        label: null,
                        backgroundColor: '#149dcf',
                        data: [],
                    },
                ],
            },
            options: {
                // responsive: false,
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    // text: "Built Decade",
                    fontColor: '#FFFFFF',
                    fontSize: 13,
                },
                scales: {
                    xAxes: [
                        {
                            stacked: true,
                            ticks: {
                                beginAtZero: true,
                                precision: 0,
                                fontColor: '#FFFFFF',
                            },
                            gridLines: { color: '#ccc' },
                        },
                    ],
                    yAxes: [
                        {
                            stacked: true,
                            ticks: {
                                fontColor: '#FFFFFF',
                            },
                            gridLines: { color: '#ccc' },
                        },
                    ],
                },
            },
        });
        canvasTop.style.backgroundColor = 'rgba(75,75,75,1)';
        canvasTop.style.border = '1px solid #ccc';
    }

    // instantiate the type pie chart
    function createTypeChart() {
    // const canvasBottom = document.getElementById("canvas-bottom");

        // Destroy the existing chart instance if it exists
        if (chartBottom) {
            chartBottom.destroy();
        }

        chartBottom = new Chart(canvasBottom.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: [
                    'single_family',
                    'duplex',
                    'single_family_adu',
                    'condo',
                    'townhome',
                    'mobile_home_park',
                    'mixed th/single_family',
                    'apartment',
                ],
                datasets: [
                    {
                        backgroundColor: [
                            '#FAECA7',
                            '#FC921F',
                            '#E60049',
                            '#BD7EBE',
                            '#28C830',
                            '#9E559C',
                            '#1E8553',
                            '#149ECE',
                        ],
                        borderWidth: 0,
                        data: [0, 0, 0, 0, 0, 0, 0, 0],
                    },
                ],
            },
            options: {
                responsive: true,
                cutoutPercentage: 25,
                legend: {
                    display: false,
                    position: 'top',
                },
                layout: {
                    padding: { bottom: 15 },
                },
                title: {
                    display: true,
                    // text: "Housing Type",
                    fontColor: '#FFFFFF',
                    fontSize: 13,
                },
            },
        });
        canvasBottom.style.backgroundColor = 'rgba(75,75,75,1)';
        canvasBottom.style.border = '1px solid #ccc';
    }

    // create the charts
    createYearChart();
    createTypeChart();

    // draw the charts once
    if (queryMode === 'ALL') {
        updateChartsUsingActiveLayerView();
    }

    // when the view is stationary after a move, update the charts
    // waits till the current layerview stops drawing
    reactiveUtils.when(
        () => view.stationary === true,
        () => {
            if (queryMode === 'GEOG') {
                updateChartsUsingActiveLayerView();
            }
        },
    );

    // create an expand object for the charts
    const chartPanel = document.getElementById('chartPanel');
    const chartExpand = new Expand({
        expandIcon: 'graph-bar-side-by-side',
        expandTooltip: 'Statistics',
        view,
        content: chartPanel,
        expanded,
        group: 'top-right',
    });

    view.when(() => {
    // get the first layer in the collection of operational layers in the WebMap
    // when the resources in the MapView have loaded.
        const legend = new Legend({
            view,
            container: document.getElementById('symbology'),
            layerInfos: [
                {
                    layer: PointsLayer,
                    title: '',
                },
                {
                    layer: ParcelsLayer,
                    title: '',
                },
            ],
        });

        if (window.innerWidth < windowSizeSmall) {
            legend.hideLayersNotInCurrentView = true;
            legend.style = {
                type: 'card',
                layout: 'auto',
            };
        }
    });

    view.ui.add(chartExpand, { position: positionChartBaseMap });
    view.ui.add(bgExpand, { position: positionChartBaseMap });

    // move the zoom icon
    view.ui.move('zoom', 'bottom-right');

    // make these divs visible once the view has loaded
    view.when(() => {
        filtersPanel.style.display = 'block';
        symbologyDiv.style.display = 'flex';
        chartPanel.style.display = 'flex';
    });

    //= ==============================
    // urlParams Functionality
    //= ==============================
    view.when(() => {
    // if provide URL has searchParams update the map
        if (newURL.searchParams.toString() !== '') {
            if (countyParam !== 'None' && countyParam) {
                countySelect.value = countyParam;
                countyQuery = `COUNTY = '${countyParam}'`;
                // console.log(countyParam);
            }
            if (subregionParam !== 'None' && subregionParam) {
                subregionSelect.value = subregionParam;
                subregionQuery = `SUBCOUNTY = '${subregionParam}'`;
            }
            if (cityParam !== 'None' && cityParam) {
                citySelect.value = cityParam;
                cityQuery = `CITY = '${cityParam}'`;
            }
            // center url params
            if (centerParam !== 'None' && centerParam) {
                centerSelect.value = centerParam;
                centerQuery = `CENTER = '${centerParam}'`;
            }
            // subtype url params
            if (subtypeParam !== 'None' && subtypeParam) {
                if (subtypeParam.includes(',')) {
                    subtypeParam = subtypeParam.split(',');
                    subtypeSelect.value = subtypeParam;
                    subtypeQuery = `SUBTYPE IN (${subtypeParam})`;
                } else {
                    subtypeSelect.value = subtypeParam;
                    subtypeQuery = `SUBTYPE IN ('${subtypeParam}')`;
                }
            }
            // centertype url params
            if (centerTypeParam !== 'None' && centerTypeParam) {
                if (centerTypeParam.includes(',')) {
                    centerTypeParam = centerTypeParam.split(',');
                    centerTypeSelect.value = centerTypeParam;
                    centerTypeQuery = `CENTERTYPE IN (${centerTypeParam})`;
                } else {
                    centerTypeSelect.value = centerTypeParam;
                    centerTypeQuery = `CENTERTYPE IN ('${centerTypeParam}')`;
                }
            }
            // light rail url params
            if (lrParam !== 'None' && lrParam) {
                inputLR.value = lrParam;
                LRquery = `DIST_LR <= '${lrParam}'`;
            }
            if (frParam !== 'None' && frParam) {
                inputFR.value = frParam;
                FRquery = `DIST_FR <= '${frParam}'`;
            }
            if (brtParam !== 'None' && brtParam) {
                inputBRT.value = brtParam;
                BRTquery = `DIST_BRT <= '${brtParam}'`;
            }
            if (fwyeParam !== 'None' && fwyeParam) {
                inputFWYE.value = fwyeParam;
                FWYEquery = `DIST_FWYE <= '${fwyeParam}'`;
            }
            if (pkParam !== 'None' && pkParam) {
                inputPARK.value = pkParam;
                PARKquery = `DIST_PARK <= '${pkParam}'`;
            }
            if (trlParam !== 'None' && trlParam) {
                inputTRAIL.value = trlParam;
                TRAILquery = `DIST_TRAIL <= '${trlParam}'`;
            }

            if (logOpParam !== 'None' && logOpParam) {
                if (logOpParam === 'And') {
                    logicOperator = 'And';
                    andButton.style.backgroundColor = '#00619B';
                    orButton.style.backgroundColor = '#797979';
                }
                if (logOpParam === 'Or') {
                    orButton.style.backgroundColor = '#00619B';
                    andButton.style.backgroundColor = '#797979';
                    logicOperator = 'Or';
                }
                logicOperator = logOpParam;
            }

            // add geography boundary to map on load
            if (countyParam && subregionParam == null && cityParam == null && centerParam == null) {
                countiesLayer.definitionExpression = `NAME = '${countyParam}'`;
                countiesLayer.visible = true;
            }
            if (subregionParam && cityParam == null && centerParam == null) {
                subregionsLayer.definitionExpression = `SUBCOUNTY = '${subregionParam}'`;
                subregionsLayer.visible = true;
            }
            if (cityParam && centerParam == null) {
                citiesLayer.definitionExpression = `NAME = '${cityParam}'`;
                citiesLayer.visible = true;
            }
            if (centerParam) {
                centersLayer.definitionExpression = `CenterName = '${centerParam}'`;
                centersLayer.visible = true;
            }

            // disable geo selections if params are provided, lazy solution
            if (countyParam || subregionParam || cityParam || centerParam) {
                countySelect.disabled = true;
                subregionSelect.disabled = true;
                citySelect.disabled = true;
                centerSelect.disabled = true;
            }

            generateFullQuery();
            DataLayers.forEach((layer) => {
                view.whenLayerView(layer).then((layerView) => {
                    layerView.filter = { where: fullQuery };
                });
            });

            const pt = new Point({
                x: xParam,
                y: yParam,
                spatialReference: {
                    wkid: 3857,
                },
            });

            // override center and zoom
            view.center = pt;
            view.zoom = zoomParam;

            // override basemap
            if (baseMapParam) {
                const basemapLookup = {
                    'Charted Territory Map': 'arcgis-charted-territory',
                    'Charted Territory': 'arcgis-charted-territory',
                    'Colored Pencil Map': 'arcgis-colored-pencil',
                    'Colored Pencil': 'arcgis-colored-pencil',
                    'Community Map': 'arcgis-community',
                    Community: 'arcgis-community',
                    'Dark Gray Canvas': 'arcgis-dark-gray',
                    // '':"arcgis-hillshade-dark",
                    // '':"arcgis-hillshade-light",
                    'Human Geography Map': 'arcgis-human-geography',
                    'Human Geography': 'arcgis-human-geography',
                    'Human Geography Dark Map': 'arcgis-human-geography-dark',
                    'Human Geography Dark': 'arcgis-human-geography-dark',
                    Imagery: 'satellite',
                    'Imagery Hybrid': 'hybrid',
                    // '':"arcgis-imagery-standard",
                    'Light Gray Canvas': 'arcgis-light-gray',
                    'Mid-Century Map': 'arcgis-midcentury',
                    'Mid-Century': 'arcgis-midcentury',
                    'Modern Antique Map': 'arcgis-modern-antique',
                    'Modern Antique': 'arcgis-modern-antique',
                    Navigation: 'streets-navigation-vector',
                    'Navigation (Night)': 'streets-night-vector',
                    'Newspaper Map': 'arcgis-newspaper',
                    Newspaper: 'arcgis-newspaper',
                    'Nova Map': 'arcgis-nova',
                    Nova: 'arcgis-nova',
                    Oceans: 'oceans',
                    Streets: 'arcgis-streets',
                    'Streets (Night)': 'arcgis-streets-night',
                    'Streets (with Relief)': 'arcgis-streets-relief',
                    'Terrain with Labels': 'arcgis-terrain',
                    Topographic: 'topo',
                    // '':"navigation-3d",
                    // '':"navigation-dark-3d",
                    'OpenStreetMap (Dark Gray Canvas)': 'osm-dark-gray',
                    'OpenStreetMap (Light Gray Canvas)': 'osm-light-gray',
                    OpenStreetMap: 'osm-standard',
                    'OpenStreetMap (with Relief)': 'osm-standard-relief',
                    'OpenStreetMap (Streets)': 'osm-streets',
                    'OpenStreetMap (Streets with Relief)': 'osm-streets-relief',
                    // '':"topo-3d"

                };
                baseMapParam = basemapLookup[baseMapParam];
                map.basemap = baseMapParam;
            }

            if (geomParam === 'pcl') {
                ParcelsLayer.visible = true;
                PointsLayer.visible = false;
            }
            if (geomParam === 'pt') {
                ParcelsLayer.visible = false;
                PointsLayer.visible = true;
            }

            // symbology url params
            switch (symbologyParam) {
            case 'TYPE':
                break;
            case 'DECADE':
                typeButton.style.backgroundColor = '#797979';
                bltDecButton.style.backgroundColor = '#00619B';
                densityButton.style.backgroundColor = '#797979';
                valueButton.style.backgroundColor = '#797979';
                PointsLayer.renderer = ptRendererBuiltDecade;
                ParcelsLayer.renderer = pclRendererBuiltDecade;
                colorMode = 'DECADE';
                break;
            case 'DENSITY':
                typeButton.style.backgroundColor = '#797979';
                bltDecButton.style.backgroundColor = '#797979';
                densityButton.style.backgroundColor = '#00619B';
                valueButton.style.backgroundColor = '#797979';
                PointsLayer.renderer = ptRendererDensity;
                ParcelsLayer.renderer = pclRendererDensity;
                colorMode = 'DENSITY';
                break;
            case 'VALUE':
                typeButton.style.backgroundColor = '#797979';
                bltDecButton.style.backgroundColor = '#797979';
                densityButton.style.backgroundColor = '#797979';
                valueButton.style.backgroundColor = '#00619B';
                PointsLayer.renderer = ptRendererValue;
                ParcelsLayer.renderer = pclRendererValue;
                colorMode = 'VALUE';
                break;
            default:
                break;
            }

            // symbology url params
            switch (queryModeParam) {
            case 'GEOG':
                statsModeToggle.checked = true;
                queryMode = 'GEOG';
                document.getElementById('countHeader').innerHTML = 'Units in View:';
                break;
            default:
                break;
            }
        }
    });

    // Create URL params by watching when the extent is changed
    reactiveUtils.when(
        () => view.stationary === true,
        () => {
            // Get the new center of the view only when view is stationary.
            if (view.center) {
                // lat = view.center.latitude.toFixed(3)
                // lon = view.center.longitude.toFixed(3)
                x = view.center.x.toFixed(0);
                y = view.center.y.toFixed(0);
                zoom = view.zoom;

                // newURL = new URL(providedURL);

                if (ParcelsLayer.visible === true) {
                    newURL.searchParams.set('geom', 'pcl');
                }
                if (PointsLayer.visible === true) {
                    newURL.searchParams.set('geom', 'pt');
                }
                newURL.searchParams.set('x', x);
                newURL.searchParams.set('y', y);
                newURL.searchParams.set('zoom', zoom);

                const { searchParams } = newURL;
                if (searchParams && searchParams.keys().next().done === false) {
                    window.history.replaceState(
                        { additionalInformation: 'Updated the URL with JS' },
                        '',
                        newURL,
                    );
                    // console.log(newURL.href)
                }
            }
        },
    );
});
