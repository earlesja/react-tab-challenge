import React from 'react';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';

import './rich-content.css'

export const RichContent = (props) => {
    if (props.content.type === 'img') {
        return <img className="content-image" src={props.content.src} alt="Additional Content" />
    } else if (props.content.type === 'youtube') {
        return ( <YouTube className="content-image" videoId={props.content.src} /> );
    }
    return null;
};

RichContent.propTypes = {
    content: PropTypes.shape({
        type: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired
    })
};