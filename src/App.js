import './App.css';
import React from 'react';
import AppRouter from './config/router'
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component{
    render(){
        return(
            <div>
<AppRouter/>
            </div>
        )
    }
}

export default App;