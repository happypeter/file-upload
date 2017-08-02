import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {

  state = {
    imgUrl: ''
  }

  handleChange = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      console.log(event.target.result)
      let data = {
        file: event.target.result
      }

      //  数据挂到 form 上才能发送
      let formData = new FormData()
      formData.append('avatar', file)
      // 这样，可以保证 multipart/form-data


      axios.post(`http://192.168.0.119:3008/touxiang`, formData).then(
        res=> {
          console.log('ppp...', res.data)
          let fullImgUrl = `http://192.168.0.119:3008/uploads/avatars/${res.data.filename}`
          console.log('文件路径：', fullImgUrl)
          this.setState({
            imgUrl: fullImgUrl
          })
        }
      )
      // 只有在这里，执行 file 相关操作，那么 file 里面才是有真正数据的
    }
    reader.readAsDataURL(file)
    console.log('hello...', file)
  }
  render() {
    return (
      <div className="App">
        <img src={this.state.imgUrl} alt="头像" />
        <input type="file" onChange={this.handleChange}
          className="file-upload-input" />
      </div>
    );
  }
}

export default App;
