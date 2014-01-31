var storage = chrome.storage.sync;

// Top level pref key
var prefKey = "whPrefKey";
var minorDelim = "!#%&";
var majorDelim = "@$^*";
var kName = 0;
var kURL = 1;
var kPhrases = 2;

// Get at the DOM controls
var prefsDisplayBody = document.querySelector("tbody.prefsDisplayBody");
var addNewButton = document.querySelector("button.addNew");
var submitButton = document.querySelector("button.submit");
var textarea = document.querySelector("textarea.allPrefs");

// Load prefs
loadChanges();

addNewButton.addEventListener("click", addNew);
submitButton.addEventListener("click", saveChanges);

function addNew() {
	var nameInput = document.querySelector("input.name");
	var urlInput = document.querySelector("input.url");
	var phrases = document.querySelector("textarea.phrases");
	
	storage.get(prefKey, function(items) {
		if (items[prefKey]) {		
			var newPrefs = items[prefKey] + 
						majorDelim +
						nameInput.value +
						minorDelim +
						urlInput.value +
						minorDelim +
						phrases.value;
			saveChangesString(newPrefs);
		}
		else {
			var newPrefs = nameInput.value +
						minorDelim +
						urlInput.value +
						minorDelim +
						phrases.value;
			saveChangesString(newPrefs);
		}
    });
}

function saveChanges() {
	saveChangesString(textarea.value);
}

function saveChangesString(prefsToSave) {
	var obj= {};
	obj[prefKey] = prefsToSave;
	storage.set(obj, function() {
		loadChanges();
		message("Settings saved");
	});
}

function removeList(mouseEvent) {
	var sender = mouseEvent.toElement.getAttribute("class");;
	
	storage.get(prefKey, function(items) {
		if (items[prefKey]) {		
			var topLevelPrefs = items[prefKey].split(majorDelim);
			var newPrefs = "";
			for (var counter = 0; counter < topLevelPrefs.length; counter++) {
				if (counter != sender) {
					if ("" != newPrefs)
						newPrefs += majorDelim;
					newPrefs += topLevelPrefs[counter];
				}
			}
			saveChangesString(newPrefs);
		}
    });
}

function loadChanges() {
	prefsDisplayBody.innerHTML = '';
	storage.get(prefKey, function(items) {
		if (items[prefKey]) {
			textarea.value = items[prefKey];		
			var topLevelPrefs = items[prefKey].split(majorDelim);
			var currentURL = window.document.location.href;
			for (var counter = 0; counter < topLevelPrefs.length; counter++) {
				var siteSettings = topLevelPrefs[counter].split(minorDelim);
				var row = prefsDisplayBody.insertRow(-1);
				
				var button = document.createElement("button");
				button.setAttribute("class", counter);
				button.innerHTML = "Remove";
				button.addEventListener("click", removeList);
				row.insertCell(-1).appendChild(button);
				
				row.insertCell(-1).innerText = siteSettings[kName];
				row.insertCell(-1).innerText = siteSettings[kURL];
				row.insertCell(-1).innerText = siteSettings[kPhrases];
			}
		}
    });
}

function message(msg) {
	var message = document.querySelector(".message");
	message.innerText = msg;
	setTimeout(function() {
			message.innerText = "";
	}, 5000);
}
