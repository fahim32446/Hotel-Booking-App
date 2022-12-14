import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './Home.scss'
import Widget from '../../components/widget/Widget'
import Chart from '../../components/chart/Chart'
import Featured from '../../components/featured/Featured'
import Table from '../../components/table/Table'

const Home = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="widgets">
                    <Widget type="hotel" />
                    <Widget type="room" />
                    <Widget type="users" />
                    {/* <Widget type="balance" /> */}
                </div>
                <div className="charts">
                    <Featured />
                    <Chart title="Last 6 Month Hotel Registration" aspect={2 / 1} />
                </div>

                <div className="listContainer">
                    <div className="listTitle">Latest Transactions</div>
                    <Table/>
                </div>
            </div>
        </div>
    )
}

export default Home;