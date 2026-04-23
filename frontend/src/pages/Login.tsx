import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ email, password });
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f3f4f6",
    }}>
      <div style={{
        backgroundColor: "#ffffff",
        padding: "2.5rem",
        borderRadius: "0.75rem",
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px",
      }}>
        <h1 style={{ margin: "0 0 1.5rem", fontSize: "1.5rem", fontWeight: 600, color: "#111827" }}>
          Sign in
        </h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "#374151" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                padding: "0.625rem 0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                outline: "none",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "#374151" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                padding: "0.625rem 0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                outline: "none",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              marginTop: "0.5rem",
              padding: "0.75rem",
              backgroundColor: "#111827",
              color: "#ffffff",
              border: "none",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
