import React, { Component } from 'react';
import './App.css';
import Button from './Button.js';
import Controls from './Controls';

const history=[];
let colorIndex=0;
let historyIndex=-1;
let cleared=true;
class App extends Component {
  constructor(props){
    let canvasWidth=15;
    let canvasSize=Math.pow(canvasWidth,2);
    super(props);
    this.state={
      canvasSize: canvasSize,
        colorSelector:'black',
        canvas: Array(canvasSize*canvasSize).fill('white')
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i){
      if (history[historyIndex+1]){
          history[historyIndex+1]=this.state.canvas;
          history.length=historyIndex+2;
      }
      else {
          history.push(this.state.canvas);
      }
      if(cleared===true){
        cleared=false;
      }
    historyIndex+=1;
    let newState=this.state.canvas.slice();
        newState[i]=this.state.colorSelector;
/*        newState[i+1]=this.state.colorSelector;
      newState[i+15]=this.state.colorSelector;
      newState[i+16]=this.state.colorSelector;*/
    this.setState(
        {canvas: newState}
    );
  }

  colorSelect(){
    let newColor='';
    switch (colorIndex){
        case 0:
          newColor='red';
          break;
        case 1:
          newColor='orange';
            break;
        case 2:
            newColor='yellow';
            break;
        case 3:
            newColor='green';
            break;
        case 4:
            newColor='blue';
            break;
        case 5:
            newColor='purple';
            break;
        case 6:
            newColor='white';
            break;
        case 7:
            newColor='black';
            break;
        default:
          newColor='black';
          colorIndex=0;
          break;
    }
    if (colorIndex<7){
      ++colorIndex;
    }
    else {
      colorIndex=0;
    }
      this.setState(
          {colorSelector: newColor}
      )
  }
  undo(){
    if (historyIndex!==-1){
        if (history[historyIndex+1]){
            history[historyIndex+1]=this.state.canvas;
        }
        else {
            history.push(this.state.canvas);
        }
        this.setState(
            {canvas:history[historyIndex]}
        )
        historyIndex-=1
        if (cleared===true){
          cleared=false;
        }
    }
  }
  redo(){
    if (history[historyIndex+2]){
        historyIndex+=1
      this.setState(
          {canvas:history[historyIndex+1]}
      )
    }
  }
  clear(){
    if (cleared===false){
      cleared=true;
        if (history[historyIndex+1]){
            history[historyIndex+1]=this.state.canvas;
            history.length=historyIndex+2;
        }
        else {
            history.push(this.state.canvas);
        }
        historyIndex+=1;
        let newState=Array(this.state.canvasSize*this.state.canvasSize).fill('white');
        this.setState(
            {canvas:newState}
        )
    }
  }
  fill(){
      if (history[historyIndex+1]){
          history[historyIndex+1]=this.state.canvas;
          history.length=historyIndex+2;
      }
      else {
          history.push(this.state.canvas);
      }
      historyIndex+=1;
      if (cleared===true){
        cleared=false;
      }
      let newState=Array(this.state.canvasSize*this.state.canvasSize).fill(this.state.colorSelector);
      this.setState(
          {canvas:newState}
      )
  }
  renderButtons(i){
    let canvas=[]
      let buttons=[]
      for (let i = 0; i < this.state.canvasSize; i++){
          buttons.push(<Button
              className={'canvas-cell'}
              key={i}
              onClick={() => {this.handleClick(i)}}
              color={'white'}
              background={this.state.canvas[i]}
              width={(100/Math.sqrt(this.state.canvasSize))+'%'}
              height={(100/Math.sqrt(this.state.canvasSize))+'%'}
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
            <h2 style={{width:"100%",textAlign:"center",color:"white"}}>SIMPLE ART</h2>
            {this.renderButtons()}
            <Controls
                background={this.state.colorSelector}
                onClick={() => {this.colorSelect()}}
                onUndo={() => {this.undo()}}
                onRedo={() => {this.redo()}}
                onClear={() => {this.clear()}}
                onFill={() => {this.fill()}}
            />
        </div>
      </div>
    );
  }
}

export default App;
