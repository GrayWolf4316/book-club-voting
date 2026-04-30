export const metadata = {
  title: "Book Club Voting",
  description: "Monthly ranked voting for book club picks",
};
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
