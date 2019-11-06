import React from 'react';
import PropTypes from 'prop-types';
import 'typeface-merriweather';

import './tab-header.css';

export const TabHeader = (props) => {
    const getHeaderClass = () => {
        let headerClass = "tab-header-container";
        if (props.tabIndex === 0) {
            headerClass += " active-tab";
        }
        return headerClass;
    };

    return (
        <button className={getHeaderClass()}
                role="tab"
                aria-selected={props.tabIndex === 0}
                tabIndex={props.tabIndex}
                onClick={props.onSelect.bind(this, props.index)}>
            <span className="tab-header">
                {props.title}
            </span>
        </button>
    )
};

TabHeader.propTypes = {
    tabIndex: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
    title: PropTypes.string
};