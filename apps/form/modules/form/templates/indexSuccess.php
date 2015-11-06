<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">

<div class="container">
  <div class="widget config-container">
    <div class="widget-header">
      <h2>Velden toevoegen</h2>
    </div>
    <div class="widget-body" id="config-container">

    </div>
  </div>

  <div class="widget editor-container">
    <div class="widget-header">
      <h2>Veld bewerken</h2>
    </div>
    <div class="widget-body" id="editor-container">

    </div>
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
    var options = {
      url: '<?php echo url_for('form/update'); ?>'
    };
    $('body').formBuilder(options);
  });
</script>

<style type="text/css">
  .container{
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