import { Link, useRouteError } from "react-router-dom";

export function Error() {
  const error = useRouteError() as Error;

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1>Whopps, something happen</h1>
      <p>Error Details</p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <p className="text-accent-foreground">
        Return to <Link to="/">Dasboard</Link>
      </p>
    </div>
  );
}
