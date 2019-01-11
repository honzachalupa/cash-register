import React, { Component } from 'react';
import Tilt from 'react-vanilla-tilt';
import classNames from 'classnames';
import './style';

export default class Tile extends Component {
    render() {
        const { onClick, isScaleable, isDoubleWidth } = this.props;

        return (
            <div className={classNames({ scaleable: isScaleable, 'double-width': isDoubleWidth })}>
                <Tilt data-component="Tilt">
                    {
                        onClick ? (
                            <button type="button" {...this.props} />
                        ) : (
                            <div {...this.props} />
                        )
                    }
                </Tilt>
            </div>
        );
    }
}
