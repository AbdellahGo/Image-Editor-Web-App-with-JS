// load
let imageContainer = document.querySelector('.image')
window.onload = () => {
    resetBtn.style.display = 'none'
    imageContainer.style.display = 'none'
    btnDownload.style.display = 'none'
}


// start upload image
let imgElement = document.querySelector('.img')
let imageFile = document.querySelector('input[type="file"]')

imageFile.addEventListener("change", function () {
    resetFilters()
    resetBtn.style.display = 'block'
    imageContainer.style.display = 'flex'
    btnDownload.style.display = 'block'
    getImgData();
});

function getImgData() {
    let fileReader = new FileReader()
    fileReader.readAsDataURL(imageFile.files[0]);
    fileReader.addEventListener('load', function () {
        imgElement.src = this.result
    })
    imgElement.onload = () => {
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
        ctx.drawImage(imgElement,0, 0,canvas.width, canvas.height);
        imgElement.style.display = 'none'
    }
}
// end upload image


// var filters
let saturate = document.getElementById('saturate')
let contrast = document.getElementById('contrast')
let brightness = document.getElementById('brightness')
let sepia = document.getElementById('sepia')
let grayscale = document.getElementById('grayscale')
let Fblur = document.getElementById('blur')
let hueRotate = document.getElementById('hueRotate')

// var buttons
let resetBtn = document.querySelector('.reset')

function setFilters() {
    let filters = []
    filters.push(`saturate(${saturate.value}%)`)
    filters.push(`contrast(${contrast.value}%)`)
    filters.push(`brightness(${brightness.value})`)
    filters.push(`sepia(${sepia.value}%)`)
    filters.push(`grayscale(${grayscale.value}%)`)
    filters.push(`blur(${Fblur.value}px)`)
    filters.push(`hue-Rotate(${hueRotate.value}deg)`)

    ctx.filter = filters.join(' ')
    ctx.drawImage(imgElement,0, 0,canvas.width, canvas.height);
}

function resetFilters() {
    imgElement.style.filter = 'none'
    saturate.value = 100;
    contrast.value = 100;
    brightness.value = 1;
    sepia.value = 0;
    grayscale.value = 0;
    Fblur.value = 0;
    hueRotate.value = 0;
    setFilters()
}

let filterList = document.querySelectorAll('input[type="range"]')
filterList.forEach((filter) => {
    filter.addEventListener('input', setFilters)
})

resetBtn.addEventListener('click', resetFilters)


// download img

let btnDownload = document.querySelector('.dowload')
let canvas = document.getElementById('cpeiImag')
let ctx = canvas.getContext('2d');

btnDownload.addEventListener('click', () => {
    btnDownload.href = canvas.toDataURL()
})



