# Matts Medium


A jQuery plugin to make a parallax intro slide like [medium.com](https://medium.com/about/9e53ca408c48)


**Features**

* Uses hardware accelerated 3D Transform as to animate the background. All the work is offloaded to the GPU.
* Only animates the image when its within the viewport.
* Scrolling is debounced to requestAnimationFrame for maximum scrolling efficiency. 

 

## Example use

```html
<!DOCTYPE html>
<html>
<head>
<style>
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


/*
Wrap the content of your document in an ID called root.
Give it a class of shortIntro to make it 50% height of the page.
*/

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

</style>
<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
<script src="jquery.mattsmedium.min.js"></script>
</head>
<body>

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

<script>

$(".introSlide").mattsMedium(40);

</script>
</body>
</html>
```
