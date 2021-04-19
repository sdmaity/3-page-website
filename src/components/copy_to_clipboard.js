import React from 'react';
import '../App.css';

export default class CopyToClipboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            q: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCopy = this.handleCopy.bind(this);
    }

    handleChange(e) {
        let q = '';
        try {
            let url = new URL(e.target.value);
            q = url.searchParams.get('q') || '';
        } catch(err) {

        }
        this.setState({q});
    }

    handleCopy(e) {
        let target = e.target.previousElementSibling;
        if (target.type === 'text') {
            target.select();
            document.execCommand('copy');
            target.blur();
        } else {
            let text = document.createElement('input');
            text.value = this.state.q;
            document.body.append(text);
            text.select();
            document.execCommand('copy');
            text.remove();
        }
    }

    render() {
        return (
            <div className="copy-to-clipboard">
                <div className="textarea-wrapper">
                    <input type="text" onChange={this.handleChange}/>
                    <button onClick={this.handleCopy}>Copy</button>
                </div>
                {this.state.q && (<div className="show-q-wrapper">
                    <div className="show-q">{this.state.q}</div>
                    <button  onClick={this.handleCopy}>Copy</button>
                </div>)}
            </div>
        );
    }
}