// API endpoint for the scores 
app.post('/update-score', async (req, res) => {
    const { userId, score } = req.body;
  
    const user = await User.findById(userId);
    if (user) {
      user.highestScore = Math.max(user.highestScore, score);
      await user.save();
      res.json({ success: true, highestScore: user.highestScore });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  });


// API endpoint for browsing islands 
  app.get('/islands', async (req, res) => {
    try {
      const islands = await Island.find().populate('guardian', 'name'); // Populate guardian name
      res.json(islands);
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching islands' });
    }
  });

  // Population de la isla
  islandSchema.methods.updatePopulation = function () {
    this.population = this.creatures.length;
    return this.save();
  };