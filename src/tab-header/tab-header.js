import React from 'react';
import 'typeface-merriweather';

export const TabHeader = (props) => {
    const getHeaderClass = () => {
        let headerClass = "tab-header-container";
        if (props.active) {
            headerClass += " active-tab";
        }
        return headerClass;
    };

    return (
        <button className={getHeaderClass()} onClick={props.onSelect.bind(this, props.index)}>
            <span className="tab-header">
                {props.title}
            </span>
        </button>
    )
};
