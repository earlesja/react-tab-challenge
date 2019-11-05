import React, { Component } from 'react';
import { TabHeader } from '../tab-header/tab-header';
import { ContentPane } from '../content-pane/content-pane';
import 'font-awesome/css/font-awesome.min.css';

const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

export class Tabs extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedTabIndex: 0,
            tabs: null
        };
    }

    componentDidMount(): void {
        this.headers.addEventListener("keydown", this.handleKeyDown);
        fetch('http://my-json-server.typicode.com/earlesja/fake-json-server/content')
            .then(response => response.json())
            .then(data => this.setState({tabs: data}))
    }

    componentWillUnmount(): void {
        this.headers.removeEventListener("keydown", this.handleKeyDown);
    }

    handleTabSelection = (tabIndex) => {
        this.setState({
            selectedTabIndex: tabIndex === this.state.selectedIndex ? 0 : tabIndex
        });
    };

    handleKeyDown = (event) => {
        let newIndex;
        switch(event.keyCode) {
            case LEFT_ARROW:
                newIndex = this.state.selectedTabIndex - 1;
                break;
            case RIGHT_ARROW:
                newIndex = this.state.selectedTabIndex + 1;
                break;
            default:
                return;
        }
        newIndex = this.handleWrapAround(newIndex);
        this.setState({
            selectedTabIndex: newIndex
        });
    };

    handleWrapAround = (newIndex) => {
        let tabCount = this.state.tabs.length;
        if (newIndex < 0 || newIndex >= tabCount) {
            newIndex = (newIndex + tabCount) % tabCount;
        }
        return newIndex
    };

    render() {
        return (
            <div>
                <div className="tab-container" ref={headers => this.headers = headers}>
                    {this.state.tabs ? this.state.tabs.map((tab, idx) => {
                        return <TabHeader key={tab.id}
                                          onSelect={this.handleTabSelection}
                                          title={tab.title}
                                          index={idx}
                                          active={this.state.selectedTabIndex === idx}/>
                    }) : <div className="loading-icon"><i className="fa-3x fa fa-spinner fa-pulse"/></div>}
                </div>
                {this.state.tabs ? <ContentPane activeTab={this.state.tabs[this.state.selectedTabIndex]}/> : null}
        </div>);
    };
}
