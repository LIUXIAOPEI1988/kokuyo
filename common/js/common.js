/**
 * common.js
 *
 *  version --- 3.6
 *  updated --- 2011/09/06
 */


/* !stack ------------------------------------------------------------------- */
/* 全てのスマホで幅320px(iphone)相当に見えるようにdpiを調整 */
jQuery(document).ready(function($) {
	/*
	 Android の場合 DPIを調整
	=========================================*/
	$(window).on('resize.dpi', function () {

		// 指定済みの viewport を取得
		var BASE_PARAM = $('meta[name="viewport"]').attr('content');
	
		// Android スマートフォンのみに適用する（タブレットも対象にしたい場合は 'Mobile' の判定を削除）
		if (navigator.userAgent.indexOf('Android') != -1 && navigator.userAgent.indexOf('Mobile') != -1 && window.orientation === 0) {
	
			// デバイスのスクリーンの幅を取得する
			var width = $(window).width();
	
			// Android の仕様でDPI基準値となる 160 で固定
			var DEFAULT_DPI = 160;
	
			// iPhone の幅に合わせるので 320 固定
			// ※ガラケー基準の場合は、240 でも可
			var DEFAULT_WIDTH = 320;
	
			if (width !== DEFAULT_WIDTH) {
	
				// 320px で収まる DPI を計算する
				var dpi = DEFAULT_WIDTH / width * DEFAULT_DPI;
	
				// 幅が正常に取得できた時だけ （dpi の値が、仕様の 70-400 に収まる）
				// 幅が正常に取得できず DPI が異常値（70-400に入らない）になった場合に除外する
				if (dpi >= 70 && dpi <= 400) {
					// Androidは「target-densitydpi」プロパティで、1インチの中に何ドット表示するかを設定して調整する
					$('head').append('<meta name="viewport" content="target-densitydpi=' + dpi + ', ' + BASE_PARAM + '" />');
				}
			}
		}
	}).trigger('resize.dpi');
	
	pageScroll();
	rollover();
	common();
});

$(function() { //IE8のalpha使用時に発生の黒枠を消す
    if(navigator.userAgent.indexOf("MSIE") != -1) {
        $('img').each(function() {
            if($(this).attr('src').indexOf('.png') != -1) {
                $(this).css({
                    'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' +
                    $(this).attr('src') +
                    '", sizingMethod="scale");'
                });
            }
        });
    }
});	

/* !isUA -------------------------------------------------------------------- */
var isUA = (function(){
	var ua = navigator.userAgent.toLowerCase();
	indexOfKey = function(key){ return (ua.indexOf(key) != -1)? true: false;}
	var o = {};
	o.ie      = function(){ return indexOfKey("msie"); }
	o.fx      = function(){ return indexOfKey("firefox"); }
	o.chrome  = function(){ return indexOfKey("chrome"); }
	o.opera   = function(){ return indexOfKey("opera"); }
	o.android = function(){ return indexOfKey("android"); }
	o.ipad    = function(){ return indexOfKey("ipad"); }
	o.ipod    = function(){ return indexOfKey("ipod"); }
	o.iphone  = function(){ return indexOfKey("iphone"); }
	return o;
})();
/* !init Smart Devices ------------------------------------------------------ */
(function (){
	var parentNode = document.getElementsByTagName('head')[0];
	var viewport = {
        withzoom:'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
        android : 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
        ipad    : 'width=1400, user-scalable=no',
        //iphonescale1  : 'width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0'
        iphone  : 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    }
	meta = document.createElement('meta');
	meta.setAttribute('name','viewport');

	if( isUA.android() ){
		meta.setAttribute('content',viewport.android);
		parentNode.appendChild(meta);
	}else if( isUA.ipad() ){
		meta.setAttribute('content',viewport.ipad);
		parentNode.appendChild(meta);
	}else if( isUA.ipod() || isUA.iphone() ){
		meta.setAttribute('content',viewport.iphone);
		parentNode.appendChild(meta);
		/*window.addEventListener('load', function(){ setTimeout(scrollTo, 100, 0, 1);}, false);*/
	}else{
	}
	$(window).bind( 'orientationchange', function(e){
		if( isUA.ipad() ) {
			if (window.orientation == 90 || window.orientation == -90) {
				$('meta[name=viewport]').attr('content',viewport.ipad);
			}else if (window.orientation == 0 || window.orientation == 180) {
				$('meta[name=viewport]').attr('content',viewport.ipad);
			}
		}
	});
})();
/* !rollover ---------------------------------------------------------------- */
var rollover = function(){
	var suffix = { normal : '_no.', over   : '_on.'}
	$('a.over, img.over, input.over').each(function(){
		var a = null;
		var img = null;

		var elem = $(this).get(0);
		if( elem.nodeName.toLowerCase() == 'a' ){
			a = $(this);
			img = $('img',this);
		}else if( elem.nodeName.toLowerCase() == 'img' || elem.nodeName.toLowerCase() == 'input' ){
			img = $(this);
		}

		var src_no = img.attr('src');
		var src_on = src_no.replace(suffix.normal, suffix.over);

		if( elem.nodeName.toLowerCase() == 'a' ){
			a.bind("mouseover focus",function(){ img.attr('src',src_on); })
			 .bind("mouseout blur",  function(){ img.attr('src',src_no); });
		}else if( elem.nodeName.toLowerCase() == 'img' ){
			img.bind("mouseover",function(){ img.attr('src',src_on); })
			   .bind("mouseout", function(){ img.attr('src',src_no); });
		}else if( elem.nodeName.toLowerCase() == 'input' ){
			img.bind("mouseover focus",function(){ img.attr('src',src_on); })
			   .bind("mouseout blur",  function(){ img.attr('src',src_no); });
		}

		var cacheimg = document.createElement('img');
		cacheimg.src = src_on;
	});
};
/* !pageScroll -------------------------------------------------------------- */
var pageScroll = function(){
	jQuery.easing.easeInOutCubic = function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	}; 
	$('a.scroll, .scroll a').each(function(){
		$(this).bind("click keypress",function(e){
			e.preventDefault();
			var target  = $(this).attr('href');
			var targetY = $(target).offset().top;
			var parent  = ( isUA.opera() )? (document.compatMode == 'BackCompat') ? 'body': 'html' : 'html,body';
			$(parent).animate(
				{scrollTop: targetY },
				400
			);
			return false;
		});
	});
	$('.pagetop a').click(function(){
		$('html,body').animate({scrollTop: 0}, 'slow','swing');
		return false;
	});
}



