
/*
 * GET home page.
 */

exports.index = function(req, res){

  if(req.session.userName){
    res.render('index', { 
      title: 'Socket.IO Server',
      userName: req.session.userName
    });
  }else{
    res.redirect('/logon');
  }
  
};