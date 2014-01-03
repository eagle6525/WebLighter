
var regex = /by Tracy Pierson @|by Greg Hicks @|by Greg Biggins @/;

// Test the text of the body element against our regular expression.
if (regex.test(document.body.innerText)) {
  // The regular expression produced a match, so notify the background page.
  chrome.extension.sendRequest({}, function(response) {});
} else {
  // No match was found.
}
