import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-slate-100 mt-16 bg-white">
    <div className="w-11/12 max-w-7xl mx-auto py-10 sm:py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M20 7H4C2.9 7 2 7.9 2 9v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z" fill="white" opacity="0.9"/>
                <path d="M16 7V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2" stroke="white" strokeWidth="1.5" fill="none"/>
                <circle cx="12" cy="13" r="2" fill="white"/>
              </svg>
            </div>
            <span style={{fontFamily:'Syne,sans-serif'}} className="text-lg font-bold text-slate-900">Remoto</span>
          </Link>
          <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
            Connecting people with opportunities that fit their lives. Remote, hybrid, or on-site — we've got you covered.
          </p>
        </div>

        {/* Jobs */}
        <div>
          <p className="font-semibold text-slate-800 text-sm mb-3" style={{fontFamily:'Syne,sans-serif'}}>Browse Jobs</p>
          <ul className="space-y-2">
            {["All Jobs","Remote Jobs","Hybrid Jobs","Part-Time","On-Site"].map(l => (
              <li key={l}>
                <Link to="/alljobs" className="text-sm text-slate-500 hover:text-blue-600 transition">{l}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="font-semibold text-slate-800 text-sm mb-3" style={{fontFamily:'Syne,sans-serif'}}>Company</p>
          <ul className="space-y-2">
            {["About Us","Blog","Careers","Press Kit","Contact"].map(l => (
              <li key={l}><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Legal + social */}
        <div>
          <p className="font-semibold text-slate-800 text-sm mb-3" style={{fontFamily:'Syne,sans-serif'}}>Legal</p>
          <ul className="space-y-2 mb-5">
            {["Terms of Use","Privacy Policy","Cookie Policy","Security"].map(l => (
              <li key={l}><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition">{l}</a></li>
            ))}
          </ul>
          <div className="flex gap-3">
            {[
              { label: "Twitter", path: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" },
              { label: "YouTube", path: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" },
              { label: "LinkedIn", path: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" },
            ].map(({ label, path }) => (
              <a key={label} href="#" aria-label={label} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center transition text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={path}/></svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-slate-400">© 2024 Remoto, Inc. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