/* !common --------------------------------------------------- */
var common = (function(){
	var isMobile = false;
	var breakpoint = 1279;
	updateIsMobile();

	$(window).on('resize load', function () {
	    updateIsMobile();
	});

	function updateIsMobile() {
	    isMobile = $(window).width() < breakpoint;
	}

	$(document).ready(function(){
		$('.topSlider').slick({
			autoplay: true,
			autoplaySpeed: 4000,
			fade: false,
			arrows: false,
			speed: 800,
			slidesToShow: 3,
	        slidesToScroll: 1,
	        responsive: [
		        {
		            breakpoint: 768,
		            settings: {
		                slidesToShow: 1,
		                centerPadding: '10%',
		                centerMode: true,
		            }
		        }
		    ]
		});
		if(!isMobile){
			$('.topContentsInner').slick({
				autoplay: false,
				fade: false,
				arrows: false,
				speed: 800,
				slidesToShow: 3,
		        slidesToScroll: 1,
		        variableWidth: true,
		        infinite: false,
		        responsive: [
			        {
			            breakpoint: 768,
			            settings: {
			                slidesToShow: 1,
			                centerPadding: '10%'
			            }
			        }
			    ]
			});	
		}else{
			if($('.topContentsInner').unslick){
				$('.topContentsInner').unslick()
			}
		}
	})
	



	$('.navbartoggle').on('click',function(){
		var target = $(this).data('target');
		if($(target).hasClass("on")){
			$(target).stop().fadeOut(300).removeClass("on");
			$(this).removeClass("on");
		}else{
			$(target).stop().fadeIn(300).addClass("on");
			$(this).addClass("on");
		}
	});
	$('.navbarcollapse ul a').on('click',function(){
		$('.navbartoggle').removeClass("on");
		$('.navbarcollapse').stop().fadeOut(300).removeClass("on");
	})
	/*$(window).resize(function (event) {
		if($('.visiblets').css('display') == 'none') {
			var target = $('.navbartoggle').data('target');
			$(target).hide().removeClass("on");
			$('.navbartoggle').removeClass("on");
		}
	});*/
	
	$('.mainimgScroll a').click(function(e){
		e.preventDefault();
		var target  = $(this).attr('href');
		var targetY = $(target).offset().top;
		var parent  = ( isUA.opera() )? (document.compatMode == 'BackCompat') ? 'body': 'html' : 'html,body';
		$(parent).animate(
			{scrollTop: targetY },
			400
		);
		return false;
	})

	$(window).resize(function (event) {
		switchImage($('.visiblets').css('display') == 'block');
	});
	switchImage($('.visiblets').css('display') == 'block');
	function switchImage(isVisible_header) {
		$('img').each(function (index) {
			var pc = $(this).attr('src').replace('_sp.', '_pc.');
			var ts = $(this).attr('src').replace('_pc.', '_sp.');
			if (!isVisible_header) {
				$(this).attr("src",pc);
			}else {
				
				$(this).attr("src",ts);
			}
		});
	}
});



