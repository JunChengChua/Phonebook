"use client"

import { LuSearch, LuPhone, LuClock, LuMapPin } from "react-icons/lu";
import { useState, useMemo } from 'react';
import rawData from '@/data/departments'
import { transformDepartments } from '@/lib/transformDepartments';

export default function DepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const departments = useMemo(() => {
    return transformDepartments(rawData);
  }, []);

  const filteredDepartments = useMemo(() => {
    const search = searchTerm.toLowerCase();
    return departments.filter((dept) =>
      dept.department.toLowerCase().includes(search) ||
      dept.role.toLowerCase().includes(search) ||
      dept.extension.includes(search)
    );
  }, [searchTerm, departments]);


  return (
    <div className="min-h-screen bg-[#F7F3EE] rounded-lg shadow-lg">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-slate-800 mb-2">Hospital Departments</h2>
          <p className="text-slate-600">Find contact information for all departments</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <LuSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by department name, phone, or extension..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map(dept => (
            <div
              key={dept.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="mb-4 text-wrap">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-amber-700 bg-amber-100 rounded mb-3">
                      {dept.department}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{dept.role}</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <LuPhone className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-slate-900 font-semibold">{dept.phone}</p>
                      {dept.extension && (
                        <p className="text-sm text-slate-600">Ext. {dept.extension}</p>
                      )}
                    </div>
                  </div>
                </div>

                <button className="mt-5 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-2.5 px-4 rounded-lg transition-colors">
                  Call Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDepartments.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-block p-4 bg-slate-100 rounded-full mb-4">
              <LuSearch className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No departments found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}