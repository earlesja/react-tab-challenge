import React from 'react';
import {RichContent} from "../rich-content/rich-content";

export const ContentPane = (props) => {
    return (
        <div className="content-pane">
            <div className="tab-description-container">
                <div className="tab-description">
                    {props.activeTab.description}
                </div>
            </div>
            {props.activeTab.extended ? props.activeTab.extended.map((richContent, idx) => {
                return <RichContent key={idx} content={richContent}/>
            }) : null }
        </div>
    )
};
