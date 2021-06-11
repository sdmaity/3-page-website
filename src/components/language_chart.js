import React from 'react';
import '../App.css';

export default class LanguageChart extends React.Component {
    constructor(props) {
        super(props);

        let previousState = localStorage.getItem('inputValues');
        console.log(previousState);
        this.state = previousState ? JSON.parse(previousState) : {
            pagesize: 10,
            page: 1
        };
        this.state['loading'] = true;
        this.totalWidth = window.innerWidth - 35;
        this.handleChange = this.handleChange.bind(this);
        this.apiCall = this.apiCall.bind(this);
        this.saveToPersist = this.saveToPersist.bind(this);
    }
  
    apiCall() {
        this.setState({
            loading: true
        });
        console.log('api', this.state);
        let queryParams = '&pagesize=' + (this.state.pagesize || 30) + '&page=' + (this.state.page || '')
        + '&fromdate=' + (this.state.fromdate ? (new Date(this.state.fromdate).getTime()/1000) : '') + '&todate=' + (this.state.todate ? (new Date(this.state.todate).getTime()/1000) : '');
        fetch('https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=stackoverflow' + queryParams)
        .then(res => res.json())
        .then(result => {
            if (result.error_id) {
                alert(result.error_id + ': ' + result.error_message + ' - ' + result.error_name);
                this.setState({
                loading: false
                });
            } else {
                this.heightScale = createHeightScale(result.items.reduce((r, d) => {
                (d.count > r[1]) && (r[1] = d.count);
                (d.count < r[0] || r[0] === 0) && (r[0] = d.count);
                return r;
                }, [0,0]));
                this.barWidth = Math.floor(this.totalWidth/result.items.length) - 10;
                this.setState({
                data: result.items,
                loading: false
                });
            }
        });
    }
  
    componentDidMount() {
        this.apiCall();
    }
  
    handleChange(e) {
        let value = e.target.value;
        this.setState(state => {
            let copyState = {...state};
            copyState[e.target.name] = value;
            this.saveToPersist(copyState);
            return copyState;
        });
    }

    saveToPersist(curState) {
        let inputValues = {...curState};
        delete inputValues.loading;
        delete inputValues.data;
        localStorage.setItem('inputValues', JSON.stringify(inputValues));
    }

    
  
    render() {
        return (<div>
            {this.state.loading && <div className="loader"><h1>Loading...</h1></div>}
            <div className="api-control-fields">
            <div className="api-control-field">
                <label>From Date:</label>
                <input type="date" name="fromdate" value={this.state.fromdate} onChange={this.handleChange}/>
            </div>
            <div className="api-control-field">
                <label>To Date:</label>
                <input type="date" name="todate"  value={this.state.todate} onChange={this.handleChange}/>
            </div>
            <div className="api-control-field">
                <label>Page Size:</label>
                <input type="number" name="pagesize" value={this.state.pagesize} onChange={this.handleChange}/>
            </div>
            <div className="api-control-field">
                <label>Page:</label>
                <input type="number" name="page" value={this.state.page} onChange={this.handleChange}/>
            </div>
            <button type="submit" onClick={this.apiCall}>Submit</button>
            </div>
            {this.state.data && this.state.data.length ? (<div className="chart-wrapper">
            {this.state.data.map(d => (<div key={d.name} className="bar-wrapper" style={{width: this.barWidth + 'px'}}>
                <div className="bar" style={{height: this.heightScale(d.count) + '%'}}>
                <span className="show-count">{d.count}</span>
                </div>
                <span className="show-name">{d.name}</span>
            </div>))}
            </div>) : <div>No Data Found</div>}
        </div>);
    }
}
  
function createHeightScale([min, max]) {
      let gap;
    let diff = max - min;
    let reverseMap = false;
    if (diff <= 98) {
        reverseMap = true;
        gap = Math.floor(98/diff);
        [min, max] = [0, 100];
    } else {
        gap = Math.floor(diff/98);
        [min, max] = [min - gap, max - gap];
    }
      
    return function(value, reverse) {
        if (reverseMap) {
            [value, reverse] = [reverse, value];
        }
        if (value) {
            return Math.floor((value - min)/gap);
        } else if (!isNaN(reverse)) {
            return min + (gap*reverse);
        }
        return 0;
    }
}