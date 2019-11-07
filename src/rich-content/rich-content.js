import React from 'react';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';

import './rich-content.css'

export const RichContent = (props) => {
    if (props.content.type === 'img') {
        return <img className="rich-content" src={props.content.src} alt="Additional Content" />
    } else if (props.content.type === 'youtube') {
        return ( <YouTube className="rich-content" videoId={props.content.src} /> );
    } else if (props.content.src) {
        return <div className="rich-content">{props.content.src}</div>
    }
};

RichContent.propTypes = {
    content: PropTypes.shape({
        type: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired
    })
};