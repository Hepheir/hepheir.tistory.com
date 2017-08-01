function addEvent(dom, evt, func, async) {
	async = async || false;
	if (dom.addEventListener) {
		dom.addEventListener(evt, func, async);
	} else if (dom.attachEvent) {
		dom.attachEvent(evt, func, async);
	} else {
		console.log("couldn't register an eventlistener!");
	}
}

addEvent(window, 'resize', onResize);


// app-bar controll

(function() {
	var searchInput = document.getElementById('js--search__input'),
		searchClear = document.getElementById('js--search--clear');
	
	addEvent(searchInput, 'focusout', function(evt) {
		evt.currentTarget.value = '';
	});

	addEvent(searchClear, 'click', function() {
		searchInput.focus();
	});
})();