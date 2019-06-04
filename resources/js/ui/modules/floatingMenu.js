import {isMobile} from '../../functions/mobile';

$(document).ready(function () {
    /**
     * Montagem do Menu Flutuante
     * Checa se o dispositivo não é Mobile para poder ativar ele
		 * https://semantic-ui.com/behaviors/visibility.html
     */

	if (!isMobile()) {
			$("._header").visibility({
				type: 'fixed',
				refreshOnResize: true,
				checkOnRefresh:true,
				offset: 0
			});
    }
});