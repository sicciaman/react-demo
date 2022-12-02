import React, {ReactNode} from 'react';

type Props = {
    children: ReactNode;
}

export function Section({children}: Props) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            {children}
        </div>
    );
}
