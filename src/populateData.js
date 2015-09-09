$(function() {
    var dataEndpoint = "http://localhost:8000/data/data.json",
    	resizeTriggered = false,		// browser resize sends too many events, this lets me handle it well
    	centsObj = {},
    	$rbc = $( '#rightBalancesCover' ),
    	$lbc = $( '#leftBalancesCover' ),


    // Update the right side balances
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


    // Called when the browser is resized, takes care of fixing the layout of the
    // balances on both the right and left sides.
    fixBalancePlacements = function() {
    	var $content = $('.content').eq(0),
    		p = $content.position();
    		w = $content.width(),
    		r = ~~(( $('body').width() - w)/ 2);

    	$content.css( 'height', '300px' );
    	$lbc.css( 'left', r - 17 );				// the Left side  balances
    	$rbc.css( 'right', r - 17 )				// the right side accounts balances
    		.fadeIn( 'slow', getData );

    	resizeTriggered = false;  // refresh flag to allow refresh
    },


    // The cents part of the balances, on the left side, need special attention since
    // they have a unique look and placement.   
    updateCentsOnLeft = function() {
    	var $leftTopWrapper = $( '#left-topWrapper'),
    		$leftWrapper = $( '.left-wrapper' ),
    		cents = '<div class="cents"></div>';

    	var bankCn = $( cents ).text( centsObj.bankC );
    	bankCn.css( 'top', $leftTopWrapper.position().top + 23 );
    	bankCn.css( 'left', $leftTopWrapper.position().left + $leftTopWrapper.width() - 50 );
    	$leftTopWrapper.append( bankCn );

    	var credit = $( cents ).text( centsObj.creditC );
    	credit.css( 'top', $leftWrapper.eq(0).position().top + 23 );
    	credit.css( 'left', $leftWrapper.eq(0).position().left + $leftWrapper.width() - 50 );
    	$leftWrapper.append( credit );

    	var inv = $( cents ).text( centsObj.investmentsC );
    	inv.css( 'top', $leftWrapper.eq(1).position().top + 23 );
    	inv.css( 'left', $leftWrapper.eq(1).position().left + $leftWrapper.width() - 50 );
    	$leftWrapper.append( inv );

    	var loans = $( cents ).text( centsObj.loansC );
    	loans.css( 'top', $leftWrapper.eq(2).position().top + 23 );
    	loans.css( 'left', $leftWrapper.eq(2).position().left + $leftWrapper.width() - 117 );
    	$leftWrapper.append( loans ); 
    },


    // Fill the Balances container (at the top of the page, right under navigation),
    // uses the data loaded from json file.
    fillLeftBalances = function( json ) {
    	var bank = json.bank,
    		credit = json.credit,
    		investments = json.investments,
    		loans = json.loans,
    		html = '';

    	centsObj = { 
    		bankC : bank.substring( bank.length - 2 ),
    		creditC : credit.substring( credit.length - 2 ),
    		investmentsC : investments.substring( investments.length - 2 ),
    		loansC : loans.substring( loans.length - 2 )
    	};


    	html = '<div id="left-topWrapper"><p class="left-heading">CHECKING, SAVINGS, & CDS</p>';
    	html += '<h3 class="left-amount">' + bank.substring( 0, bank.length - 3 ) + '</h3>';
    	html += '<small>available</small></div>';

    	html += '<div class="left-wrapper">';
    	html += '<p class="left-heading">LOANS</p>';
    	html += '<h3 class="left-amount">' + loans.substring( 0, loans.length - 3 ) + '</h3>';
    	html += '</div>';

    	html += '<div class="left-wrapper">';
    	html += '<p class="left-heading">INVESTMENTS</p>';
    	html += '<h3 class="left-amount">' + investments.substring( 0, investments.length - 3 ) + '</h3>';    	
    	html += '</div>';

    	html += '<div class="left-wrapper">';
    	html += '<p class="left-heading">CREDIT CARDS</p>';
    	html += '<h3 class="left-amount">' + credit.substring( 0, credit.length - 3 ) + '</h3>';
    	html += '</div>';

    	$lbc.html( html );

    	updateCentsOnLeft();
    },


    // Automatically place the right hand 'My Team' tab.
    placeTeamTab = function() {
    	var $myTeamTab = $( '#myTeamTab' );
    		contentTop = $lbc.position();

    	$myTeamTab.css( 'top', contentTop.top );
    	$myTeamTab.css( 'right', 0 ); // $('body').width() - 40 );
    }(),


    // Automatically load the data from json file and update balances.
    getData = function() {
		$.getJSON( dataEndpoint )
			.done( populateBalances )
			.fail( function( jqxhr, textStatus, error ) {
				var err = textStatus + ", " + error;
				console.error( "Request Failed: " + err );
			}); 
    }();


    // When the browser gets resized, update some of the placements;
    // The browser sends many resize events;  only catch one every so often to compensate
    $(window).on( 'resize', function() {
    	if ( resizeTriggered ) return;
    	else {
    		resizeTriggered = true;
    		window.setTimeout( fixBalancePlacements, 700 );
    	}
    });
 
});