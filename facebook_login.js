//Load the Facebook JS SDK
(function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
 }(document));

window.fbAsyncInit = function() {
  FB.init({
    appId      : '1679601662292415',
    xfbml      : true,
    version    : 'v2.6',
    status     : true,
    cookie     : true
  });

  // Tipos de permissão que irá ser pedida ao usuário.
  var permissions = [
    'email',
    'user_friends',
  ].join(',');

  // Campos que vão ser retornados após o login ser confirmado
  var fields = [
    'id',
    'name',
    'email',
    'link',
    'uid',
    'user_friends',
    'locale',

  ].join(',');

  
  function showDetails() {
    FB.api('/me/friends', {fields: fields}, function(details) {
      // Imprime no HTML os dados do usuário
      document.getElementById('userdata').innerHTML = JSON.stringify(details, null, '\t');
      
      // Salvar os dados no banco de dados ou verificar se ja existe e carregar dados do usuário.
    //   try 
    //   {
    //     $.ajax({
    //       method: "POST",
    //       url: 'login_usuario.php',
    //       data: {dados: details}
    //     })
    //     .done(function(data) {
    //       debugger;
    //         $('#serverData').html(JSON.stringify(data, null, '\t'));
    //         alert("Usuario Cadastrado");
    //     });
    //   }
    //   catch (e)
    //   {
    //     alert("Pagina inexistente");
    //   }
      
    //   $('#fb-login').attr('style', 'display:none;');
       });
  }


  document.getElementById('fb-login').onclick = function(){
    fbAsyncInit();
    // Tenta fazer o login
    FB.login(function(response) { 
      // Se usuário está logado ....
      if(response.authResponse) {
          showDetails();
          
      }
    }, {scope: permissions});
  };

};