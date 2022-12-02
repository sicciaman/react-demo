const PARTIAL_METADATA = '_partial';

function onFileUpload(event) {
    const JSON_FILE_TYPE = 'application/json';
    const uploadedFile = event.target.files[0];
    const errorDiv = document.getElementById('error-container');

    // Remove an old error message on a new file upload
    if (errorDiv.classList.contains('show')) {
        errorDiv.classList.remove('show');
    }

    // When file type not allowed show an error & clear input field
    if (uploadedFile.type !== JSON_FILE_TYPE) {
        console.error('Only JSON files are allowed');
        document.getElementById('file-uploader').value = '';
        errorDiv.innerHTML = '<strong>Only JSON files are allowed</strong>';
        errorDiv.classList.add('show');
        return;
    }

    // Start file parsing
    parseFile(uploadedFile)
        .then((data) => {
            const peopleDetails = data.values ?? [];

            const columns = [...extractTableColumns(peopleDetails)];

            // Checking for uncompleted info in person objects
            peopleDetails.forEach(person => validatePersonDetails(columns, person));

            // Adding partial column
            columns.push(PARTIAL_METADATA);

            // Create table
            createTable(columns, peopleDetails);
        })
        .catch(error => {
            errorDiv.innerHTML = `<strong>${error}</strong>`;
            errorDiv.classList.add('show');
        });
}

/**
 * Parse JSON file
 * @param file Uploaded file
 * @returns {Promise<any>} Parsed JSON file content
 */
async function parseFile(file) {
    const fileReader = new FileReader();
    return new Promise((res, rej) => {
        fileReader.onload = (event) => {
            try {
                res(JSON.parse(event.target.result));
            } catch (err) {
                console.error(err);
                rej('JSON file parsing failed, check the browser logs for more info');
            }
        }
        fileReader.onerror = (err) => {
            console.error(err);
            rej('Error during file reading');
        }
        fileReader.readAsText(file);
    });
}

/**
 * Validate personDetails object marking object with 'partial' metadata if there are uncompleted info
 * @param columns Table columns
 * @param personDetails Object that contains person info
 */
function validatePersonDetails(columns, personDetails) {
    if (!columns.every(column => !!personDetails[column])) {
        console.log('Missing info on person', personDetails);
        personDetails[PARTIAL_METADATA] = '❌';
    } else {
        personDetails[PARTIAL_METADATA] = '';
    }
}

function createTable(columns, peopleDetails) {
    const table = document.getElementById('table-container');
    const tableHeader = document.createElement('thead');
    const tableBody = document.createElement('tbody');

    const headerRow = document.createElement('tr');
    tableHeader.appendChild(headerRow);

    columns.forEach(column => {
        const colEl = document.createElement('th');
        colEl.appendChild(document.createTextNode(column))
        headerRow.appendChild(colEl);
    });

    peopleDetails.forEach(person => {
        const bodyRow = document.createElement('tr');

        for (let column of columns) {
            const cellRow = document.createElement('td');
            cellRow.appendChild(document.createTextNode(person[column] ?? ''));
            bodyRow.appendChild(cellRow);
        }

        tableBody.appendChild(bodyRow);
    });


    table.appendChild(tableHeader);
    table.appendChild(tableBody);
    document.body.appendChild(table);
}

/**
 * Extract all the properties from peopleDetails data
 * @param peopleDetails Array of peopleDetails objects
 * @returns A set of unique properties
 */
function extractTableColumns(peopleDetails) {
    return peopleDetails.reduce((acc, person) => {
        return new Set([...acc, ...Object.keys(person)])
    }, new Set());
}
