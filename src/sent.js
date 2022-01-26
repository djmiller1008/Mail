const MessageStore = require("./message-store.js");

let sent = {
    render() {
        let ul = document.createElement("ul");
        ul.className = "messages";
        let messages = MessageStore.getSentMessages();
        messages.forEach(msg => {
            let node = this.renderMessage(msg);
            ul.appendChild(node);
        })
        return ul;
    },

    renderMessage(msg) {
        let li = document.createElement("li");
        li.innerHTML = `<span class="to">${msg.to}</span>
                        <span class="subject">${msg.subject}</span>
                        <span class="body">${msg.body}</span>`;
        return li;       

    }
};

module.exports = sent;