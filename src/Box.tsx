import React from 'react';

interface BoxProps {
    username: string;
    name: string;
    title: string;
    department: string;
    phoneNumber: string;
    mail: string;
    selected?: boolean;
    onClick: () => void;
}

const Box: React.FC<BoxProps> = ({ username, name, title, department, phoneNumber, mail, onClick, selected = false}) => {
    return (
        <div className="relative flex flex-row p-4 border-none rounded-lg cursor-pointer grid-top-shadow bg-[#f9fafb86] group"
            onClick={onClick}>
            
            {/* Right-side overlay */}
            <div className={`absolute top-0 right-0 h-full w-[40%] bg-gradient-to-l from-black/25 to-transparent pointer-events-none rounded-lg z-10
                            transition-opacity duration-300 ${selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}/>

            {/*Picture Div*/}
            <div className="flex-shrink-0 h-24 w-24 mr-2">
                <img src={"images/Silhouette.jpg"} alt="Avatar" className="rounded-2xl h-full w-full object-cover" />
            </div>

            {/*Basic Information*/}
            <div>
                <h3 className="font-bold text-lg">{name}</h3>
                <p className="text-sm text-gray-600">Title: {title}</p>
                <p className="text-sm text-gray-600">Dept: {department}</p>
            </div>
        </div>
    );
};

export default Box;