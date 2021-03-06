import React from 'react';
import Input from '../input';
import Modal from '../modal';

class ModalForm extends React.Component {
    /* ACCESS:
        <ModalForm
            --*mandatory--------------------------
            open= {variable to open Modal (Boolean true or false)}
            onSubmit= {parent onSubmit function (use for post or put data through Web API)}
            onClose= {parent onClose function}
            names= {["name1", "name2", ... , "nameN"]
                array of name to put on label or placeholder, and also to become
                object key for calling object value of this.state.data.
            }
            --*optional---------------------------
            title= "{Modal titel}"
            dataNow= {fill this with exist data you want to edit}
            btnL= "{Name for Modal left button (default: see ModalFrame)}"
            btnB= "{Name for Modal Right button (default: see ModalFrame)}"
            focusIf= "{Input will be focus if name in props.names = this value}"
        />
    */
    constructor(props){
        super(props)
        this.state = {
            data: {}
        }
    }

    textChange = e => {
        let tmp = this.state.data
        tmp[e.target.name] = e.target.value || null
        this.setState({
            data:tmp
        })
    }

    //! Access this method with ref in parent !
    clearInput = () => {
        let tmp = {}
        for(let name of this.props.names){
            tmp[name] = ''
        }
        this.setState({
            data: tmp
        })
    }
    
    buttonHandler = (submit) => {
        if(submit) {
            this.props.onSubmit(this.state.data)
        }else{
            this.clearInput()
            this.props.onClose()
        }
    }

    static getDerivedStateFromProps(props, state) {
        if( !props.dataNow ){
            return null
        }
        return { data : props.dataNow }
    }

    render() {
        const { title, open, names, btnL, btnR, focusIf } = this.props
        return (
            <Modal
                title={title} 
                open={open} 
                btnL={btnL}
                btnR={btnR}
                onBtnL={() => this.buttonHandler(true)} 
                onBtnR={() => this.buttonHandler(false)}
                form
            >
                {names.map( name => {
                    return (
                        <Input
                            focusEvery={open}
                            label={name}
                            key={name}
                            fluid
                            name={name}
                            value={this.state.data[name]}
                            onChange={this.textChange}
                            autoFocus={name === focusIf ? true : false}
                        />
                    )
                })}
            </Modal>
        )
    }
}

export default ModalForm