import React, {Component} from 'react';
import './App.css';
import Button from './Button.js';
import Controls from './Controls';

const history = [];
let historyIndex = -1;
let cleared = true;
let canvasWidth = 15;
class App extends Component {
    constructor(props) {
        let canvasSize = Math.pow(canvasWidth, 2);
        super(props);
        this.state = {
            canvasSize: canvasSize,
            colorSelector: 'black',
            canvas: Array(canvasSize).fill('white'),
            tool: 'draw',
            drawBackground:'#4e6890',
            fillBackground:'',
            eyeDropperBackground: '',
            undoBackground:'#909090',
            redoBackground:'#909090'
        };
        this.handleClick = this.handleClick.bind(this);
    }
    draw(){
        this.setState(
            {tool: 'draw'}
        );
        this.setState(
            {
                eyeDropperBackground: '',
                drawBackground:'#4e6890',
                fillBackground:''
            }
        );
    }
    fill(){
        this.setState(
            {tool: 'fill'}
        );
        this.setState(
            {
                eyeDropperBackground: '',
                drawBackground:'',
                fillBackground:'#4e6890'
            }
        );
    }
    eyeDropper(){
        this.setState(
          {tool: 'eye-dropper'}
        );
        this.setState(
          {
              eyeDropperBackground: '#4e6890',
              drawBackground:'',
              fillBackground:''
          }
        );
    }
    handleClick(i) {
        let newState = this.state.canvas.slice();
        if (this.state.tool !== 'eye-dropper'){
            if (history[historyIndex + 1]) {
                history[historyIndex + 1] = this.state.canvas;
                history.length = historyIndex + 2;
            }
            else {
                history.push(this.state.canvas);
            }
            if (cleared === true) {
                cleared = false;
            }
            if (!history[historyIndex + 2]) {
                this.setState(
                  {redoBackground:'#909090'}
                );
            }
            historyIndex += 1;
        }

        this.setState(
            {undoBackground:''}
        );
        switch (this.state.tool){
            case 'draw':
                newState[i] = this.state.colorSelector;
                this.setState(
                    {canvas: newState}
                );
                break;
            case 'fill':
                let fillIndex=0;
                let colorCheck=false;
                let cellsToCheckAboveArray=[];
                let cellsToCheckBelowArray=[];
                let cellsToRunFillOnArray=[];
                const colorClicked=newState[i];
                let fillRow= (direction,startingCell)=>{
                    while(colorCheck===false){//Fills row until reaching color delimiter going right
                        newState[startingCell+fillIndex] = this.state.colorSelector;
                        if (newState[(fillIndex+startingCell)-canvasWidth]===colorClicked){//if cell directly above is same color add to array
                            const cellToCheck=(fillIndex+startingCell)-canvasWidth;
                            const lastAddedCell=cellsToCheckAboveArray[cellsToCheckAboveArray.length-1];
                            if (lastAddedCell===cellToCheck-1||lastAddedCell===cellToCheck+1){
                                cellsToCheckAboveArray.push(cellToCheck);
                            }
                            else {
                                cellsToRunFillOnArray.push(cellToCheck);
                                cellsToCheckAboveArray.push(cellToCheck);
                            }
                        }
                        if (newState[(fillIndex+startingCell)+canvasWidth]===colorClicked){
                            const cellToCheck=(fillIndex+startingCell)+canvasWidth;
                            const lastAddedCell=cellsToCheckBelowArray[cellsToCheckBelowArray.length-1];
                            if (lastAddedCell===cellToCheck-1||lastAddedCell===cellToCheck+1){
                                cellsToCheckBelowArray.push(cellToCheck);
                            }
                            else {
                                cellsToRunFillOnArray.push(cellToCheck);
                                cellsToCheckBelowArray.push(cellToCheck);
                            }
                        }
                        if (direction==='right'){
                            fillIndex++;
                        }
                        if (direction==='left'){
                            fillIndex--;
                        }

                        if (newState[startingCell+fillIndex]!==colorClicked||((startingCell+fillIndex)%canvasWidth)===0){
                            if(direction==='right'){
                                colorCheck=true;
                            }
                        }
                        if (newState[startingCell+fillIndex]!==colorClicked||((startingCell+fillIndex)%canvasWidth)===canvasWidth-1){
                            if (direction==='left'){
                                colorCheck=true;
                            }
                        }
                    }
                    colorCheck=false;
                    fillIndex=0;
                };
                if (newState[i] !== this.state.colorSelector){
                    fillRow('left',i);
                    fillRow('right',i);
                }
                cellsToRunFillOnArray=cellsToRunFillOnArray.filter(function(item, index){
                    return cellsToRunFillOnArray.indexOf(item) >= index;
                });

                while (cellsToRunFillOnArray.length>0){
                    let runningCell=cellsToRunFillOnArray.pop();
                    fillRow('left',runningCell);
                    fillRow('right',runningCell);
                }
                this.setState(
                    {canvas: newState}
                );
                break;
            case 'eye-dropper':
                this.setState(
                  {colorSelector: this.state.canvas[i]}
                );
                break;
            default:
                this.setState(
                    {tool: 'draw'}
                );
                break;
        }
    }

