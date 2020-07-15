const {
    Component,
    createElement
} = React;

const pagesData = [];

let createPage = (name, title, data = {}) => class Page extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({ content: ''}, data);
    }

    componentDidMount() {
        if (name in pagesData) {
            this.setState({ content: pagesData[name].content });
            document.title = pagesData[name].title;

            return;
        }

        new Promise( (resolve) => {
            fetch(
                this.props.location.pathname,
                {
                    method: 'GET',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                    }
                }
            ).then(response =>  resolve(response.text()));
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
                className : "app-content",
            },
            createElement(
                "main",
                {
                    className : "container"
                },
                HTMLReactParser(this.state.content)
            )
        );
    }
}

export default createPage;