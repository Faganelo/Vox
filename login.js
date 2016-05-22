
function callBackMudancasStatus(response){

	// O objeto de resposte é retornado com o campo de status, 
	// que  faz com o que o app saiba o status de login do usuario atual..

	if(response.status === 'connected'){
		// caso o usuario esteja logado, execute minha api, recuperando os dados do mesmo.
		$('#logar').hide();
		$('#paginaLogin').hide();
		$('#feed').show();
		testAPI();
	}else if (response.status === 'not_authorized'){
		$('#status').html('<p>Por favor, faça login no aplicativo</p>');
		$('#logout').remove();
	}else {
		// A pessoa não esta logado no facebook e nem no app, logo não é possivel recuperar informaçãoes.
		$('#logout').remove();
		// $('#status').html('<p>Faça login no Facebook</p>');

	}
}


window.fbAsyncInit = function (){
	FB.init({
		appId: '1679601662292415',
		cookie: true,
		version: 'v2.6'
	});

	FB.getLoginStatus(function(response){
		callBackMudancasStatus(response);
		});
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI(){

	FB.api('/me', function(response){
		
		//Aqui é onde você colocara cada dado em seu devido lugar
		$('#nomedeusuario').html('<p>'+response.name+'</p>');
		$('#h1').append('<p>Seu Id é: </p>'+response.id);
		console.log(response);
		console.log(JSON.stringify(response));
		
	});
}

function logOut(){
	FB.logout(function(response){
		callBackMudancasStatus(response);
		// $('#status').html('Você acaba de fazer LogOut');
		console.log("-- O usuario saiu do Vox --");
		$('#feed').hide();
		$('#logar').show();
		$('#paginaLogin').show();
	});
}

function login(){
	FB.login(function(response){
		console.log(JSON.stringify(response));
		callBackMudancasStatus(response);
	}, {scope: 'email'});
}