    colorSelect = (color)=> {
        this.setState(
            {colorSelector: color.hex}
        )
    }

    undo() {
        if (historyIndex !== -1) {
            if (history[historyIndex + 1]) {
                history[historyIndex + 1] = this.state.canvas;
            }
            else {
                history.push(this.state.canvas);
            }
            this.setState(
                {canvas: history[historyIndex]}
            );
            historyIndex -= 1;
            if (cleared === true) {
                cleared = false;
            }
            this.setState(
                {redoBackground:''}
            );
        }
        if(historyIndex===-1){
            this.setState(
                {undoBackground:'#909090'}
            );
        }
    }

    redo() {
        if (history[historyIndex + 2]) {
            historyIndex += 1;
            this.setState(
                {canvas: history[historyIndex + 1]}
            );
            this.setState(
                {undoBackground:''}
            )
        }
        if (!history[historyIndex + 2]) {
            this.setState(
                {redoBackground:'#909090'}
            );
        }
    }

    clear() {
        if (cleared === false) {
            cleared = true;
            if (history[historyIndex + 1]) {
                history[historyIndex + 1] = this.state.canvas;
                history.length = historyIndex + 2;
            }
            else {
                history.push(this.state.canvas);
            }
            if (!history[historyIndex + 2]) {
                this.setState(
                    {redoBackground:'#909090'}
                );
            }
            historyIndex += 1;
            let newState = Array(this.state.canvasSize).fill('white');
            this.setState(
                {canvas: newState}
            )
        }
    }

    fillAll() {
        if (history[historyIndex + 1]) {
            history[historyIndex + 1] = this.state.canvas;
            history.length = historyIndex + 2;
        }
        else {
            history.push(this.state.canvas);
        }
        if (!history[historyIndex + 2]) {
            this.setState(
                {redoBackground:'#909090'}
            );
        }
        historyIndex += 1;
        if (cleared === true) {
            cleared = false;
        }
        let newState = Array(this.state.canvasSize).fill(this.state.colorSelector);
        this.setState(
            {canvas: newState}
        )
    }

    renderButtons() {
        let canvas = [];
        let buttons = [];
        for (let i = 0; i < this.state.canvasSize; i++) {
            buttons.push(<Button
                className={'canvas-cell '+this.state.tool+'-tool'}
                key={i}
                onClick={() => {
                    this.handleClick(i)
                }}
                color={'white'}
                background={this.state.canvas[i]}
                width={(100 / Math.sqrt(this.state.canvasSize)) + '%'}
                height={(100 / Math.sqrt(this.state.canvasSize)) + '%'}
                text={this.state.canvas[i]}
            />)
        }
        canvas.push(buttons);
        return canvas;
    }

    render() {
        return (
            <div className="App">
                <div className="canvas">
                    <h2 style={{width: "100%", textAlign: "center", color: "white"}}>SIMPLE ART</h2>
                    {this.renderButtons()}
                    <Controls
                        background={this.state.colorSelector}
                        onClick={() => {
                            this.colorSelect()
                        }}
                        color={this.state.colorSelector}
                        onChangeComplete={this.colorSelect}
                        colorPickerDisplay='none'
                        onUndo={() => {
                            this.undo()
                        }}
                        onRedo={() => {
                            this.redo()
                        }}
                        onClear={() => {
                            this.clear()
                        }}
                        onFillAll={() => {
                            this.fillAll()
                        }}
                        onDraw={() => {
                            this.draw()
                        }}
                        drawBackground={this.state.drawBackground}
                        fillBackground={this.state.fillBackground}
                        eyeDropperBackground={this.state.eyeDropperBackground}
                        undoBackground={this.state.undoBackground}
                        redoBackground={this.state.redoBackground}
                        onFill={() => {
                            this.fill()
                        }}
                        onEyeDropper={() => {
                            this.eyeDropper()
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default App;
