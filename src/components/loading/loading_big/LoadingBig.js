import React from 'react'
import './LoadingBig.scss'

class LoadingBig extends React.Component {
/* ACCESS:
        { this.state.youerState && <Loading />} <= this is common syntax
        yourState (you can change the name) will provide boolean value.
        Change the state for on/off the loading screen.
        ref: https://loading.io/css/
    */
    render() {
        return (
            <div className="Loading-mask">
                <div className="Loading-wrapper">
                    <div className="Loading" >
                        {/* this is he spinner */}
                        {/* <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div> */}
                        {<div className="box">
                            <div className="plane"></div>
                        </div>}
                        {/* <div className="circle-loading" /> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default LoadingBig