import Header from "../../components/Header/Header";
import styles from "./Stats.module.css";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const data = [
    {name: 'Jan', value: 500},
    {name: 'Feb', value: 33},
    {name: 'Mar', value: 259},
    {name: 'Apr', value: 703},
    {name: 'May', value: 586},
    {name: 'Jun', value: 317},
    {name: 'Jul', value: 905},
    {name: 'Aug', value: 257},
    {name: 'Sep', value: 600},
    {name: 'Oct', value: 954},
    {name: 'Nov', value: 190},
    {name: 'Dec', value: 42},
]

function Stats() {

    if(localStorage.getItem("isLoggedIn") !== "true") {
        return (
            <>
                <Header/>
                <main>
                    <p>Please login to access the contents of this page.</p>
                </main>
            </>
        )
    }

    return (
        <>
            <Header/>
            <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
        </>
    );
}

export default Stats;