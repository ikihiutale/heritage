$(window).load(function() {
  
  $('ul.members').find('a').each(function() {
    var $this = $(this);
    var id = $('h1.family-tree-title').data('id');
    if ($this.data('id') === id) {
      $this.parent().addClass('active2');
    }      
  });
});