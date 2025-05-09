function isOnMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    }
    if (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) {
        return true;
    }
    if (window.matchMedia("(pointer: coarse)").matches) {
        return true;
    }
    // Safari reports as Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.10 Safari/605.1.1 - check screen size
    if (/Intel Mac OS X/i.test(navigator.userAgent) && window.innerWidth <= 800 && window.innerHeight <= 600) {
        return true;
    }
    return false;
}

var UsernameCopyStrings = [$('username').innerText, "Copied!", "Double Copy!", "Triple Copy!", "Dominating!!", "Rampage!!", "Mega Copy!!", "Unstoppable!!", "Wicked Sick!!", "Monster Copy!!!", "GODLIKE!!!", "BEYOND GODLIKE!!!!"];
var UsernameCopyIndex = 0;
$('username').onclick = function() {
    // console.log("On mobile: " + isOnMobile());
    
    navigator.clipboard.writeText('Cootshk');
    // console.log("Copied username to clipboard");
    UsernameCopyIndex++;
    let CurrentUsernameCopyIndex = UsernameCopyIndex; // In case this gets called multiple times before the timeout
    if (UsernameCopyIndex >= UsernameCopyStrings.length) {
        UsernameCopyIndex = UsernameCopyStrings.length-1; // Reset index if it exceeds the array length
        CurrentUsernameCopyIndex = UsernameCopyIndex; // Update current index to the last valid index
    }
    $('username').innerText = UsernameCopyStrings[UsernameCopyIndex];
    // Add shake effect
    // console.log("UsernameCopyIndex: " + UsernameCopyIndex);
    // console.log("CurrentUsernameCopyIndex: " + CurrentUsernameCopyIndex);
    
    
    if (!isOnMobile() && CurrentUsernameCopyIndex >= UsernameCopyStrings.length - 1) {
        $('username').classList.add('large-shake');
        $('username').classList.remove('shake');
        // console.log("beyond godlike");
    } else if (!isOnMobile() && CurrentUsernameCopyIndex >= UsernameCopyStrings.length - 2) {
        $('username').classList.add('shake');
        // console.log("godlike");
    }
    setTimeout(function() {
        if (UsernameCopyIndex === CurrentUsernameCopyIndex) {
            UsernameCopyIndex = 0; // Reset index after timeout
            $('username').innerText = UsernameCopyStrings[0]; // Reset to original username
            $('username').classList.remove('shake');
            $('username').classList.remove('large-shake');
        }
    }, $('username').classList.contains('large-shake') ? 3000 : 2000);
}

// mobileLayoutChanges = function() {
//     // console.log("Window resized");
//     if (isOnMobile()) {
//         $('projects-button').attributes['hx-get'].value = '/html/projects-mobile.html';
//         $('contact-button').attributes['hx-get'].value = '/html/contact-mobile.html';
//         $('photos-button').attributes['hx-get'].value = '/html/photos-mobile.html';
//     } else {
//         $('projects-button').attributes['hx-get'].value = '/html/projects.html';
//         $('contact-button').attributes['hx-get'].value = '/html/contact.html';
//         $('photos-button').attributes['hx-get'].value = '/html/photos.html';
//     }
// }
// document.addEventListener('resize',mobileLayoutChanges);
// document.addEventListener('DOMContentLoaded', mobileLayoutChanges);