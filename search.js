
jQuery(App);
function App($) {

    let country = $("#country");
    let table = $("#dataTable");
    country.focus();

    $("#output").animate({
        opacity: 1
    }, 2000);

    //button-reset
    $("form").on("submit", handleReset);

    function handleReset() {
        event.preventDefault();
        country.val("");
        table.empty();
    }

    //oninput
    country.on("input", handleInput);

    function handleInput() {

        let URL = "https://restcountries.eu/rest/v2/name/";
        URL = URL + country.val();

        let options = {
            url: URL,
            success: handleResponce
        };

        $.ajax(options);

        function handleResponce(countries) {
            table.empty();

            countries.forEach(country => {

                let columnName = "<td class=\"border px-3\">" + country.name + "</td>";
                let columnCapital = "<td  class=\"border px-3\">" + country.capital + "</td>";
                let columnFlag = "<td> <img src=\"" + country.flag + "\"id=\"flag\" class=\"img-fluid\"></td>";

                let newRowContent = "<tr>" + columnName + columnCapital + columnFlag + "</tr>";

                table.append(newRowContent);

            });
        }
    }
    //validation
    country.keypress(function (e) {
        var regex = new RegExp("^[a-zA-Z ]+$");
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            return true;
        }
        else {
            e.preventDefault();
            alert('Please enter alphabetic characters (A–Z or a–z)');
            return false;
        }
    });



    //error
    function handleError(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
        alert("Error");
    }
}

