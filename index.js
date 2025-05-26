const config = require('./config.js');
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((i) => {
    return GatewayIntentBits[i];
  }),
});

let statusIndex = 0;

function update() {
  const currentActivityName = config.statusMessage[statusIndex % config.statusMessage.length];
  client.user.setPresence({
    activities: [{ name: currentActivityName, type: ActivityType.Custom }],
    status: config.status,
  });
  statusIndex++;
}

client.once('ready', () => {
  console.log(`✅ ${client.user.tag} sudah siap!`);
  update();

  if (typeof config.statusInterval === 'number' && config.statusInterval > 0) {
    setInterval(update, config.statusInterval);
  } else {
    console.error('Invalid statusInterval in config');
  }
});

client.login(config.token).catch((error) => {
  console.error('Error logging in to Discord API:', error);
});
