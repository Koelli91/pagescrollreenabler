// add an event listener for updated tabs (so the plugin can act on them when created oder reloaded)
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

    // Initial setting of 'enabled'-storage-variable (if not already set)
    chrome.storage.sync.get('pageScrollEnabled', function (items) {
        if (!chrome.runtime.lastError) {
            // No error in chrome runtime
            if (typeof items.pageScrollEnabled == 'undefined') {
                // Plugin status is undefined, setting it
                chrome.storage.sync.set({'pageScrollEnabled': true});
            }
        }
    });

    // Executing script if enabled == true
    chrome.storage.sync.get('pageScrollEnabled', function (items) {
        if (!chrome.runtime.lastError) {
            // No error in chrome runtime
            if (items.pageScrollEnabled) {
                // Plugin is enabled
                if (changeInfo.status == 'complete') {
                    // Tab loading is complete
                    // Remove nicescroll scrollbars (if any)...
                    // ...and set 'overflow-y: auto' on the 'html' element
                    chrome.tabs.executeScript(tabId, {
                        code: 'var scrollbars = document.getElementsByClassName("nicescroll-rails");' +
                        'Array.from(scrollbars).forEach(function(item, index, array) { item.remove(); });' +
                        'document.getElementsByTagName("html")[0].style.overflowY = "auto";'
                    });
                }

            }
        }
    });

});