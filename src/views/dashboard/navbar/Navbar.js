import React from 'react'
import './Navbar.scss'
import HelperHttp from '../../../helper/HelperHttp'
import ConfigApi from '../../../config/ConfigApi';
import Loading from '../../../components/loading';
import ButtonStatus from '../../../components/button_status';
import NavbarEditAuth from './NavbarEditAuth';
import NavbarEdit from './NavbarEdit';
import NavbarTiles from './NavbarTiles';
import { AppContext } from '../../../context_provider';
import Button from '../../../components/button';
import ConfigLocal from '../../../config/ConfigLocal';

class Navbar extends React.Component {
    static contextType = AppContext

    constructor(props) {
        super(props)
        this.state = {
            navList : [],
            navObj  : {},
            editSession : false,
            loading : false,
            openAuthModal: false,
            openEditModal: false,
            icon: 'material-icons MuiIcon-root-1 MuiIcon-colorAction-4 navbar-add-button',
            title: 'Setting Mode'
        }
    } 

    editSessionSwitch = () => {
        this.setState({
            editSession: !this.state.editSession,
        })
        if(this.state.title === "Setting Mode") {
            setTimeout(() => {
                this.setState({
                    title: "Setti..."
                })
            }, 100);
        }else{
            setTimeout(() => {
                this.setState({
                    title: "Setting Mode"
                })
            }, 400);
        }
    }

    loadingSwitch = () => {
        this.setState({loading : !this.state.loading})
    }

    editSessionHendler = () => {
        if(this.state.editSession === false){
            this.setState({openAuthModal:true})
        }else{
            this.editSessionSwitch()
        }
    }

    buttonHendler = (id) => {
        if(this.state.editSession){
            //edit menu show modal
            this.getNavbarById(id)
        }else{
            //run menu
        }
    }

    getNavigationList = () => {
        this.loadingSwitch()
        HelperHttp.request(ConfigApi.ROUTE.GET_MENU, ConfigApi.METHODS.GET, {},
            (success, response) => {
                this.loadingSwitch()
                if(success){
                    let list = response.Result
                    this.setState({
                        navList : list
                    })
                    localStorage.setItem(ConfigLocal.LOCSTORE.Navbar,JSON.stringify(list))
                    debugger
                }
            }
        )
    }

    getNavbarById = (id) => {
        this.loadingSwitch()
        let route = ConfigApi.ROUTE.MENU + '/' +id
        HelperHttp.request(route, ConfigApi.METHODS.GET, {}, 
            (success, response) => {
                this.loadingSwitch()
                if(success) {
                    this.setState({
                        navObj: response.Result,
                        openEditModal: true
                    })
                }
            }
        )
    }

    onClose = () => {
        this.setState({
            openAuthModal: false,
            openEditModal: false,
        })
    }

    componentDidMount() {
        let list = JSON.parse(localStorage.getItem(ConfigLocal.LOCSTORE.Navbar))
        if(list != null){
            this.setState({
                navList : list
            })
        }else{
            this.getNavigationList()
        }
    }

    render() {
        const { navList, openAuthModal, openEditModal, loading, icon } = this.state

        return (
            <React.Fragment>

                <NavbarEditAuth
                    open={openAuthModal}    editSession={this.editSessionSwitch}
                    onClose={this.onClose}  loading={this.loadingSwitch}
                />
                <NavbarEdit 
                    open={openEditModal}
                    dataNow={this.state.navObj}
                    onClose={this.onClose}
                    loading={this.loadingSwitch}
                    hotReload={this.getNavigationList}
                />

                {loading && <Loading />}

                <div className={this.props.open ? "open-navbar": "close-navbar"}> 
                        <div className="navbar-base">
                            <div className= "navbar-overflow-superadmin">
                                <NavbarTiles navList={navList} onClick={this.buttonHendler} />
                            </div>
                            <div className= "edit-tile">
                            <div className={this.state.editSession? "navbar-add-on": "navbar-add-off"}>
                                <Button
                                    blue
                                    flat
                                    circle
                                    title="Add new navigation menu"
                                    label={
                                        <span className={icon} aria-hidden="true">
                                        add
                                    </span>
                                }/>
                            </div>
                                <ButtonStatus
                                    title={this.state.title}
                                    onClick={this.editSessionHendler}
                                    active={this.state.editSession}
                                />
                            </div>
                            
                        </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Navbar