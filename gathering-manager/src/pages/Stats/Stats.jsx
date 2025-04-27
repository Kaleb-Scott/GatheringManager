import supabase from "../../api/supabase-client";
import Header from "../../components/Header/Header";
import styles from "./Stats.module.css";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie
} from "recharts";
import { useEffect, useState } from "react";




function Stats() {
    const [tagData, setTagData] = useState([]);
    const [gatheringsPerMonthData, setGatheringsPerMonthData] = useState([]);

    async function getData() {
        const {data: tagResponse, error: tagError} = await supabase.rpc('get_Number_Of_Gatherings_Per_Tag', {input: 0});
        if(tagError) {console.log(tagError.message)}
        console.log(tagResponse);
        console.log(tagResponse.value)
        setTagData(tagResponse.value);

        const {data: gpmData, error: gpmError} = await supabase.rpc('get_Gatherings_Per_Month', {input: 0});

        if(gpmError) {console.log(gpmError.message)}

        setGatheringsPerMonthData(gpmData.value);
    }
    
    useEffect(() => {getData();}, []);

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
            <BarChart data={gatheringsPerMonthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                    data={tagData}
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