/**
 * Created by Nir on 11/15/13.
 */
var planningMenu;
var maintenanceMenu;
var mainContainer;

$(document).ready(function() {
  maintenanceMenu = $("#maintenance-menu-item");
  planningMenu = $("#planning-menu-item");
  mainContainer = $("main");

  maintenanceMenu.click(function() {
    planningMenu.removeClass("active");
    $(this).addClass("active");

       $.ajax({

           url: "/maintenance",
           type: "GET",
           success: function(data){
               mainContainer.html(data);
           }
       });
   });

      url: "/maintenance",
      type: "GET",
      success: function(data) {
        mainContainer.html(data);
      }
    });
  });

  planningMenu.click(function() {
    maintenanceMenu.removeClass("active");
    $(this).addClass("active")

    $.ajax({
      url: "/planning",
      type: "GET",
      success: function(data) {
        mainContainer.html(data);
      }
    });
  });
});