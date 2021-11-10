const canvas = document.getElementById('canvas')
			ctx = canvas.getContext('2d')
			canvasWrapper = document.querySelector('.canvas-wrapper')
			addBtn = document.querySelector('.add')
			efButton = document.querySelectorAll('.ef-button')
			efShow = document.querySelectorAll('.ef-show')
			efMainBtn = document.querySelector('.ef-main-btn')
			slider = document.querySelectorAll('.slider')
			boxConfi = document.querySelector('.box-confirmation')
			efek = document.querySelectorAll('.efek')
			resetb = document.querySelector('.reset')
			removeImg = document.querySelector('.remove-img')
			info = document.querySelector('.a-in-wrapper')
			sun = document.querySelector('.bx-sun')
			moon = document.querySelector('.bxs-moon')
			modeActivate = document.querySelectorAll('.mode-activate')
			efWrapper = document.querySelector('.effect-wrapper')
			container = document.querySelector('.container')
			efwBtn = document.querySelectorAll('.ef-child button')
			bottomBtn = document.querySelectorAll('.d-add-reset-wrapper button')
			sliderPopUp = document.querySelector('.slider-pop-up')
			dld = document.querySelector('.download')
			i = document.querySelector('.info')
			appI = document.querySelector('.app-info')
			infoLink = document.querySelectorAll('.body-info a')
let uploadFile = document.querySelector('.uploadFile')
let image = document.querySelector('.image')
let applyEf = document.querySelectorAll('.apply-effect')
let fileName
resetb.style.display = 'none'

function upload(){
	uploadFile.click()
}


i.addEventListener('click', ()=>{
	appI.style.display = 'flex'
	const x = document.querySelector('.a-in-wrapper .bxs-x-circle')
	x.style.cursor = 'pointer'
	x.addEventListener('click', () => {
		appI.style.display = 'none'
	})
})

efMainBtn.addEventListener('click', () => {
	if (image.getAttribute('src') == ''){
		alert('masukan gambar dulu bos!')
	}else{
		efShow.forEach(e => {
			e.classList.toggle('ef-show2')
		})

		// efMainBtn.addEventListener('mouseleave', sliderHide)
	}
})

function resetConfirmation(){
	resetb.addEventListener('click', ()=>{
		boxConfi.style.display = 'flex'
		confirmation()
	})
}
function confirmation(){
	const y = document.querySelector('.yes')
	const n = document.querySelector('.no')
	n.addEventListener('click', () => {
		boxConfi.style.display = 'none'
	})
	y.addEventListener('click', ()=> {
		resetEffects()
		n.innerText = 'tutup'
	})
}


function resetEffects(){
	slider.forEach(s => {
    s.value = ''
  })
  Caman('#canvas', image, function(){
			this.revert()
		})
}

function drawImageScaled(image, ctx) {
   var canvas = ctx.canvas ;
   var hRatio = canvas.width  / image.width    ;
   var vRatio =  canvas.height / image.height  ;
   var ratio  = Math.min ( hRatio, vRatio );
 
   var centerShift_x = ( canvas.width - image.width*ratio ) / 2;
   var centerShift_y = ( canvas.height - image.height*ratio ) / 2;  
   ctx.clearRect(0,0,canvas.width, canvas.height);
   ctx.drawImage(image, 0,0, image.width, image.height,
                      centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);  
}

efButton.forEach((e, index)=> {
	e.addEventListener('mouseleave', ()=> {
		e.style.animation = 'none'
	})
	// e.addEventListener('mouseleave', sliderHide)

	if (index === 0){
		e.addEventListener('click', ()=> {
			efek[0].style.display = 'block'
			efek[1].style.display = 'none'
			efek[2].style.display = 'none'
			efek[3].style.display = 'none'
			efek[4].style.display = 'none'
		})
	}else if (index === 1){
		e.addEventListener('click', ()=> {
			efek[0].style.display = 'none'
			efek[1].style.display = 'block'
			efek[2].style.display = 'none'
			efek[3].style.display = 'none'
			efek[4].style.display = 'none'
		})
	}else if (index === 2){
		e.addEventListener('click', ()=> {
			efek[0].style.display = 'none'
			efek[1].style.display = 'none'
			efek[2].style.display = 'block'
			efek[3].style.display = 'none'
			efek[4].style.display = 'none'
		})
	}else if (index === 3){
		e.addEventListener('click', ()=> {
			efek[0].style.display = 'none'
			efek[1].style.display = 'none'
			efek[2].style.display = 'none'
			efek[3].style.display = 'block'
			efek[4].style.display = 'none'
		})
	}else if (index === 4){
		e.addEventListener('click', ()=> {
			efek[0].style.display = 'none'
			efek[1].style.display = 'none'
			efek[2].style.display = 'none'
			efek[3].style.display = 'none'
			efek[4].style.display = 'block'
		})
	}

})

function sliderHide(){
	efek.forEach(e=> {
		e.style.display = 'none'	
	})
	
}


uploadFile.addEventListener('change', () => {
	const file = uploadFile.files[0]
	const reader = new FileReader()
	if (file){
		fileName = file.name
		reader.readAsDataURL(file)
		addBtn.style.animation = 'none'
		removeImg.style.display = 'block'
	}
	reader.addEventListener('load', () => {
			image.src = reader.result
			image.style.display = 'none'
			canvas.style.display = 'block'
			
			
			// image.style.objectFit = 'contain'
			image.onload =  function(){
        editImage()
        
				canvas.width = image.width
				canvas.height = image.height
				drawImageScaled(image, ctx)
				canvas.removeAttribute('data-caman-id')
			}
		}, false)
})


