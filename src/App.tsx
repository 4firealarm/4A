import React, { Component } from 'react';
import { Button } from 'antd'
import './App.less';

class App extends Component {
  constructor(props: any){
    super(props)
    this.state = {
      user:null
    }
  }
  componentDidMount(){
    fetch('api/item').then((result) => {
      console.log(result)
    }).catch((err) => {
      
    });
  }
  render() {
    return (
      <div className="App">
        <div className="tit">Hello World</div>
        {/* <Button type="primary">Button</Button> */}
      </div>
    );
  }
}

export default App;
