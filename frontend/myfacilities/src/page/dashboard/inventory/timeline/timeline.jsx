import React from 'react';
import { connect } from 'react-redux';
import Navigation from '../../../../component/navigation/navigation_bar';
import { GoToLogin } from '../../../../component/redirect';
import { Add_task } from '../../../../component/adding';
import Graph_Timeline_Apex from './graph_timeline_apex';
import List_timeline from './list_timeline';
import { fetchTasks } from '../../../../action';
import { tasks_api } from '../../../../api/link';

function mapStateToProps(state) {
    return {
        auth: state.auth,
        id_org: state.id_org,
        id_inv: state.id_inv,
        username: state.name,
    }
}

class Timeline extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: this.props.auth,
            data: [],
        }
        this.id_org = this.props.id_org;
        this.id_inv = this.props.id_inv;
        this.url = tasks_api();
    }
    componentDidMount() {
        this.props.dispatch(fetchTasks(this));
    }
    checkAuth() {
        if (this.state.auth === false) return <GoToLogin />
    }
    render() {
        return (
            <div>
                {this.checkAuth()}
                <Navigation />
                <div className="container-sm pt-3 mt-3 border col-sm-10">
                {(this.state.data.length === 0) ?
                    <h5>The timeline is not displayed because the data is empty.</h5> : 
                    <Graph_Timeline_Apex data={this.state.data} />
                }
                </div>
                <div className="container-sm pt-3 mt-3 border col-sm-10">
                    <h3>Tasks</h3>
                    <Add_task />
                    {(this.state.data.length === 0) ?
                    <h5>Task is empty.</h5> : 
                    <List_timeline data={this.state.data} />
                    }
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Timeline);