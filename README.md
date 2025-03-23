The Bee game

A bee swarm has the following members:
• Queen – 1 bee
• Worker – 5 bees
• Drone – 8 bees
At the beginning of the game, all bees are healthy (Health Points below):
• Queen – 100HP
• Worker (each) – 75HP
• Drone (each) – 50HP
Gameplay
The UI should have a “Hit” button. When clicked, you must pick a random swarm member (Queen,
Worker or Drone) and do the following damage to it: 
1. queen – 8 damage
2. worker – 10 damage
3. drone – 12 damage

When a bee remains without HP, it dies. When the Queen remains without HPs, all swarm members
die. The game user interface must be clear, concise, intuitive and its main elements are:
• “Hit” button
• The player name
• Alive bees: grouped by type (BONUS: show detailed info about the swarm’s health)
• Which bee type is hit at each click and the damage done
End game
• When there are no bees alive
• When the Queen remains without HP
• The game should be able to re-initialize with the default parameters after “game over”
• The game state should be persisted between different browser sessions
