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
        searchClear = document.getElementById('js--search--clear'),
        fullmodeToggle = document.getElementsByClassName('js--search-fullmode--toggle')[0];
	
	addEvent(searchInput, 'focusout', function(evt) {
        evt.currentTarget.value = '';
	});

	addEvent(searchClear, 'click', function() {
		searchInput.focus();
        fullmodeToggle.checked = true;
	});
})();

(function setPageTitle() {
    var path, title;
    path = location.pathname
           .match(/\/([^/]*)/g)[0]
           .replace('/', '');
    if (path == "") {
        title = '홈';
    } else {
        title = {
            'category': (function() {
                var category = location.pathname.match(/([^/]*)($|\/$|#)/g)[0];
                category = decodeURI(category);
                if (category == "category") {
                    return '카테고리';
                } else {
                    return category;
                }
            })(),
            'search': '검색'
        }[path];
        if (title == undefined) {
            title = path;
        }
    }

    document.getElementById('js--app-bar__title').innerHTML = title;

})();
