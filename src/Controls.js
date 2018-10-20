import React, { Component } from 'react';

class Controls extends Component {
    render() {
        return (
            <div className={'color-selector-container'}>
                <h2 style={{textAlign:'center',color:'white'}}>Color Selector:</h2>
                <button className={'color-selector'}
                        onClick={this.props.onClick}
                        style={{
                            background: this.props.background,
                            color: this.props.color
                        }}>
                </button>
                <div className={'undo-redo-container'}>
                    <button className={'undo'}
                            onClick={this.props.onUndo}
                            style={{
                                color: 'white'
                            }}>
                        UNDO
                    </button>
                    <button className={'red-button'}
                            onClick={this.props.onClear}
                            style={{
                                color: 'white'
                            }}>
                        CLEAR ALL
                    </button>
                    <button className={'red-button'}
                            onClick={this.props.onFill}
                            style={{
                                color: 'white'
                            }}>
                        FILL ALL
                    </button>
                    <button className={'redo'}
                            onClick={this.props.onRedo}
                            style={{
                                color: 'white'
                            }}>
                        REDO
                    </button>
                </div>
            </div>
        );
    }
}

export default Controls;