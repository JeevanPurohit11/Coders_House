class ActivateController{

    async activate(req,res){
        res.json({message : 'OK'});
    }
}

module.exports= new ActivateController();