const knex = require('knex')(require('../../knexfile.js'));
module.exports = (req,res) => {
  knex('matchup').del()
    .then(() => {
        knex.select('id').from('profiles').where({'display': req.body.competitor1})
        .then((first) => {
          knex.select('id').from('profiles').where({'display': req.body.competitor2})
            .then((second) => {
              knex('matchup').insert({'id': 1,'name': 'placeholder', 'prof_id1': first[0].id, 'prof_id2': second[0].id, 'song_id1': 1, 'song_id2': 1})
                .then(() => {
                    knex.select('id').from('profiles').where({'display': req.body.competitor3})
                      .then((first) => {
                        knex.select('id').from('profiles').where({'display': req.body.competitor4})
                          .then((second) => {
                            knex('matchup').insert({'id': 2,'name': 'placeholder', 'prof_id1': first[0].id, 'prof_id2': second[0].id, 'song_id1': 1, 'song_id2': 1})
                              .then(() => {
                                  knex.select('id').from('profiles').where({'display': req.body.competitor5})
                                    .then((first) => {
                                      knex.select('id').from('profiles').where({'display': req.body.competitor6})
                                        .then((second) => {
                                          knex('matchup').insert({'id': 3,'name': 'placeholder', 'prof_id1': first[0].id, 'prof_id2': second[0].id, 'song_id1': 1, 'song_id2': 1})
                                            .then(() => {
                                                knex.select('id').from('profiles').where({'display': req.body.competitor7})
                                                  .then((first) => {
                                                    knex.select('id').from('profiles').where({'display': req.body.competitor8})
                                                      .then((second) => {
                                                        knex('matchup').insert({'id': 4, 'name': 'placeholder', 'prof_id1': first[0].id, 'prof_id2': second[0].id, 'song_id1': 1, 'song_id2': 1})
                                                          .then(() => {
                                                              knex('round1').del()
                                                                .then(() => {
                                                                  knex('round1').insert({'id': 1,'name': 'placeholder','matchup_id1': 1, 'matchup_id2': 2, 'matchup_id3': 3, 'matchup_id4': 4, 'round1_beat': 1})
                                                                    .then(() => {
                                                                      knex('tournaments').del()
                                                                        .then(() => {
                                                                          knex('tournaments').insert({'id': 1, 'name': req.body.tournamentname, 'round1_id': 1, 'description': req.body.tournamentdescription})
                                                                            .then(() => {
                                                                                knex('round2').del()
                                                                                  .then(() => {
                                                                                    knex('round3').del()
                                                                                      .then(() => {
                                                                                        knex('likes').insert({'submission_id': 1})
                                                                                          .then(() => res.send('worked'))
                                                                                      }) 
                                                                                  })
                                                                            })
                                                                        })
                                                                    })
                                                                    .catch((error) => console.log(error))
                                                                })
                                                                .catch((error) => console.log(error))
                                                          })
                                                          .catch((error) => console.log(error))
                                                      })
                                                  })
                                            })
                                            .catch((error) => console.log(error))
                                        })
                                    })
                              })
                              .catch((error) => console.log(error))
                          })
                      })
                })
                .catch((error) => console.log(error))
            })
        })
  })
}
