var words;

function loadWords(arr) {
    words = arr;
}

function loadData() {
    Papa.parse("dictionary.csv", {
        download: true,
        complete: function(results) {
            loadWords(results.data);
        }
    });
}

window.addEventListener("load", loadData);