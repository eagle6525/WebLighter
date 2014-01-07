chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getSelection")
        sendResponse({data: window.getSelection().toString()});
    else
        sendResponse({}); // snub them.
});

console.log('foo before');
console.log(console.log(window.document.location.href));
console.log('foo after');