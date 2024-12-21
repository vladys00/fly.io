const User = require('../models/User.model')
module.exports.renderHome = (req, res, next) => {
    res.render('home');
}

module.exports.renderGame = (req, res, next) => {
    res.render('play');
    
}

module.exports.endGame = (req, res, next) => {
    console.log("Game Over: Processing end game logic...");
    const { score } = req.body;

    if (req.currentUser === undefined) {
        console.log("User not authenticated");
        return res.status(400).json({ error: 'User not authenticated' });
    }

    User.findById(req.currentUser.id)
        .then((user) => {
            if (score > user.highestScore) {
                // If score is higher, update it
                return User.findOneAndUpdate({ _id: req.currentUser.id }, { highestScore: score })
                    .then(() => {
                        console.log("Score updated");
                        res.render('end-game', { score }); // Render page after score update
                    });
            } else {
                console.log("Score is not high enough to update");
                res.render('end-game', { score }); // Render page without score update
            }
        })
        .catch((error) => {
            console.error("Error processing user or score update:", error);
            next(error); // Pass error to next middleware
        });
};
module.exports.welcome = (req, res ,next) => {
    res.render('users/welcome')
}