// DOM Elements - START
const domElements = {
    brightness: document.getElementById('brightness'),
    saturation: document.getElementById('saturation'),
    inversion: document.getElementById('inversion'),
    grayscale: document.getElementById('grayscale'),
    blur: document.getElementById('blur'),
    contrast: document.getElementById('contrast'),
    sepia: document.getElementById('sepia'),
    rotate: document.getElementById('rotate'),

    rotateLeft: document.getElementById('left'),
    rotateRight: document.getElementById('right'),
    flipHorizontal: document.getElementById('horizontal'),
    flipVertical: document.getElementById('vertical'),

    sliderInput: document.querySelector('input[type="range"]'),
    previewImg: document.querySelector('.preview-img img'),
    resetFilter: document.querySelector('.reset-filter'),
    chooseImg: document.querySelector('.choose-img'),
    saveImg: document.querySelector('.save-img'),
    fileInput: document.querySelector('.file-input'),

    filterName: document.querySelector('.filter-info .name'),
    filterValue: document.querySelector('.filter-info .value'),
    activeButton: document.querySelector('.active')
};
// DOM Elements - END

// State Management - START
const state = {
    activeFilter: 'brightness',
    activeButton: domElements.brightness,
    filterValues: {
        brightness: 100,
        saturation: 100,
        inversion: 0,
        grayscale: 0,
        blur: 0,
        contrast: 100,
        sepia: 0,
    },
    rotate: 0,
    flip: {
        horizontal: 1,
        vertical: 1
    }
};
// State Management - END

// Event Listeners - START
const initializeEventListeners = () => {
    domElements.brightness.addEventListener('click', handleFilterSelect);
    domElements.saturation.addEventListener('click', handleFilterSelect);
    domElements.inversion.addEventListener('click', handleFilterSelect);
    domElements.grayscale.addEventListener('click', handleFilterSelect);
    domElements.blur.addEventListener('click', handleFilterSelect);
    domElements.contrast.addEventListener('click', handleFilterSelect);
    domElements.sepia.addEventListener('click', handleFilterSelect);
    domElements.rotate.addEventListener('click', handleFilterSelect);

    domElements.sliderInput.addEventListener('input', handleFilterAdjust);
    domElements.rotateLeft.addEventListener('click', handleRotation);
    domElements.rotateRight.addEventListener('click', handleRotation);
    domElements.flipHorizontal.addEventListener('click', handleFlip);
    domElements.flipVertical.addEventListener('click', handleFlip);

    domElements.chooseImg.addEventListener('click', triggerFileInput);
    domElements.fileInput.addEventListener('change', handleImageUpload);
    domElements.resetFilter.addEventListener('click', resetAllFilters);
    domElements.saveImg.addEventListener('click', saveImage);
};
// Event Listeners - END

// Core Handling - START
const handleFilterSelect = (event) => {
    state.activeButton?.classList.remove('active');
    state.activeFilter = event.target.id;
    state.activeButton = event.target;
    state.activeButton.classList.add('active');

    updateSliderDisplay();
};

const handleFilterAdjust = (event) => {
    if (state.activeFilter === 'rotate') {
        state.rotate = parseInt(event.target.value);
    } else {
        state.filterValues[state.activeFilter] = event.target.value;
    }
    updateSliderDisplay();
};

const handleRotation = (event) => {
    state.rotate = event.target.id === 'left' ? state.rotate - 90 : state.rotate + 90;
    state.rotate = state.rotate < 0 ? 270 : state.rotate > 270 ? 0 : state.rotate;
    updateImagePreview();
};

const handleFlip = (event) => {
    state.flip[event.target.id] *= -1;
    updateImagePreview();
};

const triggerFileInput = () => {
    domElements.fileInput.click();
};

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        domElements.previewImg.src = e.target.result;
    };

    reader.readAsDataURL(file);
};

const resetAllFilters = () => {
    state.filterValues = {
        brightness: 100,
        saturation: 100,
        inversion: 0,
        grayscale: 0,
        blur: 0,
        contrast: 100,
        sepia: 0
    };

    state.rotate = 0;
    state.flip = {
        horizontal: 1,
        vertical: 1
    };
    updateSliderDisplay();
};

const saveImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = domElements.previewImg.src;

    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(state.rotate * Math.PI / 180);
        ctx.scale(state.flip.horizontal, state.flip.vertical);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);

        const dataUrl = canvas.toDataURL();
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'edited-image.png';
        a.click();
    };
};
// Core Handling - END

// Helper Functions - START
const updateImagePreview = () => {
    domElements.previewImg.style.filter = `
        brightness(${state.filterValues.brightness}%)
        saturate(${state.filterValues.saturation}%)
        invert(${state.filterValues.inversion}%)
        grayscale(${state.filterValues.grayscale}%)
        blur(${state.filterValues.blur}px)
        contrast(${state.filterValues.contrast}%)
        sepia(${state.filterValues.sepia}%)
    `;
    domElements.previewImg.style.transform = `
        rotate(${state.rotate}deg)
        scaleX(${state.flip.horizontal})
        scaleY(${state.flip.vertical})
    `;
};

const updateSliderDisplay = () => {
    if (state.activeFilter === 'rotate') {
        domElements.filterName.textContent = 'Rotate';
        domElements.filterValue.textContent = `${state.rotate}°`;
        domElements.sliderInput.value = state.rotate;
        domElements.sliderInput.min = 0;
        domElements.sliderInput.max = 360;
    } else {
        domElements.filterName.textContent = state.activeFilter[0].toUpperCase() + state.activeFilter.slice(1);
        domElements.filterValue.textContent = state.filterValues[state.activeFilter] + '%';
        domElements.sliderInput.value = state.filterValues[state.activeFilter];
        if (state.activeFilter === 'brightness' || state.activeFilter === 'saturation') {
            domElements.sliderInput.min = 0;
            domElements.sliderInput.max = 200;
        } else if (state.activeFilter === 'blur') {
            domElements.sliderInput.min = 0;
            domElements.sliderInput.max = 100;
            domElements.filterValue.textContent = state.filterValues[state.activeFilter] + 'px';
        } else {
            domElements.sliderInput.min = 0;
            domElements.sliderInput.max = 100;
        }
    }
    updateImagePreview();
};
// Helper Functions - END

// Initialization
const init = () => {
    initializeEventListeners();
};

// Start Application
init();