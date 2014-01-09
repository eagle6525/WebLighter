loadPrefs();

function loadPrefs() {	
	var storage = chrome.storage.sync;
	var prefKey = 'whPrefKey';
	var minorDelim = '!#%&';
	var majorDelim = '@$^*';
	var kName = 0;
	var kURL = 1;
	var kPhrases = 2;
	
	storage.get(prefKey, function(items) {
		if (items[prefKey]) {			
			var topLevelPrefs = items[prefKey].split(majorDelim);
			var currentURL = window.document.location.href;
			for (var counter = 0; counter < topLevelPrefs.length; counter++) {
				var siteSettings = topLevelPrefs[counter].split(minorDelim);				
				var regex = new RegExp(siteSettings[kURL],"i");
				if (currentURL.match(regex)) {
					highlightPage(siteSettings[kPhrases]);
				}
			}
		}
    });
}

function highlightPage(phrases) {
	var delimToken = ", "
	var phrasesToHighlight = phrases.split(delimToken);
	for (var i=0; i < phrasesToHighlight.length; i++) {
		$(document.body).highlight(phrasesToHighlight[i], random_color());
	}
}

function random_color() {
    var style = 'background: ';
    var r, g, b;
    r = Math.round(Math.random() * 0xFF);
    g = Math.round(Math.random() * 0xFF);
    b = Math.round(Math.random() * 0xFF);

    style += 'rgba(' + r + ',' + g + ',' + b + ',1);';

    /* The formula for calculating luminance is taken from
     * http://www.paciellogroup.com/resources/contrast-analyser.html
     *
     * If there are better methods to change, please let me know.
     */
     var luminance = (r * 299 + g * 587 + b * 114 ) / 1000;
     if (luminance < 125) {
        style += 'color: #FFFFFF';
    } else {
        style += 'color: #000000';
    }
    return style;
}