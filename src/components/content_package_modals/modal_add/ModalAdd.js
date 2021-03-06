import React from 'react'
import { AppContext } from '../../../global';
import HelperHttp from '../../../helper/HelperHttp';
import ConfigLocal from '../../../config/ConfigLocal';
import ModalForm from '../../modal_form';

class ModalAdd extends React.Component {
    static contextType = AppContext
    state = {
        child : React.createRef()
    }

    onSubmit = async (data) => {
        window.event.preventDefault()
        this.context.loadingSwitch()
        let res = await HelperHttp.post(this.props.url, data )
        this.context.loadingSwitch()
        if(res.status === 200 && res.success) {
            this.context.setNotif( `New ${this.props.tableName} data added.`, ConfigLocal.NOTIF.Success )
            this.props.reload(this.props.currentPage)
        }else{
            this.context.setNotif( res.message, ConfigLocal.NOTIF.Error )
        }
        this.state.child.current.clearInput()
        this.props.close()
    }

    render() {
        return (
            <ModalForm
                ref={this.state.child}
                title={this.props.tableName? 'Create New ' + this.props.tableName : 'Create New Something'}
                open={this.props.open}
                onSubmit={this.onSubmit}
                onClose={this.props.close}
                focusIf={this.props.names[0]}
                names={this.props.names}
            />
        )
    }
}

export default ModalAdd