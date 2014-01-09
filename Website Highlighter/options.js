var storage = chrome.storage.sync;

// Top level pref key
var prefKey = 'whPrefKey';
var minorDelim = '!#%&';
var majorDelim = '@$^*';
var kName = 0;
var kURL = 1;
var kPhrases = 2;

// Get at the DOM controls
var resetButton = document.querySelector('button.reset');
var submitButton = document.querySelector('button.submit');
var textarea = document.querySelector('textarea');
var select = document.querySelector('select');

// Load prefs
loadChanges();

submitButton.addEventListener('click', saveChanges);
resetButton.addEventListener('click', reset);

function saveChanges() {
  // Save using Chrome storage API
  
	var obj= {};
	obj[prefKey] = 'BRO Mods!#%&http://mbd.scout.com*!#%&Tracy Pierson, Greg Biggins, DERF18, HITITLONG, Greg Hicks, SamoRed, 11banners, BrandonHuffman, DavidWoods@$^*BRO Scouts!#%&http://mbd.scout.com*!#%&JoshGershon, EvanDaniels, AnnabelStephan, AnnaHickey, Scott Kennedy@$^*BRO Connected Somehow!#%&http://mbd.scout.com*!#%&goUCLA05@$^*BRO Team Members!#%&http://mbd.scout.com*!#%&bretth17, uclaBBD, jacklaso';
	storage.set(obj, function() {
			// Notify that we saved.
			message('Settings saved');
			console.log(storage);
		}
  	);
  console.log('end save');
}

function loadChanges() {
  storage.get(prefKey, function(items) {
    // To avoid checking items.snippet we could specify storage.get({snippet: ''}) to
    // return a default value of '' if there is no snippet value yet.
    if (items[prefKey]) {
      textarea.value = items[prefKey];
      
      for (var i = 0; i < 10; i++){
        var opt = document.createElement('option');
	    opt.value = i;
	    opt.innerHTML = i;
	    select.appendChild(opt);
	  }
	  
// 	  var button = document.createElement('button');
// 	  document.add(button);
      
      message('Loaded Settings');
    }
  });
}

function reset() {
  storage.clear(function(items) {
    message('Reset Settings');
  });
  // Refresh the text area.
  textarea.value = '';
}

function message(msg) {
  var message = document.querySelector('.message');
  message.innerText = msg;
  setTimeout(function() {
    message.innerText = '';
  }, 3000);
}
