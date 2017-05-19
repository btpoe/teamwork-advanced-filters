function nodeMatchesFilter(filter) {
    if (filter[0] === '!') {
        return !nodeMatchesFilter.call(this, filter.substr(1))
    }
    const contents = this.innerText.toLowerCase();

    if (filter[0] === '/' && filter[filter.length-1] === '/') {
        try {
            return new RegExp(filter.slice(1, -1)).test(contents);
        } catch(e) {
            return true;
        }
    }
    return contents.indexOf(filter) > -1;
}

function filterResults(query) {
    const filters = query.split(',').map(str => str.trim()).filter(Boolean);

    for (let wrapper of document.querySelectorAll('.task-groupHold-wrapper')) {
        wrapper.style.display = !filters.length || filters.every(nodeMatchesFilter.bind(wrapper)) ? '' : 'none';
    }
}

chrome.runtime.onMessage.addListener((request) => {
    if (typeof request.filters === 'string') {
        filterResults(request.filters);
    }
});
