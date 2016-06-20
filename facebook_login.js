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
    xfbml      : false,
    version    : 'v2.6',
    status     : true,
    cookie     : true
  });

  // Tipos de permissão que irá ser pedida ao usuário.
  var permissions = [
    'email',
  ].join(',');

  // Campos que vão ser retornados após o login ser confirmado
  var fields = [
    'id',
    'name',
    'link',
    'gender',
    'locale',
  ].join(',');

  
  function showDetails() {
    FB.api('/me', {fields: fields}, function(details) {
      // Imprime no HTML os dados do usuário
      // var dados = JSON.stringify(details);
      // document.getElementById('userdata').innerHTML = dados;
      console.log('>> Dados inseridos no localstorage.');
      store.set('id_facebook', details.id);
      store.set('nome', details.name);
      store.set('link', details.link);
      store.set('genero', details.gender);
      store.set('localidade', details.locale);
      store.set('cadastrado', 1);
      window.location = "dashboard.html";
      
      // Salvar os dados no banco de dados ou verificar se ja existe e carregar dados do usuário.
      // try 
      // {
      //   $.ajax({
      //     method: "POST",
      //     url: 'login_usuario.php',
      //     data: {dados: details}
      //   })
      //   .done(function(data) {
      //     debugger;
      //       $('#serverData').html(JSON.stringify(data, null, '\t'));
      //       alert("Usuario Cadastrado");
      //   });
      // }
      // catch (e)
      // {
      //    alert("Pagina inexistente");
      //  }
      
      //  $('#fb-login').attr('style', 'display:none;');
       });
  }

document.getElementById('fb-login').onclick = function(){
    fbAsyncInit();
    // Tenta fazer o login
    FB.login(function(response) { 
      // Se usuário está logado ....
      if(response.authResponse) {
          showDetails();
          share();
          console.log('>>'+store.get('nome')+' logado');

      }
    }, {scope: permissions});
  };

};


// function checalogin(){
//         if(store.get('nome').length != 0){
//           logaface();
//         }//else {
//           //document.getElementById('login').style.visibility == "display";
//         //}
// };


function share() {
FB.ui(
  {
   method: 'feed', //Método para postar no Mural
   name: 'Vox - Fale livremente!',
   caption: 'Copyright 2016 VOX ltda.',
   description: 'Vox o mais novo aplicativo de posts anonimos para se divertir, se \n expressar e muito mais.. Compartilhe você tambem com seus amigos!',
   link: 'http://google.com/', //Link a ser compartilhado
   picture: 'http://cdn.atl.clicrbs.com.br/wp-content/uploads/sites/27/2014/08/secret-app-aplicativo-justica-brasil.png' //Imagem do Share
  },
  function(response) {
     console.log(response); //Callback da função.
  }
);
}