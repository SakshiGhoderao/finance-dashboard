import Card from "../components/Card";
import {useAuth} from "../context/AuthContext";

import{
    LineChart, Line, XAxis, YAxis, 
    Tooltip, CartesianGrid, PieChart,Pie, Cell, ResponsiveContainer
} from "recharts";
import "../App.css";

export default function Dashboard() {
    const { role, currentUser ,transactions } = useAuth();

    //role based data
    const filteredTransactions = 
        role === "admin"
        ? transactions
        : transactions.filter((t) => t.userId === currentUser?.id);

        //summary calculations
        const totalIncome = filteredTransactions
        .filter((t) => t.type === "income")
        .reduce((a, b) => a + Number(b.amount || 0),0);

        const totlalExpense = filteredTransactions
        .filter((t) => t.type === "expense")
        .reduce((a, b) => a + Number(b.amount || 0), 0);

        const balance = totalIncome - totlalExpense;

        //time based data line chart
        const trendData = transactions.map((t) => ({
            date: t.date,
            amount: t.type === "income" ? t.amount : -t.amount,
        }));

        //category data pie chart 
        const categoryMap = {};
        transactions.filter(t => t.type === "expense") .forEach((t) => {
            const amt = Number(t.amount || 0);
            categoryMap[t.category] = (categoryMap[t.category] || 0) + amt;
        })

        const pieData = Object.keys(categoryMap).map((key) => ({
            name: key,
            value: categoryMap[key],
        }));

        const COLORS = ["#3b82f6" , "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];


    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1 style={{fontSize:"2rem", fontWeight:"800"}}>Overview</h1>
                <p style={{color:"#64748b"}}>Welcome back, {role === "admin" ? "Admin" :(currentUser?.name || "User")}</p>
            </header>
            

            <div style={{display:"flex", gap:"20px", marginBottom:"30px"}}>
                <div style={cardStyle} className="card">
                    <p>Total Balance</p>
                    <h2 style={{color:"#0f172a"}}>Rs.{(balance || 0).toLocaleString()}</h2>
                </div>

                <div style={cardStyle} className="card">
                    <p>Income</p>
                    <h2 style={{color:"#10b981"}}>Rs.{totalIncome.toLocaleString()}</h2>
                </div>

                <div style={cardStyle} className="card">
                    <p>Expense</p>
                    <h2 style={{color:"#ef4444"}}>Rs.{totlalExpense.toLocaleString()}</h2>
                </div>
            </div>

            <div style={{display:"flex", gap:"40px", flexWrap:"wrap"}}>
                
                <div>
                    <h3>Balance Trend</h3>
                    
                        <LineChart width={500} height={300} data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="amount" stroke="#2563eb" />
                        </LineChart>
                    
                </div>

                <div>
                    <h3>Spending Breakdown</h3>
                    
                        <PieChart width={400} height={300}>
                            <Pie 
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                            >
                                {pieData.map((entry, index) =>(
                                    <Cell 
                                        key={index}
                                        fill={index % 2 === 0 ? "#16A34A" : "#Dc2626"}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    
                </div>
            </div>

        </div>
    );
}

const cardStyle = {
    background:"#fff",
    padding:"20px",
    borderRadius:"10px",
    boxShadow:"0 2px 10px rgba(0,0,0,0.1)",
    width:"200px",
};