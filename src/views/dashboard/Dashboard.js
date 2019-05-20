import React from 'react'
import './Dashboard.scss'
import HelperCookie from '../../helper/HelperCookie'
import ConfigLocal from '../../config/ConfigLocal'
import Header from './header';
import Navbar from './navbar';
import ContentSlider from '../contents';
import { ProviderScope } from '../../global';
import NotifBar from '../../components/notification_bar';

class Dashboard extends React.Component {
    state = {
        drawer : true
    }

    signOut = () => {
        HelperCookie.delete(ConfigLocal.TOKEN)
        this.props.history.push('/')
    }

    drawerHandler = () => {
        this.setState({
            drawer : !this.state.drawer
        })
    }

    checkDimention = () => {
        if (window.innerWidth <= 485) {
            this.setState({drawer:false})
        }
    }

    componentDidMount() {
        this.checkDimention()
    }

    render() {
        return (
            <React.Fragment>
                <ProviderScope>
                    <div>

                        {/* NAVBAR */}
                        <Navbar
                            open= {this.state.drawer}
                            history = {this.props.history}
                            match= {this.props.match}
                            />

                        <NotifBar/>

                        {/* HEADER */}
                        <Header 
                            open= {this.state.drawer}
                            onClick= {this.drawerHandler}   
                            />
                            
                        {/* CONTENT */}
                        <ContentSlider 
                            open= {this.state.drawer}
                            />     
                    
                    </div>
                    
            
                </ProviderScope>
            </React.Fragment>
        )
    }
}

export default Dashboard