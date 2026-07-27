import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Strona nie znaleziona — Ratujmy Podjuchy</title>
        <meta name="description" content="Strona, której szukasz, nie istnieje." />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "https://ratujmypodjuchy.pl"} />
        <meta property="og:url" content={typeof window !== "undefined" ? window.location.href : "https://ratujmypodjuchy.pl"} />
        <meta property="og:title" content="Strona nie znaleziona — Ratujmy Podjuchy" />
        <meta property="og:description" content="Strona, której szukasz, nie istnieje." />
      </Helmet>
      <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <Link to="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </Link>
      </div>
    </div>
    </>
  );
};

export default NotFound;
