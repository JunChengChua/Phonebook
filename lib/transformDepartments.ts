interface DepartmentEntry {
    id: string;
    department: string;
    role: string;
    phone: string;
    extension: string;
  }
  
  const BASE_PHONE = "(718) 250-";
  
  export function transformDepartments(data: any): DepartmentEntry[] {
    const results: DepartmentEntry[] = [];
  
    function recurse(obj: any, parentDept: string) {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === "string") {
          const extensions = value.split("/");
  
          extensions.forEach((ext) => {
            const cleanExt = ext.trim();
  
            results.push({
              id: `${parentDept}-${key}-${cleanExt}`
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, ""),
              department: parentDept,
              role: key,
              phone: `${BASE_PHONE}${cleanExt}`,
              extension: cleanExt,
            });
          });
        } else if (typeof value === "object") {
          recurse(value, key);
        }
      });
    }
  
    Object.entries(data).forEach(([dept, value]) => {
      recurse(value, dept);
    });
  
    return results;
  }