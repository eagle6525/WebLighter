console.log(window.document.location.href);
var currentURL = window.document.location.href;
var urlToMatch = 'mbd.scout.com';
var regex = new RegExp(urlToMatch,"g");
if (currentURL.match(regex)) {
	console.log('if before');
	pageMatches()
	console.log('if after');
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

function pageMatches() {
	console.log('foo before');

	var delimToken = ", "
	var mods = 'Tracy Pierson, Greg Biggins, DERF18, HITITLONG, Greg Hicks, SamoRed, 11banners, BrandonHuffman, DavidWoods'
	var scouts = 'JoshGershon, EvanDaniels, AnnabelStephan, AnnaHickey'
	var connectedSomehow = 'goUCLA05'
	var teamMembers = 'bretth17, uclaBBD, jacklaso'

	var phrasesToHighlight = mods.split(delimToken);
	console.log(mods);
	console.log(phrasesToHighlight);
	for (var i=0; i < phrasesToHighlight.length; i++) {
		$(document.body).highlight(phrasesToHighlight[i], random_color());
	}

	phrasesToHighlight = scouts.split(delimToken);
	console.log(phrasesToHighlight);
	for (var i=0; i < phrasesToHighlight.length; i++) {
		$(document.body).highlight(phrasesToHighlight[i], random_color());
	}

	phrasesToHighlight = connectedSomehow.split(delimToken);
	console.log(phrasesToHighlight);
	for (var i=0; i < phrasesToHighlight.length; i++) {
		$(document.body).highlight(phrasesToHighlight[i], random_color());
	}

	phrasesToHighlight = teamMembers.split(delimToken);
	console.log(phrasesToHighlight);
	for (var i=0; i < phrasesToHighlight.length; i++) {
		$(document.body).highlight(phrasesToHighlight[i], random_color());
	}

	console.log('foo after');
}
