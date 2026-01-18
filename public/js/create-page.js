const {
  Component,
  createElement
} = React;

const {
  useLocation,
  useParams,
  useNavigate
} = ReactRouterDOM;

const pagesData = [];

// Wrapper to provide hooks to class components
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return createElement(
      Component,
      Object.assign({}, props, { router: { location, navigate, params } })
    );
  }

  return ComponentWithRouterProp;
}

const createPage = (name, title, data = {}) => { class Page extends Component {
    constructor(props) {
      super(props);
      this.state = Object.assign({content: ''}, data);
    }

    componentDidMount() {
      if (name in pagesData) {
        this.setState({ content: pagesData[name].content });
        document.title = pagesData[name].title;

        return;
      }

      const pathname = this.props.router.location.pathname;

      new Promise((resolve) => {
        fetch(
          pathname,
          {
            method: 'GET',
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
            }
          }
        ).then(response => resolve(response.text()));
      }).then(result => {
        let content = eval("`"+DOMPurify.sanitize(result)+"`");
        this.setState({ content: content });
        pagesData[name] = {
            title: title,
            content: content
        };
        document.title = title;
      });
    }

    render() {
      return createElement(
        'div',
        {
          className: 'app-content',
        },
        createElement(
          'main',
          {
            className: 'container'
          },
          HTMLReactParser(this.state.content)
        )
      );
    }
  }

  return withRouter(Page);
};

export default createPage;