function editImage(){
	resetb.style.display = 'block'
	resetb.addEventListener('click', ()=>{
		boxConfi.style.display = 'flex'
		confirmation()
	})
	applyEf.forEach((sl, index) => {
		let slName = document.querySelector('.slider-name')
		let p = document.querySelector('.percentage')
		sl.addEventListener('change', () => {
			sliderPopUp.style.display = 'flex'
			setTimeout(function(){
				sliderPopUp.style.display = 'none'
			}, 1000)
			let br = document.getElementById('br').value
			let bl = document.getElementById('bl').value
			let st = document.getElementById('st').value
			let ex = document.getElementById('ex').value
			let hue = document.getElementById('hue').value
			Caman('#canvas', image, function(){
				this.revert()
				this.brightness(br).stackBlur(bl).saturation(st).exposure(ex).hue(hue).render()
			})
			
		})
		sl.addEventListener('click', (e)=> {
			if (e.target.classList.contains('vtg')){
				Caman('#canvas', image, function(){
					this.vintage().render()
				})
			}else if (e.target.classList.contains('sp')){
				Caman('#canvas', image, function(){
					this.sepia().render()
				})
			}else if (e.target.classList.contains('lm')){
				Caman('#canvas', image, function(){
					this.lomo().render()
				})
			}else if (e.target.classList.contains('cl')){
				Caman('#canvas', image, function(){
					this.clarity().render()
				})
			}else if (e.target.classList.contains('sn')){
				Caman('#canvas', image, function(){
					this.sunrise().render()
				})
			}
		})
		sl.oninput = function (){

			if (index === 0){
				slName.innerText = 'brigthness'
				p.innerText = sl.value
			}else if (index===1){
				slName.innerText = 'blur'
				p.innerText = sl.value
			}else if (index===2){
				slName.innerText = 'saturation'
				p.innerText = sl.value
			}else if (index===3){
				slName.innerText = 'exposure'
				p.innerText = sl.value
			}else if (index===4){
				slName.innerText = 'hue'
				p.innerText = sl.value
			}
			
		}
	})
}

removeImg.addEventListener('click', ()=> {
  image.src = ''
	image.style.display ='none'
	canvas.style.display = 'none'
	canvasWrapper.style.border = ''
	removeImg.style.display = 'none'
  resetEffects()
})


function modeLight(){
	
	const neuMorphism	= {
		borderRadius: '50px',
		background: '#e0e0e0',
		boxShadow: [
								'inset 20px 20px 60px #bebebe',
	            	'inset -20px -20px 60px #ffffff'
            	]
	}

	const neuMorphism2 = {
		borderRadius: '15px',
		background: 'linear-gradient(145deg, #f0f0f0, #cacaca)',
		boxShadow: [ '17px 17px 50px #8b8b8b',
             			'-7px -7px 50px #ffffff'
             		]
	}
	info.style.color = 'black'
	
	infoLink.forEach(e => e.style.color = 'blue')
	info.style.borderRadius = neuMorphism2.borderRadius
	info.style.background = neuMorphism2.background
	for (let i = 0; i < neuMorphism2.boxShadow.length; i++){
		info.style.boxShadow = neuMorphism2.boxShadow[i]
	}
	
	container.style.backgroundColor = '#e0e0e0'
	efwBtn.forEach(e => {
		e.style.background = 'linear-gradient(145deg, #7377e6, #898dff)'
	})
	bottomBtn.forEach(e => {
		e.style.background = 'linear-gradient(145deg, #7377e6, #898dff)'
	})
	
	canvasWrapper.style.border = '2px dashed #898dff'
	efWrapper.style.borderRadius = neuMorphism.borderRadius 
	efWrapper.style.background = neuMorphism.background

	for (let i = 0; i < neuMorphism.boxShadow.length; i++){
		efWrapper.style.boxShadow = neuMorphism.boxShadow[i]
	}
	
}

function modeDark(){

	container.style.backgroundColor = ''
	canvasWrapper.style.border = ''
	container.style.transition = '1s ease-in'
	info.style.color = ''
	infoLink.forEach(e => e.style.color = '')
	info.style.borderRadius = ''
	info.style.background = ''
	info.style.boxShadow = ''
	
	efwBtn.forEach(e => {
		e.style.background = ''
	})
	bottomBtn.forEach(e => {
		e.style.background = ''
	})

	efWrapper.style.borderRadius =''
	efWrapper.style.background = ''
	efWrapper.style.boxShadow = ''
	
}

modeActivate.forEach((ma, i) => {
	if (i === 0){
		ma.addEventListener('click',() => {
			sun.style.display = 'none'
			moon.style.display = 'block'
			modeLight()
		})	
	}else if (i === 1){
		ma.addEventListener('click',() => {
			sun.style.display = 'block'
			moon.style.display = 'none'
			modeDark()
		})	
	}
	
	
})



// download button
dld.addEventListener('click', e => {

	const fileExtension = fileName.slice(-4)
	let newFileName

	if (fileExtension === '.jpg' || fileExtension === '.png'){
		newFileName = fileName.substring(0, fileName.length - 4) + '-edited.jpg'
	}

	download(canvas, newFileName)

})

function download(canvas, fileName){

	let e

	const link = document.createElement('a')
	link.download = fileName
	link.href = canvas.toDataURL()

	e = new MouseEvent('click')
	link.dispatchEvent(e)	

}
