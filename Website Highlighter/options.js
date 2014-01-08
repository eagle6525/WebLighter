var storage = chrome.storage.sync;

// Get at the DOM controls used in the sample.
var resetButton = document.querySelector('button.reset');
var submitButton = document.querySelector('button.submit');
var textarea = document.querySelector('textarea');

// Load any snippet that may have previously been saved.
loadChanges();

submitButton.addEventListener('click', saveChanges);
resetButton.addEventListener('click', reset);

function saveChanges() {
  // Get the current snippet from the form.
  var inputSnippet = textarea.value;
  // Check that there's some code there.
  if (! inputSnippet) {
    message('Error: No Snippet specified');
    return;
  }
  // Save it using the Chrome extension storage API.
  storage.set({'snippet': inputSnippet}, function() {
    // Notify that we saved.
    message('Settings saved');
  });
}

function loadChanges() {
  storage.get('snippet', function(items) {
    // To avoid checking items.snippet we could specify storage.get({snippet: ''}) to
    // return a default value of '' if there is no snippet value yet.
    if (items.snippet) {
      textarea.value = items.snippet;
      message('Loaded Settings');
    }
  });
}

function reset() {
  // Remove the saved value from storage. storage.clear would achieve the same
  // thing.
  storage.remove('snippet', function(items) {
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
