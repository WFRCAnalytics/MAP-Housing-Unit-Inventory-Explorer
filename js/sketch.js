const sketchVM = new SketchViewModel({
    view,
    layer: graphicsLayer,
});

// Connecting the calcite actions with their corresponding SketchViewModel tools
// const pointBtn = document.getElementById("pointBtn");
// const polylineBtn = document.getElementById("polylineBtn");
const polygonBtn = document.getElementById('polygonBtn');
const circleBtn = document.getElementById('circleBtn');
const rectangleBtn = document.getElementById('rectangleBtn');
const clearBtn = document.getElementById('clearBtn');
const selectBtn = document.getElementById('selectBtn');

// pointBtn.onclick = () => { sketchVM.create('point'); };
// polylineBtn.onclick = () => { sketchVM.create('polyline'); };
polygonBtn.onclick = () => { sketchVM.create('polygon'); };
circleBtn.onclick = () => { sketchVM.create('circle'); };
rectangleBtn.onclick = () => { sketchVM.create('rectangle'); };
clearBtn.onclick = () => { sketchVM.layer.removeAll(); };
selectBtn.onclick = () => { sketchVM.cancel(); };

// Calcite UI logic
// Auto-populate UI with default SketchViewModel properties set.
// If no default values are set, UI will be set accordingly.
function setDefaultCreateOptions() {
    const options = sketchVM.defaultCreateOptions;
    const modeSelect = document.getElementById('mode-select');

    // set default mode in the select element if defined
    if (options?.mode) {
        setDefaultOption(modeSelect, options.mode);
    }

    // handles mode select changes
    modeSelect.addEventListener('calciteSelectChange', () => {
        sketchVM.defaultCreateOptions.mode = modeSelect.selectedOption.value;
    });
}

function setDefaultUpdateOptions() {
    const options = sketchVM.defaultUpdateOptions;
    const rotationSwitch = document.getElementById('rotationSwitch');
    const scaleSwitch = document.getElementById('scaleSwitch');
    const multipleSelectionSwitch = document.getElementById('multipleSelectionSwitch');
    const aspectRatioSwitch = document.getElementById('aspectRatioSwitch');

    // set the UI elements to the default property values
    rotationSwitch.checked = options.enableRotation;
    scaleSwitch.checked = options.enableScaling;
    multipleSelectionSwitch.checked = options.multipleSelectionEnabled;
    aspectRatioSwitch.checked = options.preserveAspectRatio;

    // event listeners for UI interactions
    rotationSwitch.addEventListener('calciteSwitchChange', (evt) => {
        sketchVM.defaultUpdateOptions.enableRotation = evt.target.checked;
    });
    scaleSwitch.addEventListener('calciteSwitchChange', (evt) => {
        sketchVM.defaultUpdateOptions.enableScaling = evt.target.checked;
    });
    multipleSelectionSwitch.addEventListener('calciteSwitchChange', (evt) => {
        sketchVM.defaultUpdateOptions.multipleSelectionEnabled = evt.target.checked;
    });
    aspectRatioSwitch.addEventListener('calciteSwitchChange', (evt) => {
        sketchVM.defaultUpdateOptions.preserveAspectRatio = evt.target.checked;
    });
}

// function setDefaultPointSymbol() {
//     const { pointSymbol } = sketchVM;
//     const pointStyleSelect = document.getElementById('point-style-select');
//     const pointSymbolOutlineBtn = document.getElementById('point-outline-btn');
//     const pointSizeInput = document.getElementById('point-size-input');
//     const pointXOffsetInput = document.getElementById('point-xoffset-input');
//     const pointYOffsetInput = document.getElementById('point-yoffset-input');
//     const pointAngleInput = document.getElementById('point-angle-input');
//     const pointColorInput = document.getElementById('point-color-input');
//     const slsWidthInput = document.getElementById('point-sls-width-input');
//     const slsColorInput = document.getElementById('point-sls-color-input');

//     pointSizeInput.value = pointSymbol.size;
//     pointXOffsetInput.value = pointSymbol.xoffset;
//     pointYOffsetInput.value = pointSymbol.yoffset;
//     pointAngleInput.value = pointSymbol.angle;
//     slsWidthInput.value = pointSymbol.outline.width;

