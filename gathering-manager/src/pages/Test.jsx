import logo from '../logo.svg';
import '../App.css';
import { useEffect, useState } from 'react';
import { getUsers } from '../api/data';
import Header from '../components/Header/Header';


function Test(){

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        setUsers(await getUsers());
    }    

    return (
        <>
        <Header/>
        <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
            <ul>
                <li>before</li>
                <li>{users.length}</li>
                {users.map((user) => (
                    <li>{user.username}</li>
                ))}
                <li>after</li>
            </ul>
            </header>
        </div>
        </>
    );
}

export default Test