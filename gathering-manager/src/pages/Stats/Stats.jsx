import supabase from "../../api/supabase-client";
import Header from "../../components/Header/Header";
import styles from "./Stats.module.css";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie
} from "recharts";
import { useEffect, useState } from "react";




function Stats() {
    const [data, setData] = useState(null);

    async function test() {
        const {data: statData, error: statError} = await supabase.rpc('testing', {input: 0});
        if(statError) {console.log(statError)}
        console.log(statData);
        console.log(statData.value)
        setData(statData.value);
    }
    
    useEffect(() => {test();}, []);

    if (localStorage.getItem("isLoggedIn") !== "true") {
        return (
            <>
                <Header />
                <main>
                    <p>Please login to access the contents of this page.</p>
                </main>
            </>
        )
    }

    return (
        <>
            <Header />
<div className={styles.statsPage}>
    <h1 className={styles.title}>Statistics Dashboard</h1>
    <p className={styles.description}>Visual overview of your gatherings and activities</p>

    <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#4B9CD3" />
            </BarChart>
        </ResponsiveContainer>
    </div>

    <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={300}>
            <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={-180}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#4B9CD3"
                    label={({ name, value }) => `${name}: ${value}`}
                />
            </PieChart>
        </ResponsiveContainer>
    </div>
</div>

        </>
    );
}

export default Stats;