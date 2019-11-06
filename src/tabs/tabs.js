import React, { Component } from 'react';
import { TabHeader } from '../tab-header/tab-header';
import { ContentPane } from '../content-pane/content-pane';
import 'font-awesome/css/font-awesome.min.css';

import './tabs.css';

const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

const DIRECTION = {
    LEFT: 'left',
    RIGHT: 'right'
};

export class Tabs extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedTabIndex: 0,
            isNavigateLeftHover: false,
            isNavigateRightHover: false,
            tabs: null
        };
    }

    componentDidMount(): void {
        fetch('http://my-json-server.typicode.com/earlesja/fake-json-server/content')
            .then(response => response.json())
            .then(data => this.setState({tabs: data}));

        this.tabListElem.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount(): void {
        this.tabListElem.removeEventListener("keydown", this.handleKeyDown);
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

    handleNavigationControls = () => {
        let showNavLeft, showNavRight;
        if (this.tabListElem.scrollLeft === 0) {
            showNavRight = true;
            showNavLeft = false;
        } else {
            showNavRight = false;
            showNavLeft = true;
        }

        this.setState({
            isNavigateLeftHover: showNavLeft,
            isNavigateRightHover: showNavRight
        });
    };

    shiftTabListLeft = () => {
        this.shiftTabList(DIRECTION.LEFT);
    };

    shiftTabListRight = () => {
        this.shiftTabList(DIRECTION.RIGHT);
    };

    shiftTabList = (direction) => {
        const { width, scrollWidth } = this.getElementWidths(this.tabListElem);
        const tabWidth = this.tabListElem.children[0].clientWidth;
        const scrollAmount = this.getScrollLeftAmount(this.tabListElem.scrollLeft, width, scrollWidth, tabWidth, direction);

        this.tabListElem.scrollTo({left: scrollAmount, behavior: "smooth"});
    };

    getScrollLeftAmount = (currHorizontal, viewWidth, totalWidth, stepSize, direction) => {
        if (direction === DIRECTION.LEFT) {
            const proposedPosition = currHorizontal - viewWidth;
            const targetPosition = Math.floor(proposedPosition / stepSize) * stepSize;
            return Math.max(targetPosition, 0);
        } else {
            const proposedPosition = currHorizontal + viewWidth;
            const targetPosition = Math.floor(proposedPosition / stepSize) + stepSize * stepSize;
            const maxScrollLeft = totalWidth - viewWidth;
            return Math.min(targetPosition, maxScrollLeft);
        }
    };

    getElementWidths = (tabsList) => ({
        width: tabsList.clientWidth,
        scrollWidth: tabsList.scrollWidth
    });

    getHeaderHoverClass = () => {
        let hoverClass = "";
        hoverClass += this.state.isNavigateLeftHover ? " nav-left" : "";
        hoverClass += this.state.isNavigateRightHover ? " nav-right" : "";
        return hoverClass;
    };

    render() {
        return (
            <div className="tab-wrap">
                <div className={"header-wrap" + this.getHeaderHoverClass()}
                     onMouseEnter={this.handleNavigationControls}
                     onMouseLeave={this.handleNavigationControls}>
                    <div className="navigation-controls">
                        <div onClick={this.shiftTabListLeft} className="tab-navigate navigate-left"><i className="fa fa-chevron-circle-left"/></div>
                        <div onClick={this.shiftTabListRight} className="tab-navigate navigate-right"><i className="fa fa-chevron-circle-right"/></div>
                    </div>

                    <div className="tab-container"
                         role="tablist"
                         ref={tabList => this.tabListElem = tabList}>
                        {this.state.tabs ? this.state.tabs.map((tab, idx) => {
                            return <TabHeader key={tab.id}
                                              onSelect={this.handleTabSelection}
                                              title={tab.title}
                                              tabIndex={idx === this.state.selectedTabIndex ? 0 : -1}
                                              index={idx} />
                        }) : <div className="loading-icon"><i className="fa-3x fa fa-spinner fa-pulse"/></div>}
                    </div>
                </div>
                {this.state.tabs ? <ContentPane activeTab={this.state.tabs[this.state.selectedTabIndex]}/> : null}
        </div>);
    };
}
