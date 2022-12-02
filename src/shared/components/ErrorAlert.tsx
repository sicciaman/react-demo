import React from 'react';

type Props = {
    message: string
};

export function ErrorAlert(props: Props) {
    const {message} = props;

    return (
        <div className="inline-flex rounded-xl bg-red-200 text-red-800 font-semibold px-4 py-2 my-3" data-testid="error-alert">
            {message}
        </div>
    );
}
