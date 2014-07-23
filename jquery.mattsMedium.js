/* 
* Matts Medium for jQuery
* Make a parallax intro slide just like medium.com
* Copyright 2014 Matt Nolan
* matt at redbutton.io
* https://github.com/matthewnolan
*/
 

/*
Call it like this
$(".introSlide").mattsMedium(40);

Structure your HTML like this
<section class="introSlide">
  <div class="introParent" data-mattsMediumFront>
    <div class="introChild">
      <h1>Content</h1>
    </div>
  </div>
  <div class="introImage" data-mattsMediumBackDarken="20" style="background-image:url(http://placekitten.com/1200/1200)"></div>
</section>

<div id="root" class="shortIntro">
  Your site content goes here.
</div>


Here is the CSS. Customize as needed. 


.introSlide {
    position: fixed;
    height:90%;
    width:100%;
    overflow: hidden;
    z-index: 0;
    background: #000;
}
.introParent {
    position: absolute;
    display:table;
    width:100%;
    height:100%;
    top:0;
    z-index: 2;
    text-align: center;
}
.introChild {
    display: table-cell;
    vertical-align: middle;
    height:100%;
}
.introChildPadding {
    padding:0 10%;    
}
.introImage {
    position: absolute;
    background: 0 0 no-repeat fixed;
    background-size: cover;
    height:100%;
    width:100%;
    top:0;
    z-index: 0;
    opacity: 0.7;
}



Wrap the content of your document in an ID called root.
Give it a class of shortIntro to make it 50% height of the page.

#root {
    top:90%;
    width:100%;
    z-index: 1;
    position: absolute;
    height:auto;
    background: #fff;
}
#root.shortIntro {
    top:50%;  
}
.introSlide.shortIntro {
    height:50%; 
}

*/


// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


(function($) {
    $.fn.extend({
        mattsMedium: function() {
            var currentPos;
            var arg = arguments[0] || 30;

            return this.each(function() {

                var SELF = $(this);
                localWindow = $(window),
                localDocument = $(document),
                imageFrontLayer = SELF.find("*[data-mattsMediumFront]"),
                imageBackLayer = SELF.find("*[data-mattsMediumBackDarken]"),
                darkenBack = imageBackLayer.attr("data-mattsMediumBackDarken") || 0,
                orgStyle = imageBackLayer.attr("style") + ";" || "",
                ticking = false;


                chillScroll();
                $(document).scroll(function(event) {
                  chillScroll(event);
                });
                $(document).resize(function(event) {
                  chillScroll(event);
                });
                function chillScroll (evt) {
                  if(!ticking) {
                    ticking = true;
                    requestAnimFrame(updateElements);
                  }
                }

                function updateElements() {

                    var windowHeight = localWindow.height(),
                    documentScrollTop = localDocument.scrollTop(),
                    thisOffsetTop = SELF.offset().top,
                    thisHeight = SELF.height(),
                    currentPos = documentScrollTop + windowHeight,
                    distanceFromTop = thisOffsetTop - documentScrollTop+thisHeight,
                    percentFromTop = (documentScrollTop/thisHeight * 100).toFixed(3),
                    percentFromTopScaled = (percentFromTop * (arg / 100)).toFixed(3),
                    percentFromTopScaledRounded = 100-darkenBack-(percentFromTop * (arg / 100)).toFixed(0);

                    if ( (currentPos > thisOffsetTop) && ( documentScrollTop < thisHeight )  ) {
                        imageFrontLayer.attr("style", "transform:translateY(-" + percentFromTopScaled +  "%); -webkit-transform:translateY(-" + percentFromTopScaled +  "%); -moz-transform:translateY(" + percentFromTopScaled +  "%);");
                        imageBackLayer.attr("style", orgStyle + "opacity:" + (percentFromTopScaledRounded/100) + ";")
                    }
                    ticking = false;
                };
            });
        }

    });
})(jQuery);


