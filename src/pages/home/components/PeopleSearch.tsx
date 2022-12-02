import React from 'react';

type Props = {
    setSearchQuery: (query: string) => void
};

export function PeopleSearch({setSearchQuery}: Props) {
    return (
        <div className="w-full flex flex-col gap-2">
            <label>Search by name</label>
            <input type="text" className="w-full border-2 border-gray-300 rounded-2xl focus:border-green-800 p-2"
                   onChange={(e) => setSearchQuery(e.target.value)}/>
        </div>
    );
}
