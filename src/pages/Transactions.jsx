import { useState } from "react";
import{useAuth} from "../context/AuthContext";
import "../App.css";


export default function Transactions(){
    const {role, currentUser, transactions, setTransactions} = useAuth();

    //store transactions in state
    
    //form inputs
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("expense");
    const [editId, setEditId] = useState(null);

    const isAdmin = role === "admin";

    //add transactions
    const addTransaction = () => {
        if(!category || !amount) return;
        const numericAmount = Number(amount);

        if(editId){
            //update 
            setTransactions(transactions.map((t) =>
                t.id === editId
                ? {...t. category, amount: numericAmount, type}
                : t
            ));
            setEditId(null);
        } else{
            const newTransaction = {
            id: Date.now(), 
            userId:currentUser?.id || 1,
            category,
            amount:numericAmount,
            type,
            date: new Date().toISOString().split("T")[0]
        };
        setTransactions([...transactions,newTransaction]);

    }
        //clear inputs
        setCategory("");
        setAmount("");
    }

     //delete transactions admin-only
        const deleteTransaction = (id) => {
            const updated = transactions.filter((t) => t.id !== id);
            setTransactions(updated);
        };
        
        //edit button click
        const handleEdit = (transaction) => {
        setEditId(transaction.id);
        setCategory(transaction.category);
        setAmount(transaction.amount);
        setType(transaction.type);
    };

    //filter based on role
    const filtered = isAdmin
        ? transactions
        : transactions.filter((t) => t.userId === currentUser?.id);

        return(
            <div className="transactions-container">
                <header className="dashboard-header">
                    <h1 style={{fontSize: "2rem", fontWeight:"800"}}>Transactions</h1>
                    <p style={{color:"#6478b"}}>View and Manage Financial records</p>
                </header>

                {/*add form*/}
                {isAdmin && (
                    <div className="transaction-form">
                        <input
                            placeholder="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />

                        <input
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />

                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>

                        <button className="btn-add" onClick={addTransaction}>
                            {editId ? "Update" : "Add "}
                        </button>
                    </div>
                )}

               <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>CATEGORY</th>
                            <th>TYPE</th>
                            <th>AMOUNT</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {filtered.map((t) => (
                            <tr key={t.id}>
                                <td style={{fontWeight:"600"}}>{t.category}</td>

                                <td>
                                    <span className="type-tag" style={{
                                        backgroundColor: t.type === 'income' ? '#dcfce7' : '#fee2e2',
                                        color: t.type === 'income' ? '#166534' : '#991b1b'
                                    }}>{t.type}</span>
                                </td>

                                <td style={{fontWeight: '700', color: t.type === 'income' ? '#10b981' : '#0f172a'}}>
                                    {t.type === "income" ? '+' : '-'} Rs.{Number(t.amount || 0).toLocaleString()}
                                </td>

                                <td>
                                    {isAdmin ? (
                                        <>
                                            <button className="action-btn edit" onClick={() => handleEdit(t)}>Edit</button>
                                            <button className="action-btn delete" onClick={() => deleteTransaction(t.id)}>Delete</button>
                                        </>
                                    ): (
                                        <span style={{color:"#94a3b8", fontSize:"0.8rem"}}>Read Only</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
               </table>
            </div>
        );
}