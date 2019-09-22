console.log("leyendo");


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