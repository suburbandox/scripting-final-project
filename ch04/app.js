$(function(){
    var gen
    var regi
    var all = []
    //$("input")
    if(localStorage.getItem("regi") === null) {
        regi = [];
    } else {
        regi = localStorage.getItem("regi").split(",");
         regi.forEach(item => {
             //$("#to-do-list").append("<li>" + item + "</li>");
             $("#bod").append("<tr>");
             $("#bod").append("<td>" + item + "</td>");
             $("#bod").append("<td>" + item + "</td>");
             $("#bod").append("<td>" + item + "</td>");
             $("#bod").append("<td>" + item + "</td>");
             $("#bod").append('<td class="ave">' + item + "</td>");
             $("#bod").append("<td>" + item + "</td>");
             $("#bod").append("<td>" + item + "</td>");
             $("#bod").append("<td>" + item + "</td>");
             $("#bod").append("<td>" + item + "</td>");
             $("#bod").append("</tr>");
         });
    }

    function isEmail(str) {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(str);
    }

    function isValidPassword(str) {
        var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return regex.test(str);
    }
    function isValidAge(str) {
        var regex = /^[0-9]*$/;
        return regex.test(str); 
    }    


    $("#state").click(function() {
        $("#state option").first().attr("disabled", true);
    });

    $("#register").submit((event) => {
        event.preventDefault();
        $(".error").remove();
        var numErrors = 0;
        if($("#firstName").val() === "") {
            $("#firstName").after('<div class="error">First name is required</div>');
            numErrors++;
        }

        if($("#lastName").val() === "") {
            $("#lastName").after('<div class="error">Last name is required</div>');
            numErrors++;
        }

        if($("#email").val() === "") {
            $("#email").after('<div class="error">Email address is required</div>');
            numErrors++;
        } else {
            if(!isEmail($("#email").val())) {
                $("#email").after('<div class="error">Invalid email address</div>');
            numErrors++;
            }
        }

        if(!isValidPassword($("#password").val())) {
            $("#password").after('<div class="error">Minimum 8 characters, 1 letter and 1 number</div>');
            numErrors++;
        }
        if(!isValidAge($("#age").val())|| $("#age").val()==="") {
            $("#age").after('<div class="error">i need a positive number</div>');
            numErrors++;
        }
        if($("#state").val() === "") {
            $("#state").after('<div class="error">Please select your state</div>');
            numErrors++;
        }

        if(!$("#terms").is(":checked")) {
            $("#terms ~ label").after('<div class="error">Please agree to our terms</div>');
            numErrors++;
        }

        if(!$('input[name="gender"]').is(":checked")) {
            $('.boxes.radio').after('<div class="error">Please select a gender</div>');
            numErrors++;
        }

        if(numErrors > 0) {
            $('input[type="submit"]').after('<div class="error">You have ' + numErrors + ((numErrors === 1) ? " error" : " errors") + '</div>');
        } else {
            var person =[]

            person.push($("#firstName").val())
            person.push  ($("#lastName").val());
            person.push ($("#email").val());
            person.push ($("#password").val());
            person.push( $("#age").val());
            person.push ($("#state").val());
            person.push($( "#terms" ).is(":checked"));
            person.push($($("input[name='gender']:checked").val()))
            all.push(person)
            localStorage.setItem("all",JSON.stringify(all))
            
                        //$( "#terms" ).is("checked")
            var New = $( "#terms" ).is(":checked");
            //var New = $("#newsletter").attr("checked");
            //var New = $("input[type=checkbox]").on();
            var Gen = $("input[name='gender']:checked").val();
            // Submit form to the server
            var First = $("#firstName").val();
            var Last = $("#lastName").val();
            var Email = $("#email").val();
            var Pass = $("#password").val();
            var Age = $("#age").val();
            var State = $("#state").val();
            var Ag =$( "#terms" ).is(":checked");
                        //$( "#terms" ).is("checked")
            var New = $( "#terms" ).is(":checked");
            //var New = $("#newsletter").attr("checked");
            //var New = $("input[type=checkbox]").on();
            var Gen = $("input[name='gender']:checked").val();
            $("#bod").append("<tr class ='rows'>");
            $("#bod").append("<td>" + First + "</td>");
            $("#bod").append("<td>" + Last + "</td>");
            $("#bod").append("<td>" + Email + "</td>");
            $("#bod").append("<td>" + Pass + "</td>");
            $("#bod").append('<td class="ave">' + Age + "</td>");
            $("#bod").append("<td>" + State + "</td>");
            $("#bod").append("<td>" + Ag + "</td>");
            $("#bod").append("<td>" + New + "</td>");
            $("#bod").append("<td class='gen'>" + Gen + "</td>");
            $("#bod").append("</tr>");
            gen =   $("input[name='gender']:checked").val()
            console.log($("input:radio[name='gender']:checked").val())
            //if($("input:radio[name='gender']:checked").val("Male")){console.log(666)}
            //if($(".gen").val("Male")){console.log(77)}
            //else{console.log(33)}
            //console.log(   $("input[name='gender']:checked").val());
            calc_total();
            reset()
        }
    });
        $("#show").change(function() {
            //var gen =   $("input[name='gender']:checked").val()
            var choice = $(this).val();
            //console.log(choice)
            //console.log(gen)
            $(".rows").hide();
            switch(choice) {
                case 'male':
                    //console.log(1)
                    if(choice === gen){console.log(33)}
                    //if($("#firstName").val().regex){console.log(33)}
                    //$(".gen").show();
                    
                    break;
                case 'female':
                    console.log(2)
                    //$(".gen").show();
                    break;
                case 'Prefer not to say':
                    console.log(3)
                    //$(".gen").show();
                    break;
                case 'all':
                default:
                    console.log(4)
                    //$("#food-receipt tbody tr").show();
                    break;

            }
    })
    function reset(){
        $("#firstName").val("") ;
        $("#lastName").val("");
        $("#email").val("");
        $("#password").val("");
        $("#age").val("") ;
        $("#state").val("");
        $( "#terms" ).prop( "checked", false );
        $( "#newsletter" ).prop( "checked", false );
        $("#male").prop("checked", false);
        $("#female").prop("checked", false);
        $("#nonbinary").prop("checked", false);
        $("#not-provided").prop("checked", false);
        terms
       
    }
    $("#coler").change(function() {
        var choice = $(this).val();
        //$("#food-receipt tbody tr").hide();
        //var choice = $(this).val();
        $("#food-receipt tbody tr").hide();
        switch(choice) {
            case 'none':
                $("thead").css("background-color","white");
                $("tbody").css("background-color","white");
                $("tfoot").css("background-color","white");
                break;
            case 'header':
                $("thead").css("background-color","red");
                break;
            case 'body':
                $("tbody").css("background-color","red");
                break;
            case 'footer':
                $("tfoot").css("background-color","red");
                break;
            default:
                
                break;

        }
        
    });
    $("#dark-mode-btn").on("click", "input", function() {
        if($(this).prop("checked") == true) {
            $("body").css({
                "background-color": "black"
                , "color" : "white"
            });
            $(".toggle-border").css("border-color", "white");
            $(".toggle-indicator").css({
                "background-color" : "white"
                ,"left": "22px"
            });
        } else if($(this).prop("checked") == false) {
            $("body").css({
                "background-color": "white"
                , "color" : "black"
            });
            $(".toggle-border").css("border-color", "black");
            $(".toggle-indicator").css({
                "background-color" : "black"
                ,"left": "2px"
            });
        }
    });
    function calc_total() {
        var total = 0;
        var sum = 0;
        $(".ave").each(function(){
          sum += parseFloat($(this).text());
        });
        $(".ave").each(function(){
            total ++;
          });
        //console.log(sum/total)
        $("#aveage").text(sum/total)

    }
    $("#bod").append(JSON.parse(all)[0])
});