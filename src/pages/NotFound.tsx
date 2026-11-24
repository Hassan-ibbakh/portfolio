import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center hero-gradient px-4">
      <div className="text-center max-w-md">
        <p className="font-display text-7xl md:text-8xl font-bold text-gradient mb-4">404</p>
        <h1 className="text-2xl font-semibold text-foreground mb-3">Page not found</h1>
        <p className="text-muted-custom mb-8">
          The page <code className="text-secondary-custom">{location.pathname}</code> doesn't exist or has been moved.
        </p>
        <Button asChild variant="hero" size="lg">
          <Link to="/">
            <ArrowLeft />
            Back to home
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default NotFound;
