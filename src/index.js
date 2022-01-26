const Router = require("./router.js");
const Inbox = require("./inbox.js");
const Sent = require("./sent.js");

let routes = {
    inbox: Inbox,
    sent: Sent
}

document.addEventListener("DOMContentLoaded", () => {
    let navItems = Array.from(document.querySelectorAll(".sidebar-nav li"));
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            let name = item.innerText.toLowerCase();
            window.location.hash = name;
        })
    })
    window.location.hash = "#inbox";
    let content = document.querySelector(".content");
    let router = new Router(content, routes);
    router.start();

})

