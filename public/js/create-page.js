const {
    Component,
    createElement
} = React;

let createPage = (title, data = {}) => class Page extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({ content: ''}, data);
    }

    componentDidMount() {
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
            this.setState({
                content: eval("`"+DOMPurify.sanitize(result)+"`")
            });
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