import { useAuth } from "../context/AuthContext"; // Use context instead of static import
import "../App.css";

export default function Insights() {
    const { role, currentUser, transactions } = useAuth();

    // 1. Filter data based on who is looking
    const data = role === "admin" 
        ? transactions 
        : transactions.filter(t => t.userId === currentUser?.id);

    // 2. Calculations (using the filtered data)
    const totalIncome = data
        .filter((t) => t.type === "income")
        .reduce((a, b) => a + Number(b.amount || 0), 0);

    const totalExpense = data
        .filter((t) => t.type === "expense")
        .reduce((a, b) => a + Number(b.amount || 0), 0);

    const categoryTotal = {};
    data.filter(t => t.type === "expense").forEach((t) => {
        categoryTotal[t.category] = (categoryTotal[t.category] || 0) + Number(t.amount);
    });

    let highestCategory = Object.keys(categoryTotal).reduce((a, b) => 
        categoryTotal[a] > categoryTotal[b] ? a : b, "N/A"
    );
    let maxAmount = categoryTotal[highestCategory] || 0;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1 style={{ fontSize: "2rem", fontWeight: "800" }}>
                    {role === "admin" ? "Platform Insights" : "Your Financial Insights"}
                </h1>
                <p style={{ color: "#64748b" }}>
                    {role === "admin" ? "Global system analytics" : "Personal spending behavior"}
                </p>
            </header>

            <div className="insights-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
                
                {/* ADMIN ONLY CARD: System Stats */}
                {role === "admin" && (
                    <div className="insight-card" style={{ borderLeft: "5px solid #3b82f6" }}>
                        <div className="insight-header">
                            <span className="insight-icon">🌐</span>
                            <span style={{ color: "#3b82f6", fontWeight: "700", fontSize: "0.8rem" }}>SYSTEM OVERVIEW</span>
                        </div>
                        <h3 style={{ margin: "10px 0" }}>Total Platform Volume</h3>
                        <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
                            Managing <b>{transactions.length}</b> transactions across all users.
                        </p>
                    </div>
                )}

                {/* SHARED CARD: Top Spending (Context changes based on role) */}
                <div className="insight-card">
                    <div className="insight-header">
                        <span className="insight-icon">🔥</span>
                        <span style={{ color: "#ef4444", fontWeight: "700", fontSize: "0.8rem" }}>TOP EXPENSE</span>
                    </div>
                    <h3 style={{ margin: "10px 0" }}>{highestCategory}</h3>
                    <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
                        {role === "admin" ? "Global top category: " : "You spent "} 
                        <b>Rs.{maxAmount.toLocaleString()}</b> on this category.
                    </p>
                </div>

                {/* USER ONLY CARD: Savings Rate */}
                {role !== "admin" && (
                    <div className="insight-card">
                        <div className="insight-header">
                            <span className="insight-icon">💰</span>
                            <span style={{ color: "#10b981", fontWeight: "700", fontSize: "0.8rem" }}>SAVINGS RATE</span>
                        </div>
                        <h3 style={{ margin: "10px 0" }}>Monthly Savings</h3>
                        <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
                            You are saving <b>Rs.{(totalIncome - totalExpense).toLocaleString()}</b> from your income.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}