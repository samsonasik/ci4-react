import about      from './about.js';
import createPage from './create-page.js';
import Navigation from './Navigation.js';

const {
  BrowserRouter,
  Routes,
  Route
} = ReactRouterDOM;

const { createElement } = React;

const Main = () => createElement(
  "main",
  null,
  createElement(
    Routes,
    null,

    createElement(Route, {
      path: "/",
      element: createElement(createPage('home', 'Home'))
    }),

    createElement(Route, {
      path: "/about",
      element: createElement(about)
    }),

    createElement(Route, {
      path: "/contact",
      element: createElement(createPage('contact', 'Contact'))
    }),

    createElement(Route, {
      path: "*",
      element: createElement(createPage('404', '404 Page'))
    })
  )
);

const Header = () => createElement(
  'header',
  null,
  createElement(Navigation)
);

const App = () => createElement(
  "div",
  null,
  createElement(Header, null),
  createElement(Main, null)
);

ReactDOM.render(
  createElement(
    BrowserRouter,
    null,
    createElement(App, null)
  ),
  document.getElementById('root')
);
