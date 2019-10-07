$('#post-comment').hide();
$('#btn-toggle-coment').click(e =>{
    e.preventDefault();
    $('#post-comment').slideToggle();
});'#'

// eslint-disable-next-line no-undef
$('#btn-like').click(function(e) {
    e.preventDefault();
    // eslint-disable-next-line no-undef
    let imgId = $(this).data('id');
    
    $.post('/images/'+imgId+'/like')
    .done(data =>{
        // eslint-disable-next-line no-undef
        $('.likes-count').text(data.like);
    });
});

// eslint-disable-next-line no-undef
$('#btn-delete').click(function(e){
    e.preventDefault();
    // eslint-disable-next-line no-undef
    let $this=$(this);
    // eslint-disable-next-line no-undef
    const response = confirm('Seguro de querer eliminar?');
    if(response){
        let imgID = $this.data('id');
        $.ajax({
            url: '/images/' + imgID,
            type:'DELETE'
        })
        .done(function(result){
            $this.removeClass('btn-danger').addClass('btn-success');
            $this.find('i').removeClass('fa-times').addClass('fa-check');
            $this.append('<span>Eliminado</span>');
        });
    }
});