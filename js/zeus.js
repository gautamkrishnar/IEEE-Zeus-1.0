var slides = document.querySelectorAll('div.evsec, section.shoutout');


if(typeof window.orientation == 'undefined'){
	window.addEventListener('scroll',function(){
		processScroll();
	});
	window.addEventListener('resize',function(){
		processScroll();
	});

	processScroll();
}

function processScroll(){
	var scrt = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop,
		win_h = window.innerHeight,
		win_w = window.innerWidth,
		d_h = document.getElementsByTagName('body')[0].offsetHeight;

	if(scrt > 20){
		document.getElementById('header').className = 'over';
	} else {
		document.getElementById('header').className = '';
	}

	for(var i=0;i<slides.length;i++){
		var p = slides[i],
			top = scrt + p.getBoundingClientRect().top,
			h = p.clientHeight || p.offsetHeight || p.scrollHeight,
			x = (i % 2)? '-8%' : '8%';
			startY = top,
			stopY = top + h + 50,
			totalY = stopY - startY,
			bio = p.querySelector('div.meta'),
			img = p.querySelector('div.image'),
			links = p.querySelector('div.links'),
			trans = 'translate3d('+x+',0,0)';

		if(win_w < 1200){
			x = '0px';
		}

		if((scrt + win_h) >= startY && (scrt + win_h) <= stopY){
			var percentage = (scrt + win_h - startY) / totalY;

			if(img != undefined){
				var imgTop = -200 * (1 - percentage),
					bioTop = 240 * (1 - percentage),
					bioOpacity = percentage + 0.1,
					pTop = 90 * (1 - percentage),
					pTranslation = 'translate3d('+x+',' + pTop + 'px' + ',0)',
					imgTranslation = 'translate3d(0,' + imgTop + 'px' + ',0)',
					bioTranslation = 'translate3d(0,' + bioTop + 'px' + ',0)';

				p.style.cssText = '-webkit-transform:'+pTranslation+';-moz-transform:'+pTranslation+';transform:'+pTranslation+';';
				img.style.cssText = '-webkit-transform:'+imgTranslation+';-moz-transform:'+imgTranslation+';transform:'+imgTranslation+';';
				bio.style.cssText = '-webkit-transform:'+bioTranslation+';-moz-transform:'+bioTranslation+';transform:'+bioTranslation+';opacity:'+bioOpacity+';';
				links.style.cssText = 'opacity:'+bioOpacity+';';
			} else {
				var pTop = 140 * (1 - percentage),
					pTranslation = 'translate3d(0,' + pTop + 'px' + ',0)';

				p.style.cssText = '-webkit-transform:'+pTranslation+';-moz-transform:'+pTranslation+';transform:'+pTranslation+';';
			}

		} else if(img != undefined){
			img.style.cssText = '-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);transform:translate3d(0,0,0);';
			bio.style.cssText = '-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1;';
			links.style.cssText = 'opacity:1;';
		}

		
		if(scrt >= startY && scrt < stopY && i+4 < slides.length){
			var nTop = 240 * ((scrt - startY) / totalY);
			trans = (img != undefined)? 'translate3d('+x+',' + nTop + 'px,0)' : 'translate3d(0,' + nTop + 'px,0)';
			p.style.cssText = '-webkit-transform:'+trans+';-moz-transform:'+trans+';transform:'+trans+';';
		} else if((scrt + win_h) > stopY && scrt < startY){
			trans = (img != undefined)? 'translate3d('+x+',0,0)' : 'translate3d(0,0,0)';
			p.style.cssText = '-webkit-transform:'+trans+';-moz-transform:'+trans+';transform:'+trans+';';
		}
	
	}
}

if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
    document.body.className = "ff";
}

document.addEventListener("touchstart", function(){}, true);
