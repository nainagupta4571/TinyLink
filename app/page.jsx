"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/links");
    if (res.ok) {
      setLinks(await res.json());
    } else {
      setLinks([]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function validateCode(c) {
    if (!c) return false;
    return /^[A-Za-z0-9]{6,8}$/.test(c);
  }

  function validateUrl(u) {
    try {
      new URL(u);
      return true;
    } catch {
      return false;
    }
  }

  async function addLink() {
    setError("");
    if (!validateUrl(url)) {
      setError("Enter a valid URL (include https://).");
      return;
    }
    if (!validateCode(code)) {
      setError("Code must match [A-Za-z0-9]{6,8}.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, code })
    });
    if (res.status === 409) {
      setError("Code already exists. Choose another.");
    } else if (!res.ok) {
      const body = await res.json().catch(()=>({}));
      setError(body.error || "Create failed");
    } else {
      setUrl("");
      setCode("");
      load();
    }
    setLoading(false);
  }

  async function deleteLink(c) {
    if (!confirm(`Delete ${c}?`)) return;
    await fetch(`/api/links/${c}`, { method: "DELETE" });
    load();
  }

  return (
    <div style={{ maxWidth: 980, margin: "24px auto", padding: "0 16px" }}>
      <h1 style={{ fontSize: 28 }}>Dashboard</h1>

      <div style={{ marginTop: 16, marginBottom: 16, display: "flex", gap: 8 }}>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/long/path"
          style={{ flex: 1, padding: 8, border: "1px solid #ddd" }}
        />
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="custom code (6-8 alnum)"
          style={{ width: 220, padding: 8, border: "1px solid #ddd" }}
        />
        <button onClick={addLink} disabled={loading} style={{ padding: "8px 12px" }}>
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}

      <table>
        <thead style={{ textAlign: "left", background: "#fafafa" }}>
          <tr>
            <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>Code</th>
            <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>Target URL</th>
            <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>Clicks</th>
            <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>Last Clicked</th>
            <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((l) => (
            <tr key={l.code}>
              <td style={{ padding: 8, borderBottom: "1px solid #f4f4f4" }}>
                <a href={`/code/${l.code}`}>{l.code}</a>
              </td>
              <td style={{ padding: 8, borderBottom: "1px solid #f4f4f4", maxWidth: 420, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                <a href={l.url} target="_blank" rel="noreferrer">{l.url}</a>
              </td>
              <td style={{ padding: 8, borderBottom: "1px solid #f4f4f4" }}>{l.clicks}</td>
              <td style={{ padding: 8, borderBottom: "1px solid #f4f4f4" }}>{l.lastClicked ? new Date(l.lastClicked).toLocaleString() : "-"}</td>
              <td style={{ padding: 8, borderBottom: "1px solid #f4f4f4" }}>
                <button onClick={() => deleteLink(l.code)} style={{ color: "red", background: "transparent", border: "none" }}>Delete</button>
              </td>
            </tr>
          ))}
          {links.length === 0 && (
            <tr>
              <td colSpan="5" style={{ padding: 16 }}>No links yet — add one above.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
