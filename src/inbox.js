const MessageStore = require("./message-store.js");




let inbox = {
    render() {
        let ul = document.createElement("ul");
        ul.className = "messages";
        let messages = MessageStore.getInboxMessages();
        messages.forEach(msg => {
            let node = this.renderMessage(msg);
            ul.appendChild(node);
        })
        return ul;
    },

    renderMessage(msg) {
        let li = document.createElement("li");
        li.innerHTML = `<span class="from">${msg.from}</span>
                        <span class="subject">${msg.subject}</span>
                        <span class="body">${msg.body}</span>`;
        return li;       

    }
}

module.exports = inbox;
