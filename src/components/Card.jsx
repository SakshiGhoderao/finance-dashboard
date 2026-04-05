export default function Card({title, value}){
    return(
        <div style={{
            background:"#fff",
            padding:"20px",
            borderRadius:"10px",
            boxShadow:"0 2px 10px rgba(0,0,0,0.1)",
            width:"200px",
            }}
        >
            <p style={{ color:"gray"}}>{title}</p>
            <h2>{value}</h2>
        </div>
    );
}