//     // set default style in the select element
//     setDefaultOption(pointStyleSelect, pointSymbol.style);

//     pointSizeInput.addEventListener('calciteInputInput', (evt) => {
//         pointSymbol.size = parseInt(evt.target.value);
//     });
//     pointXOffsetInput.addEventListener('calciteInputInput', (evt) => {
//         pointSymbol.xoffset = parseInt(evt.target.value);
//     });
//     pointYOffsetInput.addEventListener('calciteInputInput', (evt) => {
//         pointSymbol.yoffset = parseInt(evt.target.value);
//     });
//     pointAngleInput.addEventListener('calciteInputInput', (evt) => {
//         pointSymbol.angle = parseInt(evt.target.value);
//     });
//     pointStyleSelect.addEventListener('calciteSelectChange', () => {
//         pointSymbol.style = pointStyleSelect.selectedOption.value;
//     });
//     pointColorInput.addEventListener('calciteInputInput', (evt) => {
//         pointSymbol.color = evt.target.value;
//     });
//     pointSymbolOutlineBtn.onclick = () => {
//         openModal('point-outline-modal');
//     };
//     // point outline modal event listeners
//     slsWidthInput.addEventListener('calciteInputInput', (evt) => {
//         pointSymbol.outline.width = parseInt(evt.target.value);
//     });
//     slsColorInput.addEventListener('calciteInputInput', (evt) => {
//         pointSymbol.outline.color = evt.target.value;
//     });
// }

// function setDefaultPolylineSymbol() {
//     const lineSymbol = sketchVM.polylineSymbol;
//     const lineStyleSelect = document.getElementById('line-style-select');
//     const lineWidthInput = document.getElementById('line-width-input');
//     const lineColorInput = document.getElementById('line-color-input');

//     lineWidthInput.value = lineSymbol.width;

//     // set default style in the select element
//     setDefaultOption(lineStyleSelect, lineSymbol.style);

//     lineStyleSelect.addEventListener('calciteSelectChange', () => {
//         lineSymbol.style = lineStyleSelect.selectedOption.value;
//     });
//     lineWidthInput.addEventListener('calciteInputInput', (evt) => {
//         lineSymbol.width = parseInt(evt.target.value);
//     });
//     lineColorInput.addEventListener('calciteInputInput', (evt) => {
//         lineSymbol.color = evt.target.value;
//     });
// }

function setDefaultPolygonSymbol() {
    const { polygonSymbol } = sketchVM;
    const polygonStyleSelect = document.getElementById('polygon-style-select');
    const polygonSymbolOutlineBtn = document.getElementById('polygon-outline-btn');
    const polygonColorInput = document.getElementById('polygon-color-input');
    const slsStyleSelect = document.getElementById('polygon-sls-style-select');
    const slsWidthInput = document.getElementById('polygon-sls-width-input');
    const slsColorInput = document.getElementById('polygon-sls-color-input');

    slsWidthInput.value = polygonSymbol.outline.width;

    // set default style in the select element
    setDefaultOption(polygonStyleSelect, polygonSymbol.style);
    setDefaultOption(slsStyleSelect, polygonSymbol.outline.style);

    polygonStyleSelect.addEventListener('calciteSelectChange', () => {
        polygonSymbol.style = polygonStyleSelect.selectedOption.value;
    });
    polygonColorInput.addEventListener('calciteInputInput', (evt) => {
        polygonSymbol.color = evt.target.value;
    });
    polygonSymbolOutlineBtn.onclick = () => {
        openModal('polygon-outline-modal');
    };
    // polygon outline modal event listeners
    slsStyleSelect.addEventListener('calciteSelectChange', () => {
        polygonSymbol.outline.style = slsStyleSelect.selectedOption.value;
    });
    slsWidthInput.addEventListener('calciteInputInput', (evt) => {
        polygonSymbol.outline.width = parseInt(evt.target.value);
    });
    slsColorInput.addEventListener('calciteInputInput', (evt) => {
        polygonSymbol.outline.color = evt.target.value;
    });
}

// function to auto-populate calcite select components
function setDefaultOption(selectElement, value) {
    for (let i = 0; i < selectElement.children.length; i++) {
        const option = selectElement.children[i];
        if (option.value === value) {
            option.selected = true;
        }
    }
}
