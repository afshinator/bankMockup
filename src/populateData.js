$(function() {
    var dataEndpoint = "http://localhost:8000/data/data.json",
    	resizeTriggered = false,
    	$rbc = $( '#rightBalancesCover' ),
    	$lbc = $( '#leftBalancesCover' ),


    populateBalances = function( json ) {
    	var title, type, balance, xtra;
    	var $balance = $( '.balance' ),
    		$balanceTitle = $( '.balanceTitle' );
    		$accountDetails = $( '.accountDetails' );

		console.log( "JSON Data: ");
		console.log( json );

		for (var i = 0; i < json.accounts.length; i++ ) {
			title = json.accounts[ i ].title;
			type = json.accounts[ i ].type;
			balance = json.accounts[ i ].balance;
			xtra = json.accounts[ i ].xtra;

			$balance.eq( i ).text( balance );
			$balanceTitle.eq( i ).text( title );
			$accountDetails.eq( i ).text( type )
				.append( '<span class="floatRight">as of 10:15 AM PT</span><br>');

			if ( i === 0 ) {
				$accountDetails.eq( i )
					.append( '<span class="floatRight">' + xtra + '</span>' );
			}
		}

		fixBalancePlacements();	// An overlay for horizontal divider and li triangle bullet
		fillLeftBalances( json );
    },


    fixBalancePlacements = function() {
    	var $content = $('.content').eq(0),
    		p = $content.position();
    		w = $content.width(),
    		r = ~~(( $('body').width() - w)/ 2);

    	$content.css( 'height', '300px' );
    	$lbc.css( 'left', r - 17 );
    	$rbc.css( 'right', r - 17 )
    		.fadeIn( 'slow', getData );

    	resizeTriggered = false;  // refresh flag to allow refresh
    },


    fillLeftBalances = function( json ) {
    	var bank = json.bank,
    		credit = json.credit,
    		investments = json.investments,
    		loans = json.loans,
    		html = '';


    	html = '<div id="left-topWrapper"><p class="left-heading">CHECKING, SAVINGS, & CDS</p>';
    	html += '<h3 class="left-amount">' + bank + '</h3>';
    	html += '<small>available</small></div>';

    	html += '<div class="left-wrapper">';
    	html += '<p class="left-heading">LOANS</p>';
    	html += '<h3 class="left-amount">' + loans + '</h3>';
    	html += '</div>';

    	html += '<div class="left-wrapper">';
    	html += '<p class="left-heading">INVESTMENTS</p>';
    	html += '<h3 class="left-amount">' + investments + '</h3>';    	
    	html += '</div>';

    	html += '<div class="left-wrapper">';
    	html += '<p class="left-heading">CREDIT CARDS</p>';
    	html += '<h3 class="left-amount">' + credit + '</h3>';
    	html += '</div>';

    	$lbc.html( html );
    },


    getData = function() {
		$.getJSON( dataEndpoint )
			.done( populateBalances )
			.fail( function( jqxhr, textStatus, error ) {
				var err = textStatus + ", " + error;
				console.log( "Request Failed: " + err );
			}); 
    }();


    // If the browser gets resized, we want to update where we put the 
    // horizontal dividers for the right-side balances, 
    // 
    $(window).on( 'resize', function() {
    	if ( resizeTriggered ) return;
    	else {
    		resizeTriggered = true;
    		window.setTimeout( fixBalancePlacements, 700 );
    	}
    });
 
});