import "../styles/globals.css";

export const metadata = {
  title: "TinyLink",
  description: "TinyLink - URL shortener"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: 16, borderBottom: "1px solid #eee" }}>
          <a href="/" style={{ textDecoration: "none", color: "#111", fontWeight: 700 }}>
            TinyLink
          </a>
        </header>
        <main>{children}</main>
        <footer style={{ padding: 16, borderTop: "1px solid #eee", marginTop: 24, textAlign: "center" }}>
          <small>Built for TinyLink take-home</small>
        </footer>
      </body>
    </html>
  );
}
