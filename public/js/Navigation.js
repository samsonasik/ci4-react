const {
    NavLink
} = ReactRouterDOM;

const {
    Component,
    createElement
} = React;

class Navigation extends Component {
    render() {
        return createElement(
            "div",
            {
                className: "menu"
            },
            createElement(NavLink, { to: "/", exact: true }, "Home"),
            createElement(NavLink, { to: "/about", exact: true }, "About"),
            createElement(NavLink, { to: "/contact", exact: true }, "Contact")
        );
    }
}

export default Navigation;