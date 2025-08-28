//~~~~~~~~~~~
// Global .js
//~~~~~~~~~~~



// Declaring the global variables


var body //HTML Body Tag
var controller; //Scroll Magic Controller
var mlogo = document.getElementById("mlogo"); // M Logo Svg
var animation //M logo bodymovin animation
var links; //nav links
var hero;
var isCta;
var route = "../user/themes/michael-j-davies/" //route to theme
var nav = document.getElementsByTagName("nav")[0];
var mobile = document.getElementById("mobile");

window.ev = false;

var onloadCallback = function() {}; //for reCaptcha




//~~~~~~~
// Swup
//~~~~~~~

function inity() {

		checkLogin();
		// console.log('hello');

		// alert("Hello! I am an alert box!!");
		//~~~~~~~
		// Page content handling
		//~~~~~~~
		// Swup prevents page load and replaces the page content instead.
		// Everything inside this function gets called each new content load.





		//~~~~~~~~~~~~~~~~~~
		//   Scroll Magic
	    //~~~~~~~~~~~~~~~~~~
		
		controller = new ScrollMagic.Controller();



		  // Initialize the ScrollMagic controller
		  // const controller = new ScrollMagic.Controller();


		  // Select all list items with class 'onpagenav-item'
		  const listItems = document.querySelectorAll('.onpagenav-item');

		  listItems.forEach((item) => {
		    // Generate trigger ID from text content
		    const slug = item.textContent
		      .toLowerCase()
		      .trim()
		      .replace(/\s+/g, '-')        // Replace spaces with hyphens
		      .replace(/[^\w\-]/g, '');    // Remove non-word characters (optional cleanup)

		    const trigger = document.getElementById(slug);
		    if (!trigger) return; // Skip if corresponding trigger not found

		    new ScrollMagic.Scene({
		      triggerElement: trigger,
		      triggerHook: 0.8
		    })
		    .setClassToggle(item, 'opn-item-active')
		    .addTo(controller);
		  });



		//~~~~~~~~~~~~~~~~~~
		//   Copy link
	    //~~~~~~~~~~~~~~~~~~


		    // Attach event listener to all .copy-link elements
			  document.querySelectorAll('.copy-link').forEach(element => {
			    element.addEventListener('click', () => {
			      const anchor = element.getAttribute('data-anchor');
			      const fullUrl = `${window.location.origin}${window.location.pathname}#${anchor}`;

			      // Copy to clipboard
			      navigator.clipboard.writeText(fullUrl)
			        .then(() => {
				        showTooltip(element, "Link copied!", "success");
				      })
				      .catch(() => {
				        showTooltip(element, "Failed to copy", "error");
				      });
			    });
			  });


			function showTooltip(target, message, type = 'success') {
			  // Create tooltip element
			  const tooltip = document.createElement('div');
			  tooltip.className = `copy-tooltip ${type}`;
			  tooltip.textContent = message;

			  // Position relative to the target
			  target.style.position = 'relative';
			  target.appendChild(tooltip);

			  // Force reflow so the animation works
			  void tooltip.offsetWidth;
			  tooltip.classList.add('visible');

			  // Remove after 5 seconds
			  setTimeout(() => {
			    tooltip.classList.remove('visible');
			    setTimeout(() => tooltip.remove(), 300); // wait for fade-out
			  }, 3000);
			}
					


		// //~~~~~~~~~~~~~~~~~~
		// //   Header Sizing
	    // //~~~~~~~~~~~~~~~~~~
		// var body = document.getElementsByTagName("BODY")[0];

		// if( body !=null){
		// 	wordmarklong = new ScrollMagic.Scene({triggerElement: body, duration: "40px", triggerHook: 0})
		// 				.setClassToggle(nav, "navhead") // add class toggle
		// 				.addIndicators() // add indicators (requires plugin)
		// 				.addTo(controller);
		// }





		// ~~~
		// AOS
		// ~~~

		AOS.init();

};













function unload() {



	//~~~~~~~~~~~~~~~
	// Page resetting
	//~~~~~~~~~~~~~~~
	// Called when the page is reloaded to reset all the 
	// scripts than are still running



	// Kill the Scrollmagic controller
  	if(controller){
  		controller.destroy();
		controller = null;
		//console.log('controller (and all scenes) destroyed');
	} else {
		// //console.log('nothing destroyed');
	}




}




//~~~~~~~
// Global Scripts
//~~~~~~~
// These scripts don't need resetting on content replace because
// they don't reference content that is getting replaced.







// ~~~
// Mobile Nav 
// ~~~

	var a = document.getElementById('mobNav')
	var b = document.getElementById('overlay')
	//Toggle
	function navmob(elem) {
	    // a.style.top = '0';
	    a.classList.toggle("navmobshow");
	    b.classList.toggle("overlay");

	     if( a.classList.contains("navmobshow")){
	     	setTimeout(addScrollListener, 1000)

		    function addScrollListener(){
		    	window.addEventListener("scroll", navmobClose);
		    	//console.log('added');
		    }
		} else {
			window.removeEventListener("scroll", navmobClose);
			//console.log('removed');
		}

	    
	   

	}

	function navmobClose(){
		a.classList.remove("navmobshow");
	    b.classList.remove("overlay");
	    window.removeEventListener("scroll", navmobClose);
	    //console.log('removed');
	}

	//close menu if click outside
	document.getElementById("overlay").addEventListener("click", navmob);
	//close menu if scroll
	window.addEventListener("scroll", navmobClose);
	//close menu if resize
	window.addEventListener("resize", navmobClose);







function checkLogin() {
	console.log('checkLogin');
    const container = document.getElementById('swup');
    if (!container) return;

    const requireLogin = container.dataset.requireLogin === 'true';
    const loggedIn = container.dataset.loggedIn === 'true';

    // console.log(requireLogin);
    // console.log(loggedIn);


    if (requireLogin && !loggedIn) {
        window.location.href = '/login';
    }
}

// // Regular page load
// document.addEventListener('DOMContentLoaded', checkLogin);

// // swup page replacement
// if (window.swup) {
//     document.addEventListener('swup:contentReplaced', checkLogin);
// }



// ~~~
// Run Swup
// ~~~


    const swup = new Swup({
    	plugins: [

    	new SwupGaPlugin({ gaMeasurementId: 'PL0ZK20J6X' }),

    	new SwupScrollPlugin({
    		doScrollingRightAway: false,
		    animateScroll: true,
		    scrollFriction: 0.3,
		    scrollAcceleration: 0.04,
    	})

    	],
    	containers: ['#swup', '.on-page-nav']

    });


    // run once 
    inity();

    // this event runs for every page view after initial load
    swup.hooks.on('page:view', inity);
    swup.hooks.on('animation:out:start', unload);

    // swup.on('willReplaceContent', unload); //This broke when upgrading to swup 4, not sure what it did



