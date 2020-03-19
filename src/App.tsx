import React, { Component } from 'react';
import { Button } from 'antd'
import './App.less';

interface Props {}
class App extends Component<Props,{}> {
  constructor(props:Props){
    super(props)
    this.state = {}
  }
  async componentDidMount(){
    try {
      let data = await global.$api.Account.getCurrentUser()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  public render() {
    return (
      <div className="App">
        <div className="tit">Hello World</div>
        <Button type="primary">Button</Button>
      </div>
    );
  }
}

export default App;
