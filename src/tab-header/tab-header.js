import React from 'react';
import PropTypes from 'prop-types';
import 'typeface-merriweather';

import './tab-header.css';

export const TabHeader = ({tabIndex, onSelect, index, title, classList=[], refCallback}) => {
    const getHeaderClass = () => {
        const baseClass = ["tab-header-container"];
        const activeClass = getActiveStatus();
        return baseClass.concat(activeClass).concat(classList).join(' ');
    };

    const getActiveStatus = () => {
        if (tabIndex === 0) {
            return ["active-tab"];
        }
    };

    return (
        <button ref={refCallback}
                className={getHeaderClass()}
                role="tab"
                aria-selected={tabIndex === 0}
                tabIndex={tabIndex}
                onClick={onSelect.bind(this, index)}>
            <span className="tab-header">
                {title}
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