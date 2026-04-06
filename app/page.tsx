"use client";

import { useEffect, useState } from "react";
import { LuPhone, LuMail, LuSearch, LuUsers, LuMailOpen } from "react-icons/lu";

type SearchCategory = "all" | "name" | "department" | "email";


export default function Home() {

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [category, setCategory] = useState<SearchCategory>("all");

  const isSearching = query.trim().length > 0;

  const [serverDown, setServerDown] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch("/api/users");
  
        if (!res.ok) {
          setServerDown(true);
          setUsers([]);
          return;
        }
  
        const data = await res.json();
  
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setServerDown(true);
          setUsers([]);
        }
      } catch (err) {
        setServerDown(true);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
  
    loadUsers();
  }, []);

  const filtered =
  query && !serverDown && Array.isArray(users)
    ? users
        .map((item) => ({
          ...item,
          match: matchResultByCategory(item, query, category),
        }))
        .filter((item) => item.match > 0)
        .sort((a, b) => b.match - a.match)
    : [];

  // Helper function to match based on selected category
  function matchResultByCategory(item: any, query: string, category: SearchCategory): number {
    const lowerQuery = query.toLowerCase();
    
    switch (category) {
      case "name":
        return item.name?.toLowerCase().includes(lowerQuery) ? 1 : 0;
      case "department":
        return item.department?.toLowerCase().includes(lowerQuery) ? 1 : 0;
      case "email":
        return item.mail?.toLowerCase().includes(lowerQuery) ? 1 : 0;
      case "all":
        return (
          item.name?.toLowerCase().includes(lowerQuery) ||
          item.department?.toLowerCase().includes(lowerQuery) ||
          item.mail?.toLowerCase().includes(lowerQuery) ||
          item.telephonenumber?.includes(lowerQuery)
        )
          ? 1
          : 0;
      default:
        return 0;
    }
  }

  const categories: { value: SearchCategory; label: string }[] = [
    { value: "all", label: "all" },
    { value: "name", label: "name" },
    { value: "department", label: "department" },
    { value: "email", label: "email" },
  ];

  // state (change from single value → array)
  // const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState<SearchCategory[]>(["all"]);

  // toggle handler
  const toggleCategory = (value: SearchCategory) => {
    setSelectedCategories((prev) => {
      // ----- ALL selected -----
      if (value === "all") {
        return ["all"]; // wipe others
      }

      // ----- Toggle normal checkbox -----
      const withoutAll = prev.filter(v => v !== "all");

      if (withoutAll.includes(value)) {
        const next = withoutAll.filter(v => v !== value);

        // If user deselects everything → fallback to ALL
        return next.length === 0 ? ["all"] : next;
      }

      return [...withoutAll, value];
    });
  };

  return (
    <div
      className={`flex-1 min-h-screen bg-[#F7F3EE] rounded-lg shadow-lg p-8 transition-all duration-500 flex flex-col items-center ${
        isSearching ? "justify-start" : "justify-center"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p
          className={`text-center font-semibold transition-all duration-500 ${
            isSearching
              ? "text-4xl"
              : "text-5xl md:text-6xl font-serif"
          }`}
        >
          Find Hospital Staff
        </p>
        <p className="text-neutral-600 mb-12 text-center">Search for any staff member by name, title, or department</p>

        {/* Search Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className={
            "transition-all duration-500 "
          }
        >
          <div className="relative">
              <LuSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-6 h-6 focus:text-amber-500" />
              <input
                type="text"
                id="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, title, department, or phone number..."
                className="w-full pl-14 pr-6 py-4 text-lg border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
        </form>

        {/* Category Tabs */}
        <div className="flex items-center gap-3 mt-4 flex-wrap justify-center">
          {categories.map((cat) => {
            const checked = selectedCategories.includes(cat.value);

            return (
              <label
                key={cat.value}
                className="flex items-center gap-2 md:mx-2 cursor-pointer uppercase text-xs"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCategory(cat.value)}
                  className="accent-amber-600 cursor-pointer"
                />
                {cat.label}
              </label>
            );
          })}
        </div>

        {isSearching && (
          <div className="w-full max-w-4xl mt-10 transition-all duration-500">
            {loading && (
              <div className="w-full max-w-4xl mt-10 text-center">
                <p className="text-neutral-500">Loading staff directory...</p>
              </div>
            )}
            {serverDown && (
              <div className="w-full max-w-4xl mt-10 text-center">
                <p className="text-red-600 font-semibold text-lg">
                  Server is currently unavailable.
                </p>
                <p className="text-neutral-500 text-sm mt-2">
                  Please try again later.
                </p>
              </div>
            )}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((user) => (
                  <div
                    key={user._id}
                    className="p-4 bg-white rounded-lg shadow hover:scale-[1.02] transition-transform"
                  >
                    <p className="text-xl font-bold text-neutral-800 mb-1">
                      {user.name}
                    </p>

                    <p className="text-sm font-medium text-blue-700 mb-3">
                      {user.description}
                    </p>

                    <p className="text-sm text-neutral-700 font-semibold mb-3">
                      <span className="font-medium text-xs text-neutral-500">
                        DEPARTMENT:
                      </span>{" "}
                      {user.department}
                    </p>

                    <a
                      href={`tel:${user.telephonenumber}`}
                      className="flex items-center gap-2 mb-1 hover:text-green-700 transition-colors"
                    >
                      <LuPhone className="text-green-600" />
                      {user.telephonenumber}
                    </a>

                    <a
                      href={`mailto:${user.mail}`}
                      className="flex items-center text-sm text-neutral-600 gap-2 hover:text-blue-600 transition-colors"
                    >
                      <LuMail className="text-blue-400" />
                      {user.mail}
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-neutral-500 mt-6">
                No results found
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
