import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1>Page not Found</h1>
      <p className="text-accent-foreground">
        Return to <Link to="/">Dasboard</Link>
      </p>
    </div>
  );
}
