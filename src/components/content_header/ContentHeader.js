import React from 'react'
import Button from '../button';
import ConfigLocal from '../../config/ConfigLocal';
import './ContentHeader.scss'
import Pagination from '../pagination/Pagination';
import SearchBar from '../search_bar/SearchBar';

class ContentHeader extends React.Component {

    render(){
        const icon1 = ConfigLocal.MISC.MaterialIcon + ' title-icon'
        const icon3 = ConfigLocal.MISC.MaterialIcon + ' add-button-icon'
        return (
            <div className={this.props.showLine? "header-sticky header-line": "header-sticky"}>
                <div className="content-header">
                    <div className="content-info">
                        <div className="content-icon-base">
                            <span className={icon1} aria-hidden="true">
                                {this.props.icon || 'face'}
                            </span>
                        </div>
                        <div className="content-title">
                            {this.props.title}
                        </div>
                    </div>

                    <div className="util-wrapper" >

                        {/* PAGINATION */}
                        <Pagination pagination={this.props.pagination} fetchPage={this.props.fetchPage} />

                        {/* SEARCHING */}
                        <SearchBar pagination={this.props.pagination} title={this.props.title} fetchInit={this.props.fetchInit} fetchSearch={this.props.fetchSearch} url={this.props.url}/>
                        
                    </div>

                    {/* ADD BUTTON */}
                    { this.props.rowsCount > 0 ? 
                        <div className="content-add-button">
                            <Button onClick={this.props.addFunction} label={
                                <React.Fragment>
                                    <span className={icon3} aria-hidden="true">
                                        add
                                    </span>
                                    <span className="add-button-text">
                                        Add
                                    </span>
                                </React.Fragment>
                            } blue depressed /> 
                        </div>:
                        <div className="content-add-skeleton"></div>
                    }
                </div>

                {/* TABLE HEADER SHOW */}
                <div className="table-header-base">
                    <div className={this.props.showLine?"table-header-mask": "table-header-mask-off"}>
                        <div className={this.props.showLine?"table-header-show": "table-header-hide"}>
                            <table className="table-content table-header">
                                <thead>
                                    <tr>
                                        <th id="Name">Name</th><th id="Address">Address</th><th id="Telephone">Telephone</th><th>Email</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContentHeader