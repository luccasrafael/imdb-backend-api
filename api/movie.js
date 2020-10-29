module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = (req, res) => {
        const movie = { ...req.body }
        if (req.params.id) movie.id = req.params.id

        try {
            existsOrError(movie.name, 'Nome não informado')
            existsOrError(movie.director, 'Diretor não informado')
            existsOrError(movie.genre, 'Gênero não informado')

        } catch (msg) {
            res.status(400).send(msg)
        }

        app.db('movies')
            .insert(movie)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))

    }

    const get = async (req, res) => {

        const filters = req.query;

        app.db('movies')
            .select('id', 'name', 'director', 'genre')
            .modify(queryBuilder => {
                if (filters.name) queryBuilder.where({ name: filters.name })
                if (filters.director) queryBuilder.where({ director: filters.director })
                if (filters.genre) queryBuilder.where({ genre: filters.genre })
                return queryBuilder
            })

            .then(movies => res.json(movies))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {

        app.db('movies')
            .select('movies.id','name','director', 'genre')
            .avg('vote')
            .join('votes', 'votes.moviesId', '=', 'movies.id')
            .whereRaw('movies.id = ?', req.params.id)
            .groupBy('movies.id')
            .first()
            .then(movie => {
                movie.average = parseFloat(movie.avg)
                delete movie.avg
                res.json(movie)
            })
            .catch(err => res.status(500).send(err))
    }

    const vote = (req, res) => {
        const votes = { ...req.body }
        votes.userId = req.user.id;
        votes.moviesId = req.params.id
        try {
            if (votes.vote !== 0) existsOrError(votes.vote, 'Voto não informado')
            if (votes.vote < 0 || votes.vote > 4) throw 'Voto fora dos padrões'
            if (req.user.admin) throw 'Administradores não votam em filmes'
        } catch (msg) {
            res.status(400).send(msg)
        }

        app.db('votes')
            .insert(votes)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }


    return { save, get, getById, vote }
}