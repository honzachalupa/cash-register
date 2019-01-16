import React from 'react';
import Tilt from 'react-vanilla-tilt';
import classNames from 'classnames';
import './style';

export default props => {
    const { onClick, isScaleable, isDoubleWidth } = props;
    const propsCopy = { ...props };

    delete propsCopy.isScaleable;
    delete propsCopy.isDoubleWidth;

    return (
        <div className={classNames({ scaleable: isScaleable, 'double-width': isDoubleWidth })}>
            <Tilt data-component="Tilt">
                {onClick ? (
                    <button type="button" {...propsCopy} />
                ) : (
                    <div {...propsCopy} />
                )}
            </Tilt>
        </div>
    );
};
