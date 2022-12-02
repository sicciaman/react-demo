import React from 'react';

type Props = {
    uploadingDate: Date,
    fileName: string,
    fileSize: number
};

export function LastReadingMetadata({uploadingDate, fileSize, fileName}: Props) {
    console.log(uploadingDate, fileSize, fileName);
    return (
        <div data-testid="reading-metadata">
            <h2 className="text-xl text-green-800 font-semibold">Last file reading metadata</h2>
            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold" data-testid="file-name">{fileName}</h3>
                <div>
                    <div className="flex items-center gap-2">
                        <span className="underline">Uploading date:</span>
                        <p className="font-light italic">{uploadingDate.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="underline">File size:</span>
                        <p>{fileSize} byte</p>
                    </div>
                </div>

            </div>
        </div>

    );
}
