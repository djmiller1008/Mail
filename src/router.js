class Router {
    constructor(node, routes) {
        this.node = node;
        this.routes = routes;
    }

    start() {
        this.render();
        window.addEventListener("hashchange", () => {
            this.render();
        })
    }

    render() {
        this.node.innerHTML = "";
        let component = this.activeRoute();
        if(component) {
            this.node.appendChild(component.render());
        } 
    }

    activeRoute() {
        let fragment = window.location.hash.slice(1);
        let routeName = this.routes[fragment];
        return routeName;
    }
}

module.exports = Router;
