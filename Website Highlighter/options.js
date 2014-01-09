var storage = chrome.storage.sync;

// Top level pref key
var prefKey = "whPrefKey";
var minorDelim = "!#%&";
var majorDelim = "@$^*";
var kName = 0;
var kURL = 1;
var kPhrases = 2;

// Get at the DOM controls
var submitButton = document.querySelector("button.submit");
var textarea = document.querySelector("textarea");
var prefsDisplayBody = document.querySelector("tbody.prefsDisplayBody");

// Load prefs
loadChanges();

submitButton.addEventListener("click", saveChanges);

function saveChanges() {
	var obj= {};
	obj[prefKey] = textarea.value;
	storage.set(obj, function() {
		message("Settings saved");
	});
}

function removeList(mouseEvent) {
	var sender = mouseEvent.toElement.getAttribute("class");;
	console.log(sender);
}

function loadChanges() {
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
			message("Loaded Settings");
		}
    });
}

function message(msg) {
	var message = document.querySelector(".message");
	message.innerText = msg;
	setTimeout(function() {
			message.innerText = "";
	}, 3000);
}
