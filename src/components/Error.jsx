import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Error = () => (
  <div className="min-h-screen flex items-center justify-center px-4">
    <Helmet><title>Remoto | Page Not Found</title></Helmet>
    <div className="text-center max-w-md animate-fade-up">
      <p className="font-display text-8xl sm:text-9xl font-bold text-blue-100 select-none mb-2">404</p>
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Page not found</h1>
      <p className="text-slate-500 text-sm mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/">
        <button className="btn-primary">← Back to Home</button>
      </Link>
    </div>
  </div>
);

export default Error;
