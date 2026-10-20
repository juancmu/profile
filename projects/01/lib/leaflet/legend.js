jQuery(document).ready(function($)
{
  $(".legend-title").click(function(){
    $('.leaflet-control-layers').css("display","block");
    if ($(".legend-title").text() == "HIDE LAYERS")
      {			
        $(".legend-title").html("EXPAND LAYERS")
      }
      else{

        $(".legend-title").text("HIDE LAYERS")
        $('.leaflet-control-layers').css("display","block");

      }

})
})
