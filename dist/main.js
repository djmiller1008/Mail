/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/compose.js":
/*!************************!*\
  !*** ./src/compose.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MessageStore = __webpack_require__(/*! ./message-store.js */ \"./src/message-store.js\");\n\nlet compose = {\n    render() {\n        let div = document.createElement(\"div\");\n        div.className = \"new-message\";\n        div.innerHTML = this.renderForm();\n        div.addEventListener(\"change\", e => {\n            let target = e.target;\n            MessageStore.updateDraftField(target.name, target.value);\n        });\n\n        div.addEventListener(\"submit\", e => {\n            e.preventDefault();\n            MessageStore.sendDraft();\n            window.location.hash = \"#inbox\";\n        })\n\n        return div;\n    },\n\n    renderForm() {\n        let draft = MessageStore.getMessageDraft();\n        let htmlString = \n        `<p class=\"new-message-header\">New Message</p>\n         <form class=\"compose-form\">\n            <input placeholder=\"Recipient\" name=\"to\" type=\"text\" value=${draft.to}>\n            <input placeholder=\"Subject\" name=\"subject\" type=\"text\" value=${draft.subject}>\n            <textarea name=\"body\" rows=20>${draft.body}</textarea>\n            <button type=\"submit\" class=\"btn btn-primary submit-message\">Send</button>\n        </form>`;\n\n        return htmlString;           \n    }\n\n}\n\nmodule.exports = compose;\n\n//# sourceURL=webpack://mail/./src/compose.js?");

/***/ }),

/***/ "./src/inbox.js":
/*!**********************!*\
  !*** ./src/inbox.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MessageStore = __webpack_require__(/*! ./message-store.js */ \"./src/message-store.js\");\n\n\n\n\nlet inbox = {\n    render() {\n        let ul = document.createElement(\"ul\");\n        ul.className = \"messages\";\n        let messages = MessageStore.getInboxMessages();\n        messages.forEach(msg => {\n            let node = this.renderMessage(msg);\n            ul.appendChild(node);\n        })\n        return ul;\n    },\n\n    renderMessage(msg) {\n        let li = document.createElement(\"li\");\n        li.innerHTML = `<span class=\"from\">${msg.from}</span>\n                        <span class=\"subject\">${msg.subject}</span>\n                        <span class=\"body\">${msg.body}</span>`;\n        return li;       \n\n    }\n}\n\nmodule.exports = inbox;\n\n\n//# sourceURL=webpack://mail/./src/inbox.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Router = __webpack_require__(/*! ./router.js */ \"./src/router.js\");\nconst Inbox = __webpack_require__(/*! ./inbox.js */ \"./src/inbox.js\");\nconst Sent = __webpack_require__(/*! ./sent.js */ \"./src/sent.js\");\nconst Compose = __webpack_require__(/*! ./compose.js */ \"./src/compose.js\");\n\nlet routes = {\n    inbox: Inbox,\n    sent: Sent,\n    compose: Compose\n}\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    let navItems = Array.from(document.querySelectorAll(\".sidebar-nav li\"));\n    navItems.forEach(item => {\n        item.addEventListener(\"click\", () => {\n            let name = item.innerText.toLowerCase();\n            window.location.hash = name;\n        })\n    })\n    window.location.hash = \"#inbox\";\n    let content = document.querySelector(\".content\");\n    let router = new Router(content, routes);\n    router.start();\n\n})\n\n\n\n//# sourceURL=webpack://mail/./src/index.js?");

/***/ }),

/***/ "./src/message-store.js":
/*!******************************!*\
  !*** ./src/message-store.js ***!
  \******************************/
/***/ ((module) => {

eval("class Message {\n  constructor(from, to = \"\", subject = \"\", body = \"\") {\n    this.from = from;\n    this.to = to;\n    this.subject = subject;\n    this.body = body;\n  }\n}\n\nlet messageDraft = new Message();\n\nlet messages = {\n\n    sent: [\n      {\n        to: \"friend@mail.com\",\n        subject: \"Check this out\",\n        body: \"It's so cool\"\n      },\n      { to: \"person@mail.com\", subject: \"zzz\", body: \"so booring\" }\n    ],\n    inbox: [\n      {\n        from: \"grandma@mail.com\",\n        subject: \"Fwd: Fwd: Fwd: Check this out\",\n        body:\n          \"Stay at home mom discovers cure for leg cramps. Doctors hate her\"\n      },\n      {\n        from: \"person@mail.com\",\n        subject: \"Questionnaire\",\n        body: \"Take this free quiz win $1000 dollars\"\n      }\n    ]\n}\n\nconst MessageStore = {\n    updateDraftField(field, value) {\n      messageDraft[field] = value;\n    },\n\n    sendDraft() {\n      messages.sent.push(messageDraft);\n      messageDraft = new Message();\n    },\n    getInboxMessages() {\n        return messages.inbox.slice();\n    },\n    getSentMessages() {\n        return messages.sent.slice();\n    },\n    getMessageDraft() {\n      return messageDraft;\n    }\n};\n\nmodule.exports = MessageStore;\n\n\n\n//# sourceURL=webpack://mail/./src/message-store.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/***/ ((module) => {

eval("class Router {\n    constructor(node, routes) {\n        this.node = node;\n        this.routes = routes;\n    }\n\n    start() {\n        this.render();\n        window.addEventListener(\"hashchange\", () => {\n            this.render();\n        })\n    }\n\n    render() {\n        this.node.innerHTML = \"\";\n        let component = this.activeRoute();\n        if(component) {\n            this.node.appendChild(component.render());\n        } \n    }\n\n    activeRoute() {\n        let fragment = window.location.hash.slice(1);\n        let routeName = this.routes[fragment];\n        return routeName;\n    }\n}\n\nmodule.exports = Router;\n\n\n//# sourceURL=webpack://mail/./src/router.js?");

/***/ }),

/***/ "./src/sent.js":
/*!*********************!*\
  !*** ./src/sent.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MessageStore = __webpack_require__(/*! ./message-store.js */ \"./src/message-store.js\");\n\nlet sent = {\n    render() {\n        let ul = document.createElement(\"ul\");\n        ul.className = \"messages\";\n        let messages = MessageStore.getSentMessages();\n        messages.forEach(msg => {\n            let node = this.renderMessage(msg);\n            ul.appendChild(node);\n        })\n        return ul;\n    },\n\n    renderMessage(msg) {\n        let li = document.createElement(\"li\");\n        li.innerHTML = `<span class=\"to\">${msg.to}</span>\n                        <span class=\"subject\">${msg.subject}</span>\n                        <span class=\"body\">${msg.body}</span>`;\n        return li;       \n\n    }\n};\n\nmodule.exports = sent;\n\n//# sourceURL=webpack://mail/./src/sent.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;