import React from 'react';
import { RichContent } from "../rich-content/rich-content";
import PropTypes from 'prop-types';

import './content-pane.css';

export const ContentPane = (props) => {
    return (
        <div className="content-border-wrap">
            <div className="content-wrap">
                <div className="content-pane">
                    <div className="tab-description-container" role="article">
                        <div className="tab-description">
                            {props.activeTab.description}
                        </div>
                    </div>
                    {props.activeTab.extended ? props.activeTab.extended.map((richContent, idx) => {
                        return <RichContent key={idx} content={richContent}/>
                    }) : null }
                </div>
            </div>
        </div>
    )
};

ContentPane.propTypes = {
    activeTab: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        extended: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string,
            src: PropTypes.string
        }))}).isRequired
};