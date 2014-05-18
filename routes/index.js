
/*
 * GET home page.
 */

exports.index = function(req, res){

  if(req.session.roomName){
    res.render('index', { 
      title: 'Elastic Local Music - Socket.IO Server',
      roomName: req.session.roomName,
      sid: req.session.id
    });
  }else{
    res.redirect('/logon');
  }
  
};