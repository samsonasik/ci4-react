const { NavLink } = ReactRouterDOM;
const { Component, createElement } = React;

class Navigation extends Component {
  render() {
    const activeClass = ({ isActive }) => (isActive ? "active" : "");

    return createElement(
      "div",
      { className: "menu" },

      createElement(NavLink, { to: "/", className: activeClass, end: true }, "Home"),
      createElement(NavLink, { to: "/about", className: activeClass }, "About"),
      createElement(NavLink, { to: "/contact", className: activeClass }, "Contact")
    );
  }
}

export default Navigation;