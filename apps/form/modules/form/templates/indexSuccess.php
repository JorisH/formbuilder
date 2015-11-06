<div class="widget config-container">
  <div class="widget-header">
    <h2>Configuratie</h2>
  </div>
  <div class="widget-body" id="config-container">

  </div>
</div>

<div class="widget form-container">
  <div class="widget-header">
    <h2>Form</h2>
  </div>
  <div class="widget-body" id="form-container">

  </div>
</div>

<input id='bla' type="button" value="Save it bitch!"/>

<div id="form-preview" style="width: 100%">

</div>

</div>

<script type='text/javascript'>
  jQuery(function($){
    var options = {};
    formBuilder = $('body').formBuilder(options);
    console.log(formBuilder);

    $('#bla').on('click', function(){
      $.post(
        '<?php echo url_for("form/update"); ?>',
        {data: formBuilder.getJson()},
        function(formHtml) {
          $("#form-preview").html(formHtml);
        }
      )
    })

  });
</script>

<style type="text/css">
  .config-container {
    float: left;
    width: 15%;
    border: 1px solid black;
    padding: 10px;
  }

  .form-container {
    float: right;
    width: 70%;
    border: 1px solid black;
    padding: 10px;
  }
</style>