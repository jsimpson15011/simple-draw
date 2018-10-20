import React, { Component } from 'react';

class Button extends Component {
    render() {
        return (
            <button className={this.props.className}
                    onClick={this.props.onClick}
                    style={{background: this.props.background,
                        color: this.props.color,
                        width: this.props.width,
                        paddingTop: this.props.height,
                        height:'0'
                    }}>
            </button>
        );
    }
}

export default Button;