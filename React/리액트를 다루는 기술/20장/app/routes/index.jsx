import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <Link to="/about">about</Link>
        </li>
        <li>
          <Link to="/articles">articles</Link>
        </li>
        <li>
          <Link to="/users">users</Link>
        </li>
      </ul>
    </div>
  );
}
