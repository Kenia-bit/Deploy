// select important elements from the HTML document
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const searchType = document.getElementById("searchType");
const resultDiv = document.getElementById("result");


// Function to search for Medicine by Name
function searchMedicine(query) {
    // Clear previous results
    resultDiv.innerHTML = "<p>Searching for medicine...</p>";

    //construct openFDA API URL for medicine brand name search
    const url = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${query}&limit=10`

    // Fetch data from the API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Check if results exist
            if (!data.results || data.results.length === 0) {
                resultDiv.innerHTML = "<p>No results found for the specified medicine.</p>";
                return;
            }

            // Start building table HTML
            let table =`<table>
                            <tr>
                                <th>Brand Name</th>
                                <th>Generic Name</th>
                                <th>Purpose</th>
                                <th>Warnings</th>
                            </tr>`;
                         

            // Loop through results
            data.results.forEach(item => {
                const brand = item.openfda.brand_name ? item.openfda.brand_name.join(", ") : "N/A";
                const generic = item.openfda.generic_name ? item.openfda.generic_name.join(", ") : "N/A";
                const purpose = item.purpose ? item.purpose.join(" ") : "N/A";
                const warnings = item.warnings ? item.warnings.join(" ") : "N/A";

                table += `<tr>
                            <td>${brand}</td>
                            <td>${generic}</td>
                            <td>${purpose}</td>
                            <td>${warnings}</td>
                          </tr>`;
            });

            table += "</table>";
            resultDiv.innerHTML = table;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            resultDiv.innerHTML = "<p>Something went wrong. Please try again later.</p>";
        });
}

// Function to search for Disease by Name
function searchDisease(query) {
    resultDiv.innerHTML = "<p>Searching for disease information...</p>";

    // openFDA API URL targeting purpose/indications
    const url = `https://api.fda.gov/drug/label.json?search=indications_and_usage:${query}&limit=10`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Check if results exist
            if (!data.results || data.results.length === 0) {
                resultDiv.innerHTML = "<p>No results found for the specified disease.</p>";
                return;
            }

            // Start building table HTML
            let table =`<table>
                            <tr>
                                <th>Brand Name</th>
                                <th>Generic Name</th>
                                <th>Indications / Purpose</th>
                                <th>Warnings</th>
                            </tr>`;

            // Loop through results
            data.results.forEach(item => {
                const brand = item.openfda.brand_name ? item.openfda.brand_name.join(", ") : "N/A";
                const generic = item.openfda.generic_name ? item.openfda.generic_name.join(", ") : "N/A";
                const indications = item.indications_and_usage ? item.indications_and_usage.join(" ") : "N/A";
                const warnings = item.warnings ? item.warnings.join(" ") : "N/A";

                table += `<tr>
                            <td>${brand}</td>
                            <td>${generic}</td>
                            <td>${indications || purpose}</td>
                            <td>${warnings}</td>
                          </tr>`;
        });

        table += "</table>";
        resultDiv.innerHTML = table;
    })
    .catch(error => {
        console.error("Error fetching data:", error);
        resultDiv.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    });
}

// When the user clicks the search button, run the main function
searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    const type = searchType.value;

    // Basic input validation
    if (query === "") {
        resultDiv.innerHTML = "<p>Please enter what you're looking for!.</p>";
        return;
    }

    // call the correct function based on the selected search type
    if (type === "medicine") {
        searchMedicine(query);
    } else {
        searchDisease(query);
    }
});