import React from 'react';

interface BoxProps {
    username: string;
    name: string;
    title: string;
    department: string;
    phoneNumber: string;
    mail: string;
    onClick: () => void;
}

const Box: React.FC<BoxProps> = ({ username, name, title, department, phoneNumber, mail, onClick}) => {
    return (
        <div className="flex flex-row p-4 border-none rounded-lg bg-[#f9fafb86] hover:bg-[#b3b4b6] cursor-pointer"
            onClick={onClick}>
            
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