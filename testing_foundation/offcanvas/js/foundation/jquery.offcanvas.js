;(function (window, document, $) {
  // Set the negative margin on the top menu for slide-menu pages
  var $selector1 = $('#topMenu'),
    events = 'click.fndtn';
  if ($selector1.length > 0) $selector1.css("margin-top", $selector1.height() * -1);

  // Watch for clicks to show the sidebar
  var $selector2 = $('#leftSidebarButton');
  if ($selector2.length > 0) {
    $('#leftSidebarButton').on(events, function (e) {
      e.preventDefault();
      $('body').toggleClass('active');
    });
  }

  var $selector5 = $('#leftSidebarButton2');
  if ($selector5.length > 0) {
    $('#leftSidebarButton2').on(events, function (e) {
      e.preventDefault();
      $('body').toggleClass('active');
    });
  }

  var $selector6 = $('#rightSidebarButton');
  if ($selector6.length > 0) {
    $('#rightSidebarButton').on(events, function (e) {
      e.preventDefault();
      $('body').toggleClass('active');
    });
  }
  var $selector7 = $('#rightSidebarButton2');
  if ($selector7.length > 0) {
    $('#rightSidebarButton2').on(events, function (e) {
      e.preventDefault();
      $('body').toggleClass('active');
    });
  }
  // Watch for clicks to show the menu for slide-menu pages
  var $selector3 = $('#menuButton');
  if ($selector3.length > 0)  {
    $('#menuButton').on(events, function (e) {
      e.preventDefault();
      $('body').toggleClass('active-menu');
    });
  }

  // // Adjust sidebars and sizes when resized
  // $(window).resize(function() {
  //   // if (!navigator.userAgent.match(/Android/i)) $('body').removeClass('active');
  //   var $selector4 = $('#topMenu');
  //   if ($selector4.length > 0) $selector4.css("margin-top", $selector4.height() * -1);
  // });

  // Switch panels for the paneled nav on mobile
  var $selector5 = $('#switchPanels');
  if ($selector5.length > 0)  {
    $('#switchPanels dd').on(events, function (e) {
      e.preventDefault();
      var switchToPanel = $(this).children('a').attr('href'),
          switchToIndex = $(switchToPanel).index();
      $(this).toggleClass('active').siblings().removeClass('active');
      $(switchToPanel).parent().css("left", (switchToIndex * (-100) + '%'));
    });
  }

  $('#nav li a').on(events, function (e) {
    e.preventDefault();
    var href = $(this).attr('href'),
      $target = $(href);
    $('html, body').animate({scrollTop : $target.offset().top}, 300);
  });
}(this, document, jQuery));