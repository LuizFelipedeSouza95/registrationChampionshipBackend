const { prismaClient } = require('../model/prismaClient');
const bcrypt = require('bcrypt');

class authenticate {
  async authenticate(req, res) {
    try {
        const email = req.query.email;
        const password = req.query.password;
        //console.log(email, password);

        const user = await prismaClient.users.findMany({
            where: {
              email: email,
            },
          });

          if(user != undefined){
            var correct = bcrypt.compareSync(password)
            
/*             if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
            } else {
            res.redirect("/login")
          }
          res.json(req.session.user) */
          } else {
            res.redirect("/login")
          }

    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  }
}

module.exports = { authenticate };
