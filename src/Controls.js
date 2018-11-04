import React, { Component } from 'react';
let pencilIconName= require('./draw-icon.png');
let bucketIconName= require('./paint-bucket-mouse-icon.png');
class Controls extends Component {
    render() {
        return (
            <div className={'color-selector-container'}>
                <div className={'upper-control-container'}>
                    <button className={'blue-button draw'}
                            id={'draw'}
                            onClick={this.props.onDraw}
                            style={{
                                color: 'white',
                                backgroundColor:this.props.drawBackground
                            }}>
                        <img alt={""} src={pencilIconName}/>
                        DRAW
                    </button>
                    <div>
                        <h2 style={{textAlign:'center',color:'white'}}>Color Selector:</h2>
                        <button className={'color-selector'}
                                id={'colorSelector'}
                                onClick={this.props.onClick}
                                style={{
                                    background: this.props.background,
                                    color: this.props.color
                                }}>
                        </button>
                    </div>
                    <button className={'blue-button draw'}
                            id={'fill'}
                            onClick={this.props.onFill}
                            style={{
                                color: 'white',
                                backgroundColor:this.props.fillBackground
                            }}>
                        <img alt={""} src={bucketIconName}/>
                        FILL
                    </button>
                </div>
                <div className={'undo-redo-container'}>
                    <button
                            id={'undo'}
                            className={'blue-button undo'}
                            onClick={this.props.onUndo}
                            style={{
                                color: 'white',
                                backgroundColor:this.props.undoBackground
                            }}>
                        UNDO
                    </button>
                    <button className={'red-button'}
                            id={'clear'}
                            onClick={this.props.onClear}
                            style={{
                                color: 'white'
                            }}>
                        CLEAR ALL
                    </button>
                    <button className={'red-button'}
                            id={'fillAll'}
                            onClick={this.props.onFillAll}
                            style={{
                                color: 'white'
                            }}>
                        FILL ALL
                    </button>
                    <button className={'blue-button redo'}
                            id={'redo'}
                            onClick={this.props.onRedo}
                            style={{
                                color: 'white',
                                backgroundColor:this.props.redoBackground
                            }}>
                        REDO
                    </button>
                </div>
            </div>
        );
    }
}

export default Controls;