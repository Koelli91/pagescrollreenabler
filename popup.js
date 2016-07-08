document.addEventListener('DOMContentLoaded', function() {
    // Setting the internationalised Off/On-Labels on the Switch
    document.getElementById("labelOff").innerHTML = chrome.i18n.getMessage("switchOff");
    document.getElementById("labelOn").innerHTML = chrome.i18n.getMessage("switchOn");

    var toggler = document.getElementById('toggler');

    chrome.storage.sync.get('pageScrollEnabled', function(items) {
        if (!chrome.runtime.error) {
            if ( typeof items.pageScrollEnabled == 'undefined') {
                chrome.storage.sync.set({'pageScrollEnabled': true});
                toggler.checked = true;
            } else {
                toggler.checked = items.pageScrollEnabled;
            }

            toggler.addEventListener('change', function() {
                // Getting set status and saving it
                var checked = toggler.checked;
                chrome.storage.sync.set({'pageScrollEnabled' : checked});

                // Adding a reload message (if not already added)
                if (!document.getElementById('reloadMessage')) {
                    var switchElem = document.getElementById('switch');
                    var elem = document.createElement('h3');
                    elem.id = 'reloadMessage';
                    elem.innerHTML = chrome.i18n.getMessage("reloadmessage");
                    document.body.insertBefore(elem, switchElem);
                }
            });
        }
    });
}, false);