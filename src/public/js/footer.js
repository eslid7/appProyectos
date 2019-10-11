
var footer_functions = function () {
	return {
		init: function () {
			$( ".error_dialog" ).dialog({
				autoOpen: false,
				dialogClass: 'ui-dialog-red',
				show: {
					effect: "blind",
					duration: 500
				},
				hide: {
					effect: "explode",
					duration: 500
				}
			});

			$( ".warning_dialog" ).dialog({ //Listener que muestra los popUp de advertencia
				autoOpen: false,
				dialogClass: 'ui-dialog-yellow',
				show: {
					effect: "blind",
					duration: 500
				},
				hide: {
					effect: "explode",
					duration: 500
				}
			});

			$( ".correct_dialog" ).dialog({ //Listener que muestra los popUp de Correcto
				autoOpen: false,
				dialogClass: 'ui-dialog-green',
				show: {
					effect: "blind",
					duration: 500
				},
				hide: {
					effect: "explode",
					duration: 500
				}
			});

			$(".confirm_dialog" ).dialog({ //muestra un dialog de confirmacion
				dialogClass: 'ui-dialog-yellow bringToFront',
				autoOpen: false,
				resizable: false,
				height: 'auto',
				modal: true,
				buttons: [
					{
						'class' : 'btnCancel',
						"text" : "Cancelar",
						'id' : 'pp_confirm_cancel_btn',
						click: function() {
							$(this).dialog( "close" );
						}
					},
					{
						'class' : 'btnNormal',
						"text" : "Aceptar",
						'id' : 'pp_confirm_accept_btn',
						click: function() {
							$(this).dialog( "close" );
						}
					}
				]
			});
		}
	};
}();

function fnOpenWarningDialog(msn) {
	$("#warning_message").html(msn); // coloca el mensaje recibido
	$(".warning_dialog").dialog("open"); //abre el dialogo con el mensaje
}

function fnOpenErrorDialog(msn) {
	$("#error_message").html(msn); // coloca el mensaje recibido
	$(".error_dialog").dialog("open"); //abre el dialogo con el mensaje
}

function fnOpenCorrectDialog(msn) {
	$("#correct_message").html(msn);
	$(".correct_dialog").dialog("open"); //si se actualiza correctamente muestra un mensaje
}

function fnOpenConfirmDialog(title, msn, aceptarNameButton) {
	$("#ui-id-4").html(title)
	$("#confirm_message").html(msn);
	$('#pp_confirm_accept_btn').text(aceptarNameButton)
	$(".confirm_dialog").dialog("open");//llama a un modal de confirm
}

function showIsLoading(textToShow) {
	if (!$(".isloading-overlay")[0]) {
		$.isLoading({ text: textToShow });
	} else {
		$("#loading-div > p").html(textToShow);
	}
}

function hideIsLoading() {
	if ($(".isloading-overlay")[0]) {
		$.isLoading("hide");
	}
}