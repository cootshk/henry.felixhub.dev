let $ = function(id) { return document.getElementById(id); };
$('username').onclick = function() {
    navigator.clipboard.writeText('Cootshk');
    // TODO: copied popout?
    console.log("Copied username to clipboard");
    $('username').innerText = "Copied!";
    setTimeout(function() {
        $('username').innerText = "@Cootshk";
    }, 2000);
}